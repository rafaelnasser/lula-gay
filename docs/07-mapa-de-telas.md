# 07 · Mapa de telas

Todas as telas estão prototipadas em HTML navegável em `design/` (abra `design/index.html`). Este documento é a especificação de cada tela: objetivo, blocos, estados e ações. Convenções de implementação do protótipo em `design/README.md`.

## Mapa

```
PÚBLICO (sem login)              AUTH                  COMPRADOR                 VENDEDOR                   CURADORIA (equipe)
public/home.html                 auth/criar-conta      buyer/painel              seller/painel              admin/painel
public/explorar.html             auth/entrar           buyer/pagamentos          seller/novo-anuncio        admin/fila
public/item.html (6 variantes)   auth/recuperar        buyer/checkout (variantes) seller/anuncios           admin/analise (workbench)
public/prova.html                                      buyer/cofre               seller/anuncio             admin/juridico
public/pedidos.html                                    buyer/visualizador        seller/carteiras           admin/publicacao
public/pedido.html                                     buyer/apoios              seller/pedidos             admin/disputas
public/como-funciona.html                              buyer/pedidos             seller/reputacao           admin/denuncias
public/vendedor.html                                   buyer/mensagens (compartilhada)                      admin/contas
public/politicas.html                                  buyer/disputa                                        admin/financeiro
public/guia-cripto.html                                buyer/notificacoes (compartilhada)                   admin/auditoria
                                                       buyer/configuracoes (compartilhada)                  admin/configuracoes
```

Uma mesma conta é comprador e vendedor. A troca de papel é um link na barra lateral. Mensagens, notificações e configurações são telas compartilhadas (vivem em `buyer/` por convenção).

## Elementos comuns a todas as telas

- **Seletor de idioma e país** no cabeçalho (ícone de globo com o país e o idioma atuais): idioma em três opções (português, inglês, espanhol) e lista de países com busca e a opção Global. Mostra o que foi detectado pelo navegador (idioma e fuso horário; nunca GPS nem IP guardado). A escolha vale para o dispositivo.
- **Aviso na primeira visita**: "Mostrando o Lacre em Português com itens de Brasil, detectados pelo seu navegador · Trocar · Entendi".
- **País padrão**: catálogo e página inicial abrem filtrados pelo país do usuário, com uma faixa "Itens de Brasil · Trocar país · Ver todos os países"; sem itens do país, mostram todos com aviso.

## Fluxos principais

1. **Comprar uma cópia**: explorar → item → checkout (pagar da própria carteira cripto para o endereço do item) → confirmações na rede → cofre → visualizador → (opcional) disputa em 72 h.
2. **Apoiar um lacre coletivo**: item (variante coletivo) → checkout (valor do apoio) → apoios (acompanhar) → notificação "lacre rompido" → cofre.
3. **Vender**: criar conta → área do vendedor → novo anúncio (6 passos) → anúncios (em análise) → notificação da curadoria (ajustes ou aprovado) → anúncio publicado com carteira do item → finalização → carteiras dos itens (receber a frase de recuperação) → transferir para a própria carteira.
4. **Pedir informação**: pedidos → novo pedido (modal, com o valor por pessoa) → curadoria aprova → outros interessados se juntam pelo mesmo valor (ou cobrem, e os demais igualam ou saem) → vendedor atende → curadoria valida → interessados recebem acesso; quem atendeu recebe a carteira do pedido.
5. **Curadoria**: fila → análise (checklist 7 blocos, autenticidade, redação) → decisão → (jurídico) → publicação (post gerado) → prova pública.
6. **Disputa**: cofre → abrir disputa → curadoria compara prévia e conteúdo → resolução → reembolso em créditos.

---

## PÚBLICO

### `public/home.html` · Página inicial
- **Hero**: título ("Informação com lacre. Anonimato dos dois lados."), subtítulo com as 3 garantias, botões "Explorar o catálogo", "Vender informação" e "Pedir uma informação" (abre o formulário de novo pedido); ao lado, um card de item em destaque (lacre coletivo em andamento com barra de progresso ao vivo).
- **Faixa de confiança**: números (itens curados, lacres rompidos, US$ liberados ao público, tempo mediano de curadoria) e os 4 nomes de modelos.
- **Como funciona** em 3 passos para quem compra e 3 para quem vende.
- **Lacres coletivos em andamento** (3 cards com progresso).
- **Novos no catálogo** (grade de 6 cards de item).
- **Pedidos com recompensa** (3 cards).
- **Anonimato**: bloco explicando o que não pedimos (nome, e-mail, telefone) e um link para "Anonimato e seus limites".
- **Para a verdade sempre sair** (missão): por que o Lacre existe, em três pilares (anonimato dos dois lados, curadoria antes de publicar, prova pública e dinheiro transparente).
- **Primeira vez com cripto?**: os 5 passos resumidos (instalar a MetaMask, criar a carteira e guardar a frase, ativar a rede Polygon, colocar USDT e uns centavos de POL, pagar no Lacre) e link para o guia completo.
- **Prova pública**: bloco mostrando um post do X com card e link da prova.
- CTA final: criar conta anônima.

### `public/explorar.html` · Catálogo
- Barra de busca, chips de categoria, filtros laterais (**país** com contagens e busca, idioma, modelo de venda, tipo de conteúdo, nível de autenticidade, faixa de preço, status: ativo / financiado / encerrando em 24 h), ordenação (recentes, mais apoiados, encerrando, preço). Cada card mostra o código do país.
- Alternância grade/lista. Grade de cards de item: prévia selada, categoria, chip do modelo, título, autenticidade, vendedor, preço ou progresso + prazo.
- Seção ancorada `#coletivos` com os lacres coletivos.
- Paginação. Estado vazio para busca sem resultados (mostrar como exemplo em uma aba ou nota).

### `public/item.html` · Página do item (6 variantes do painel de compra)
Coluna principal: prévia grande selada (com seletor de miniaturas: capa, página tarjada, amostra de dados), título curado, categoria, tags (com um ícone de bandeira discreto que abre o pop-up de denúncia; nada de bloco de denúncia na tela), selo de curadoria com nível de autenticidade e número de curadores, **linha do tempo do lacre** (barra de prazo com o dia atual, ritmo e previsão de rompimento, uma barra por marco com data em que foi batido e a prévia que cada marco libera), descrição, "O que você recebe" (lista de arquivos com tamanho e tipo, sem nomes sensíveis), "O que a curadoria verificou" (resumo por bloco), avisos (ex.: "contém nomes de agentes públicos no exercício da função"), hash do pacote (abreviado, link para a prova), vendedor (pseudônimo, reputação, itens aprovados, desde; sempre exibido), perguntas públicas respondidas (Q&A moderado), itens relacionados.
Coluna lateral (painel fixo) com uma variante por modelo. Um seletor de desenvolvimento no canto permite alternar:
1. **Lacre coletivo**: arrecadado em destaque, meta, barra, apoiadores, prazo com contagem, o que acontece ao bater a meta (tudo público para todos) e quanto já está garantido ao vendedor pelos marcos, botões de valor (US$ 20 / 50 / 100 / 250 / outro), botão "Apoiar", o que é liberado ao bater a meta (tudo), atualizações do vendedor, marcos postados. Abaixo, bloco **Comprar com exclusividade** (valor, consequência: encerra o anúncio e devolve os apoios).
2. **Cópias**: preço, "37 de 100 restantes", preço escalonado se houver, botão "Comprar cópia", "entrega imediata no cofre", direitos (download permitido / somente leitura), janela de disputa 72 h. Bloco **Comprar com exclusividade** (valor; quem já comprou mantém; ninguém mais recebe).
3. **Exclusivo**: preço, "um único comprador", botão "Comprar exclusividade", "Fazer uma oferta" (campo com mínimo), exclusividade declarada de 24 meses, destruição do conteúdo após a venda.
4. **Leilão lacrado**: "7 lances lacrados", reserva não revelada, encerra em (contagem), campo de lance único, explicação do segundo preço, lance pago na hora para um endereço do item e devolvido à origem a quem não vencer.
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
- Linha do tempo pública: enviado, aprovado, publicado, marcos, liberado/vendido.
- "Como verificar" (passos para conferir o hash de um arquivo recebido: comando `sha256sum`, campo para colar um hash e comparar) é a última seção.
- Botões: "Ver item", "Compartilhar" e um ícone de bandeira que abre o pop-up de denúncia (motivo, descrição, contato opcional); o link `#denunciar` abre o mesmo pop-up. A denúncia nunca ocupa espaço na tela.

### `public/pedidos.html` · Mural de pedidos
- Explicação em uma linha + botão "Fazer um pedido" (leva ao login se deslogado).
- Filtros (categoria, país, valor por pessoa mínimo, status) e cards de pedido: título, valor por pessoa, nº de interessados, recompensa total, prazo, status (aberto / valor subiu / travado: atendimento em curadoria / atendido / expirado), critérios resumidos, botões "Juntar-se" e "Tenho essa informação".

### `public/pedido.html` · Página do pedido
- Título, autor (pseudônimo), categoria, descrição, critérios de aceite (lista numerada), formato esperado, prazo.
- Painel lateral: valor por pessoa, nº de interessados, recompensa total, sinais pagos (25 %), botões "Juntar-se por US$ V" e "Cobrir o valor (mín. V + 10 %)", regra em uma linha ("Todos pagam o mesmo valor e recebem o mesmo acesso. Se ninguém atender até o prazo, cada um recebe o seu de volta."), carteira do pedido (endereço público, pagamentos), botão "Tenho essa informação" (leva ao assistente de envio com o pedido vinculado).
- Lista pública de interessados (pseudônimo, data de entrada, "igualou em") e linha do tempo (abertura, entradas, coberturas, igualadas, saídas).
- Estados (variantes): aberto; valor subiu, "iguale até dd/mm hh:mm (+US$ X) ou saia" para quem participa; travado (atendimento em curadoria).
- Seção "Extras deste pedido": cards de extras (título, quem criou, valor por pessoa, interessados, total, carteira, status) com "Entrar no extra por US$ X" e "Cobrir" para interessados do principal e a frase "Não entrar no extra não muda sua participação no pedido"; "Propostas de vendedores" com "Criar extra a partir desta proposta"; botão "Adicionar um extra" (modal: título, descrição, critérios, valor por pessoa, prazo = do pedido, aviso de curadoria e de pagamento ao criar).
- Atendimentos: contagem de atendimentos em curadoria (sem detalhes).
- Perguntas públicas ao autor (Q&A moderado).

### `public/guia-cripto.html` · Primeiros passos com cripto
- Guia de 10 minutos para quem nunca usou cripto: por que só cripto; passo a passo com mock de cada tela (instalar a MetaMask pelo site oficial, criar a carteira e anotar a frase de 12 palavras, ativar a rede Polygon, colocar USDT por compra na própria carteira, corretora ou P2P e uns US$ 1 de POL para taxas, pagar no Lacre com o valor exato); regras de ouro (pagar da própria carteira, conferir a rede, guardar a frase offline, carteira nova só para o Lacre, começar pequeno); perguntas frequentes (documento, custo, rede errada, frase perdida, outras carteiras, como o vendedor importa a carteira do item).

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
2. **Senha, passkey ou arquivo de acesso**: campo de senha (mín. 12), medidor de força, opção "Usar passkey em vez de senha" e bloco "Arquivo de acesso": arquivo `pseudonimo.lacre` gerado no navegador, impressão digital, PIN opcional (recomendado), botão baixar, confirmação de guarda segura e aviso de que o arquivo é uma chave.
3. **Frase de recuperação**: 12 palavras em grade, botões copiar e baixar, aviso "mostramos uma vez", checkbox "anotei", depois confirmação de 3 palavras (campos: palavra 3, 7, 11).
Final: "Conta criada" com o pseudônimo, botão "Ir para o catálogo".

### `auth/entrar.html` · Entrar
- Pseudônimo + senha, botão "Entrar com passkey", bloco "Entrar com arquivo de acesso" (escolher o arquivo `.lacre`, PIN se houver, botão entrar; o arquivo é lido localmente e assina um desafio do servidor, nunca é enviado), link "Perdi minha senha" (vai para recuperar).
- Segundo passo opcional: código TOTP (6 campos).
- Aviso: sem e-mail, a frase de recuperação é a única saída.

### `auth/recuperar.html` · Recuperar com a frase
- 12 campos de palavra com autocompletar da lista BIP-39, botão "Verificar", em seguida definir nova senha. Mensagem de erro quando a frase não bate.

## COMPRADOR

### `buyer/painel.html`
- Saudação com pseudônimo e resumo de pagamentos: confirmados, aguardando confirmação, em lacres ainda abertos.
- Blocos: "Apoios em andamento" (progresso de cada lacre), "Novidades no cofre" (itens recentes com acesso), "Acompanhando" (favoritos com alertas: preço, encerrando, financiado), "Pedidos que você fez", "Recomendados" por categorias seguidas.
- Alertas: disputa em andamento, assinatura a renovar, lacre encerrando em 24 h.

### `buyer/pagamentos.html` · Pagamentos
- Não existe carteira interna, saldo, depósito nem saque. A tela lista os pagamentos que esta conta fez para carteiras de itens: item, o que foi pago (cópia, apoio, camada, assinatura, entrada em pedido, igualar valor), valor, rede, endereço derivado, confirmações, status (aguardando, confirmado, reembolsado ao endereço de origem) e txid com link para o explorador.
- Reembolsos recebidos (parte de lacres que não bateram a meta, disputas procedentes, buyout em lacre coletivo) com txid.
- Guia "Como pagar": use uma carteira que você controla (MetaMask, Trust, Ledger, carteira de celular), nunca direto de uma corretora; envie o valor exato; reembolsos voltam ao endereço de origem; redes aceitas e confirmações exigidas.

### `buyer/checkout.html` · Checkout (variantes)
- Resumo do item, variantes do que está sendo pago: cópia, exclusivo, apoio (valor livre), lance lacrado, camada, licença, assinatura, **pedido** (juntar-se pelo valor por pessoa / cobrir com mínimo de +10 % / igualar a diferença dentro da janela), **exclusividade (buyout)** com as consequências e um aceite explícito.
- Pagamento direto: escolha da rede, endereço derivado só para este pagamento, QR, valor exato, aviso "pague de uma carteira que você controla; reembolsos voltam ao endereço de origem", contador de confirmações e liberação automática do acesso.
- O que acontece depois (acesso ao confirmar / fica na carteira do item até a finalização / se o lacre não bater a meta: o que entrou até o último marco batido fica com o vendedor, o resto volta à origem; o checkout diz em qual caso o novo apoio está).
- Transparência: "o que registramos sobre esta compra". Valor em US$ e o débito equivalente em USDT.
- Aceite dos termos do modelo e botão de confirmação. Tela de sucesso (variante) com link para o cofre ou apoios.

### `buyer/cofre.html`
- Filtros por tipo de acesso (compra, apoio, assinatura, pedido, licença) e status (disponível, aguardando liberação, expirado, revogado).
- Cards/linhas: item, forma de acesso, data, direitos (download com marca d'água / somente leitura), botões "Abrir no visualizador", "Baixar", "Abrir disputa" (se dentro das 72 h), "Ver prova".
- Aviso de marca d'água por entitlement.

### `buyer/visualizador.html`
- Visualizador seguro em tela cheia: barra superior (título, página x/y, zoom, busca no documento, abrir disputa), documento com marca d'água visível ("@coruja-7f3a · ENT-3F9A" no rodapé), navegação de páginas, abas para arquivos do pacote (PDF, planilha com grade de amostra, vídeo com player, imagens em galeria).
- Aviso de sessão de visualização expira em 15 min (renova automaticamente). Download desabilitado quando o item é somente leitura.

### `buyer/apoios.html`
- Lista de lacres apoiados com progresso, valor apoiado, status (em andamento / rompido e público / não bateu a meta · garantido ao vendedor ou reembolsado), e para cada apoio se ele já está garantido ao vendedor (entrou antes do último marco) ou volta se falhar, prazo, botão "Apoiar mais", "Compartilhar" (link anônimo), "Ver no cofre" quando liberado.
- Aba "Pedidos" com os pedidos de que o usuário participa (valor por pessoa pago, recompensa total, status).
- Total apoiado e selos ("Rompeu 3 lacres").

### `buyer/pedidos.html`
- Botão "Novo pedido" abre modal (também por link: `buyer/pedidos.html#novo-pedido`): tipo (entrega única ou por unidade), título, categoria, descrição, critérios de aceite (lista; no por unidade, o que vale como uma unidade), formato esperado, quanto você paga pela informação (ou por unidade e o limite), prazo; o sinal de 25 % é calculado na hora e mostrado em destaque ("Para criar o pedido você paga agora: US$ X"), sem campo para digitar; opção "permitir venda posterior como Cópias, nunca abaixo do valor por pessoa"; aviso de curadoria.
- Lista de pedidos do usuário (abertos por ele ou em que se juntou) com status (em curadoria / aberto / valor subiu: iguale até… / travado: atendimento em curadoria / atendido / expirado / saiu), valor por pessoa, nº de interessados e recompensa total; ações: Cobrir, Igualar, Sair (reembolso ao endereço de origem), Abrir no cofre.
- Detalhe expandido do pedido "em análise": "1 atendimento aguardando curadoria".

- Extras: por pedido, os extras abertos (entrou / não entrou, "Entrar no extra"), propostas pendentes e "Adicionar um extra"; extras atendidos sem a sua participação aparecem só como nota.

### `buyer/mensagens.html` (compartilhada)
- Layout de chat: lista de conversas por item/pedido à esquerda; conversa à direita com mensagens, mensagem de sistema ("Conversa vinculada ao item X. Expira 90 dias após o encerramento."), exemplo de mensagem filtrada (tentativa de passar e-mail bloqueada com explicação), campo de envio.

### `buyer/disputa.html`
- Abrir disputa: item, motivo (conteúdo diferente da prévia / corrompido / duplicado / autenticidade / outro), descrição, anexos (capturas), prazo restante.
- Acompanhar: linha do tempo (aberta → em análise → resolvida), resposta da curadoria, resultado (reembolso total/parcial/mantida) e valor devolvido ao endereço de origem, com txid.

### `buyer/notificacoes.html` (compartilhada)
- Lista agrupada por dia; tipos: curadoria (aprovado/ajustes), lacre (marco/rompido/não bateu a meta), pagamento (confirmado/reembolsado), mensagem, disputa, carteira do item (finalizada, frase disponível), segurança (novo login). Filtro por tipo e "marcar todas como lidas". Preferências de push.

### `buyer/configuracoes.html` (compartilhada)
- Abas: **Segurança** (senha, passkeys, arquivo de acesso com gerar novo / trocar PIN / revogar, TOTP, sessões ativas com dispositivo, data e método usado, PIN do cofre, encerrar todas), **Recuperação** (ver frase exige senha; status "confirmada em dd/mm"), **Privacidade** (apagar mensagens ao encerrar, permitir marca d'água invisível; o pseudônimo é sempre público), **Notificações** (push por tipo), **Aparência** (tema), **Conta** (exportar dados que existem sobre a conta, excluir conta com condição de nenhum item com carteira em andamento).

## VENDEDOR

### `seller/painel.html`
- Resumo: recebido nas carteiras dos itens, carteiras finalizadas a receber, vendas do mês, itens ativos; gráfico de barras de vendas por semana (uma série).
- "Pendências": item com ajustes solicitados, item aguardando confirmação de edição da curadoria, carteira finalizada aguardando você receber a frase.
- "Seus anúncios" (resumo por status), "Pedidos abertos que combinam com você" (3 cards), "Dicas de anonimato para vendedores".

### `seller/novo-anuncio.html` · Assistente de envio (6 passos em uma tela)
1. **Tipos e categoria**: cards de tipo com seleção múltipla (documento, dados, imagem, vídeo, áudio, texto, código), categoria (select) com nível de risco exibido, **país(es) a que a informação se refere (ou Global) e idioma do material**, vinculação opcional a um pedido existente.
2. **Arquivos**: dropzone, lista de arquivos com progresso e hash local, relatório de metadados removidos (ex.: "EXIF: GPS, dispositivo; DOCX: autor"), alertas da triagem automática (ex.: "detectamos 12 nomes próprios"), limite 20 GB.
3. **Prévia e descrição**: título (até 120), resumo (até 280), descrição (markdown restrito) e tags **preenchidos automaticamente** a partir da transcrição e do OCR dos arquivos (processados na própria infraestrutura), com selo "sugerido", botões "Gerar de novo" e "Limpar"; em branco quando os arquivos não puderem ser lidos; tags editáveis (Enter adiciona, clique remove); seleção de prévias geradas (borradas/tarjadas) com opção de marcar o que a curadoria pode mostrar, tags, aviso "a curadoria pode reescrever título e resumo".
4. **Modelo de venda**: prévias por marco (25/50/75/90 %) escolhidas entre as prévias do passo 3; cards dos modelos (Cópias, Exclusivo, Lacre coletivo, Pedido, Leilão, Camadas, Assinatura, Janela, Licença) com os da V2/V3 marcados "em breve"; **a configuração abaixo muda conforme o modelo marcado** (Cópias: preço, limite, preço escalonado; Exclusivo: preço, ofertas, declaração de 24 meses; Lacre coletivo: meta, prazo, marcos garantidos (padrão) ou flexível, regra se a meta não bater (marcos garantidos ou flexível); Pedido: pedido vinculado e critérios); **valor de exclusividade (opcional) em Cópias, Lacre coletivo e Camadas**, com explicação do que acontece ao ser pago; simulação de ganho líquido; modificadores (marca d'água, somente leitura; garantia de exclusividade só no Exclusivo).
5. **Declarações**: 6 checkboxes com texto completo (origem lícita; titularidade ou direito de venda; sem dados pessoais de terceiros sem base legal; sem conteúdo íntimo/menores; sem credenciais; não é informação privilegiada de mercado nem sob sigilo legal), nota de que o pseudônimo é sempre exibido (não existe opção de escondê-lo), aviso de que as declarações ficam registradas.
6. **Revisão e envio**: resumo completo em quatro blocos com "editar" (conteúdo: tipos, categoria, país e idioma, arquivos com tamanho e hash, triagem; prévia: título, resumo, prévias públicas, tags; modelo: meta e prazo, arrecadação, liberação, os cinco marcos com a prévia que cada um libera, exclusividade, modificadores, quanto você recebe; declarações e pseudônimo), prazo estimado da curadoria (48 h), "o que acontece agora", botão "Enviar para curadoria". Tela de sucesso.

### `seller/anuncios.html`
- Abas por status (Todos, Rascunhos, Em análise, Ajustes solicitados, Aprovados, Ativos, Finalizados, Rejeitados) com contagens. Não existe "Agendado": item aprovado é publicado na hora.
- O status é **clicável** e abre o anúncio ou a ação pendente: Rascunho abre o assistente onde parou; Ajustes solicitados abre a aba Curadoria; Rejeitado abre o motivo; Aprovado/Ativo abre o anúncio; Finalizado abre a carteira do item. Cores por tipo: âmbar = depende do vendedor, azul = em análise, verde = aprovado, ativo ou finalizado, vermelho = rejeitado.
- Tabela: prévia pequena, título, modelo, status, métrica principal (vendas / arrecadado / lances), prazo, ações (editar, ver feedback, encerrar, duplicar).

### `seller/anuncio.html` · Detalhe do anúncio (visão do vendedor)
- Cabeçalho com status e ações. Abas: **Visão geral** (métricas: visitas, favoritos, conversão, arrecadado/vendas, gráfico), **Curadoria** (linha do tempo com a etapa atual destacada e as próximas em cinza, feedback com códigos, diffs do título reescrito, botão "Aceitar edição" / "Responder ajustes"; reenvios sem limite enquanto a curadoria pedir), **Conteúdo** (arquivos, hashes, versões redigidas), **Publicação** (posts feitos nas redes com métricas), **Carteira do item** (endereço público, recebido, reembolsos, finalização e entrega da frase de recuperação), **Perguntas** (Q&A público para responder), **Compradores** (apenas contagens; nunca dados pessoais).

### `seller/carteiras.html` · Carteiras dos itens
- Uma linha por item com carteira: endereço público (link para o explorador), rede, recebido até agora, reembolsos, status (recebendo · a finalizar · finalizado e entregue · reembolsando), data prevista de finalização, ação.
- Para Cópias ativas: botão "Encerrar vendas e finalizar" (disponível após a última janela de disputa de 72 h).
- Item finalizado: comissão separada (valor e txid), reembolsos executados, líquido na carteira e o botão **"Receber a carteira"**: pede senha + TOTP e mostra a frase de recuperação uma única vez, com instrução para transferir imediatamente para uma carteira própria e o aviso de que a cópia da plataforma é destruída ao fechar. Depois, a linha mostra "frase entregue em dd/mm · chave destruída".
- Sem saldo, sem saque: o dinheiro nunca passa por uma carteira da plataforma, exceto os 10 % de comissão.

### `seller/pedidos.html`
- Mural de pedidos abertos com filtros e cards; botão "Atender este pedido" leva ao assistente com o pedido vinculado; aba "Meus atendimentos" com status (em curadoria / aceito / recusado).

- Extras: cada card mostra os extras abertos (podem ser atendidos separadamente) e o botão "Tenho algo próximo: propor um extra" (modal com título, descrição e valor sugerido; proposta pública, sem exclusividade); seção "Minhas propostas de extra".

### `seller/reputacao.html`
- Nota geral, componentes (aprovações, autenticidade média, disputas perdidas, tempo de resposta), histórico, selos (Verificado 10×, Rompeu lacres, Fonte recorrente), como melhorar. Aviso de que a reputação é do pseudônimo.

## CURADORIA (equipe)

### `admin/painel.html`
- KPIs: itens na fila, SLA (% dentro de 48 h), aprovados/rejeitados na semana, tempo mediano, taxa de reversão, disputas abertas, denúncias abertas, posts agendados hoje.
- Gráficos simples: envios por dia (barras), decisões por código de rejeição (barras horizontais).
- Fila prioritária (5 itens de risco alto), alertas (triagem bloqueou 2 envios hoje; 1 ordem judicial recebida), atividade recente da equipe.

### `admin/fila.html`
- Tabela com filtros (status, risco, categoria, país, modelo, responsável, idade) e ordenação por prioridade; colunas: prioridade, item, categoria, país, modelo, risco, tempo na fila, triagem (ícones: AV ok, PII n, duplicado), responsável(is), dois olhos, ações (Assumir, Abrir).
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
- Busca por pseudônimo; lista com risco (score), itens, disputas, denúncias, valor em carteiras de itens em andamento; detalhe: o que existe sobre a conta (lista explícita: pseudônimo, data de criação, itens, pagamentos, nenhuma identidade), ações (advertir, restringir envios, bloquear finalizações, banir) com motivo obrigatório e registro em auditoria.

### `admin/financeiro.html`
- Carteiras de itens: total em carteiras ativas (não é passivo da plataforma), por modelo e por rede; finalizações do dia (comissão separada, reembolsos executados, frase entregue, chave destruída); comissões recebidas na carteira da plataforma (multisig) por mês; fundo de garantia; reembolsos executados e na fila (lacres que falharam, itens retirados, disputas); reconciliação on-chain diária (livro de pagamentos × saldo das carteiras, divergência zero); registro de chaves (criadas no HSM, destruídas na entrega).

### `admin/auditoria.html`
- Log imutável: data/hora, pessoa da equipe, ação, alvo, antes/depois (resumo), hash encadeado; filtros por pessoa, ação, período; exportar.

### `admin/configuracoes.html`
- Categorias (risco padrão, dois olhos, jurídico por padrão), comissão única de 10 % e fundo de garantia, SLAs, textos das declarações e políticas com versionamento, canais sociais conectados, equipe e papéis (RBAC), limites antifraude, redes e confirmações.
