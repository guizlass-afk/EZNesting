# EZ Nester

Aplicação local para organizar peças DXF em chapas retangulares, respeitando folgas mínimas e exportando o plano de corte em um novo DXF.

## Como executar

1. Abra `index.html` no Microsoft Edge, Google Chrome ou Firefox.
2. Adicione um ou mais arquivos DXF em formato ASCII.
3. Informe a quantidade de cada peça, o tamanho da chapa e as folgas.
4. Escolha o modo de rotação: sem rotação, em incrementos de 90º, em incrementos de 45º ou livre.
5. Clique em **Otimizar nesting**.
6. Confira o plano e clique em **Exportar DXF**.

Não é necessário instalar nada e nenhum arquivo é enviado para a internet.

## Idiomas

O seletor no cabeçalho traduz a interface, as mensagens de progresso, os erros e o relatório. A preferência fica salva no navegador. Estão disponíveis 12 opções com bandeiras SVG locais, que funcionam mesmo quando o Windows não suporta emojis de bandeira: português do Brasil, inglês, espanhol, mandarim, hindi, árabe, francês, bengali, russo, alemão, italiano e japonês. O árabe ativa automaticamente a leitura da direita para a esquerda.

Um mesmo DXF pode conter várias peças. O programa identifica os contornos externos desconectados e cria uma peça para cada um, mantendo furos e detalhes internos associados ao contorno correto. Segmentos `LINE` e `ARC` com extremidades conectadas também são unidos automaticamente para formar contornos.

## Formatos geométricos aceitos

- `LWPOLYLINE` e `POLYLINE`/`VERTEX`, inclusive segmentos com *bulge*;
- `LINE`, `ARC`, `CIRCLE`, `ELLIPSE` e `SPLINE`;
- unidades em milímetros (os valores numéricos do DXF são mantidos).

As curvas são discretizadas com precisão adaptativa no arquivo de saída. Para nesting, o maior contorno fechado de cada arquivo é considerado o limite externo da peça; os demais contornos são mantidos na exportação como furos ou detalhes internos.

O arquivo exportado usa **DXF R12 ASCII**, entidades `POLYLINE`/`VERTEX` e tabelas completas de layer e tipo de linha. Essa estrutura prioriza compatibilidade com SolidWorks, eDrawings e leitores CAD mais rígidos.

## Estratégia de otimização

O programa executa múltiplas tentativas, ordenando as peças por área/dimensão e testando as rotações selecionadas. Os candidatos de encaixe são obtidos por *No-Fit Polygons* (soma de Minkowski), permitindo contatos reais entre contornos inclinados e côncavos. A melhor solução minimiza primeiro o número de chapas e depois a envoltória ocupada.

Durante o cálculo, uma barra mostra o avanço por tentativa e por peça. O processamento libera periodicamente a interface do navegador, mantendo a página responsiva mesmo em arquivos maiores.

### Otimizações de desempenho

- O nesting utiliza uma cópia simplificada e conservadora do contorno para procurar posições rapidamente; o erro conhecido dessa simplificação é acrescentado à margem de colisão.
- A geometria DXF original nunca é simplificada no arquivo exportado.
- NFPs calculados são reutilizados entre tentativas, e somente a fronteira ativa da chapa gera novos contatos.
- Um índice espacial limita as verificações às peças próximas da posição candidata.
- Caixas de segmentos eliminam comparações geométricas desnecessárias.
- Vários contatos válidos por rotação são comparados por área ocupada, em vez de aceitar o primeiro encaixe.
- Ordenações repetidas foram substituídas por tentativas realmente distintas.
- A busca encerra quando novas tentativas deixam de melhorar a solução ou quando atinge o menor número de chapas matematicamente possível pela área.
- Antes de liberar o resultado, todas as posições são validadas novamente contra os contornos originais completos e a folga configurada.

No modo **Livre**, os ângulos candidatos são calculados a partir das arestas do contorno de cada peça. Rotações geometricamente equivalentes são eliminadas para manter a otimização rápida.

## Limitações desta versão

- DXF binário não é aceito; salve como **DXF ASCII** no CAD.
- Blocos (`INSERT`) e textos não definem a geometria da peça.
- O algoritmo é heurístico: encontra soluções boas, mas não garante o ótimo matemático global.
- Contornos internos são exportados, mas não são tratados como regiões disponíveis para encaixar outra peça.
- Quando contornos de peças diferentes estiverem um dentro do outro no desenho original, o contorno interno será interpretado como furo ou detalhe da peça externa.

## Arquivos

- `index.html`: interface principal;
- `styles.css`: aparência da aplicação;
- `app.js`: parser DXF, geometria, nesting, preview e exportação;
- `vendor/`: Clipper e utilitários geométricos licenciados, com avisos de licença;
- `samples/`: arquivos simples para teste.
