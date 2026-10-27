# 03 · Anonimato e segurança

## 1. O que prometemos e o que não prometemos

**Prometemos:**
- Vendedores e compradores nunca sabem quem é o outro. Nem a plataforma precisa saber quem são.
- Nenhuma conta exige nome, e-mail, telefone, CPF ou documento.
- O marketplace não armazena identidade de ninguém. Se o banco de dados vazar, o que vaza são pseudônimos, saldos e históricos de itens.
- Arquivos enviados têm metadados removidos antes de qualquer pessoa da equipe ver.
- A equipe de curadoria vê o conteúdo, mas não vê quem enviou além do pseudônimo e do histórico dele.

**Não prometemos (e a interface deve dizer isso com clareza):**
- Anonimato contra o próprio Estado em caso de ordem judicial. Dinheiro entra e sai por parceiros regulados (PIX, exchanges) que identificam seus clientes por lei. Nossa arquitetura separa esse conhecimento do marketplace, mas uma ordem judicial dirigida a ambos pode reconstruir o vínculo.
- Proteção contra o comportamento do próprio usuário: quem coloca o nome dentro do documento, reutiliza uma carteira de cripto rastreável ou revela detalhes na descrição se identifica sozinho. A interface avisa nesses pontos.
- Impossibilidade de captura de tela. Marca d'água e termos desencorajam; nada impede.

A promessa pública fica assim: **"Anonimato total entre as partes e para o público. Nenhum dado de identidade no marketplace."**

## 2. Modelo de ameaças

| Quem poderia identificar | O que veria | Como mitigamos |
|---|---|---|
| Outro usuário | Pseudônimo, reputação, itens, mensagens | Mensagens filtradas (bloqueio de contatos externos), sem perfis com texto livre no MVP |
| Público (redes) | Prévia, prova, pseudônimo do vendedor (opcional ocultar) | Vendedor escolhe exibir ou não o pseudônimo na página pública |
| Equipe de curadoria | Conteúdo completo, pseudônimo, histórico | Acesso registrado em log imutável, 2FA, regra de dois olhos, sem download do conteúdo bruto |
| Operador da infraestrutura | Banco de dados, arquivos cifrados | Arquivos cifrados com chave por item; chaves em KMS separado; dados do marketplace sem PII |
| Parceiro de pagamento | CPF do depositante ↔ código de depósito | O marketplace recebe só "código X foi pago"; o parceiro não recebe o pseudônimo |
| Observador de rede | IP, horário, volume | TLS, suporte a Tor (espelho .onion), sem rastreadores de terceiros, sem CDN para páginas autenticadas |
| Estado com ordem judicial | Registros de acesso (obrigatórios por lei, ver §8) + registros do parceiro de pagamento | Registros de acesso cifrados, com retenção mínima legal e acesso restrito a procedimento jurídico |
| Comprador que vaza o conteúdo | O conteúdo em si | Marca d'água por entitlement; termos; não identifica pessoa, identifica a conta |
| Metadados do arquivo | Autor, GPS, dispositivo, software | Remoção automática no upload, antes da curadoria |
| Estilometria / padrões | Estilo de escrita, horários | Aviso ao vendedor; opção de a curadoria reescrever título e descrição |

## 3. Conta pseudônima

**Criação (3 passos, sem nenhum dado pessoal):**
1. **Pseudônimo gerado**: `palavra-hex4` (ex.: `coruja-7f3a`). O usuário pode sortear outro quantas vezes quiser. Não é editável depois (evita personalização que identifica).
2. **Senha** (mínimo 12 caracteres) ou **passkey** (WebAuthn). Hash Argon2id.
3. **Frase de recuperação** de 12 palavras (BIP-39 em português). É o único jeito de recuperar a conta. A plataforma mostra uma vez, pede confirmação de 3 palavras e nunca mais exibe. Sem e-mail, não há "esqueci minha senha" por fora.

**Segurança adicional (opcional):** TOTP (app autenticador), sessões com expiração curta, lista de sessões ativas, PIN para abrir o cofre.

**O que a conta armazena:** pseudônimo, hash da senha, chave pública da passkey, hash da frase de recuperação (para validar, não para recuperar), segredo TOTP cifrado, data de criação, preferências, saldo (via ledger), reputação. **Nada mais.**

**Notificações:** apenas dentro da plataforma e por push do navegador (a assinatura push é anônima). Sem e-mail, sem SMS. Opcional na V2: canal Telegram ou Signal via bot, com aviso de que isso vincula um identificador externo.

## 4. Higiene de upload

Pipeline executado em um worker isolado antes de qualquer humano ver o arquivo:

1. **Antivírus** (ClamAV + detonação em sandbox para executáveis; executáveis são rejeitados por padrão).
2. **Remoção de metadados**: EXIF/XMP/IPTC (imagens, vídeos), autor/empresa/revisões (DOCX, XLSX, PPTX), Info e XMP (PDF), tags ID3 (áudio). Ferramentas: `mat2`, `exiftool`, `qpdf`. O relatório do que foi removido é mostrado ao vendedor.
3. **Varredura de PII**: regex e NER para CPF, CNPJ de pessoa física, telefones, e-mails, endereços, nomes próprios em documentos. Resultado vai para a curadoria como alerta, não bloqueia sozinho.
4. **Varredura de conteúdo proibido**: nudez e menores (bloqueio imediato e registro), credenciais (padrões de senha, chaves de API, tokens), dados de cartão. Bloqueio imediato quando detectado com alta confiança.
5. **Hash**: SHA-256 de cada arquivo e do pacote selado (calculado também no cliente para o vendedor poder conferir).
6. **Prévias**: thumbnails borrados, primeira página com tarjas, trecho de 30 s de vídeo em baixa resolução, 10 linhas de um CSV. A curadoria escolhe quais prévias vão ao público.
7. **OCR e transcrição** para busca interna da curadoria e detecção de duplicidade. Nunca expostos ao público.

## 5. Criptografia do conteúdo

- **Cifragem envelope**: cada asset tem uma chave de dados (DEK, AES-256-GCM) gerada no servidor de upload; a DEK é cifrada por uma chave mestra (KEK) no KMS. O objeto no storage é só o blob cifrado.
- **Curadoria**: recebe uma concessão temporária (15 min, renovável) para o visualizador seguro descriptografar em streaming. Sem download bruto. Todo acesso registra quem, quando e qual asset.
- **Comprador**: o entitlement gera URLs assinadas de curta duração para o visualizador. Download, quando permitido pelo item, passa pelo serviço de marca d'água e é registrado.
- **Exclusivo vendido**: após a janela de disputa, a DEK é destruída (crypto-shredding). O blob vira lixo irrecuperável. O hash permanece na prova.
- **Backups**: cifrados com chave separada, retenção de 30 dias, teste de restauração mensal.

## 6. Dinheiro sem identidade no marketplace

**Princípio: a carteira desacopla pagamento de compra.** O usuário deposita créditos (R$) na carteira; compras e apoios são lançamentos internos entre carteiras e custódias. Quem olha o fluxo de pagamentos externos vê depósitos e saques, nunca o que foi comprado.

**Formas de depósito (MVP):**
- **Cripto**: BTC (on-chain e Lightning via BTCPay Server, auto-hospedado), USDT/USDC (via provedor com conversão para R$ ou tesouraria própria). Taxa de câmbio travada por 10 min no checkout.
- **PIX por código de depósito**: o usuário gera um código único (ex.: `LCR-8K2M-77QX`), paga um PIX ao parceiro usando o código como identificador. O parceiro avisa a plataforma "código pago, valor Y". A plataforma credita a carteira dona do código. O parceiro conhece o CPF do pagador; a plataforma conhece o código e a carteira; nenhum dos dois tem os dois lados.
- **Voucher**: códigos pré-pagos vendidos por revendedores (fase 2).

**Saque do vendedor:**
- **Cripto** (preferido): endereço informado no momento do saque; nunca salvo por padrão.
- **PIX via parceiro de pagamento**: o vendedor é redirecionado para o parceiro, que faz a identificação exigida por lei (KYC) **do lado dele**. A plataforma recebe apenas a confirmação do saque. O vendedor é avisado de que, nesse caminho, o parceiro conhece sua identidade.

**Ledger:** partidas dobradas, imutável (append-only), com contas: carteira do usuário, custódia por item/pedido, taxas da plataforma, saques pendentes, reembolsos. Ver `05`.

**Conformidade:** limites de depósito e saque por período para contas sem KYC no parceiro (sugestão inicial: R$ 10 mil/mês por carteira sem verificação do parceiro; acima disso, o saque exige o caminho com KYC no parceiro). Isso é decisão jurídica e regulatória: validar com advogado antes do lançamento.

## 7. Comunicação entre partes

- Mensagens só dentro da plataforma, por item ou pedido.
- Filtro automático bloqueia e-mails, telefones, @ de redes, links externos e endereços de carteira. O objetivo é proteger o usuário de se identificar, não censurar.
- Mensagens expiram 90 dias após o encerramento do item.
- A curadoria pode ler conversas quando há disputa ou denúncia; o acesso é registrado.
- Opção V2: cifragem de ponta a ponta com chaves derivadas da senha, abrindo mão da leitura em disputas (o usuário escolhe).

## 8. Registros de acesso e a lei brasileira

O Marco Civil da Internet (Lei 12.965/2014, art. 15) obriga provedores de aplicação constituídos como pessoa jurídica no Brasil a guardar **registros de acesso** (data, hora e IP de cada acesso) por **6 meses**, em sigilo, e a entregá-los mediante ordem judicial. Isso conflita com "não registramos IP".

Opções (decisão de negócio e jurídica, não técnica):
1. **Cumprir com minimização**: guardar os registros em um sistema separado, cifrados com chave sob custódia de duas pessoas, com retenção exata de 6 meses e destruição automática. O marketplace nunca os consulta. Só saem por ordem judicial. É a opção recomendada se a operação for brasileira.
2. **Estrutura em outra jurisdição**: altera obrigações e também altera a relação com parceiros de pagamento brasileiros. Exige assessoria.

A documentação pública da plataforma deve dizer exatamente qual opção foi escolhida. Prometer o que a lei não permite destrói a confiança no primeiro incidente.

Outras normas que moldam o produto (detalhadas em `04`): LGPD (dados pessoais de terceiros dentro dos itens), Lei 9.610 (direitos autorais), Lei 6.385 art. 27-D (informação privilegiada de mercado), Código Penal (crimes contra a honra, violação de sigilo), Lei 9.613 (lavagem de dinheiro, relevante para pagamentos), ECA.

## 9. Segurança operacional da equipe

- Painel de curadoria em domínio separado, com 2FA obrigatório (passkey ou TOTP), IP allowlist opcional e sessão de 8 h.
- RBAC: triagem, curador, curador sênior, jurídico, financeiro, publicação, administrador.
- **Regra de dois olhos**: itens de risco alto exigem dois curadores com aprovação independente.
- Log de auditoria imutável (append-only, hash encadeado) para toda ação administrativa.
- Nenhum curador faz download de conteúdo bruto; o visualizador seguro é a única via.
- Segredos em cofre (Vault/KMS), rotação trimestral, princípio do menor privilégio.
- Plano de resposta a incidentes com comunicação pública em 72 h.
- Programa de recompensa por vulnerabilidades (bug bounty) desde o lançamento.

## 10. Checklist de anonimato na interface

Toda tela que toca em identidade deve:
- [ ] Nunca pedir nome, e-mail ou telefone.
- [ ] Exibir pseudônimos sempre com o mesmo componente (`.handle`), com avatar gerado deterministicamente (identicon).
- [ ] Avisar antes de qualquer ação que crie vínculo externo (saque via parceiro, canal de notificação externo).
- [ ] Oferecer "ocultar meu pseudônimo nesta página pública" ao vendedor.
- [ ] Mostrar o relatório de metadados removidos ao vendedor após o upload.
- [ ] Mostrar no checkout o que a plataforma registra sobre a compra (item, valor, data) e o que não registra.
