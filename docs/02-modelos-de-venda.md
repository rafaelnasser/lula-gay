# 02 · Modelos de venda

Cada item do catálogo é vendido por **um modelo principal** e pode ter **modificadores**. O vendedor escolhe no passo 4 do envio (`seller/novo-anuncio.html`); a curadoria pode sugerir outro modelo antes de aprovar.

Convenções que valem para todos os modelos:

- O comprador paga da própria carteira cripto direto para a **carteira do item** (uma por item, criada na aprovação). O dinheiro fica lá até a **finalização**: venda concluída e janela de disputa de 72 h vencida, lacre rompido, atendimento validado ou vendedor encerra as vendas. Na finalização a plataforma separa 10 % e entrega a carteira do item ao vendedor (frase de recuperação, uma única vez). Ver `03 §6`.
- Toda compra gera um **entitlement** (direito de acesso) para a conta compradora. Conteúdo nunca é enviado por fora; é acessado no **cofre**.
- Todo item tem **prazo**: data de encerramento definida pelo vendedor (mínimo 24 h, máximo 90 dias; renovável para modelos abertos).
- A **comissão da plataforma é única: 10 %**, separada só na finalização, em todos os modelos. Se um lacre coletivo falhar, a comissão incide só sobre o valor garantido ao vendedor pelos marcos batidos. Detalhes em `09-monetizacao-e-metricas.md`.
- Todo pagamento é em cripto (USDT e USDC em Polygon, Tron e Base; Bitcoin on-chain em Exclusivo e Cópias). Preços em US$; stablecoins 1:1.
- Itens de muitos compradores (Cópias, Lacre coletivo, Camadas) podem ter um **valor de exclusividade**: quem pagar leva o item só para si e o anúncio encerra. Ver "Compra com exclusividade" abaixo.
- Se o vendedor cancelar um item antes da finalização, cada pagamento volta ao endereço de origem a partir da carteira do item (descontada a taxa de rede) e o vendedor recebe uma penalidade de reputação.

---

## Resumo

| # | Modelo | Em uma frase | Quem compra | Fase |
|---|---|---|---|---|
| 1 | **Cópias** | Preço fixo, vários compradores, com ou sem limite de unidades | Muitos | MVP |
| 2 | **Exclusivo** | Um único comprador leva, item sai do catálogo | Um | MVP |
| 3 | **Lacre coletivo** | Meta de arrecadação; batida a meta, o conteúdo é liberado | Multidão | MVP |
| 4 | **Pedido com recompensa** | Um comprador publica o que quer e o valor que paga; quem quer a mesma informação se junta pelo mesmo valor (ou cobre); quem entregar leva o total | Demanda primeiro | MVP |
| 5 | **Leilão** | Maior lance leva (aberto, lacrado ou holandês) | Um | MVP |
| 6 | **Camadas** | Conteúdo dividido em níveis com preços crescentes | Muitos | MVP |
| 7 | **Assinatura** | Fonte recorrente; acesso enquanto pagar | Muitos | MVP |
| 8 | **Janela exclusiva** | Exclusividade temporária e depois abertura para cópias | Um, depois muitos | MVP |
| 9 | **Licença** | Direitos de uso por finalidade (editorial, comercial, exclusiva) | Muitos | MVP |
| 10 | **Consulta paga** | Comprador faz uma pergunta e paga pela resposta verificada | Um | V3 |

Modificadores (combináveis): **compra com exclusividade (buyout)**, edição limitada, preço escalonado por volume, prévias por marco, pague o que quiser com mínimo, marcos garantidos vs. flexível, compra em grupo, marca d'água obrigatória, somente leitura (sem download).

---

## 1. Cópias

**Como funciona.** O vendedor define um preço. Qualquer comprador paga e recebe acesso imediato. O item continua no catálogo até o prazo ou até esgotar as unidades, se houver limite.

**Variantes.**
- *Ilimitado*: sem teto de unidades.
- *Edição limitada*: N unidades (ex.: 50). Cria escassez e justifica preço mais alto. O catálogo mostra "37 de 50 restantes".
- *Preço escalonado*: as primeiras X unidades a um preço, as seguintes a outro (ex.: 10 a US$ 290, depois US$ 490). Recompensa quem compra cedo e cria urgência.

**Regras.**
- Entrega instantânea após o pagamento.
- Janela de disputa de 72 h: o comprador pode alegar que o conteúdo não corresponde à prévia. Disputa aberta adia a finalização do item até a decisão. Ver `04`.
- O vendedor pode encerrar a venda a qualquer momento; quem já comprou mantém o acesso.

**Interface.** Botão "Comprar por US$ X", contador de unidades (se limitado), faixa de preço escalonado, selo de curadoria, nota de autenticidade.

**Comissão.** 10 %.

**Riscos.** Revenda fora da plataforma. Mitigação: marca d'água por entitlement, termos, visualizador seguro para itens sensíveis.

---

## 2. Exclusivo

**Como funciona.** Um único comprador adquire o item. Após a venda, o item é marcado como "Vendido" e a prévia sai do catálogo (fica apenas o registro na página de prova, sem a prévia).

**Variantes.**
- *Preço fixo*: "Comprar exclusividade por US$ X".
- *Faça uma oferta*: o comprador propõe um valor (acima de um mínimo opcional); o vendedor aceita, recusa ou contrapropõe em até 48 h. As ofertas são vinculantes: o valor é pago na hora a um endereço derivado do item e volta ao endereço de origem se a oferta for recusada ou superada.
- *Compre agora ou oferte*: combina os dois.

**Regras.**
- O vendedor declara que não venderá nem publicará o mesmo conteúdo em outro lugar por um período (padrão: 24 meses). A declaração fica registrada.
- Após a venda, a plataforma elimina as cópias do conteúdo em seus servidores após a janela de disputa (mantém apenas o hash para a prova).
- Opcionalmente o comprador recebe uma **cessão de direitos** padronizada (modelo em `04`, anexo).

**Interface.** Preço, botão de compra, campo de oferta, tempo restante, histórico de ofertas (apenas quantidade e maior oferta, nunca quem).

**Comissão.** 10 %.

**Riscos.** Vendedor vende o mesmo material em outro lugar. Mitigação: hash público permite provar que o conteúdo é o mesmo; penalidade de banimento e reembolso pelo fundo de garantia.

---

## 3. Lacre coletivo (financiamento coletivo)

É o modelo mais característico da plataforma e o que gera mais conversa nas redes.

**Como funciona.** O vendedor define uma **meta** em US$ e um **prazo**. Qualquer pessoa pode apoiar com qualquer valor a partir de um mínimo (US$ 10). Quando a soma atinge a meta, o lacre é rompido e todo o conteúdo fica público para todos ao mesmo tempo.

**Liberação pública, de uma vez.** Cada marco (25, 50, 75 e 90 %) libera uma prévia ao público, postada nas redes. Ao bater 100 %, todo o conteúdo fica público para todos ao mesmo tempo, inclusive quem não apoiou, e o rompimento é postado nas redes. É o modelo de bem público da plataforma: não há fila, ondas nem acesso antecipado para quem apoiou mais; quem quer vender para poucos usa Cópias ou Exclusivo. Quem apoiou ganha o selo "Rompeu este lacre" no perfil.

**Regras de arrecadação.**
- *Marcos garantidos* (padrão): cada marco batido (25, 50, 75 e 90 %) libera uma prévia ao público e passa a ser do vendedor, porque paga essa prévia. Se o prazo vencer antes de 100 %, fica com o vendedor o valor do **último marco batido** e **o que entrou depois volta** aos apoiadores, ao endereço de origem, menos a taxa de rede, em ordem de chegada (o apoio que cruzou o marco volta só na parte acima dele). Exemplo: meta US$ 80.000, prazo vence em 88 % (US$ 70.400): o último marco batido é 75 %, então US$ 60.000 ficam com o vendedor e US$ 10.400 voltam. Sem nenhum marco batido (abaixo de 25 %), tudo volta. O conteúdo completo só é liberado se a meta bater.
- *Flexível*: o vendedor pode optar por liberar com o que arrecadou se tiver passado de um piso (ex.: 70 % da meta). Deve ser declarado antes de publicar.

**Tudo ao bater a meta.** Ao bater 100 % da meta, todo o material do item é liberado ao público. Não existem metas estendidas nem material guardado para um segundo patamar: tudo o que o vendedor envia entra na meta.

**Mecânicas de engajamento.**
- Barra de progresso pública, número de apoiadores e tempo restante.
- **Linha do tempo do lacre** na página do item: barra de prazo (publicado → hoje → encerra, com o dia atual marcado), ritmo dos últimos dias e previsão de rompimento, e uma barra própria para cada marco (25, 50, 75, 90 e 100 %) com a data em que foi batido e quantos apoiadores havia.
- **Prévias por marco**: o vendedor escolhe, no envio, uma prévia extra para cada marco (ex.: índice dos documentos aos 25 %, uma página sem tarjas aos 50 %, um mapa e 3 min de áudio aos 75 %). A curadoria aprova junto com o item. Ao bater o marco, a prévia é liberada ao público e publicada nas redes com o anúncio do marco. É o que mostra ao público o que está por vir.
- Marcos automáticos postados nas redes: 25 %, 50 %, 75 %, 90 %, meta batida, cada um com a prévia correspondente.
- Compartilhamento com link de referência anônimo (contador por link, sem identificar quem compartilhou).

**Regras de custódia.** Os apoios ficam na carteira do item até o resultado. Se a meta for batida, 72 h após a liberação pública a plataforma separa a comissão, executa reembolsos procedentes e entrega a carteira ao vendedor. Se falhar, aplica-se a regra dos marcos garantidos: o valor do último marco batido fica com o vendedor (com 10 % de comissão) e o que entrou depois volta aos apoiadores.

**Interface.** Barra de progresso, meta, arrecadado, apoiadores, prazo, botões de valores sugeridos (US$ 20, 50, 100, 250, outro), quanto já está garantido ao vendedor pelos marcos batidos, o que é liberado ao bater a meta, atualizações do vendedor.

**Comissão.** 10 %.

**Riscos.** Vendedor não entrega o combinado após a meta. Mitigação: o conteúdo completo já está enviado e analisado pela curadoria antes de o item ir ao ar. A liberação é automática. Não existe "vou enviar depois".

---

## 4. Pedido com recompensa (demanda primeiro)

**Como funciona.** Um comprador publica um pedido: "procuro X", com descrição, critérios de aceite, prazo e o **valor por pessoa** que aceita pagar. Para abrir, ele paga um **sinal de 25 %** desse valor na carteira do pedido (evita pedidos falsos). Quando alguém atende, ele vê uma **prévia** e só então paga os **75 % restantes** para receber tudo. O sinal não volta por desistência. Quem quiser a mesma informação **se junta pagando o mesmo valor**: a recompensa total é o valor por pessoa vezes o número de interessados, e todos recebem o mesmo acesso. Quem quiser pode **cobrir** o valor (oferecer mais); aí cada interessado iguala ou sai. Vendedores atendem o pedido enviando o conteúdo à curadoria; validado, cada interessado recebe acesso e quem atendeu recebe a carteira do pedido.

**Por que assim.** Não é justo alguém pagar US$ 50 e ter, em privado, a mesma informação pela qual outro pagou US$ 1 milhão. Com valor igual para todos: quem se junta aumenta a recompensa (dois interessados = o dobro para quem tem a informação); quem quer exclusividade paga mais e, se ninguém igualar, fica sozinho.

**Regras.**
1. **Abrir com sinal:** quem abre define o valor por pessoa (V) e o prazo (até 90 dias) e paga um **sinal de 25 % de V** na carteira do pedido. O sinal existe para evitar pedidos falsos e garantir a quem atende que há dinheiro de verdade. O pedido passa pela curadoria antes de ficar público (nada de pedir dado pessoal, conteúdo íntimo, credenciais etc.).
2. **Entrar:** qualquer conta entra pelo mesmo valor V, pagando o mesmo sinal (25 % de V), e espera. Recompensa total = V × pessoas; a página mostra também quanto já foi pago em sinais.
3. **Cobrir:** qualquer conta, nova ou já participante, sobe o valor para V' ≥ V + 10 %. Paga o sinal de 25 % de V' (ou 25 % da diferença, se já participa). V' vira o valor por pessoa.
4. **Completar o sinal:** quando o valor sobe, cada participante é avisado e tem 48 h (nunca além do prazo do pedido) para completar o sinal até 25 % do novo valor (paga 25 % da diferença). **O sinal não volta por desistência:** quem não completar deixa de participar, e o sinal que já pagou fica com o Lacre como taxa de serviço.
5. A qualquer momento, todas as pessoas que participam pagaram o mesmo sinal sobre o mesmo valor. Se alguém sobe o valor e ninguém completa, essa pessoa fica sozinha: exclusividade de fato.
6. **Atender e mostrar a prévia:** o vendedor envia o conteúdo à curadoria. Da entrada em curadoria até a decisão, o pedido fica travado (sem entradas, coberturas ou saídas). Se a curadoria aprova, **cada participante recebe uma prévia do atendimento** (amostra, páginas com tarja, miniaturas com marca d'água) e tem **72 h** para pagar os **75 % restantes**: o material completo vai para o cofre na hora, e quem atendeu recebe 90 % do total pago depois de 72 h sem disputa. **Quem não pagar perde o sinal, que fica com o Lacre como taxa de serviço** (nunca com quem atendeu: assim ninguém sobe o valor de propósito para tomar o sinal dos outros). Quem atende recebe 90 % do que cada pessoa pagou por inteiro. **Contestar:** se a prévia não corresponde ao que foi pedido, o participante contesta em 72 h com o motivo; a curadoria decide em até 48 h; se não corresponde, o atendimento cai e o pedido continua aberto. Se dois vendedores entregarem, vale o primeiro aprovado. Quem participa do pedido não pode atendê-lo; quem já deixou de participar pode (o sinal dele já ficou com o Lacre).
7. **Expirar:** sem nenhum vendedor até o prazo, o sinal de quem ainda participa volta ao endereço de origem. É o único caso em que o sinal volta.
8. Interessados são públicos (pseudônimo e data de entrada). Janela de 48 h e incremento de 10 % são parâmetros da administração.
9. **Extras (sub-itens opcionais).** Qualquer interessado ativo pode adicionar um extra ao pedido: algo próximo ou complementar ao que foi pedido (um vendedor que tem uma base parecida, por exemplo), com título, critérios, valor por pessoa próprio, prazo (nunca além do pedido) e carteira própria. Quem cria paga o valor ao criar; o extra passa pela curadoria antes de aparecer. Só interessados do pedido principal entram no extra, pelas mesmas regras (mesmo valor, cobrir ≥ +10 %, igualar ou sair em 48 h). **Não entrar no extra não muda nada no pedido principal**; sair do principal retira também dos extras. Um extra é atendido como um pedido, por qualquer vendedor e em qualquer momento (trava em análise; validado, 10 % separados e carteira do extra entregue). Vendedores podem **propor um extra** (título, descrição, valor sugerido); a proposta fica pública e só vira extra quando um interessado a cria e paga. Até 5 extras abertos por pedido; valor mínimo US$ 10. Extras seguem o mesmo sinal de 25 % e a mesma prévia antes dos 75 %.
10. **Pedido por unidade (vários envios).** Para quem quer muitas unidades de uma coisa (ex.: fotos de boletins de urna, um documento público por cidade): define o que vale como **uma unidade** (critérios), o **valor por unidade**, o **limite** e o prazo; orçamento = valor × limite; sinal de **25 % do orçamento**. Qualquer conta envia unidades em **lotes**; a triagem descarta duplicadas e ilegíveis e a curadoria valida o lote (amostragem). Quem pediu vê a **prévia do lote** e paga as unidades aceitas; cada lote tem carteira própria, entregue a quem enviou (90 %) depois de 72 h sem disputa. Lote validado sem resposta em 72 h é pago com o sinal. No fim (prazo ou limite), o sinal que sobrar volta. **Entrar:** outras pessoas podem entrar num pedido por unidade pelas mesmas condições (mesmo valor por unidade e mesmo sinal de 25 % do orçamento). Cada participante paga cada lote validado e recebe as mesmas unidades; quem entra depois paga do sinal as unidades já validadas. A recompensa por unidade é o valor × pessoas. Quem deixa o pedido antes do prazo perde o que sobrou do sinal (fica com o Lacre, como nos outros pedidos).

**Opção de quem abre.** "Depois de atendido, o vendedor pode vender o mesmo conteúdo como Cópias, nunca por menos que o valor por pessoa final." Desligada por padrão: o normal é o conteúdo ficar só com os interessados.

**Interface.** Mural público de pedidos; botão \"Pedir uma informação\" na página principal; página do pedido com critérios de aceite, valor por pessoa, interessados (pseudônimos e datas), recompensa total, prazo, botões "Juntar-se por US$ V", "Cobrir o valor (mín. V + 10 %)" e "Tenho essa informação"; seção "Extras deste pedido" (cards com valor, interessados, "Entrar no extra", "Adicionar um extra", propostas de vendedores); linha do tempo das entradas, coberturas, igualadas e extras; estados: aberto, valor subiu (iguale até…), travado (atendimento em curadoria), atendido, expirado.

**Comissão.** 10 % sobre o que quem atende recebe. Quem pede paga só o valor (sinal + restante) e a taxa da rede.

---

## 5. Leilão

**Como funciona.** Item exclusivo vendido ao maior lance dentro de um prazo.

**Variantes.**
- *Aberto (inglês)*: lances visíveis (valor, nunca quem), incremento mínimo, prorrogação automática de 10 min se houver lance nos últimos 10 min (anti-sniping).
- *Lacrado*: cada participante envia um único lance secreto. Ao fim, o maior leva. Pode ser de primeiro preço (paga o que ofertou) ou segundo preço (paga o segundo maior lance + incremento, o que incentiva lances honestos). É o formato que mais conversa com a identidade da plataforma.
- *Holandês (preço decrescente)*: o preço começa alto e cai em intervalos definidos até alguém comprar. Ótimo quando o vendedor não sabe quanto vale.

**Regras.**
- Preço de reserva opcional (não revelado). Se não for atingido, não há venda.
- Lance lacrado é pago na hora para um endereço derivado do item; quem não vence é reembolsado ao endereço de origem no encerramento (por isso leilões só em redes baratas).

**Interface.** Lance atual (ou "lances lacrados: 7"), incremento, tempo restante com prorrogação, campo de lance, histórico anônimo, para holandês: preço atual e próximo degrau com contagem regressiva.

**Comissão.** 10 %.

---

## 6. Camadas (desbloqueio progressivo)

**Como funciona.** O vendedor divide o conteúdo em camadas: a prévia é gratuita, a camada 1 custa X, a camada 2 custa Y, o pacote completo custa Z (com desconto). O comprador prova antes de comprometer o valor total.

**Exemplo.** Estudo de mercado: camada 1 = sumário executivo e 10 gráficos (US$ 190); camada 2 = relatório completo (US$ 890); camada 3 = planilhas e modelo (US$ 1.900); pacote = US$ 2.400.

**Regras.** Quem compra uma camada paga só a diferença para subir. Cada camada é um asset separado, analisado pela curadoria.

**Interface.** Lista de camadas com o que cada uma contém, preço e botão. Indicador de "você tem até a camada 1".

**Comissão.** 10 %.

---

## 7. Assinatura (fonte recorrente)

**Como funciona.** O vendedor publica uma **fonte**: um fluxo de itens periódicos (semanal, quinzenal, mensal). O comprador paga por período e tem acesso a tudo que for publicado enquanto estiver ativo. Edições anteriores podem ser vendidas avulsas.

**Regras.**
- Cada edição passa pela curadoria como um item normal, com SLA menor (24 h) para não atrasar a periodicidade.
- Se o vendedor atrasar mais de um período, o período seguinte não é cobrado.
- Cada período é um pagamento da própria carteira do assinante para um endereço derivado; sem pagamento, a assinatura pausa. Cada edição tem carteira própria, finalizada 72 h após a publicação.

**Interface.** Página da fonte com histórico de edições, periodicidade, preço por período, número de assinantes, botão "Assinar", amostra de uma edição.

**Comissão.** 10 %.

---

## 8. Janela exclusiva

**Como funciona.** Um comprador paga um prêmio por exclusividade durante N dias (ex.: 7). Passada a janela, o item abre como Cópias a um preço menor. É o modelo do furo jornalístico: a redação paga pela dianteira, e depois o material alcança o público.

**Regras.** Preço da janela e preço posterior são fixados antes de publicar. A janela pode ser vendida por preço fixo ou leilão.

**Interface.** Dois preços lado a lado, contagem regressiva da janela, aviso "aberto para todos a partir de DD/MM".

**Comissão.** 10 %.

---

## 9. Licença

**Como funciona.** Para fotos, vídeos e áudios. O comprador escolhe a finalidade: editorial (uso em notícia, uma publicação), comercial (campanha, prazo e território definidos) ou exclusiva (ninguém mais licencia). Cada finalidade tem preço e um contrato padrão gerado automaticamente com o pseudônimo das partes e o hash do arquivo.

**Regras.** Entrega em alta resolução sem marca d'água após o pagamento; prévia pública com marca d'água. Licença exclusiva encerra as demais.

**Interface.** Seletor de finalidade com preço, resumo do que a licença permite, download do contrato.

**Comissão.** 10 %.

---

## 10. Consulta paga

**Como funciona.** O comprador faz uma pergunta objetiva a um vendedor com reputação (ou ao mural). O vendedor responde dentro da plataforma; a curadoria verifica se a resposta é substantiva e lícita antes de liberar o pagamento.

**Regras.** Valor fixo por consulta definido pelo vendedor. Sem resposta em 72 h, reembolso. Respostas podem virar itens públicos se ambos concordarem (dividindo receita).

**Fase.** V3. Depende de reputação consolidada.

---

## Compra com exclusividade (buyout)

Um item publicado para muitos compradores pode trazer, ao lado do preço normal ou da meta, um **valor de exclusividade** definido pelo vendedor. Quem pagar esse valor leva o item só para si e o anúncio encerra na hora.

**Regras.**
- Opcional e **desligada por padrão**: o vendedor liga no passo 4 do envio só se quiser e define o valor. Um "?" ao lado explica a regra com um exemplo. Sugestão de mínimo: 5× a meta (lacre coletivo) ou 20× o preço unitário (cópias). A curadoria pode sugerir outro valor.
- Disponível enquanto o item está ativo. Em lacre coletivo, só até a meta ser batida; depois do rompimento não existe mais exclusividade a vender.
- **Cópias e Camadas:** quem já comprou mantém o acesso (já recebeu). O comprador da exclusividade vê, antes de pagar, quantas cópias já foram vendidas. A partir da compra, ninguém mais recebe.
- **Lacre coletivo:** cada apoio volta automaticamente ao endereço de origem e os apoiadores são notificados. O conteúdo não é liberado a ninguém além do comprador.
- O vendedor assina a mesma declaração de exclusividade do modelo Exclusivo (24 meses), e o conteúdo é destruído dos servidores após a janela de disputa.
- Comissão de 10 % sobre o valor pago. A página de prova registra "vendido com exclusividade" e a prévia sai do catálogo.
- Assinatura e Licença: fase 2 (a licença exclusiva já cobre o caso de fotos e vídeos).

**Interface.** No painel do item, abaixo da ação principal: "Comprar com exclusividade · US$ 250.000 · encerra o anúncio; os 1.187 apoios são devolvidos". No checkout, uma tela própria com as consequências e um aceite explícito. Nas redes, o post "Vendido com exclusividade" avisa que o item saiu do catálogo.

## Modificadores

| Modificador | O que faz | Aplica-se a |
|---|---|---|
| Compra com exclusividade | Valor que encerra o anúncio e entrega o item a um único comprador | Cópias, Lacre coletivo, Camadas |
| Edição limitada | Teto de unidades | Cópias, Camadas, Licença |
| Preço escalonado | Preço sobe conforme vende | Cópias |
| Pague o que quiser | Valor livre acima de um mínimo | Cópias (itens de interesse público) |
| Marcos garantidos / flexível | Regra de falha da arrecadação | Lacre coletivo |
| Compra em grupo | Preço fixo de exclusividade dividido entre N compradores que entram juntos; fecha ao completar N | Exclusivo |
| Marca d'água | Visível ou invisível, por entitlement | Todos |
| Somente leitura | Sem download; só visualizador seguro | Documento, imagem, vídeo |
| Renovação automática | Reabre o prazo ao vencer | Cópias, Assinatura |

## Combinações que fazem sentido

- **Janela exclusiva (leilão lacrado) → Lacre coletivo público.** Uma redação compra a dianteira; depois o público financia a abertura total. Gera duas ondas de divulgação.
- **Pedido com recompensa → Cópias.** Só se quem abriu permitir: o conteúdo entregue vira item de Cópias, nunca mais barato que o valor por pessoa final.
- **Camadas + Lacre coletivo.** A camada 1 é liberada pelo lacre coletivo; as camadas superiores são vendidas.
- **Assinatura + Edições avulsas.** A fonte recorrente vende edições antigas como Cópias.

## Decisão de MVP

Lançar com os **nove modelos** do assistente de envio: Cópias, Exclusivo, Lacre coletivo, Pedido com recompensa, Leilão, Camadas, Assinatura, Janela exclusiva e Licença. Juntos cobrem os três fluxos de dinheiro (um para um, um para muitos, muitos para um) e a história completa nas redes. Leilão e Assinatura exigem desde o início reembolso em massa (lances não vencedores) em redes baratas e SLA de curadoria de 24 h para edições. Só a **Consulta paga** fica para a V3, porque depende de reputação consolidada.

## Estados comuns de um item

```
Rascunho → Enviado → Em triagem → Em análise → Aprovado (publicado na hora) → Ativo
                          ↓            ↓                                ↓
                       Rejeitado   Ajustes solicitados          Financiado | Vendido | Finalizado | Expirado
                                        ↓                                ↓
                                   (reenvio)                         Arquivado
```

Detalhes por modelo em `06-modelo-de-dados.md`, seção "Máquinas de estado".
