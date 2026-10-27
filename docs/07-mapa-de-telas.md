# 07 · Mapa de telas

Todas as telas estão prototipadas em HTML navegável em `design/` (abra `design/index.html`). Este documento é a especificação de cada tela: objetivo, blocos, estados e ações. Convenções de implementação do protótipo em `design/README.md`.

## Mapa

```
PÚBLICO (sem login)              AUTH                  COMPRADOR                 VENDEDOR                   CURADORIA (equipe)
public/home.html                 auth/criar-conta      buyer/painel              seller/painel              admin/painel
public/explorar.html             auth/entrar           buyer/carteira            seller/novo-anuncio        admin/fila
public/item.html (6 variantes)   auth/recuperar        buyer/checkout (variantes) seller/anuncios           admin/analise (workbench)
public/prova.html                                      buyer/cofre               seller/anuncio             admin/juridico
public/pedidos.html                                    buyer/visualizador        seller/ganhos              admin/publicacao
public/pedido.html                                     buyer/apoios              seller/pedidos             admin/disputas
public/como-funciona.html                              buyer/pedidos             seller/reputacao           admin/denuncias
public/vendedor.html                                   buyer/mensagens (compartilhada)                      admin/contas
public/politicas.html                                  buyer/disputa                                        admin/financeiro
                                                       buyer/notificacoes (compartilhada)                   admin/auditoria
                                                       buyer/configuracoes (compartilhada)                  admin/configuracoes
```

Uma mesma conta é comprador e vendedor. A troca de papel é um link na barra lateral. Mensagens, notificações e configurações são telas compartilhadas (vivem em `buyer/` por convenção).

## Fluxos principais

1. **Comprar uma cópia**: explorar → item → checkout (saldo suficiente ou depositar) → cofre → visualizador → (opcional) disputa em 72 h.
2. **Apoiar um lacre coletivo**: item (variante coletivo) → checkout (valor do apoio) → apoios (acompanhar) → notificação "lacre rompido" → cofre.
3. **Vender**: criar conta → área do vendedor → novo anúncio (6 passos) → anúncios (em análise) → notificação da curadoria (ajustes ou aprovado) → anúncio (publicado) → ganhos → saque.
4. **Pedir informação**: pedidos → novo pedido (modal) → curadoria aprova → público soma recompensa → vendedor atende → curadoria valida → contribuidores recebem acesso.
5. **Curadoria**: fila → análise (checklist 7 blocos, autenticidade, redação) → decisão → (jurídico) → publicação (post gerado) → prova pública.
6. **Disputa**: cofre → abrir disputa → curadoria compara prévia e conteúdo → resolução → reembolso em créditos.

---

## PÚBLICO

### `public/home.html` · Página inicial
- **Hero**: título ("Informação com lacre. Anonimato dos dois lados."), subtítulo com as 3 garantias, botões "Explorar o catálogo" e "Vender informação"; ao lado, um card de item em destaque (lacre coletivo em andamento com barra de progresso ao vivo).
- **Faixa de confiança**: números (itens curados, lacres rompidos, R$ liberados ao público, tempo mediano de curadoria) e os 4 nomes de modelos.
- **Como funciona** em 3 passos para quem compra e 3 para quem vende.
- **Lacres coletivos em andamento** (3 cards com progresso).
- **Novos no catálogo** (grade de 6 cards de item).
- **Pedidos com recompensa** (3 cards).
- **Anonimato**: bloco explicando o que não pedimos (nome, e-mail, telefone) e um link para "Anonimato e seus limites".
- **Prova pública**: bloco mostrando um post do X com card e link da prova.
- CTA final: criar conta anônima.

### `public/explorar.html` · Catálogo
- Barra de busca, chips de categoria, filtros laterais (modelo de venda, tipo de conteúdo, nível de autenticidade, faixa de preço, status: ativo / financiado / encerrando em 24 h), ordenação (recentes, mais apoiados, encerrando, preço).
- Alternância grade/lista. Grade de cards de item: prévia selada, categoria, chip do modelo, título, autenticidade, vendedor (ou "vendedor oculto"), preço ou progresso + prazo.
- Seção ancorada `#coletivos` com os lacres coletivos.
- Paginação. Estado vazio para busca sem resultados (mostrar como exemplo em uma aba ou nota).

### `public/item.html` · Página do item (6 variantes do painel de compra)
Coluna principal: prévia grande selada (com seletor de miniaturas: capa, página tarjada, amostra de dados), título curado, categoria, tags, selo de curadoria com nível de autenticidade e número de curadores, descrição, "O que você recebe" (lista de arquivos com tamanho e tipo, sem nomes sensíveis), "O que a curadoria verificou" (resumo por bloco), avisos (ex.: "contém nomes de agentes públicos no exercício da função"), hash do pacote (abreviado, link para a prova), vendedor (pseudônimo, reputação, itens aprovados, desde) ou "vendedor optou por não exibir o pseudônimo", perguntas públicas respondidas (Q&A moderado), itens relacionados.
Coluna lateral (painel fixo) com uma variante por modelo. Um seletor de desenvolvimento no canto permite alternar:
1. **Lacre coletivo**: arrecadado em destaque, meta, barra, apoiadores, prazo com contagem, regra de liberação ("Quando bater, fica público para todos. Apoiadores veem 24 h antes."), botões de valor (R$ 20 / 50 / 100 / 250 / outro), botão "Apoiar", metas estendidas, atualizações do vendedor, marcos postados.
2. **Cópias**: preço, "37 de 100 restantes", preço escalonado se houver, botão "Comprar cópia", "entrega imediata no cofre", direitos (download permitido / somente leitura), janela de disputa 72 h.
3. **Exclusivo**: preço, "um único comprador", botão "Comprar exclusividade", "Fazer uma oferta" (campo com mínimo), exclusividade declarada de 24 meses, destruição do conteúdo após a venda.
4. **Leilão lacrado**: "7 lances lacrados", reserva não revelada, encerra em (contagem), campo de lance único, explicação do segundo preço, saldo reservado.
5. **Camadas**: lista de camadas com conteúdo, preço e botão; indicador do que o usuário já tem.
6. **Assinatura**: preço por período, periodicidade, nº de assinantes, última edição, botão "Assinar", edições anteriores avulsas.
Rodapé do painel em todas: "Compra anônima. Registramos item, valor e data. Nada mais." e botão "Denunciar este item".

### `public/prova.html` · Página de prova
- Cabeçalho com selo grande e "Prova de curadoria".
- Título, categoria, status atual (badge) e progresso (se coletivo).
- Hash SHA-256 do pacote (completo, com copiar) e lista de hashes dos arquivos.
- Carimbo de tempo da aprovação, versão da política, nível de autenticidade, nº de curadores e revisão jurídica (sim/não).
- Prévia aprovada.
- Vendedor (se exibido) e reputação.
- "Como verificar" (passos para conferir o hash de um arquivo recebido: comando `sha256sum`, campo para colar um hash e comparar).
- Linha do tempo pública: enviado, aprovado, publicado, marcos, liberado/vendido.
- Botões: "Ver item", "Compartilhar", "Denunciar" (`#denunciar` abre formulário com motivo, descrição, contato opcional).

### `public/pedidos.html` · Mural de pedidos
- Explicação em uma linha + botão "Fazer um pedido" (leva ao login se deslogado).
- Filtros (categoria, recompensa mínima, status) e cards de pedido: título, recompensa acumulada, contribuidores, prazo, status (aberto / em curadoria / atendido), critérios de aceite resumidos, botões "Somar à recompensa" e "Tenho essa informação".

### `public/pedido.html` · Página do pedido
- Título, autor (pseudônimo), categoria, descrição, critérios de aceite (lista numerada), formato esperado, prazo.
- Painel lateral: recompensa acumulada, nº de contribuidores, botões de valor, "Somar à recompensa", regra ("Quem contribuir recebe acesso. Se ninguém atender até o prazo, tudo volta para as carteiras."), botão "Tenho essa informação" (leva ao assistente de envio com o pedido vinculado).
- Atendimentos: contagem de atendimentos em curadoria (sem detalhes).
- Perguntas públicas ao autor (Q&A moderado).

### `public/como-funciona.html` · Como funciona
- Abas: Para quem compra / Para quem vende / Curadoria / Dinheiro / Perguntas frequentes.
- Cada aba com passos numerados, ilustrações em cards e links para as telas.
- Seção `#reputacao`: como a reputação é calculada.
- FAQ em acordeões (details/summary).

### `public/vendedor.html` · Para vendedores
- Hero orientado a benefício ("Você define o preço. Nós garantimos o pagamento e o anonimato.").
- Tabela comparativa dos modelos de venda (quem compra, quando recebe, taxa).
- Passo a passo do envio (6 passos).
- O que aceitamos / o que não aceitamos (resumo com link para políticas).
- Simulador simples de ganhos (preço × unidades − taxa) com JS.
- CTA: criar conta e enviar o primeiro item.

### `public/politicas.html` · Políticas
- Índice lateral fixo com âncoras: Política de conteúdo (pode / não pode), `#anonimato` Anonimato e seus limites (texto honesto sobre parceiros de pagamento e registros de acesso), Curadoria, Disputas e reembolsos, Taxas, `#juridico` Pedidos jurídicos e de titulares (LGPD), Termos resumidos, Versões da política.

## AUTH

### `auth/criar-conta.html` · Criar conta anônima (3 passos)
1. **Pseudônimo**: gerado (`coruja-7f3a`) com botão "Sortear outro"; aviso de que não poderá ser alterado; nenhum campo de e-mail/telefone, com um bloco "O que não pedimos".
2. **Senha ou passkey**: campo de senha (mín. 12), medidor de força, opção "Usar passkey em vez de senha".
3. **Frase de recuperação**: 12 palavras em grade, botões copiar e baixar, aviso "mostramos uma vez", checkbox "anotei", depois confirmação de 3 palavras (campos: palavra 3, 7, 11).
Final: "Conta criada" com o pseudônimo, botão "Ir para o catálogo".

### `auth/entrar.html` · Entrar
- Pseudônimo + senha, botão "Entrar com passkey", link "Perdi minha senha" (vai para recuperar).
- Segundo passo opcional: código TOTP (6 campos).
- Aviso: sem e-mail, a frase de recuperação é a única saída.

### `auth/recuperar.html` · Recuperar com a frase
- 12 campos de palavra com autocompletar da lista BIP-39, botão "Verificar", em seguida definir nova senha. Mensagem de erro quando a frase não bate.

## COMPRADOR

### `buyer/painel.html`
- Saudação com pseudônimo, saldo e botão depositar.
- Blocos: "Apoios em andamento" (progresso de cada lacre), "Novidades no cofre" (itens recentes com acesso), "Acompanhando" (favoritos com alertas: preço, encerrando, financiado), "Pedidos que você fez", "Recomendados" por categorias seguidas.
- Alertas: disputa em andamento, assinatura a renovar, lacre encerrando em 24 h.

### `buyer/carteira.html`
- Cartões: saldo disponível, em custódia (apoios ativos), reservado (lances/ofertas).
- Saldo exibido em R$ com o equivalente em USDT (os créditos são guardados em USDT; preços em R$ são convertidos no momento de cada operação).
- Abas: **Depositar** (USDT Polygon, USDT Tron, USDC Polygon/Base, Bitcoin Lightning, Bitcoin on-chain; endereço novo por depósito com QR, confirmações exigidas, cotação travada por 10 min para BTC, explicação de que o endereço não é vinculado a identidade), **Sacar** (moeda, rede, endereço informado na hora e apagado após o envio, taxa de rede repassada, senha + TOTP, limite antifraude para contas novas), **Extrato** (tabela com tipo, referência, valor em R$ e USDT, saldo após, status) e **Redes e taxas** (moeda, rede, confirmações, mínimo de depósito, taxa de saque).

### `buyer/checkout.html` · Checkout (variantes)
- Resumo do item, variantes do que está sendo pago: cópia, exclusivo, apoio (valor livre), lance lacrado, camada, licença, assinatura.
- Saldo disponível vs. valor; se insuficiente, bloco "Depositar a diferença" inline.
- O que acontece depois (entrega imediata / custódia / reembolso automático).
- Transparência: "o que registramos sobre esta compra". Valor em R$ e o débito equivalente em USDT.
- Aceite dos termos do modelo e botão de confirmação. Tela de sucesso (variante) com link para o cofre ou apoios.

### `buyer/cofre.html`
- Filtros por tipo de acesso (compra, apoio, assinatura, pedido, licença) e status (disponível, aguardando liberação, expirado, revogado).
- Cards/linhas: item, forma de acesso, data, direitos (download com marca d'água / somente leitura), botões "Abrir no visualizador", "Baixar", "Abrir disputa" (se dentro das 72 h), "Ver prova".
- Aviso de marca d'água por entitlement.

### `buyer/visualizador.html`
- Visualizador seguro em tela cheia: barra superior (título, página x/y, zoom, busca no documento, abrir disputa), documento com marca d'água visível ("@coruja-7f3a · ENT-3F9A" no rodapé), navegação de páginas, abas para arquivos do pacote (PDF, planilha com grade de amostra, vídeo com player, imagens em galeria).
- Aviso de sessão de visualização expira em 15 min (renova automaticamente). Download desabilitado quando o item é somente leitura.

### `buyer/apoios.html`
- Lista de lacres apoiados com progresso, valor apoiado, status (em andamento / rompido / falhou e reembolsado), prazo, botão "Apoiar mais", "Compartilhar" (link anônimo), "Ver no cofre" quando liberado.
- Aba "Recompensas de pedidos" com contribuições a pedidos.
- Total apoiado e selos ("Rompeu 3 lacres").

### `buyer/pedidos.html`
- Botão "Novo pedido" abre modal: título, categoria, descrição, critérios de aceite (lista), formato esperado, recompensa inicial, prazo, regra de liberação; aviso de curadoria.
- Lista de pedidos do usuário com status (em curadoria / aberto / atendimento em análise / atendido / expirado), recompensa acumulada e contribuidores.
- Detalhe expandido do pedido "em análise": "1 atendimento aguardando curadoria".

### `buyer/mensagens.html` (compartilhada)
- Layout de chat: lista de conversas por item/pedido à esquerda; conversa à direita com mensagens, mensagem de sistema ("Conversa vinculada ao item X. Expira 90 dias após o encerramento."), exemplo de mensagem filtrada (tentativa de passar e-mail bloqueada com explicação), campo de envio.

### `buyer/disputa.html`
- Abrir disputa: item, motivo (conteúdo diferente da prévia / corrompido / duplicado / autenticidade / outro), descrição, anexos (capturas), prazo restante.
- Acompanhar: linha do tempo (aberta → em análise → resolvida), resposta da curadoria, resultado (reembolso total/parcial/mantida) e saldo devolvido.

### `buyer/notificacoes.html` (compartilhada)
- Lista agrupada por dia; tipos: curadoria (aprovado/ajustes), lacre (marco/rompido/falhou), compra, mensagem, disputa, saque, segurança (novo login). Filtro por tipo e "marcar todas como lidas". Preferências de push.

### `buyer/configuracoes.html` (compartilhada)
- Abas: **Segurança** (senha, passkeys, TOTP, sessões ativas com dispositivo e data, PIN do cofre, encerrar todas), **Recuperação** (ver frase exige senha; status "confirmada em dd/mm"), **Privacidade** (ocultar pseudônimo em páginas públicas, apagar mensagens ao encerrar, permitir marca d'água invisível), **Notificações** (push por tipo), **Aparência** (tema), **Conta** (exportar dados que existem sobre a conta, excluir conta com condição de saldo zero).

## VENDEDOR

### `seller/painel.html`
- Resumo: saldo disponível, em custódia, vendas do mês, itens ativos; gráfico de barras de vendas por semana (uma série).
- "Pendências": item com ajustes solicitados, item aguardando confirmação de edição da curadoria, saque pendente.
- "Seus anúncios" (resumo por status), "Pedidos abertos que combinam com você" (3 cards), "Dicas de anonimato para vendedores".

### `seller/novo-anuncio.html` · Assistente de envio (6 passos em uma tela)
1. **Tipo e categoria**: cards de tipo (documento, dados, imagem, vídeo, áudio, texto, código, pacote), categoria (select) com nível de risco exibido, vinculação opcional a um pedido existente.
2. **Arquivos**: dropzone, lista de arquivos com progresso e hash local, relatório de metadados removidos (ex.: "EXIF: GPS, dispositivo; DOCX: autor"), alertas da triagem automática (ex.: "detectamos 12 nomes próprios"), limite 20 GB.
3. **Prévia e descrição**: título (até 120), resumo (até 280), descrição (markdown restrito), seleção de prévias geradas (borradas/tarjadas) com opção de marcar o que a curadoria pode mostrar, tags, aviso "a curadoria pode reescrever título e resumo".
4. **Modelo de venda**: cards dos modelos (Cópias, Exclusivo, Lacre coletivo, Pedido, Leilão, Camadas, Assinatura, Janela, Licença) com os da V2/V3 marcados "em breve"; configuração do modelo escolhido (campos específicos: preço, limite, meta, prazo, regra de liberação, metas estendidas, reserva, incremento, camadas, período); simulação de ganho líquido com a taxa; modificadores (marca d'água, somente leitura, acesso antecipado, garantia de exclusividade).
5. **Declarações**: 6 checkboxes com texto completo (origem lícita; titularidade ou direito de venda; sem dados pessoais de terceiros sem base legal; sem conteúdo íntimo/menores; sem credenciais; não é informação privilegiada de mercado nem sob sigilo legal), opção "ocultar meu pseudônimo na página pública", aviso de que as declarações ficam registradas.
6. **Revisão e envio**: resumo de tudo, prazo estimado da curadoria (48 h), "o que acontece agora", botão "Enviar para curadoria". Tela de sucesso.

### `seller/anuncios.html`
- Abas por status (Todos, Rascunhos, Em curadoria, Ajustes solicitados, Agendados, Ativos, Encerrados, Rejeitados) com contagens.
- Tabela: prévia pequena, título, modelo, status, métrica principal (vendas / arrecadado / lances), prazo, ações (editar, ver feedback, encerrar, duplicar).

### `seller/anuncio.html` · Detalhe do anúncio (visão do vendedor)
- Cabeçalho com status e ações. Abas: **Visão geral** (métricas: visitas, favoritos, conversão, arrecadado/vendas, gráfico), **Curadoria** (linha do tempo da análise, feedback com códigos, diffs do título reescrito, botão "Aceitar edição" / "Responder ajustes"), **Conteúdo** (arquivos, hashes, versões redigidas), **Publicação** (posts feitos nas redes com métricas), **Perguntas** (Q&A público para responder), **Compradores** (apenas contagens e pseudônimos quando permitido; nunca dados pessoais).

### `seller/ganhos.html`
- Cards: disponível, em custódia (com data de liberação por item), sacado no total, taxas pagas.
- Tabela de vendas (item, modelo, bruto, comissão de 10 %, líquido, status: custódia/liquidado/reembolsado, data).
- Sacar: só cripto (USDT/USDC/BTC; moeda, rede, endereço com aviso "não salvamos o endereço após o envio", taxa de rede, senha + TOTP), limite antifraude para contas novas, histórico de saques com txid.

### `seller/pedidos.html`
- Mural de pedidos abertos com filtros e cards; botão "Atender este pedido" leva ao assistente com o pedido vinculado; aba "Meus atendimentos" com status (em curadoria / aceito / recusado).

### `seller/reputacao.html`
- Nota geral, componentes (aprovações, autenticidade média, disputas perdidas, tempo de resposta), histórico, selos (Verificado 10×, Rompeu lacres, Fonte recorrente), como melhorar. Aviso de que a reputação é do pseudônimo.

## CURADORIA (equipe)

### `admin/painel.html`
- KPIs: itens na fila, SLA (% dentro de 48 h), aprovados/rejeitados na semana, tempo mediano, taxa de reversão, disputas abertas, denúncias abertas, posts agendados hoje.
- Gráficos simples: envios por dia (barras), decisões por código de rejeição (barras horizontais).
- Fila prioritária (5 itens de risco alto), alertas (triagem bloqueou 2 envios hoje; 1 ordem judicial recebida), atividade recente da equipe.

### `admin/fila.html`
- Tabela com filtros (status, risco, categoria, modelo, responsável, idade) e ordenação por prioridade; colunas: prioridade, item, categoria, modelo, risco, tempo na fila, triagem (ícones: AV ok, PII n, duplicado), responsável(is), dois olhos, ações (Assumir, Abrir).
- Linha expandida com resumo da triagem.

### `admin/analise.html` · Workbench de análise (3 colunas)
- **Esquerda**: visualizador seguro do conteúdo (abas por arquivo), ferramentas de redação (tarjar seleção, aplicar em nova versão), relatório de metadados removidos, OCR com busca, comparação com a prévia.
- **Centro**: ficha do item (título, descrição, modelo, preço, categoria, risco), vendedor (pseudônimo, reputação, histórico de decisões), triagem automática (AV, PII com amostras tarjadas, duplicidade, hash cliente = servidor), pessoas identificáveis listadas (com decisão por item: manter / tarjar), empresas citadas.
- **Direita**: checklist dos 7 blocos (veto marcado), nível de autenticidade (seletor), notas internas, segunda análise (status do segundo curador, sem ver as notas do primeiro), decisão (Aprovar / Aprovar com ajustes / Solicitar ajustes / Rejeitar / Escalar ao jurídico) com códigos de motivo e mensagem ao vendedor, prévia do que o vendedor verá.

### `admin/juridico.html`
- Fila de escalonamentos com risco, motivo (terceiros, direitos autorais, sigilo, difamação), prazo; detalhe com parecer (aprovar / aprovar com redação / rejeitar), fundamento legal, anexos; também pedidos de titulares (LGPD), notificações e ordens judiciais recebidas com prazo e status.

### `admin/publicacao.html`
- Fila de itens aprovados aguardando post; para cada: post gerado por canal (X, Telegram, Bluesky) com contador de caracteres, card de imagem renderizado (prévia borrada + título + modelo + hash), horário sugerido, botões "Editar", "Aprovar e agendar", "Publicar agora".
- Aba "Marcos automáticos" (25/50/75/90/100 %, vendido, último dia) pendentes de aprovação em um clique.
- Aba "Publicados" com métricas por post e por canal.

### `admin/disputas.html`
- Lista com prazo de resolução, item, motivo, valor; detalhe: alegação do comprador, anexos, prévia pública × conteúdo entregue (lado a lado), histórico do vendedor e do comprador em disputas, resolução (reembolso total / parcial com valor / manter) e nota.

### `admin/denuncias.html`
- Denúncias públicas e pedidos de titulares: item, motivo, descrição, status, suspensão preventiva (toggle), decisão e comunicação; SLA de 15 dias para LGPD.

### `admin/contas.html`
- Busca por pseudônimo; lista com risco (score), itens, disputas, denúncias, saldo em custódia; detalhe: o que existe sobre a conta (lista explícita: pseudônimo, data de criação, itens, ledger, nenhuma identidade), ações (advertir, restringir envios, restringir saques, banir) com motivo obrigatório e registro em auditoria.

### `admin/financeiro.html`
- Saldos: total em carteiras (passivo), em custódia por modelo, comissões do mês, fundo de garantia, tesouraria por moeda/rede (quente × fria) e cobertura tesouraria ≥ passivo; fila de saques (lotes horários, aprovação de 2 pessoas), reembolsos automáticos (lacres que falharam), reconciliação diária (ledger × saldos materializados, divergência zero), conciliação on-chain (depósitos confirmados = créditos) e com o BTCPay.

### `admin/auditoria.html`
- Log imutável: data/hora, pessoa da equipe, ação, alvo, antes/depois (resumo), hash encadeado; filtros por pessoa, ação, período; exportar.

### `admin/configuracoes.html`
- Categorias (risco padrão, dois olhos, jurídico por padrão), comissão única de 10 % e fundo de garantia, SLAs, textos das declarações e políticas com versionamento, canais sociais conectados, equipe e papéis (RBAC), limites antifraude, redes e confirmações.
