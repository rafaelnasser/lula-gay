# 09 · Monetização e métricas

## 1. Fontes de receita

| Fonte | Como | Quando |
|---|---|---|
| **Taxa sobre transações** | Percentual descontado do vendedor em cada venda, apoio liberado ou recompensa paga | MVP |
| **Taxa de saque** | Fixa + percentual pequeno para cobrir custo da rede/parceiro (repasse, não lucro) | MVP |
| **Análise expressa** | Vendedor paga para ter SLA de 24 h na curadoria (fila prioritária) | V2 |
| **Destaque no catálogo** | Posição fixa na vitrine por 7 dias, marcado como "Destaque" | V2 |
| **Conta Pro (comprador)** | Alertas por categoria, acesso antecipado a lançamentos, API de catálogo, exportações | V2 |
| **API de dados** | Acesso programático a itens do tipo dataset para compradores institucionais | V3 |
| **Serviço de verificação** | Curadoria como serviço para terceiros (verificar um documento) | V3 |

## 2. Taxas por modelo (sugestão inicial)

| Modelo | Taxa | Observação |
|---|---|---|
| Cópias | 15 % | |
| Exclusivo | 15 % | mínimo R$ 50 |
| Lacre coletivo | 10 % | só se a meta for batida |
| Pedido com recompensa | 10 % | sobre a recompensa paga |
| Leilão | 12 % | |
| Camadas | 15 % | |
| Assinatura | 12 % | |
| Janela exclusiva | 15 % | em ambas as fases |
| Licença | 20 % | |
| Consulta paga | 20 % | |

**Custos de pagamento** (repassados): Lightning ~0,1 %, on-chain variável, PIX via parceiro ~1 %, saque via parceiro R$ 3 a 5 + KYC.

## 3. Unidade econômica (exemplo)

Lacre coletivo de R$ 80.000 batido:
- Receita de taxa: R$ 8.000.
- Custo de pagamento (mix 60 % PIX / 40 % cripto): ~R$ 600.
- Curadoria: 2 curadores × 6 h + jurídico 2 h ≈ R$ 1.400.
- Publicação e infra alocadas: ~R$ 200.
- Margem de contribuição: ~R$ 5.800 (72 %).

Cópia de R$ 490 (100 unidades vendidas):
- GMV R$ 49.000; taxa R$ 7.350; pagamentos ~R$ 400; curadoria única ~R$ 500; margem ~R$ 6.400.

Itens que não vendem custam curadoria. Por isso: triagem automática barata, análise expressa paga e limite de envios simultâneos por vendedor novo (3 itens até a primeira aprovação).

## 4. Fundo de garantia

2 % de toda taxa vai para um fundo que cobre reembolsos quando o valor em custódia do vendedor não basta (item retirado após liquidação). Meta: fundo equivalente a 1 mês de GMV antes de reduzir a alíquota.

## 5. Precificação orientada

A interface do vendedor mostra faixas de preço de itens aprovados semelhantes (categoria, tipo, volume) e a taxa de conversão por faixa. A curadoria pode sugerir preço. Nunca impõe.

## 6. KPIs por área

**Marketplace**
- GMV mensal e por modelo; ticket médio; itens ativos; taxa de conversão visita → compra; lacres rompidos; pedidos atendidos.

**Oferta**
- Envios por semana; taxa de aprovação; tempo até aprovação; vendedores com ≥ 1 aprovação; vendedores recorrentes (≥ 3 itens).

**Demanda**
- Contas criadas; contas com depósito; depósito médio; compradores recorrentes; apoiadores por lacre.

**Confiança**
- Taxa de disputa; disputas procedentes; taxa de reversão pós-publicação; tempo de resposta a denúncias; incidentes de segurança.

**Distribuição**
- Impressões/cliques dos posts; conversão prova → item; seguidores dos canais.

**Financeiro**
- Receita de taxas; custo de pagamento; custo de curadoria por item aprovado; margem de contribuição; saldo do fundo de garantia; saldo em custódia (passivo).

## 7. Metas dos primeiros 6 meses (hipótese a validar)

| Mês | Itens ativos | GMV | Lacres rompidos |
|---|---|---|---|
| 1 | 30 | R$ 60 mil | 1 |
| 3 | 150 | R$ 400 mil | 6 |
| 6 | 500 | R$ 1,5 mi | 20 |
