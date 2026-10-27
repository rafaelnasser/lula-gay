# 05 · Arquitetura técnica

Recomendação para uma equipe pequena (2 a 4 pessoas) que precisa lançar um MVP em 12 a 16 semanas sem comprometer segurança. Cada escolha tem uma alternativa listada.

## 1. Stack recomendada

| Camada | Recomendação | Alternativa | Por quê |
|---|---|---|---|
| Web (público, comprador, vendedor) | **Next.js 15 (React, App Router), TypeScript, PWA** | SvelteKit | SSR para páginas públicas (SEO das páginas de prova), PWA para push anônimo |
| Painel de curadoria | App Next.js separado, domínio separado | Mesmo app com RBAC | Isolamento de superfície de ataque |
| API | **NestJS (Node, TypeScript)** com REST + webhooks | Go (chi/echo) | Mesma linguagem do front, módulos claros, fácil de contratar |
| Banco | **PostgreSQL 16** | — | Transações para o ledger, JSONB para configs de modelo, RLS se quiser |
| Cache / filas | **Redis + BullMQ** | RabbitMQ | Fila de processamento de uploads, agendamentos, publicação social |
| Armazenamento de objetos | **S3-compatível** (MinIO auto-hospedado ou Backblaze B2/Wasabi) | AWS S3 | Blobs cifrados; evitar provedores que fazem scan de conteúdo |
| Gestão de chaves | **HashiCorp Vault** (Transit) ou KMS do provedor | AWS KMS | Cifragem envelope, rotação |
| Processamento de mídia | Workers Node + `ffmpeg`, `exiftool`, `mat2`, `qpdf`, `tesseract`, `whisper.cpp` | Serviços externos | Nada de conteúdo sai para terceiros |
| Antivírus | ClamAV + sandbox (Firecracker/gVisor) para arquivos suspeitos | VirusTotal (envia o arquivo para fora: evitar) | Conteúdo não sai da infra |
| Bitcoin | **BTCPay Server** (on-chain + Lightning), auto-hospedado | — | Sem terceiros, sem KYC |
| Stablecoins (USDT/USDC) | Nó/indexador próprio por rede (Polygon, Tron, Base) com derivação de endereços por xpub e carteira quente/fria multisig | Provedor de custódia (exige KYC do comerciante; evitar) | Nenhum real toca o sistema; ver `03 §6` |
| Cotação BTC/USDT | Mediana de três corretoras via API pública, atualizada a cada minuto | — | Só para depósitos em Bitcoin; USDT = US$ 1:1 |
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
         │ · ledger/escrow jobs   │
         │ · social publisher     │
         │ · watermark/delivery   │
         └───────────┬───────────┘
                     ▼
        ┌────────────────────────┐
        │ Vault/KMS · BTCPay ·   │
        │ indexador on-chain ·   │
        │ cotação · X API        │
        └────────────────────────┘
```

**Módulos da API (NestJS):** `auth`, `accounts`, `wallet` (ledger), `listings`, `assets`, `models` (um submódulo por modelo de venda), `orders`, `entitlements`, `curation`, `proofs`, `social`, `requests` (pedidos), `messages`, `disputes`, `reports`, `audit`, `admin`.

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
8. Agendado → publicado → post social com link da prova
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

## 5. Ledger e custódia

Partidas dobradas em `ledger_entries`: cada lançamento tem `debit_account`, `credit_account`, `amount` (USDT com 6 casas decimais, inteiro em micro-USDT), `ref_type`, `ref_id`, `created_at`. Nunca se atualiza ou apaga um lançamento; correções são novos lançamentos. 1 USDT = US$ 1; os exemplos abaixo estão em US$.

Tipos de conta: `wallet:<account_id>`, `escrow:<listing_id>`, `escrow:<request_id>`, `reserve:<account_id>` (saldo reservado em lances/ofertas), `platform:fees`, `platform:guarantee_fund`, `payout:pending`, `treasury:<moeda>:<rede>` (ex.: `treasury:usdt:polygon`, `treasury:btc:lightning`), `refunds`.

**Fluxos de exemplo**

| Evento | Débito → Crédito |
|---|---|
| Depósito de 93 USDT confirmado (≈ US$ 500) | `treasury:usdt:polygon` → `wallet:A` |
| Compra de cópia US$ 490 | `wallet:A` → `escrow:L1` |
| Fim da janela de disputa (comissão 10 %) | `escrow:L1` → `wallet:V` (441,00); `escrow:L1` → `platform:fees` (49,00) |
| Apoio ao lacre coletivo US$ 100 | `wallet:B` → `escrow:L2` |
| Meta não batida | `escrow:L2` → `wallet:B` (para cada apoiador) |
| Lance US$ 15.000 | `wallet:C` → `reserve:C` |
| Lance superado | `reserve:C` → `wallet:C` |
| Saque de US$ 2.000 em USDT | `wallet:V` → `payout:pending` → `treasury:usdt:polygon` |

Saldo disponível = soma dos créditos − débitos da `wallet:X`. Materializado em `wallet_balances` por trigger para leitura rápida, com reconciliação noturna contra o ledger.

## 6. Pagamentos (só cripto)

**Depósito em stablecoin (USDT/USDC):** a API deriva um endereço novo da xpub da rede escolhida e o associa à carteira (`crypto_deposit`). O indexador (nó próprio ou RPC + worker) observa o endereço; ao atingir as confirmações (12 Polygon, 19 Tron, 12 Base) credita 1:1 em USDT. Endereços nunca são reutilizados. Depósitos abaixo do mínimo são creditados sem bônus de taxa.

**Depósito em Bitcoin (BTCPay):** a API cria uma invoice com o valor em BTC pela cotação travada por 10 min; webhook `InvoiceSettled` credita a carteira com o equivalente em USDT. Lightning para valores até US$ 2.000, on-chain acima (ou escolha do usuário).

**Cotação:** worker coleta BTC/USDT de três corretoras a cada minuto e guarda a mediana em `fx_rates`; usada só para converter depósitos em Bitcoin e travada por 10 min por depósito. Preços em US$ debitam o mesmo valor em USDT. Fase 2: tabela de câmbio para exibir equivalentes em moeda local (BRL, EUR, ARS) como referência.

**Saque:** pedido na interface (moeda, rede, endereço, senha + TOTP). Verificações automáticas: saldo disponível ≠ custódia, limite antifraude (US$ 2.000/dia para contas com menos de 7 dias ou sem item aprovado), endereço válido para a rede. Execução em lotes horários a partir da carteira quente (BTCPay payout API para BTC; assinatura própria para stablecoins), com aprovação de 2 pessoas acima de US$ 20.000 por lote. `payout.address` é apagado após a confirmação na rede; fica só o hash da transação.

**Tesouraria:** carteira quente dimensionada para 48 h de saques; o restante em carteira fria multisig 2-de-3. Reconciliação diária: soma dos passivos (carteiras + custódias) ≤ tesouraria total; divergência bloqueia saques e alerta.

## 7. Máquinas de estado críticas

**Lacre coletivo**
```
Ativo ──(soma ≥ meta)──► Financiado ──(liberação automática)──► Liberado ──(72 h)──► Pago ao vendedor
  │
  └──(prazo vence, soma < meta)──► Falhou ──► Reembolsos automáticos ──► Encerrado
```

**Compra (cópias/exclusivo)**
```
Criada ──(débito ok)──► Paga ──(entitlement emitido)──► Entregue ──(72 h sem disputa)──► Liquidada
                                                          │
                                                          └──(disputa)──► Em disputa ──► Reembolsada | Liquidada | Parcial
```

**Leilão aberto**
```
Ativo ──(lance)──► Ativo (prorroga se faltam <10 min) ──(prazo)──► Encerrado ──► Vencedor paga (saldo já reservado) ──► Entregue
                                                                      └──(sem reserva atingida)──► Sem venda
```

## 8. Agendamentos (BullMQ repeatable jobs)

- A cada minuto: encerrar itens/leilões/lacres vencidos; liquidar custódias com janela de disputa vencida.
- A cada 5 min: publicar posts agendados; checar marcos de lacres coletivos (25/50/75/90/100 %).
- A cada hora: lote de saques; expirar endereços de depósito não usados em 72 h (ficam observados por 30 dias); expirar concessões de visualização.
- A cada minuto: atualizar cotação BTC/USDT; varrer confirmações de depósitos pendentes.
- Diário: reconciliação do ledger; destruição de DEKs de exclusivos vendidos há mais de 72 h; limpeza de mensagens expiradas; destruição de registros de acesso com mais de 6 meses.

## 9. API (resumo dos endpoints)

```
POST   /auth/register            cria pseudônimo + senha + frase (retorna frase uma vez)
POST   /auth/login               handle + senha (+ TOTP)
POST   /auth/recover             12 palavras → nova senha
GET    /me                       conta, reputação, preferências
GET    /wallet                   saldo, reservado, em custódia
POST   /wallet/deposits          gera endereço (USDT/USDC por rede) ou invoice BTCPay (BTC)
GET    /wallet/deposits/:id      status e confirmações
GET    /wallet/rates             cotação BTC/USDT vigente
POST   /wallet/payouts           solicita saque (moeda, rede, endereço, TOTP)
GET    /wallet/ledger            extrato paginado

GET    /listings                 catálogo público (filtros: categoria, país, idioma, modelo, tipo, preço, status, autenticidade)
GET    /listings/:slug           prévia pública
GET    /proofs/:hash             página de prova (pública, sem auth)
POST   /listings                 cria rascunho (vendedor)
POST   /listings/:id/assets      URL pré-assinada de upload
PATCH  /listings/:id             edita rascunho / responde ajustes
POST   /listings/:id/submit      envia para curadoria
GET    /listings/:id/review      feedback da curadoria (vendedor)

POST   /orders                   compra (cópias/exclusivo/camada/licença/exclusividade=buyout)
POST   /pledges                  apoio a lacre coletivo
POST   /bids                     lance em leilão
POST   /offers                   oferta em exclusivo
POST   /subscriptions            assina fonte
GET    /entitlements             cofre
GET    /entitlements/:id/view    URL assinada do visualizador
POST   /entitlements/:id/download  gera download com marca d'água (se permitido)
POST   /disputes                 abre disputa

GET    /requests                 mural de pedidos
POST   /requests                 cria pedido (vai à curadoria)
POST   /requests/:id/contribute  soma à recompensa
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
GET    /admin/finance/escrow /payouts /reconciliation
GET    /admin/audit
GET    /admin/settings  PATCH /admin/settings
```

## 10. Segurança: lista mínima antes do lançamento

- [ ] Argon2id para senhas; passkeys; TOTP; rate limit por conta e por token anônimo (sem IP em claro).
- [ ] CSP estrita, sem scripts de terceiros, sem analytics externos.
- [ ] Cookies `HttpOnly`, `Secure`, `SameSite=Strict`; sessão de 24 h (8 h no admin).
- [ ] Uploads só por URL pré-assinada; bucket de quarentena sem leitura pública; varredura antes de mover.
- [ ] Cifragem envelope de todos os assets; KMS separado; crypto-shredding de exclusivos.
- [ ] Ledger imutável; reconciliação diária; alertas de divergência.
- [ ] Webhooks do BTCPay com assinatura verificada; indexador com idempotência por `txid` e reorg handling (recredita só após as confirmações).
- [ ] Carteira quente com limite; carteira fria multisig 2-de-3; chaves nunca no servidor da API.
- [ ] Admin em domínio separado, 2FA obrigatório, log de auditoria com hash encadeado.
- [ ] Registros de acesso (Marco Civil) em sistema separado, cifrados, retenção de 6 meses, destruição automática.
- [ ] Espelho `.onion`; páginas autenticadas sem CDN; páginas públicas podem usar CDN.
- [ ] Backups cifrados, teste de restauração, plano de incidentes.
- [ ] Pentest externo antes do lançamento; bug bounty após.
