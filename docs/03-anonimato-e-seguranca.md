# 03 · Anonimato e segurança

## 1. O que prometemos e o que não prometemos

**Prometemos:**
- Vendedores e compradores nunca sabem quem é o outro. Nem a plataforma precisa saber quem são.
- Nenhuma conta exige nome, e-mail, telefone, CPF ou documento.
- O marketplace não armazena identidade de ninguém. Se o banco de dados vazar, o que vaza são pseudônimos, saldos e históricos de itens.
- Arquivos enviados têm metadados removidos antes de qualquer pessoa da equipe ver.
- A equipe de curadoria vê o conteúdo, mas não vê quem enviou além do pseudônimo e do histórico dele.

**Não prometemos (e a interface deve dizer isso com clareza):**
- Anonimato contra o próprio Estado em caso de ordem judicial. Dinheiro entra e sai só em cripto, mas a corretora ou o P2P onde o usuário comprou a cripto conhece a identidade dele, e transações on-chain são públicas e analisáveis. O marketplace não guarda esse vínculo; uma ordem judicial dirigida à corretora do usuário e à plataforma pode reconstruí-lo.
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
| Análise de blockchain | Endereço de depósito ↔ carteira de origem do usuário | Endereço novo por depósito, nunca reutilizado; Lightning para valores baixos; endereço de saque apagado após o envio; orientação para não reutilizar carteiras |
| Observador de rede | IP, horário, volume | TLS, suporte a Tor (espelho .onion), sem rastreadores de terceiros, sem CDN para páginas autenticadas |
| Estado com ordem judicial | Registros de acesso (obrigatórios por lei, ver §8) + registros da corretora onde o usuário comprou cripto | Registros de acesso cifrados, com retenção mínima legal e acesso restrito a procedimento jurídico |
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

## 6. Dinheiro: só cripto, dos dois lados

**Decisão de produto: todo pagamento entra e sai em cripto.** Não há PIX, cartão, boleto, parceiro de pagamento, voucher nem KYC na plataforma. Quem compra traz cripto; quem vende recebe cripto. Nenhum real toca o sistema.

**Princípio: a carteira desacopla pagamento de compra.** O usuário deposita cripto e recebe créditos na carteira interna; compras, apoios, lances e liberações são lançamentos internos entre carteiras e custódias. Quem olha a blockchain vê depósitos e saques, nunca o que foi comprado.

**Moedas e redes (MVP):**
- **USDT e USDC** nas redes Polygon e Tron (USDC também em Base). Creditados 1:1 após as confirmações exigidas (12 em Polygon, 19 em Tron). São a unidade de conta da carteira.
- **Bitcoin** on-chain e Lightning (BTCPay Server auto-hospedado). Convertido para créditos em USDT na hora, com cotação travada por 10 min no momento em que o endereço ou a invoice é gerado.
- V2: Monero (XMR) para quem quer privacidade on-chain mais forte, com aviso de que poucas corretoras o oferecem.

**Unidade de conta e preços.** A plataforma é global: preços em **dólar (US$)**, carteira em **USDT** (1 USDT = US$ 1, sem conversão). Depósitos em USDT e USDC creditam 1:1; depósitos em Bitcoin são convertidos para USDT na hora pela cotação travada (fonte: mediana de três corretoras, atualizada a cada minuto). O vendedor recebe o USDT retido na custódia, menos a comissão; a plataforma não carrega risco cambial. Na fase 2, a interface pode mostrar o equivalente na moeda local escolhida pelo usuário (BRL, EUR, ARS…) apenas como referência.

**Depósito.** Cada depósito gera um endereço novo (derivado de uma xpub por rede, nunca reutilizado). O indexador on-chain observa o endereço; ao atingir as confirmações, credita a carteira. Lightning: invoice com validade de 10 min. Nenhum endereço é vinculado a identidade; o marketplace registra apenas "crédito de X USDT na carteira Y".

**Saque.** O usuário informa moeda, rede e endereço na hora. Verificações automáticas: saldo disponível (nunca o que está em custódia), limite antifraude, endereço válido, senha + TOTP. Saques saem em lotes a cada hora de uma carteira quente que cobre 48 h de volume; o restante fica em carteira fria com multisig 2-de-3. O endereço de destino é apagado do banco após a confirmação na rede. A taxa de rede é repassada ao usuário.

**Limite antifraude (não é KYC).** Contas com menos de 7 dias ou sem nenhum item aprovado sacam até US$ 2.000 por dia. Serve para conter golpes de conta nova, não para identificar ninguém.

**Comissão.** Única: **10 %** sobre toda venda, apoio liberado e recompensa paga, em todos os modelos. Nada é cobrado se um lacre coletivo falhar.

**Ledger.** Partidas dobradas, imutável (append-only), em USDT com 6 casas, com contas: carteira do usuário, custódia por item/pedido, reserva (lances e ofertas), comissões, saques pendentes, reembolsos, tesouraria por moeda/rede. Ver `05`.

**Regulação (validar com advogado antes do lançamento).** Guardar cripto de usuários e intermediar pagamentos pode enquadrar a plataforma como prestadora de serviços de ativos virtuais (Lei 14.478/2022 e a regulamentação do Banco Central publicada em 2025, que exige autorização para operar). Duas respostas possíveis: (1) estruturar a operação para obter ou dispensar a autorização, conforme a jurisdição escolhida; (2) migrar a custódia para contratos de escrow on-chain (USDC em Base/Polygon) em que a plataforma só assina liberações e reembolsos e nunca detém os fundos, o que reduz o enquadramento como custodiante. O MVP assume (1); (2) está no roadmap da fase 2.

## 7. Comunicação entre partes

- Mensagens só dentro da plataforma, por item ou pedido.
- Filtro automático bloqueia e-mails, telefones, @ de redes, links externos e endereços de carteira. O objetivo é proteger o usuário de se identificar, não censurar.
- Mensagens expiram 90 dias após o encerramento do item.
- A curadoria pode ler conversas quando há disputa ou denúncia; o acesso é registrado.
- Opção V2: cifragem de ponta a ponta com chaves derivadas da senha, abrindo mão da leitura em disputas (o usuário escolhe).

## 8. Jurisdição e registros de acesso

A plataforma é global, mas a entidade que a opera tem uma jurisdição, e é ela que define as obrigações de guarda de registros, de resposta a autoridades e de ativos virtuais. Exemplos do que muda conforme a sede:

| Jurisdição | O que exige | Impacto na promessa de anonimato |
|---|---|---|
| Brasil | Marco Civil (Lei 12.965/2014, art. 15): guarda de registros de acesso (data, hora, IP) por 6 meses, entregues por ordem judicial; Lei 14.478/2022 para ativos virtuais | Registros de acesso cifrados em sistema separado, retenção mínima, acesso só por procedimento jurídico |
| União Europeia | GDPR (dados pessoais, inclusive de terceiros citados nos itens), DSA (moderação, denúncias, transparência), MiCA (cripto) | Fluxo de denúncias e transparência já previstos; custódia de cripto exige licença |
| Estados Unidos | DMCA (direitos autorais, notificação e retirada), regras de valores mobiliários, sanções (OFAC) | Takedown formal; triagem de países sancionados nos depósitos e saques |

Decisões de negócio e jurídicas, não técnicas: (1) escolher a sede e documentar publicamente o que ela implica; (2) cumprir a guarda de registros com minimização (sistema separado, cifrado, retenção exata, destruição automática, nunca consultado pelo marketplace); (3) manter uma lista de países bloqueados para depósitos e saques conforme sanções aplicáveis à sede. A promessa pública deve dizer exatamente qual opção foi escolhida: prometer o que a lei da sede não permite destrói a confiança no primeiro incidente.

Independentemente da sede, o conteúdo dos itens se refere a muitos países: a curadoria avalia dados pessoais, direitos autorais e sigilo pelas regras do país de origem da informação e pelas da sede (ver `04`).

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
- [ ] Avisar antes de qualquer ação que crie vínculo externo (reutilizar endereço de cripto, canal de notificação externo).
- [ ] Oferecer "ocultar meu pseudônimo nesta página pública" ao vendedor.
- [ ] Mostrar o relatório de metadados removidos ao vendedor após o upload.
- [ ] Mostrar no checkout o que a plataforma registra sobre a compra (item, valor, data) e o que não registra.
