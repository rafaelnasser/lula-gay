# 04 · Curadoria e política de conteúdo

A curadoria é o produto. Sem ela, o Lacre é um bucket de arquivos com um botão de pagar. Esta seção define a esteira, o checklist, as decisões possíveis e a política pública do que pode e não pode ser vendido.

## 1. Esteira de análise

```
Enviado ──► Triagem automática ──► Fila ──► Em análise ──► Decisão ──► Agendado ──► Publicado
               │                              │                 │
               ▼                              ▼                 ├── Aprovado
         Bloqueio imediato             Escalado ao jurídico     ├── Aprovado com ajustes (curadoria edita prévia/título)
         (menores, credenciais,        (risco alto, terceiros,  ├── Ajustes solicitados (volta ao vendedor)
          malware)                      direitos autorais)      └── Rejeitado (com código de motivo)
```

**SLAs sugeridos:** triagem automática em minutos; primeira análise humana em até 48 h (24 h para edições de assinatura); jurídico em até 5 dias úteis; resposta a ajustes do vendedor em até 24 h.

**Prioridade na fila** (ordenação padrão): risco alto primeiro, depois idade do envio, depois valor estimado. O curador pode filtrar por categoria, modelo e tipo de arquivo.

## 2. Triagem automática (sem humano)

| Verificação | Resultado |
|---|---|
| Malware / executáveis | Bloqueio e registro |
| Nudez, conteúdo sexual, indícios de menores | Bloqueio, registro, conta suspensa para revisão |
| Credenciais, chaves, tokens, dados de cartão | Bloqueio |
| Hash já existe no catálogo ou em item rejeitado | Alerta de duplicidade |
| Metadados removidos | Relatório anexado |
| PII detectada (CPF, telefone, e-mail, nomes) | Alerta com contagem e amostras tarjadas |
| OCR / transcrição | Texto indexado para busca interna |
| Tamanho e formato | Rejeição se fora dos limites (20 GB por item no MVP) |

## 3. Análise humana: checklist em 7 blocos

Cada bloco tem itens de marcar e um campo de nota. O item só pode ser aprovado com todos os blocos concluídos. Blocos 1 e 2 têm peso de veto.

**Bloco 1 · Legalidade (veto)**
- [ ] Não contém dados pessoais de terceiros sem base legal (LGPD). Dados de pessoas públicas no exercício da função pública são aceitáveis quando de fonte pública.
- [ ] Não contém conteúdo íntimo, imagens de menores em qualquer contexto sensível, ou material sexual.
- [ ] Não contém credenciais, senhas, chaves, dados bancários ou de cartão.
- [ ] Não viola direitos autorais de terceiros: o vendedor é autor, tem licença ou o material é de domínio público / fonte pública reutilizável.
- [ ] Não é informação privilegiada sobre valores mobiliários (fato relevante não divulgado de companhia aberta).
- [ ] Não viola sigilo legal (segredo de justiça, sigilo fiscal, bancário, médico, de defesa).
- [ ] Não configura crime contra a honra: afirmações sobre pessoas identificáveis são sustentadas por documentos ou são claramente opinião.
- [ ] Não incita, não instrui crime, não é material de ódio.

**Bloco 2 · Autenticidade (veto parcial)**
Resultado em uma escala pública de quatro níveis:
- **Verificado**: a curadoria confirmou origem e integridade (ex.: documento conferido na fonte oficial, imagem com cadeia de custódia, dados reproduzíveis).
- **Verificado parcialmente**: parte do material conferida; o restante é consistente.
- **Plausível**: não foi possível verificar, mas não há sinais de fabricação. Vendedor com histórico ajuda.
- **Não verificado**: não há como confirmar. Item pode ser publicado em categorias de baixo risco com aviso em destaque. Em categorias de risco alto, não publica.

Técnicas: comparação com fontes oficiais, análise de metadados antes da remoção (a triagem guarda o relatório), consistência interna, busca reversa de imagens, verificação de coerência temporal, contato com o vendedor por mensagem para perguntas de controle.

**Bloco 3 · Qualidade e completude**
- [ ] O conteúdo entrega o que o título e a descrição prometem.
- [ ] Está legível, organizado e completo (sem páginas faltando, sem arquivos corrompidos).
- [ ] Datas, abrangência e volume declarados batem com o conteúdo.

**Bloco 4 · Prévia e descrição**
- [ ] A prévia permite julgar o item sem entregá-lo.
- [ ] Título e descrição não são sensacionalistas nem enganosos. A curadoria pode reescrever (com aceite do vendedor).
- [ ] A prévia não expõe dados de terceiros nem revela a identidade do vendedor.
- [ ] Nível de autenticidade e avisos aparecem na prévia.

**Bloco 5 · Preço e modelo**
- [ ] Preço coerente com o volume e a raridade. Curador pode sugerir outro valor ou modelo.
- [ ] Regras do modelo bem configuradas (meta, prazo, liberação, limite de unidades).

**Bloco 6 · Terceiros e redação**
- [ ] Pessoas identificáveis estão listadas e cada menção foi avaliada.
- [ ] Trechos que exigem redação (tarja) foram marcados e aplicados em uma nova versão do asset.
- [ ] Empresas e marcas mencionadas não tornam o item uma violação de segredo comercial.

**Bloco 7 · Duplicidade e interesse**
- [ ] Não é cópia de item já publicado ou de material livremente disponível (se for compilação de material público, o valor está no trabalho de compilar e isso está claro na descrição).
- [ ] Categoria e tags corretas.

## 4. Decisões e códigos de motivo

| Decisão | Efeito | Comunicação ao vendedor |
|---|---|---|
| Aprovar | Item vai para agendamento de publicação | Notificação com data prevista |
| Aprovar com ajustes | Curadoria altera título, descrição ou prévia; vendedor confirma em 72 h | Diff do que mudou |
| Solicitar ajustes | Volta ao vendedor com lista de pendências | Lista com códigos |
| Rejeitar | Encerra. Reenvio só como novo item | Código de motivo + texto |
| Escalar | Vai à fila jurídica; prazo pausa | "Em análise adicional" |
| Banir conta | Em caso de violação grave (menores, credenciais, fraude) | Aviso final; saldo retido para análise |

**Códigos de rejeição:** `R01` dados pessoais de terceiros · `R02` direitos autorais · `R03` conteúdo íntimo/sexual · `R04` credenciais/acesso · `R05` sigilo legal · `R06` informação privilegiada de mercado · `R07` difamação sem suporte · `R08` fabricação/falsificação · `R09` duplicidade · `R10` qualidade insuficiente · `R11` prévia enganosa · `R12` fora do escopo da plataforma · `R13` outro (texto obrigatório).

## 5. Regra de dois olhos e escalonamento

- Categorias de **risco alto** (Jornalismo e investigação, Governo, Finanças, Tecnologia e segurança, Saúde) exigem dois curadores independentes. A segunda análise não vê as notas da primeira até concluir a própria.
- Qualquer item que mencione pessoa identificável, empresa nomeada em contexto negativo, ou documento de origem institucional vai ao **jurídico** antes de aprovar.
- O jurídico registra parecer (aprovar, aprovar com redação, rejeitar) e o fundamento.

## 6. Política de conteúdo (texto público)

### Pode ser vendido
- Informação de autoria própria: pesquisas, análises, métodos, relatos, fotografias, vídeos, áudios.
- Compilações e tratamentos de dados públicos (o valor é o trabalho de reunir, limpar e estruturar).
- Acervos e documentos históricos digitalizados cujo uso seja permitido.
- Apurações jornalísticas baseadas em fontes públicas, documentos lícitos e entrevistas consentidas.
- Documentos públicos de difícil acesso, reunidos e organizados.
- Material licenciado para revenda (com a licença anexada ao envio).

### Não pode ser vendido
- Dados pessoais de terceiros sem base legal: listas de CPFs, telefones, endereços, cadastros, bases vazadas.
- Conteúdo íntimo ou sexual de qualquer pessoa; qualquer conteúdo envolvendo menores em contexto sensível.
- Credenciais, senhas, chaves, acessos, exploits ativos, instruções para invasão.
- Material protegido por direitos autorais sem autorização (livros, filmes, software, cursos de terceiros).
- Informação privilegiada sobre companhias abertas ou que permita manipulação de mercado.
- Documentos sob sigilo legal (judicial, fiscal, bancário, médico, de defesa) obtidos sem autorização.
- Acusações contra pessoas identificáveis sem documentação que as sustente.
- Segredos comerciais obtidos por violação de dever de confidencialidade.
- Qualquer coisa que a nossa equipe não consiga avaliar com segurança. Na dúvida, não publicamos.

### O que fazemos com o que você envia
- Removemos metadados automaticamente.
- Analisamos todo o conteúdo antes de publicar qualquer parte dele.
- Guardamos o conteúdo cifrado. Itens exclusivos vendidos são destruídos dos nossos servidores após a venda.
- Registramos um hash público do pacote para provar integridade.

## 7. Pós-publicação

**Denúncias.** Qualquer pessoa (logada ou não) pode denunciar um item pela página pública. Motivos: dados pessoais, direitos autorais, falsificação, conteúdo ilegal, outro. A denúncia entra na fila com prioridade alta e o item pode ser **suspenso preventivamente** (sai do catálogo, compras pausam) enquanto é reanalisado.

**Pedidos de titulares (LGPD).** Fluxo para alguém que afirma estar identificado em um item: formulário público, análise jurídica em até 15 dias, resposta documentada. Possíveis saídas: redação de nova versão, retirada do item, manutenção com fundamento (interesse público / fonte pública).

**Ordens judiciais e notificações.** Canal dedicado (`juridico@`), registro de recebimento, cumprimento com o mínimo necessário, comunicação ao vendedor quando permitido.

**Reversão de vendas.** Se um item for retirado por violação após vendas, os compradores são reembolsados em créditos; o valor em custódia do vendedor cobre o reembolso; a diferença, se houver, é absorvida pelo fundo de garantia da plataforma (ver `09`).

**Disputas de compradores.** Janela de 72 h após o acesso. Motivos: conteúdo diferente da prévia, arquivo corrompido, duplicidade, autenticidade. A curadoria compara prévia e conteúdo (já tem ambos) e decide em até 5 dias: reembolso total, parcial ou manutenção. Reincidência do vendedor rebaixa reputação; reincidência do comprador em disputas improcedentes limita o direito de disputa.

## 8. Métricas da curadoria

- Itens analisados por curador por dia (meta inicial: 8 a 12).
- Tempo mediano enviado → decisão.
- Taxa de aprovação por categoria.
- Taxa de reversão (itens aprovados e depois retirados). Meta: abaixo de 1 %.
- Taxa de disputa procedente por curador que aprovou. Meta: abaixo de 2 %.
- Concordância entre os dois curadores em itens de risco alto.

## 9. Anexos a produzir (fora deste repositório)

- Termos de uso e política de privacidade.
- Declarações do vendedor (texto jurídico das 6 declarações do passo 5 do envio).
- Contratos padrão de licença (editorial, comercial, exclusiva) e de cessão para itens exclusivos.
- Manual do curador com exemplos por categoria.
