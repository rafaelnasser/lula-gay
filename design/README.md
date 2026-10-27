# Protótipo navegável · como ler e como estender

Abra `design/index.html` no navegador (ou sirva a pasta: `npx serve design`). Todas as telas são HTML estático com um CSS e um JS compartilhados. Não há build.

## Estrutura

```
design/
  index.html            índice de todas as telas, por área
  styleguide.html       componentes do design system com exemplos de uso
  assets/app.css        tokens (cores, tipografia, raios) + componentes
  assets/app.js         shells (menus), ícones, identicons, interações
  public/   auth/   buyer/   seller/   admin/     uma tela por arquivo
```

## Esqueleto de uma tela

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Explorar · Lacre</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
  <link rel="stylesheet" href="../assets/app.css">
  <script src="../assets/app.js" defer></script>
</head>
<body data-shell="public" data-page="explorar" data-root="../">
  <main>
    <!-- conteúdo da tela -->
  </main>
</body>
</html>
```

- `data-shell`: `public` (header + footer do site), `buyer` / `seller` / `admin` (sidebar + topbar), `auth` (layout centrado). O JS monta o shell em volta do `<main>`.
- `data-page`: chave do item de menu ativo (ver `NAV` em `app.js`).
- `data-root`: prefixo relativo até a raiz de `design/` (sempre `../` dentro das subpastas).
- `data-title` (opcional, shells de app): título exibido na topbar.
- Em shells de app, o `<main>` recebe a classe `content` automaticamente. Use `<main class="content narrow">` para páginas estreitas.
- Em páginas públicas, envolva seções com `<section class="section"><div class="container">…</div></section>`.

## Componentes (ver `styleguide.html` para todos)

| Preciso de… | Use |
|---|---|
| Botão | `.btn` + `.btn-primary` (ação principal, latão), `.btn-wax` (apoiar lacre), `.btn-ghost`, `.btn-outline`, `.btn-danger`, `.btn-success`; tamanhos `.btn-sm`, `.btn-lg`, `.btn-block` |
| Ícone | `<i data-icon="lock"></i>` (nomes em `app.js`, dicionário `ICONS`) |
| Status de item | `<span class="badge st-ativo">Ativo</span>` com `st-rascunho`, `st-triagem`, `st-analise`, `st-ajustes`, `st-aprovado`, `st-agendado`, `st-ativo`, `st-financiado`, `st-vendido`, `st-encerrado`, `st-rejeitado`, `st-suspenso`, `st-arquivado`, `st-escalado`, `st-liberado`, `st-falhou` |
| Autenticidade | `<span class="badge auth-verificado"><i data-icon="badge-check"></i>Verificado</span>`, `auth-parcial`, `auth-plausivel`, `auth-nao` |
| Risco | `.badge.risk-baixo` / `risk-medio` / `risk-alto` |
| Modelo de venda | `<span class="model-chip" data-model="coletivo"><i data-icon="hand-coins"></i>Lacre coletivo</span>` · ícones: copias→`copy`, exclusivo→`crown`, coletivo→`hand-coins`, pedido→`file-search`, leilao→`gavel`, camadas→`layers`, assinatura→`repeat`, janela→`timer`, licenca→`scale` |
| Pseudônimo | `<span class="handle" data-handle="coruja-7f3a" data-rep="4.8 · 12 itens"></span>` (o JS gera o identicon) |
| Prévia selada | `<div class="preview" data-type="documento"><div class="preview-lock"><span data-seal></span></div></div>` · tipos: `documento`, `dados`, `imagem`, `video`, `audio`, `mapa` |
| Progresso | `<div class="progress"><div class="progress-bar wax" data-width="68%"></div></div>` |
| Card de item | `.card.item-card` > `.preview` + `.item-body` (`.item-title`, `.item-meta`, `.item-foot` com `.price`) |
| Estatística | `.stat-grid` > `.stat` (`.label`, `.value`, `.delta.up`) |
| Tabela | `.table-wrap` > `table.table` (+ `.table-foot`, `.pagination`) |
| Formulário | `.field` > `label` + `.input` / `.select` / `.textarea` + `.hint`; `.check`, `.radio`, `.switch`, `.segmented`, `.choice-cards` > `.choice`, `.dropzone`, `.file-row`, `.input-group` com `.affix`, `.amount-options` |
| Abas | `<div data-tabs><div class="tabs"><a class="tab active" data-tab="a">A</a>…</div><div class="tab-panel active" data-panel="a">…</div></div>` |
| Passos | `.stepper` > `.step.done/.active` > `.n` + `.t`; conteúdo em `[data-wizard]` > `[data-step="1"]` (classe `active` mostra) e botões `data-step-go="2"` |
| Linha do tempo | `.timeline` > `.tl-item.ok` > `.when` + `.what` |
| Alerta | `.alert.alert-info/warn/danger/ok/anon/wax` com `<i data-icon>` + texto |
| Modal | `<div class="modal-backdrop" id="m1"><div class="modal">…</div></div>` e `data-modal-open="m1"` / `data-modal-close` |
| Toast | `data-toast="Enviado para curadoria"` em qualquer botão |
| Copiar | `data-copy="#id-do-elemento"` ou `data-copy="texto"` |
| Variantes (uma tela, vários estados) | `<div class="variant-switch"><span class="vs-label">Variante</span><button data-show="a">A</button>…</div>` + blocos `<div data-variant="a">…</div>` |
| Contagem regressiva | `<span class="countdown" data-deadline="2026-11-15T23:59:00-03:00"></span>` |
| Hash | `<div class="hash"><code>3f9a…</code><button class="btn btn-sm btn-ghost" data-copy="…"><i data-icon="copy"></i></button></div>` |
| Chat | `.chat` > `.threads` (`.thread`) + `.conv` (`.conv-head`, `.conv-body` > `.msg.me/.them/.system/.filtered`, `.conv-foot`) |
| Tarja | `<span class="redacted">xxxxxxxx</span>` ou documento simulado `.doc-mock` |

## Mundo de dados do protótipo (use sempre os mesmos)

**Conta demonstrada (comprador e vendedor):** `@coruja-7f3a`, reputação 4,8, 3 itens aprovados, desde mar/2026, saldo US$ 1.240,00, em custódia (apoios) US$ 250,00.

**Dinheiro:** só cripto, dos dois lados. Depósito em USDT (Polygon, Tron), USDC (Polygon, Base) ou Bitcoin (Lightning, on-chain); saque em cripto. Sem PIX, parceiro, voucher ou KYC. **Moeda de exibição: US$** (formato pt-BR: US$ 1.240,00); **liquidação em USDT 1:1** (1 USDT = US$ 1), sem conversão. Bitcoin é convertido para USDT na hora com cotação travada por 10 min (1 BTC = US$ 68.400). **Comissão única de 10 %** em todos os modelos.

**Global:** todo item e pedido tem **país** (código ISO, ex.: `BR`, `AR`, `PT`, `BD`, `CL`, ou `Global`) e **idioma**. Nos cards, o país aparece como `<span class="tag">BR</span>`; na página do item, "Brasil · português". Filtro de país no catálogo com contagens (Brasil 112, Estados Unidos 64, Argentina 31, Portugal 27, México 22, Reino Unido 19, Alemanha 14, Chile 9, Índia 12, Bangladesh 3, Global 38). Os itens da tabela abaixo são `BR · português`, exceto os três últimos.

**Exclusividade (buyout):** valor opcional em Cópias, Lacre coletivo e Camadas que encerra o anúncio e entrega o item a um único comprador (em lacre coletivo, os apoios são devolvidos; em cópias, quem já comprou mantém). Valores do protótipo: lcr-4m2x9 US$ 250.000 · lcr-9f2k7 US$ 35.000 · lcr-3c7r8 US$ 20.000 · lcr-8k1n2 (assistente) US$ 40.000.

**Vendedores:** `@sextante-21c9` (jornalismo, 12 aprovados, Verificado 9×), `@lanterna-b31d` (dados), `@cartografo-5a77` (foto/vídeo), `@arquivista-0d2e` (acervos), `@bussola-c4e1` (negócios), `@prisma-66af` (finanças), `@tipografo-8e04` (história). **Compradores em disputas/mensagens:** `@farol-3e9b`, `@quartzo-a1f0`.

**Equipe (não anônima):** Ana R. (curadora sênior), Bruno M. (curador), Carla S. (jurídico), Diego T. (publicação), Elisa F. (financeiro), Marcos L. (administrador).

**Itens do catálogo**

| Slug | Título | Categoria · tipo | Modelo · preço | Status · autenticidade | Vendedor |
|---|---|---|---|---|---|
| lcr-4m2x9 | Cadeia do ouro ilegal no Pará: 18 meses de apuração com documentos públicos e 31 entrevistas | Jornalismo e investigação · pacote (PDF 212 p., 31 áudios, planilhas) | Lacre coletivo · meta US$ 80.000 · arrecadado US$ 54.120 · 1.187 apoiadores · prazo 15/11/2026 · liberação pública · meta estendida US$ 120.000 (áudios) | Ativo · Verificado parcialmente | sextante-21c9 |
| lcr-9f2k7 | 12.400 licitações municipais do Nordeste (2019–2025), consolidadas e limpas, com vencedores e valores | Dados e bases · dataset (CSV/XLSX, 48 MB) | Cópias · edição limitada 100 · US$ 490 · 37 vendidas | Ativo · Verificado | lanterna-b31d |
| lcr-7q1z3 | Mercado de energia solar distribuída no Brasil: projeções 2026–2030, 120 páginas | Negócios e mercado · documento | Exclusivo · US$ 25.000 ou oferta (mín. US$ 15.000) · 2 ofertas | Ativo · Plausível | bussola-c4e1 |
| lcr-2n8v4 | 340 fotografias em alta resolução da enchente de 2024 em Porto Alegre, com geolocalização e horário | Fotografia e vídeo · imagens (RAW+JPG, 9,8 GB) | Licença · Editorial US$ 900 · Comercial US$ 4.500 · Exclusiva US$ 25.000 | Ativo · Verificado | cartografo-5a77 |
| lcr-5t6w1 | 1.200 páginas de jornais operários de São Paulo (1917–1930) digitalizadas em 600 dpi | História e acervos · documento | Cópias ilimitadas · US$ 120 · 214 vendidas | Ativo · Verificado | arquivista-0d2e |
| lcr-8h3p2 | Filmagem aérea 4K das queimadas no Pantanal, agosto de 2025: 6 horas de material bruto | Fotografia e vídeo · vídeo (18 GB) | Licença · Editorial US$ 2.400 · Comercial US$ 12.000 | Ativo · Verificado | cartografo-5a77 |
| lcr-3c7r8 | Como uma operação de última milha cortou 31% do custo: playbook, planilhas e modelo de roteirização | Educação e métodos · pacote | Camadas · Sumário US$ 190 · Playbook US$ 890 · Planilhas e modelo US$ 1.900 · Pacote US$ 2.400 | Ativo · Plausível | bussola-c4e1 |
| lcr-6d1k5 | Monitor semanal de patentes do setor farmacêutico brasileiro | Ciência e pesquisa · texto + planilha | Assinatura · US$ 190/mês · 212 assinantes · edição avulsa US$ 90 | Ativo · Verificado parcialmente | prisma-66af |
| lcr-1w9s6 | 400 fotografias inéditas da construção de Brasília (1957–1960), acervo pessoal digitalizado | História e acervos · imagens | Leilão lacrado (segundo preço) · reserva não revelada · 7 lances · encerra 02/11/2026 | Ativo · Verificado | arquivista-0d2e |
| lcr-0p4m3 | Série histórica de tarifas de ônibus em 27 capitais (1994–2026) com fontes | Governo e políticas públicas · dataset | Cópias · US$ 90 | Em análise (Bruno M.) | coruja-7f3a |
| lcr-2z5q7 | Mapeamento de 3.100 feiras livres do estado de SP com dias, horários e geolocalização | Dados e bases · dataset | Cópias · US$ 240 | Ajustes solicitados (prévia expõe coordenadas exatas; reduzir amostra) | coruja-7f3a |
| lcr-8k1n2 | Entrevistas com 40 ex-cobradores de ônibus de SP sobre a extinção da função (áudio + transcrição) | Jornalismo · áudio | Lacre coletivo · meta US$ 12.000 | Rascunho | coruja-7f3a |
| lcr-4g7h9 | Tabela de preços de medicamentos oncológicos em 15 países (2020–2026) | Saúde e meio ambiente · dataset | Cópias · US$ 350 | Aprovado · agendado 28/10/2026 14:00 · Verificado parcialmente | coruja-7f3a |
| lcr-9r3t1 | Base de 210 mil CNPJs do setor de construção com faturamento estimado | Negócios e mercado · dataset | Cópias · US$ 1.200 | Rejeitado · R01 (contém CPFs de sócios; remover coluna e reenviar como novo item) | coruja-7f3a |
| lcr-5m8c4 | Guia de acesso a dados do SUS: 60 fontes, endpoints e scripts de coleta | Tecnologia e segurança · pacote | Cópias · US$ 150 · 88 vendidas | Encerrado · Verificado | coruja-7f3a |
| lcr-6b2v7 | Relatório de inspeção de 90 barragens de rejeito (ANM, 2024), consolidado com georreferenciamento e histórico de autuações | Governo e políticas públicas · pacote | Lacre coletivo · meta US$ 30.000 | Em análise · risco alto · dois olhos (Ana R. + Bruno M.) · jurídico | lanterna-b31d |
| lcr-7e2m4 | Registro de 2.300 fábricas têxteis de Bangladesh com resultados de auditorias públicas de segurança (2014–2025) · `BD · inglês` | Dados e bases · dataset | Cópias · limite 150 · US$ 320 · 41 vendidas | Ativo · Verificado | meridiano-4b8e |
| lcr-3p9k1 | Preços de aluguel por freguesia em Lisboa e Porto, série mensal 2015–2026, com fontes · `PT · português` | Imóveis e urbanismo · dataset | Cópias · US$ 140 · 96 vendidas | Ativo · Verificado parcialmente | azulejo-1c6d |
| lcr-9w5t2 | Entrevistas em áudio com 25 ex-trabalhadores de minas de lítio em Jujuy, com transcrição em espanhol · `AR · espanhol` | Jornalismo e investigação · áudio | Lacre coletivo · meta US$ 15.000 · arrecadado US$ 6.900 · 312 apoiadores · prazo 05/12/2026 | Ativo · Plausível | quebracho-8d1f |

**Pedidos com recompensa**

| Slug | Pedido | Recompensa | Prazo | Status |
|---|---|---|---|---|
| ped-2c8d1 | Dados consolidados de tempo de espera em UPAs de São Paulo (2023–2025), por unidade e mês, em CSV | US$ 3.200 · 14 contribuidores | 30/11/2026 | Aberto |
| ped-7f1a3 | Cópia digitalizada do catálogo da 1ª Bienal de São Paulo (1951) | US$ 800 · 1 | 15/12/2026 | Aberto |
| ped-4k9e2 | Série de preços de aluguel por bairro em Belo Horizonte (2015–2026) | US$ 1.450 · 6 | 20/11/2026 | Atendimento em curadoria |
| ped-1b6j8 | Fotografias dos interiores do Estádio do Pacaembu antes da reforma (2019–2020) | US$ 600 · 3 | — | Atendido |
| ped-9h2d5 | Lista de todos os editais de fomento cultural municipais do RS em 2025 | US$ 2.100 · 9 | 10/12/2026 | Aberto |
| ped-5r2k8 | Lista de contratos de concessão de portos no Chile (2000–2026) com concessionárias e prazos · `CL · espanhol` | US$ 900 · 4 | 20/12/2026 | Aberto |

**Carteira de @coruja-7f3a (extrato):** 20/10 depósito USDT Polygon +US$ 1.455,00 · 21/10 compra lcr-9f2k7 −US$ 490,00 · 22/10 apoio lcr-4m2x9 −US$ 100,00 · 23/10 compra camada 1 lcr-3c7r8 −US$ 190,00 · 24/10 depósito Bitcoin Lightning +US$ 500,00 (0,00731 BTC a US$ 68.400) · 25/10 apoio lcr-4m2x9 −US$ 150,00 · 25/10 assinatura lcr-6d1k5 −US$ 190,00 · 26/10 liquidação de venda lcr-5m8c4 +US$ 135,00 (×3). Saldo US$ 1.240,00.

**Ganhos de @coruja-7f3a:** bruto US$ 13.200 (88 × US$ 150) · comissão 10 % US$ 1.320 · líquido US$ 11.880 · em custódia US$ 405,00 (3 vendas de US$ 135 líquidos, liberam em 48 h) · sacado US$ 9.800 (2 saques em USDT: US$ 4.800 em 02/10 e US$ 5.000 em 15/09) · 1 saque em processamento US$ 1.000.

**Datas:** hoje é 27/10/2026. Prazos no futuro próximo (nov/dez 2026).

## Regras do protótipo

1. Nunca peça nome, e-mail, telefone ou CPF em nenhuma tela. Onde um produto comum pediria, mostre o bloco "O que não pedimos".
2. Pseudônimos sempre com o componente `.handle`. Equipe sempre com nome e papel.
3. Prévias nunca legíveis: use `.preview` ou `.doc-mock` com `.redacted`/`.blur-text`.
4. Textos em português do Brasil, tom factual, sem adjetivos de escândalo.
5. Botões de ação que não têm destino no protótipo recebem `data-toast="…"` descrevendo o que aconteceria.
6. Links entre telas sempre relativos (`../public/item.html`), nunca absolutos.
7. Cada tela deve funcionar a 400 px de largura (empilhar colunas) e nos dois temas.
