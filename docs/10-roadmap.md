# 10 · Roadmap

## Fase 0 · Fundamentos (semanas 1–3)
- Entidade, jurisdição e parecer jurídico sobre: registros de acesso (Marco Civil), custódia de cripto de usuários (Lei 14.478/2022 e regulação do Banco Central), termos de uso, política de conteúdo, declarações do vendedor, contratos de licença e cessão.
- Carteiras de itens: HSM, nós e indexadores de Polygon, Tron, Base e Bitcoin, carteira da plataforma (comissões) com multisig, fluxo de entrega da frase de recuperação e destruição da chave.
- Infra base: Postgres, Redis, MinIO, Vault, CI/CD, ambientes, backups.
- Design system implementado como componentes (a partir de `design/assets/`).

## Fase 1 · MVP (semanas 4–14)

**Contas e carteira**
- Cadastro pseudônimo (handle, senha, frase de recuperação), login, recuperação, TOTP, sessões.
- Pagamentos diretos: endereço derivado por compra ou apoio, confirmações, liberação automática; finalização com comissão, reembolsos à origem e entrega da carteira ao vendedor; página de pagamentos do comprador e carteiras dos itens do vendedor.
- Livro de pagamentos por item, reconciliação on-chain diária.

**Oferta**
- Assistente de envio em 6 passos; upload direto ao S3; pipeline de ingestão (AV, metadados, hash, prévias, varreduras, OCR).
- Modelos: **Cópias, Exclusivo (preço fixo + oferta), Lacre coletivo, Pedido com recompensa (inclusive por unidade), Leilão, Camadas, Assinatura, Janela exclusiva e Licença**, com o modificador **compra com exclusividade** (opcional, desligado por padrão) em Cópias, Lacre coletivo e Camadas.
- País e idioma em todo item e pedido; filtro de país no catálogo e no mural; interface em português, inglês e espanhol.
- Painel do vendedor, lista de anúncios, feedback da curadoria, ganhos, reputação v1.

**Demanda**
- Catálogo público com filtros, página do item (6 variantes de painel de compra), página de prova, mural de pedidos, políticas.
- Checkout, cofre, visualizador seguro (PDF, imagens, vídeo, CSV), download com marca d'água, apoios, disputas, mensagens filtradas, notificações in-app e push.

**Curadoria**
- Fila, workbench com checklist em 7 blocos, autenticidade, redação de assets, regra de dois olhos, escalonamento jurídico, decisões com códigos.
- Publicação: fila de posts, geração de card, X + Telegram + Bluesky + RSS, marcos automáticos.
- Disputas, denúncias públicas, contas (risco, restrição, banimento), financeiro (carteiras de itens, finalizações, reembolsos, reconciliação), auditoria, configurações.

**Lançamento**
- Pentest externo. Convidar 30 vendedores selecionados para popular o catálogo antes de abrir ao público (catálogo não pode nascer vazio).
- Abertura com 30 itens ativos e 2 lacres coletivos de interesse público em destaque.

## Fase 2 · Expansão (meses 4–6)
- Melhorias dos modelos que já estão no MVP: reembolso em massa de lances em mais redes, SLA de 24 h medido para edições de assinatura, camadas com mais de cinco níveis.
- Preço escalonado, compra em grupo.
- Análise expressa e destaque pagos; Conta Pro com alertas.
- Instagram/Threads; cards por canal; melhores horários.
- Reputação v2 (selos: Rompeu lacres, Fonte recorrente, Verificado 10×).
- Espelho `.onion`; cifragem ponta a ponta opcional nas mensagens.
- Equivalente em moeda local (BRL, EUR, ARS) como referência de exibição; exclusividade também em Assinatura.
- Escrow on-chain (USDC em Base/Polygon): os fundos ficam em um contrato e vão direto ao endereço do vendedor na finalização, sem a plataforma controlar chaves nem entregar frase.
- Canal de notificação externo opcional (Telegram bot) com aviso de vínculo.

## Fase 3 · Profundidade (meses 7–12)
- **Consulta paga** (depende de reputação consolidada).
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
| Custódia temporária das chaves das carteiras de itens | Parecer jurídico na fase 0; chaves só no HSM e destruídas na entrega; escrow on-chain na fase 2 |
| Reembolsos em massa (lacre que falha) | Só redes baratas em lacres coletivos; lotes por rede; taxa de rede descontada do valor devolvido |
| Equipe de curadoria vira gargalo | Triagem automática, limites de envio por vendedor novo, análise expressa paga, métricas por curador |
