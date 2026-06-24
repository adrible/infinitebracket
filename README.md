# Brocket 0.8.4

Versão organizada com correções de lógica, navegação e visual, sem duplicar funcionalidades já existentes.

## 0.8.4

- Reformulação visual do mata-mata, com cards mais limpos e legíveis.
- Final refeita em visual dark premium, sem o bloco branco anterior.
- Card recolhido mostra o status resumido entre parênteses: `(PR)`, `(PEN)` ou `(PR + PEN)`.
- Detalhes do confronto agora mostram Ida, Volta/Jogo e Decisão, sem repetir o placar dos pênaltis.
- Clique no card para expandir; o botão/aviso de detalhes foi removido.
- Detalhes agora usam apenas um marcador central `+`/`−`, sem botão de texto.
- Contraste dos placares reforçado para não serem ofuscados pelo fundo.
- Background do mata-mata e exportação em PNG mais polidos.
- Motor de placares mantido.


## Principais ajustes

- Mantida chave estável de armazenamento (`brocket-0-7`) para preservar dados entre versões.
- Migração aceita dados da 0.8.4 sem apagar campeonatos, times ou pacotes.
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


## Brocket 0.8.4

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


## Brocket 0.8.4

Correção pontual da tabela mobile:

- Cabeçalho continua limpo: Pos, Time, Pts, J, V e SG.
- A variação de posição aparece dentro da célula Time, alinhada como “coluna fake”.
- Remove o “—” quando não houve mudança.
- Simular tudo mantém a variação da última rodada simulada.


## Brocket 0.8.4

Patch de lógica e tabela:

- Recalibra a partida individual, com a mesma fórmula para todos os formatos.
- Favoritos fortes ficam mais consistentes, sem acabar com zebra.
- Corrige o ranking Melhores Defesas: agora ordena pelo menor GC primeiro.
- Remove o negrito forte da coluna J/Jogos no mobile.
- Mantém Pts como principal destaque da tabela.


## Brocket 0.8.4

Patch de ranking e zebra:

- Corrige “Melhor defesa em ligas”: agora menor número de gols sofridos fica primeiro.
- Troca “GP” por “gols” no ranking de ataque.
- Troca “GC” por “gols sofridos” no ranking de defesa.
- Ajusta a zebra pela chance antes do placar sair:
  - tudo continua possível;
  - azarão pode vencer favorito;
  - azarão golear favorito fica mais raro;
  - favorito golear azarão continua possível.

## Brocket 0.8.4

Refinamento pós 0.8.4.1:

- Novo motor universal de placares, usado por liga, grupos, mata-mata e ida/volta.
- Placares comuns ficam mais frequentes e placares caóticos ficam mais raros.
- Diferença de força afeta a chance antes do placar sair; o placar não é reduzido depois.
- Corrige jogo único de mata-mata para permitir empate antes de prorrogação/pênaltis.
- Remove o texto grande “Rebaix.” da tabela e usa marcador visual compacto.
- “Melhor defesa em ligas” vira “Menos gols sofridos em ligas”.
- Exportação PNG/JPEG passa a gerar uma tabela própria, sem rodadas, botões ou hotbar.
- Exportação usa largura maior e nomes completos com marcadores discretos.
- Remove botão redundante de criar campeonato no card vazio da página Campeonatos.
- Simplifica rótulos: Campeonato + Temporada/Edição + Divisão + Formato.
- Mantém STORAGE estável em `brocket-0-7`.


## 0.8.4
- Remoção de campeonato pela lista e pela configuração.
- Campeonato salvo passa a ser a fonte do nome quando a edição é salva no histórico.
- Nome principal segue Campeonato — Divisão — Temporada.
- Tabela mobile mais compacta para caber melhor os nomes.
- Status de campeão/promovido/rebaixado vira marcador lateral no mobile.


## 0.8.4

- Corrige a redundância entre Torneio único e Salvar como edição.
- Em edição, usa apenas o campeonato selecionado; o campo de nome do torneio fica oculto.
- Remove exportação JPEG, mantendo apenas PNG.
- Compacta a tabela mobile para caber melhor o nome dos times.
- Melhora layout do mata-mata/final e aplica polimento visual geral.
- Mantém o motor universal de placares da 0.8.4.2.


## 0.8.4
- Troca marcadores laterais duros por brilho suave nas linhas.
- Classificados/promovidos ficam em negrito e brilho verde, sem selo “Class.”.
- Campeão ganha brilho dourado suave.
- Rebaixados ficam com brilho vermelho suave, sem texto ocupando coluna.


## Brocket 0.8.4
- Mata-mata com apenas o classificado em negrito.
- Final mais compacta e alinhada ao estilo dos demais cards.
- Ida/volta em formato curto com short names.
- Times personalizados podem receber short name opcional.
- Pacotes personalizados aceitam: Nome, força, short.


## 0.8.4
- Exportação PNG alinhada ao visual novo da tabela.
- Destaques dourado, verde e vermelho aplicados no PNG.
- Exportação sem “Class.” ou “Rebaix.” textual.
- Short names do mata-mata preservados.
- Motor de placares mantido.


## 0.8.4 final
- Quantidade escolhida pelo usuário é respeitada para grupos e mata-mata.
- Grupos ajustam automaticamente a quantidade de grupos para caber os times escolhidos.
- Opções de tamanho em grupos/mata-mata vão de 2 a 64 sem pular tamanhos.
- Correção reforçada do espaçamento Pos/Time.


## 0.8.4
- Negrito fica reservado aos classificados/promovidos/campeão.
- Rebaixados e times normais ficam sem negrito pesado.
- Sorteio padrão de grupos agora é por potes, divididos pelo power dos times.
- O sorteio por potes distribui os mais fortes em potes e embaralha dentro dos grupos.
- Mantido STORAGE brocket-0-7 e motor de placares.

## Ajuste bracket 0.8.4

- Refeito o desenho do mata-mata para seguir estrutura clássica de bracket.
- Linhas horizontais e verticais reforçadas para conectar as fases.
- Removida duplicação de A.P. no card e nos detalhes.
- Final mantida dark, com campeão mais legível.
- Tabela ajustada para reduzir corte de nomes longos.

## 0.8.4

Atualização oficial 0.8.4:

- Reconhecimento automático de campeonato por nome.
- Templates para Champions, Libertadores, Copa do Mundo, Mundial de Clubes, Brasileirão, Premier League, La Liga, Serie A, Bundesliga e Ligue 1.
- Botão de aplicar template e aplicação automática quando o nome é reconhecido.
- Integração opcional com football-data.org, usando token salvo apenas no localStorage.
- Busca opcional de times/escudos por código de competição.
- Fallback para escudo automático Brocket quando não houver API, token ou URL.
- Tabela de grupos sem rolagem horizontal no mobile.
- Uso de short name no mobile, sem quebrar o nome em duas linhas.
- Partidas de grupo com short name no mobile.
