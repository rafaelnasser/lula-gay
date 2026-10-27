# 09 · Monetização e métricas

## 1. Fontes de receita

| Fonte | Como | Quando |
|---|---|---|
| **Comissão de 10 %** | Descontada do vendedor em cada venda, apoio liberado ou recompensa paga, em todos os modelos | MVP |
| **Taxa de rede no saque** | Repasse do custo da rede (não é receita) | MVP |
| **Análise expressa** | Vendedor paga para ter SLA de 24 h na curadoria (fila prioritária) | V2 |
| **Destaque no catálogo** | Posição fixa na vitrine por 7 dias, marcado como "Destaque" | V2 |
| **Conta Pro (comprador)** | Alertas por categoria, acesso antecipado a lançamentos, API de catálogo, exportações | V2 |
| **API de dados** | Acesso programático a itens do tipo dataset para compradores institucionais | V3 |
| **Serviço de verificação** | Curadoria como serviço para terceiros (verificar um documento) | V3 |

## 2. Comissão

**10 % em todos os modelos.** Uma única regra, fácil de comunicar ("você fica com 90 %"). Nada é cobrado se um lacre coletivo falhar ou se um pedido não for atendido. Taxas de rede do saque são repassadas ao usuário (USDT em Polygon ≈ R$ 0,20; Lightning ≈ R$ 0,05; BTC on-chain variável).

**Custos de pagamento da plataforma:** infraestrutura de nós e indexadores, taxas de rede das consolidações entre carteira quente e fria, spread de conversão BTC → USDT nos depósitos em bitcoin (cotação travada 10 min; hedge imediato na tesouraria). Estimativa: 0,3 % a 0,5 % do volume.

## 3. Unidade econômica (exemplo)

Lacre coletivo de R$ 80.000 batido:
- Receita de comissão: R$ 8.000.
- Custo de pagamento (nós, consolidações, spread BTC): ~R$ 320.
- Curadoria: 2 curadores × 6 h + jurídico 2 h ≈ R$ 1.400.
- Publicação e infra alocadas: ~R$ 200.
- Margem de contribuição: ~R$ 6.080 (76 %).

Cópia de R$ 490 (100 unidades vendidas):
- GMV R$ 49.000; comissão R$ 4.900; pagamentos ~R$ 200; curadoria única ~R$ 500; margem ~R$ 4.200.

Itens que não vendem custam curadoria. Por isso: triagem automática barata, análise expressa paga e limite de envios simultâneos por vendedor novo (3 itens até a primeira aprovação).

## 4. Fundo de garantia

2 % de toda comissão vai para um fundo que cobre reembolsos quando o valor em custódia do vendedor não basta (item retirado após liquidação). Meta: fundo equivalente a 1 mês de GMV antes de reduzir a alíquota.

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
- Receita de comissões; custo de pagamento; custo de curadoria por item aprovado; margem de contribuição; saldo do fundo de garantia; saldo em custódia (passivo); cobertura da tesouraria sobre o passivo das carteiras.

## 7. Metas dos primeiros 6 meses (hipótese a validar)

| Mês | Itens ativos | GMV | Lacres rompidos |
|---|---|---|---|
| 1 | 30 | R$ 60 mil | 1 |
| 3 | 150 | R$ 400 mil | 6 |
| 6 | 500 | R$ 1,5 mi | 20 |
