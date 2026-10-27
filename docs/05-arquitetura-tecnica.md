# 05 · Arquitetura técnica

Recomendação para uma equipe pequena (2 a 4 pessoas) que precisa lançar um MVP em 12 a 16 semanas sem comprometer segurança. Cada escolha tem uma alternativa listada.

## 1. Stack recomendada

| Camada | Recomendação | Alternativa | Por quê |
|---|---|---|---|
| Web (público, comprador, vendedor) | **Next.js 15 (React, App Router), TypeScript, PWA** | SvelteKit | SSR para páginas públicas (SEO das páginas de prova), PWA para push anônimo |
| Painel de curadoria | App Next.js separado, domínio separado | Mesmo app com RBAC | Isolamento de superfície de ataque |
| API | **NestJS (Node, TypeScript)** com REST + webhooks | Go (chi/echo) | Mesma linguagem do front, módulos claros, fácil de contratar |
| Banco | **PostgreSQL 16** | — | Transações para o livro de pagamentos, JSONB para configs de modelo, RLS se quiser |
| Cache / filas | **Redis + BullMQ** | RabbitMQ | Fila de processamento de uploads, agendamentos, publicação social |
| Armazenamento de objetos | **S3-compatível** (MinIO auto-hospedado ou Backblaze B2/Wasabi) | AWS S3 | Blobs cifrados; evitar provedores que fazem scan de conteúdo |
| Gestão de chaves | **HashiCorp Vault** (Transit) ou KMS do provedor | AWS KMS | Cifragem envelope, rotação |
| Processamento de mídia | Workers Node + `ffmpeg`, `exiftool`, `mat2`, `qpdf`, `tesseract`, `whisper.cpp` | Serviços externos | Nada de conteúdo sai para terceiros |
| Antivírus | ClamAV + sandbox (Firecracker/gVisor) para arquivos suspeitos | VirusTotal (envia o arquivo para fora: evitar) | Conteúdo não sai da infra |
| Bitcoin | Indexador on-chain próprio (sem Lightning: invoice não é reembolsável à origem) | BTCPay Server | Só para Exclusivo e Cópias |
| Carteiras de itens | HSM (ou módulo de chaves do provedor) gerando uma carteira HD por item; indexador próprio por rede (Polygon, Tron, Base; Bitcoin on-chain) para atribuir pagamentos por endereço derivado | Provedor de custódia (exige KYC do comerciante; evitar) | Nenhum saldo de usuário; chave apagada na entrega; ver `03 §6` |
| Cotação BTC/USD | Mediana de três corretoras via API pública, atualizada a cada minuto | — | Só para mostrar pagamentos em Bitcoin em US$; stablecoins 1:1 |
| Social | X API v2, Telegram Bot API, Bluesky AT Protocol, Instagram Graph API (imagem) | Buffer/Hootsuite | Controle total do que sai |
| Infra | Docker Compose no MVP → Kubernetes leve (k3s) na V2; servidores dedicados na UE ou BR | Fly.io / Render | Custo previsível; controle sobre logs |
| Observabilidade | Prometheus + Grafana + Loki, sem PII nos logs | Datadog | Dados não saem |
| E-mail | Nenhum | — | Não existe e-mail no produto |

## 2. Serviços

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  web (Next)  │   │ admin (Next) │   │ onion mirror │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       └─────────────┬────┴────────────────┬─┘
                     ▼                     │
              ┌─────────────┐              │
              │   api (Nest)│◄─────────────┘
              └──┬───┬───┬──┘
     ┌───────────┘   │   └───────────────┐
     ▼               ▼                   ▼
┌─────────┐   ┌─────────────┐   ┌─────────────────┐
│Postgres │   │ Redis/BullMQ│   │  S3 (cifrado)   │
└─────────┘   └──────┬──────┘   └────────┬────────┘
                     ▼                   │
         ┌───────────────────────┐       │
         │ workers                │◄──────┘
         │ · ingest (AV, metadata,│
         │   hash, previews, OCR) │
         │ · finalizações/reembolsos   │
         │ · social publisher     │
         │ · watermark/delivery   │
         └───────────┬───────────┘
                     ▼
        ┌────────────────────────┐
        │ Vault/KMS · HSM ·   │
        │ indexador on-chain ·   │
        │ cotação · X API        │
        └────────────────────────┘
```

**Módulos da API (NestJS):** `auth`, `accounts`, `itemwallets` (carteiras por item, pagamentos, finalização, reembolsos), `listings`, `assets`, `models` (um submódulo por modelo de venda), `orders`, `entitlements`, `curation`, `proofs`, `social`, `requests` (pedidos), `messages`, `disputes`, `reports`, `audit`, `admin`.

## 3. Fluxo do conteúdo

```
1. Vendedor seleciona arquivos
2. Cliente calcula SHA-256 local (mostra ao vendedor)
3. Upload multipart direto ao S3 via URL pré-assinada (bucket "quarentena", cifrado por item)
4. Worker ingest:
   a. antivírus → bloqueio se positivo
   b. remoção de metadados → relatório
   c. varreduras (PII, proibido, credenciais)
   d. hash servidor (compara com o do cliente)
   e. prévias (borradas, tarjadas, baixa resolução)
   f. OCR/transcrição → índice interno
   g. move para bucket "selado" (DEK por asset, KEK no KMS)
5. Item entra na fila de curadoria
6. Curador acessa pelo visualizador seguro (streaming descriptografado, concessão de 15 min)
7. Aprovado → gera ProofCertificate (hash do pacote, timestamp, versão da política)
8. Aprovado → publicado na hora (carteira do item criada) → post social com link da prova
9. Compra → Entitlement → acesso via visualizador / download com marca d'água
10. Exclusivo vendido → após 72 h, DEK destruída
```

Limites do MVP: 20 GB por item, 200 arquivos por item, formatos listados em `01 §5`.

## 4. Cifragem envelope

- `asset.dek_encrypted` guarda a DEK cifrada pela KEK do Vault (Transit engine, chave `lacre-assets`).
- O worker pede ao Vault para descifrar a DEK só no momento da leitura; a DEK fica em memória por segundos.
- Rotação da KEK: re-cifra apenas as DEKs (rewrap), não os blobs.
- Visualizador: o backend descriptografa em streaming e serve chunks via HTTP range com URL assinada (TTL 5 min). O cliente nunca recebe a DEK.
- Download permitido: o worker gera uma cópia com marca d'água (visível: pseudônimo + ID do entitlement no rodapé; invisível: esteganografia leve em imagens/PDF), cifra com chave efêmera, URL de uso único.

## 5. Carteiras de itens e livro de pagamentos

Não há ledger de saldos de usuários. O que existe é um **livro de pagamentos por item**, espelho do que está on-chain:

- `item_wallet`: uma por item ou pedido aprovado; `xpub` para derivar endereços; chave privada só no HSM; estados `receiving → settling → delivered` (ou `refunding → closed`).
- `payment`: um por endereço derivado; `expected_amount`, `received_amount`, `confirmations`, `txid`, `origin_address` (apagado na finalização), estados `waiting → seen → confirmed → settled | refunded`.
- `settlement`: a finalização do item: comissão transferida (txid), reembolsos executados, `seed_revealed_at`, `key_shredded_at`, hash do evento na auditoria.
- `refund`: reembolso de um `payment` ao `origin_address`, com txid e taxa de rede.

Reconciliação diária: soma dos `payment.received_amount` confirmados por carteira = saldo on-chain do endereço do item (menos reembolsos e comissão já transferidos). Divergência bloqueia finalizações e alerta.

## 6. Fluxos de pagamento

**Aprovação do item:** o worker pede ao HSM uma carteira HD nova por rede aceita no item; grava o `xpub`; publica o endereço raiz na página de prova.

**Checkout:** a API deriva o próximo endereço do item para aquele comprador (`payment.waiting`, valor exato, validade 24 h) e mostra endereço, QR e rede. O indexador observa; ao atingir as confirmações (12 Polygon, 19 Tron, 12 Base, 2 Bitcoin), marca `confirmed`, emite o `entitlement` (Cópias, Exclusivo, Camada) ou soma ao arrecadado (Lacre, Pedido). Pagamento parcial espera complemento por 24 h; excedente fica no item.

**Finalização:** job verifica a condição (ver `03 §6`), transfere 10 % para a carteira da plataforma, executa reembolsos pendentes, marca `settling`. O vendedor abre "Carteiras dos itens", confirma senha + TOTP e vê a frase de recuperação uma única vez; a API registra `seed_revealed_at`, ordena ao HSM a destruição da chave e grava `key_shredded_at`. Depois disso a plataforma não consegue mais movimentar a carteira.

**Falha ou retirada antes da finalização:** job de reembolso envia cada `payment` de volta ao `origin_address`, em lotes por rede, descontando a taxa de rede; registra `refund` com txid; notifica o comprador.

**Disputa após a finalização:** reembolso pago pela carteira do fundo de garantia da plataforma.

**Taxa de rede dos reembolsos** sai do valor devolvido. Por isso as redes aceitas para lacres coletivos são as baratas (Polygon, Tron, Base).

## 7. Máquinas de estado críticas

**Lacre coletivo**
```
Ativo ──(soma ≥ meta)──► Financiado ──(liberação automática)──► Liberado ──(72 h)──► Pago ao vendedor
  │
  └──(prazo vence, soma < meta)──► Falhou ──► Reembolsos à origem ──► Finalizado
```

**Compra (cópias/exclusivo)**
```
Criada ──(pagamento confirmado on-chain)──► Paga ──(entitlement emitido)──► Entregue ──(72 h sem disputa)──► Liquidada
                                                          │
                                                          └──(disputa)──► Em disputa ──► Reembolsada | Liquidada | Parcial
```

**Pedido com recompensa**
```
Aberto ──(juntar-se: paga V)──► Aberto (n+1)
Aberto ──(cobrir: paga V' ≥ V+10 %)──► Valor subiu (janela 48 h) ──(cada um iguala ou sai)──► Aberto (todos em V')
Aberto ──(vendedor envia atendimento)──► Travado ──(curadoria valida)──► Atendido ──(acesso aos interessados; 10 %; carteira entregue)──► Finalizado
                                                └──(curadoria rejeita)──► Aberto
Aberto ──(prazo vence)──► Expirado ──► Reembolsos à origem ──► Finalizado
Extra: mesma máquina, por sub-item, independente do principal (criado → em curadoria → aberto …)
```

**Leilão aberto**
```
Ativo ──(lance)──► Ativo (prorroga se faltam <10 min) ──(prazo)──► Encerrado ──► Lance vencedor fica no item; demais reembolsados à origem ──► Entregue
                                                                      └──(sem reserva atingida)──► Sem venda
```

## 8. Agendamentos (BullMQ repeatable jobs)

- A cada minuto: encerrar itens/leilões/lacres vencidos; liquidar custódias com janela de disputa vencida.
- A cada 5 min: publicar posts agendados; checar marcos de lacres coletivos (25/50/75/90/100 %).
- A cada hora: finalizações elegíveis (comissão + reembolsos pendentes); lotes de reembolso por rede; expirar pagamentos não recebidos em 24 h; fechar janelas de igualar vencidas (quem não igualou sai, com reembolso à origem); expirar pedidos sem atendimento; expirar concessões de visualização.
- A cada minuto: varrer confirmações de pagamentos pendentes.
- Diário: reconciliação on-chain das carteiras de itens; apagar endereços de origem de itens finalizados; destruição de DEKs de exclusivos vendidos há mais de 72 h; limpeza de mensagens expiradas; destruição de registros de acesso com mais de 6 meses.

## 9. API (resumo dos endpoints)

```
POST   /auth/register            cria pseudônimo + senha + frase (retorna frase uma vez)
POST   /auth/login               handle + senha (+ TOTP)
POST   /auth/keyfile/challenge   handle → nonce assinável (válido 2 min)
POST   /auth/keyfile/verify      nonce assinado com a chave do arquivo → sessão
POST   /auth/keyfile             gera novo par; retorna o arquivo .lacre uma vez e revoga o anterior
POST   /auth/recover             12 palavras → nova senha
GET    /me                       conta, reputação, preferências
GET    /payments                 pagamentos feitos por esta conta (item, endereço, valor, confirmações, status, reembolso)
GET    /listings/:id/wallet      carteira do item (endereço público, recebido, reembolsos, estado) — vendedor
POST   /listings/:id/wallet/reveal   senha + TOTP → frase de recuperação, uma única vez; chave destruída no HSM
POST   /listings/:id/close-sales     vendedor encerra as vendas (Cópias) e pede a finalização

GET    /listings                 catálogo público (filtros: categoria, país, idioma, modelo, tipo, preço, status, autenticidade)
GET    /listings/:slug           prévia pública
GET    /proofs/:hash             página de prova (pública, sem auth)
POST   /listings                 cria rascunho (vendedor)
POST   /listings/:id/assets      URL pré-assinada de upload
PATCH  /listings/:id             edita rascunho / responde ajustes
POST   /listings/:id/submit      envia para curadoria
GET    /listings/:id/review      feedback da curadoria (vendedor)

POST   /orders                   compra (cópias/exclusivo/camada/licença/exclusividade=buyout) → endereço derivado para pagar
POST   /pledges                  apoio a lacre coletivo → endereço derivado para pagar
POST   /bids                     lance em leilão
POST   /offers                   oferta em exclusivo
POST   /subscriptions            assina fonte
GET    /entitlements             cofre
GET    /entitlements/:id/view    URL assinada do visualizador
POST   /entitlements/:id/download  gera download com marca d'água (se permitido)
POST   /disputes                 abre disputa

GET    /requests                 mural de pedidos
POST   /requests                 cria pedido (vai à curadoria)
POST   /requests/:id/join        junta-se pagando o valor por interessado atual → endereço derivado
POST   /requests/:id/raise       cobre o valor (≥ atual + 10 %) → endereço derivado; abre janela de 48 h para os demais
POST   /requests/:id/match       iguala a diferença dentro da janela → endereço derivado
POST   /requests/:id/leave       sai do pedido (e dos extras) → reembolso ao endereço de origem
POST   /requests/:id/extras      interessado cria um extra (vai à curadoria) → endereço derivado para pagar
POST   /extras/:id/join|raise|match|leave   mesmas regras do pedido, só para interessados do principal
POST   /requests/:id/proposals   vendedor propõe um extra (público; vira extra quando um interessado o cria)
POST   /extras/:id/fulfill       vendedor envia atendimento do extra (cria listing vinculado)
POST   /requests/:id/fulfill     vendedor envia atendimento (cria listing vinculado)

GET    /threads /threads/:id/messages  POST /threads/:id/messages
POST   /reports                  denúncia pública (sem auth)

--- admin (domínio separado, RBAC) ---
GET    /admin/queue              fila com filtros e prioridade
GET    /admin/reviews/:id        workbench: assets, prévias, triagem, checklist, histórico do vendedor
POST   /admin/reviews/:id/decision   aprovar | ajustes | rejeitar | escalar
POST   /admin/reviews/:id/redact     nova versão do asset com tarjas
GET    /admin/social/queue       itens aprovados aguardando post
POST   /admin/social/posts       cria/agenda post por canal
GET    /admin/disputes  POST /admin/disputes/:id/resolve
GET    /admin/accounts/:handle   risco, denúncias, histórico (sem PII)
POST   /admin/accounts/:handle/actions   warn | restrict | ban
GET    /admin/finance/item-wallets /settlements /refunds /reconciliation
GET    /admin/audit
GET    /admin/settings  PATCH /admin/settings
```

## 10. Internacionalização

- **Idiomas**: português, inglês e espanhol no lançamento; arquivos de mensagens por idioma (formato ICU para plurais e variáveis), chaves estáveis, fallback para inglês. Textos de interface nunca ficam no código.
- **Detecção**: servidor lê `Accept-Language` para renderizar a primeira página no idioma certo (sem "piscar"); cliente confirma com `navigator.languages`. Escolha do usuário em cookie sem identidade (`lang`) e, se logado, em `account.prefs`.
- **URLs**: prefixo de idioma (`/pt/`, `/en/`, `/es/`) nas páginas públicas, para SEO e compartilhamento; páginas de prova sempre acessíveis em todos os idiomas.
- **País padrão**: ver `03 §6b`. Cookie sem identidade (`country`); o filtro do catálogo e do mural parte dele; o seletor no cabeçalho troca na hora.
- **Formatação**: `Intl.NumberFormat` e `Intl.DateTimeFormat` por idioma; preços sempre em US$ (USDT 1:1), com equivalente em moeda local como referência na fase 2.
- **Conteúdo dos itens**: título e resumo ficam no idioma em que o vendedor escreveu; o campo `languages` do item alimenta o filtro de idioma. Fase 2: tradução automática de título e resumo com rótulo "traduzido automaticamente", nunca do conteúdo vendido.
- **Equipe**: curadoria por idioma (fila filtra por `languages`); posts nas redes no idioma do item e, para lacres grandes, também em inglês.

## 11. Segurança: lista mínima antes do lançamento

- [ ] Argon2id para senhas; passkeys; arquivo de acesso (Ed25519, chave privada cifrada no cliente, só a pública no servidor, desafio com nonce de uso único); TOTP; rate limit por conta e por token anônimo (sem IP em claro).
- [ ] CSP estrita, sem scripts de terceiros, sem analytics externos.
- [ ] Cookies `HttpOnly`, `Secure`, `SameSite=Strict`; sessão de 24 h (8 h no admin).
- [ ] Uploads só por URL pré-assinada; bucket de quarentena sem leitura pública; varredura antes de mover.
- [ ] Cifragem envelope de todos os assets; KMS separado; crypto-shredding de exclusivos.
- [ ] Livro de pagamentos por item imutável; reconciliação on-chain diária; alertas de divergência bloqueiam finalizações.
- [ ] Indexador com idempotência por `txid` e tratamento de reorganização de blocos (confirma só após as confirmações exigidas).
- [ ] Chaves das carteiras de itens só no HSM; entrega da frase exige senha + TOTP e destrói a chave; carteira da plataforma (comissões) com multisig 2-de-3.
- [ ] Admin em domínio separado, 2FA obrigatório, log de auditoria com hash encadeado.
- [ ] Registros de acesso (Marco Civil) em sistema separado, cifrados, retenção de 6 meses, destruição automática.
- [ ] Espelho `.onion`; páginas autenticadas sem CDN; páginas públicas podem usar CDN.
- [ ] Backups cifrados, teste de restauração, plano de incidentes.
- [ ] Pentest externo antes do lançamento; bug bounty após.
