# Lacre · marketplace curado de informação

> Nome provisório. "Lacre" é o selo que fecha um documento; comprar é romper o lacre.

Plataforma para comprar e vender informação (documentos, bases de dados, fotos, vídeos, áudios, relatos, métodos) com três garantias: **anonimato total entre as partes**, **curadoria humana obrigatória** antes de qualquer item ir ao ar e **prova pública** (hash + carimbo de tempo) divulgada no X e nas redes.

Este repositório contém a especificação completa do produto e um protótipo navegável de todas as telas, para que o desenvolvimento comece a partir daqui.

## Comece por aqui

| O que | Onde |
|---|---|
| Ver as telas | abra `design/index.html` no navegador (ou `npx serve design`) |
| Entender o produto | `docs/01-visao-e-conceito.md` |
| Modelos de venda (cópias, exclusivo, lacre coletivo, pedido, leilão, camadas, assinatura, janela, licença) | `docs/02-modelos-de-venda.md` |
| Como o anonimato funciona e onde ele termina | `docs/03-anonimato-e-seguranca.md` |
| Esteira de curadoria e política de conteúdo | `docs/04-curadoria-e-politica-de-conteudo.md` |
| Stack, serviços, pipeline de conteúdo, ledger, API | `docs/05-arquitetura-tecnica.md` |
| Entidades e máquinas de estado | `docs/06-modelo-de-dados.md` |
| Especificação tela a tela | `docs/07-mapa-de-telas.md` |
| Posts automáticos no X e redes | `docs/08-publicacao-social.md` |
| Taxas, unidade econômica, KPIs | `docs/09-monetizacao-e-metricas.md` |
| Fases, equipe, riscos | `docs/10-roadmap.md` |
| Convenções do protótipo e mundo de dados | `design/README.md` |
| Componentes do design system | `design/styleguide.html` |

## Estrutura

```
docs/        especificação do produto (10 documentos)
design/      protótipo navegável em HTML estático
  index.html         índice de todas as telas e fluxos
  styleguide.html    design system
  assets/            app.css (tokens + componentes) e app.js (menus, ícones, interações)
  public/            9 telas públicas
  auth/              3 telas de conta anônima
  buyer/             11 telas do comprador (3 compartilhadas com o vendedor)
  seller/            7 telas do vendedor
  admin/             11 telas da curadoria e operação
```

## Decisões que o protótipo já toma

- **Global.** Informação de qualquer país, com país e idioma em cada item e filtro de país no catálogo. Preços em dólar (US$), liquidados em USDT. Interface em português no protótipo; produto com pt, en e es.

- **Conta sem identidade**: pseudônimo gerado + senha, passkey ou arquivo de acesso (um arquivo-chave que o usuário escolhe para entrar) + frase de recuperação de 12 palavras. Sem e-mail, telefone, CPF.
- **Só cripto, dos dois lados.** Depósito em USDT/USDC (Polygon, Tron, Base) ou Bitcoin (Lightning, on-chain); saque em cripto. Nenhum real entra ou sai, nenhum parceiro de pagamento, nenhum KYC. A carteira interna guarda créditos em USDT; preços são exibidos em US$ e convertidos na hora.
- **Comissão única de 10 %** em todos os modelos. Nada é cobrado se um lacre coletivo falhar.
- **Compra com exclusividade.** Em Cópias, Lacre coletivo e Camadas, o vendedor pode definir um valor pelo qual um único comprador leva o item e o anúncio encerra (apoios devolvidos).
- **Nada é publicado sem curadoria**. Checklist em 7 blocos, nível de autenticidade público, regra de dois olhos em categorias de risco alto, escalonamento jurídico.
- **MVP com 4 modelos**: Cópias, Exclusivo, Lacre coletivo e Pedido com recompensa. Os outros 6 entram nas fases 2 e 3.
- **Página de prova** por item, destino de todo post nas redes.

## Decisões que ainda precisam de vocês

1. **Sede e jurisdição.** A plataforma é global, mas a entidade operadora tem uma sede, e é ela que define guarda de registros de acesso, regras de ativos virtuais e sanções (`docs/03 §8` compara Brasil, UE e EUA). Validar com advogado antes de escrever a promessa pública de anonimato.
2. **Custódia de cripto.** Guardar cripto de usuários pode enquadrar a plataforma como prestadora de serviços de ativos virtuais (Lei 14.478/2022 e regulação do Banco Central). Validar jurisdição e estrutura antes do lançamento; o escrow on-chain da fase 2 reduz esse enquadramento.
3. **Nome definitivo.** "Lacre" está em um único lugar (`design/assets/app.js`, constante `BRAND`) e nos textos.
4. **Comissão.** 10 % é a decisão atual; `docs/09` mostra o efeito na unidade econômica.

## Como estender o protótipo

Cada tela é um HTML que carrega `assets/app.css` e `assets/app.js`. O esqueleto, as classes e os dados de exemplo estão em `design/README.md`. Para criar uma tela nova: copie uma existente da mesma área, troque `data-page` e o conteúdo do `<main>`, e adicione o link em `design/index.html`.
