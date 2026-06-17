# Brocket 0.7.6.1

Correção emergencial da 0.7.6.

## Corrigido

- Pontos corridos agora fica realmente limitado a 24 times.
- Se trocar para Pontos corridos, o seletor remove 32, 36, 40 e 48.
- Se havia 48 selecionado, ajusta para 24.
- Se houver torneio antigo de liga com mais de 24 salvo no navegador, ele não é carregado como torneio ativo.
- Rótulo simplificado para "Pontos corridos".
- Tabelas usam "Pos" e cabeçalho vazio para movimento, sem # e sem Δ.

## Observação

Esta versão usa uma chave de armazenamento nova para evitar que torneios antigos criados em versões anteriores continuem aparecendo como se fossem da versão corrigida.

## Como subir

Suba somente estes arquivos na raiz do GitHub:

- index.html
- style.css
- script.js
- README.md
