# Brocket 0.7.8.4

Versão organizada com correções de lógica, navegação e visual, sem duplicar funcionalidades já existentes.

## Principais ajustes

- Mantida chave estável de armazenamento (`brocket-0-7`) para preservar dados entre versões.
- Migração aceita dados da 0.7.8.4 sem apagar campeonatos, times ou pacotes.
- Liga/Pontos corridos continua limitada a 24 times.
- Grupos e mata-mata continuam permitindo até 48 times.
- Formato Copa 48 mantido automaticamente:
  - 12 grupos de 4
  - classificam 1º, 2º e 8 melhores terceiros
  - mata-mata começa com 32 times
- Classificados aparecem explicitamente, incluindo melhores terceiros.
- Tabelas mantêm `Pos` e coluna de movimento sem título.
- Tabela mobile melhorada com scroll interno e colunas mais compactas.
- Rodadas de liga e grupos agora aparecem por seletor, sem listar tudo de uma vez.
- Estatística "Final com mais gols" considera apenas `stage === "Final"`.
- Títulos nos pênaltis contam apenas pênaltis na final.
- Efeito dourado aplicado ao campeão na final e na tabela.
- Chaveamento visual mais limpo, com final mais destacada.
- Simular tudo limpa a variação de posição para evitar movimentos acumulados absurdos.
- Modo Médio ficou menos propenso a zebras.
- Hotbar com mais respiro inferior para não cobrir conteúdo.

## Funcionalidades já existentes mantidas

- Resultados manuais.
- Grupos manuais.
- Pacotes personalizados.
- Exportar/importar backup.
- Limpar dados locais apenas em Configurações.

## Como subir

Suba somente estes arquivos na raiz do GitHub:

- index.html
- style.css
- script.js
- README.md


## Brocket 0.7.8.4

- Visual do chaveamento mais polido.
- Campeão com destaque dourado mais uniforme.
- Zebra média menos aleatória.
- Botão "Gerar torneio" também no topo.
- Tabela mobile sem scroll horizontal, mantendo Pos, Time, Pts, J, V e SG.
- Card gigante de classificados removido; Copa 48 agora mostra só regra curta.
- Limpeza automática de grupos manuais incompatíveis.
- Botão para apagar torneio atual.
- Base preparada para exibição coerente de ida/volta com A.P. e pênaltis.

- Correção mais completa de ida/volta: A.P. atualiza o placar da volta e pênaltis só aparecem se o agregado continuar empatado.
- Montagem manual de grupos com contador por grupo e bloqueio de grupo incompleto.


## Brocket 0.7.8.4

Correção pontual da tabela mobile:

- Cabeçalho continua limpo: Pos, Time, Pts, J, V e SG.
- A variação de posição aparece dentro da célula Time, alinhada como “coluna fake”.
- Remove o “—” quando não houve mudança.
- Simular tudo mantém a variação da última rodada simulada.


## Brocket 0.7.8.4

Patch de lógica e tabela:

- Recalibra a partida individual, com a mesma fórmula para todos os formatos.
- Favoritos fortes ficam mais consistentes, sem acabar com zebra.
- Corrige o ranking Melhores Defesas: agora ordena pelo menor GC primeiro.
- Remove o negrito forte da coluna J/Jogos no mobile.
- Mantém Pts como principal destaque da tabela.


## Brocket 0.7.8.4

Patch de ranking e zebra:

- Corrige “Melhor defesa em ligas”: agora menor número de gols sofridos fica primeiro.
- Troca “GP” por “gols” no ranking de ataque.
- Troca “GC” por “gols sofridos” no ranking de defesa.
- Ajusta a zebra pela chance antes do placar sair:
  - tudo continua possível;
  - azarão pode vencer favorito;
  - azarão golear favorito fica mais raro;
  - favorito golear azarão continua possível.
