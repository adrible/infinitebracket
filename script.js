const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const STORAGE = "brocket-v5";
const LEGACY_STORAGE = "brocket-v4";

const teamPacks = {
  brasileiros: { name: "Clubes brasileiros", icon: "🇧🇷", teams: [
    ["Flamengo",86],["Palmeiras",86],["Botafogo",84],["São Paulo",82],["Corinthians",80],["Fluminense",81],["Grêmio",80],["Internacional",80],["Atlético-MG",82],["Cruzeiro",78],["Vasco",77],["Santos",77],["Athletico-PR",79],["Bahia",78],["Fortaleza",78],["Ceará",74],["Sport",73],["Vitória",73],["Bragantino",78],["Cuiabá",72]
  ]},
  europeus: { name: "Clubes europeus", icon: "🇪🇺", teams: [
    ["Real Madrid",94],["Manchester City",93],["Bayern München",91],["Liverpool",90],["Barcelona",89],["PSG",90],["Arsenal",88],["Inter de Milão",88],["Atlético de Madrid",87],["Borussia Dortmund",86],["Milan",85],["Juventus",84],["Chelsea",84],["Tottenham",82],["Manchester United",82],["Napoli",84],["Benfica",83],["Porto",82],["Sporting",82],["Ajax",79],["Roma",82],["Bayer Leverkusen",87],["RB Leipzig",83],["Sevilla",79]
  ]},
  sulamericanos: { name: "Sul-americanos", icon: "🌎", teams: [
    ["River Plate",84],["Boca Juniors",82],["Racing",78],["Independiente",76],["Estudiantes",77],["San Lorenzo",75],["Peñarol",76],["Nacional-URU",76],["Colo-Colo",75],["Universidad de Chile",73],["Olimpia",75],["Cerro Porteño",74],["LDU",76],["Independiente del Valle",78],["Barcelona SC",74],["Atlético Nacional",76],["Millonarios",74],["Deportivo Cali",72]
  ]},
  globais: { name: "Clubes globais", icon: "🌍", teams: [
    ["Al Ahly",79],["Zamalek",75],["Wydad Casablanca",76],["Mamelodi Sundowns",76],["Al Hilal",82],["Al Nassr",81],["Al Ittihad",79],["Urawa Red Diamonds",75],["Kawasaki Frontale",75],["Yokohama F. Marinos",74],["Ulsan HD",74],["Jeonbuk Hyundai",73],["Monterrey",78],["América-MEX",78],["Tigres",77],["LAFC",75],["Inter Miami",76],["Seattle Sounders",74]
  ]},
  selecoes: { name: "Seleções mundiais", icon: "🏳️", teams: [
    ["França",93],["Argentina",92],["Brasil",91],["Inglaterra",90],["Espanha",89],["Portugal",89],["Alemanha",88],["Holanda",87],["Itália",86],["Bélgica",85],["Uruguai",84],["Croácia",84],["Marrocos",82],["Japão",80],["Estados Unidos",79],["México",79],["Colômbia",82],["Senegal",81],["Suíça",82],["Dinamarca",81],["Coreia do Sul",79],["Austrália",77],["Egito",79],["Chile",78]
  ]}
};

const defaultData = {
  competitions: [
    { id: crypto.randomUUID(), name: "Copa da Galera", editions: [
      { name:"2024", champion:"Real Madrid", runnerUp:"Benfica", teams:["Real Madrid","Benfica","Flamengo","Palmeiras"], format:"Playoffs", date:"2024", matches:[{home:"Real Madrid",away:"Benfica",homeGoals:3,awayGoals:1,winner:"Real Madrid",loser:"Benfica",stage:"Final",meta:"Jogo único"}] },
      { name:"2025", champion:"Flamengo", runnerUp:"Palmeiras", teams:["Flamengo","Palmeiras","Boca Juniors","River Plate"], format:"Grupos + mata-mata", date:"2025", matches:[{home:"Flamengo",away:"Palmeiras",homeGoals:2,awayGoals:2,winner:"Flamengo",loser:"Palmeiras",stage:"Final",meta:"pênaltis 5-4",pens:{a:5,b:4}}] }
    ]}
  ],
  customTeams: []
};

let data = load();
let currentCompetitionId = data.competitions[0]?.id;
let selectedPacks = new Set(["brasileiros","europeus"]);
let selectedTeams = [];
let currentTournament = null;

function load(){
  try {
    const v5 = localStorage.getItem(STORAGE);
    const legacy = localStorage.getItem(LEGACY_STORAGE);
    return JSON.parse(v5 || legacy) || structuredClone(defaultData);
  } catch { return structuredClone(defaultData); }
}
function save(){ localStorage.setItem(STORAGE, JSON.stringify(data)); }
function safeId(text){ return `${text}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
function team(name,power,source=""){ return { id: safeId(name), name, power, source }; }
function packTeams(key){ return teamPacks[key].teams.map(([name,power]) => team(name,power,teamPacks[key].name)); }
function allPool(){
  const map = new Map();
  selectedPacks.forEach(k => packTeams(k).forEach(t => map.set(t.id,t)));
  data.customTeams.forEach(t => map.set(t.id,t));
  return Array.from(map.values());
}
function shuffle(arr){ return arr.map(v=>[Math.random(),v]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]); }
function clamp(n,a,b){ return Math.max(a,Math.min(b,n)); }
function label(v){ return ({low:"baixa",medium:"média",high:"alta",chaos:"caótica"}[v]||v); }
function tally(list){ return list.filter(Boolean).reduce((a,x)=>(a[x]=(a[x]||0)+1,a),{}); }
function entriesRank(obj){ return Object.entries(obj).sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0])); }
function medal(i){ return i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}.`; }

function go(screen){
  $$(".screen").forEach(s=>s.classList.toggle("active",s.id===screen));
  $$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.go===screen));
  const titles = {home:["V5","Início"],competitions:["Histórico","Campeonatos"],competitionDetail:["Central","Estatísticas"],create:["Novo","Criar torneio"],teams:["Participantes","Times"],rules:["Configuração","Regras"],tournament:["Simulação","Torneio"]};
  $("#subtitle").textContent = titles[screen]?.[0] || "Brocket";
  $("#title").textContent = titles[screen]?.[1] || "Brocket";
  renderAll();
}

document.addEventListener("click", (e)=>{
  const nav = e.target.closest("[data-go]");
  if(nav) go(nav.dataset.go);
  const compBtn = e.target.closest("[data-comp-id]");
  if(compBtn) openCompetition(compBtn.dataset.compId);
  const delEdition = e.target.closest("[data-delete-edition]");
  if(delEdition) deleteEdition(delEdition.dataset.deleteEdition);
});

function renderAll(){ renderCompetitions(); renderCompetitionSelect(); renderPacks(); renderSelectedTeams(); renderCustomTeams(); toggleSettings(); }
function renderCompetitionSelect(){
  const sel = $("#competitionSelect");
  sel.innerHTML = data.competitions.map(c=>`<option value="${c.id}" ${c.id===currentCompetitionId?"selected":""}>${c.name}</option>`).join("");
}
function renderCompetitions(){
  const html = data.competitions.map(c=>{
    const latest = c.editions.at(-1);
    return `<button class="list-card" data-comp-id="${c.id}"><div><strong>${c.name}</strong><small>${c.editions.length} edições${latest?` • último campeão: ${latest.champion}`:""}</small></div><span class="pill">abrir</span></button>`;
  }).join("");
  $("#competitionList").innerHTML = html || `<div class="panel">Nenhum campeonato criado.</div>`;
  $("#homeCompetitions").innerHTML = html || `<div class="panel">Nenhum campeonato criado.</div>`;
}
function openCompetition(id){ currentCompetitionId=id; const c=data.competitions.find(x=>x.id===id); if(!c) return; $("#competitionTitle").textContent=c.name; renderCompetitionDetail(c); go("competitionDetail"); }

function buildCompetitionStats(c){
  const editions = c.editions || [];
  const allMatches = editions.flatMap(e => e.matches || []);
  const allTeams = new Set(editions.flatMap(e=>e.teams||[]));
  const champions = tally(editions.map(e=>e.champion));
  const vices = tally(editions.map(e=>e.runnerUp));
  const finals = tally(editions.flatMap(e=>[e.champion,e.runnerUp].filter(Boolean)));
  const parts = tally(editions.flatMap(e=>e.teams||[]));
  const teamStats = {};
  function ensure(n){ if(!n) return null; return teamStats[n] ||= {team:n,titles:0,vices:0,finals:0,parts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,played:0}; }
  editions.forEach(e=>{
    (e.teams||[]).forEach(n=>ensure(n).parts++);
    if(e.champion) ensure(e.champion).titles++;
    if(e.runnerUp) ensure(e.runnerUp).vices++;
    [e.champion,e.runnerUp].filter(Boolean).forEach(n=>ensure(n).finals++);
  });
  allMatches.forEach(m=>{
    const h = typeof m.home === "string" ? m.home : m.home?.name;
    const a = typeof m.away === "string" ? m.away : m.away?.name;
    const hg = Number(m.homeGoals ?? 0), ag = Number(m.awayGoals ?? 0);
    const hs=ensure(h), as=ensure(a); if(!hs || !as) return;
    hs.gf+=hg; hs.ga+=ag; as.gf+=ag; as.ga+=hg; hs.played++; as.played++;
    if(hg>ag){hs.w++; as.l++;} else if(hg<ag){as.w++; hs.l++;} else {hs.d++; as.d++;}
  });
  Object.values(teamStats).forEach(t=>t.gd=t.gf-t.ga);
  const biggestWin = allMatches.map(m=>{
    const h=typeof m.home==="string"?m.home:m.home?.name, a=typeof m.away==="string"?m.away:m.away?.name;
    const hg=Number(m.homeGoals ?? 0), ag=Number(m.awayGoals ?? 0); return {m,h,a,hg,ag,diff:Math.abs(hg-ag),total:hg+ag};
  }).sort((x,y)=>y.diff-x.diff || y.total-x.total)[0];
  const craziestFinal = allMatches.filter(x=>(x.stage||"").toLowerCase().includes("final")).map(m=>{
    const h=typeof m.home==="string"?m.home:m.home?.name, a=typeof m.away==="string"?m.away:m.away?.name;
    const hg=Number(m.homeGoals ?? 0), ag=Number(m.awayGoals ?? 0); return {m,h,a,hg,ag,total:hg+ag};
  }).sort((x,y)=>y.total-x.total)[0];
  const leader = obj => entriesRank(obj)[0]?.[0] || "—";
  return {editions,allMatches,allTeams,champions,vices,finals,parts,teamStats,biggestWin,craziestFinal,leader};
}
function rankCard(title, obj, icon="🏆"){
  const rows = entriesRank(obj).slice(0,5).map(([name,n],i)=>`<div class="rank-row"><span>${medal(i)} ${name}</span><strong>${n}</strong></div>`).join("") || `<small>Sem dados ainda.</small>`;
  return `<div class="stat-card"><h3>${icon} ${title}</h3>${rows}</div>`;
}
function recordCard(title, value, sub="", icon="✨"){
  return `<div class="stat-card featured"><small>${icon} ${title}</small><strong>${value || "—"}</strong>${sub?`<span>${sub}</span>`:""}</div>`;
}
function renderCompetitionDetail(c){
  const s = buildCompetitionStats(c);
  $("#competitionStats").innerHTML = `
    <div class="stat"><small>Edições</small><strong>${s.editions.length}</strong></div>
    <div class="stat"><small>Jogos salvos</small><strong>${s.allMatches.length}</strong></div>
    <div class="stat"><small>Times diferentes</small><strong>${s.allTeams.size}</strong></div>
    <div class="stat"><small>Maior campeão</small><strong>${s.leader(s.champions)}</strong></div>`;
  $("#summaryList").innerHTML = `
    ${recordCard("Maior campeão", s.leader(s.champions), `${s.champions[s.leader(s.champions)]||0} título(s)`, "🏆")}
    ${recordCard("Rei dos vices", s.leader(s.vices), `${s.vices[s.leader(s.vices)]||0} vice(s)`, "🥈")}
    ${recordCard("Mais finais", s.leader(s.finals), `${s.finals[s.leader(s.finals)]||0} final(is)`, "🔥")}
    ${recordCard("Mais participações", s.leader(s.parts), `${s.parts[s.leader(s.parts)]||0} edição(ões)`, "👥")}`;
  $("#titlesList").innerHTML = `${rankCard("Maiores campeões",s.champions,"🏆")}${rankCard("Maiores vices",s.vices,"🥈")}${rankCard("Mais finais",s.finals,"🔥")}${rankCard("Mais participações",s.parts,"👥")}`;
  const teams = Object.values(s.teamStats).sort((a,b)=>b.titles-a.titles || b.w-a.w || b.gd-a.gd || b.gf-a.gf || a.team.localeCompare(b.team));
  $("#teamsStatsList").innerHTML = teams.map((t,i)=>`<div class="list-card team-stat"><div><strong>${medal(i)} ${t.team}</strong><small>${t.titles} título(s) • ${t.vices} vice(s) • ${t.parts} participação(ões)</small><small>${t.played}J ${t.w}V ${t.d}E ${t.l}D • GP ${t.gf} • GC ${t.ga} • SG ${t.gd}</small></div><span class="pill">🏆 ${t.titles}</span></div>`).join("") || `<div class="panel">Sem estatísticas de times ainda.</div>`;
  const big = s.biggestWin;
  const final = s.craziestFinal;
  $("#gamesStatsList").innerHTML = `
    ${recordCard("Maior goleada", big?`${big.h} ${big.hg} x ${big.ag} ${big.a}`:"—", big?`Diferença de ${big.diff} gol(s)`:"", "⚽")}
    ${recordCard("Final com mais gols", final?`${final.h} ${final.hg} x ${final.ag} ${final.a}`:"—", final?`${final.total} gol(s) na final`:"", "🔥")}
    ${recordCard("Títulos nos pênaltis", String(s.allMatches.filter(m=>m.pens).length), "decisões registradas", "🎯")}
    ${recordCard("Total de gols", String(s.allMatches.reduce((a,m)=>a+Number(m.homeGoals||0)+Number(m.awayGoals||0),0)), `${s.allMatches.length} jogo(s)`, "🥅")}`;
  $("#editionList").innerHTML = c.editions.slice().reverse().map((e,idx)=>{ const realIndex = c.editions.length-1-idx; return `<div class="list-card"><div><strong>${e.name}</strong><small>${e.format||"Torneio"} • campeão: ${e.champion||"—"} • vice: ${e.runnerUp||"—"}</small><small>${(e.teams||[]).length} times • ${(e.matches||[]).length} jogos salvos</small></div><button class="danger mini-danger" data-delete-edition="${realIndex}">apagar</button></div>`; }).join("") || `<div class="panel">Sem edições ainda.</div>`;
}
function deleteEdition(index){
  const c = data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return;
  const e = c.editions[Number(index)]; if(!e) return;
  if(confirm(`Apagar a edição "${e.name}"?`)){ c.editions.splice(Number(index),1); save(); renderCompetitionDetail(c); renderCompetitions(); }
}

$("#deleteCompetitionBtn").onclick=()=>{
  const c = data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return;
  if(data.competitions.length<=1) return alert("Crie outro campeonato antes de apagar o único existente.");
  if(confirm(`Apagar o campeonato "${c.name}" e todas as edições dele?`)){
    data.competitions = data.competitions.filter(x=>x.id!==c.id);
    currentCompetitionId = data.competitions[0]?.id;
    save(); renderAll(); go("competitions");
  }
};

$("#newCompetition").onclick=()=>$("#competitionForm").hidden=!$("#competitionForm").hidden;
$("#saveCompetition").onclick=()=>{ const name=$("#competitionName").value.trim(); if(!name) return; const c={id:crypto.randomUUID(),name,editions:[]}; data.competitions.push(c); currentCompetitionId=c.id; $("#competitionName").value=""; $("#competitionForm").hidden=true; save(); renderAll(); };
$("#competitionSelect").onchange=e=>currentCompetitionId=e.target.value;
$("#formatSelect").onchange=()=>{ applyFormatDefaults(); toggleSettings(); };
function toggleSettings(){
  const f=$("#formatSelect").value;
  $("#groupSettings").style.display = (f==="groups" || f==="clubWorldCup") ? "block" : "none";
  $("#leagueSettings").style.display = f==="league" ? "block" : "none";
}
function applyFormatDefaults(){
  const f=$("#formatSelect").value;
  if(f==="clubWorldCup") { $("#teamCount").value="32"; $("#knockoutLegs").value="single"; $("#finalRule").value="single"; }
  if(f==="league" && !["4","6","8","10","12","16","20"].includes($("#teamCount").value)) $("#teamCount").value="20";
  if((f==="playoffs" || f==="groups") && !["8","16","32"].includes($("#teamCount").value)) $("#teamCount").value="16";
  renderSelectedTeams();
}

function renderPacks(){
  $("#packList").innerHTML = Object.entries(teamPacks).map(([key,p])=>`<label class="pack"><input type="checkbox" value="${key}" ${selectedPacks.has(key)?"checked":""}/><span><strong>${p.icon} ${p.name}</strong><small>${p.teams.length} times</small></span></label>`).join("");
  $$(".pack input").forEach(cb=>cb.onchange=()=>{ cb.checked?selectedPacks.add(cb.value):selectedPacks.delete(cb.value); renderPacks(); renderSelectedTeams(); });
  $("#poolCount").textContent = `${allPool().length} disponíveis`;
}
function renderSelectedTeams(){
  const count = Number($("#teamCount").value || 16);
  $("#selectedCount").textContent = `${selectedTeams.length}/${count}`;
  $("#selectedTeams").innerHTML = selectedTeams.map(t=>`<div class="team-row"><div><strong>${t.name}</strong><small>${t.source||"Personalizado"}</small></div><span class="pill">${t.power}</span></div>`).join("") || `<div class="team-row"><small>Nenhum time selecionado.</small></div>`;
}
$("#teamCount").onchange=()=>{ selectedTeams = selectedTeams.slice(0,Number($("#teamCount").value)); renderSelectedTeams(); };
$("#selectStrongest").onclick=()=>{ selectedTeams=allPool().sort((a,b)=>b.power-a.power).slice(0,Number($("#teamCount").value)); renderSelectedTeams(); };
$("#selectRandom").onclick=()=>{ selectedTeams=shuffle(allPool()).slice(0,Number($("#teamCount").value)); renderSelectedTeams(); };
$("#selectBalanced").onclick=()=>{ selectedTeams=balancedPick(allPool(),Number($("#teamCount").value)); renderSelectedTeams(); };
$("#clearSelection").onclick=()=>{ selectedTeams=[]; renderSelectedTeams(); };
function balancedPick(pool,count){
  const sorted = [...pool].sort((a,b)=>b.power-a.power);
  const elite = sorted.filter(t=>t.power>=88), strong=sorted.filter(t=>t.power>=80&&t.power<88), mid=sorted.filter(t=>t.power>=72&&t.power<80), low=sorted.filter(t=>t.power<72);
  let pick=[...shuffle(elite).slice(0,Math.ceil(count*.25)),...shuffle(strong).slice(0,Math.ceil(count*.4)),...shuffle(mid).slice(0,Math.ceil(count*.25)),...shuffle(low).slice(0,Math.max(1,Math.floor(count*.1)))];
  const map=new Map(pick.map(t=>[t.id,t]));
  shuffle(sorted).forEach(t=>{ if(map.size<count) map.set(t.id,t); });
  return Array.from(map.values()).slice(0,count);
}

$("#addCustomTeam").onclick=()=>{
  const name=$("#customName").value.trim(); const power=clamp(Number($("#customPower").value)||70,1,100); if(!name) return;
  data.customTeams.push(team(name,power,"Meus times")); $("#customName").value=""; save(); renderAll();
};
function renderCustomTeams(){ $("#customTeamList").innerHTML = data.customTeams.map((t,i)=>`<div class="team-row"><div><strong>${t.name}</strong><small>Personalizado</small></div><span class="pill">${t.power}</span></div>`).join("") || `<div class="team-row"><small>Você ainda não criou times.</small></div>`; }

function config(){ return { format:$("#formatSelect").value, name:$("#tournamentName").value.trim()||"Torneio", teamCount:Number($("#teamCount").value), groupSize:Number($("#groupSize").value), qualifiers:Number($("#qualifiers").value), leagueTurns:$("#leagueTurns")?.value||"single", legs:$("#knockoutLegs").value, finalRule:$("#finalRule").value, upset:$("#upsetLevel").value, realism:$("#scoreRealism").value, extraTime:$("#extraTime").checked, penalties:$("#penalties").checked, awayGoals:$("#awayGoals").checked }; }
$("#generateTournament").onclick=()=>{
  const cfg=config();
  if((cfg.format==="groups" || cfg.format==="clubWorldCup") && cfg.teamCount % cfg.groupSize !== 0) return alert("Para grupos, a quantidade de times precisa fechar grupos de 4.");
  if(selectedTeams.length<cfg.teamCount) selectedTeams=balancedPick(allPool(),cfg.teamCount);
  if(selectedTeams.length<cfg.teamCount) return alert("Selecione mais times ou marque mais pacotes.");
  const teams=shuffle(selectedTeams.slice(0,cfg.teamCount));
  currentTournament = cfg.format==="playoffs" ? makePlayoffs(teams,cfg) : cfg.format==="league" ? makeLeague(teams,cfg) : makeGroupsTournament(teams,cfg);
  saveEdition(currentTournament);
  renderTournament(currentTournament);
  go("tournament");
};

function makeLeague(teams,cfg){
  const rows = teams.map(t=>({...t,pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0}));
  const rounds = [];
  const n = rows.length;
  const arr = n % 2 ? [...rows, null] : [...rows];
  const totalRounds = arr.length - 1;
  const half = arr.length / 2;
  let rotation = [...arr];
  for(let r=0;r<totalRounds;r++){
    const matches=[];
    for(let i=0;i<half;i++){
      const a=rotation[i], b=rotation[rotation.length-1-i];
      if(a && b){ const home = r%2 ? b : a; const away = r%2 ? a : b; const m=playSingle(home,away,cfg,true); m.stage=`Rodada ${r+1}`; matches.push(m); applyTable(rows,m); }
    }
    rounds.push({name:`Rodada ${r+1}`,matches});
    rotation = [rotation[0], rotation.at(-1), ...rotation.slice(1,-1)];
  }
  if(cfg.leagueTurns==="double"){
    const first=[...rounds];
    first.forEach((round,idx)=>{
      const matches=round.matches.map(m=>{ const rev=playSingle(m.away,m.home,cfg,true); rev.stage=`Rodada ${idx+1+first.length}`; applyTable(rows,rev); return rev; });
      rounds.push({name:`Rodada ${idx+1+first.length}`,matches});
    });
  }
  rows.forEach(t=>t.gd=t.gf-t.ga);
  const table=[...rows].sort((a,b)=> b.pts-a.pts || b.gd-a.gd || b.gf-a.gf || b.w-a.w || b.power-a.power || Math.random()-.5);
  return {cfg,teams,league:{table,rounds},groups:[],knockout:[],champion:table[0].name,runnerUp:table[1]?.name||"—",formatLabel:"Liga / pontos corridos"};
}
function makeGroupsTournament(teams,cfg){
  const groupCount = teams.length / cfg.groupSize;
  const groups = Array.from({length:groupCount},(_,i)=>({ name:String.fromCharCode(65+i), teams:[], matches:[] }));
  teams.forEach((t,i)=>groups[i%groupCount].teams.push({...t,pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0}));
  groups.forEach(g=>simulateGroup(g,cfg));
  const qualified=[];
  groups.forEach(g=>g.table.slice(0,cfg.qualifiers).forEach((row,pos)=>qualified.push({...row, group:g.name, groupPosition:pos+1})));
  const ordered = pairQualified(qualified);
  const knockout = simulateKnockout(ordered,cfg);
  return { cfg, teams, groups, knockout, champion: knockout.at(-1).matches[0].winner.name, runnerUp: knockout.at(-1).matches[0].loser.name, formatLabel: cfg.format==="clubWorldCup"?"Copa do Mundo de Clubes":"Grupos + mata-mata" };
}
function simulateGroup(g,cfg){
  for(let i=0;i<g.teams.length;i++) for(let j=i+1;j<g.teams.length;j++){
    const m = playSingle(g.teams[i],g.teams[j],cfg,true); m.stage=`Grupo ${g.name}`;
    g.matches.push(m); applyTable(g.teams,m);
  }
  g.teams.forEach(t=>t.gd=t.gf-t.ga);
  g.table = [...g.teams].sort((a,b)=> b.pts-a.pts || b.gd-a.gd || b.gf-a.gf || b.power-a.power || Math.random()-.5);
}
function applyTable(rows,m){
  const a=rows.find(x=>x.id===m.home.id), b=rows.find(x=>x.id===m.away.id);
  a.gf+=m.homeGoals; a.ga+=m.awayGoals; b.gf+=m.awayGoals; b.ga+=m.homeGoals;
  if(m.homeGoals>m.awayGoals){ a.pts+=3; a.w++; b.l++; }
  else if(m.homeGoals<m.awayGoals){ b.pts+=3; b.w++; a.l++; }
  else { a.pts++; b.pts++; a.d++; b.d++; }
}
function pairQualified(q){
  const winners=q.filter(x=>x.groupPosition===1), runners=q.filter(x=>x.groupPosition===2).reverse();
  const out=[]; for(let i=0;i<winners.length;i++){ out.push(winners[i], runners[i]); } return out;
}
function makePlayoffs(teams,cfg){
  const knockout = simulateKnockout(teams,cfg);
  return { cfg, teams, groups:[], knockout, champion: knockout.at(-1).matches[0].winner.name, runnerUp: knockout.at(-1).matches[0].loser.name, formatLabel:"Playoffs / mata-mata" };
}
function simulateKnockout(teams,cfg){
  let current=[...teams], rounds=[];
  while(current.length>1){
    const size=current.length; const isFinal=size===2; const matches=[]; const winners=[];
    for(let i=0;i<current.length;i+=2){ const m=playKnockout(current[i],current[i+1],cfg,isFinal); m.stage=roundName(size); matches.push(m); winners.push(m.winner); }
    rounds.push({ name:roundName(size), matches }); current=winners;
  }
  return rounds;
}
function roundName(size){ return size===2?"Final":size===4?"Semifinal":size===8?"Quartas":size===16?"Oitavas":`Fase ${size}`; }
function playKnockout(a,b,cfg,isFinal){
  const twoLegs = cfg.legs==="two" && !(isFinal && cfg.finalRule==="single");
  if(!twoLegs){
    let m=playSingle(a,b,cfg,false);
    let home=m.homeGoals, away=m.awayGoals, meta="Jogo único";
    if(home===away){
      if(cfg.extraTime){ const et=extraGoals(a,b,cfg); home+=et.a; away+=et.b; meta += ` • prorrog. ${et.a}-${et.b}`; }
      if(home===away && cfg.penalties){ const p=pens(a,b,cfg); meta += ` • pênaltis ${p.a}-${p.b}`; return normalizeMatch(a,b,home,away,p.winA?a:b,p.winA?b:a,meta,p); }
    }
    const winA=home>=away; return normalizeMatch(a,b,home,away,winA?a:b,winA?b:a,meta,null);
  }
  const leg1=playSingle(a,b,cfg,false), leg2=playSingle(b,a,cfg,false);
  let aggA=leg1.homeGoals+leg2.awayGoals, aggB=leg1.awayGoals+leg2.homeGoals;
  let meta=`Ida ${leg1.homeGoals}-${leg1.awayGoals} • volta ${leg2.homeGoals}-${leg2.awayGoals}`;
  if(aggA===aggB && cfg.awayGoals){
    const awayA=leg2.awayGoals, awayB=leg1.awayGoals;
    if(awayA!==awayB){ const winA=awayA>awayB; meta += " • gol fora"; return normalizeMatch(a,b,aggA,aggB,winA?a:b,winA?b:a,meta,null); }
  }
  if(aggA===aggB && cfg.extraTime){ const et=extraGoals(a,b,cfg); aggA+=et.a; aggB+=et.b; meta += ` • prorrog. ${et.a}-${et.b}`; }
  if(aggA===aggB && cfg.penalties){ const p=pens(a,b,cfg); meta += ` • pênaltis ${p.a}-${p.b}`; return normalizeMatch(a,b,aggA,aggB,p.winA?a:b,p.winA?b:a,meta,p); }
  const winA=aggA>=aggB; return normalizeMatch(a,b,aggA,aggB,winA?a:b,winA?b:a,meta,null);
}
function normalizeMatch(a,b,scoreA,scoreB,winner,loser,meta,pens){ return { home:a, away:b, homeGoals:scoreA, awayGoals:scoreB, winner, loser, meta, pens }; }
function playSingle(a,b,cfg,allowDraw){
  const diff=a.power-b.power; const randomness={low:8,medium:15,high:24,chaos:38}[cfg.upset];
  const formA=diff/14+(Math.random()*2-1)*(randomness/18); const formB=-diff/14+(Math.random()*2-1)*(randomness/18);
  const base = cfg.realism==="chaotic"?1.8:cfg.realism==="normal"?1.35:1.05;
  let ga = goalsFromRating(base+formA), gb = goalsFromRating(base+formB);
  if(cfg.realism==="realistic" && Math.random()<.16){ ga=Math.min(ga,2); gb=Math.min(gb,2); }
  if(!allowDraw && ga===gb && Math.random()<.55){ (Math.random()+diff/180>.5)?ga++:gb++; }
  return { home:a, away:b, homeGoals:clamp(ga,0,9), awayGoals:clamp(gb,0,9) };
}
function goalsFromRating(x){
  const r=Math.random();
  const boost=Math.max(-.9,Math.min(1.8,x-1));
  const probs=[.23-.05*boost,.31-.04*boost,.25,.13+.04*boost,.055+.025*boost,.02+.02*boost,.005+.01*boost];
  let acc=0; for(let i=0;i<probs.length;i++){ acc+=Math.max(0,probs[i]); if(r<acc) return i; } return Math.random()<.5?4:5;
}
function extraGoals(a,b,cfg){ const m=playSingle(a,b,{...cfg,realism:"realistic",upset:cfg.upset},true); return {a:Math.min(2,m.homeGoals), b:Math.min(2,m.awayGoals)}; }
function pens(a,b,cfg){ const bias=(a.power-b.power)/220; const winA=Math.random()+bias>.5; const base=4+Math.floor(Math.random()*2); return winA?{a:base+1,b:base,winA:true}:{a:base,b:base+1,winA:false}; }

function renderTournament(t){
  $("#tournamentTitle").textContent=t.cfg.name; $("#tournamentFormatLabel").textContent=t.formatLabel;
  $("#summaryBar").innerHTML = [`🏆 Campeão: ${t.champion}`,`🥈 Vice: ${t.runnerUp}`,`${t.teams.length} times`,t.cfg.format==="league"?(t.cfg.leagueTurns==="double"?"turno e returno":"turno único"):(t.cfg.legs==="two"?"ida-volta":"jogo único"),t.cfg.awayGoals?"gol fora":"sem gol fora",`zebra ${label(t.cfg.upset)}`].map(x=>`<div class="summary-item">${x}</div>`).join("");
  renderLeague(t.league); renderGroups(t.groups); renderBracket(t.knockout);
}
function renderLeague(league){
  if(!league){ $("#leagueArea").innerHTML=""; return; }
  $("#knockoutTitle").style.display="none";
  $("#leagueArea").innerHTML = `<div class="section-title on-field"><h2>Tabela</h2></div><div class="group-card league-card"><table class="table"><thead><tr><th>#</th><th>Time</th><th>Pts</th><th>J</th><th>V</th><th>SG</th><th>GP</th></tr></thead><tbody>${league.table.map((t,i)=>`<tr><td>${i+1}</td><td>${i===0?"🏆 ":""}${t.name}</td><td>${t.pts}</td><td>${t.w+t.d+t.l}</td><td>${t.w}</td><td>${t.gd}</td><td>${t.gf}</td></tr>`).join("")}</tbody></table></div><div class="section-title on-field"><h2>Rodadas</h2></div><div class="groups-grid rounds-grid">${league.rounds.map(r=>`<div class="group-card"><h3>${r.name}</h3>${r.matches.map(m=>`<div class="mini-match"><span>${m.home.name} ${m.homeGoals}</span><span>${m.awayGoals} ${m.away.name}</span></div>`).join("")}</div>`).join("")}</div>`;
}
function renderGroups(groups){
  if(!groups?.length){ $("#groupsArea").innerHTML=""; return; }
  $("#knockoutTitle").style.display="flex";
  $("#groupsArea").innerHTML = `<div class="section-title on-field"><h2>Fase de grupos</h2></div><div class="groups-grid">${groups.map(g=>`<div class="group-card"><h3>Grupo ${g.name}</h3><table class="table"><thead><tr><th>Time</th><th>Pts</th><th>J</th><th>SG</th><th>GP</th></tr></thead><tbody>${g.table.map((t,i)=>`<tr><td>${i<2?"✅ ":""}${t.name}</td><td>${t.pts}</td><td>${t.w+t.d+t.l}</td><td>${t.gd}</td><td>${t.gf}</td></tr>`).join("")}</tbody></table><div class="group-matches">${g.matches.map(m=>`<div class="mini-match"><span>${m.home.name} ${m.homeGoals}</span><span>${m.awayGoals} ${m.away.name}</span></div>`).join("")}</div></div>`).join("")}</div>`;
}
function renderBracket(rounds){
  if(!rounds?.length){ $("#bracketArea").innerHTML=""; return; }
  $("#knockoutTitle").style.display="flex";
  const finalWinner = rounds.at(-1)?.matches[0]?.winner?.name;
  $("#bracketArea").innerHTML = rounds.map(r=>`<div class="round"><h3>${r.name}</h3>${r.matches.map(m=>{ const ca=m.winner.name===finalWinner && r.name==="Final"; return `<div class="match"><div class="match-team ${m.winner.id===m.home.id?"winner":""} ${ca&&m.winner.id===m.home.id?"champion":""}"><span>${ca&&m.winner.id===m.home.id?"🏆 ":""}${m.home.name}</span><strong>${m.homeGoals}</strong></div><div class="match-team ${m.winner.id===m.away.id?"winner":""} ${ca&&m.winner.id===m.away.id?"champion":""}"><span>${ca&&m.winner.id===m.away.id?"🏆 ":""}${m.away.name}</span><strong>${m.awayGoals}</strong></div><div class="match-meta">${m.meta}</div></div>` }).join("")}</div>`).join("");
}
function flattenMatches(t){
  const out=[];
  (t.league?.rounds||[]).forEach(r=>r.matches.forEach(m=>out.push({...m,stage:r.name})));
  (t.groups||[]).forEach(g=>g.matches.forEach(m=>out.push({...m,stage:`Grupo ${g.name}`})));
  (t.knockout||[]).forEach(r=>r.matches.forEach(m=>out.push({...m,stage:r.name})));
  return out.map(m=>({home:m.home.name,away:m.away.name,homeGoals:m.homeGoals,awayGoals:m.awayGoals,winner:m.winner?.name || (m.homeGoals>m.awayGoals?m.home.name:m.away.name),loser:m.loser?.name || (m.homeGoals>m.awayGoals?m.away.name:m.home.name),stage:m.stage,meta:m.meta,pens:m.pens}));
}
function saveEdition(t){
  const comp=data.competitions.find(c=>c.id===$("#competitionSelect").value) || data.competitions[0]; if(!comp) return;
  comp.editions.push({ id:crypto.randomUUID(), name:t.cfg.name, champion:t.champion, runnerUp:t.runnerUp, teams:t.teams.map(x=>x.name), format:t.formatLabel, date:new Date().getFullYear().toString(), matches:flattenMatches(t), leagueTable:t.league?.table?.map(x=>({team:x.name,pts:x.pts,w:x.w,d:x.d,l:x.l,gf:x.gf,ga:x.ga,gd:x.gd}))||null });
  save();
}

$$('.tab').forEach(t=>t.onclick=()=>{ $$('.tab').forEach(x=>x.classList.remove('active')); t.classList.add('active'); $$('.tab-page').forEach(p=>p.classList.remove('active')); const page = $(`#${t.dataset.tab}Tab`); if(page) page.classList.add('active'); });
$("#resetDemo").onclick=()=>{ if(confirm("Limpar dados salvos neste navegador?")){ localStorage.removeItem(STORAGE); localStorage.removeItem(LEGACY_STORAGE); data=load(); currentCompetitionId=data.competitions[0]?.id; selectedTeams=[]; renderAll(); go("home"); } };

renderAll();
selectedTeams = balancedPick(allPool(), Number($("#teamCount").value));
renderSelectedTeams();
