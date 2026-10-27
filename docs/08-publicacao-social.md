# 08 · Publicação social

Todo item aprovado vira uma publicação nas redes. O objetivo é duplo: trazer compradores e provar ao público que o item existe, é real e está sob curadoria. Nenhum post sai sem a **página de prova** publicada.

## 1. Canais

| Canal | Formato | Prioridade |
|---|---|---|
| **X** | Texto + card de imagem + link da prova; threads para marcos | MVP |
| **Telegram** (canal público) | Mensagem com imagem + botão para a prova | MVP |
| **Bluesky** | Texto + imagem | MVP (API simples) |
| **RSS / JSON feed** | Feed de itens publicados e lacres rompidos | MVP (barato) |
| Instagram / Threads | Imagem quadrada + legenda; link na bio | V2 |
| Newsletter sem e-mail (RSS→Telegram) | Resumo semanal | V2 |

## 2. Página de prova (`public/prova.html`)

É o destino de todo link. Pública, sem login, indexável, estável para sempre.

Conteúdo:
- Título curado e categoria.
- **Hash SHA-256 do pacote** e dos arquivos (com botão copiar).
- **Carimbo de tempo** da aprovação e versão da política de curadoria aplicada.
- Nível de autenticidade e número de curadores (ex.: "2 curadores independentes + jurídico").
- Status atual do item: ativo / financiado / vendido / finalizado, com progresso quando aplicável.
- Prévia aprovada (borrada/tarjada).
- Pseudônimo do vendedor (se ele permitiu) e reputação.
- Como verificar: instruções para conferir o hash do arquivo recebido.
- Link para o item e botão de denúncia.
- Opcional V2: âncora em blockchain (OpenTimestamps) para prova independente da plataforma.

## 3. Templates por evento

Os posts são gerados automaticamente a partir do item e revisados por um humano antes de sair (fila em `admin/publicacao.html`). Nunca incluem nomes de pessoas, trechos sensíveis ou detalhes que a curadoria tarjou.

**Lançamento · Cópias**
> Novo no Lacre · Dados e bases
> 12.400 licitações municipais do Nordeste (2019–2025), consolidadas e limpas.
> Curadoria: verificado parcialmente. Edição limitada: 100 cópias.
> US$ 490 · prova e prévia: lacre.app/p/9f2k7

**Lançamento · Lacre coletivo**
> Lacre coletivo aberto · Jornalismo e investigação
> 18 meses de apuração sobre a cadeia do ouro ilegal no Pará. Documentos públicos e entrevistas.
> Meta: US$ 80.000. Quando bater, fica público para todo mundo.
> Apoie a partir de US$ 10 · lacre.app/p/4m2x9

**Marco (50 %)**
> Metade do caminho. US$ 40.120 de US$ 80.000 em 6 dias, 912 apoiadores.
> Liberado agora para todos: a página 47 do relatório sem tarjas e 200 linhas da planilha.
> Faltam 15 dias para romper o lacre. lacre.app/p/4m2x9

**Lacre rompido**
> LACRE ROMPIDO. 1.187 pessoas liberaram para todo mundo: [título].
> Acesso público em 24 h (apoiadores já têm). Prova: lacre.app/p/4m2x9

**Vendido · Exclusivo**
> Vendido a um único comprador: [título]. O item saiu do catálogo e será destruído dos nossos servidores. A prova permanece: lacre.app/p/7q1z3

**Último dia**
> Últimas 24 h: [título]. US$ 61.400 de US$ 80.000. lacre.app/p/4m2x9

**Pedido aberto**
> Alguém procura: dados consolidados de tempo de espera em UPAs de São Paulo (2023–2025).
> Recompensa acumulada: US$ 3.200 (14 pessoas). Tem essa informação? lacre.app/r/2c8d1

## 4. Card de imagem

Gerado pelo worker (HTML → PNG via Playwright/Chromium) a partir de um template único:
- Fundo escuro, selo do Lacre, categoria em etiqueta.
- Título em até 3 linhas.
- Faixa com o modelo (ex.: "Lacre coletivo · US$ 0 / 80.000") e barra de progresso quando houver.
- Prévia borrada ao fundo, nunca legível.
- Hash abreviado (`sha256: 3f9a…c21e`) e URL da prova.
- Dimensões: 1600×900 (X, Bluesky, Telegram), 1080×1080 (Instagram).

## 5. Fluxo em `admin/publicacao.html`

1. Item aprovado entra na **fila de publicação** com data/hora sugerida (próximo slot livre, respeitando intervalo mínimo de 2 h entre posts no X).
2. O publicador vê o post gerado por canal, pode editar o texto (dentro dos limites), trocar a prévia e aprovar.
3. Agendamento: o worker publica no horário; falhas voltam à fila com o erro.
4. Marcos de lacres coletivos e eventos (vendido, último dia, rompido) são gerados automaticamente e também passam pela fila, com aprovação em um clique. O post de cada marco inclui a prévia liberada naquele marco (imagem ou trecho) e o texto diz o que o próximo marco vai liberar.
5. Registro: ID externo do post, horário, métricas coletadas a cada 6 h por 7 dias (impressões, cliques, respostas).

## 6. Regras editoriais

- Sem nomes de pessoas, exceto figuras públicas no exercício da função e já presentes no título curado.
- Sem adjetivos de escândalo ("bombástico", "chocante"). O tom é factual: o que é, quanto custa, como provar.
- Sempre com o link da prova. Nunca link direto para compra.
- Respostas e menções não são respondidas pelas contas oficiais no MVP (evita ser arrastado para discussões sobre o conteúdo). Um texto fixo aponta para o formulário de denúncia.
- Itens com nível "Não verificado" saem com a frase "Autenticidade não verificada pela curadoria" no post.
- Itens suspensos têm os posts apagados e um post de retratação curto é publicado.

## 7. Métricas

- Impressões e cliques por post, por canal, por modelo.
- Conversão: cliques na prova → visitas ao item → compras/apoios (agregado, sem identificar pessoas).
- Melhor horário por canal (ajuste automático dos slots sugeridos após 100 posts).
