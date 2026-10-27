# 03 · Anonimato e segurança

## 1. O que prometemos e o que não prometemos

**Prometemos:**
- Vendedores e compradores nunca sabem quem é o outro. Nem a plataforma precisa saber quem são.
- Nenhuma conta exige nome, e-mail, telefone, CPF ou documento.
- O marketplace não armazena identidade de ninguém. Se o banco de dados vazar, o que vaza são pseudônimos, históricos de itens e endereços de pagamento de itens em andamento.
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
| Público (redes) | Prévia, prova, pseudônimo do vendedor | O pseudônimo é sempre exibido (é a reputação); nada além dele existe |
| Equipe de curadoria | Conteúdo completo, pseudônimo, histórico | Acesso registrado em log imutável, 2FA, regra de dois olhos, sem download do conteúdo bruto |
| Operador da infraestrutura | Banco de dados, arquivos cifrados | Arquivos cifrados com chave por item; chaves em KMS separado; dados do marketplace sem PII |
| Análise de blockchain | Endereço derivado do item ↔ carteira de origem do comprador | Endereço novo por pagamento; endereços de origem apagados na finalização; orientação para pagar de uma carteira própria e não reutilizada |
| Observador de rede | IP, horário, volume | TLS, suporte a Tor (espelho .onion), sem rastreadores de terceiros, sem CDN para páginas autenticadas |
| Estado com ordem judicial | Registros de acesso (obrigatórios por lei, ver §8) + registros da corretora onde o usuário comprou cripto | Registros de acesso cifrados, com retenção mínima legal e acesso restrito a procedimento jurídico |
| Comprador que vaza o conteúdo | O conteúdo em si | Marca d'água por entitlement; termos; não identifica pessoa, identifica a conta |
| Metadados do arquivo | Autor, GPS, dispositivo, software | Remoção automática no upload, antes da curadoria |
| Estilometria / padrões | Estilo de escrita, horários | Aviso ao vendedor; opção de a curadoria reescrever título e descrição |

## 3. Conta pseudônima

**Criação (3 passos, sem nenhum dado pessoal):**
1. **Pseudônimo gerado**: `palavra-hex4` (ex.: `coruja-7f3a`). O usuário pode sortear outro quantas vezes quiser. Não é editável depois (evita personalização que identifica).
2. **Senha** (mínimo 12 caracteres), **passkey** (WebAuthn) ou **arquivo de acesso**: um arquivo `pseudonimo.lacre` (cerca de 1 KB) com uma chave privada Ed25519 cifrada por um PIN opcional (Argon2id + XChaCha20-Poly1305). Para entrar, o usuário escolhe o arquivo no dispositivo; o navegador decifra localmente, assina um desafio único do servidor e o servidor confere com a chave pública que guardou. O arquivo nunca é enviado. Pode ser regenerado (revogando o anterior) em Configurações › Segurança. Senha: hash Argon2id.
3. **Frase de recuperação** de 12 palavras (BIP-39 em português). É o único jeito de recuperar a conta. A plataforma mostra uma vez, pede confirmação de 3 palavras e nunca mais exibe. Sem e-mail, não há "esqueci minha senha" por fora.

**Segurança adicional (opcional):** TOTP (app autenticador), sessões com expiração curta, lista de sessões ativas, PIN para abrir o cofre.

**O que a conta armazena:** pseudônimo, hash da senha, chave pública da passkey, chave pública e impressão digital do arquivo de acesso, hash da frase de recuperação (para validar, não para recuperar), segredo TOTP cifrado, data de criação, preferências, reputação. Nenhum saldo: o dinheiro fica nas carteiras dos itens. **Nada mais.**

**Arquivo de acesso: o que avisar ao usuário.** Quem tem o arquivo (e o PIN, se houver) entra na conta; sem PIN o arquivo é uma chave pura. A interface recomenda o PIN, pede confirmação de guarda segura e permite revogar. Mitigação adicional: limite de 5 tentativas de PIN por hora por arquivo (o desafio é por arquivo), e aviso in-app a cada entrada com um método ainda não usado naquele dispositivo.

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

## 6. Dinheiro: uma carteira cripto por item, nenhum saldo guardado

**Decisão de produto: a plataforma não guarda saldo de ninguém.** Não existe carteira interna, crédito, depósito nem saque. Todo pagamento entra e sai em cripto, direto entre a carteira do pagador e a **carteira do item**.

**Carteira do item.** Quando a curadoria aprova um item (ou um pedido com recompensa), a plataforma gera uma carteira nova para ele, em hardware seguro (HSM), e publica o endereço na página de prova. É uma carteira hierárquica (HD): cada comprador ou apoio recebe um endereço derivado próprio, com valor exato, o que permite atribuir cada pagamento e reembolsá-lo à origem. Qualquer pessoa pode conferir on-chain quanto entrou.

**Pagar.** O comprador paga da própria carteira cripto (MetaMask, Trust, Ledger, carteira de celular) para o endereço derivado dele no item. A interface insiste: pagar de uma carteira que a pessoa controla, nunca direto de uma corretora, porque reembolsos voltam ao endereço de origem. O acesso é liberado automaticamente ao atingir as confirmações da rede.

**Finalizar.** O item finaliza quando a venda se conclui e a janela de disputa de 72 h vence (Exclusivo), quando o lacre rompe e as 72 h vencem (Lacre coletivo), quando o atendimento é validado (Pedido) ou quando o vendedor encerra as vendas (Cópias, após a última janela de disputa). Na finalização, a plataforma, a partir da carteira do item: (1) transfere a **comissão de 10 %** para a carteira da plataforma; (2) executa reembolsos pendentes de disputas procedentes; (3) **entrega a carteira ao vendedor**: a frase de recuperação é exibida uma única vez, na tela, após senha e TOTP, nunca enviada por mensagem; (4) apaga a própria cópia da chave (crypto-shredding) e registra o evento na auditoria com hash. O vendedor transfere os fundos para onde quiser. A interface pede que ele transfira imediatamente para uma carteira própria.

**Falhar.** Lacre que não bate a meta, pedido que expira ou item retirado antes da finalização: cada pagamento volta ao endereço de origem a partir da carteira do item, descontada só a taxa de rede. Item retirado depois da finalização: os compradores são reembolsados pelo **fundo de garantia** da plataforma (2 % de cada comissão), porque os fundos já estão com o vendedor.

**Moedas e redes.** USDT e USDC em Polygon, Tron e Base, por terem taxas baixas: um lacre com 1.187 apoios pode precisar de 1.187 reembolsos. Bitcoin on-chain só em Exclusivo e Cópias (poucos pagamentos, poucos reembolsos). Lightning não, porque uma invoice não é reembolsável à origem. Preços em US$; stablecoins valem 1:1.

**Comissão.** Única: **10 %**, separada só na finalização. Nada é cobrado se um lacre falhar ou um pedido expirar.

**O que a plataforma guarda.** A chave da carteira do item, no HSM, só até a entrega. Os endereços de origem dos pagamentos, só até a finalização, para reembolsos. O histórico de pagamentos por item (valor, rede, txid, confirmações), para a prova pública e para disputas. **Nunca um saldo de usuário.**

**Regulação (validar com advogado antes do lançamento).** Sem saldos nem saques de usuários, a plataforma deixa de se parecer com uma corretora ou custodiante permanente. Ainda assim, ela controla as chaves da carteira do item durante a campanha, o que pode ser lido como custódia temporária em algumas jurisdições (Lei 14.478/2022 no Brasil; MiCA na UE). Duas respostas: (1) parecer sobre a sede e o enquadramento dessa custódia temporária; (2) fase 2: contrato de escrow on-chain (USDC em Base ou Polygon) em que os fundos ficam no contrato, a plataforma só assina a liberação ou o reembolso e o contrato paga o vendedor em um endereço dele, o que elimina a custódia temporária e a entrega de frase.

## 6b. Idioma e país sem pedir localização

A interface segue o idioma do navegador (`Accept-Language` no servidor, `navigator.languages` no cliente): português, inglês ou espanhol, com inglês como padrão para os demais. O catálogo abre, por padrão, nos itens do país do usuário. O país é inferido **sem pedir permissão de localização e sem guardar IP**, nesta ordem:

1. Escolha salva pelo usuário no seletor de idioma e país (armazenada só no dispositivo; opcionalmente nas preferências da conta).
2. Região do idioma do navegador (`pt-BR` → Brasil, `es-AR` → Argentina, `en-GB` → Reino Unido).
3. Fuso horário do navegador (`America/Sao_Paulo` → Brasil, `Europe/Lisbon` → Portugal).
4. Em produção, país do IP calculado na borda (GeoIP) e descartado na mesma requisição: só o código do país chega à aplicação, nunca o IP.
5. Sem sinal: Global.

Não usamos a API de geolocalização do navegador (GPS): ela exige um pedido de permissão que assusta quem busca anonimato, entrega posição exata (desnecessária para um filtro por país) e não funciona em Tor. O usuário vê sempre o que foi detectado ("Detectado pelo navegador: Português · Brasil") e troca com um clique.

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
| Estados Unidos | DMCA (direitos autorais, notificação e retirada), regras de valores mobiliários, sanções (OFAC) | Takedown formal; triagem de países sancionados nos pagamentos |

Decisões de negócio e jurídicas, não técnicas: (1) escolher a sede e documentar publicamente o que ela implica; (2) cumprir a guarda de registros com minimização (sistema separado, cifrado, retenção exata, destruição automática, nunca consultado pelo marketplace); (3) manter uma lista de países bloqueados para pagamentos conforme sanções aplicáveis à sede. A promessa pública deve dizer exatamente qual opção foi escolhida: prometer o que a lei da sede não permite destrói a confiança no primeiro incidente.

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
- [ ] Mostrar o relatório de metadados removidos ao vendedor após o upload.
- [ ] Mostrar no checkout o que a plataforma registra sobre a compra (item, valor, data, endereço de origem até a finalização) e o que não registra.
