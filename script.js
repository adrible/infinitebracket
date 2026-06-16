const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));
const STORAGE = "brocket-v7";
const LEGACY_KEYS = ["brocket-v6-polida", "brocket-v5", "brocket-v4", "brocket-v3"];

const packs = {
  brasileiros:{ name:"Clubes brasileiros", icon:"🇧🇷", teams:[["Flamengo",86],["Palmeiras",86],["Botafogo",84],["Atlético-MG",82],["São Paulo",82],["Fluminense",81],["Corinthians",80],["Grêmio",80],["Internacional",80],["Athletico-PR",79],["Bahia",78],["Fortaleza",78],["Cruzeiro",78],["Vasco",77],["Santos",77],["Ceará",74],["Sport",73],["Vitória",73],["Bragantino",78],["Cuiabá",72]]},
  europeus:{ name:"Clubes europeus", icon:"🇪🇺", teams:[["Real Madrid",94],["Manchester City",93],["Bayern München",91],["PSG",90],["Liverpool",90],["Barcelona",89],["Arsenal",88],["Inter de Milão",88],["Bayer Leverkusen",87],["Atlético de Madrid",87],["Borussia Dortmund",86],["Milan",85],["Juventus",84],["Napoli",84],["Chelsea",84],["RB Leipzig",83],["Benfica",83],["Sporting",82],["Porto",82],["Tottenham",82],["Manchester United",82],["Roma",82],["Ajax",79],["Sevilla",79]]},
  sulamericanos:{ name:"Sul-americanos", icon:"🌎", teams:[["River Plate",84],["Boca Juniors",82],["Independiente del Valle",78],["Racing",78],["Estudiantes",77],["LDU",76],["Peñarol",76],["Nacional-URU",76],["Atlético Nacional",76],["Olimpia",75],["Colo-Colo",75],["San Lorenzo",75],["Cerro Porteño",74],["Barcelona SC",74],["Millonarios",74],["Universidad de Chile",73],["Deportivo Cali",72],["Independiente",76]]},
  globais:{ name:"Clubes globais", icon:"🌍", teams:[["Al Hilal",82],["Al Nassr",81],["Al Ahly",79],["Al Ittihad",79],["Monterrey",78],["América-MEX",78],["Tigres",77],["Mamelodi Sundowns",76],["Wydad Casablanca",76],["Inter Miami",76],["LAFC",75],["Urawa Red Diamonds",75],["Kawasaki Frontale",75],["Zamalek",75],["Yokohama F. Marinos",74],["Ulsan HD",74],["Seattle Sounders",74],["Jeonbuk Hyundai",73]]},
  selecoes:{ name:"Seleções mundiais", icon:"🏳️", teams:[["França",93],["Argentina",92],["Brasil",91],["Inglaterra",90],["Espanha",89],["Portugal",89],["Alemanha",88],["Holanda",87],["Itália",86],["Bélgica",85],["Uruguai",84],["Croácia",84],["Colômbia",82],["Marrocos",82],["Suíça",82],["Senegal",81],["Dinamarca",81],["Japão",80],["México",79],["Estados Unidos",79],["Coreia do Sul",79],["Egito",79],["Chile",78],["Austrália",77]]}
};

const starter = { competitions:[{ id:uid(), name:"Copa da Galera", editions:[
  { id:uid(), name:"2024", format:"Playoffs", champion:"Real Madrid", runnerUp:"Benfica", date:"2024", teams:["Real Madrid","Benfica","Flamengo","Palmeiras"], matches:[mSaved("Real Madrid","Benfica",3,1,"Real Madrid","Benfica","Final","Jogo único")] },
  { id:uid(), name:"2025", format:"Grupos + mata-mata", champion:"Flamengo", runnerUp:"Palmeiras", date:"2025", teams:["Flamengo","Palmeiras","Boca Juniors","River Plate"], matches:[mSaved("Flamengo","Palmeiras",2,2,"Flamengo","Palmeiras","Final","pênaltis 5-4",{a:5,b:4})] }
]}], customTeams:[], activeTournament:null };

let data = load();
let currentCompetitionId = data.competitions[0]?.id;
let selectedPacks = new Set(["brasileiros","europeus"]);
let selectedTeams = [];
let teamSearch = "";
let powerFilter = "all";
let previewSeed = 0;
let previewOrder = null;

function uid(){ return crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)+Date.now(); }
function mSaved(home,away,hg,ag,winner,loser,stage,meta,pens=null){ return {home,away,homeGoals:hg,awayGoals:ag,winner,loser,stage,meta,pens,played:true}; }
function load(){
  try{
    const raw = localStorage.getItem(STORAGE) || LEGACY_KEYS.map(k=>localStorage.getItem(k)).find(Boolean);
    if(!raw) return structuredClone(starter);
    const parsed = JSON.parse(raw);
    return { ...structuredClone(starter), ...parsed, competitions: parsed.competitions?.length ? parsed.competitions : structuredClone(starter.competitions), customTeams: parsed.customTeams || [], activeTournament: parsed.activeTournament || null };
  }catch{ return structuredClone(starter); }
}
function save(){ localStorage.setItem(STORAGE, JSON.stringify(data)); }
function slug(s){ return `${s}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
function team(name,power,source=""){ return { id:slug(name), name, power, source }; }
function shuffle(a){ return a.map(x=>[Math.random(),x]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]); }
function clamp(n,a,b){ return Math.max(a,Math.min(b,n)); }
function label(v){ return {low:"baixa",medium:"média",high:"alta",chaos:"caótica"}[v] || v; }
function formatLabel(f){ return {playoffs:"Playoffs / mata-mata",groups:"Fase de grupos + mata-mata",clubWorldCup:"Copa do Mundo de Clubes",league:"Liga / pontos corridos"}[f] || f; }
function pool(){
  const map = new Map();
  selectedPacks.forEach(k => packs[k].teams.forEach(([name,power]) => map.set(slug(name), team(name,power,packs[k].name))));
  data.customTeams.forEach(t => map.set(t.id, t));
  return Array.from(map.values());
}
function rankEntries(obj){ return Object.entries(obj).sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0])); }
function medal(i){ return i===0?"🥇":i===1?"🥈":i===2?"🥉":`${i+1}.`; }

function go(screen){
  $$(".screen").forEach(s=>s.classList.toggle("active",s.id===screen));
  $$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.go===screen));
  const titles = {home:["V7","Início"],create:["Novo","Criar torneio"],tournament:["Simulação","Torneio atual"],competitions:["Histórico","Campeonatos"],competitionDetail:["Central","Estatísticas"],teams:["Participantes","Times"]};
  $("#pageSubtitle").textContent = titles[screen]?.[0] || "Brocket";
  $("#pageTitle").textContent = titles[screen]?.[1] || "Brocket";
  renderAll();
}

document.addEventListener("click", e=>{
  const nav = e.target.closest("[data-go]"); if(nav){ go(nav.dataset.go); return; }
  const comp = e.target.closest("[data-comp]"); if(comp){ openCompetition(comp.dataset.comp); return; }
  const sim = e.target.closest("[data-sim]"); if(sim){ simulateMatch(sim.dataset.sim); return; }
  const delEdition = e.target.closest("[data-delete-edition]"); if(delEdition){ deleteEdition(delEdition.dataset.deleteEdition); return; }
  const delCustom = e.target.closest("[data-delete-custom]"); if(delCustom){ deleteCustomTeam(delCustom.dataset.deleteCustom); return; }
  const toggleTeam = e.target.closest("[data-toggle-team]"); if(toggleTeam){ const id=toggleTeam.dataset.toggleTeam; const t=pool().find(x=>x.id===id); if(!t) return; isSelected(id)?removeTeam(id):addTeam(t); renderSelected(); return; }
  const removeBtn = e.target.closest("[data-remove-team]"); if(removeBtn){ removeTeam(removeBtn.dataset.removeTeam); renderSelected(); return; }
});

function renderAll(){ renderCompetitions(); renderCompetitionSelect(); renderPacks(); renderSelected(); renderCustomTeams(); toggleRuleVisibility(); renderTournament(); }
function renderCompetitionSelect(){ $("#competitionSelect").innerHTML = data.competitions.map(c=>`<option value="${c.id}" ${c.id===currentCompetitionId?"selected":""}>${c.name}</option>`).join(""); }
function renderCompetitions(){
  const html = data.competitions.map(c=>{ const s=statsFor(c); return `<button class="list-card" data-comp="${c.id}"><div><strong>${c.name}</strong><small>${c.editions.length} edições • maior campeão: ${s.topChampion}</small></div><span class="pill">abrir</span></button>`; }).join("");
  $("#competitionList").innerHTML = html || `<div class="panel">Nenhum campeonato criado.</div>`;
  $("#homeCompetitions").innerHTML = html || `<div class="panel">Nenhum campeonato criado.</div>`;
}
function openCompetition(id){ currentCompetitionId=id; const c=data.competitions.find(x=>x.id===id); if(!c) return; $("#competitionTitle").textContent=c.name; $("#editCompetitionName").value=c.name; renderCompetitionDetail(c); go("competitionDetail"); }

function renderPacks(){
  $("#packList").innerHTML = Object.entries(packs).map(([key,p])=>`<label class="pack"><input type="checkbox" data-pack="${key}" ${selectedPacks.has(key)?"checked":""}/><span>${p.icon}</span><div><strong>${p.name}</strong><small>${p.teams.length} times</small></div></label>`).join("");
  $("#poolCount").textContent = `${pool().length} disponíveis`;
  renderQuotas();
  renderAvailableTeams();
  renderDrawPreview();
}
function renderQuotas(){
  const keys=[...selectedPacks];
  $("#quotaList").innerHTML = keys.map(k=>`<label class="quota-box"><span>${packs[k].icon} ${packs[k].name}</span><input type="number" min="0" max="${packs[k].teams.length}" value="0" data-quota="${k}" /></label>`).join("") || `<div class="empty-inline">Marque pacotes para definir quantidades.</div>`;
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
  $("#availableCount").textContent = `${list.length} filtrados`;
  $("#availableTeams").innerHTML = list.map(t=>{
    const checked=isSelected(t.id);
    return `<button class="team-pick ${checked?"chosen":""}" data-toggle-team="${t.id}">
      <span class="pick-dot">${checked?"✓":"+"}</span>
      <div><strong>${t.name}</strong><small>${t.source || "Meu time"} • força ${t.power}</small></div>
    </button>`;
  }).join("") || `<div class="team-row"><small>Nenhum time encontrado.</small></div>`;
}
function renderSelected(){
  const need = Number($("#teamCount").value);
  $("#selectedCount").textContent = `${selectedTeams.length}/${need}`;
  $("#selectedTeams").innerHTML = selectedTeams.map(t=>`<div class="team-row selected-row">
    <div><strong>${t.name}</strong><small>${t.source || "personalizado"}</small></div>
    <div class="selected-actions">
      <label class="power-edit">Força <input type="number" min="1" max="100" value="${t.power}" data-power-team="${t.id}" /></label>
      <button class="mini-danger" data-remove-team="${t.id}">remover</button>
    </div>
  </div>`).join("") || `<div class="team-row"><small>Nenhum time selecionado.</small></div>`;
  renderAvailableTeams();
  renderDrawPreview();
}
function renderCustomTeams(){
  $("#customTeamList").innerHTML = data.customTeams.map(t=>`<div class="team-row"><div><strong>${t.name}</strong><small>Time criado • força ${t.power}</small></div><button class="danger mini-danger" data-delete-custom="${t.id}">apagar</button></div>`).join("") || `<div class="team-row"><small>Nenhum time criado.</small></div>`;
}
function toggleRuleVisibility(){
  const f=$("#formatSelect").value;
  $("#leagueTurnsWrap").style.display = f==="league" ? "grid" : "none";
  $("#groupSizeWrap").style.display = (f==="groups" || f==="clubWorldCup") ? "grid" : "none";
  $("#groupTurnsWrap").style.display = (f==="groups" || f==="clubWorldCup") ? "grid" : "none";
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
    const chosen=shuffle(packs[key].teams.map(([name,power])=>team(name,power,packs[key].name))).slice(0,count);
    chosen.forEach(t=>{ if(selectedTeams.length<need && !isSelected(t.id)) selectedTeams.push(t); });
  });
  previewOrder=null; renderSelected();
}

function cfg(){ return { id:uid(), name:$("#editionName").value.trim()||"Torneio", competitionId:$("#competitionSelect").value, format:$("#formatSelect").value, teamCount:Number($("#teamCount").value), legs:$("#knockoutLegs").value, finalRule:$("#finalRule").value, upset:$("#upsetLevel").value, realism:$("#scoreRealism").value, extraTime:$("#extraTime").checked, penalties:$("#penalties").checked, awayGoals:$("#awayGoals").checked, leagueTurns:$("#leagueTurns").value, groupTurns:$("#groupTurns").value, groupSize:Number($("#groupSize").value), bracketShuffle:$("#bracketShuffle").value, groupShuffle:$("#groupShuffle").value }; }
function generateTournament(){
  const c=cfg(); if(selectedTeams.length<c.teamCount){ alert(`Selecione ${c.teamCount} times.`); return; }
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
function renderDrawPreview(){
  const box=$("#drawPreview"); if(!box) return;
  const c=cfg(), need=c.teamCount;
  if(selectedTeams.length<need){ box.innerHTML=`<div class="empty-inline">Selecione ${need} times para ver a prévia.</div>`; return; }
  const ordered=getPreviewOrder(c);
  if(c.format==="groups" || c.format==="clubWorldCup"){
    const gs=c.groupSize, chunks=[];
    for(let i=0;i<ordered.length;i+=gs) chunks.push(ordered.slice(i,i+gs));
    box.innerHTML=`<div class="preview-grid">${chunks.map((g,i)=>`<div class="preview-card"><strong>Grupo ${String.fromCharCode(65+i)}</strong>${g.map(t=>`<small>${t.name}</small>`).join("")}</div>`).join("")}</div>`;
  }else if(c.format==="playoffs"){
    const pairs=[]; for(let i=0;i<ordered.length;i+=2) pairs.push([ordered[i],ordered[i+1]]);
    box.innerHTML=`<div class="preview-grid">${pairs.map((p,i)=>`<div class="preview-card"><strong>Jogo ${i+1}</strong><small>${p[0]?.name||"—"} x ${p[1]?.name||"—"}</small></div>`).join("")}</div>`;
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
function blankStats(t){ return {...t, pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0}; }
function setupGroups(t){
  const c=t.cfg, ordered=[...t.teams], gs=c.groupSize;
  for(let i=0;i<ordered.length;i+=gs){
    const idx=i/gs, g={ name:String.fromCharCode(65+idx), teams:ordered.slice(i,i+gs).map(blankStats), matches:[], table:[] };
    for(let a=0;a<g.teams.length;a++){
      for(let b=a+1;b<g.teams.length;b++){
        g.matches.push(newMatch(g.teams[a],g.teams[b],`Grupo ${g.name} - Rodada 1`,true));
        if(c.groupTurns==="double") g.matches.push(newMatch(g.teams[b],g.teams[a],`Grupo ${g.name} - Rodada 2`,true));
      }
    }
    g.matches=shuffle(g.matches); g.table=[...g.teams]; t.groups.push(g);
  }
  t.currentStage="groups";
}
function setupKnockout(t, orderedTeams, title="Mata-mata"){
  const size=orderedTeams.length, r={ name:roundName(size), matches:[] };
  for(let i=0;i<orderedTeams.length;i+=2) r.matches.push(newMatch(orderedTeams[i],orderedTeams[i+1],r.name,false));
  t.knockout=[r]; t.currentStage="knockout";
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
function simulateNext(){ const t=data.activeTournament; const m=nextPlayable(t); if(m) simulateMatch(m.id); }
function simulateMatch(id){
  const t=data.activeTournament; if(!t || t.status==="finished") return;
  const m=allTournamentMatches(t).find(x=>x.id===id); if(!m || m.played) return;
  const result = m.allowDraw ? playGroupOrLeague(m.home,m.away,t.cfg) : playKnockout(m.home,m.away,t.cfg, m.stage==="Final");
  Object.assign(m,result,{played:true});
  if(t.currentStage==="league") updateLeagueTable(t,m);
  if(t.currentStage==="groups") updateGroupTable(t,m);
  advanceIfNeeded(t); save(); renderTournament();
}
function advanceIfNeeded(t){
  if(t.currentStage==="groups" && t.groups.every(g=>g.matches.every(m=>m.played))){
    t.groups.forEach(sortGroup);
    const qualified=[]; t.groups.forEach(g=>g.table.slice(0,2).forEach((tm,i)=>qualified.push({...tm, group:g.name, pos:i+1})));
    setupKnockout(t, orderForBracket(qualified,t.cfg), "Mata-mata");
  }
  if(t.currentStage==="knockout"){
    const last=t.knockout.at(-1); if(last && last.matches.every(m=>m.played)){
      if(last.matches.length===1){ finishTournament(t,last.matches[0]); return; }
      const winners=last.matches.map(m=>m.winner); const r={ name:roundName(winners.length), matches:[] };
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
    if(hg===ag && c.extraTime){ const et=extraGoals(a,b,c); hg+=et.a; ag+=et.b; meta+=` • prorrog. ${et.a}-${et.b}`; }
    if(hg===ag && c.penalties){ const p=pens(a,b); meta+=` • pênaltis ${p.a}-${p.b}`; const win=p.winA; return {homeGoals:hg,awayGoals:ag,winner:win?a:b,loser:win?b:a,meta,pens:p}; }
    const win=hg>=ag; return {homeGoals:hg,awayGoals:ag,winner:win?a:b,loser:win?b:a,meta};
  }
  const l1=playSingle(a,b,c,true), l2=playSingle(b,a,c,true);
  let ga=l1.homeGoals+l2.awayGoals, gb=l1.awayGoals+l2.homeGoals;
  let meta=`Ida ${l1.homeGoals}-${l1.awayGoals} • volta ${l2.homeGoals}-${l2.awayGoals}`;
  if(ga===gb && c.awayGoals){ const awayA=l2.awayGoals, awayB=l1.awayGoals; if(awayA!==awayB){ const win=awayA>awayB; return {homeGoals:ga,awayGoals:gb,winner:win?a:b,loser:win?b:a,meta:meta+" • gol fora"}; } }
  if(ga===gb && c.extraTime){ const et=extraGoals(a,b,c); ga+=et.a; gb+=et.b; meta+=` • prorrog. ${et.a}-${et.b}`; }
  if(ga===gb && c.penalties){ const p=pens(a,b); meta+=` • pênaltis ${p.a}-${p.b}`; const win=p.winA; return {homeGoals:ga,awayGoals:gb,winner:win?a:b,loser:win?b:a,meta,pens:p}; }
  const win=ga>=gb; return {homeGoals:ga,awayGoals:gb,winner:win?a:b,loser:win?b:a,meta};
}
function playSingle(a,b,c,allowDraw){
  const diff=(a.power||70)-(b.power||70), rand={low:8,medium:15,high:25,chaos:39}[c.upset];
  const base=c.realism==="chaotic"?1.75:c.realism==="normal"?1.35:1.03;
  const formA=diff/15+(Math.random()*2-1)*(rand/18), formB=-diff/15+(Math.random()*2-1)*(rand/18);
  let hg=goals(base+formA,c.realism), ag=goals(base+formB,c.realism);
  if(!allowDraw && hg===ag && Math.random()<.55) (Math.random()+diff/180>.5)?hg++:ag++;
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
function sortLeague(t){ t.league.teams.forEach(x=>x.gd=x.gf-x.ga); t.league.table=[...t.league.teams].sort(tableSort); }
function updateGroupTable(t,m){ const g=t.groups.find(x=>x.matches.some(mm=>mm.id===m.id)); if(!g) return; applyStats(g.teams,m); sortGroup(g); }
function sortGroup(g){ g.teams.forEach(x=>x.gd=x.gf-x.ga); g.table=[...g.teams].sort(tableSort); }
function tableSort(a,b){ return b.pts-a.pts || b.gd-a.gd || b.gf-a.gf || b.w-a.w || b.power-a.power || a.name.localeCompare(b.name); }
function applyStats(rows,m){ const h=rows.find(x=>x.id===m.home.id), a=rows.find(x=>x.id===m.away.id); h.gf+=m.homeGoals; h.ga+=m.awayGoals; a.gf+=m.awayGoals; a.ga+=m.homeGoals; if(m.homeGoals>m.awayGoals){h.pts+=3;h.w++;a.l++;} else if(m.homeGoals<m.awayGoals){a.pts+=3;a.w++;h.l++;} else {h.pts++;a.pts++;h.d++;a.d++;} }

function renderTournament(){
  const t=data.activeTournament;
  if(!t){ $("#tournamentName").textContent="Nenhum torneio"; $("#tournamentFormat").textContent="Torneio atual"; $("#tournamentActions").innerHTML=""; $("#summaryBar").innerHTML=""; $("#leagueArea").innerHTML=`<div class="empty-field">Crie um torneio para começar.</div>`; $("#groupsArea").innerHTML=""; $("#bracketArea").innerHTML=""; $("#knockoutTitle").style.display="none"; return; }
  $("#tournamentName").textContent=t.cfg.name; $("#tournamentFormat").textContent=formatLabel(t.cfg.format);
  const next=nextPlayable(t);
  $("#tournamentActions").innerHTML = t.status==="finished" ? `<button class="play-btn dark">🏆 Torneio finalizado e salvo</button>` : `<button class="play-btn" id="simulateNext">Simular próxima partida</button><button class="play-btn dark" data-go="create">Criar outro</button>`;
  $("#summaryBar").innerHTML = t.status==="finished"
    ? `<div class="next-card"><small>Campeão</small><strong>🏆 ${t.champion}</strong></div>`
    : `<div class="next-card"><small>Próxima partida</small><strong>${next?`${next.home.name} x ${next.away.name}`:"aguardando"}</strong></div>`;
  renderLeague(t); renderGroups(t); renderBracket(t);
  const btn=$("#simulateNext"); if(btn) btn.onclick=simulateNext;
}
function renderLeague(t){
  if(!t.league){ $("#leagueArea").innerHTML=""; return; }
  $("#knockoutTitle").style.display="none";
  const table=t.league.table||t.league.teams;
  $("#leagueArea").innerHTML = `<div class="section-title on-field"><h2>Tabela</h2></div><div class="group-card"><table class="table"><thead><tr><th>#</th><th>Time</th><th>Pts</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th><th>GP</th></tr></thead><tbody>${table.map((x,i)=>`<tr><td>${i+1}</td><td>${t.status==="finished"&&i===0?"🏆 ":""}${x.name}</td><td>${x.pts}</td><td>${x.w+x.d+x.l}</td><td>${x.w}</td><td>${x.d}</td><td>${x.l}</td><td>${x.gd}</td><td>${x.gf}</td></tr>`).join("")}</tbody></table></div><div class="section-title on-field"><h2>Rodadas</h2></div><div class="groups-grid">${t.league.rounds.map(r=>`<div class="group-card"><h3>${r.name}</h3><div class="match-list">${r.matches.map(matchMini).join("")}</div></div>`).join("")}</div>`;
}
function renderGroups(t){
  if(!t.groups?.length){ $("#groupsArea").innerHTML=""; return; }
  $("#groupsArea").innerHTML = `<div class="section-title on-field"><h2>Fase de grupos</h2></div><div class="groups-grid">${t.groups.map(g=>`<div class="group-card group-card--clean"><h3>Grupo ${g.name}</h3><table class="table group-table"><thead><tr><th>Time</th><th>Pts</th><th>J</th><th>SG</th><th>GP</th></tr></thead><tbody>${(g.table.length?g.table:g.teams).map((x,i)=>`<tr class="${i<2?"qualified":""}"><td>${x.name}</td><td>${x.pts}</td><td>${x.w+x.d+x.l}</td><td>${x.gd}</td><td>${x.gf}</td></tr>`).join("")}</tbody></table><div class="match-list">${g.matches.map(matchMini).join("")}</div></div>`).join("")}</div>`;
}
function matchMini(m){ const score=m.played?`${m.homeGoals} x ${m.awayGoals}`:"x"; return `<div class="mini-match ${m.played?"played":""}"><span>${m.home.name}</span><strong>${score}</strong><span>${m.away.name}</span>${m.played?"":`<button data-sim="${m.id}">simular</button>`}</div>`; }
function renderBracket(t){
  if(!t.knockout?.length){ $("#bracketArea").innerHTML=""; $("#knockoutTitle").style.display=t.league?"none":"flex"; return; }
  $("#knockoutTitle").style.display="flex";
  const finalWinner=t.status==="finished"?t.champion:null;
  $("#bracketArea").innerHTML = t.knockout.map(r=>`<div class="round"><h3>${r.name}</h3>${r.matches.map(m=>`<div class="match"><div class="match-team ${m.played&&m.winner?.id===m.home.id?"winner":""} ${finalWinner===m.home.name&&r.name==="Final"?"champion":""}"><span>${finalWinner===m.home.name&&r.name==="Final"?"🏆 ":""}${m.home.name}</span><strong>${m.played?m.homeGoals:"-"}</strong></div><div class="match-team ${m.played&&m.winner?.id===m.away.id?"winner":""} ${finalWinner===m.away.name&&r.name==="Final"?"champion":""}"><span>${finalWinner===m.away.name&&r.name==="Final"?"🏆 ":""}${m.away.name}</span><strong>${m.played?m.awayGoals:"-"}</strong></div><div class="match-meta">${m.played?m.meta:"Aguardando simulação"}</div>${m.played?"":`<div class="match-actions"><button data-sim="${m.id}">Simular partida</button></div>`}</div>`).join("")}</div>`).join("");
}

function flattenMatches(t){ return allTournamentMatches(t).filter(m=>m.played).map(m=>({home:m.home.name,away:m.away.name,homeGoals:m.homeGoals,awayGoals:m.awayGoals,winner:m.winner?.name || (m.homeGoals===m.awayGoals?null:(m.homeGoals>m.awayGoals?m.home.name:m.away.name)),loser:m.loser?.name || null,stage:m.stage,meta:m.meta,pens:m.pens,played:true})); }
function saveEdition(t){ const c=data.competitions.find(x=>x.id===t.cfg.competitionId) || data.competitions[0]; if(!c) return; c.editions.push({id:uid(), name:t.cfg.name, format:formatLabel(t.cfg.format), champion:t.champion, runnerUp:t.runnerUp, date:new Date().getFullYear().toString(), teams:t.teams.map(x=>x.name), matches:flattenMatches(t), leagueTable:t.league?.table?.map(x=>({team:x.name,pts:x.pts,w:x.w,d:x.d,l:x.l,gf:x.gf,ga:x.ga,gd:x.gd}))||null}); save(); }

function statsFor(c){
  const editions=c.editions||[], matches=editions.flatMap(e=>e.matches||[]), teams=[...new Set(editions.flatMap(e=>e.teams||[]))];
  const titles={}, vices={}, finals={}, parts={}, pensTitles={}, teamStats={};
  const ensure=n=> n ? (teamStats[n] ||= {team:n,titles:0,vices:0,finals:0,parts:0,played:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,points:0}) : null;
  editions.forEach(e=>{ if(e.champion){titles[e.champion]=(titles[e.champion]||0)+1; ensure(e.champion).titles++;} if(e.runnerUp){vices[e.runnerUp]=(vices[e.runnerUp]||0)+1; ensure(e.runnerUp).vices++;} [e.champion,e.runnerUp].filter(Boolean).forEach(n=>{finals[n]=(finals[n]||0)+1; ensure(n).finals++;}); (e.teams||[]).forEach(n=>{parts[n]=(parts[n]||0)+1; ensure(n).parts++;}); const fm=(e.matches||[]).find(m=>(m.stage||"").toLowerCase().includes("final")); if(fm?.pens && e.champion) pensTitles[e.champion]=(pensTitles[e.champion]||0)+1; });
  matches.forEach(m=>{ const h=ensure(m.home), a=ensure(m.away); if(!h||!a) return; const hg=Number(m.homeGoals||0), ag=Number(m.awayGoals||0); h.gf+=hg;h.ga+=ag;h.played++;a.gf+=ag;a.ga+=hg;a.played++; if(hg>ag){h.w++;a.l++;h.points+=3;} else if(hg<ag){a.w++;h.l++;a.points+=3;} else {h.d++;a.d++;h.points++;a.points++;} });
  Object.values(teamStats).forEach(t=>t.gd=t.gf-t.ga);
  const biggestWin=matches.map(m=>({m,diff:Math.abs((m.homeGoals||0)-(m.awayGoals||0)),total:(m.homeGoals||0)+(m.awayGoals||0)})).sort((a,b)=>b.diff-a.diff||b.total-a.total)[0]?.m;
  const finalGoals=matches.filter(m=>(m.stage||"").toLowerCase().includes("final")).map(m=>({m,total:(m.homeGoals||0)+(m.awayGoals||0)})).sort((a,b)=>b.total-a.total)[0]?.m;
  const undefeated=editions.filter(e=>e.champion && !(e.matches||[]).some(m=> (m.home===e.champion && m.homeGoals<m.awayGoals) || (m.away===e.champion && m.awayGoals<m.homeGoals))).map(e=>e.champion);
  const topChampion=rankEntries(titles)[0]?.[0] || "—";
  return {editions,matches,teams,titles,vices,finals,parts,pensTitles,teamStats,biggestWin,finalGoals,undefeated,topChampion};
}
function rankCard(title,obj,unit){ const rows=rankEntries(obj).slice(0,6).map(([n,v],i)=>`<div class="rank-row"><span>${medal(i)} ${n}</span><strong>${v} ${unit}</strong></div>`).join("") || `<small class="muted">Sem dados ainda.</small>`; return `<div class="stat-card"><h3>${title}</h3>${rows}</div>`; }
function feature(title,value,sub=""){ return `<div class="stat-card featured"><small>${title}</small><strong>${value||"—"}</strong><span>${sub}</span></div>`; }
function matchText(m){ return m?`${m.home} ${m.homeGoals} x ${m.awayGoals} ${m.away}`:"—"; }
function renderCompetitionDetail(c){
  const s=statsFor(c);
  $("#competitionHero").innerHTML = [`<div class="stat"><small>Edições</small><strong>${s.editions.length}</strong></div>`,`<div class="stat"><small>Jogos salvos</small><strong>${s.matches.length}</strong></div>`,`<div class="stat"><small>Times</small><strong>${s.teams.length}</strong></div>`,`<div class="stat"><small>Maior campeão</small><strong>${s.topChampion}</strong></div>`].join("");
  $("#overviewStats").innerHTML = [feature("🏆 Maior campeão",s.topChampion),feature("🥈 Rei dos vices",rankEntries(s.vices)[0]?.[0]||"—"),feature("⚽ Maior goleada",matchText(s.biggestWin)),feature("🔥 Final com mais gols",matchText(s.finalGoals)),rankCard("Maiores campeões",s.titles,"títulos"),rankCard("Mais finais",s.finals,"finais")].join("");
  $("#rankingStats").innerHTML = [rankCard("Maiores campeões",s.titles,"títulos"),rankCard("Maiores vices",s.vices,"vices"),rankCard("Mais finais",s.finals,"finais"),rankCard("Mais participações",s.parts,"part."),rankCard("Títulos nos pênaltis",s.pensTitles,"títulos")].join("");
  $("#teamStatsList").innerHTML = Object.values(s.teamStats).sort((a,b)=>b.titles-a.titles||b.points-a.points||b.gd-a.gd||b.gf-a.gf).map(t=>`<div class="list-card"><div><strong>${t.team}</strong><small>${t.titles} títulos • ${t.vices} vices • ${t.parts} participações</small><small>${t.played}J ${t.w}V ${t.d}E ${t.l}D • GP ${t.gf} • GC ${t.ga} • SG ${t.gd}</small></div><span class="pill">${t.points} pts</span></div>`).join("") || `<div class="panel">Sem estatísticas de times.</div>`;
  $("#recordStats").innerHTML = [feature("Maior goleada",matchText(s.biggestWin)),feature("Final com mais gols",matchText(s.finalGoals)),feature("Campeões invictos",[...new Set(s.undefeated)].slice(0,5).join(", ")||"—"),rankCard("Títulos decididos nos pênaltis",s.pensTitles,"títulos")].join("");
  $("#editionList").innerHTML = c.editions.map(e=>`<div class="list-card"><div><strong>${e.name}</strong><small>${e.format||"Torneio"} • campeão: ${e.champion||"—"} • vice: ${e.runnerUp||"—"}</small><small>${(e.matches||[]).length} jogos • ${(e.teams||[]).length} times</small></div><button class="danger mini-danger" data-delete-edition="${e.id}">apagar</button></div>`).join("") || `<div class="panel">Nenhuma edição salva.</div>`;
}

function deleteEdition(id){ const c=data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return; if(confirm("Apagar esta edição?")){ c.editions=c.editions.filter(e=>e.id!==id); save(); renderCompetitionDetail(c); renderCompetitions(); } }
function deleteCustomTeam(id){ if(confirm("Apagar este time criado?")){ data.customTeams=data.customTeams.filter(t=>t.id!==id); save(); renderAll(); } }

$("#toggleCompetitionForm").onclick=()=>$("#competitionForm").hidden=!$("#competitionForm").hidden;
$("#saveCompetition").onclick=()=>{ const name=$("#newCompetitionName").value.trim(); if(!name) return; const c={id:uid(),name,editions:[]}; data.competitions.push(c); currentCompetitionId=c.id; $("#newCompetitionName").value=""; $("#competitionForm").hidden=true; save(); renderAll(); };
$("#renameCompetition").onclick=()=>{ const c=data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return; c.name=$("#editCompetitionName").value.trim()||c.name; save(); openCompetition(c.id); };
$("#deleteCompetition").onclick=()=>{ const c=data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return; if(confirm(`Apagar o campeonato "${c.name}" e todas as edições?`)){ data.competitions=data.competitions.filter(x=>x.id!==c.id); if(!data.competitions.length) data.competitions.push({id:uid(),name:"Novo Campeonato",editions:[]}); currentCompetitionId=data.competitions[0].id; save(); go("competitions"); } };
$("#addCustomTeam").onclick=()=>{ const name=$("#customTeamName").value.trim(), power=clamp(Number($("#customTeamPower").value)||70,1,100); if(!name) return; data.customTeams.push(team(name,power,"Meu time")); $("#customTeamName").value=""; save(); renderAll(); };
$("#pickStrongest").onclick=pickStrongest; $("#pickRandom").onclick=pickRandom; $("#pickBalanced").onclick=pickBalanced; $("#clearTeams").onclick=()=>{selectedTeams=[]; previewOrder=null; renderSelected();};
$("#fillMissingRandom").onclick=()=>fillMissing("random"); $("#fillMissingStrongest").onclick=()=>fillMissing("strongest"); $("#selectVisible").onclick=selectVisibleTeams; $("#applyQuotas").onclick=applyQuotas; $("#reshufflePreview").onclick=reshufflePreview;
$("#teamSearch").oninput=e=>{teamSearch=e.target.value; renderAvailableTeams();}; $("#powerFilter").onchange=e=>{powerFilter=e.target.value; renderAvailableTeams();};
$("#generateTournament").onclick=generateTournament;
$("#formatSelect").onchange=()=>{ previewOrder=null; toggleRuleVisibility(); renderDrawPreview(); }; $("#teamCount").onchange=()=>{ selectedTeams=selectedTeams.slice(0,Number($("#teamCount").value)); previewOrder=null; renderSelected(); };
$("#competitionSelect").onchange=e=>currentCompetitionId=e.target.value;
$("#resetLocal").onclick=()=>{ if(confirm("Limpar dados locais do Brocket neste navegador?")){ localStorage.removeItem(STORAGE); data=structuredClone(starter); currentCompetitionId=data.competitions[0].id; selectedTeams=[]; save(); renderAll(); go("home"); } };
document.addEventListener("change",e=>{
  const p=e.target.closest("[data-pack]"); if(p){ p.checked?selectedPacks.add(p.dataset.pack):selectedPacks.delete(p.dataset.pack); selectedTeams=[]; previewOrder=null; renderAll(); return; }
  const pow=e.target.closest("[data-power-team]"); if(pow){ const t=selectedTeams.find(x=>x.id===pow.dataset.powerTeam); if(t){ t.power=clamp(Number(pow.value)||70,1,100); previewOrder=null; renderSelected(); } return; }
  if(["bracketShuffle","groupShuffle","groupTurns","groupSize","leagueTurns"].includes(e.target.id)){ previewOrder=null; renderDrawPreview(); }
});
$$('.tab').forEach(t=>t.onclick=()=>{ $$('.tab').forEach(x=>x.classList.remove('active')); t.classList.add('active'); $$('.tab-page').forEach(p=>p.classList.remove('active')); $(`#${t.dataset.tab}Tab`)?.classList.add('active'); });

renderAll();
if(!selectedTeams.length) pickBalanced();
