const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const STORAGE = "brocket-0-7";
const LEGACY_KEYS = ["brocket-0-7-6-1","brocket-v7","brocket-v6-polida","brocket-v5","brocket-v4","brocket-v3"];

const packs = {
  brasileiros:{ name:"Clubes brasileiros", icon:"🇧🇷", teams:[["Flamengo",86],["Palmeiras",86],["Botafogo",84],["Atlético-MG",82],["São Paulo",82],["Fluminense",81],["Corinthians",80],["Grêmio",80],["Internacional",80],["Athletico-PR",79],["Bahia",78],["Fortaleza",78],["Cruzeiro",78],["Vasco",77],["Santos",77],["Ceará",74],["Sport",73],["Vitória",73],["Bragantino",78],["Cuiabá",72]]},
  europeus:{ name:"Clubes europeus", icon:"🇪🇺", teams:[["Real Madrid",94],["Manchester City",93],["Bayern München",91],["PSG",90],["Liverpool",90],["Barcelona",89],["Arsenal",88],["Inter de Milão",88],["Bayer Leverkusen",87],["Atlético de Madrid",87],["Borussia Dortmund",86],["Milan",85],["Juventus",84],["Napoli",84],["Chelsea",84],["RB Leipzig",83],["Benfica",83],["Sporting",82],["Porto",82],["Tottenham",82],["Manchester United",82],["Roma",82],["Ajax",79],["Sevilla",79]]},
  sulamericanos:{ name:"Sul-americanos", icon:"🌎", teams:[["River Plate",84],["Boca Juniors",82],["Independiente del Valle",78],["Racing",78],["Estudiantes",77],["LDU",76],["Peñarol",76],["Nacional-URU",76],["Atlético Nacional",76],["Olimpia",75],["Colo-Colo",75],["San Lorenzo",75],["Cerro Porteño",74],["Barcelona SC",74],["Millonarios",74],["Universidad de Chile",73],["Deportivo Cali",72],["Independiente",76]]},
  globais:{ name:"Clubes globais", icon:"🌍", teams:[["Al Hilal",82],["Al Nassr",81],["Al Ahly",79],["Al Ittihad",79],["Monterrey",78],["América-MEX",78],["Tigres",77],["Mamelodi Sundowns",76],["Wydad Casablanca",76],["Inter Miami",76],["LAFC",75],["Urawa Red Diamonds",75],["Kawasaki Frontale",75],["Zamalek",75],["Yokohama F. Marinos",74],["Ulsan HD",74],["Seattle Sounders",74],["Jeonbuk Hyundai",73]]},
  selecoes:{ name:"Seleções mundiais", icon:"🏳️", teams:[
["França",93],["Argentina",92],["Brasil",91],["Inglaterra",90],["Espanha",89],["Portugal",89],["Alemanha",88],["Holanda",87],["Itália",86],["Bélgica",85],["Uruguai",84],["Croácia",84],
["Colômbia",82],["Marrocos",82],["Suíça",82],["Senegal",81],["Dinamarca",81],["Japão",80],["México",79],["Estados Unidos",79],["Coreia do Sul",79],["Egito",79],["Chile",78],["Austrália",77],
["Equador",80],["Nigéria",79],["Irã",78],["Costa do Marfim",78],["Argélia",78],["Turquia",80],["Sérvia",79],["Noruega",78],["Polônia",78],["Ucrânia",78],["Áustria",80],["Canadá",77],
["Arábia Saudita",76],["Qatar",75],["Gana",76],["Camarões",77],["Tunísia",77],["África do Sul",75],["Paraguai",75],["Peru",76],["Panamá",73],["Jamaica",73],["Nova Zelândia",72],["Uzbequistão",74]
]},
  brasilB:{ name:"Brasil Série B", icon:"🇧🇷", teams:[["Goiás",75],["Coritiba",74],["Avaí",72],["Chapecoense",71],["Guarani",70],["Ponte Preta",70],["Vila Nova",70],["Novorizontino",71],["CRB",70],["Operário-PR",69],["Paysandu",69],["Remo",69],["Amazonas",68],["Botafogo-SP",68],["Criciúma",73],["Juventude",73]]},
  europaElite:{ name:"Europa elite", icon:"⭐", teams:[["Real Madrid",94],["Manchester City",93],["Bayern München",91],["PSG",90],["Liverpool",90],["Barcelona",89],["Arsenal",88],["Inter de Milão",88],["Atlético de Madrid",87],["Bayer Leverkusen",87],["Borussia Dortmund",86],["Juventus",84]]},
  europaAlternativos:{ name:"Europa alternativos", icon:"🇪🇺", teams:[["Aston Villa",83],["Newcastle",82],["Brighton",80],["Lille",79],["Lyon",79],["Marseille",80],["Atalanta",83],["Fiorentina",81],["Lazio",81],["Real Sociedad",81],["Villarreal",80],["Athletic Bilbao",81],["Braga",78],["PSV",82],["Feyenoord",81],["Celtic",78],["Rangers",77],["Galatasaray",81],["Fenerbahçe",80],["Shakhtar Donetsk",78]]},
  africa:{ name:"Clubes africanos", icon:"🌍", teams:[["Al Ahly",79],["Zamalek",75],["Pyramids",74],["Mamelodi Sundowns",76],["Orlando Pirates",72],["Wydad Casablanca",76],["Raja Casablanca",75],["Esperance",74],["Étoile du Sahel",72],["TP Mazembe",73],["Simba SC",71],["Young Africans",71]]},
  asia:{ name:"Clubes asiáticos", icon:"🌏", teams:[["Al Hilal",82],["Al Nassr",81],["Al Ittihad",79],["Al Ahli",78],["Urawa Red Diamonds",75],["Kawasaki Frontale",75],["Yokohama F. Marinos",74],["Vissel Kobe",74],["Ulsan HD",74],["Jeonbuk Hyundai",73],["Pohang Steelers",72],["Shanghai Port",72],["Al Sadd",73],["Persepolis",72]]},
  concacaf:{ name:"Clubes CONCACAF", icon:"🌎", teams:[["América-MEX",78],["Monterrey",78],["Tigres",77],["Cruz Azul",76],["Chivas",75],["Pachuca",76],["Inter Miami",76],["LAFC",75],["Seattle Sounders",74],["Columbus Crew",74],["NYCFC",72],["Philadelphia Union",72],["Toronto FC",70],["Saprissa",69],["Alajuelense",68]]},
  selecoesEuropa:{ name:"Seleções Europa", icon:"🇪🇺", teams:[["França",93],["Inglaterra",90],["Espanha",89],["Portugal",89],["Alemanha",88],["Holanda",87],["Itália",86],["Bélgica",85],["Croácia",84],["Suíça",82],["Dinamarca",81],["Áustria",80],["Turquia",80],["Sérvia",79],["Escócia",77],["Noruega",78],["Polônia",78],["Ucrânia",78]]},
  selecoesAmerica:{ name:"Seleções América do Sul", icon:"🌎", teams:[["Argentina",92],["Brasil",91],["Uruguai",84],["Colômbia",82],["Equador",80],["Chile",78],["Peru",76],["Paraguai",75],["Venezuela",75],["Bolívia",72]]},
  selecoesAfrica:{ name:"Seleções África", icon:"🌍", teams:[["Marrocos",82],["Senegal",81],["Egito",79],["Nigéria",79],["Costa do Marfim",78],["Argélia",78],["Tunísia",77],["Camarões",77],["Gana",76],["África do Sul",75],["Mali",75],["Congo DR",74]]},
  selecoesAsia:{ name:"Seleções Ásia", icon:"🌏", teams:[["Japão",80],["Coreia do Sul",79],["Irã",78],["Austrália",77],["Arábia Saudita",76],["Qatar",75],["Iraque",74],["Uzbequistão",74],["Emirados Árabes",73],["China",70]]},
  selecoesConcacaf:{ name:"Seleções CONCACAF", icon:"🌎", teams:[["México",79],["Estados Unidos",79],["Canadá",77],["Costa Rica",74],["Panamá",73],["Jamaica",73],["Honduras",71],["El Salvador",69],["Haiti",69],["Trinidad e Tobago",68]]},
  classicos:{ name:"Times clássicos", icon:"📜", teams:[["Santos 1962",94],["Brasil 1970",98],["Milan 1989",95],["Barcelona 2011",97],["Real Madrid 2017",95],["Manchester United 1999",93],["Ajax 1995",92],["Boca Juniors 2003",90],["São Paulo 2005",89],["Flamengo 1981",91],["Palmeiras 1999",88],["Inter 2010",90]]}
};

const starter = { competitions:[], customTeams:[], customPacks:[], activeTournament:null };

let data = load();
function sanitizeLoadedData(d){
  if(!d) return structuredClone(starter);
  d.competitions = Array.isArray(d.competitions) ? d.competitions : [];
  d.customTeams = Array.isArray(d.customTeams) ? d.customTeams : [];
  d.customPacks = Array.isArray(d.customPacks) ? d.customPacks : [];
  if(d?.activeTournament?.cfg?.format==="league" && Number(d.activeTournament.cfg.teamCount)>24){
    d.activeTournament=null;
  }
  return d;
}
data=sanitizeLoadedData(data);
if(data.competitions?.length===1 && data.competitions[0]?.name==="Copa da Galera" && data.competitions[0]?.editions?.some(e=>e.name==="2024") && data.competitions[0]?.editions?.some(e=>e.name==="2025")){
  data.competitions=[];
  save();
}
let currentCompetitionId = data.competitions[0]?.id || null;
let selectedPacks = new Set(["brasileiros","europeus"]);
let selectedTeams = [];
let teamSearch = "";
let powerFilter = "all";
let previewSeed = 0;
let previewOrder = null;
let manualGroups = null;
let editingMatchId = null;
let selectedLeagueRound = null;
let selectedGroupRound = null;

function uid(){ return crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)+Date.now(); }
function mSaved(home,away,hg,ag,winner,loser,stage,meta,pens=null){ return {home,away,homeGoals:hg,awayGoals:ag,winner,loser,stage,meta,pens,played:true}; }
function load(){
  try{
    const raw = localStorage.getItem(STORAGE) || LEGACY_KEYS.map(k=>localStorage.getItem(k)).find(Boolean);
    if(!raw) return structuredClone(starter);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(starter), ...parsed, competitions: Array.isArray(parsed.competitions) ? parsed.competitions : structuredClone(starter.competitions), customTeams: parsed.customTeams || [],
        customPacks: parsed.customPacks || [], activeTournament: parsed.activeTournament || null };
  }catch{ return structuredClone(starter); }
}
function save(){ localStorage.setItem(STORAGE, JSON.stringify(data)); }
function slug(s){ return `${s}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
function team(name,power,source=""){ return { id:slug(name), name, power, source }; }
function shuffle(a){ return a.map(x=>[Math.random(),x]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]); }
function clamp(n,a,b){ return Math.max(a,Math.min(b,n)); }
function label(v){ return {low:"baixa",medium:"média",high:"alta",chaos:"caótica"}[v] || v; }
function formatLabel(f){ return {playoffs:"Mata-mata direto",groups:"Grupos + mata-mata",clubWorldCup:"Grupos + mata-mata",league:"Pontos corridos"}[f] || f; }
function pool(){
  const map = new Map();
  selectedPacks.forEach(k => {
    const p = allPacks()[k];
    if(p) p.teams.forEach(([name,power]) => map.set(slug(name), team(name,power,p.name)));
  });
  data.customTeams.forEach(t => map.set(t.id, t));
  return Array.from(map.values());
}
function allPacks(){
  const custom = {};
  (data.customPacks||[]).forEach(p=>custom[p.id]={name:p.name, icon:"🧩", teams:p.teams.map(t=>[t.name,t.power])});
  return {...packs, ...custom};
}
function rankEntries(obj){ return Object.entries(obj).sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0])); }
function medal(i){ return i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}.`; }


function isFinalStage(stage){ return String(stage||"").trim().toLowerCase()==="final"; }
function safeId(s){ return String(s||"").replace(/[^a-zA-Z0-9_-]/g,"_"); }
function currentLeagueRoundIndex(t){
  const rounds=t?.league?.rounds||[];
  const i=rounds.findIndex(r=>r.matches.some(m=>!m.played));
  return i>=0 ? i : Math.max(0,rounds.length-1);
}
function currentGroupRoundName(t){
  const matches=(t?.groups||[]).flatMap(g=>g.matches||[]);
  const unplayed=matches.find(m=>!m.played);
  const any=unplayed || matches[0];
  return (any?.stage.match(/Rodada \d+/)||["Rodada 1"])[0];
}
function setLeagueRound(idx){ selectedLeagueRound=Number(idx); renderTournament(); }
function setGroupRound(name){ selectedGroupRound=name; renderTournament(); }
function roundNav(kind,currentIndex,total){
  const prev=Math.max(0,currentIndex-1), next=Math.min(total-1,currentIndex+1);
  return `<div class="round-selector"><button ${currentIndex<=0?"disabled":""} data-${kind}-round="${prev}">← anterior</button><select data-${kind}-select>${Array.from({length:total},(_,i)=>`<option value="${i}" ${i===currentIndex?"selected":""}>Rodada ${i+1}</option>`).join("")}</select><button ${currentIndex>=total-1?"disabled":""} data-${kind}-round="${next}">próxima →</button></div>`;
}

function isPowerOfTwo(n){ return n>0 && (n & (n-1))===0; }
function prevPowerOfTwo(n){ let p=1; while(p*2<n) p*=2; return p; }
function tieCriteria(c){
  const preset=c?.tiePreset || "brasileirao";
  const map={
    brasileirao:["pts","w","gd","gf","gaAsc","draw"],
    grupos:["pts","gd","gf","w","gaAsc","draw"],
    defensivo:["pts","w","gd","gaAsc","gf","draw"]
  };
  return map[preset] || map.brasileirao;
}
function compareRows(a,b,cfg){
  for(const key of tieCriteria(cfg)){
    if(key==="pts" && b.pts!==a.pts) return b.pts-a.pts;
    if(key==="w" && b.w!==a.w) return b.w-a.w;
    if(key==="gd" && b.gd!==a.gd) return b.gd-a.gd;
    if(key==="gf" && b.gf!==a.gf) return b.gf-a.gf;
    if(key==="gaAsc" && a.ga!==b.ga) return a.ga-b.ga;
  }
  return (a.sortSeed||0)-(b.sortSeed||0) || a.name.localeCompare(b.name);
}
function deltaBadge(v){
  if(v===undefined || v===null || v===0) return `<span class="pos-delta same">—</span>`;
  return v>0 ? `<span class="pos-delta up">▲ +${v}</span>` : `<span class="pos-delta down">▼ ${v}</span>`;
}
function snapshotPositions(t){
  const snap={groups:{},league:{}};
  (t.groups||[]).forEach(g=>(g.table.length?g.table:g.teams).forEach((x,i)=>snap.groups[x.id]=i+1));
  if(t.league) (t.league.table.length?t.league.table:t.league.teams).forEach((x,i)=>snap.league[x.id]=i+1);
  return snap;
}
function applyPositionDeltas(t,before){
  (t.groups||[]).forEach(g=>(g.table.length?g.table:g.teams).forEach((x,i)=>x.posDelta=(before.groups[x.id]||i+1)-(i+1)));
  if(t.league) (t.league.table.length?t.league.table:t.league.teams).forEach((x,i)=>x.posDelta=(before.league[x.id]||i+1)-(i+1));
}
function scoreCell(m,side){
  if(!m.played) return "-";
  const base=side==="home"?m.homeGoals:m.awayGoals;
  if(m.pens) return `${base} <small>(${side==="home"?m.pens.a:m.pens.b})</small>`;
  return base;
}
function decisionLabel(m){
  if(!m.played) return "Aguardando simulação";
  const ap=(m.meta||"").toLowerCase().includes("prorrog") || (m.meta||"").includes("A.P.");
  const pen=!!m.pens || (m.meta||"").toLowerCase().includes("pênaltis");
  if(ap && pen) return "A.P. + Pênaltis";
  if(pen) return "Pênaltis";
  if(ap) return "A.P.";
  return m.meta || "";
}


function go(screen){
  $$(".screen").forEach(s=>s.classList.toggle("active",s.id===screen));
  $$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.go===screen));
  const titles = {home:["0.7.8","Início"],create:["Novo","Criar torneio"],teamPicker:["Times","Selecionar times"],groupBuilder:["Grupos","Montar grupos"],tournament:["Simulação","Torneio atual"],competitions:["Histórico","Campeonatos"],competitionDetail:["Central","Estatísticas"],teams:["Participantes","Times"],settings:["Ajustes","Configurações"]};
  $("#pageSubtitle").textContent = titles[screen]?.[0] || "Brocket";
  $("#pageTitle").textContent = titles[screen]?.[1] || "Brocket";
  window.scrollTo(0,0);
  renderAll();
}

document.addEventListener("click", e=>{
  const leagueRound=e.target.closest("[data-league-round]"); if(leagueRound){ setLeagueRound(leagueRound.dataset.leagueRound); return; }
  const groupRound=e.target.closest("[data-group-round]"); if(groupRound){ const t=data.activeTournament; const stages=[...new Set((t?.groups||[]).flatMap(g=>g.matches.map(m=>(m.stage.match(/Rodada \d+/)||["Rodada 1"])[0])))]; setGroupRound(stages[Number(groupRound.dataset.groupRound)]||stages[0]); return; }
  const nav = e.target.closest("[data-go]"); if(nav){ go(nav.dataset.go); return; }
  const comp = e.target.closest("[data-comp]"); if(comp){ openCompetition(comp.dataset.comp); return; }
  const quickComp = e.target.closest("#quickCreateCompetition"); if(quickComp){ $("#competitionForm").hidden=false; return; }
  const remGroup=e.target.closest("[data-remove-from-group]"); if(remGroup){ manualGroups?.forEach(g=>{ const idx=g.findIndex(x=>x.id===remGroup.dataset.removeFromGroup); if(idx>=0) g.splice(idx,1); }); renderManualGroups(); return; }
  const sim = e.target.closest("[data-sim]"); if(sim){ simulateMatch(sim.dataset.sim); return; }
  const editMatch=e.target.closest("[data-edit-match]"); if(editMatch){ openManualResult(editMatch.dataset.editMatch); return; }
  const delEdition = e.target.closest("[data-delete-edition]"); if(delEdition){ deleteEdition(delEdition.dataset.deleteEdition); return; }
  const delCustom = e.target.closest("[data-delete-custom]"); if(delCustom){ deleteCustomTeam(delCustom.dataset.deleteCustom); return; }
  const delPack = e.target.closest("[data-delete-pack]"); if(delPack){ data.customPacks=(data.customPacks||[]).filter(p=>p.id!==delPack.dataset.deletePack); selectedPacks.delete(delPack.dataset.deletePack); save(); renderAll(); return; }
  const toggleTeam = e.target.closest("[data-toggle-team]"); if(toggleTeam){ const id=toggleTeam.dataset.toggleTeam; const t=pool().find(x=>x.id===id); if(!t) return; isSelected(id)?removeTeam(id):addTeam(t); renderSelected(); return; }
  const removeBtn = e.target.closest("[data-remove-team]"); if(removeBtn){ removeTeam(removeBtn.dataset.removeTeam); renderSelected(); return; }
});

function renderAll(){ renderCompetitions(); renderCompetitionSelect(); renderPacks(); renderSelected(); renderCustomTeams(); renderCustomPacks(); renderManualGroups(); toggleRuleVisibility(); renderTournament(); }
function renderCompetitionSelect(){
  const select=$("#competitionSelect"); if(!select) return;
  if(!data.competitions.length){ select.innerHTML=`<option value="">Nenhum campeonato criado</option>`; currentCompetitionId=null; return; }
  if(!currentCompetitionId || !data.competitions.some(c=>c.id===currentCompetitionId)) currentCompetitionId=data.competitions[0]?.id || null;
  select.innerHTML = data.competitions.map(c=>`<option value="${c.id}" ${c.id===currentCompetitionId?"selected":""}>${c.name}</option>`).join("");
}
function renderCompetitions(){
  const html = data.competitions.map(c=>{ const s=statsFor(c); return `<button class="list-card" data-comp="${c.id}"><div><strong>${c.name}</strong><small>${c.editions.length} edições • maior campeão: ${s.topChampion}</small></div><span class="pill">abrir</span></button>`; }).join("");
  const emptyHome = `<div class="empty-card"><strong>Nenhum campeonato criado</strong><small>Crie um campeonato para guardar várias edições e estatísticas históricas.</small><button class="primary" data-go="competitions">Criar campeonato</button></div>`;
  const emptyList = `<div class="empty-card"><strong>Nenhum campeonato criado</strong><small>Você também pode criar um torneio único sem salvar no histórico.</small><button class="primary" id="quickCreateCompetition">Criar campeonato</button></div>`;
  $("#competitionList").innerHTML = html || emptyList;
  $("#homeCompetitions").innerHTML = html || emptyHome;
}
function openCompetition(id){ currentCompetitionId=id; const c=data.competitions.find(x=>x.id===id); if(!c) return; $("#competitionTitle").textContent=c.name; $("#editCompetitionName").value=c.name; renderCompetitionDetail(c); go("competitionDetail"); }

function renderPacks(){
  $("#packList").innerHTML = Object.entries(allPacks()).map(([key,p])=>`<label class="pack"><input type="checkbox" data-pack="${key}" ${selectedPacks.has(key)?"checked":""}/><span>${p.icon}</span><div><strong>${p.name}</strong><small>${p.teams.length} times</small></div></label>`).join("");
  const pc=$("#poolCount"); if(pc) pc.textContent = `${pool().length} disponíveis`;
  renderQuotas();
  renderAvailableTeams();
  renderDrawPreview();
}
function renderQuotas(){
  const keys=[...selectedPacks];
  if(!$("#quotaList")) return;
  $("#quotaList").innerHTML = keys.map(k=>`<label class="quota-box"><span>${allPacks()[k]?.icon||"🧩"} ${allPacks()[k]?.name||k}</span><input type="number" min="0" max="${allPacks()[k]?.teams.length||99}" value="0" data-quota="${k}" /></label>`).join("") || `<div class="empty-inline">Marque pacotes para definir quantidades.</div>`;
}
function filteredPool(){
  const q=teamSearch.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  return pool().filter(t=>{
    const name=t.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    const okSearch=!q || name.includes(q) || (t.source||"").toLowerCase().includes(q);
    const p=t.power||70;
    const okPower=powerFilter==="all" || (powerFilter==="elite"&&p>=90) || (powerFilter==="strong"&&p>=80&&p<90) || (powerFilter==="medium"&&p>=70&&p<80) || (powerFilter==="low"&&p<70);
    return okSearch && okPower;
  }).sort((a,b)=>b.power-a.power || a.name.localeCompare(b.name));
}
function isSelected(id){ return selectedTeams.some(t=>t.id===id); }
function addTeam(t){
  const need=Number($("#teamCount").value);
  if(isSelected(t.id)) return;
  if(selectedTeams.length>=need){ alert(`O torneio já tem ${need} times selecionados.`); return; }
  selectedTeams.push({...t});
  previewOrder=null;
}
function removeTeam(id){ selectedTeams=selectedTeams.filter(t=>t.id!==id); previewOrder=null; }
function renderAvailableTeams(){
  const list=filteredPool(), need=Number($("#teamCount").value);
  const ac=$("#availableCount"); if(ac) ac.textContent = `${list.length} filtrados`;
  if($("#availableTeams")) $("#availableTeams").innerHTML = list.map(t=>{
    const checked=isSelected(t.id);
    return `<button class="team-pick ${checked?"chosen":""}" data-toggle-team="${t.id}">
      <span class="pick-dot">${checked?"✓":"+"}</span>
      <div><strong>${t.name}</strong><small>${t.source || "Meu time"} • força ${t.power}</small></div>
    </button>`;
  }).join("") || `<div class="team-row"><small>Nenhum time encontrado.</small></div>`;
}
function renderSelected(){
  const need = Number($("#teamCount").value);
  const countText = `${selectedTeams.length}/${need}`;
  const sc=$("#selectedCount"); if(sc) sc.textContent = countText;
  const mc=$("#manualSelectedCount"); if(mc) mc.textContent = countText;
  const summary = selectedTeams.slice(0,6).map(t=>`<div class="team-row selected-row">
    <div><strong>${t.name}</strong><small>${t.source || "personalizado"} • força ${t.power}</small></div>
  </div>`).join("") + (selectedTeams.length>6 ? `<div class="team-row"><small>+ ${selectedTeams.length-6} times selecionados</small></div>` : "");
  const full = selectedTeams.map(t=>`<div class="team-row selected-row">
    <div><strong>${t.name}</strong><small>${t.source || "personalizado"}</small></div>
    <div class="selected-actions">
      <label class="power-edit">Força <input type="number" min="1" max="100" value="${t.power}" data-power-team="${t.id}" /></label>
      <button class="mini-danger" data-remove-team="${t.id}">remover</button>
    </div>
  </div>`).join("") || `<div class="team-row"><small>Nenhum time selecionado.</small></div>`;
  const st=$("#selectedTeams"); if(st) st.innerHTML = summary || `<div class="team-row"><small>Nenhum time selecionado.</small></div>`;
  const mst=$("#manualSelectedTeams"); if(mst) mst.innerHTML = full;
  renderAvailableTeams();
  renderDrawPreview();
}
function renderCustomTeams(){
  $("#customTeamList").innerHTML = data.customTeams.map(t=>`<div class="team-row"><div><strong>${t.name}</strong><small>Time criado • força ${t.power}</small></div><button class="danger mini-danger" data-delete-custom="${t.id}">apagar</button></div>`).join("") || `<div class="team-row"><small>Nenhum time criado.</small></div>`;
}

function renderCustomPacks(){
  const box=$("#customPackList"); if(!box) return;
  box.innerHTML=(data.customPacks||[]).map(p=>`<div class="team-row"><div><strong>${p.name}</strong><small>${p.teams.length} times</small></div><button class="danger mini-danger" data-delete-pack="${p.id}">apagar</button></div>`).join("") || `<div class="team-row"><small>Nenhum pacote criado.</small></div>`;
}
function addCustomPack(){
  const name=$("#customPackName")?.value.trim();
  const raw=$("#customPackTeams")?.value.trim();
  if(!name || !raw){ alert("Informe o nome do pacote e os times."); return; }
  const teams=raw.split(/\n+/).map(line=>{
    const [n,p]=line.split(",").map(x=>x?.trim());
    return n ? {name:n, power:clamp(Number(p)||70,1,100)} : null;
  }).filter(Boolean);
  if(!teams.length){ alert("Adicione pelo menos um time."); return; }
  data.customPacks ||= [];
  data.customPacks.push({id:"pack_"+slug(name)+"_"+Date.now(), name, teams});
  $("#customPackName").value=""; $("#customPackTeams").value="";
  save(); renderAll();
}


function teamCountOptionsForFormat(format){
  return format==="league" ? [4,6,8,10,12,16,20,24] : [4,6,8,10,12,16,20,24,32,36,40,48];
}
function refreshTeamCountOptions(){
  const sel=$("#teamCount"); if(!sel) return;
  const f=$("#formatSelect")?.value || "playoffs";
  const current=Number(sel.value)||16;
  const opts=teamCountOptionsForFormat(f);
  let next=opts.includes(current) ? current : opts.at(-1);
  if(f==="league" && next>24) next=24;
  sel.innerHTML=opts.map(n=>`<option value="${n}" ${n===next?"selected":""}>${n}</option>`).join("");
  sel.value=String(next);
  if(selectedTeams.length>next) selectedTeams=selectedTeams.slice(0,next);
  if(f==="groups" && next===48 && $("#groupSize")) $("#groupSize").value="4";
  renderSelected();
}
function toggleRuleVisibility(){
  refreshTeamCountOptions();
  const f=$("#formatSelect").value;
  $$("[data-rule-for]").forEach(el=>{
    const applies=el.dataset.ruleFor.split(" ").includes("all") || el.dataset.ruleFor.split(" ").includes(f);
    el.hidden=!applies;
  });
  const hints={
    playoffs:"Modelo de eliminação direta. Ideal para copas rápidas.",
    groups:"Grupos primeiro, mata-mata depois. Ideal para Mundial, Champions clássica e torneios mistos.",
    clubWorldCup:"Modelo de clubes globais com grupos e mata-mata.",
    league:"Todos contra todos em pontos corridos."
  };
  const hint=$("#ruleHint"); if(hint) hint.textContent=hints[f]||"ajustadas pelo modelo";
  previewOrder=null; renderDrawPreview();
}

function pickStrongest(){ selectedTeams = pool().sort((a,b)=>b.power-a.power).slice(0,Number($("#teamCount").value)); previewOrder=null; renderSelected(); }
function pickRandom(){ selectedTeams = shuffle(pool()).slice(0,Number($("#teamCount").value)); previewOrder=null; renderSelected(); }
function pickBalanced(){
  const need=Number($("#teamCount").value), sorted=pool().sort((a,b)=>b.power-a.power);
  const tiers=[sorted.slice(0,Math.ceil(sorted.length*.25)),sorted.slice(Math.ceil(sorted.length*.25),Math.ceil(sorted.length*.55)),sorted.slice(Math.ceil(sorted.length*.55),Math.ceil(sorted.length*.8)),sorted.slice(Math.ceil(sorted.length*.8))].map(shuffle);
  const quota=[Math.ceil(need*.30),Math.ceil(need*.35),Math.ceil(need*.25),need];
  const out=[]; tiers.forEach((tier,i)=>out.push(...tier.slice(0,quota[i])));
  selectedTeams = shuffle([...new Map(out.map(t=>[t.id,t])).values()]).slice(0,need);
  while(selectedTeams.length<need && sorted.length>selectedTeams.length){ const next=shuffle(sorted).find(t=>!selectedTeams.some(x=>x.id===t.id)); if(!next) break; selectedTeams.push(next); }
  previewOrder=null; renderSelected();
}
function fillMissing(mode="random"){
  const need=Number($("#teamCount").value);
  const candidates=(mode==="strongest"?pool().sort((a,b)=>b.power-a.power):shuffle(pool())).filter(t=>!isSelected(t.id));
  for(const t of candidates){ if(selectedTeams.length>=need) break; selectedTeams.push({...t}); }
  previewOrder=null; renderSelected();
}
function selectVisibleTeams(){
  const need=Number($("#teamCount").value);
  for(const t of filteredPool()){ if(selectedTeams.length>=need) break; addTeam(t); }
  renderSelected();
}
function applyQuotas(){
  const need=Number($("#teamCount").value);
  selectedTeams=[];
  $$("[data-quota]").forEach(inp=>{
    const key=inp.dataset.quota, count=Math.max(0,Number(inp.value)||0);
    const pack=allPacks()[key]; if(!pack) return; const chosen=shuffle(pack.teams.map(([name,power])=>team(name,power,pack.name))).slice(0,count);
    chosen.forEach(t=>{ if(selectedTeams.length<need && !isSelected(t.id)) selectedTeams.push(t); });
  });
  previewOrder=null; renderSelected();
}


function clearManualGroupsIfAny(){
  if(data.manualGroups?.length){
    data.manualGroups=[];
    save();
    toast("Montagem manual dos grupos limpa para evitar conflito com o novo preset.");
  }
}

function cfg(){
  const format=$("#formatSelect").value;
  let teamCount=Number($("#teamCount").value);
  if(format==="league" && teamCount>24) teamCount=24;
  const copa48 = format==="groups" && teamCount===48;
  return { id:uid(), name:$("#editionName").value.trim()||"Torneio", saveMode:document.querySelector('input[name="saveMode"]:checked')?.value || "single", competitionId:$("#competitionSelect")?.value || "", format, teamCount, legs:$("#knockoutLegs").value, finalRule:$("#finalRule").value, upset:$("#upsetLevel").value, realism:$("#scoreRealism").value, extraTime:$("#extraTime").checked, penalties:$("#penalties").checked, awayGoals:$("#awayGoals").checked, leagueTurns:$("#leagueTurns").value, groupTurns:$("#groupTurns").value, groupSize:copa48?4:Number($("#groupSize").value), bracketShuffle:$("#bracketShuffle").value, groupShuffle:$("#groupShuffle").value, tiePreset:$("#tiePreset")?.value || "brasileirao" };
}
function generateTournament(){
  const c=cfg();
  if(c.format==="league" && c.teamCount>24){ alert("Pontos corridos permite até 24 times."); refreshTeamCountOptions(); return; }
  if(c.saveMode==="history" && !c.competitionId){ alert("Crie ou selecione um campeonato para salvar no histórico."); return; }
  if(selectedTeams.length<c.teamCount){ alert(`Selecione ${c.teamCount} times.`); return; }
  if(c.format==="groups" && manualGroups){ const okManual=manualGroups.flat().length===c.teamCount && manualGroups.every(g=>g.length===Number(c.groupSize)); if(!okManual){ alert("A montagem manual precisa usar todos os times e completar todos os grupos. Use Limpar montagem para sortear automaticamente."); return; } }
  let teams = getPreviewOrder(c).slice(0,c.teamCount).map(t=>({...t}));
  const t = { id:uid(), cfg:c, teams, status:"running", saved:false, champion:null, runnerUp:null, groups:[], knockout:[], league:null, currentStage:"", createdAt:new Date().toISOString() };
  if(c.format==="league") setupLeague(t);
  else if(c.format==="playoffs") setupKnockout(t, teams, "Mata-mata");
  else setupGroups(t);
  data.activeTournament=t; save(); renderTournament(); go("tournament");
}
function getPreviewOrder(c=cfg()){
  const need=c.teamCount;
  if(previewOrder && previewOrder.length===need && previewOrder.every((t,i)=>selectedTeams.some(x=>x.id===t.id))) return previewOrder;
  let teams=selectedTeams.slice(0,need).map(t=>({...t}));
  if(c.format==="playoffs") teams=orderForBracket(teams,c);
  else if(c.format==="groups" || c.format==="clubWorldCup") teams=orderForGroups(teams,c);
  else teams=shuffle(teams);
  previewOrder=teams;
  return teams;
}
function reshufflePreview(){ previewSeed++; previewOrder=null; renderDrawPreview(); }
function previewAdjustmentText(c, ordered){
  if(c.format!=="groups") return "";
  if(Number(c.teamCount)===48 && Number(c.groupSize)===4){
    return `<div class="preview-card auto-adjust"><strong>Formato Copa 48 aplicado</strong><small>12 grupos de 4.</small><small>Classificam 1º, 2º e os 8 melhores terceiros.</small><small>Mata-mata começa com 32 times.</small></div>`;
  }
  const groups=Math.ceil(ordered.length/c.groupSize);
  const classified=groups*2;
  if(isPowerOfTwo(classified)) return "";
  const target=prevPowerOfTwo(classified), prelimMatches=classified-target, prelimTeams=prelimMatches*2, byes=classified-prelimTeams;
  return `<div class="preview-card auto-adjust"><strong>Ajuste automático do mata-mata</strong><small>${classified} classificados não fecham uma chave perfeita.</small><small>${byes} melhores campanhas entram direto.</small><small>${prelimTeams} piores campanhas jogam Rodada preliminar.</small><small>Confrontos da preliminar serão sorteados.</small></div>`;
}
function renderDrawPreview(){
  const box=$("#drawPreview"); if(!box) return;
  const c=cfg(), need=c.teamCount;
  if(selectedTeams.length<need){ box.innerHTML=`<div class="empty-inline">Selecione ${need} times para ver a prévia.</div>`; return; }
  const ordered=getPreviewOrder(c);
  if(c.format==="groups" || c.format==="clubWorldCup"){
    const gs=c.groupSize, chunks=[];
    for(let i=0;i<ordered.length;i+=gs) chunks.push(ordered.slice(i,i+gs));
    box.innerHTML=`<div class="preview-grid">${chunks.map((g,i)=>`<div class="preview-card"><strong>Grupo ${String.fromCharCode(65+i)}</strong>${g.map(t=>`<small>${t.name}</small>`).join("")}</div>`).join("")}${previewAdjustmentText(c,ordered)}</div>`;
  }else if(c.format==="playoffs"){
    const pairs=[]; for(let i=0;i<ordered.length;i+=2) pairs.push([ordered[i],ordered[i+1]]);
    const adj=!isPowerOfTwo(ordered.length)?`<div class="preview-card auto-adjust"><strong>Rodada preliminar</strong><small>${ordered.length} times não fecham chave perfeita.</small><small>O Brocket criará uma preliminar automática.</small></div>`:"";
    box.innerHTML=`<div class="preview-grid">${pairs.map((p,i)=>`<div class="preview-card"><strong>Jogo ${i+1}</strong><small>${p[0]?.name||"—"} x ${p[1]?.name||"—"}</small></div>`).join("")}${adj}</div>`;
  }else{
    box.innerHTML=`<div class="preview-grid"><div class="preview-card"><strong>Liga</strong><small>${ordered.length} times em tabela de pontos corridos</small></div></div>`;
  }
}
function orderForBracket(teams,c){
  if(c.bracketShuffle==="strength"){
    const s=[...teams].sort((a,b)=>b.power-a.power), out=[]; while(s.length){ out.push(s.shift()); if(s.length) out.push(s.pop()); } return out;
  }
  return shuffle(teams);
}
function orderForGroups(teams,c){
  if(c.groupShuffle==="balanced"){
    const sorted=[...teams].sort((a,b)=>b.power-a.power), gs=Math.ceil(teams.length/c.groupSize), groups=Array.from({length:gs},()=>[]);
    sorted.forEach((t,i)=>groups[i%gs].push(t)); return shuffle(groups.map(g=>shuffle(g))).flat();
  }
  return shuffle(teams);
}
function blankStats(t){ return {...t, pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,sortSeed:Math.random()}; }
function roundRobinSchedule(rows, groupName, double=false){
  const arr=[...rows];
  if(arr.length%2) arr.push(null);
  const n=arr.length, rounds=[];
  for(let r=0;r<n-1;r++){
    const matches=[];
    for(let i=0;i<n/2;i++){
      const a=arr[i], b=arr[n-1-i];
      if(a&&b) matches.push(newMatch(a,b,`Grupo ${groupName} - Rodada ${r+1}`,true));
    }
    rounds.push(shuffle(matches));
    arr.splice(1,0,arr.pop());
  }
  if(double){
    const baseLen=rounds.length;
    const second=rounds.map((matches,idx)=>matches.map(m=>newMatch(m.away,m.home,`Grupo ${groupName} - Rodada ${baseLen+idx+1}`,true)));
    rounds.push(...second);
  }
  return rounds.flat();
}
function roundRobinSchedule(rows, groupName, double=false){
  const arr=[...rows]; if(arr.length%2) arr.push(null);
  const n=arr.length, rounds=[];
  for(let r=0;r<n-1;r++){
    const matches=[];
    for(let i=0;i<n/2;i++){ const a=arr[i], b=arr[n-1-i]; if(a&&b) matches.push(newMatch(a,b,`Grupo ${groupName} - Rodada ${r+1}`,true)); }
    rounds.push(shuffle(matches)); arr.splice(1,0,arr.pop());
  }
  if(double){ const baseLen=rounds.length; rounds.push(...rounds.slice(0,baseLen).map((matches,idx)=>matches.map(m=>newMatch(m.away,m.home,`Grupo ${groupName} - Rodada ${baseLen+idx+1}`,true)))); }
  return rounds.flat();
}
function setupGroups(t){
  const c=t.cfg, ordered=[...t.teams], gs=c.groupSize;
  let manual = Array.isArray(manualGroups) ? manualGroups : null;
  for(let i=0;i<ordered.length;i+=gs){
    const idx=i/gs;
    const source = manual ? manual[idx]||[] : ordered.slice(i,i+gs);
    const g={ name:String.fromCharCode(65+idx), teams:source.map((team,seed)=>({...blankStats(team),sortSeed:idx*100+seed})), matches:[], table:[] };
    g.matches=roundRobinSchedule(g.teams,g.name,c.groupTurns==="double");
    g.table=[...g.teams]; t.groups.push(g);
  }
  t.currentStage="groups";
}
function setupKnockout(t, orderedTeams, title="Mata-mata"){
  const teams=orderedTeams.filter(Boolean);
  if(teams.length<2) return;
  if(isPowerOfTwo(teams.length)){
    const r={ name:roundName(teams.length), matches:[] };
    for(let i=0;i<teams.length;i+=2) r.matches.push(newMatch(teams[i],teams[i+1],r.name,false));
    t.knockout=[r]; t.currentStage="knockout"; t.autoAdjustment=null; return;
  }
  const target=prevPowerOfTwo(teams.length), prelimMatches=teams.length-target, prelimTeamsCount=prelimMatches*2;
  const byes=teams.slice(0,teams.length-prelimTeamsCount), prelimTeams=shuffle(teams.slice(teams.length-prelimTeamsCount));
  const r={ name:"Rodada preliminar", matches:[], byes };
  for(let i=0;i<prelimTeams.length;i+=2) r.matches.push(newMatch(prelimTeams[i],prelimTeams[i+1],"Rodada preliminar",false));
  t.knockout=[r]; t.currentStage="knockout"; t.autoAdjustment={classified:teams.length,target,byes:byes.length,prelimTeams:prelimTeams.length,prelimWinners:prelimMatches};
}
function setupLeague(t){
  const teams=t.teams.map(blankStats), rounds=[], base=[...teams];
  if(base.length%2) base.push(null);
  const n=base.length;
  for(let r=0;r<n-1;r++){
    const matches=[];
    for(let i=0;i<n/2;i++){ const a=base[i], b=base[n-1-i]; if(a&&b) matches.push(newMatch(a,b,`Rodada ${r+1}`,true)); }
    rounds.push({name:`Rodada ${r+1}`,matches:shuffle(matches)});
    base.splice(1,0,base.pop());
  }
  if(t.cfg.leagueTurns==="double"){
    const second=rounds.map((r,i)=>({name:`Rodada ${rounds.length+i+1}`,matches:r.matches.map(m=>newMatch(m.away,m.home,`Rodada ${rounds.length+i+1}`,true))}));
    rounds.push(...second);
  }
  t.league={teams,table:[...teams],rounds}; t.currentStage="league";
}
function newMatch(home,away,stage,allowDraw){ return { id:uid(), home, away, stage, allowDraw, played:false, homeGoals:null, awayGoals:null, winner:null, loser:null, meta:"" }; }
function roundName(size){ return size===2?"Final":size===4?"Semifinal":size===8?"Quartas":size===16?"Oitavas":`Fase ${size}`; }

function allTournamentMatches(t){ return [...(t.league?.rounds||[]).flatMap(r=>r.matches), ...(t.groups||[]).flatMap(g=>g.matches), ...(t.knockout||[]).flatMap(r=>r.matches)]; }
function nextPlayable(t){ return allTournamentMatches(t).find(m=>!m.played); }
function simulateNext(){ const t=data.activeTournament; const m=nextPlayable(t); if(m){ const before=snapshotPositions(t); simulateMatch(m.id); applyPositionDeltas(t,before); save(); renderTournament(); } }
function currentRoundMatches(t){
  if(!t) return [];
  if(t.currentStage==="league"){
    const r=(t.league?.rounds||[]).find(r=>r.matches.some(m=>!m.played));
    return r ? r.matches.filter(m=>!m.played) : [];
  }
  if(t.currentStage==="groups"){
    const all=t.groups.flatMap(g=>g.matches.filter(m=>!m.played));
    if(!all.length) return [];
    const rodada=(all[0].stage.match(/Rodada \d+/)||["Rodada 1"])[0];
    return all.filter(m=>m.stage.includes(rodada));
  }
  if(t.currentStage==="knockout"){
    const r=(t.knockout||[]).find(r=>r.matches.some(m=>!m.played));
    return r ? r.matches.filter(m=>!m.played) : [];
  }
  return [];
}
function simulateRound(){
  const t=data.activeTournament; if(!t || t.status==="finished") return;
  const before=snapshotPositions(t);
  const ids=currentRoundMatches(t).map(m=>m.id);
  ids.forEach(id=>simulateMatch(id, {deferAdvance:true}));
  advanceIfNeeded(t); applyPositionDeltas(t,before);
  save(); renderTournament();
}
function simulateAll(){
  const t=data.activeTournament; if(!t || t.status==="finished") return;
  let guard=0;
  while(t.status!=="finished" && nextPlayable(t) && guard<2000){
    simulateMatch(nextPlayable(t).id, {deferAdvance:true});
    advanceIfNeeded(t);
    guard++;
  }
  (t.groups||[]).forEach(g=>g.teams.forEach(x=>x.posDelta=0));
  if(t.league) t.league.teams.forEach(x=>x.posDelta=0);
  save(); renderTournament();
}
function simulateMatch(id, opts={}){
  const t=data.activeTournament; if(!t || t.status==="finished") return;
  const m=allTournamentMatches(t).find(x=>x.id===id); if(!m || m.played) return;
  const result = m.allowDraw ? playGroupOrLeague(m.home,m.away,t.cfg) : playKnockout(m.home,m.away,t.cfg, m.stage==="Final");
  Object.assign(m,result,{played:true});
  if(t.currentStage==="league") updateLeagueTable(t,m);
  if(t.currentStage==="groups") updateGroupTable(t,m);
  if(!opts.deferAdvance) advanceIfNeeded(t); save(); if(!opts.deferAdvance) renderTournament();
}
function rankedQualifiedFromGroups(t){
  t.groups.forEach(g=>sortGroup(g,t.cfg));
  const q=[];
  const isCopa48 = Number(t.cfg.teamCount)===48 && Number(t.cfg.groupSize)===4 && (t.cfg.format==="groups" || t.cfg.format==="clubWorldCup") && t.groups.length===12;
  if(isCopa48){
    t.groups.forEach(g=>{
      g.table.slice(0,2).forEach((tm,i)=>q.push({...tm, group:g.name, pos:i+1}));
    });
    const thirds=[];
    t.groups.forEach(g=>{
      if(g.table[2]) thirds.push({...g.table[2], group:g.name, pos:3});
    });
    thirds.sort((a,b)=>compareRows(a,b,t.cfg));
    thirds.slice(0,8).forEach(tm=>q.push(tm));
    q.sort((a,b)=> a.pos-b.pos || compareRows(a,b,t.cfg));
    q.forEach((x,i)=>x.sortSeed=i+1);
    t.autoAdjustment={copa48:true, classified:32, groups:12, thirdPlaced:8};
    return q;
  }
  t.groups.forEach(g=>g.table.slice(0,2).forEach((tm,i)=>q.push({...tm, group:g.name, pos:i+1})));
  q.sort((a,b)=> a.pos-b.pos || compareRows(a,b,t.cfg));
  q.forEach((x,i)=>x.sortSeed=i+1);
  return q;
}
function advanceIfNeeded(t){
  if(t.currentStage==="groups" && t.groups.every(g=>g.matches.every(m=>m.played))){
    setupKnockout(t, rankedQualifiedFromGroups(t), "Mata-mata");
  }
  if(t.currentStage==="knockout"){
    const last=t.knockout.at(-1); if(last && last.matches.every(m=>m.played)){
      if(last.matches.length===1 && !last.byes?.length){ finishTournament(t,last.matches[0]); return; }
      let winners=last.matches.map(m=>m.winner).filter(Boolean);
      if(last.byes?.length) winners=shuffle([...last.byes,...winners]);
      const r={ name:roundName(winners.length), matches:[] };
      for(let i=0;i<winners.length;i+=2) r.matches.push(newMatch(winners[i],winners[i+1],r.name,false));
      t.knockout.push(r);
    }
  }
  if(t.currentStage==="league" && t.league.rounds.every(r=>r.matches.every(m=>m.played))){
    sortLeague(t); const champ=t.league.table[0], vice=t.league.table[1]; finishTournament(t,{winner:champ, loser:vice, home:champ, away:vice, homeGoals:0, awayGoals:0, meta:"pontos corridos"});
  }
}
function finishTournament(t, finalMatch){
  t.status="finished"; t.champion=finalMatch.winner.name; t.runnerUp=finalMatch.loser?.name || "—"; t.finishedAt=new Date().toISOString();
  if(!t.saved){ saveEdition(t); t.saved=true; }
}
function playGroupOrLeague(a,b,c){ const r=playSingle(a,b,c,true); return {...r,winner:r.homeGoals===r.awayGoals?null:(r.homeGoals>r.awayGoals?a:b),loser:r.homeGoals===r.awayGoals?null:(r.homeGoals>r.awayGoals?b:a),meta:""}; }
function playKnockout(a,b,c,isFinal){
  const two = c.legs==="two" && !(isFinal && c.finalRule==="single");
  if(!two){
    let r=playSingle(a,b,c,false), hg=r.homeGoals, ag=r.awayGoals, meta="Jogo único";
    if(hg===ag && c.extraTime){ const et=extraGoals(a,b,c); hg+=et.a; ag+=et.b; meta+=` • A.P.`; }
    if(hg===ag && c.penalties){ const p=pens(a,b); meta+=` • pênaltis ${p.a}-${p.b}`; const win=p.winA; return {homeGoals:hg,awayGoals:ag,winner:win?a:b,loser:win?b:a,meta,pens:p}; }
    const win=hg>=ag; return {homeGoals:hg,awayGoals:ag,winner:win?a:b,loser:win?b:a,meta};
  }

  const l1=playSingle(a,b,c,true), l2=playSingle(b,a,c,true);
  let l2Home=l2.homeGoals, l2Away=l2.awayGoals; // volta: casa é b, visitante é a
  let ga=l1.homeGoals+l2Away, gb=l1.awayGoals+l2Home;
  let usedET=false;

  if(ga===gb && c.awayGoals){
    const awayA=l2Away, awayB=l1.awayGoals;
    if(awayA!==awayB){
      const meta=`Ida ${l1.homeGoals}-${l1.awayGoals} • Volta ${l2Home}-${l2Away} • Agregado ${ga}-${gb} • gol fora`;
      const win=awayA>awayB;
      return {homeGoals:ga,awayGoals:gb,winner:win?a:b,loser:win?b:a,meta};
    }
  }

  if(ga===gb && c.extraTime){
    const et=extraGoals(a,b,c);
    l2Away+=et.a;
    l2Home+=et.b;
    ga+=et.a;
    gb+=et.b;
    usedET=true;
  }

  let meta=`Ida ${l1.homeGoals}-${l1.awayGoals} • Volta ${l2Home}-${l2Away}${usedET?" • A.P.":""} • Agregado ${ga}-${gb}`;

  if(ga===gb && c.penalties){
    const p=pens(a,b);
    meta+=` • pênaltis ${p.a}-${p.b}`;
    const win=p.winA;
    return {homeGoals:ga,awayGoals:gb,winner:win?a:b,loser:win?b:a,meta,pens:p};
  }
  const win=ga>=gb;
  return {homeGoals:ga,awayGoals:gb,winner:win?a:b,loser:win?b:a,meta};
}
function playSingle(a,b,c,allowDraw){
  const diff=(a.power||70)-(b.power||70);
  const rand={low:4,medium:7,high:17,chaos:38}[c.upset] ?? 9;
  const strengthDiv={low:8,medium:9,high:15,chaos:22}[c.upset] ?? 11;
  const base=c.realism==="chaotic"?1.72:c.realism==="normal"?1.30:1.00;
  const noise=(Math.random()*2-1)*(rand/24);
  const formA=diff/strengthDiv + noise;
  const formB=-diff/strengthDiv - noise;
  let hg=goals(base+formA,c.realism), ag=goals(base+formB,c.realism);
  if(!allowDraw && hg===ag && Math.random()<.55) (Math.random()+diff/160>.5)?hg++:ag++;
  return {homeGoals:clamp(hg,0,9),awayGoals:clamp(ag,0,9)};
}
function goals(x,realism){
  const boost=clamp(x-1,-.9,1.9), r=Math.random();
  let p = realism==="chaotic" ? [.12,.22,.25,.19,.11,.06,.03,.015] : [.25,.32,.24,.12,.05,.017,.006,.002];
  p=p.map((v,i)=>Math.max(0,v + (i>=3?boost*.025:-boost*.018)));
  let a=0; for(let i=0;i<p.length;i++){ a+=p[i]; if(r<a) return i; } return realism==="chaotic"?Math.floor(Math.random()*7):4;
}
function extraGoals(a,b,c){ const r=playSingle(a,b,{...c,realism:"realistic"},true); return {a:Math.min(2,r.homeGoals),b:Math.min(2,r.awayGoals)}; }
function pens(a,b){ const bias=((a.power||70)-(b.power||70))/220, winA=Math.random()+bias>.5, base=4+Math.floor(Math.random()*2); return winA?{a:base+1,b:base,winA:true}:{a:base,b:base+1,winA:false}; }
function updateLeagueTable(t,m){ applyStats(t.league.teams,m); sortLeague(t); }
function sortLeague(t){ t.league.teams.forEach(x=>x.gd=x.gf-x.ga); t.league.table=[...t.league.teams].sort((a,b)=>compareRows(a,b,t.cfg)); }
function updateGroupTable(t,m){ const g=t.groups.find(x=>x.matches.some(mm=>mm.id===m.id)); if(!g) return; applyStats(g.teams,m); sortGroup(g,t.cfg); }
function sortGroup(g,cfg=data.activeTournament?.cfg){ g.teams.forEach(x=>x.gd=x.gf-x.ga); g.table=[...g.teams].sort((a,b)=>compareRows(a,b,cfg)); }
function tableSort(a,b){ return compareRows(a,b,data.activeTournament?.cfg); }
function applyStats(rows,m){ const h=rows.find(x=>x.id===m.home.id), a=rows.find(x=>x.id===m.away.id); h.gf+=m.homeGoals; h.ga+=m.awayGoals; a.gf+=m.awayGoals; a.ga+=m.homeGoals; if(m.homeGoals>m.awayGoals){h.pts+=3;h.w++;a.l++;} else if(m.homeGoals<m.awayGoals){a.pts+=3;a.w++;h.l++;} else {h.pts++;a.pts++;h.d++;a.d++;} }


function recalcLeague(t){
  if(!t.league) return;
  t.league.teams.forEach(tm=>Object.assign(tm,{pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0}));
  t.league.rounds.flatMap(r=>r.matches).filter(m=>m.played).forEach(m=>applyStats(t.league.teams,m));
  sortLeague(t);
}
function renderManualGroups(){
  const area=$("#manualGroupsArea"); if(!area) return;
  const c=cfg(); const teams=getPreviewOrder(c).slice(0,c.teamCount);
  const count=Math.ceil(c.teamCount/c.groupSize);
  $("#groupBuilderCount").textContent=`${teams.length} times • ${count} grupos de ${c.groupSize}`;
  if(c.format!=="groups"){
    area.innerHTML=`<div class="empty-card"><strong>Montagem manual disponível apenas em grupos</strong><small>Volte e escolha Grupos + mata-mata.</small></div>`;
    return;
  }
  if(!manualGroups || manualGroups.length!==count){
    manualGroups=Array.from({length:count},()=>[]);
  }
  const allowedIds=new Set(teams.map(t=>t.id));
  manualGroups=manualGroups.map(g=>g.filter(t=>allowedIds.has(t.id)));
  const seen=new Set();
  manualGroups=manualGroups.map(g=>g.filter(t=>{ if(seen.has(t.id)) return false; seen.add(t.id); return true; }));
  const assigned=new Set(manualGroups.flat().map(t=>t.id));
  const free=teams.filter(t=>!assigned.has(t.id));
  const full=manualGroups.flat().length===teams.length && manualGroups.every(g=>g.length===Number(c.groupSize));
  const hint=full ? `<div class="auto-adjust-note ok-note"><strong>Grupos completos.</strong> Você já pode gerar o torneio.</div>` : `<div class="auto-adjust-note"><strong>Escolher times por grupo</strong><br>Use todos os ${teams.length} times. Cada grupo precisa ter ${c.groupSize} times.</div>`;
  area.innerHTML=`${hint}<div class="manual-groups-grid">${manualGroups.map((g,i)=>`<div class="group-card manual-group-card ${g.length===Number(c.groupSize)?"complete":"incomplete"}"><h3>Grupo ${String.fromCharCode(65+i)} <small>${g.length}/${c.groupSize}</small></h3>${g.map(t=>`<div class="team-row"><strong>${t.name}</strong><button class="mini-danger" data-remove-from-group="${t.id}">remover</button></div>`).join("") || `<small>Sem times.</small>`}${g.length<Number(c.groupSize) && free.length?`<select data-add-to-group="${i}"><option value="">Adicionar time...</option>${free.map(t=>`<option value="${t.id}">${t.name}</option>`).join("")}</select>`:""}</div>`).join("")}</div>`;
}
function autoFillManualGroups(){ const c=cfg(); const teams=getPreviewOrder(c).slice(0,c.teamCount); manualGroups=Array.from({length:Math.ceil(c.teamCount/c.groupSize)},(_,i)=>teams.filter((_,idx)=>Math.floor(idx/c.groupSize)===i)); renderManualGroups(); }
function clearManualGroups(){ manualGroups=null; renderManualGroups(); }


function deleteActiveTournament(){
  if(!data.activeTournament){
    toast("Não há torneio atual para apagar.");
    return;
  }
  const ok=confirm("Tem certeza que deseja apagar o torneio atual? Isso não apaga campeonatos, edições nem times personalizados.");
  if(!ok) return;
  data.activeTournament=null;
  selectedLeagueRound=null;
  selectedGroupRound=null;
  save();
  toast("Torneio atual apagado.");
  show("home");
}

function renderTournament(){
  const t=data.activeTournament;
  if(!t){
    $("#tournamentName").textContent="Nenhum torneio ativo";
    $("#tournamentFormat").textContent="Torneio atual";
    $("#tournamentActions").innerHTML="";
    $("#summaryBar").innerHTML="";
    $("#leagueArea").innerHTML=`<div class="empty-tournament"><h3>Nenhum torneio ativo</h3><p>Crie um torneio para começar a simular partida por partida, rodada por rodada ou tudo de uma vez.</p><button class="primary" data-go="create">Criar torneio</button></div>`;
    $("#groupsArea").innerHTML="";
    $("#bracketArea").innerHTML="";
    $("#knockoutTitle").style.display="none";
    return;
  }
  $("#tournamentName").textContent=t.cfg.name; $("#tournamentFormat").textContent=formatLabel(t.cfg.format);
  const next=nextPlayable(t);
  $("#tournamentActions").innerHTML = t.status==="finished"
    ? `<button class="play-btn dark">🏆 Torneio finalizado e salvo</button>`
    : `<button class="play-btn" id="simulateNext">Simular próxima partida</button><button class="play-btn" id="simulateRound">Simular rodada</button><button class="play-btn subtle" id="simulateAll">Simular tudo</button><button class="play-btn danger-lite" id="deleteActiveTournament">Apagar torneio</button><button class="play-btn dark" data-go="create">Criar outro</button>`;
  $("#summaryBar").innerHTML = t.status==="finished"
    ? `<div class="next-card"><small>Campeão</small><strong>🏆 ${t.champion}</strong></div>`
    : `<div class="next-card"><small>Próxima partida</small><strong>${next?`${next.home.name} x ${next.away.name}`:"aguardando"}</strong></div>`;
  renderLeague(t); renderGroups(t); renderBracket(t);
  const btn=$("#simulateNext"); if(btn) btn.onclick=simulateNext; const roundBtn=$("#simulateRound"); if(roundBtn) roundBtn.onclick=simulateRound; const allBtn=$("#simulateAll"); if(allBtn) allBtn.onclick=simulateAll; const delBtn=$("#deleteActiveTournament"); if(delBtn) delBtn.onclick=deleteActiveTournament;
}

function groupClassificationInfo(t){
  const isCopa48 = Number(t.cfg.teamCount)===48 && Number(t.cfg.groupSize)===4 && (t.cfg.format==="groups" || t.cfg.format==="clubWorldCup") && t.groups.length===12;
  const direct = [];
  const thirds = [];
  const thirdIds = new Set();
  if(isCopa48){
    t.groups.forEach(g=>{
      const table=g.table?.length?g.table:g.teams;
      table.slice(0,2).forEach((tm,i)=>direct.push({...tm, group:g.name, pos:i+1}));
      if(table[2]) thirds.push({...table[2], group:g.name, pos:3});
    });
    thirds.sort((a,b)=>compareRows(a,b,t.cfg));
    thirds.slice(0,8).forEach(x=>thirdIds.add(x.id));
  }else{
    t.groups.forEach(g=>{
      const table=g.table?.length?g.table:g.teams;
      table.slice(0,2).forEach((tm,i)=>direct.push({...tm, group:g.name, pos:i+1}));
    });
  }
  return {isCopa48,direct,thirds,thirdIds};
}
function groupRowTag(t,x,i,info){
  if(i<2) return `<span class="class-tag direct">Class.</span>`;
  if(info?.thirdIds?.has(x.id)) return `<span class="class-tag third">3º melhor</span>`;
  return "";
}
function renderQualifiedSummary(t){
  if(!t.groups?.length) return "";
  const info=groupClassificationInfo(t);
  if(info.isCopa48){
    return `<div class="qualified-box compact-qualified rule-only">
      <strong>Formato Copa 48</strong>
      <small>Classificam 1º e 2º de cada grupo + 8 melhores terceiros.</small>
    </div>`;
  }
  return "";
}

function renderLeague(t){
  if(!t.league){ $("#leagueArea").innerHTML=""; return; }
  $("#knockoutTitle").style.display="none";
  const table=t.league.table||t.league.teams;
  const rounds=t.league.rounds||[];
  if(selectedLeagueRound===null || selectedLeagueRound>=rounds.length) selectedLeagueRound=currentLeagueRoundIndex(t);
  const idx=clamp(Number(selectedLeagueRound)||0,0,Math.max(0,rounds.length-1));
  const round=rounds[idx];
  $("#leagueArea").innerHTML = `<div class="section-title on-field"><h2>Tabela</h2></div><div class="group-card table-card"><div class="table-scroll"><table class="table standings-table"><thead><tr><th>Pos</th><th>Time</th><th></th><th>Pts</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th><th>GP</th></tr></thead><tbody>${table.map((x,i)=>`<tr class="${t.status==="finished"&&i===0?"champion-row":""}"><td>${i+1}</td><td>${t.status==="finished"&&i===0?"🏆 ":""}<strong class="${t.status==="finished"&&i===0?"champion-name":""}">${x.name}</strong></td><td>${deltaBadge(x.posDelta)}</td><td>${x.pts}</td><td>${x.w+x.d+x.l}</td><td>${x.w}</td><td>${x.d}</td><td>${x.l}</td><td>${x.gd}</td><td>${x.gf}</td></tr>`).join("")}</tbody></table></div></div><div class="section-title on-field"><h2>Rodadas</h2></div>${roundNav("league",idx,rounds.length)}<div class="groups-grid one-round">${round?`<div class="group-card"><h3>${round.name}</h3><div class="match-list">${round.matches.map(matchMini).join("")}</div></div>`:""}</div>`;
}
function groupMatchesByStage(matches){
  const map=new Map();
  matches.forEach(m=>{ if(!map.has(m.stage)) map.set(m.stage,[]); map.get(m.stage).push(m); });
  return Array.from(map.entries());
}
function renderGroups(t){
  if(!t.groups?.length){ $("#groupsArea").innerHTML=""; return; }
  const adj=t.autoAdjustment ? (t.autoAdjustment.copa48 ? `<div class="auto-adjust-note"><strong>Formato Copa 48:</strong> 12 grupos de 4. Classificam 1º, 2º e os 8 melhores terceiros para a fase de 32.</div>` : `<div class="auto-adjust-note"><strong>Ajuste automático:</strong> ${t.autoAdjustment.classified} classificados geram Rodada preliminar. ${t.autoAdjustment.byes} entram direto e ${t.autoAdjustment.prelimTeams} jogam a preliminar.</div>`) : "";
  const info=groupClassificationInfo(t);
  const allStages=[...new Set(t.groups.flatMap(g=>g.matches.map(m=>(m.stage.match(/Rodada \d+/)||["Rodada 1"])[0])))];
  if(selectedGroupRound===null || !allStages.includes(selectedGroupRound)) selectedGroupRound=currentGroupRoundName(t);
  const roundName=selectedGroupRound || allStages[0] || "Rodada 1";
  const roundIdx=Math.max(0,allStages.indexOf(roundName));
  const roundMatches=t.groups.map(g=>({group:g.name,matches:g.matches.filter(m=>m.stage.includes(roundName))})).filter(x=>x.matches.length);
  $("#groupsArea").innerHTML = `<div class="section-title on-field"><h2>Fase de grupos</h2></div>${adj}${renderQualifiedSummary(t)}<div class="groups-grid">${t.groups.map(g=>`<div class="group-card group-card--clean"><h3>Grupo ${g.name}</h3><div class="table-scroll"><table class="table group-table standings-table"><thead><tr><th>Pos</th><th>Time</th><th>Pts</th><th>J</th><th>V</th><th>SG</th><th>GP</th><th></th></tr></thead><tbody>${(g.table.length?g.table:g.teams).map((x,i)=>`<tr class="${i<2||info.thirdIds?.has(x.id)?"qualified":""}"><td>${i+1}</td><td>${x.name}</td><td>${x.pts}</td><td>${x.w+x.d+x.l}</td><td>${x.w}</td><td>${x.gd}</td><td>${x.gf}</td><td>${groupRowTag(t,x,i,info)}</td></tr>`).join("")}</tbody></table></div></div>`).join("")}</div><div class="section-title on-field"><h2>Rodadas</h2></div>${roundNav("group",roundIdx,allStages.length)}<div class="groups-grid one-round">${roundMatches.map(g=>`<div class="group-card"><h3>Grupo ${g.group} • ${roundName}</h3><div class="match-list">${g.matches.map(matchMini).join("")}</div></div>`).join("")}</div>`;
}
function matchMini(m){
  const score=m.played?`${scoreCell(m,"home")} x ${scoreCell(m,"away")}`:"x";
  const decision=m.played?`<em>${decisionLabel(m)}</em>`:"";
  return `<div class="mini-match ${m.played?"played":""}"><span>${m.home.name}</span><strong>${score}</strong><span>${m.away.name}</span>${decision}<div class="mini-actions">${m.played?`<button data-edit-match="${m.id}">editar</button>`:`<button data-sim="${m.id}">simular</button><button data-edit-match="${m.id}">manual</button>`}</div></div>`;
}

function renderBracket(t){
  if(!t.knockout?.length){ $("#bracketArea").innerHTML=""; $("#knockoutTitle").style.display=t.league?"none":"flex"; return; }
  $("#knockoutTitle").style.display="flex";
  const finalWinner=t.status==="finished"?t.champion:null;
  $("#bracketArea").innerHTML = t.knockout.map(r=>`<div class="round compact-round ${r.name==="Final"?"final-round":""}"><h3>${r.name}</h3>${r.byes?.length?`<details class="bye-box compact-byes"><summary>Entram direto (${r.byes.length})</summary><div class="bye-chip-grid">${r.byes.map(b=>`<small>${b.name}</small>`).join("")}</div></details>`:""}${r.matches.map(m=>`<div class="match compact-match ${r.name==="Final"?"final-match":""}"><div class="match-line ${m.played&&m.winner?.id===m.home.id?"winner":""} ${finalWinner===m.home.name&&r.name==="Final"?"gold-champion":""}"><span>${finalWinner===m.home.name&&r.name==="Final"?"🏆 ":""}${m.home.name}</span><strong>${scoreCell(m,"home")}</strong></div><div class="match-line ${m.played&&m.winner?.id===m.away.id?"winner":""} ${finalWinner===m.away.name&&r.name==="Final"?"gold-champion":""}"><span>${finalWinner===m.away.name&&r.name==="Final"?"🏆 ":""}${m.away.name}</span><strong>${scoreCell(m,"away")}</strong></div><div class="match-footer"><span class="match-status">${m.played && m.meta ? m.meta : decisionLabel(m)}</span><div class="match-actions compact-actions">${m.played?`<button data-edit-match="${m.id}">Editar</button>`:`<button data-sim="${m.id}">Simular</button><button data-edit-match="${m.id}">Manual</button>`}</div></div></div>`).join("")}</div>`).join("");
}
function openManualResult(id){
  const t=data.activeTournament; if(!t) return;
  const m=allTournamentMatches(t).find(x=>x.id===id); if(!m) return;
  editingMatchId=id;
  $("#manualMatchTitle").textContent=`${m.home.name} x ${m.away.name}`;
  $("#manualHomeGoals").value=m.played?m.homeGoals:0;
  $("#manualAwayGoals").value=m.played?m.awayGoals:0;
  $("#manualHomePens").value=m.pens?.a||0;
  $("#manualAwayPens").value=m.pens?.b||0;
  $("#manualWinner").innerHTML=`<option value="${m.home.id}">${m.home.name}</option><option value="${m.away.id}">${m.away.name}</option>`;
  $("#manualWinner").value=m.winner?.id || m.home.id;
  $("#manualDecision").value=m.pens && (m.meta||"").includes("A.P.") ? "ap_pens" : m.pens ? "pens" : (m.meta||"").includes("A.P.") ? "ap" : "normal";
  $("#manualResultModal").hidden=false;
}
function closeManualResult(){ $("#manualResultModal").hidden=true; editingMatchId=null; }
function saveManualResult(){
  const t=data.activeTournament; if(!t || !editingMatchId) return;
  const m=allTournamentMatches(t).find(x=>x.id===editingMatchId); if(!m) return;
  const before=snapshotPositions(t);
  const hg=Number($("#manualHomeGoals").value)||0, ag=Number($("#manualAwayGoals").value)||0;
  const dec=$("#manualDecision").value, winnerId=$("#manualWinner").value;
  m.homeGoals=hg; m.awayGoals=ag; m.played=true;
  m.winner=null; m.loser=null; m.pens=null; m.meta="";
  if(m.allowDraw && hg===ag && dec==="normal"){
    m.winner=null; m.loser=null;
  }else{
    const win = winnerId===m.home.id ? m.home : m.away;
    m.winner=win; m.loser=win.id===m.home.id?m.away:m.home;
  }
  if(dec==="ap") m.meta="A.P.";
  if(dec==="pens" || dec==="ap_pens"){
    m.meta=dec==="ap_pens"?"A.P. • pênaltis":"pênaltis";
    m.pens={a:Number($("#manualHomePens").value)||0,b:Number($("#manualAwayPens").value)||0};
  }
  if(t.currentStage==="league"){ recalcLeague(t); }
  if(t.currentStage==="groups"){
    const g=t.groups.find(x=>x.matches.some(mm=>mm.id===m.id));
    if(g){ g.teams.forEach(tm=>Object.assign(tm,{pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0})); g.matches.filter(mm=>mm.played).forEach(mm=>applyStats(g.teams,mm)); sortGroup(g,t.cfg); }
  }
  advanceIfNeeded(t); applyPositionDeltas(t,before);
  save(); closeManualResult(); renderTournament();
}

function flattenMatches(t){ return allTournamentMatches(t).filter(m=>m.played).map(m=>({home:m.home.name,away:m.away.name,homeGoals:m.homeGoals,awayGoals:m.awayGoals,winner:m.winner?.name || (m.homeGoals===m.awayGoals?null:(m.homeGoals>m.awayGoals?m.home.name:m.away.name)),loser:m.loser?.name || null,stage:m.stage,meta:m.meta,pens:m.pens,played:true})); }
function saveEdition(t){ if(t.cfg.saveMode==="single") return; const c=data.competitions.find(x=>x.id===t.cfg.competitionId); if(!c) return; c.editions.push({id:uid(), name:t.cfg.name, format:formatLabel(t.cfg.format), champion:t.champion, runnerUp:t.runnerUp, date:new Date().getFullYear().toString(), teams:t.teams.map(x=>x.name), matches:flattenMatches(t), leagueTable:t.league?.table?.map(x=>({team:x.name,pts:x.pts,w:x.w,d:x.d,l:x.l,gf:x.gf,ga:x.ga,gd:x.gd}))||null}); save(); }

function statsFor(c){
  const editions=c.editions||[], matches=editions.flatMap(e=>e.matches||[]), teams=[...new Set(editions.flatMap(e=>e.teams||[]))];
  const titles={}, vices={}, finals={}, parts={}, pensTitles={}, teamStats={};
  const ensure=n=> n ? (teamStats[n] ||= {team:n,titles:0,vices:0,finals:0,parts:0,played:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,points:0}) : null;
  editions.forEach(e=>{ if(e.champion){titles[e.champion]=(titles[e.champion]||0)+1; ensure(e.champion).titles++;} if(e.runnerUp){vices[e.runnerUp]=(vices[e.runnerUp]||0)+1; ensure(e.runnerUp).vices++;} [e.champion,e.runnerUp].filter(Boolean).forEach(n=>{finals[n]=(finals[n]||0)+1; ensure(n).finals++;}); (e.teams||[]).forEach(n=>{parts[n]=(parts[n]||0)+1; ensure(n).parts++;}); const fm=(e.matches||[]).find(m=>isFinalStage(m.stage)); if(fm?.pens && e.champion) pensTitles[e.champion]=(pensTitles[e.champion]||0)+1; });
  matches.forEach(m=>{ const h=ensure(m.home), a=ensure(m.away); if(!h||!a) return; const hg=Number(m.homeGoals||0), ag=Number(m.awayGoals||0); h.gf+=hg;h.ga+=ag;h.played++;a.gf+=ag;a.ga+=hg;a.played++; if(hg>ag){h.w++;a.l++;h.points+=3;} else if(hg<ag){a.w++;h.l++;a.points+=3;} else {h.d++;a.d++;h.points++;a.points++;} });
  Object.values(teamStats).forEach(t=>t.gd=t.gf-t.ga);
    const leaguePoints={}, leagueWins={}, leagueGF={}, leagueDefense={};
  editions.forEach(e=>(e.leagueTable||[]).forEach(r=>{ leaguePoints[r.team]=(leaguePoints[r.team]||0)+(r.pts||0); leagueWins[r.team]=(leagueWins[r.team]||0)+(r.w||0); leagueGF[r.team]=(leagueGF[r.team]||0)+(r.gf||0); leagueDefense[r.team]=(leagueDefense[r.team]===undefined?(r.ga||0):Math.min(leagueDefense[r.team],r.ga||0)); }));
const biggestWin=matches.map(m=>({m,diff:Math.abs((m.homeGoals||0)-(m.awayGoals||0)),total:(m.homeGoals||0)+(m.awayGoals||0)})).sort((a,b)=>b.diff-a.diff||b.total-a.total)[0]?.m;
  const finalGoals=matches.filter(m=>isFinalStage(m.stage)).map(m=>({m,total:(m.homeGoals||0)+(m.awayGoals||0)})).sort((a,b)=>b.total-a.total)[0]?.m;
  const undefeated=editions.filter(e=>e.champion && !(e.matches||[]).some(m=> (m.home===e.champion && m.homeGoals<m.awayGoals) || (m.away===e.champion && m.awayGoals<m.homeGoals))).map(e=>e.champion);
  const topChampion=rankEntries(titles)[0]?.[0] || "—";
  return {editions,matches,teams,titles,vices,finals,parts,pensTitles,teamStats,leaguePoints,leagueWins,leagueGF,leagueDefense,biggestWin,finalGoals,undefeated,topChampion};
}
function rankCard(title,obj,unit){ const rows=rankEntries(obj).slice(0,6).map(([n,v],i)=>`<div class="rank-row"><span>${medal(i)} ${n}</span><strong>${v} ${unit}</strong></div>`).join("") || `<small class="muted">Sem dados ainda.</small>`; return `<div class="stat-card"><h3>${title}</h3>${rows}</div>`; }
function feature(title,value,sub=""){ return `<div class="stat-card featured"><small>${title}</small><strong>${value||"—"}</strong><span>${sub}</span></div>`; }
function matchText(m){ return m?`${m.home} ${m.homeGoals} x ${m.awayGoals} ${m.away}`:"—"; }
function renderCompetitionDetail(c){
  const s=statsFor(c);
  const hasFinals=s.matches.some(m=>isFinalStage(m.stage));
  const hasLeague=(c.editions||[]).some(e=>e.format==="Pontos corridos" || e.leagueTable);
  $("#competitionHero").innerHTML = [`<div class="stat"><small>Edições</small><strong>${s.editions.length}</strong></div>`,`<div class="stat"><small>Jogos salvos</small><strong>${s.matches.length}</strong></div>`,`<div class="stat"><small>Times</small><strong>${s.teams.length}</strong></div>`,`<div class="stat"><small>Maior campeão</small><strong>${s.topChampion}</strong></div>`].join("");
  $("#overviewStats").innerHTML = [feature("🏆 Maior campeão",s.topChampion),feature("🥈 Vice-campeão",rankEntries(s.vices)[0]?.[0]||"—"),feature("⚽ Maior goleada",matchText(s.biggestWin)),hasFinals?feature("🔥 Final com mais gols",matchText(s.finalGoals)):"",rankCard("Maiores campeões",s.titles,"títulos"),hasFinals?rankCard("Mais finais",s.finals,"finais"):""].join("");
  $("#rankingStats").innerHTML = [rankCard("Maiores campeões",s.titles,"títulos"),rankCard("Maiores vices",s.vices,"vices"),hasFinals?rankCard("Mais finais",s.finals,"finais"):"",rankCard("Mais participações",s.parts,"part."),hasFinals?rankCard("Títulos nos pênaltis",s.pensTitles,"títulos"):"",hasLeague?rankCard("Mais pontos em ligas",s.leaguePoints,"pts"):"",hasLeague?rankCard("Mais vitórias em ligas",s.leagueWins,"vitórias"):""].join("");
  $("#teamStatsList").innerHTML = Object.values(s.teamStats).sort((a,b)=>b.titles-a.titles||b.points-a.points||b.gd-a.gd||b.gf-a.gf).map(t=>`<div class="list-card"><div><strong>${t.team}</strong><small>${t.titles} títulos • ${t.vices} vices • ${t.parts} participações</small><small>${t.played}J ${t.w}V ${t.d}E ${t.l}D • GP ${t.gf} • GC ${t.ga} • SG ${t.gd}</small></div><span class="pill">${t.points} pts</span></div>`).join("") || `<div class="panel">Sem estatísticas de times.</div>`;
  $("#recordStats").innerHTML = [feature("Maior goleada",matchText(s.biggestWin)),hasFinals?feature("Final com mais gols",matchText(s.finalGoals)):"",feature("Campeões invictos",[...new Set(s.undefeated)].slice(0,5).join(", ")||"—"),hasLeague?rankCard("Melhor ataque em ligas",s.leagueGF,"GP"):"",hasLeague?rankCard("Melhor defesa em ligas",s.leagueDefense,"GC"):""].join("");
  $("#editionList").innerHTML = (c.editions||[]).map(e=>`<div class="list-card"><div><strong>${e.name}</strong><small>${e.format} • campeão: ${e.champion}</small><small>${(e.teams||[]).length} times • ${(e.matches||[]).length} jogos</small></div><button class="mini-danger" data-delete-edition="${e.id}">apagar</button></div>`).join("") || `<div class="panel">Sem edições ainda.</div>`;
}

function deleteEdition(id){ const c=data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return; if(confirm("Apagar esta edição?")){ c.editions=c.editions.filter(e=>e.id!==id); save(); renderCompetitionDetail(c); renderCompetitions(); } }
function deleteCustomTeam(id){ if(confirm("Apagar este time criado?")){ data.customTeams=data.customTeams.filter(t=>t.id!==id); save(); renderAll(); } }

$("#toggleCompetitionForm").onclick=()=>$("#competitionForm").hidden=!$("#competitionForm").hidden;
$("#saveCompetition").onclick=()=>{ const name=$("#newCompetitionName").value.trim(); if(!name) return; const c={id:uid(),name,editions:[]}; data.competitions.push(c); currentCompetitionId=c.id; renderCompetitionSelect(); $("#newCompetitionName").value=""; $("#competitionForm").hidden=true; save(); renderAll(); };
$("#renameCompetition").onclick=()=>{ const c=data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return; c.name=$("#editCompetitionName").value.trim()||c.name; save(); openCompetition(c.id); };
$("#deleteCompetition").onclick=()=>{ const c=data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return; if(confirm(`Apagar o campeonato "${c.name}" e todas as edições?`)){ data.competitions=data.competitions.filter(x=>x.id!==c.id); currentCompetitionId=data.competitions[0]?.id || null; save(); go("competitions"); } };
$("#addCustomTeam").onclick=()=>{ const name=$("#customTeamName").value.trim(), power=clamp(Number($("#customTeamPower").value)||70,1,100); if(!name) return; data.customTeams.push(team(name,power,"Meu time")); $("#customTeamName").value=""; save(); renderAll(); };
const bind=(sel,ev,fn)=>{ const el=$(sel); if(el) el[ev]=fn; };
bind("#pickStrongest","onclick",pickStrongest); bind("#pickRandom","onclick",pickRandom); bind("#pickBalanced","onclick",pickBalanced);
bind("#clearTeams","onclick",()=>{selectedTeams=[]; previewOrder=null; renderSelected();});
bind("#fillMissingRandom","onclick",()=>fillMissing("random")); bind("#fillMissingStrongest","onclick",()=>fillMissing("strongest")); bind("#selectVisible","onclick",selectVisibleTeams); bind("#applyQuotas","onclick",applyQuotas); bind("#reshufflePreview","onclick",reshufflePreview);
bind("#teamSearch","oninput",e=>{teamSearch=e.target.value; renderAvailableTeams();}); bind("#powerFilter","onchange",e=>{powerFilter=e.target.value; renderAvailableTeams();});
bind("#generateTournament","onclick",generateTournament);
bind("#quickGenerateTop","onclick",generateTournament);
bind("#formatSelect","onchange",()=>{ clearManualGroupsIfAny(); previewOrder=null; toggleRuleVisibility(); renderDrawPreview(); }); bind("#teamCount","onchange",()=>{ clearManualGroupsIfAny(); selectedTeams=selectedTeams.slice(0,Number($("#teamCount").value)); previewOrder=null; renderSelected(); });
bind("#competitionSelect","onchange",e=>currentCompetitionId=e.target.value);
document.addEventListener("change",e=>{
  const leagueSel=e.target.closest("[data-league-select]"); if(leagueSel){ setLeagueRound(leagueSel.value); return; }
  const groupSel=e.target.closest("[data-group-select]"); if(groupSel){ const t=data.activeTournament; const stages=[...new Set((t?.groups||[]).flatMap(g=>g.matches.map(m=>(m.stage.match(/Rodada \d+/)||["Rodada 1"])[0])))]; setGroupRound(stages[Number(groupSel.value)]||stages[0]); return; }
  const p=e.target.closest("[data-pack]"); if(p){ p.checked?selectedPacks.add(p.dataset.pack):selectedPacks.delete(p.dataset.pack); selectedTeams=[]; manualGroups=null; previewOrder=null; renderAll(); return; }
  const addGroup=e.target.closest("[data-add-to-group]"); if(addGroup && addGroup.value){ const t=getPreviewOrder(cfg()).find(x=>x.id===addGroup.value); if(t){ manualGroups.forEach(g=>{ const idx=g.findIndex(x=>x.id===t.id); if(idx>=0) g.splice(idx,1); }); manualGroups[Number(addGroup.dataset.addToGroup)].push(t); renderManualGroups(); } return; }
  const pow=e.target.closest("[data-power-team]"); if(pow){ const t=selectedTeams.find(x=>x.id===pow.dataset.powerTeam); if(t){ t.power=clamp(Number(pow.value)||70,1,100); previewOrder=null; renderSelected(); } return; }
  if(["bracketShuffle","groupShuffle","groupTurns","groupSize","leagueTurns","tiePreset"].includes(e.target.id)){ previewOrder=null; renderDrawPreview(); }
});
$$('.tab').forEach(t=>t.onclick=()=>{ $$('.tab').forEach(x=>x.classList.remove('active')); t.classList.add('active'); $$('.tab-page').forEach(p=>p.classList.remove('active')); $(`#${t.dataset.tab}Tab`)?.classList.add('active'); });

$$('input[name="saveMode"]').forEach(r=>r.onchange=()=>{ const choice=$("#competitionChoice"); if(choice) choice.hidden = r.value!=="history" || !r.checked; });

bind("#addCustomPack","onclick",addCustomPack);
bind("#autoFillGroups","onclick",autoFillManualGroups);
bind("#clearManualGroups","onclick",clearManualGroups);
bind("#closeManualResult","onclick",closeManualResult);
bind("#saveManualResult","onclick",saveManualResult);
bind("#clearLocalData","onclick",()=>{ if(confirm("Tem certeza que deseja apagar todos os dados locais? Essa ação não pode ser desfeita.")){ localStorage.removeItem(STORAGE); data=structuredClone(starter); currentCompetitionId=null; selectedTeams=[]; manualGroups=null; save(); renderAll(); go("home"); } });
bind("#exportBackup","onclick",()=>{ const box=$("#backupBox"); if(box) box.value=JSON.stringify(data,null,2); });
bind("#importBackup","onclick",()=>{ const box=$("#backupBox"); if(!box?.value.trim()) return; try{ const imported=JSON.parse(box.value); data={...structuredClone(starter),...imported}; currentCompetitionId=data.competitions?.[0]?.id || null; save(); renderAll(); alert("Backup importado."); }catch(e){ alert("Backup inválido."); } });
renderAll();

document.addEventListener("change",(ev)=>{
  if(["formatSelect","teamCount","groupSize","groupShuffle"].includes(ev.target?.id)) clearManualGroupsIfAny();
});

function matchLegDisplay(m){
  if(!m) return "";
  if(m.legs?.length===2){
    const l1=m.legs[0], l2=m.legs[1];
    const ap=m.extraTime?" • A.P.":"";
    const agg=m.aggregate?` • Agregado ${m.aggregate[0]}-${m.aggregate[1]}`:"";
    const pens=m.penalties?` • Pênaltis ${m.penalties[0]}-${m.penalties[1]}`:"";
    return `Ida ${l1.a}-${l1.b} • Volta ${l2.a}-${l2.b}${ap}${agg}${pens}`;
  }
  return "";
}
