const STORAGE_KEY = "brocket-v3";

const defaultData = {
  competitions: [
    {
      id: "comp-demo",
      name: "Copa da Galera",
      createdAt: new Date().toISOString(),
      editions: [
        {
          id: "ed-2024",
          name: "Copa da Galera 2024",
          champion: "Real Madrid",
          runnerUp: "Benfica",
          decidedBy: "tempo normal",
          teams: ["Real Madrid", "Benfica", "Palmeiras", "Boca Juniors"],
          matches: []
        },
        {
          id: "ed-2025",
          name: "Copa da Galera 2025",
          champion: "Flamengo",
          runnerUp: "Palmeiras",
          decidedBy: "pênaltis",
          teams: ["Flamengo", "Palmeiras", "River Plate", "PSG"],
          matches: []
        }
      ]
    }
  ]
};

const state = {
  screen: "home",
  selectedFormat: "playoffs",
  activeCompetitionId: "comp-demo",
  teams: [],
  bracket: [],
  data: loadData(),
  config: {
    tournamentName: "Copa dos Amigos 2026",
    competitionId: "comp-demo",
    teamCount: 8,
    upsetLevel: "medium",
    scoreRealism: "realistic",
    extraTime: true,
    penalties: true,
    awayGoals: false
  }
};

const suggestedTeams = [
  { name: "Real Madrid", power: 94 },
  { name: "Manchester City", power: 93 },
  { name: "Bayern München", power: 91 },
  { name: "Liverpool", power: 90 },
  { name: "Inter de Milão", power: 88 },
  { name: "Barcelona", power: 89 },
  { name: "PSG", power: 90 },
  { name: "Arsenal", power: 88 },
  { name: "Flamengo", power: 86 },
  { name: "Palmeiras", power: 86 },
  { name: "Boca Juniors", power: 82 },
  { name: "River Plate", power: 84 },
  { name: "Borussia Dortmund", power: 86 },
  { name: "Atlético de Madrid", power: 87 },
  { name: "Milan", power: 85 },
  { name: "Benfica", power: 83 }
];

const titles = {
  home: "Início",
  competitions: "Campeonatos",
  competitionDetail: "Detalhes",
  create: "Criar",
  participants: "Participantes",
  presets: "Presets",
  tournament: "Bracket"
};

const subtitles = {
  home: "Seu campeonato em segundos",
  competitions: "Pastas, edições e história",
  competitionDetail: "Histórico e estatísticas",
  create: "Configure uma nova edição",
  participants: "Escolha os times",
  presets: "Formatos prontos",
  tournament: "Mata-mata visual"
};

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultData);
    const parsed = JSON.parse(raw);
    if (!parsed.competitions) return structuredClone(defaultData);
    return parsed;
  } catch {
    return structuredClone(defaultData);
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
}

function id() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

function setScreen(screen) {
  state.screen = screen;

  document.querySelectorAll(".screen").forEach((el) => {
    el.classList.toggle("active", el.id === screen);
  });

  document.querySelectorAll(".bottom-nav__item").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screen);
  });

  document.getElementById("pageTitle").textContent = titles[screen] || "Brocket";
  document.getElementById("pageSubtitle").textContent = subtitles[screen] || "Crie e simule torneios";

  renderAll();
}

function syncConfig() {
  state.config.tournamentName = document.getElementById("tournamentName").value.trim() || "Torneio";
  state.config.competitionId = document.getElementById("competitionSelect").value;
  state.config.teamCount = Number(document.getElementById("teamCount").value);
  state.config.upsetLevel = document.getElementById("upsetLevel").value;
  state.config.scoreRealism = document.getElementById("scoreRealism").value;
  state.config.extraTime = document.getElementById("extraTime").checked;
  state.config.penalties = document.getElementById("penalties").checked;
  state.config.awayGoals = document.getElementById("awayGoals").checked;
}

function getCompetition(idValue = state.activeCompetitionId) {
  return state.data.competitions.find((comp) => comp.id === idValue);
}

function computeCompetitionStats(comp) {
  const stats = {
    editions: comp.editions.length,
    champions: {},
    runnerUps: {},
    finals: {},
    participations: {},
    lastChampion: "-"
  };

  comp.editions.forEach((edition, index) => {
    if (index === comp.editions.length - 1) stats.lastChampion = edition.champion || "-";

    if (edition.champion) {
      stats.champions[edition.champion] = (stats.champions[edition.champion] || 0) + 1;
      stats.finals[edition.champion] = (stats.finals[edition.champion] || 0) + 1;
    }

    if (edition.runnerUp) {
      stats.runnerUps[edition.runnerUp] = (stats.runnerUps[edition.runnerUp] || 0) + 1;
      stats.finals[edition.runnerUp] = (stats.finals[edition.runnerUp] || 0) + 1;
    }

    (edition.teams || []).forEach((team) => {
      stats.participations[team] = (stats.participations[team] || 0) + 1;
    });
  });

  stats.topChampion = topEntry(stats.champions);
  stats.topRunnerUp = topEntry(stats.runnerUps);
  stats.topFinalist = topEntry(stats.finals);
  stats.topParticipant = topEntry(stats.participations);

  return stats;
}

function topEntry(obj) {
  const entries = Object.entries(obj);
  if (entries.length === 0) return { name: "-", count: 0 };
  entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return { name: entries[0][0], count: entries[0][1] };
}

function rankingEntries(obj) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count], index) => ({ place: index + 1, name, count }));
}

function renderCompetitions() {
  const list = document.getElementById("competitionList");
  const homeList = document.getElementById("homeCompetitionList");

  const html = state.data.competitions.map((comp) => {
    const stats = computeCompetitionStats(comp);
    return `
      <button class="competition-card" data-open-comp="${comp.id}">
        <div class="competition-card__top">
          <span>
            <strong>${comp.name}</strong>
            <small>${stats.editions} edição${stats.editions === 1 ? "" : "es"}</small>
          </span>
          <span class="badge">${stats.topChampion.name !== "-" ? "🏆 " + stats.topChampion.name : "Novo"}</span>
        </div>
        <small>Último campeão: ${stats.lastChampion}</small>
      </button>
    `;
  }).join("");

  list.innerHTML = html || `<div class="empty-state">Nenhum campeonato criado ainda.</div>`;
  homeList.innerHTML = html || `<div class="empty-state">Crie seu primeiro campeonato.</div>`;
}

function renderCompetitionSelect() {
  const select = document.getElementById("competitionSelect");
  if (!select) return;

  select.innerHTML = state.data.competitions.map((comp) => {
    const selected = comp.id === state.config.competitionId ? "selected" : "";
    return `<option value="${comp.id}" ${selected}>${comp.name}</option>`;
  }).join("");
}

function renderCompetitionDetail() {
  const comp = getCompetition();
  if (!comp) return;

  const stats = computeCompetitionStats(comp);
  document.getElementById("competitionDetailName").textContent = comp.name;

  document.getElementById("competitionStats").innerHTML = `
    <div class="stat-card">
      <strong>${stats.editions}</strong>
      <small>Edições</small>
    </div>
    <div class="stat-card">
      <strong>${stats.topChampion.name}</strong>
      <small>Maior campeão (${stats.topChampion.count})</small>
    </div>
    <div class="stat-card">
      <strong>${stats.topRunnerUp.name}</strong>
      <small>Maior vice (${stats.topRunnerUp.count})</small>
    </div>
    <div class="stat-card">
      <strong>${stats.topParticipant.name}</strong>
      <small>Mais participações (${stats.topParticipant.count})</small>
    </div>
  `;

  document.getElementById("editionList").innerHTML = comp.editions.map((edition) => `
    <div class="edition-card">
      <div class="edition-card__top">
        <span>
          <strong>${edition.name}</strong>
          <small>Vice: ${edition.runnerUp || "-"}</small>
        </span>
        <span class="badge">🏆 ${edition.champion || "-"}</span>
      </div>
      <small>Decisão: ${edition.decidedBy || "-"}</small>
    </div>
  `).join("") || `<div class="empty-state">Nenhuma edição criada ainda.</div>`;

  const champs = rankingEntries(stats.champions).slice(0, 5);
  const runnerUps = rankingEntries(stats.runnerUps).slice(0, 5);
  const finalists = rankingEntries(stats.finals).slice(0, 5);
  const participants = rankingEntries(stats.participations).slice(0, 5);

  document.getElementById("hallList").innerHTML = `
    ${renderHallCard("🏆 Maiores campeões", champs, "título")}
    ${renderHallCard("🥈 Maiores vices", runnerUps, "vice")}
    ${renderHallCard("🔥 Mais finais", finalists, "final")}
    ${renderHallCard("👥 Mais participações", participants, "participação")}
  `;
}

function renderHallCard(title, rows, label) {
  if (rows.length === 0) {
    return `<div class="hall-card"><strong>${title}</strong><small>Sem dados ainda.</small></div>`;
  }

  return `
    <div class="hall-card">
      <strong>${title}</strong>
      ${rows.map((row) => `<small>${row.place}. ${row.name} — ${row.count} ${label}${row.count === 1 ? "" : "s"}</small>`).join("")}
    </div>
  `;
}

function renderTeams() {
  const list = document.getElementById("teamList");
  const counter = document.getElementById("teamCounter");
  counter.textContent = `${state.teams.length} time${state.teams.length === 1 ? "" : "s"} adicionado${state.teams.length === 1 ? "" : "s"}`;
  list.innerHTML = "";

  if (state.teams.length === 0) {
    list.innerHTML = `<div class="info-banner"><strong>Nenhum time ainda</strong><p>Adicione manualmente ou carregue os sugeridos.</p></div>`;
    return;
  }

  state.teams.forEach((team, index) => {
    const row = document.createElement("div");
    row.className = "team-row";
    row.innerHTML = `
      <strong>${team.name}</strong>
      <span class="team-power">${team.power}</span>
      <button class="remove-btn" data-remove="${index}">×</button>
    `;
    list.appendChild(row);
  });
}

function addTeam(name, power) {
  if (!name) return;
  state.teams.push({
    id: id(),
    name,
    power: Math.max(1, Math.min(100, Number(power) || 50))
  });
  renderTeams();
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function upsetNoise(level) {
  const map = { low: 8, medium: 15, high: 24, chaos: 36 };
  const range = map[level] || 15;
  return Math.floor(Math.random() * (range * 2 + 1)) - range;
}

function weightedRandom(options) {
  const total = options.reduce((sum, item) => sum + item.weight, 0);
  let r = Math.random() * total;

  for (const item of options) {
    r -= item.weight;
    if (r <= 0) return item.value;
  }

  return options[options.length - 1].value;
}

function chooseGameType(teamA, teamB) {
  const diff = Math.abs(teamA.power - teamB.power);
  const r = Math.random();

  if (diff >= 25 && r < 0.18) return "goleada";
  if (r < 0.012) return "maluco";
  if (r < 0.20) return "aberto";
  if (r < 0.58) return "normal";
  return "travado";
}

function totalGoalsForType(type, realism) {
  const profiles = {
    realistic: {
      travado: [{ value: 0, weight: 12 }, { value: 1, weight: 38 }, { value: 2, weight: 36 }, { value: 3, weight: 14 }],
      normal: [{ value: 1, weight: 15 }, { value: 2, weight: 35 }, { value: 3, weight: 32 }, { value: 4, weight: 18 }],
      aberto: [{ value: 3, weight: 20 }, { value: 4, weight: 34 }, { value: 5, weight: 26 }, { value: 6, weight: 15 }, { value: 7, weight: 5 }],
      goleada: [{ value: 4, weight: 32 }, { value: 5, weight: 34 }, { value: 6, weight: 22 }, { value: 7, weight: 9 }, { value: 8, weight: 3 }],
      maluco: [{ value: 7, weight: 28 }, { value: 8, weight: 28 }, { value: 9, weight: 20 }, { value: 10, weight: 14 }, { value: 11, weight: 7 }, { value: 12, weight: 3 }]
    },
    normal: {
      travado: [{ value: 1, weight: 26 }, { value: 2, weight: 38 }, { value: 3, weight: 26 }, { value: 4, weight: 10 }],
      normal: [{ value: 2, weight: 28 }, { value: 3, weight: 32 }, { value: 4, weight: 26 }, { value: 5, weight: 14 }],
      aberto: [{ value: 4, weight: 25 }, { value: 5, weight: 30 }, { value: 6, weight: 25 }, { value: 7, weight: 14 }, { value: 8, weight: 6 }],
      goleada: [{ value: 4, weight: 25 }, { value: 5, weight: 32 }, { value: 6, weight: 25 }, { value: 7, weight: 13 }, { value: 8, weight: 5 }],
      maluco: [{ value: 8, weight: 20 }, { value: 9, weight: 25 }, { value: 10, weight: 25 }, { value: 11, weight: 18 }, { value: 12, weight: 12 }]
    },
    chaotic: {
      travado: [{ value: 1, weight: 18 }, { value: 2, weight: 28 }, { value: 3, weight: 30 }, { value: 4, weight: 24 }],
      normal: [{ value: 3, weight: 25 }, { value: 4, weight: 28 }, { value: 5, weight: 25 }, { value: 6, weight: 15 }, { value: 7, weight: 7 }],
      aberto: [{ value: 5, weight: 22 }, { value: 6, weight: 25 }, { value: 7, weight: 24 }, { value: 8, weight: 17 }, { value: 9, weight: 12 }],
      goleada: [{ value: 5, weight: 20 }, { value: 6, weight: 26 }, { value: 7, weight: 25 }, { value: 8, weight: 18 }, { value: 9, weight: 11 }],
      maluco: [{ value: 9, weight: 18 }, { value: 10, weight: 22 }, { value: 11, weight: 22 }, { value: 12, weight: 20 }, { value: 13, weight: 11 }, { value: 14, weight: 7 }]
    }
  };

  return weightedRandom(profiles[realism][type]);
}

function simulateScore(teamA, teamB) {
  const type = chooseGameType(teamA, teamB);
  const total = totalGoalsForType(type, state.config.scoreRealism);

  let powerA = Math.max(1, teamA.power + upsetNoise(state.config.upsetLevel));
  let powerB = Math.max(1, teamB.power + upsetNoise(state.config.upsetLevel));

  let goalsA = 0;
  let goalsB = 0;

  const blowoutFavorite = powerA >= powerB ? "A" : "B";
  const isBlowout = type === "goleada";

  for (let i = 0; i < total; i++) {
    let probA = powerA / (powerA + powerB);

    if (isBlowout) {
      probA = blowoutFavorite === "A" ? Math.max(probA, 0.76) : Math.min(probA, 0.24);
    }

    if (Math.random() < probA) goalsA++;
    else goalsB++;
  }

  return { goalsA, goalsB, type };
}

function simulateExtraTime(teamA, teamB) {
  const r = Math.random();
  if (r < 0.58) return { goalsA: 0, goalsB: 0 };
  if (r < 0.78) return Math.random() < 0.5 ? { goalsA: 1, goalsB: 0 } : { goalsA: 0, goalsB: 1 };
  if (r < 0.92) return { goalsA: 1, goalsB: 1 };
  return teamA.power >= teamB.power ? { goalsA: 2, goalsB: 0 } : { goalsA: 0, goalsB: 2 };
}

function simulatePenalties(teamA, teamB) {
  let a = 0;
  let b = 0;

  for (let i = 0; i < 5; i++) {
    if (Math.random() < 0.76 + (teamA.power - 75) / 1000) a++;
    if (Math.random() < 0.76 + (teamB.power - 75) / 1000) b++;
  }

  while (a === b) {
    if (Math.random() < 0.76) a++;
    if (Math.random() < 0.76) b++;
  }

  return { penA: a, penB: b };
}

function simulateMatch(match) {
  if (!match.teamA || !match.teamB || match.winner) return match;

  const normal = simulateScore(match.teamA, match.teamB);
  let goalsA = normal.goalsA;
  let goalsB = normal.goalsB;
  let decidedBy = "tempo normal";
  let extra = null;
  let pens = null;

  if (goalsA === goalsB) {
    if (state.config.extraTime) {
      extra = simulateExtraTime(match.teamA, match.teamB);
      goalsA += extra.goalsA;
      goalsB += extra.goalsB;
      if (goalsA !== goalsB) decidedBy = "prorrogação";
    }

    if (goalsA === goalsB && state.config.penalties) {
      pens = simulatePenalties(match.teamA, match.teamB);
      decidedBy = "pênaltis";
    }
  }

  let winner;
  if (goalsA > goalsB) winner = match.teamA;
  else if (goalsB > goalsA) winner = match.teamB;
  else if (pens) winner = pens.penA > pens.penB ? match.teamA : match.teamB;
  else winner = Math.random() < 0.5 ? match.teamA : match.teamB;

  Object.assign(match, { goalsA, goalsB, normalType: normal.type, extra, pens, decidedBy, winner });
  return match;
}

function buildBracket() {
  syncConfig();

  if (state.teams.length !== state.config.teamCount) {
    alert(`Este formato precisa de ${state.config.teamCount} times. Você adicionou ${state.teams.length}.`);
    return;
  }

  const teams = shuffle(state.teams);
  const firstRound = [];

  for (let i = 0; i < teams.length; i += 2) {
    firstRound.push({ id: id(), teamA: teams[i], teamB: teams[i + 1], winner: null });
  }

  state.bracket = [firstRound];
  document.getElementById("tournamentTitle").textContent = "Bracket";
  document.getElementById("bracketEditionName").textContent = state.config.tournamentName;
  renderBracket();
  setScreen("tournament");
}

function roundName(size) {
  const names = {
    32: "16 avos",
    16: "Oitavas",
    8: "Quartas",
    4: "Semifinal",
    2: "🏆 Final",
    1: "Campeão"
  };
  return names[size] || "Rodada";
}

function renderBracket() {
  const bracket = document.getElementById("bracket");
  bracket.innerHTML = "";

  state.bracket.forEach((round, roundIndex) => {
    const col = document.createElement("div");
    col.className = "round";

    const phaseSize = round.length * 2;
    const connectorHeight = Math.max(0, 116 * Math.pow(2, roundIndex) - 58);
    col.innerHTML = `<div class="round-title">${roundName(phaseSize)}</div>`;

    round.forEach((match, matchIndex) => {
      const isFinal = round.length === 1;
      const isA = match.winner && match.winner.id === match.teamA?.id;
      const isB = match.winner && match.winner.id === match.teamB?.id;
      const championA = isFinal && isA;
      const championB = isFinal && isB;

      const teamAName = championA ? `🏆 ${match.teamA.name}` : match.teamA?.name || "A definir";
      const teamBName = championB ? `🏆 ${match.teamB.name}` : match.teamB?.name || "A definir";

      const meta = match.winner
        ? `${match.winner.name} venceu em ${match.decidedBy}${match.pens ? ` (${match.pens.penA} x ${match.pens.penB} nos pênaltis)` : ""}`
        : "Aguardando simulação";

      const card = document.createElement("div");
      card.className = "match";
      card.style.setProperty("--connector-height", `${connectorHeight}px`);
      card.style.setProperty("--connector-display", round.length > 1 && matchIndex % 2 === 0 ? "block" : "none");

      card.innerHTML = `
        <div class="match__team ${isA ? "winner" : ""} ${championA ? "champion" : ""}">
          <span>${teamAName}</span>
          <strong class="match__score">${match.goalsA ?? ""}</strong>
        </div>
        <div class="match__team ${isB ? "winner" : ""} ${championB ? "champion" : ""}">
          <span>${teamBName}</span>
          <strong class="match__score">${match.goalsB ?? ""}</strong>
        </div>
        <div class="match__meta">${meta}</div>
        ${match.winner ? "" : `<button class="text-simulate" data-simulate="${roundIndex}:${matchIndex}">Simular</button>`}
      `;
      col.appendChild(card);
    });

    bracket.appendChild(col);
  });
}

function advanceIfRoundComplete() {
  const currentRound = state.bracket[state.bracket.length - 1];
  if (!currentRound.every((match) => match.winner)) return;

  if (currentRound.length === 1) {
    saveFinishedEdition(currentRound[0]);
    renderBracket();
    renderAll();
    return;
  }

  const winners = currentRound.map((match) => match.winner);
  const next = [];

  for (let i = 0; i < winners.length; i += 2) {
    next.push({ id: id(), teamA: winners[i], teamB: winners[i + 1], winner: null });
  }

  state.bracket.push(next);
}

function saveFinishedEdition(finalMatch) {
  if (finalMatch.editionSaved) return;
  const comp = getCompetition(state.config.competitionId);
  if (!comp) return;

  const champion = finalMatch.winner?.name || "-";
  const runnerUp = finalMatch.teamA?.id === finalMatch.winner?.id ? finalMatch.teamB?.name : finalMatch.teamA?.name;

  comp.editions.push({
    id: id(),
    name: state.config.tournamentName,
    champion,
    runnerUp,
    decidedBy: finalMatch.decidedBy,
    teams: state.teams.map((team) => team.name),
    matches: state.bracket.flat().map((match) => ({
      teamA: match.teamA?.name,
      teamB: match.teamB?.name,
      goalsA: match.goalsA,
      goalsB: match.goalsB,
      winner: match.winner?.name,
      decidedBy: match.decidedBy
    }))
  });

  finalMatch.editionSaved = true;
  saveData();
}

function renderAll() {
  renderCompetitions();
  renderCompetitionSelect();
  renderCompetitionDetail();
  renderTeams();
}

document.querySelectorAll("[data-screen], [data-screen-button]").forEach((el) => {
  el.addEventListener("click", () => setScreen(el.dataset.screen || el.dataset.screenButton));
});

document.querySelectorAll(".mode-card:not(.disabled)").forEach((card) => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".mode-card").forEach((c) => c.classList.remove("selected"));
    card.classList.add("selected");
    state.selectedFormat = card.dataset.format;
  });
});

document.getElementById("createCompetitionBtn").addEventListener("click", () => {
  const form = document.getElementById("competitionForm");
  form.hidden = !form.hidden;
});

document.getElementById("saveCompetition").addEventListener("click", () => {
  const input = document.getElementById("competitionName");
  const name = input.value.trim();
  if (!name) return;

  const comp = {
    id: id(),
    name,
    createdAt: new Date().toISOString(),
    editions: []
  };

  state.data.competitions.push(comp);
  state.activeCompetitionId = comp.id;
  state.config.competitionId = comp.id;
  input.value = "";
  document.getElementById("competitionForm").hidden = true;
  saveData();
  renderAll();
});

document.addEventListener("click", (event) => {
  const compId = event.target.closest("[data-open-comp]")?.dataset.openComp;
  if (compId) {
    state.activeCompetitionId = compId;
    setScreen("competitionDetail");
  }
});

document.querySelectorAll("[data-comp-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll("[data-comp-tab]").forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    document.getElementById("editionsTab").classList.toggle("active", tab.dataset.compTab === "editions");
    document.getElementById("hallTab").classList.toggle("active", tab.dataset.compTab === "hall");
  });
});

document.getElementById("newEditionFromCompetition").addEventListener("click", () => {
  const comp = getCompetition();
  if (comp) {
    state.config.competitionId = comp.id;
    document.getElementById("competitionSelect").value = comp.id;
  }
  setScreen("create");
});

document.getElementById("goParticipants").addEventListener("click", () => {
  syncConfig();
  setScreen("participants");
});

document.getElementById("addTeam").addEventListener("click", () => {
  addTeam(document.getElementById("teamName").value.trim(), document.getElementById("teamPower").value);
  document.getElementById("teamName").value = "";
  document.getElementById("teamPower").value = "75";
});

document.getElementById("teamName").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTeam(document.getElementById("teamName").value.trim(), document.getElementById("teamPower").value);
    document.getElementById("teamName").value = "";
  }
});

document.getElementById("loadSuggested").addEventListener("click", () => {
  syncConfig();
  state.teams = suggestedTeams.slice(0, state.config.teamCount).map((team) => ({ id: id(), ...team }));
  renderTeams();
});

document.getElementById("clearTeams").addEventListener("click", () => {
  state.teams = [];
  renderTeams();
});

document.getElementById("teamList").addEventListener("click", (event) => {
  const index = event.target.dataset.remove;
  if (index !== undefined) {
    state.teams.splice(Number(index), 1);
    renderTeams();
  }
});

document.getElementById("generateBracket").addEventListener("click", buildBracket);

document.getElementById("bracket").addEventListener("click", (event) => {
  const data = event.target.dataset.simulate;
  if (!data) return;

  const [roundIndex, matchIndex] = data.split(":").map(Number);
  simulateMatch(state.bracket[roundIndex][matchIndex]);
  advanceIfRoundComplete();
  renderBracket();
});

document.getElementById("simulateAll").addEventListener("click", () => {
  if (state.screen !== "tournament") return;

  while (state.bracket.length > 0) {
    const currentRound = state.bracket[state.bracket.length - 1];
    const pending = currentRound.filter((match) => !match.winner);

    if (pending.length === 0) {
      if (currentRound.length === 1) break;
      advanceIfRoundComplete();
      continue;
    }

    pending.forEach(simulateMatch);
    advanceIfRoundComplete();

    const last = state.bracket[state.bracket.length - 1];
    if (last.length === 1 && last[0].winner) break;
  }

  renderBracket();
});

renderAll();
