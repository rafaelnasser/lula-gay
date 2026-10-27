# 02 · Modelos de venda

Cada item do catálogo é vendido por **um modelo principal** e pode ter **modificadores**. O vendedor escolhe no passo 4 do envio (`seller/novo-anuncio.html`); a curadoria pode sugerir outro modelo antes de aprovar.

Convenções que valem para todos os modelos:

- O dinheiro do comprador sai da **carteira** e vai para a **custódia** (escrow) do item. Só é liberado ao vendedor após a entrega e o fim da janela de disputa (72 h por padrão).
- Toda compra gera um **entitlement** (direito de acesso) para a conta compradora. Conteúdo nunca é enviado por fora; é acessado no **cofre**.
- Todo item tem **prazo**: data de encerramento definida pelo vendedor (mínimo 24 h, máximo 90 dias; renovável para modelos abertos).
- A **comissão da plataforma é única: 10 %** sobre o valor recebido pelo vendedor, em todos os modelos. Nada é cobrado se um lacre coletivo falhar. Detalhes em `09-monetizacao-e-metricas.md`.
- Todo pagamento é em cripto (USDT, USDC, BTC). Preços em US$, liquidados em USDT (1:1). Ver `03 §6`.
- Itens de muitos compradores (Cópias, Lacre coletivo, Camadas) podem ter um **valor de exclusividade**: quem pagar leva o item só para si e o anúncio encerra. Ver "Compra com exclusividade" abaixo.
- Se o vendedor cancelar um item com dinheiro em custódia, todos os compradores são reembolsados integralmente e o vendedor recebe uma penalidade de reputação.

---

## Resumo

| # | Modelo | Em uma frase | Quem compra | Fase |
|---|---|---|---|---|
| 1 | **Cópias** | Preço fixo, vários compradores, com ou sem limite de unidades | Muitos | MVP |
| 2 | **Exclusivo** | Um único comprador leva, item sai do catálogo | Um | MVP |
| 3 | **Lacre coletivo** | Meta de arrecadação; batida a meta, o conteúdo é liberado | Multidão | MVP |
| 4 | **Pedido com recompensa** | Compradores publicam o que querem e juntam a recompensa; quem entregar leva | Demanda primeiro | MVP |
| 5 | **Leilão** | Maior lance leva (aberto, lacrado ou holandês) | Um | V2 |
| 6 | **Camadas** | Conteúdo dividido em níveis com preços crescentes | Muitos | V2 |
| 7 | **Assinatura** | Fonte recorrente; acesso enquanto pagar | Muitos | V2 |
| 8 | **Janela exclusiva** | Exclusividade temporária e depois abertura para cópias | Um, depois muitos | V3 |
| 9 | **Licença** | Direitos de uso por finalidade (editorial, comercial, exclusiva) | Muitos | V3 |
| 10 | **Consulta paga** | Comprador faz uma pergunta e paga pela resposta verificada | Um | V3 |

Modificadores (combináveis): **compra com exclusividade (buyout)**, edição limitada, preço escalonado por volume, metas estendidas, prévias por marco, pague o que quiser com mínimo, tudo-ou-nada vs. flexível, compra em grupo, marca d'água obrigatória, somente leitura (sem download).

---

## 1. Cópias

**Como funciona.** O vendedor define um preço. Qualquer comprador paga e recebe acesso imediato. O item continua no catálogo até o prazo ou até esgotar as unidades, se houver limite.

**Variantes.**
- *Ilimitado*: sem teto de unidades.
- *Edição limitada*: N unidades (ex.: 50). Cria escassez e justifica preço mais alto. O catálogo mostra "37 de 50 restantes".
- *Preço escalonado*: as primeiras X unidades a um preço, as seguintes a outro (ex.: 10 a US$ 290, depois US$ 490). Recompensa quem compra cedo e cria urgência.

**Regras.**
- Entrega instantânea após o pagamento.
- Janela de disputa de 72 h: o comprador pode alegar que o conteúdo não corresponde à prévia. Ver `04`.
- O vendedor pode encerrar a venda a qualquer momento; quem já comprou mantém o acesso.

**Interface.** Botão "Comprar por US$ X", contador de unidades (se limitado), faixa de preço escalonado, selo de curadoria, nota de autenticidade.

**Comissão.** 10 %.

**Riscos.** Revenda fora da plataforma. Mitigação: marca d'água por entitlement, termos, visualizador seguro para itens sensíveis.

---

## 2. Exclusivo

**Como funciona.** Um único comprador adquire o item. Após a venda, o item é marcado como "Vendido" e a prévia sai do catálogo (fica apenas o registro na página de prova, sem a prévia).

**Variantes.**
- *Preço fixo*: "Comprar exclusividade por US$ X".
- *Faça uma oferta*: o comprador propõe um valor (acima de um mínimo opcional); o vendedor aceita, recusa ou contrapropõe em até 48 h. As ofertas são vinculantes e o valor fica reservado na carteira do comprador até a resposta.
- *Compre agora ou oferte*: combina os dois.

**Regras.**
- O vendedor declara que não venderá nem publicará o mesmo conteúdo em outro lugar por um período (padrão: 24 meses). A declaração fica registrada.
- Após a venda, a plataforma elimina as cópias do conteúdo em seus servidores após a janela de disputa (mantém apenas o hash para a prova).
- Opcionalmente o comprador recebe uma **cessão de direitos** padronizada (modelo em `04`, anexo).

**Interface.** Preço, botão de compra, campo de oferta, tempo restante, histórico de ofertas (apenas quantidade e maior oferta, nunca quem).

**Comissão.** 10 %.

**Riscos.** Vendedor vende o mesmo material em outro lugar. Mitigação: hash público permite provar que o conteúdo é o mesmo; penalidade de banimento; retenção de parte do valor por 30 dias ("garantia de exclusividade") como opção do comprador.

---

## 3. Lacre coletivo (financiamento coletivo)

É o modelo mais característico da plataforma e o que gera mais conversa nas redes.

**Como funciona.** O vendedor define uma **meta** em US$ e um **prazo**. Qualquer pessoa pode apoiar com qualquer valor a partir de um mínimo (US$ 10). Quando a soma atinge a meta, o lacre é rompido e o conteúdo é liberado conforme a regra de liberação escolhida.

**Liberação: sempre pública.** Quando a meta bate, o conteúdo fica público para todos ao mesmo tempo, inclusive quem não apoiou, e o rompimento é postado nas redes. Quem apoiou ganha o selo "Rompeu este lacre" no perfil. Não existem variantes "só para apoiadores", acesso antecipado nem apoio âncora: o lacre coletivo é o modelo de bem público da plataforma; quem quer vender para poucos usa Cópias ou Exclusivo.

**Regras de arrecadação.**
- *Tudo ou nada* (padrão): se a meta não for atingida no prazo, todos os apoios voltam para as carteiras automaticamente.
- *Flexível*: o vendedor pode optar por liberar com o que arrecadou se tiver passado de um piso (ex.: 70 % da meta). Deve ser declarado antes de publicar.

**Metas estendidas.** O vendedor pode definir níveis acima da meta que destravam material adicional (ex.: US$ 80 mil libera o relatório; US$ 120 mil libera também as entrevistas em áudio). Cada nível é um asset separado no envio.

**Mecânicas de engajamento.**
- Barra de progresso pública, número de apoiadores e tempo restante.
- **Linha do tempo do lacre** na página do item: barra de prazo (publicado → hoje → encerra, com o dia atual marcado), ritmo dos últimos dias e previsão de rompimento, e uma barra própria para cada marco (25, 50, 75, 90, 100 % e meta estendida) com a data em que foi batido e quantos apoiadores havia.
- **Prévias por marco**: o vendedor escolhe, no envio, uma prévia extra para cada marco (ex.: índice dos documentos aos 25 %, uma página sem tarjas aos 50 %, um mapa e 3 min de áudio aos 75 %). A curadoria aprova junto com o item. Ao bater o marco, a prévia é liberada ao público e publicada nas redes com o anúncio do marco. É o que mostra ao público o que está por vir.
- Marcos automáticos postados nas redes: 25 %, 50 %, 75 %, 90 %, meta batida, cada um com a prévia correspondente.
- Compartilhamento com link de referência anônimo (contador por link, sem identificar quem compartilhou).

**Regras de custódia.** Apoios ficam em custódia até o resultado. Se a meta for batida, o valor vai para a custódia do item e é liberado ao vendedor 72 h após a liberação do conteúdo, descontados pedidos de reembolso procedentes.

**Interface.** Barra de progresso, meta, arrecadado, apoiadores, prazo, botões de valores sugeridos (US$ 20, 50, 100, 250, outro), regra de liberação em destaque, metas estendidas em lista, atualizações do vendedor.

**Comissão.** 10 %.

**Riscos.** Vendedor não entrega o combinado após a meta. Mitigação: o conteúdo completo já está enviado e analisado pela curadoria antes de o item ir ao ar. A liberação é automática. Não existe "vou enviar depois".

---

## 4. Pedido com recompensa (demanda primeiro)

**Como funciona.** Um comprador publica um pedido: "procuro X", com descrição, critérios de aceite e uma recompensa inicial. Outros compradores podem **somar valor** à recompensa. Vendedores enviam propostas de atendimento (um envio normal, que passa pela curadoria). Quando a curadoria confirma que a entrega atende aos critérios, o primeiro vendedor validado recebe a recompensa e todos os que contribuíram recebem acesso.

**Variantes.**
- *Recompensa individual*: um só comprador paga e só ele recebe.
- *Recompensa coletiva*: vários somam e todos recebem (padrão).
- *Leilão reverso*: vendedores propõem preços para atender; o comprador escolhe a proposta.
- *Pedido aberto ao público*: depois de atendido, o item pode ser liberado como Cópias para quem não contribuiu, com parte da receita indo aos contribuidores originais (até reembolsar o que pagaram). Isso incentiva pedidos.

**Regras.**
- Pedidos também passam pela curadoria antes de ficar públicos (nada de pedir dado pessoal, conteúdo íntimo, credenciais etc.).
- A recompensa fica em custódia desde a contribuição. Pedido sem atendimento no prazo devolve tudo.
- Se dois vendedores entregarem, vale o primeiro validado; o segundo pode publicar o dele como item normal.

**Interface.** Mural público de pedidos, página do pedido com critérios de aceite, recompensa acumulada, contribuidores (contagem), botão "Somar à recompensa" e botão "Tenho essa informação".

**Comissão.** 10 %.

---

## 5. Leilão

**Como funciona.** Item exclusivo vendido ao maior lance dentro de um prazo.

**Variantes.**
- *Aberto (inglês)*: lances visíveis (valor, nunca quem), incremento mínimo, prorrogação automática de 10 min se houver lance nos últimos 10 min (anti-sniping).
- *Lacrado*: cada participante envia um único lance secreto. Ao fim, o maior leva. Pode ser de primeiro preço (paga o que ofertou) ou segundo preço (paga o segundo maior lance + incremento, o que incentiva lances honestos). É o formato que mais conversa com a identidade da plataforma.
- *Holandês (preço decrescente)*: o preço começa alto e cai em intervalos definidos até alguém comprar. Ótimo quando o vendedor não sabe quanto vale.

**Regras.**
- Preço de reserva opcional (não revelado). Se não for atingido, não há venda.
- O valor do lance é reservado na carteira do participante (não pode gastar em outra coisa) e liberado quando é superado ou o leilão termina.
- Vencedor que não tem saldo não existe: o saldo já estava reservado.

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
- Se o vendedor atrasar mais de um período, os assinantes recebem crédito proporcional.
- Cobrança por débito da carteira no início de cada período; sem saldo, a assinatura pausa.

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
- Opcional, definido no passo 4 do envio. Sugestão de mínimo: 5× a meta (lacre coletivo) ou 20× o preço unitário (cópias). A curadoria pode sugerir outro valor.
- Disponível enquanto o item está ativo. Em lacre coletivo, só até a meta ser batida; depois do rompimento não existe mais exclusividade a vender.
- **Cópias e Camadas:** quem já comprou mantém o acesso (já recebeu). O comprador da exclusividade vê, antes de pagar, quantas cópias já foram vendidas. A partir da compra, ninguém mais recebe.
- **Lacre coletivo:** todos os apoios são devolvidos automaticamente às carteiras e os apoiadores são notificados. O conteúdo não é liberado ao público.
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
| Metas estendidas | Níveis acima da meta destravam extras | Lacre coletivo, Pedido |
| Pague o que quiser | Valor livre acima de um mínimo | Cópias (itens de interesse público) |
| Tudo ou nada / flexível | Regra de falha da arrecadação | Lacre coletivo, Pedido |
| Compra em grupo | Preço fixo de exclusividade dividido entre N compradores que entram juntos; fecha ao completar N | Exclusivo |
| Marca d'água | Visível ou invisível, por entitlement | Todos |
| Somente leitura | Sem download; só visualizador seguro | Documento, imagem, vídeo |
| Garantia de exclusividade | Retenção de 20 % do valor por 30 dias contra revenda | Exclusivo, Janela |
| Renovação automática | Reabre o prazo ao vencer | Cópias, Assinatura |

## Combinações que fazem sentido

- **Janela exclusiva (leilão lacrado) → Lacre coletivo público.** Uma redação compra a dianteira; depois o público financia a abertura total. Gera duas ondas de divulgação.
- **Pedido com recompensa → Cópias.** Pedido atendido vira item aberto; contribuidores originais recebem parte da receita.
- **Camadas + Lacre coletivo.** A camada 1 é liberada pelo lacre coletivo; as camadas superiores são vendidas.
- **Assinatura + Edições avulsas.** A fonte recorrente vende edições antigas como Cópias.

## Decisão de MVP

Lançar com **Cópias, Exclusivo, Lacre coletivo e Pedido com recompensa**. Os quatro cobrem os três fluxos de dinheiro (um para um, um para muitos, muitos para um) e já permitem a história completa nas redes. Leilão e Assinatura entram na V2 porque dependem de carteira madura (reserva de saldo) e de SLA de curadoria mais curto.

## Estados comuns de um item

```
Rascunho → Enviado → Em triagem → Em análise → Aprovado → Agendado → Ativo
                          ↓            ↓                                ↓
                       Rejeitado   Ajustes solicitados          Financiado | Vendido | Encerrado | Expirado
                                        ↓                                ↓
                                   (reenvio)                         Arquivado
```

Detalhes por modelo em `06-modelo-de-dados.md`, seção "Máquinas de estado".
