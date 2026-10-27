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

**Conta demonstrada (comprador e vendedor):** `@coruja-7f3a`, reputação 4,8, 3 itens aprovados, desde mar/2026, saldo R$ 1.240,00 (≈ 230,4 USDT; cotação R$ 5,38), em custódia (apoios) R$ 250,00.

**Dinheiro:** só cripto, dos dois lados. Depósito em USDT (Polygon, Tron), USDC (Polygon, Base) ou Bitcoin (Lightning, on-chain); saque em cripto. Sem PIX, parceiro, voucher ou KYC. Créditos guardados em USDT; preços exibidos em R$ e convertidos no momento da operação. **Comissão única de 10 %** em todos os modelos.

**Vendedores:** `@sextante-21c9` (jornalismo, 12 aprovados, Verificado 9×), `@lanterna-b31d` (dados), `@cartografo-5a77` (foto/vídeo), `@arquivista-0d2e` (acervos), `@bussola-c4e1` (negócios), `@prisma-66af` (finanças), `@tipografo-8e04` (história). **Compradores em disputas/mensagens:** `@farol-3e9b`, `@quartzo-a1f0`.

**Equipe (não anônima):** Ana R. (curadora sênior), Bruno M. (curador), Carla S. (jurídico), Diego T. (publicação), Elisa F. (financeiro), Marcos L. (administrador).

**Itens do catálogo**

| Slug | Título | Categoria · tipo | Modelo · preço | Status · autenticidade | Vendedor |
|---|---|---|---|---|---|
| lcr-4m2x9 | Cadeia do ouro ilegal no Pará: 18 meses de apuração com documentos públicos e 31 entrevistas | Jornalismo e investigação · pacote (PDF 212 p., 31 áudios, planilhas) | Lacre coletivo · meta R$ 80.000 · arrecadado R$ 54.120 · 1.187 apoiadores · prazo 15/11/2026 · liberação pública · meta estendida R$ 120.000 (áudios) | Ativo · Verificado parcialmente | sextante-21c9 |
| lcr-9f2k7 | 12.400 licitações municipais do Nordeste (2019–2025), consolidadas e limpas, com vencedores e valores | Dados e bases · dataset (CSV/XLSX, 48 MB) | Cópias · edição limitada 100 · R$ 490 · 37 vendidas | Ativo · Verificado | lanterna-b31d |
| lcr-7q1z3 | Mercado de energia solar distribuída no Brasil: projeções 2026–2030, 120 páginas | Negócios e mercado · documento | Exclusivo · R$ 25.000 ou oferta (mín. R$ 15.000) · 2 ofertas | Ativo · Plausível | bussola-c4e1 |
| lcr-2n8v4 | 340 fotografias em alta resolução da enchente de 2024 em Porto Alegre, com geolocalização e horário | Fotografia e vídeo · imagens (RAW+JPG, 9,8 GB) | Licença · Editorial R$ 900 · Comercial R$ 4.500 · Exclusiva R$ 25.000 | Ativo · Verificado | cartografo-5a77 |
| lcr-5t6w1 | 1.200 páginas de jornais operários de São Paulo (1917–1930) digitalizadas em 600 dpi | História e acervos · documento | Cópias ilimitadas · R$ 120 · 214 vendidas | Ativo · Verificado | arquivista-0d2e |
| lcr-8h3p2 | Filmagem aérea 4K das queimadas no Pantanal, agosto de 2025: 6 horas de material bruto | Fotografia e vídeo · vídeo (18 GB) | Licença · Editorial R$ 2.400 · Comercial R$ 12.000 | Ativo · Verificado | cartografo-5a77 |
| lcr-3c7r8 | Como uma operação de última milha cortou 31% do custo: playbook, planilhas e modelo de roteirização | Educação e métodos · pacote | Camadas · Sumário R$ 190 · Playbook R$ 890 · Planilhas e modelo R$ 1.900 · Pacote R$ 2.400 | Ativo · Plausível | bussola-c4e1 |
| lcr-6d1k5 | Monitor semanal de patentes do setor farmacêutico brasileiro | Ciência e pesquisa · texto + planilha | Assinatura · R$ 190/mês · 212 assinantes · edição avulsa R$ 90 | Ativo · Verificado parcialmente | prisma-66af |
| lcr-1w9s6 | 400 fotografias inéditas da construção de Brasília (1957–1960), acervo pessoal digitalizado | História e acervos · imagens | Leilão lacrado (segundo preço) · reserva não revelada · 7 lances · encerra 02/11/2026 | Ativo · Verificado | arquivista-0d2e |
| lcr-0p4m3 | Série histórica de tarifas de ônibus em 27 capitais (1994–2026) com fontes | Governo e políticas públicas · dataset | Cópias · R$ 90 | Em análise (Bruno M.) | coruja-7f3a |
| lcr-2z5q7 | Mapeamento de 3.100 feiras livres do estado de SP com dias, horários e geolocalização | Dados e bases · dataset | Cópias · R$ 240 | Ajustes solicitados (prévia expõe coordenadas exatas; reduzir amostra) | coruja-7f3a |
| lcr-8k1n2 | Entrevistas com 40 ex-cobradores de ônibus de SP sobre a extinção da função (áudio + transcrição) | Jornalismo · áudio | Lacre coletivo · meta R$ 12.000 | Rascunho | coruja-7f3a |
| lcr-4g7h9 | Tabela de preços de medicamentos oncológicos em 15 países (2020–2026) | Saúde e meio ambiente · dataset | Cópias · R$ 350 | Aprovado · agendado 28/10/2026 14:00 · Verificado parcialmente | coruja-7f3a |
| lcr-9r3t1 | Base de 210 mil CNPJs do setor de construção com faturamento estimado | Negócios e mercado · dataset | Cópias · R$ 1.200 | Rejeitado · R01 (contém CPFs de sócios; remover coluna e reenviar como novo item) | coruja-7f3a |
| lcr-5m8c4 | Guia de acesso a dados do SUS: 60 fontes, endpoints e scripts de coleta | Tecnologia e segurança · pacote | Cópias · R$ 150 · 88 vendidas | Encerrado · Verificado | coruja-7f3a |
| lcr-6b2v7 | Relatório de inspeção de 90 barragens de rejeito (ANM, 2024), consolidado com georreferenciamento e histórico de autuações | Governo e políticas públicas · pacote | Lacre coletivo · meta R$ 30.000 | Em análise · risco alto · dois olhos (Ana R. + Bruno M.) · jurídico | lanterna-b31d |

**Pedidos com recompensa**

| Slug | Pedido | Recompensa | Prazo | Status |
|---|---|---|---|---|
| ped-2c8d1 | Dados consolidados de tempo de espera em UPAs de São Paulo (2023–2025), por unidade e mês, em CSV | R$ 3.200 · 14 contribuidores | 30/11/2026 | Aberto |
| ped-7f1a3 | Cópia digitalizada do catálogo da 1ª Bienal de São Paulo (1951) | R$ 800 · 1 | 15/12/2026 | Aberto |
| ped-4k9e2 | Série de preços de aluguel por bairro em Belo Horizonte (2015–2026) | R$ 1.450 · 6 | 20/11/2026 | Atendimento em curadoria |
| ped-1b6j8 | Fotografias dos interiores do Estádio do Pacaembu antes da reforma (2019–2020) | R$ 600 · 3 | — | Atendido |
| ped-9h2d5 | Lista de todos os editais de fomento cultural municipais do RS em 2025 | R$ 2.100 · 9 | 10/12/2026 | Aberto |

**Carteira de @coruja-7f3a (extrato):** 20/10 depósito USDT Polygon +R$ 1.455,00 (270 USDT) · 21/10 compra lcr-9f2k7 −R$ 490,00 · 22/10 apoio lcr-4m2x9 −R$ 100,00 · 23/10 compra camada 1 lcr-3c7r8 −R$ 190,00 · 24/10 depósito Bitcoin Lightning +R$ 500,00 (0,00142 BTC) · 25/10 apoio lcr-4m2x9 −R$ 150,00 · 25/10 assinatura lcr-6d1k5 −R$ 190,00 · 26/10 liquidação de venda lcr-5m8c4 +R$ 135,00 (×3). Saldo R$ 1.240,00.

**Ganhos de @coruja-7f3a:** bruto R$ 13.200 (88 × R$ 150) · comissão 10 % R$ 1.320 · líquido R$ 11.880 · em custódia R$ 405,00 (3 vendas de R$ 135 líquidos, liberam em 48 h) · sacado R$ 9.800 (2 saques em USDT: R$ 4.800 em 02/10 e R$ 5.000 em 15/09) · 1 saque em processamento R$ 1.000.

**Datas:** hoje é 27/10/2026. Prazos no futuro próximo (nov/dez 2026).

## Regras do protótipo

1. Nunca peça nome, e-mail, telefone ou CPF em nenhuma tela. Onde um produto comum pediria, mostre o bloco "O que não pedimos".
2. Pseudônimos sempre com o componente `.handle`. Equipe sempre com nome e papel.
3. Prévias nunca legíveis: use `.preview` ou `.doc-mock` com `.redacted`/`.blur-text`.
4. Textos em português do Brasil, tom factual, sem adjetivos de escândalo.
5. Botões de ação que não têm destino no protótipo recebem `data-toast="…"` descrevendo o que aconteceria.
6. Links entre telas sempre relativos (`../public/item.html`), nunca absolutos.
7. Cada tela deve funcionar a 400 px de largura (empilhar colunas) e nos dois temas.
