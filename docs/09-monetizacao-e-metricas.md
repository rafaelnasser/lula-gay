# 09 · Monetização e métricas

## 1. Fontes de receita

| Fonte | Como | Quando |
|---|---|---|
| **Comissão de 10 %** | Separada da carteira do item na finalização, em todos os modelos | MVP |
| **Taxa de rede dos reembolsos** | Descontada do valor devolvido (não é receita) | MVP |
| **Análise expressa** | Vendedor paga para ter SLA de 24 h na curadoria (fila prioritária) | V2 |
| **Destaque no catálogo** | Posição fixa na vitrine por 7 dias, marcado como "Destaque" | V2 |
| **Conta Pro (comprador)** | Alertas por categoria, acesso antecipado a lançamentos, API de catálogo, exportações | V2 |
| **API de dados** | Acesso programático a itens do tipo dataset para compradores institucionais | V3 |
| **Serviço de verificação** | Curadoria como serviço para terceiros (verificar um documento) | V3 |

## 2. Comissão

**10 % em todos os modelos.** Uma única regra, fácil de comunicar ("você fica com 90 %"), cobrada só na finalização, por transferência da carteira do item para a carteira da plataforma. Num lacre que não bate a meta, a comissão incide só sobre o valor garantido ao vendedor pelos marcos batidos; nada é cobrado se nenhum marco foi batido ou se um pedido não for atendido. Taxas de rede de reembolsos saem do valor devolvido.

**Custos de pagamento da plataforma:** HSM, nós e indexadores por rede, taxas de rede das transferências de comissão (uma por item finalizado). Estimativa: 0,2 % a 0,4 % do volume.

## 3. Unidade econômica (exemplo)

Lacre coletivo de US$ 80.000 batido:
- Receita de comissão: US$ 8.000.
- Custo de pagamento (nós, consolidações, spread BTC): ~US$ 320.
- Curadoria: 2 curadores × 6 h + jurídico 2 h ≈ US$ 1.400.
- Publicação e infra alocadas: ~US$ 200.
- Margem de contribuição: ~US$ 6.080 (76 %).

Cópia de US$ 490 (100 unidades vendidas):
- GMV US$ 49.000; comissão US$ 4.900; pagamentos ~US$ 200; curadoria única ~US$ 500; margem ~US$ 4.200.

Itens que não vendem custam curadoria. Por isso: triagem automática barata, análise expressa paga e limite de envios simultâneos por vendedor novo (3 itens até a primeira aprovação).

## 4. Fundo de garantia

2 % de toda comissão vai para um fundo que cobre reembolsos quando o dinheiro já saiu da carteira do item (item retirado após a finalização, quando a carteira já foi entregue ao vendedor). Meta: fundo equivalente a 1 mês de GMV antes de reduzir a alíquota.

## 5. Precificação orientada

A interface do vendedor mostra faixas de preço de itens aprovados semelhantes (categoria, tipo, volume) e a taxa de conversão por faixa. A curadoria pode sugerir preço. Nunca impõe.

## 6. KPIs por área

**Marketplace**
- GMV mensal e por modelo; ticket médio; itens ativos; taxa de conversão visita → compra; lacres rompidos; pedidos atendidos.

**Oferta**
- Envios por semana; taxa de aprovação; tempo até aprovação; vendedores com ≥ 1 aprovação; vendedores recorrentes (≥ 3 itens).

**Demanda**
- Contas criadas; contas com ao menos um pagamento; pagamento médio; compradores recorrentes; apoiadores por lacre.

**Confiança**
- Taxa de disputa; disputas procedentes; taxa de reversão pós-publicação; tempo de resposta a denúncias; incidentes de segurança.

**Distribuição**
- Impressões/cliques dos posts; conversão prova → item; seguidores dos canais.

**Financeiro**
- Receita de comissões; custo de pagamento; custo de curadoria por item aprovado; margem de contribuição; saldo do fundo de garantia; valor em carteiras de itens ativas (não é passivo da plataforma); carteiras finalizadas ainda não recebidas pelos vendedores.

## 7. Metas dos primeiros 6 meses (hipótese a validar)

| Mês | Itens ativos | GMV | Lacres rompidos |
|---|---|---|---|
| 1 | 30 | US$ 60 mil | 1 |
| 3 | 150 | US$ 400 mil | 6 |
| 6 | 500 | US$ 1,5 mi | 20 |
