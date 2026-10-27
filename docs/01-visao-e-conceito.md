# 01 · Visão e conceito

> Nome provisório da plataforma: **Lacre**. É um placeholder para a documentação e os protótipos. "Lacre" é o selo que fecha um documento; comprar é "romper o lacre". O nome final pode ser trocado em um único lugar (`design/assets/app.js`, constante `BRAND`).

## 1. Tese

Informação valiosa existe em abundância fora dos canais formais: pesquisas que nunca viraram produto, acervos pessoais, dados compilados com meses de trabalho, apurações independentes, fotos e vídeos inéditos, análises setoriais que só circulam em grupos fechados. Quem tem essa informação não tem um lugar seguro para vendê-la. Quem precisa dela não tem onde encontrá-la com garantia de que é real.

O Lacre é o marketplace onde informação é negociada com três garantias que ninguém oferece juntas:

1. **Anonimato real entre as partes.** Vendedor e comprador nunca se conhecem. Nenhum dos dois precisa de e-mail, telefone ou nome para usar a plataforma.
2. **Curadoria humana obrigatória.** Nada entra no catálogo sem passar pela nossa equipe. Avaliamos legalidade, autenticidade, qualidade e coerência entre a prévia e o conteúdo.
3. **Prova pública.** Todo item aprovado recebe uma página de prova com hash criptográfico e carimbo de tempo. A prévia é publicada no X e nas redes. O público sabe que o item existe, que é real e que não foi alterado.

**Escopo global.** O Lacre não é uma plataforma brasileira: aceita informação sobre qualquer país, de vendedores e compradores de qualquer lugar. Cada item declara os países a que se refere (ou "Global") e o idioma do material; o catálogo filtra por país. Preços em dólar (US$), liquidados em USDT. A interface segue o idioma do navegador (português, inglês ou espanhol) e o catálogo abre nos itens do país do usuário, inferido sem pedir localização (ver `03 §6b`); um seletor no cabeçalho troca idioma e país. O protótipo está em português, com o cabeçalho, os menus e a página inicial já traduzidos para demonstrar o mecanismo.

## 2. O que é e o que não é

| É | Não é |
|---|---|
| Um marketplace curado de informação lícita | Um site de vazamentos ou um canal de denúncia anônima |
| Uma camada de confiança (curadoria + prova + custódia do dinheiro) entre pessoas anônimas | Um fórum ou rede social |
| Um lugar onde a informação pode ser liberada a todos quando a demanda paga por ela (lacre coletivo: primeiro a quem apoiou, em ondas do maior apoio para o menor; depois ao público) | Um lugar onde se vende acesso, credencial, dado pessoal de terceiro ou conteúdo íntimo |
| Um produto com equipe de curadoria como parte central do negócio | Uma plataforma automática ou "sem moderação" |

## 3. Princípios de produto

1. **Anonimato por padrão, não por opção.** Não existe campo de nome. O identificador é um pseudônimo gerado pela plataforma. Ver `03-anonimato-e-seguranca.md`.
2. **Nada entra sem curadoria.** Um item só fica visível ao público depois de aprovado. Nem a prévia aparece antes.
3. **Uma carteira cripto por item, nenhum saldo guardado.** Cada item aprovado ganha uma carteira própria; compradores e apoiadores pagam direto nela, da própria carteira, em cripto (USDT, USDC, BTC). O dinheiro fica lá até a finalização (entrega confirmada e janela de disputa vencida; lacre rompido; ou reembolso automático se a meta não for batida). Na finalização a plataforma separa a comissão única de 10 % e entrega a carteira ao vendedor: a frase de recuperação, uma única vez.
4. **A prévia nunca entrega o valor.** A curadoria garante que a prévia é suficiente para julgar o item e insuficiente para dispensar a compra.
5. **Prova antes da promoção.** Nenhum post nas redes sai sem a página de prova publicada.
6. **O vendedor assina declarações.** Em cada envio o vendedor declara origem lícita, titularidade ou direito de venda e ausência de dados pessoais de terceiros sem base legal. A declaração fica registrada e vinculada ao pseudônimo.
7. **Reputação sem identidade.** Confiança vem do histórico do pseudônimo: itens aprovados, nota de autenticidade, disputas, tempo de casa.

## 4. Para quem

### Vendedores (fontes)
- Pesquisadores e analistas independentes com estudos, bases e projeções.
- Fotógrafos, cinegrafistas e documentaristas com material inédito.
- Arquivistas e colecionadores com acervos digitalizados.
- Jornalistas independentes com apurações longas de interesse público.
- Profissionais com conhecimento metodológico (playbooks, planilhas, processos).
- Pessoas que compilaram dados públicos dispersos em algo utilizável.

### Compradores
- Redações e jornalistas (janela exclusiva, licenças de imagem).
- Fundos, analistas e empresas de inteligência de mercado (estudos, bases, assinaturas).
- Pesquisadores acadêmicos (datasets, acervos).
- Advogados e consultorias (documentação pública consolidada).
- Colecionadores e instituições (acervos, exclusivos).
- Público geral, que apoia lacres coletivos para liberar informação de interesse público.

## 5. Tipos de informação aceitos

| Tipo | Exemplos | Formatos |
|---|---|---|
| Documento | relatório, estudo, dossiê, contrato público, laudo | PDF, DOCX, TXT, MD |
| Dados estruturados | base consolidada, planilha, série histórica | CSV, XLSX, JSON, Parquet, SQL |
| Imagem | fotografia, digitalização, mapa, infográfico | JPG, PNG, TIFF, RAW |
| Vídeo | filmagem bruta, documentário, registro de evento | MP4, MOV, MKV |
| Áudio | entrevista, gravação ambiente, podcast inédito | MP3, WAV, FLAC |
| Texto / relato | análise escrita, depoimento autoral, método | MD, PDF |
| Código / técnico | scripts de coleta, modelos, notebooks | ZIP, IPYNB |
| Pacote misto | combinação dos anteriores em um só item | ZIP (até 20 GB por item no MVP) |

## 6. Categorias do catálogo (v1)

1. Negócios e mercado
2. Dados e bases
3. Jornalismo e investigação
4. Finanças e investimentos
5. Ciência e pesquisa
6. Tecnologia e segurança
7. Imóveis e urbanismo
8. Governo e políticas públicas
9. História e acervos
10. Fotografia e vídeo
11. Cultura e entretenimento
12. Esportes
13. Saúde e meio ambiente
14. Educação e métodos

Cada categoria tem um **nível de risco padrão** (baixo, médio, alto) que define o rigor da curadoria. Ver `04-curadoria-e-politica-de-conteudo.md`.

Além da categoria, todo item tem **país** (um ou mais códigos ISO 3166-1, ou `GLOBAL`) e **idioma**. São filtros de primeira classe no catálogo e no mural de pedidos.

## 7. Proposta de valor

**Para quem vende:** um canal para monetizar informação sem expor identidade, com preço definido por quem vende, vários modelos de venda, pagamento garantido por custódia e um selo de curadoria que valoriza o item.

**Para quem compra:** um catálogo onde tudo passou por análise humana, com prévia honesta, prova de integridade, direito a disputa e anonimato total na compra.

**Para o público:** o lacre coletivo transforma informação cara em bem público. Quando a meta é batida, todos têm acesso.

## 8. Ciclo de crescimento

```
vendedor envia → curadoria aprova → página de prova + post no X/redes
      ↑                                             ↓
 vendedores veem                           público descobre o item
 que o canal funciona                                ↓
      ↑                                     compra / apoia / faz pedido
      └──────────── dinheiro chega ao vendedor ←─────┘
```

Cada item aprovado é uma peça de marketing. Cada lacre rompido é uma notícia. Cada pedido público (recompensa) atrai vendedores com aquela informação.

## 9. Métricas norte

- **Volume negociado (GMV)** por mês e por modelo.
- **Lacres rompidos** (metas coletivas atingidas) por mês.
- **Taxa de aprovação** na curadoria e **tempo até a aprovação**.
- **Taxa de disputa** e **taxa de reembolso**.
- **Vendedores ativos** (pelo menos um item aprovado nos últimos 90 dias).
- **Alcance dos posts** de prova (impressões, cliques para a página de prova).

## 10. Glossário

| Termo | Significado |
|---|---|
| **Item** | Uma informação à venda no catálogo (também "anúncio" na área do vendedor). |
| **Lacre** | O estado selado de um item. Romper o lacre = obter acesso. |
| **Lacre coletivo** | Modelo de financiamento coletivo. Meta batida libera o conteúdo. |
| **Prévia** | Parte pública do item: título, descrição, amostra, metadados aprovados. |
| **Curadoria** | Equipe interna que analisa e aprova itens. |
| **Prova** | Página pública com hash, carimbo de tempo e status do item. |
| **Cofre** | Área do comprador com os itens desbloqueados. |
| **Carteira do item** | Carteira cripto criada na aprovação de cada item. Recebe os pagamentos, guarda-os até a finalização e é entregue ao vendedor (frase de recuperação) depois de separada a comissão. |
| **Exclusividade (buyout)** | Valor opcional definido pelo vendedor em itens de muitos compradores: quem pagar leva o item só para si e o anúncio encerra. |
| **País** | Código(s) ISO do(s) país(es) a que a informação se refere, ou Global. |
| **Apoio** | Pagamento a um lacre coletivo. |
| **Pedido** | Demanda publicada por um comprador com um valor por interessado; quem quer a mesma informação se junta pagando o mesmo valor (ou cobre, e os outros igualam ou saem); quem entregar recebe o total. |
| **Entitlement** | Direito de acesso de uma conta a um item (termo técnico). |
| **Pseudônimo** | Identificador gerado da conta, ex. `coruja-7f3a`. |
| **Arquivo de acesso** | Arquivo `pseudonimo.lacre` que funciona como chave de entrada: o usuário escolhe o arquivo (e digita o PIN) para entrar. |
