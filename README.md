# EZ Nester

Aplicação local para organizar peças DXF em chapas retangulares, respeitando folgas mínimas e exportando o plano de corte em um novo DXF.

## Como executar

1. Abra `index.html` no Microsoft Edge, Google Chrome ou Firefox.
2. Adicione um ou mais arquivos DXF em formato ASCII.
3. Informe a quantidade de cada peça, os tamanhos e quantidades disponíveis no estoque de chapas e as folgas. Use **+ Adicionar tamanho de chapa** para cadastrar chapas inteiras ou retalhos.
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

As curvas são amostradas apenas para calcular e visualizar o nesting. O DXF de saída utiliza as entidades originais de cada peça: linhas, arcos, círculos, elipses, splines e polilinhas com seus bulges. São aplicadas somente a rotação e a translação do posicionamento, sem simplificação ou conversão da curva em segmentos retos. Os contornos externos desconectados definem as peças; furos e detalhes associados continuam vinculados a elas.

O arquivo exportado usa **DXF R2000 ASCII (AC1015)**, com entidades nativas e estrutura de layers, tipos de linha, blocos e layouts. O R12 não representa `SPLINE` e `ELLIPSE` nativas. Raios, bulges, grau, nós e pesos de splines são mantidos; pontos de controle e de ajuste recebem o posicionamento, enquanto vetores de eixo e tangentes recebem apenas a rotação. Handles são recriados e as entidades são organizadas em layers por peça; o arquivo não é uma cópia byte a byte do documento original.

## Estratégia de otimização

O programa executa múltiplas tentativas, ordenando as peças por área/dimensão e testando as rotações selecionadas. Os candidatos de encaixe são obtidos por *No-Fit Polygons* (soma de Minkowski), permitindo contatos reais entre contornos inclinados e côncavos. Quando há vários tamanhos disponíveis, as tentativas alternam a prioridade entre retalhos e chapas maiores. A melhor solução minimiza primeiro a área total de material consumida, depois a quantidade de chapas e a envoltória ocupada, sempre respeitando o estoque informado.

Durante o cálculo, uma barra mostra o avanço por tentativa e por peça. O processamento libera periodicamente a interface do navegador, mantendo a página responsiva mesmo em arquivos maiores.

### Otimizações de desempenho

- O nesting utiliza uma cópia simplificada e conservadora do contorno para procurar posições rapidamente; o erro conhecido dessa simplificação é acrescentado à margem de colisão.
- A geometria DXF original nunca é simplificada no arquivo exportado.
- NFPs calculados são reutilizados entre tentativas. A busca considera todas as peças posicionadas e as interseções dos espaços livres com os contornos e as bordas da chapa.
- Um índice espacial limita as verificações às peças próximas da posição candidata.
- Caixas de segmentos eliminam comparações geométricas desnecessárias.
- Vários contatos válidos por rotação são comparados por área ocupada, em vez de aceitar o primeiro encaixe.
- Ordenações repetidas foram substituídas por tentativas realmente distintas.
- A busca continua melhorando a compactação mesmo quando já cabe em uma chapa. O encerramento por estagnação ocorre somente após um mínimo de tentativas, limitado pela quantidade solicitada.
- Antes de liberar o resultado, as posições são validadas contra os contornos amostrados completos, sem a simplificação de busca, e a folga configurada. A amostragem de curvas tem alvo de desvio de 0,01 mm, incluído na margem usada pela busca; não substitui a geometria nativa da saída.

Peças repetidas também são avaliadas em pares complementares. Algumas tentativas posicionam esses pares como grupos temporários; ao final, cada peça recupera seu posicionamento individual e suas entidades DXF originais. Uma etapa de compactação tenta reposicionar peças e pares, aceitando somente melhorias.

No modo **Livre**, os ângulos candidatos incluem os eixos principais e alinhamentos das arestas significativas do contorno, inclusive orientações complementares. Não se trata de uma busca exaustiva de todos os ângulos contínuos. Rotações geometricamente equivalentes são eliminadas para manter a otimização rápida.

## Limitações desta versão

- Curvas devem ser paralelas ao plano XY. Splines precisam de pontos de controle, vetor de nós e pesos positivos válidos; splines somente com pontos de ajuste e polilinhas antigas ajustadas/suavizadas devem ser reexportadas como curvas nativas suportadas no CAD. Esses casos não são convertidos silenciosamente em linhas.
- DXF binário não é aceito; salve como **DXF ASCII** no CAD.
- Blocos (`INSERT`) e textos não definem a geometria da peça.
- O algoritmo é heurístico: encontra soluções boas, mas não garante o ótimo matemático global.
- Contornos internos são exportados, mas não são tratados como regiões disponíveis para encaixar outra peça.
- Quando contornos de peças diferentes estiverem um dentro do outro no desenho original, o contorno interno será interpretado como furo ou detalhe da peça externa.

## Arquivos

- `index.html`: interface principal;
- `styles.css`: aparência da aplicação;
- `app.js`: leitura do documento, separação de peças, nesting, preview e exportação;
- `dxf-geometry.js`: entidades originais, amostragem NURBS e transformações geométricas;
- `vendor/`: Clipper e utilitários geométricos licenciados, com avisos de licença;
- `samples/`: arquivos simples para teste.


## Aparência

O botão de sol/lua ao lado do idioma alterna os temas claro e escuro. A preferência fica salva em `factorytoolbox-theme`, compartilhada entre as ferramentas no mesmo domínio. Sem escolha salva, o tema acompanha a preferência do sistema. Alterar o tema mantém o projeto e os resultados atuais. A impressão e os arquivos exportados preservam as cores do desenho.

## Licenciamento do código próprio

O código original desta versão tem todos os direitos reservados, conforme `LICENSE`. Esta versão do código próprio não é distribuída sob a licença MIT. As licenças e os avisos de componentes de terceiros são preservados.

## Testes de fidelidade do DXF

Abra `tests/browser-tests.html` por um servidor HTTP local para a suíte do aplicativo. A regressão independente usa Python, Playwright, Google Chrome e ezdxf:

```powershell
python -m pip install -r tests/requirements.txt
python tests/test_curve_export.py
python tests/test_nesting_quality.py
```

A regressão reabre o DXF no ezdxf e compara as entidades com transformações calculadas independentemente, em 0°, 37°, 90° e 270°, com quatro chapas e coordenadas de origem deslocadas. Verifica bulges positivos/negativos, orientação OCS negativa, nós/pesos/tangentes/pontos de ajuste de splines, raio/ângulos de arcos, eixos de elipses, preservação após unir caminhos, integridade dos dados de origem e o fluxo completo do otimizador. Também corrompe intencionalmente a cópia poligonal de visualização para comprovar que ela não é usada na exportação.

Referência de códigos DXF: [Autodesk — SPLINE](https://help.autodesk.com/cloudhelp/2018/ENU/AutoCAD-DXF/files/GUID-E1F884F8-AA90-4864-A215-3182D47A9C74.htm).

A regressão de qualidade usa trapézios sintéticos, confere quantidades, área da envoltória, bordas e distância entre as curvas exportadas com ezdxf e Shapely. Arquivos particulares podem ser fornecidos com `--files A.dxf B.dxf C.dxf`; as quantidades desse cenário são 2, 1 e 9, chapa de 1850 × 2750 mm, folgas de 14/5 mm e rotação livre. Os arquivos de entrada não são alterados nem adicionados ao repositório.
