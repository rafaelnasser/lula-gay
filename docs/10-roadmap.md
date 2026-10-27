# 10 · Roadmap

## Fase 0 · Fundamentos (semanas 1–3)
- Entidade, jurisdição e parecer jurídico sobre: registros de acesso (Marco Civil), custódia de cripto de usuários (Lei 14.478/2022 e regulação do Banco Central), termos de uso, política de conteúdo, declarações do vendedor, contratos de licença e cessão.
- Tesouraria cripto: BTCPay Server em produção, nós/indexadores de Polygon, Tron e Base, carteira quente/fria com multisig, cotação US$/USDT.
- Infra base: Postgres, Redis, MinIO, Vault, CI/CD, ambientes, backups.
- Design system implementado como componentes (a partir de `design/assets/`).

## Fase 1 · MVP (semanas 4–14)

**Contas e carteira**
- Cadastro pseudônimo (handle, senha, frase de recuperação), login, recuperação, TOTP, sessões.
- Carteira: depósito em USDT/USDC (Polygon, Tron, Base) e Bitcoin (Lightning, on-chain), extrato em US$ e USDT, saque em cripto com limite antifraude, lotes horários.
- Ledger de partidas dobradas, reconciliação diária.

**Oferta**
- Assistente de envio em 6 passos; upload direto ao S3; pipeline de ingestão (AV, metadados, hash, prévias, varreduras, OCR).
- Modelos: **Cópias, Exclusivo (preço fixo + oferta), Lacre coletivo, Pedido com recompensa**, com o modificador **compra com exclusividade** em Cópias e Lacre coletivo.
- País e idioma em todo item e pedido; filtro de país no catálogo e no mural; interface em português, inglês e espanhol.
- Painel do vendedor, lista de anúncios, feedback da curadoria, ganhos, reputação v1.

**Demanda**
- Catálogo público com filtros, página do item (6 variantes de painel de compra), página de prova, mural de pedidos, políticas.
- Checkout, cofre, visualizador seguro (PDF, imagens, vídeo, CSV), download com marca d'água, apoios, disputas, mensagens filtradas, notificações in-app e push.

**Curadoria**
- Fila, workbench com checklist em 7 blocos, autenticidade, redação de assets, regra de dois olhos, escalonamento jurídico, decisões com códigos.
- Publicação: fila de posts, geração de card, X + Telegram + Bluesky + RSS, marcos automáticos.
- Disputas, denúncias públicas, contas (risco, restrição, banimento), financeiro (custódia, saques, reconciliação), auditoria, configurações.

**Lançamento**
- Pentest externo. Convidar 30 vendedores selecionados para popular o catálogo antes de abrir ao público (catálogo não pode nascer vazio).
- Abertura com 30 itens ativos e 2 lacres coletivos de interesse público em destaque.

## Fase 2 · Expansão (meses 4–6)
- **Leilão** (aberto, lacrado, holandês), **Camadas**, **Assinatura**.
- Metas estendidas, preço escalonado, compra em grupo.
- Análise expressa e destaque pagos; Conta Pro com alertas.
- Instagram/Threads; cards por canal; melhores horários.
- Reputação v2 (selos: Rompeu lacres, Fonte recorrente, Verificado 10×).
- Espelho `.onion`; cifragem ponta a ponta opcional nas mensagens.
- Equivalente em moeda local (BRL, EUR, ARS) como referência de exibição; exclusividade também em Assinatura.
- Escrow on-chain (USDC em Base/Polygon) para reduzir a custódia pela plataforma; Monero como opção de depósito.
- Canal de notificação externo opcional (Telegram bot) com aviso de vínculo.

## Fase 3 · Profundidade (meses 7–12)
- **Janela exclusiva**, **Licença** com contratos gerados, **Consulta paga**.
- Âncora de prova em blockchain (OpenTimestamps).
- API de catálogo e de datasets para compradores institucionais.
- Apps móveis (PWA já cobre o essencial; nativo só se o push anônimo for insuficiente).
- Curadoria assistida por modelos (sugestão de redação, detecção de duplicidade semântica) sempre com decisão humana.

## Equipe mínima para o MVP
- 1 engenheiro full-stack (web + API), 1 engenheiro backend/infra (ingestão, pagamentos, segurança), 1 designer de produto (meio período, a partir deste material), 2 curadores (um com formação jurídica), 1 pessoa de operação/publicação.

## Riscos principais e resposta

| Risco | Resposta |
|---|---|
| Catálogo nasce vazio | Curadoria ativa de 30 vendedores antes do lançamento; pedidos com recompensa semeados pela própria equipe |
| Item ilegal passa pela curadoria | Dois olhos em risco alto, jurídico, denúncia pública com suspensão preventiva, fundo de garantia para reembolsos |
| Promessa de anonimato maior do que a lei permite | Texto público exato sobre registros de acesso e parceiros de pagamento; revisão jurídica do copy |
| Fraude do vendedor (conteúdo falso) | Conteúdo completo analisado antes de publicar; nível de autenticidade público; disputas |
| Vazamento de conteúdo comprado | Marca d'água por entitlement; somente leitura para itens sensíveis; termos |
| Enquadramento como custodiante de ativos virtuais | Parecer jurídico na fase 0; escrow on-chain na fase 2; tesouraria com multisig e reconciliação diária |
| Volatilidade e segurança da tesouraria | Créditos em stablecoin; conversão imediata de BTC; carteira quente limitada a 48 h de saques |
| Equipe de curadoria vira gargalo | Triagem automática, limites de envio por vendedor novo, análise expressa paga, métricas por curador |
