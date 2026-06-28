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

const KNOWN_SHORTS = {
  "Flamengo":"FLA", "Palmeiras":"PAL", "Botafogo":"BOT", "Atlético-MG":"CAM", "São Paulo":"SAO", "Fluminense":"FLU", "Corinthians":"COR", "Grêmio":"GRE", "Internacional":"INT", "Athletico-PR":"CAP", "Bahia":"BAH", "Fortaleza":"FOR", "Cruzeiro":"CRU", "Vasco":"VAS", "Santos":"SAN", "Ceará":"CEA", "Sport":"SPT", "Vitória":"VIT", "Bragantino":"RBB", "Cuiabá":"CUI",
  "Goiás":"GOI", "Coritiba":"CFC", "Avaí":"AVA", "Chapecoense":"CHA", "Guarani":"GUA", "Ponte Preta":"PON", "Vila Nova":"VIL", "Novorizontino":"NOV", "CRB":"CRB", "Operário-PR":"OPE", "Paysandu":"PAY", "Remo":"REM", "Amazonas":"AMA", "Botafogo-SP":"BSP", "Criciúma":"CRI", "Juventude":"JUV",
  "Real Madrid":"RMA", "Manchester City":"MCI", "Bayern München":"BAY", "PSG":"PSG", "Liverpool":"LIV", "Barcelona":"BAR", "Arsenal":"ARS", "Inter de Milão":"INT", "Bayer Leverkusen":"B04", "Atlético de Madrid":"ATM", "Borussia Dortmund":"BVB", "Milan":"MIL", "Juventus":"JUV", "Napoli":"NAP", "Chelsea":"CHE", "RB Leipzig":"RBL", "Benfica":"BEN", "Sporting":"SCP", "Porto":"POR", "Tottenham":"TOT", "Manchester United":"MUN", "Roma":"ROM", "Ajax":"AJA", "Sevilla":"SEV",
  "Aston Villa":"AVL", "Newcastle":"NEW", "Brighton":"BHA", "Lille":"LIL", "Lyon":"LYO", "Marseille":"OM", "Atalanta":"ATA", "Fiorentina":"FIO", "Lazio":"LAZ", "Real Sociedad":"RSO", "Villarreal":"VIL", "Athletic Bilbao":"ATH", "Braga":"BRA", "PSV":"PSV", "Feyenoord":"FEY", "Celtic":"CEL", "Rangers":"RAN", "Galatasaray":"GAL", "Fenerbahçe":"FEN", "Shakhtar Donetsk":"SHK",
  "River Plate":"RIV", "Boca Juniors":"BOC", "Independiente del Valle":"IDV", "Racing":"RAC", "Estudiantes":"EST", "LDU":"LDU", "Peñarol":"PEN", "Nacional-URU":"NAC", "Atlético Nacional":"NAL", "Olimpia":"OLI", "Colo-Colo":"COL", "San Lorenzo":"SLO", "Cerro Porteño":"CER", "Barcelona SC":"BSC", "Millonarios":"MIL", "Universidad de Chile":"UCH", "Deportivo Cali":"CAL", "Independiente":"IND",
  "Al Hilal":"HIL", "Al Nassr":"NAS", "Al Ahly":"AHL", "Al Ittihad":"ITT", "Monterrey":"MTY", "América-MEX":"AME", "Tigres":"TIG", "Mamelodi Sundowns":"SUN", "Wydad Casablanca":"WYD", "Inter Miami":"MIA", "LAFC":"LAFC", "Urawa Red Diamonds":"URA", "Kawasaki Frontale":"KAW", "Zamalek":"ZAM", "Yokohama F. Marinos":"YFM", "Ulsan HD":"ULS", "Seattle Sounders":"SEA", "Jeonbuk Hyundai":"JEO",
  "Al Ahli":"AHL", "Vissel Kobe":"VIS", "Pohang Steelers":"POH", "Shanghai Port":"SIP", "Al Sadd":"SAD", "Persepolis":"PER", "Orlando Pirates":"PIR", "Raja Casablanca":"RCA", "Esperance":"EST", "Étoile du Sahel":"ESS", "TP Mazembe":"TPM", "Simba SC":"SIM", "Young Africans":"YNG",
  "Cruz Azul":"CAZ", "Chivas":"CHI", "Pachuca":"PAC", "Columbus Crew":"CLB", "NYCFC":"NYC", "Philadelphia Union":"PHI", "Toronto FC":"TOR", "Saprissa":"SAP", "Alajuelense":"ALA",
  "França":"FRA", "Argentina":"ARG", "Brasil":"BRA", "Inglaterra":"ENG", "Espanha":"ESP", "Portugal":"POR", "Alemanha":"GER", "Holanda":"NED", "Itália":"ITA", "Bélgica":"BEL", "Uruguai":"URU", "Croácia":"CRO", "Colômbia":"COL", "Marrocos":"MAR", "Suíça":"SUI", "Senegal":"SEN", "Dinamarca":"DEN", "Japão":"JPN", "México":"MEX", "Estados Unidos":"USA", "Coreia do Sul":"KOR", "Egito":"EGY", "Chile":"CHI", "Austrália":"AUS", "Equador":"ECU", "Nigéria":"NGA", "Irã":"IRN", "Costa do Marfim":"CIV", "Argélia":"ALG", "Turquia":"TUR", "Sérvia":"SRB", "Noruega":"NOR", "Polônia":"POL", "Ucrânia":"UKR", "Áustria":"AUT", "Canadá":"CAN", "Arábia Saudita":"KSA", "Qatar":"QAT", "Gana":"GHA", "Camarões":"CMR", "Tunísia":"TUN", "África do Sul":"RSA", "Paraguai":"PAR", "Peru":"PER", "Panamá":"PAN", "Jamaica":"JAM", "Nova Zelândia":"NZL", "Uzbequistão":"UZB", "Escócia":"SCO", "Iraque":"IRQ", "Emirados Árabes":"UAE", "China":"CHN", "Venezuela":"VEN", "Bolívia":"BOL", "Mali":"MLI", "Congo DR":"COD", "Costa Rica":"CRC", "Honduras":"HON", "El Salvador":"SLV", "Haiti":"HAI", "Trinidad e Tobago":"TRI",
  "Santos 1962":"SAN", "Brasil 1970":"BRA", "Milan 1989":"MIL", "Barcelona 2011":"BAR", "Real Madrid 2017":"RMA", "Manchester United 1999":"MUN", "Ajax 1995":"AJA", "Boca Juniors 2003":"BOC", "São Paulo 2005":"SAO", "Flamengo 1981":"FLA", "Palmeiras 1999":"PAL", "Inter 2010":"INT"
};
function cleanShort(v){ return `${v||""}`.trim().toUpperCase().replace(/[^A-Z0-9]/g,"").slice(0,5); }
function fallbackShort(name){ const letters=`${name||""}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Za-z0-9]/g,"").toUpperCase(); return (letters||"---").slice(0,3); }
function teamShort(t){ return cleanShort(t?.short) || cleanShort(KNOWN_SHORTS[t?.name]) || fallbackShort(t?.name); }

function crestHash(str){
  let h=2166136261;
  for(let i=0;i<`${str||""}`.length;i++){ h^=`${str||""}`.charCodeAt(i); h=Math.imul(h,16777619)>>>0; }
  return h>>>0;
}
const CREST_PALETTE=[
  ["#e11d48","#7f1d1d"],["#f59e0b","#78350f"],["#10b981","#064e3b"],["#3b82f6","#1e3a8a"],
  ["#8b5cf6","#4c1d95"],["#ec4899","#831843"],["#14b8a6","#134e4a"],["#f97316","#7c2d12"],
  ["#0ea5e9","#0c4a6e"],["#a3a3a3","#3f3f46"],["#eab308","#713f12"],["#22c55e","#14532d"]
];
function crestInitials(name){
  const clean=`${name||""}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^\p{L}\p{N}\s-]/gu,"").trim();
  const parts=clean.split(/\s+/).filter(Boolean);
  if(!parts.length) return "?";
  if(parts.length===1) return (parts[0][0]+(parts[0][1]||"")).toUpperCase();
  return (parts[0][0]+parts.at(-1)[0]).toUpperCase();
}
function builtinPackCrest(name,source=""){
  const h=crestHash(`${source}:${name}`);
  const [a,b]=CREST_PALETTE[h%CREST_PALETTE.length];
  const initials=crestInitials(name).replace(/[^A-Z0-9]/g,"").slice(0,3) || "?";
  const shape=["shield","round","diamond"][h%3];
  const band=(h>>3)%4;
  const stripe = band===0
    ? `<path d="M0 36h96v24H0z" fill="rgba(255,255,255,.22)"/>`
    : band===1
      ? `<path d="M22 0h18v96H22zM56 0h18v96H56z" fill="rgba(255,255,255,.18)"/>`
      : band===2
        ? `<path d="M-8 75L74-7l16 16L8 91z" fill="rgba(255,255,255,.18)"/>`
        : `<circle cx="48" cy="48" r="22" fill="rgba(255,255,255,.13)"/>`;
  const mask = shape==="round"
    ? `<circle cx="48" cy="48" r="44"/>`
    : shape==="diamond"
      ? `<path d="M48 4 92 48 48 92 4 48z"/>`
      : `<path d="M48 4 86 14 82 58 48 92 14 58 10 14z"/>`;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient><clipPath id="c">${mask}</clipPath></defs><g clip-path="url(#c)"><rect width="96" height="96" fill="url(#g)"/>${stripe}<path d="M8 8h80v80H8z" fill="none" stroke="rgba(255,255,255,.28)" stroke-width="4"/></g><text x="48" y="57" text-anchor="middle" font-family="Arial, sans-serif" font-size="${initials.length>2?24:30}" font-weight="900" fill="white" style="paint-order:stroke;stroke:rgba(0,0,0,.35);stroke-width:3">${initials}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function ensureTeamCrest(name,source=""){
  const n=`${name||""}`.trim();
  if(!n) return "";
  data.crests ||= {};
  if(!data.crests[n]) data.crests[n]=builtinPackCrest(n,source);
  return data.crests[n];
}

function teamCrestUrl(t){
  const name=typeof t==="string"?t:t?.name;
  return (typeof t==="object" && t?.crest) || data.crests?.[name] || data.crests?.[`${name||""}`.trim()] || "";
}
function teamCrest(t,size=22){
  const name=typeof t==="string"?t:t?.name;
  const url=teamCrestUrl(t);
  const label=escapeHtml(crestInitials(name));
  if(url) return `<span class="team-crest crest-img" style="--crest-size:${size}px"><img src="${escapeAttr(url)}" alt="" loading="lazy" /></span>`;
  const h=crestHash(name);
  const [a,b]=CREST_PALETTE[h%CREST_PALETTE.length];
  const shape=["shield","round","diamond"][(h>>4)%3];
  return `<span class="team-crest crest-${shape}" style="--crest-size:${size}px;--crest-a:${a};--crest-b:${b}"><em>${label}</em></span>`;
}
function teamNameWithCrest(t,opts={}){
  const name=typeof t==="string"?t:t?.name;
  const compact=opts.compact ? teamShort(t) : "";
  return `<span class="team-name-with-crest ${opts.dim?"dim":""} ${opts.compact?"team-name-compact":""}" title="${escapeAttr(name||"")}">${teamCrest(t,opts.size||22)}<span class="team-full">${escapeHtml(name||"")}</span>${opts.compact?`<span class="team-short">${escapeHtml(compact)}</span>`:""}</span>`;
}
function escapeHtml(v){ return `${v??""}`.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m])); }
function escapeAttr(v){ return escapeHtml(v).replace(/`/g,"&#96;"); }


const starter = { competitions:[], customTeams:[], customPacks:[], crests:{}, footballDataToken:"", activeTournament:null };

let data = load();
function sanitizeLoadedData(d){
  if(!d) return structuredClone(starter);
  d.competitions = Array.isArray(d.competitions) ? d.competitions : [];
  d.customTeams = Array.isArray(d.customTeams) ? d.customTeams : [];
  d.customPacks = Array.isArray(d.customPacks) ? d.customPacks : [];
  d.crests = d.crests && typeof d.crests==="object" ? d.crests : {};
  d.footballDataToken = `${d.footballDataToken || localStorage.getItem("brocket-football-data-token") || ""}`;
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
let expandedMatches = new Set();
if(!data.crests || !Object.keys(data.crests).length){
  Object.values(packs).forEach(p=>p.teams.forEach(([name])=>{ data.crests[name]=builtinPackCrest(name,p.name); }));
  save();
}

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
function team(name,power,source="",short="",crest=""){
  const manualShort=cleanShort(short);
  return { id:slug(name), name, power, source, short: manualShort || cleanShort(KNOWN_SHORTS[name]) || "", crest: `${crest||""}`.trim() };
}
function shuffle(a){ return a.map(x=>[Math.random(),x]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]); }
function clamp(n,a,b){ return Math.max(a,Math.min(b,n)); }
function label(v){ return {low:"baixa",medium:"média",high:"alta",chaos:"caótica"}[v] || v; }
function formatLabel(f){ return {playoffs:"Mata-mata direto",groups:"Grupos + mata-mata",clubWorldCup:"Grupos + mata-mata",league:"Pontos corridos"}[f] || f; }

function getInputNumber(id,fallback=0){ const el=$("#"+id); return el ? (Number(el.value)||fallback) : fallback; }
function desiredTeamCount(){
  // 0.8.4 final: a quantidade escolhida pelo usuário manda.
  // O número de grupos se adapta para caber essa quantidade, mas nunca aumenta
  // a quantidade de times por causa de grupoCount x groupSize.
  return getInputNumber("teamCount",16);
}
function competitionNameFromCfg(c){ return (c?.championshipName || c?.competitionName || c?.name || "Campeonato").trim(); }
function divisionLabel(c){ return (c?.divisionName || "").trim(); }
function autoEditionName(c){
  const comp=competitionNameFromCfg(c);
  const div=divisionLabel(c);
  const season=c?.seasonName || c?.customEditionName || "Temporada 1";
  return [comp, div, season].filter(Boolean).join(" — ");
}
function optionValue(id,fallback=""){ const el=$("#"+id); return el ? el.value : fallback; }

function pool(){
  const map = new Map();
  selectedPacks.forEach(k => {
    const p = allPacks()[k];
    if(p) p.teams.forEach(([name,power,short,crest]) => {
      const url = crest || ensureTeamCrest(name,p.name);
      map.set(slug(name), team(name,power,p.name,short,url));
    });
  });
  data.customTeams.forEach(t => {
    if(t.name && !teamCrestUrl(t)) t.crest = ensureTeamCrest(t.name,t.source||"Meu time");
    map.set(t.id, t);
  });
  return Array.from(map.values());
}
function allPacks(){
  const custom = {};
  (data.customPacks||[]).forEach(p=>custom[p.id]={name:p.name, icon:"🧩", teams:p.teams.map(t=>[t.name,t.power,t.short||"",t.crest||data.crests?.[t.name]||""])});
  return {...packs, ...custom};
}
function rankEntries(obj,asc=false){ return Object.entries(obj).sort((a,b)=>asc ? (a[1]-b[1] || a[0].localeCompare(b[0])) : (b[1]-a[1] || a[0].localeCompare(b[0]))); }
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
  if(!v) return "";
  const n=Math.abs(Number(v)||0);
  if(!n) return "";
  return v>0 ? `<span class="delta-badge up">↑${n}</span>` : `<span class="delta-badge down">↓${n}</span>`;
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

function teamCellWithDelta(x, champion=false){
  const trophy=champion?"🏆 ":"";
  const cls=champion?"champion-name":"";
  return `<span class="team-cell-fake"><strong class="${cls}">${trophy}${x.name}</strong><span class="fake-delta">${deltaBadge(x.posDelta)}</span></span>`;
}
function scoreCell(m,side){
  if(!m.played) return "-";
  const base=side==="home"?m.homeGoals:m.awayGoals;
  if(m.pens) return `${base} <small>(${side==="home"?m.pens.a:m.pens.b})</small>`;
  return base;
}
function decisionLabel(m){
  if(!m?.played) return "Aguardando simulação";
  const meta=(m.meta||"").toLowerCase();
  const ap=meta.includes("prorrog") || (m.meta||"").includes("A.P.");
  const pen=!!m.pens || meta.includes("pênaltis");
  if(ap && pen) return "A.P. + Pênaltis";
  if(pen) return "Pênaltis";
  if(ap) return "A.P.";
  return "";
}
function compactDecisionLabel(m){
  if(!m?.played) return "";
  const meta=(m.meta||"").toLowerCase();
  const ap=meta.includes("prorrog") || (m.meta||"").includes("A.P.");
  const pen=!!m.pens || meta.includes("pênaltis");
  if(ap && !pen) return "A.P.";
  return "";
}


function go(screen){
  $$(".screen").forEach(s=>s.classList.toggle("active",s.id===screen));
  $$(".nav-btn").forEach(b=>b.classList.toggle("active",b.dataset.go===screen));
  const titles = {home:["0.8.4","Início"],create:["Novo","Criar torneio"],teamPicker:["Times","Selecionar times"],groupBuilder:["Grupos","Montar grupos"],tournament:["Simulação","Torneio atual"],competitions:["Histórico","Campeonatos"],competitionDetail:["Central","Estatísticas"],teams:["Participantes","Times"],settings:["Ajustes","Configurações"]};
  $("#pageSubtitle").textContent = titles[screen]?.[0] || "Brocket";
  $("#pageTitle").textContent = titles[screen]?.[1] || "Brocket";
  window.scrollTo(0,0);
  renderAll();
}

document.addEventListener("click", e=>{
  const leagueRound=e.target.closest("[data-league-round]"); if(leagueRound){ setLeagueRound(leagueRound.dataset.leagueRound); return; }
  const groupRound=e.target.closest("[data-group-round]"); if(groupRound){ const t=data.activeTournament; const stages=[...new Set((t?.groups||[]).flatMap(g=>g.matches.map(m=>(m.stage.match(/Rodada \d+/)||["Rodada 1"])[0])))]; setGroupRound(stages[Number(groupRound.dataset.groupRound)]||stages[0]); return; }
  const simGroup=e.target.closest("[data-sim-group]"); if(simGroup){ simulateGroup(simGroup.dataset.simGroup); return; }
  const exp=e.target.closest("[data-export-table]"); if(exp){ exportCurrentTable(exp.dataset.exportTable); return; }
  const expBracket=e.target.closest("[data-export-bracket]"); if(expBracket){ exportCurrentBracket(); return; }
  const nav = e.target.closest("[data-go]"); if(nav){ go(nav.dataset.go); return; }
  const comp = e.target.closest("[data-comp]"); if(comp){ openCompetition(comp.dataset.comp); return; }
  const quickComp = e.target.closest("#quickCreateCompetition"); if(quickComp){ $("#competitionForm").hidden=false; return; }
  const remGroup=e.target.closest("[data-remove-from-group]"); if(remGroup){ manualGroups?.forEach(g=>{ const idx=g.findIndex(x=>x.id===remGroup.dataset.removeFromGroup); if(idx>=0) g.splice(idx,1); }); renderManualGroups(); return; }
  const sim = e.target.closest("[data-sim]"); if(sim){ simulateMatch(sim.dataset.sim); return; }
  const editMatch=e.target.closest("[data-edit-match]"); if(editMatch){ openManualResult(editMatch.dataset.editMatch); return; }
  const delEdition = e.target.closest("[data-delete-edition]"); if(delEdition){ deleteEdition(delEdition.dataset.deleteEdition); return; }
  const delCompetition = e.target.closest("[data-delete-competition]"); if(delCompetition){ deleteCompetition(delCompetition.dataset.deleteCompetition); return; }
  const delCustom = e.target.closest("[data-delete-custom]"); if(delCustom){ deleteCustomTeam(delCustom.dataset.deleteCustom); return; }
  const delPack = e.target.closest("[data-delete-pack]"); if(delPack){ data.customPacks=(data.customPacks||[]).filter(p=>p.id!==delPack.dataset.deletePack); selectedPacks.delete(delPack.dataset.deletePack); save(); renderAll(); return; }
  const toggleTeam = e.target.closest("[data-toggle-team]"); if(toggleTeam){ const id=toggleTeam.dataset.toggleTeam; const t=pool().find(x=>x.id===id); if(!t) return; isSelected(id)?removeTeam(id):addTeam(t); renderSelected(); return; }
  const removeBtn = e.target.closest("[data-remove-team]"); if(removeBtn){ removeTeam(removeBtn.dataset.removeTeam); renderSelected(); return; }
  const card=e.target.closest("[data-toggle-match-details]");
  if(card && !e.target.closest("button")){
    const id=card.dataset.toggleMatchDetails;
    expandedMatches.has(id) ? expandedMatches.delete(id) : expandedMatches.add(id);
    renderTournament();
    return;
  }
});

function renderAll(){ renderCompetitions(); renderCompetitionSelect(); updateSaveModeUI(); renderPacks(); renderSelected(); renderCustomTeams(); renderCustomPacks(); renderManualGroups(); toggleRuleVisibility(); renderFootballDataSettings(); renderTournament(); }
function renderCompetitionSelect(){
  const select=$("#competitionSelect"); if(!select) return;
  if(!data.competitions.length){ select.innerHTML=`<option value="">Nenhum campeonato criado</option>`; currentCompetitionId=null; updateSaveModeUI(); return; }
  if(!currentCompetitionId || !data.competitions.some(c=>c.id===currentCompetitionId)) currentCompetitionId=data.competitions[0]?.id || null;
  select.innerHTML = data.competitions.map(c=>`<option value="${c.id}" ${c.id===currentCompetitionId?"selected":""}>${c.name}</option>`).join("");
  updateSaveModeUI();
}
function currentSaveMode(){ return document.querySelector('input[name="saveMode"]:checked')?.value || "single"; }
function updateSaveModeUI(){
  const mode=currentSaveMode();
  const isHistory=mode==="history";
  const singleNameField=$("#singleNameField");
  const choice=$("#competitionChoice");
  if(singleNameField) singleNameField.hidden=isHistory;
  if(choice) choice.hidden=!isHistory;
  const title=$("#create .section-title h2");
  if(title) title.textContent=isHistory?"Nova edição":"Novo torneio";
  const nameInput=$("#championshipName");
  if(nameInput && !isHistory && !nameInput.value.trim()) nameInput.value="Liga Mundial";
}
function renderCompetitions(){
  const html = data.competitions.map(c=>{
    const s=statsFor(c);
    return `<div class="list-card competition-card"><button class="competition-open" data-comp="${c.id}"><div><strong>${c.name}</strong><small>${c.editions.length} edições • maior campeão: ${s.topChampion}</small></div></button><div class="competition-actions"><button class="pill" data-comp="${c.id}">abrir</button><button class="mini-danger" data-delete-competition="${c.id}">apagar</button></div></div>`;
  }).join("");
  const homeHtml = data.competitions.map(c=>{ const s=statsFor(c); return `<button class="list-card" data-comp="${c.id}"><div><strong>${c.name}</strong><small>${c.editions.length} edições • maior campeão: ${s.topChampion}</small></div><span class="pill">abrir</span></button>`; }).join("");
  const emptyHome = `<div class="empty-card"><strong>Nenhum campeonato criado</strong><small>Crie um campeonato na aba Campeonatos para guardar edições e estatísticas históricas.</small></div>`;
  const emptyList = `<div class="empty-card clean-empty"><strong>Nenhum campeonato criado</strong><small>Use o campo acima e o botão + novo para criar um campeonato.</small></div>`;
  $("#competitionList").innerHTML = html || emptyList;
  $("#homeCompetitions").innerHTML = homeHtml || emptyHome;
}
function openCompetition(id){ currentCompetitionId=id; const c=data.competitions.find(x=>x.id===id); if(!c) return; $("#competitionTitle").textContent=c.name; $("#editCompetitionName").value=c.name; renderCompetitionDetail(c); go("competitionDetail"); }

function renderPacks(){
  $("#packList").innerHTML = Object.entries(allPacks()).map(([key,p])=>{ const sample=p.teams.slice(0,3).map(([name,,short,crest])=>teamCrest({name,short,crest:crest||data.crests?.[name]||ensureTeamCrest(name,p.name)},20)).join(""); return `<label class="pack"><input type="checkbox" data-pack="${key}" ${selectedPacks.has(key)?"checked":""}/><span>${p.icon}</span><div><strong>${p.name}</strong><small>${p.teams.length} times</small><div class="pack-crest-sample">${sample}</div></div></label>`; }).join("");
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
  const need=desiredTeamCount();
  if(isSelected(t.id)) return;
  if(selectedTeams.length>=need){ alert(`O torneio já tem ${need} times selecionados.`); return; }
  selectedTeams.push({...t});
  previewOrder=null;
}
function removeTeam(id){ selectedTeams=selectedTeams.filter(t=>t.id!==id); previewOrder=null; }
function renderAvailableTeams(){
  const list=filteredPool(), need=desiredTeamCount();
  const ac=$("#availableCount"); if(ac) ac.textContent = `${list.length} filtrados`;
  if($("#availableTeams")) $("#availableTeams").innerHTML = list.map(t=>{
    const checked=isSelected(t.id);
    return `<button class="team-pick ${checked?"chosen":""}" data-toggle-team="${t.id}">
      <span class="pick-dot">${checked?"✓":"+"}</span>
      <div><strong>${teamNameWithCrest(t,{size:22})}</strong><small>${t.source || "Meu time"} • força ${t.power}</small></div>
    </button>`;
  }).join("") || `<div class="team-row"><small>Nenhum time encontrado.</small></div>`;
}
function renderSelected(){
  const need = desiredTeamCount();
  const countText = `${selectedTeams.length}/${need}`;
  const sc=$("#selectedCount"); if(sc) sc.textContent = countText;
  const mc=$("#manualSelectedCount"); if(mc) mc.textContent = countText;
  const summary = selectedTeams.slice(0,6).map(t=>`<div class="team-row selected-row">
    <div><strong>${teamNameWithCrest(t,{size:22})}</strong><small>${t.source || "personalizado"} • força ${t.power}</small></div>
  </div>`).join("") + (selectedTeams.length>6 ? `<div class="team-row"><small>+ ${selectedTeams.length-6} times selecionados</small></div>` : "");
  const full = selectedTeams.map(t=>`<div class="team-row selected-row">
    <div><strong>${teamNameWithCrest(t,{size:22})}</strong><small>${t.source || "personalizado"}</small></div>
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
  $("#customTeamList").innerHTML = data.customTeams.map(t=>`<div class="team-row"><div><strong>${teamNameWithCrest(t,{size:22})}</strong><small>Time criado • força ${t.power}${cleanShort(t.short)?` • short ${cleanShort(t.short)}`:""}${teamCrestUrl(t)?" • escudo importado":""}</small></div><button class="danger mini-danger" data-delete-custom="${t.id}">apagar</button></div>`).join("") || `<div class="team-row"><small>Nenhum time criado.</small></div>`;
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
    const [n,p,short,crest]=line.split(",").map(x=>x?.trim());
    if(n && crest) data.crests[n]=crest;
    const generated = n ? (crest || ensureTeamCrest(n,name)) : "";
    return n ? {name:n, power:clamp(Number(p)||70,1,100), short:cleanShort(short), crest:generated} : null;
  }).filter(Boolean);
  if(!teams.length){ alert("Adicione pelo menos um time."); return; }
  data.customPacks ||= [];
  data.customPacks.push({id:"pack_"+slug(name)+"_"+Date.now(), name, teams});
  $("#customPackName").value=""; $("#customPackTeams").value="";
  save(); renderAll();
}


function teamCountOptionsForFormat(format){
  if(format==="league") return Array.from({length:21},(_,i)=>i+4); // 4 a 24
  return Array.from({length:63},(_,i)=>i+2); // mata-mata/grupos: 2 a 64, sem pular tamanhos
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
  const selectionLimit = f==="groups" ? Math.max(next, getInputNumber("groupCount",4)*getInputNumber("groupSize",4)) : next;
  if(selectedTeams.length>selectionLimit) selectedTeams=selectedTeams.slice(0,selectionLimit);
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

function pickStrongest(){ const need=desiredTeamCount(); selectedTeams = pool().sort((a,b)=>b.power-a.power).slice(0,need); previewOrder=null; renderSelected(); }
function pickRandom(){ const need=desiredTeamCount(); selectedTeams = shuffle(pool()).slice(0,need); previewOrder=null; renderSelected(); }
function pickBalanced(){
  const need=desiredTeamCount(), sorted=pool().sort((a,b)=>b.power-a.power);
  const tiers=[sorted.slice(0,Math.ceil(sorted.length*.25)),sorted.slice(Math.ceil(sorted.length*.25),Math.ceil(sorted.length*.55)),sorted.slice(Math.ceil(sorted.length*.55),Math.ceil(sorted.length*.8)),sorted.slice(Math.ceil(sorted.length*.8))].map(shuffle);
  const quota=[Math.ceil(need*.30),Math.ceil(need*.35),Math.ceil(need*.25),need];
  const out=[]; tiers.forEach((tier,i)=>out.push(...tier.slice(0,quota[i])));
  selectedTeams = shuffle([...new Map(out.map(t=>[t.id,t])).values()]).slice(0,need);
  while(selectedTeams.length<need && sorted.length>selectedTeams.length){ const next=shuffle(sorted).find(t=>!selectedTeams.some(x=>x.id===t.id)); if(!next) break; selectedTeams.push(next); }
  previewOrder=null; renderSelected();
}
function fillMissing(mode="random"){
  const need=desiredTeamCount();
  const candidates=(mode==="strongest"?pool().sort((a,b)=>b.power-a.power):shuffle(pool())).filter(t=>!isSelected(t.id));
  for(const t of candidates){ if(selectedTeams.length>=need) break; selectedTeams.push({...t}); }
  previewOrder=null; renderSelected();
}
function selectVisibleTeams(){
  const need=desiredTeamCount();
  for(const t of filteredPool()){ if(selectedTeams.length>=need) break; addTeam(t); }
  renderSelected();
}
function applyQuotas(){
  const need=desiredTeamCount();
  selectedTeams=[];
  $$("[data-quota]").forEach(inp=>{
    const key=inp.dataset.quota, count=Math.max(0,Number(inp.value)||0);
    const pack=allPacks()[key]; if(!pack) return; const chosen=shuffle(pack.teams.map(([name,power,short])=>team(name,power,pack.name,short))).slice(0,count);
    chosen.forEach(t=>{ if(selectedTeams.length<need && !isSelected(t.id)) selectedTeams.push(t); });
  });
  previewOrder=null; renderSelected();
}


function clearManualGroupsIfAny(){
  if(manualGroups?.length){
    manualGroups=null;
    toast("Montagem manual dos grupos limpa para evitar conflito com o novo preset.");
  }
}


function normalizeCompetitionName(name){
  return `${name||""}`.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g," ").trim();
}
const COMPETITION_TEMPLATES=[
  {key:"champions", title:"Champions League", aliases:["champions league","champions","ucl","uefa champions league"], format:"groups", packs:["europeus"], teamCount:32, groupCount:8, groupSize:4, qualifiersPerGroup:2, bestExtraQualifiers:0, groupTurns:"two", legs:"two", finalRule:"single", extraTime:true, penalties:true, awayGoals:false, tiePreset:"grupos", footballDataCode:"CL", hint:"Clubes europeus, fase de grupos e mata-mata."},
  {key:"libertadores", title:"Copa Libertadores", aliases:["libertadores","copa libertadores","conmebol libertadores"], format:"groups", packs:["sulamericanos","brasileiros"], teamCount:32, groupCount:8, groupSize:4, qualifiersPerGroup:2, bestExtraQualifiers:0, groupTurns:"two", legs:"two", finalRule:"single", extraTime:false, penalties:true, awayGoals:false, tiePreset:"grupos", footballDataCode:"CLI", hint:"Clubes sul-americanos, sem prorrogação no modelo Libertadores."},
  {key:"world-cup", title:"Copa do Mundo", aliases:["copa do mundo","world cup","mundial de selecoes","mundial de seleções","fifa world cup"], format:"groups", packs:["selecoes"], teamCount:48, groupCount:12, groupSize:4, qualifiersPerGroup:2, bestExtraQualifiers:8, groupTurns:"one", legs:"single", finalRule:"single", extraTime:true, penalties:true, awayGoals:false, tiePreset:"grupos", footballDataCode:"WC", hint:"Seleções, 12 grupos de 4 e melhores terceiros."},
  {key:"club-world-cup", title:"Mundial de Clubes", aliases:["mundial de clubes","club world cup","fifa club world cup","super mundial"], format:"groups", packs:["globais","europeus","brasileiros","sulamericanos"], teamCount:32, groupCount:8, groupSize:4, qualifiersPerGroup:2, bestExtraQualifiers:0, groupTurns:"one", legs:"single", finalRule:"single", extraTime:true, penalties:true, awayGoals:false, tiePreset:"grupos", footballDataCode:"", hint:"Clubes globais com grupos e mata-mata."},
  {key:"brasileirao", title:"Brasileirão Série A", aliases:["brasileirao","brasileirão","serie a brasil","série a brasil","campeonato brasileiro","brasileiro serie a","brasileiro série a"], format:"league", packs:["brasileiros"], teamCount:20, leagueTurns:"two", divisionTier:"top", promotedCount:0, relegatedCount:4, tiePreset:"brasileirao", footballDataCode:"BSA", hint:"Pontos corridos, clubes brasileiros e rebaixamento."},
  {key:"premier-league", title:"Premier League", aliases:["premier league","epl","inglaterra premier"], format:"league", packs:["europeus"], teamCount:20, leagueTurns:"two", divisionTier:"top", promotedCount:0, relegatedCount:3, tiePreset:"brasileirao", footballDataCode:"PL", hint:"Liga nacional em pontos corridos."},
  {key:"la-liga", title:"La Liga", aliases:["la liga","laliga","primera division","primera división","liga espanhola"], format:"league", packs:["europeus"], teamCount:20, leagueTurns:"two", divisionTier:"top", promotedCount:0, relegatedCount:3, tiePreset:"brasileirao", footballDataCode:"PD", hint:"Liga nacional em pontos corridos."},
  {key:"serie-a-italia", title:"Serie A Italiana", aliases:["serie a italiana","serie a italia","série a italiana","calcio","liga italiana"], format:"league", packs:["europeus"], teamCount:20, leagueTurns:"two", divisionTier:"top", promotedCount:0, relegatedCount:3, tiePreset:"brasileirao", footballDataCode:"SA", hint:"Liga nacional em pontos corridos."},
  {key:"bundesliga", title:"Bundesliga", aliases:["bundesliga","liga alema","liga alemã"], format:"league", packs:["europeus"], teamCount:18, leagueTurns:"two", divisionTier:"top", promotedCount:0, relegatedCount:2, tiePreset:"brasileirao", footballDataCode:"BL1", hint:"Liga nacional alemã em pontos corridos."},
  {key:"ligue-1", title:"Ligue 1", aliases:["ligue 1","liga francesa","francesao","francesão"], format:"league", packs:["europeus"], teamCount:18, leagueTurns:"two", divisionTier:"top", promotedCount:0, relegatedCount:2, tiePreset:"brasileirao", footballDataCode:"FL1", hint:"Liga nacional francesa em pontos corridos."}
];
function resolveCompetitionTemplate(name){
  const n=normalizeCompetitionName(name);
  if(!n || n==="liga mundial") return null;
  return COMPETITION_TEMPLATES.find(t=>t.aliases.some(a=>{
    const x=normalizeCompetitionName(a);
    return n===x || n.includes(x) || x.includes(n);
  })) || null;
}
function templateSourceName(){
  const saveMode=currentSaveMode?.() || "single";
  if(saveMode==="history"){
    const id=$("#competitionSelect")?.value;
    const c=data.competitions.find(x=>x.id===id);
    return c?.name || $("#championshipName")?.value || "";
  }
  return $("#championshipName")?.value || "";
}
let lastAppliedCompetitionTemplate="";
function renderCompetitionTemplateSuggestion(){
  const box=$("#templateSuggestion"); if(!box) return;
  const template=resolveCompetitionTemplate(templateSourceName());
  if(!template){ box.hidden=true; return; }
  box.hidden=false;
  const title=$("#templateSuggestionTitle"), text=$("#templateSuggestionText");
  if(title) title.textContent=`Template: ${template.title}`;
  if(text) text.textContent=`${template.hint} Código football-data.org: ${template.footballDataCode || "sem código oficial"}. Escudos oficiais exigem token salvo e busca pela API.`;
  const code=$("#footballDataCompetitionCode");
  if(code && template.footballDataCode && !code.value.trim()) code.value=template.footballDataCode;
}
function setIfExists(id,value){
  const el=$("#"+id);
  if(!el || value===undefined || value===null) return;
  el.value=String(value);
  el.dispatchEvent(new Event("input",{bubbles:true}));
}
function setCheckedIfExists(id,value){
  const el=$("#"+id);
  if(!el || value===undefined || value===null) return;
  el.checked=!!value;
}
function applyCompetitionTemplate(template, opts={}){
  if(!template) return false;
  setIfExists("formatSelect",template.format);
  refreshTeamCountOptions();
  setIfExists("teamCount",template.teamCount);
  refreshTeamCountOptions();
  if(template.groupCount) setIfExists("groupCount",template.groupCount);
  if(template.groupSize) setIfExists("groupSize",template.groupSize);
  if(template.qualifiersPerGroup!==undefined) setIfExists("qualifiersPerGroup",template.qualifiersPerGroup);
  if(template.bestExtraQualifiers!==undefined) setIfExists("bestExtraQualifiers",template.bestExtraQualifiers);
  if(template.groupTurns) setIfExists("groupTurns",template.groupTurns);
  if(template.legs) setIfExists("knockoutLegs",template.legs);
  if(template.finalRule) setIfExists("finalRule",template.finalRule);
  if(template.leagueTurns) setIfExists("leagueTurns",template.leagueTurns);
  if(template.divisionTier) setIfExists("divisionTier",template.divisionTier);
  if(template.promotedCount!==undefined) setIfExists("promotedCount",template.promotedCount);
  if(template.relegatedCount!==undefined) setIfExists("relegatedCount",template.relegatedCount);
  if(template.tiePreset) setIfExists("tiePreset",template.tiePreset);
  setCheckedIfExists("extraTime",template.extraTime);
  setCheckedIfExists("penalties",template.penalties);
  setCheckedIfExists("awayGoals",template.awayGoals);
  selectedPacks=new Set((template.packs||[]).filter(k=>packs[k] || data.customPacks?.some(p=>p.id===k)));
  selectedTeams=[];
  manualGroups=null;
  previewOrder=null;
  refreshTeamCountOptions();
  const need=desiredTeamCount();
  selectedTeams=pool().sort((a,b)=>b.power-a.power || a.name.localeCompare(b.name)).slice(0,need).map(t=>({...t}));
  const code=$("#footballDataCompetitionCode");
  if(code && template.footballDataCode) code.value=template.footballDataCode;
  lastAppliedCompetitionTemplate=template.key;
  toggleRuleVisibility();
  renderAll();
  if(!opts.silent) alert(`Template aplicado: ${template.title}`);
  return true;
}
function applyTemplateFromName(silent=false){
  const template=resolveCompetitionTemplate(templateSourceName());
  if(!template) return false;
  return applyCompetitionTemplate(template,{silent});
}
function autoApplyCompetitionTemplate(){
  const template=resolveCompetitionTemplate(templateSourceName());
  if(!template){ renderCompetitionTemplateSuggestion(); return; }
  if(template.key!==lastAppliedCompetitionTemplate){
    applyCompetitionTemplate(template,{silent:true});
  }else{
    renderCompetitionTemplateSuggestion();
  }
}
const footballOrgConfig={
  baseUrl:"https://api.football-data.org/v4",
  codes:{champions:"CL", premier:"PL", laliga:"PD", serieA:"SA", bundesliga:"BL1", ligue1:"FL1", worldCup:"WC", brasileirao:"BSA"}
};
function renderFootballDataSettings(){
  const token=$("#footballDataToken");
  const status=$("#footballDataStatus");
  const code=$("#footballDataCompetitionCode");
  if(token && document.activeElement!==token) token.value=data.footballDataToken||"";
  if(status) status.textContent=data.footballDataToken ? "Token configurado. Use Buscar times/escudos para trocar os escudos automáticos por oficiais." : "Token não configurado. O Brocket usará escudos automáticos até você salvar um token.";
  const template=resolveCompetitionTemplate(templateSourceName());
  if(code && template?.footballDataCode && !code.value.trim()) code.value=template.footballDataCode;
  renderCompetitionTemplateSuggestion();
}
function saveFootballDataToken(){
  const token=($("#footballDataToken")?.value||"").trim();
  data.footballDataToken=token;
  if(token) localStorage.setItem("brocket-football-data-token",token);
  else localStorage.removeItem("brocket-football-data-token");
  save();
  renderFootballDataSettings();
}
function clearFootballDataToken(){
  data.footballDataToken="";
  localStorage.removeItem("brocket-football-data-token");
  const input=$("#footballDataToken"); if(input) input.value="";
  save();
  renderFootballDataSettings();
}
async function footballDataRequest(path){
  const token=(data.footballDataToken || localStorage.getItem("brocket-football-data-token") || "").trim();
  if(!token) throw new Error("Cole e salve o token do football-data.org em Configurações antes de buscar escudos oficiais.");
  const res=await fetch(`${footballOrgConfig.baseUrl}${path}`,{headers:{"X-Auth-Token":token}});
  if(!res.ok){
    let msg=`Erro ${res.status}`;
    try{ const body=await res.json(); msg=body.message || body.error || msg; }catch(e){}
    throw new Error(msg);
  }
  return res.json();
}
async function fetchFootballOrgCompetition(code){
  return footballDataRequest(`/competitions/${encodeURIComponent(code)}`);
}
async function fetchFootballOrgTeams(competitionCode){
  const fd=await footballDataRequest(`/competitions/${encodeURIComponent(competitionCode)}/teams`);
  return fd.teams || [];
}
function mapFootballOrgTeamToBrocketTeam(t,source="Football-data.org"){
  const name=t.shortName || t.name || t.tla;
  if(!name) return null;
  const short=cleanShort(t.tla || t.shortName || t.name);
  const crest=t.crest || t.crestUrl || t.crestURI || t.logo || t.logoUrl || "";
  if(crest) data.crests[name]=crest;
  return team(name,70,source,short,crest);
}
function applyOfficialCrestsToPack(packName, teams){
  data.customPacks ||= [];
  const mapped=(teams||[]).map(t=>mapFootballOrgTeamToBrocketTeam(t,packName)).filter(Boolean);
  if(!mapped.length) return null;
  const id=`pack_fd_${slug(packName)}_${Date.now()}`;
  data.customPacks.push({id, name:`${packName} — oficial`, teams:mapped});
  return {id,name:`${packName} — oficial`,teams:mapped};
}
async function fetchFootballDataForCurrentTemplate(){
  const status=$("#footballDataStatus");
  try{
    const template=resolveCompetitionTemplate(templateSourceName());
    const code=($("#footballDataCompetitionCode")?.value||template?.footballDataCode||"").trim().toUpperCase();
    if(!code){ alert("Informe o código da competição, ex: CL, PL, PD, SA, BL1, FL1, WC."); return; }
    if(status) status.textContent=`Buscando ${code} no football-data.org...`;
    let compName=template?.title || code;
    try{ const comp=await fetchFootballOrgCompetition(code); compName=comp.name || compName; }catch(e){}
    const teams=await fetchFootballOrgTeams(code);
    const pack=applyOfficialCrestsToPack(compName,teams);
    if(!pack) throw new Error("Nenhum time retornado pela API.");
    selectedPacks=new Set([pack.id]);
    const desired=Math.min(pack.teams.length, Number($("#teamCount")?.value)||pack.teams.length);
    if($("#teamCount")) $("#teamCount").value=String(desired);
    selectedTeams=pack.teams.slice(0,desired).map(t=>({...t}));
    previewOrder=null;
    manualGroups=null;
    save();
    renderAll();
    if(status) status.textContent=`Importado: ${pack.teams.length} times/escudos de ${compName}.`;
    alert(`Times/escudos importados de ${compName}.`);
  }catch(err){
    if(status) status.textContent=`Falha: ${err.message}`;
    alert(`Não consegui buscar no football-data.org: ${err.message}`);
  }
}


function cfg(){
  const format=$("#formatSelect").value;
  let teamCount=desiredTeamCount();
  if(format==="league" && teamCount>24) teamCount=24;
  const selectedGroupSize=getInputNumber("groupSize",4)||4;
  const selectedGroupCount=getInputNumber("groupCount",Math.ceil(teamCount/selectedGroupSize));
  // 0.8.4 final: em grupos, calcula grupos suficientes para comportar a quantidade exata escolhida.
  // Ex.: 31 times + 4 por grupo = 8 grupos, com folgas quando necessário.
  const groupCount = format==="groups" ? Math.max(selectedGroupCount,Math.ceil(teamCount/selectedGroupSize)) : 0;
  const copa48 = format==="groups" && teamCount===48 && groupCount===12 && selectedGroupSize===4;
  const saveMode=document.querySelector('input[name="saveMode"]:checked')?.value || "single";
  const competitionId=$("#competitionSelect")?.value || "";
  const selectedCompetition=data.competitions.find(x=>x.id===competitionId);
  const rawChampionshipName=optionValue("championshipName","").trim();
  const championshipName=(saveMode==="history" && selectedCompetition) ? selectedCompetition.name : (rawChampionshipName || "Liga Mundial");
  const customEditionName=optionValue("editionName","").trim();
  const divisionName=optionValue("divisionName","").trim();
  const seasonName=customEditionName || "Temporada 1";
  const template=resolveCompetitionTemplate(championshipName);
  const temp={championshipName, divisionName, seasonName, customEditionName};
  return { id:uid(), name: autoEditionName(temp), championshipName, templateKey:template?.key||"", templateTitle:template?.title||"", customEditionName, seasonName, divisionName, divisionTier:optionValue("divisionTier","top"), promotedCount:getInputNumber("promotedCount",0), relegatedCount:getInputNumber("relegatedCount",0), saveMode, competitionId, format, teamCount, legs:$("#knockoutLegs").value, finalRule:$("#finalRule").value, upset:$("#upsetLevel").value, realism:$("#scoreRealism").value, extraTime:$("#extraTime").checked, penalties:$("#penalties").checked, awayGoals:$("#awayGoals").checked, leagueTurns:$("#leagueTurns").value, groupTurns:$("#groupTurns").value, groupCount, groupSize:copa48?4:selectedGroupSize, qualifiersPerGroup:getInputNumber("qualifiersPerGroup",2), bestExtraQualifiers:copa48?8:getInputNumber("bestExtraQualifiers",0), groupRelegatedCount:getInputNumber("groupRelegatedCount",0), bracketShuffle:$("#bracketShuffle").value, groupShuffle:$("#groupShuffle").value || "pots", tiePreset:$("#tiePreset")?.value || "brasileirao" };
}
function generateTournament(){
  const c=cfg();
  if(c.format==="league" && c.teamCount>24){ alert("Pontos corridos permite até 24 times."); refreshTeamCountOptions(); return; }
  if(c.saveMode==="history" && !c.competitionId){ alert("Crie ou selecione um campeonato para salvar no histórico."); return; }
  if(selectedTeams.length<c.teamCount){ alert(`Selecione ${c.teamCount} times.`); return; }
  // 0.8.4: montagem manual parcial é permitida; o Brocket completa as vagas restantes automaticamente.
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
  if(Number(c.teamCount)===48 && Number(c.groupSize)===4 && Number(c.groupCount)===12){
    return `<div class="preview-card auto-adjust"><strong>Formato Copa 48 aplicado</strong><small>12 grupos de 4.</small><small>Classificam ${c.qualifiersPerGroup} por grupo + ${c.bestExtraQualifiers} melhores campanhas.</small><small>Mata-mata começa com ${c.groupCount*c.qualifiersPerGroup+c.bestExtraQualifiers} times.</small></div>`;
  }
  const groups=Number(c.groupCount)||Math.ceil(ordered.length/c.groupSize);
  const classified=(groups*(Number(c.qualifiersPerGroup)||2))+(Number(c.bestExtraQualifiers)||0);
  const rest=(Number(c.groupSize)||4)%2 ? `<small>Grupos ímpares: uma equipe descansa por rodada.</small>` : "";
  const potHint=c.groupShuffle==="pots" ? `<small>Sorteio padrão por potes baseado no power.</small>` : "";
  if(isPowerOfTwo(classified)) return (rest||potHint) ? `<div class="preview-card auto-adjust"><strong>${potHint?"Sorteio por potes":"Descanso automático"}</strong>${potHint}${rest}</div>` : "";
  const target=prevPowerOfTwo(classified), prelimMatches=classified-target, prelimTeams=prelimMatches*2, byes=classified-prelimTeams;
  return `<div class="preview-card auto-adjust"><strong>Ajuste automático do mata-mata</strong><small>${classified} classificados não fecham uma chave perfeita.</small><small>${byes} melhores campanhas entram direto.</small><small>${prelimTeams} piores campanhas jogam Rodada preliminar.</small>${rest}</div>`;
}
function renderDrawPreview(){
  const box=$("#drawPreview"); if(!box) return;
  const c=cfg(), need=c.teamCount;
  if(selectedTeams.length<need){ box.innerHTML=`<div class="empty-inline">Selecione ${need} times para ver a prévia.</div>`; return; }
  const ordered=getPreviewOrder(c);
  if(c.format==="groups" || c.format==="clubWorldCup"){
    const gs=c.groupSize, chunks=[];
    for(let i=0;i<(Number(c.groupCount)||Math.ceil(ordered.length/gs));i++) chunks.push(ordered.slice(i*gs,i*gs+gs));
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
  const gs=Math.max(1,Number(c.groupCount)||Math.ceil(teams.length/(Number(c.groupSize)||4)));
  const size=Math.max(1,Number(c.groupSize)||Math.ceil(teams.length/gs));
  const sorted=[...teams].sort((a,b)=>b.power-a.power || a.name.localeCompare(b.name));

  if(c.groupShuffle==="pots"){
    // Sorteio por potes: divide por power e sorteia um time de cada pote nos grupos.
    // Ex.: 32 times / 8 grupos => 4 potes de 8.
    const groups=Array.from({length:gs},()=>[]);
    const pots=[];
    for(let i=0;i<sorted.length;i+=gs) pots.push(shuffle(sorted.slice(i,i+gs)));
    pots.forEach(pot=>{
      const order=shuffle(Array.from({length:gs},(_,i)=>i));
      pot.forEach((team,idx)=>{
        let target=order[idx%order.length];
        if(groups[target].length>=size){
          target=groups.reduce((best,g,i)=>g.length<groups[best].length ? i : best,0);
        }
        groups[target].push(team);
      });
    });
    return groups.flat();
  }

  if(c.groupShuffle==="balanced"){
    const groups=Array.from({length:gs},()=>[]);
    sorted.forEach((t,i)=>groups[i%gs].push(t));
    return shuffle(groups.map(g=>shuffle(g))).flat();
  }

  return shuffle(teams);
}
function blankStats(t){ return {...t, pts:0,w:0,d:0,l:0,gf:0,ga:0,gd:0,sortSeed:Math.random()}; }
function roundRobinScheduleDetailed(rows, groupName, double=false){
  const arr=[...rows];
  const hasBye=arr.length%2===1;
  if(hasBye) arr.push(null);
  const n=arr.length, rounds=[], byes=[];
  for(let r=0;r<n-1;r++){
    const matches=[];
    for(let i=0;i<n/2;i++){
      const a=arr[i], b=arr[n-1-i];
      if(a&&b) matches.push(newMatch(a,b,`Grupo ${groupName} - Rodada ${r+1}`,true));
      else if(a||b) byes.push({stage:`Grupo ${groupName} - Rodada ${r+1}`, team:a||b});
    }
    rounds.push(shuffle(matches)); arr.splice(1,0,arr.pop());
  }
  if(double){
    const baseLen=rounds.length;
    const more=rounds.slice(0,baseLen).map((matches,idx)=>matches.map(m=>newMatch(m.away,m.home,`Grupo ${groupName} - Rodada ${baseLen+idx+1}`,true)));
    const moreByes=byes.slice(0,baseLen).map((b,idx)=>({stage:`Grupo ${groupName} - Rodada ${baseLen+idx+1}`, team:b.team}));
    rounds.push(...more); byes.push(...moreByes);
  }
  return {matches:rounds.flat(), byes};
}
function roundRobinSchedule(rows, groupName, double=false){ return roundRobinScheduleDetailed(rows, groupName, double).matches; }

function completeManualGroups(ordered,c){
  const groupCount=Number(c.groupCount)||Math.ceil(c.teamCount/c.groupSize);
  const groups=Array.from({length:groupCount},()=>[]);
  const allowed=new Set(ordered.map(t=>t.id));
  const used=new Set();
  if(Array.isArray(manualGroups)){
    manualGroups.slice(0,groupCount).forEach((group,idx)=>{
      (group||[]).forEach(t=>{
        if(!t || !allowed.has(t.id) || used.has(t.id) || groups[idx].length>=Number(c.groupSize)) return;
        const original=ordered.find(x=>x.id===t.id) || t;
        groups[idx].push(original);
        used.add(t.id);
      });
    });
  }
  const free=ordered.filter(t=>!used.has(t.id));
  groups.forEach(g=>{
    while(g.length<Number(c.groupSize) && free.length) g.push(free.shift());
  });
  return groups;
}

function setupGroups(t){
  const c=t.cfg, ordered=[...t.teams];
  const groupsSource=completeManualGroups(ordered,c);
  groupsSource.forEach((source,idx)=>{
    const g={ name:String.fromCharCode(65+idx), teams:source.map((team,seed)=>({...blankStats(team),sortSeed:idx*100+seed})), matches:[], table:[] };
    const sched=roundRobinScheduleDetailed(g.teams,g.name,c.groupTurns==="double");
    g.matches=sched.matches; g.byes=sched.byes;
    g.table=[...g.teams]; t.groups.push(g);
  });
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
  let before=snapshotPositions(t);
  while(t.status!=="finished" && nextPlayable(t) && guard<2000){
    const stageBefore=t.currentStage;
    const roundBefore=currentRoundMatches(t).map(m=>m.id).join("|");
    before=snapshotPositions(t);
    simulateMatch(nextPlayable(t).id, {deferAdvance:true});
    advanceIfNeeded(t);
    const stillSameRound=currentRoundMatches(t).map(m=>m.id).join("|")===roundBefore && t.currentStage===stageBefore;
    if(!stillSameRound) applyPositionDeltas(t,before);
    guard++;
  }
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
function simulateGroup(groupName){
  const t=data.activeTournament;
  if(!t || t.status==="finished" || t.currentStage!=="groups") return;
  const group=(t.groups||[]).find(g=>g.name===groupName);
  if(!group) return;
  (group.matches||[]).filter(m=>!m.played).forEach(m=>simulateMatch(m.id,{deferAdvance:true}));
  advanceIfNeeded(t);
  save();
  renderTournament();
}
function rankedQualifiedFromGroups(t){
  t.groups.forEach(g=>sortGroup(g,t.cfg));
  const q=[];
  const per=clamp(Number(t.cfg.qualifiersPerGroup)||2,0,99);
  const extra=Number(t.cfg.bestExtraQualifiers)||0;
  const extras=[];
  t.groups.forEach(g=>{
    g.table.slice(0,per).forEach((tm,i)=>q.push({...tm, group:g.name, pos:i+1}));
    if(extra>0){
      const cand=g.table[per];
      if(cand) extras.push({...cand, group:g.name, pos:per+1});
    }
  });
  extras.sort((a,b)=>compareRows(a,b,t.cfg));
  extras.slice(0,extra).forEach(tm=>q.push({...tm, extraQualified:true}));
  q.sort((a,b)=> a.pos-b.pos || compareRows(a,b,t.cfg));
  q.forEach((x,i)=>x.sortSeed=i+1);
  t.autoAdjustment={classified:q.length, groups:t.groups.length, perGroup:per, extraQualified:Math.min(extra,extras.length)};
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
function twoLegMeta(a,b,l1,l2Home,l2Away,notes=[]){
  return notes.join(" • ");
}
function legDetail(home,away,hg,ag){
  return {home, away, homeGoals:hg, awayGoals:ag};
}
function legShortLine(leg){
  return `${teamShort(leg.home)} ${leg.homeGoals}-${leg.awayGoals} ${teamShort(leg.away)}`;
}
function penaltiesLine(m){
  if(!m.pens) return "";
  return `${teamShort(m.home)} ${m.pens.a}-${m.pens.b} ${teamShort(m.away)}`;
}
function matchDetailsMarkup(m){
  if(!m.played) return `<div class="match-detail-row"><b>Status</b><em>Aguardando simulação</em></div>`;
  const rows=[];
  if(m.legs?.length===2){
    rows.push(`<div class="match-detail-row"><b>Ida</b><em>${legShortLine(m.legs[0])}</em></div>`);
    rows.push(`<div class="match-detail-row"><b>Volta</b><em>${legShortLine(m.legs[1])}</em></div>`);
  }else{
    rows.push(`<div class="match-detail-row"><b>Jogo</b><em>${teamShort(m.home)} ${m.homeGoals}-${m.awayGoals} ${teamShort(m.away)}</em></div>`);
  }
  const decision=decisionLabel(m);
  if(decision) rows.push(`<div class="match-detail-row"><b>Decisão</b><em>${decision}</em></div>`);
  return rows.join("");
}
function bracketMatchMarkup(m,stageName,finalWinner,opts={}){
  const isFinal=stageName==="Final";
  const expanded=!opts.export && expandedMatches.has(m.id);
  const played=m.played;
  const homeWin=played && m.winner?.id===m.home.id;
  const awayWin=played && m.winner?.id===m.away.id;
  const homeChamp=isFinal && finalWinner===m.home.name;
  const awayChamp=isFinal && finalWinner===m.away.name;
  const details=played ? `<div class="match-details ${expanded?"open":""}">${matchDetailsMarkup(m)}</div>` : "";
  const actions=opts.export ? "" : (played ? `<div class="match-expand-marker">${expanded?"−":"+"}</div>` : `<div class="match-actions compact-actions"><button data-sim="${m.id}">Simular</button><button data-edit-match="${m.id}">Manual</button></div>`);
  return `<div class="match compact-match bracket-node ${isFinal?"final-match":""} ${expanded?"expanded":""}" data-toggle-match-details="${m.id}">
    <div class="match-line ${homeWin?"winner":""} ${homeChamp?"gold-champion":""}"><span>${homeChamp?"🏆 ":""}${teamNameWithCrest(m.home,{size:18})}</span><strong>${scoreCell(m,"home")}</strong></div>
    <div class="match-line ${awayWin?"winner":""} ${awayChamp?"gold-champion":""}"><span>${awayChamp?"🏆 ":""}${teamNameWithCrest(m.away,{size:18})}</span><strong>${scoreCell(m,"away")}</strong></div>
    ${details}
    <div class="match-footer">${actions}</div>
  </div>`;
}

function bracketRoundLabel(name){
  return name==="Rodada preliminar" ? "Preliminar" : name;
}
function buildBracketLayout(t, opts={}){
  const rounds=t.knockout||[];
  const cardW=opts.cardW||220, cardH=opts.cardH||76, roundGap=opts.roundGap||58, baseGap=opts.baseGap||22;
  const pitch0=cardH+baseGap;
  const maxMatches=Math.max(1,...rounds.map(r=>Math.max(r.matches?.length||0, r.byes?.length||0)));
  const bodyHeight=Math.max(cardH, maxMatches*pitch0);
  const positions={}, connectors=[];
  rounds.forEach((round,rIdx)=>{
    const matches=round.matches||[];
    const prevCount=rIdx===0 ? matches.length : Math.max(1, (rounds[rIdx-1]?.matches||[]).length);
    const expected=Math.max(1, Math.ceil(prevCount/2));
    const pitch=pitch0*Math.pow(2,rIdx);
    const first=(pitch0/2)*Math.pow(2,rIdx);
    const x=rIdx*(cardW+roundGap);
    matches.forEach((m,sIdx)=>{
      let y=first+sIdx*pitch;
      if(matches.length<expected && matches.length===1) y=bodyHeight/2;
      positions[m.id]={x,y,round:rIdx,slot:sIdx};
    });
  });
  rounds.forEach((round,rIdx)=>{
    if(rIdx>=rounds.length-1) return;
    (round.matches||[]).forEach((m,sIdx)=>{
      const from=positions[m.id];
      const next=(rounds[rIdx+1]?.matches||[])[Math.floor(sIdx/2)];
      if(!from || !next) return;
      const to=positions[next.id];
      if(!to) return;
      const startX=from.x+cardW, startY=from.y, midX=startX+roundGap/2, endX=to.x, endY=to.y;
      connectors.push({id:`${m.id}-${next.id}`, d:`M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`, active:!!m.winner});
    });
  });
  return {cardW,cardH,roundGap,baseGap,positions,connectors,width:Math.max(cardW,rounds.length*cardW+Math.max(0,rounds.length-1)*roundGap),height:bodyHeight};
}
function renderBracketSvg(layout){
  return `<svg class="bracket-svg" width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}" aria-hidden="true">
    ${layout.connectors.map(c=>`<path d="${c.d}" class="bracket-path ${c.active?"active":""}" />`).join("")}
  </svg>`;
}
function renderBracketBoard(t, opts={}){
  const rounds=t.knockout||[];
  const finalWinner=t.status==="finished"?t.champion:null;
  const layout=buildBracketLayout(t,opts);
  const headers=rounds.map((r,i)=>`<div class="bracket-round-label ${r.name==="Final"?"final-label":""}" style="left:${i*(layout.cardW+layout.roundGap)}px;width:${layout.cardW}px">${bracketRoundLabel(r.name)}</div>`).join("");
  const cards=rounds.flatMap((r,rIdx)=>(r.matches||[]).map((m,sIdx)=>{
    const pos=layout.positions[m.id]; if(!pos) return "";
    return `<div class="bracket-card-slot ${r.name==="Final"?"final-round":""}" style="left:${pos.x}px;top:${pos.y-layout.cardH/2}px;width:${layout.cardW}px">${bracketMatchMarkup(m,r.name,finalWinner,opts)}</div>`;
  })).join("");
  return `<div class="bracket-canvas ${opts.export?"export-canvas":""}" style="width:${layout.width}px">
    <div class="bracket-headers" style="width:${layout.width}px;height:46px">${headers}</div>
    <div class="bracket-body" style="width:${layout.width}px;height:${layout.height}px">
      ${renderBracketSvg(layout)}
      ${cards}
    </div>
  </div>`;
}

function playKnockout(a,b,c,isFinal){
  const two = c.legs==="two" && !(isFinal && c.finalRule==="single");
  if(!two){
    let r=playSingle(a,b,c,true), hg=r.homeGoals, ag=r.awayGoals;
    let meta="Jogo único";
    let usedET=false;
    if(hg===ag && c.extraTime){
      const et=extraGoals(a,b,c);
      hg+=et.a; ag+=et.b;
      usedET=true;
      meta="A.P.";
    }
    if(hg===ag && c.penalties){
      const p=pens(a,b);
      const win=p.winA;
      meta=[usedET?"A.P.":"","pênaltis"].filter(Boolean).join(" • ");
      return {homeGoals:hg,awayGoals:ag,winner:win?a:b,loser:win?b:a,meta,pens:p};
    }
    if(hg===ag){
      const win=Math.random()+(((a.power||70)-(b.power||70))/180)>.5;
      if(win) hg++; else ag++;
      meta=usedET?"A.P.":"desempate";
    }
    const win=hg>ag;
    return {homeGoals:hg,awayGoals:ag,winner:win?a:b,loser:win?b:a,meta};
  }

  const l1=playSingle(a,b,c,true), l2=playSingle(b,a,c,true);
  let l2Home=l2.homeGoals, l2Away=l2.awayGoals; // volta: casa é b, visitante é a
  let ga=l1.homeGoals+l2Away, gb=l1.awayGoals+l2Home;
  let usedET=false;

  if(ga===gb && c.awayGoals){
    const awayA=l2Away, awayB=l1.awayGoals;
    if(awayA!==awayB){
      const meta = twoLegMeta(a,b,l1,l2Home,l2Away,["gol fora"]);
      const legs=[legDetail(a,b,l1.homeGoals,l1.awayGoals),legDetail(b,a,l2Home,l2Away)];
      const win=awayA>awayB;
      return {homeGoals:ga,awayGoals:gb,winner:win?a:b,loser:win?b:a,meta,legs};
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

  let meta = twoLegMeta(a,b,l1,l2Home,l2Away,usedET ? ["A.P."] : []);
  let legs=[legDetail(a,b,l1.homeGoals,l1.awayGoals),legDetail(b,a,l2Home,l2Away)];

  if(ga===gb && c.penalties){
    const p=pens(a,b);
    meta = twoLegMeta(a,b,l1,l2Home,l2Away,[
      ...(usedET ? ["A.P."] : []),
      "pênaltis"
    ]);
    legs=[legDetail(a,b,l1.homeGoals,l1.awayGoals),legDetail(b,a,l2Home,l2Away)];
    const win=p.winA;
    return {homeGoals:ga,awayGoals:gb,winner:win?a:b,loser:win?b:a,meta,pens:p,legs};
  }
  if(ga===gb){
    const win=Math.random()+(((a.power||70)-(b.power||70))/180)>.5;
    if(win){ ga++; l2Away++; } else { gb++; l2Home++; }
    meta = twoLegMeta(a,b,l1,l2Home,l2Away,[...(usedET ? ["A.P."] : []),"desempate"]);
    legs=[legDetail(a,b,l1.homeGoals,l1.awayGoals),legDetail(b,a,l2Home,l2Away)];
  }
  legs=[legDetail(a,b,l1.homeGoals,l1.awayGoals),legDetail(b,a,l2Home,l2Away)];
  const win=ga>gb;
  return {homeGoals:ga,awayGoals:gb,winner:win?a:b,loser:win?b:a,meta,legs};
}
function playSingle(a,b,c,allowDraw){
  const diff=(a.power||70)-(b.power||70);

  // 0.8.4.2: motor universal de placares.
  // A mesma lógica vale para liga, grupos, mata-mata e ida/volta.
  // A diferença de força altera a chance antes do placar sair; o placar final não é reduzido depois.
  const realism=c.realism||"realistic";
  const upset=c.upset||"medium";
  const base={realistic:1.16,normal:1.28,chaotic:1.48}[realism] ?? 1.16;
  const strength={low:1.95,medium:1.62,high:1.22,chaos:.82}[upset] ?? 1.62;
  const volatility={low:.10,medium:.16,high:.26,chaos:.42}[upset] ?? .16;

  const homeAdv=.12;
  const form=(Math.random()*2-1)*volatility;
  const split=(diff/100)*strength;
  let homeXg=base + homeAdv + split + form;
  let awayXg=base - homeAdv - split - form;

  // Azarão ainda pode ganhar, mas a explosão ofensiva contra favorito grande fica rara.
  const gap=Math.abs(diff);
  if(gap>=10){
    const damp=clamp((gap-10)/42,0,.42);
    if(diff>0 && awayXg>base*.95) awayXg*=1-damp;
    if(diff<0 && homeXg>base*.95) homeXg*=1-damp;
  }

  // Empates e placares comuns precisam aparecer bastante no futebol real.
  homeXg=clamp(homeXg,0.28,2.85);
  awayXg=clamp(awayXg,0.28,2.85);
  let hg=sampleGoals(homeXg,realism), ag=sampleGoals(awayXg,realism);

  if(!allowDraw && hg===ag){
    const winHome=Math.random()+diff/170>.5;
    if(winHome) hg++; else ag++;
  }

  return {homeGoals:clamp(hg,0,9),awayGoals:clamp(ag,0,9)};
}
function sampleGoals(lambda,realism){
  const raw=poisson(lambda);
  const chaos=realism==="chaotic";
  const normal=realism==="normal";
  if(!chaos && raw>=5 && Math.random()<.72) return 4;
  if(!chaos && raw===4 && Math.random()<.18) return 3;
  if(normal && raw>=6 && Math.random()<.45) return 5;
  return clamp(raw,0,chaos?9:7);
}
function poisson(lambda){
  const L=Math.exp(-Math.max(.05,lambda));
  let k=0, p=1;
  do{ k++; p*=Math.random(); }while(p>L && k<12);
  return k-1;
}
function extraGoals(a,b,c){
  const diff=(a.power||70)-(b.power||70);
  const base=.24;
  const strength={low:.38,medium:.30,high:.22,chaos:.16}[c.upset||"medium"] ?? .30;
  const hx=clamp(base + (diff/100)*strength, .06, .62);
  const ax=clamp(base - (diff/100)*strength, .06, .62);
  return {a:clamp(poisson(hx),0,3),b:clamp(poisson(ax),0,3)};
}
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
  const count=Number(c.groupCount)||Math.ceil(c.teamCount/c.groupSize);
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
  const hint=full ? `<div class="auto-adjust-note ok-note"><strong>Grupos completos.</strong> Você já pode gerar o torneio.</div>` : `<div class="auto-adjust-note"><strong>Montagem manual parcial</strong><br>Você pode travar alguns times nos grupos e gerar mesmo assim. O Brocket completa as vagas restantes automaticamente.</div>`;
  area.innerHTML=`${hint}<div class="manual-groups-grid">${manualGroups.map((g,i)=>`<div class="group-card manual-group-card ${g.length===Number(c.groupSize)?"complete":"incomplete"}"><h3>Grupo ${String.fromCharCode(65+i)} <small>${g.length}/${c.groupSize}</small></h3>${g.map(t=>`<div class="team-row"><strong>${t.name}</strong><button class="mini-danger" data-remove-from-group="${t.id}">remover</button></div>`).join("") || `<small>Sem times.</small>`}${g.length<Number(c.groupSize) && free.length?`<select data-add-to-group="${i}"><option value="">Adicionar time...</option>${free.map(t=>`<option value="${t.id}">${t.name}</option>`).join("")}</select>`:""}</div>`).join("")}</div>`;
}
function autoFillManualGroups(){ const c=cfg(); const teams=getPreviewOrder(c).slice(0,c.teamCount); const count=Number(c.groupCount)||Math.ceil(c.teamCount/c.groupSize); manualGroups=Array.from({length:count},(_,i)=>teams.filter((_,idx)=>Math.floor(idx/c.groupSize)===i)); renderManualGroups(); }
function clearManualGroups(){ manualGroups=null; renderManualGroups(); }



function applyImportedCrests(input){
  if(!input || typeof input!=="object") return 0;
  data.crests ||= {};
  let count=0;
  const add=(name,url)=>{
    if(!name || !url) return;
    data.crests[String(name).trim()] = String(url).trim();
    count++;
  };
  Object.entries(input.crests||input.crestMap||input.logos||{}).forEach(([name,url])=>add(name,url));
  const scanTeams=(teams=[])=>teams.forEach(t=>{
    if(typeof t==="string") return;
    const name=t.name||t.team||t.title;
    const url=t.crest||t.crestUrl||t.logo||t.logoUrl||t.badge||t.badgeUrl;
    add(name,url);
  });
  scanTeams(input.teams||[]);
  (input.customTeams||[]).forEach(t=>scanTeams([t]));
  (input.packs||input.customPacks||[]).forEach(p=>scanTeams(p.teams||[]));
  (input.competitions||[]).forEach(c=>{
    scanTeams(c.teams||[]);
    (c.editions||[]).forEach(e=>scanTeams((e.teams||[]).map(x=>typeof x==="string"?{name:x}:x)));
  });
  return count;
}
function normalizeImportedTeam(t,source="Importado"){
  if(typeof t==="string") return team(t,70,source);
  const name=t.name||t.team||t.title;
  if(!name) return null;
  const power=clamp(Number(t.power||t.rating||t.strength)||70,1,100);
  const short=cleanShort(t.short||t.shortName||t.abbr||t.code);
  const crest=t.crest||t.crestUrl||t.logo||t.logoUrl||t.badge||t.badgeUrl||"";
  if(crest) data.crests[name]=crest;
  return team(name,power,source,short,crest);
}
function importChampionshipPayload(raw){
  let input;
  try{ input=JSON.parse(raw); }catch(e){ alert("JSON inválido."); return; }
  if(Array.isArray(input)) input={competitions:input};
  if(!input || typeof input!=="object"){ alert("Importação inválida."); return; }
  data.competitions ||= []; data.customPacks ||= []; data.customTeams ||= []; data.crests ||= {};
  const crestCount=applyImportedCrests(input);
  let compCount=0, packCount=0, teamCount=0;

  if(Array.isArray(input.customTeams)){
    input.customTeams.map(t=>normalizeImportedTeam(t,"Importado")).filter(Boolean).forEach(t=>{
      if(!data.customTeams.some(x=>x.id===t.id)) { data.customTeams.push(t); teamCount++; }
    });
  }
  const packs=[...(input.packs||[]), ...(input.customPacks||[])];
  packs.forEach(p=>{
    const name=p.name||p.title||"Pacote importado";
    const teams=(p.teams||[]).map(t=>normalizeImportedTeam(t,name)).filter(Boolean);
    if(teams.length){
      data.customPacks.push({id:"pack_"+slug(name)+"_"+Date.now()+"_"+packCount, name, teams});
      packCount++;
    }
  });
  (input.competitions||[]).forEach(c=>{
    const name=c.name||c.championshipName||c.title||"Campeonato importado";
    const comp={id:uid(), name, editions:Array.isArray(c.editions)?c.editions:[]};
    data.competitions.push(comp);
    compCount++;
    const teams=(c.teams||[]).map(t=>normalizeImportedTeam(t,name)).filter(Boolean);
    if(teams.length){
      data.customPacks.push({id:"pack_"+slug(name)+"_"+Date.now()+"_"+packCount, name:`${name} — importado`, teams});
      packCount++;
    }
  });
  if(input.name && input.teams && !input.competitions){
    const name=input.name||"Campeonato importado";
    const teams=(input.teams||[]).map(t=>normalizeImportedTeam(t,name)).filter(Boolean);
    data.competitions.push({id:uid(), name, editions:[]});
    compCount++;
    if(teams.length){
      data.customPacks.push({id:"pack_"+slug(name)+"_"+Date.now(), name:`${name} — importado`, teams});
      packCount++;
    }
  }
  currentCompetitionId=data.competitions[0]?.id||null;
  save(); renderAll();
  alert(`Importado: ${compCount} campeonato(s), ${packCount} pacote(s), ${teamCount} time(s), ${crestCount} escudo(s).`);
}
function exampleChampionshipImport(){
  return JSON.stringify({
    competitions:[{name:"Champions Brocket", editions:[]}],
    packs:[{name:"Champions Brocket", teams:[
      {name:"Liverpool",power:88,short:"LIV"},
      {name:"PSG",power:88,short:"PSG"},
      {name:"Bayern München",power:89,short:"BAY"},
      {name:"Barcelona",power:87,short:"BAR"}
    ]}],
    crests:{
      "Liverpool":"",
      "PSG":"",
      "Bayern München":"",
      "Barcelona":""
    }
  },null,2);
}


function refreshBuiltinPackCrests(){
  data.crests ||= {};
  let count=0;
  Object.values(packs).forEach(p=>p.teams.forEach(([name])=>{
    if(name && !data.crests[name]){ data.crests[name]=builtinPackCrest(name,p.name); count++; }
  }));
  (data.customPacks||[]).forEach(p=>(p.teams||[]).forEach(t=>{
    if(t?.name && !t.crest && !data.crests[t.name]){ const u=builtinPackCrest(t.name,p.name); data.crests[t.name]=u; t.crest=u; count++; }
  }));
  save(); renderAll();
  return count;
}

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
  go("home");
}

function exportLeagueStatus(t,x,i){ return leagueRowTag(t,x,i,"class") || ""; }
function exportGroupStatus(t,x,info){
  if(info?.directIds?.has(x.id) || info?.extraIds?.has(x.id)) return "qualified";
  if(info?.relegatedIds?.has(x.id)) return "relegated";
  return "";
}
function exportRowsForTable(t){
  if(t.league){
    const table=t.league.table||t.league.teams;
    return table.map((x,i)=>({
      pos:i+1, name:x.name, pts:x.pts, played:x.w+x.d+x.l, wins:x.w, gd:x.gd, gf:x.gf,
      status: exportLeagueStatus(t,x,i)
    }));
  }
  if(t.groups?.length){
    const info=groupClassificationInfo(t);
    return t.groups.flatMap(g=>(g.table.length?g.table:g.teams).map((x,i)=>({
      group:g.name, pos:i+1, name:x.name, pts:x.pts, played:x.w+x.d+x.l, wins:x.w, gd:x.gd, gf:x.gf,
      status: exportGroupStatus(t,x,info)
    })));
  }
  return [];
}
function buildExportTable(t){
  const rows=exportRowsForTable(t);
  if(!rows.length) return null;
  const wrap=document.createElement("div");
  wrap.className="export-sheet";
  const title=[t.cfg.championshipName||t.cfg.name, t.cfg.divisionName, t.cfg.seasonName||t.cfg.customEditionName].filter(Boolean).join(" — ");
  const isGroups=!!t.groups?.length && !t.league;
  const sub=[isGroups?"Fase de grupos":formatLabel(t.cfg.format), `${t.teams?.length||rows.length} times`].filter(Boolean).join(" • ");
  wrap.innerHTML=`<div class="export-head"><strong>${title||"Brocket"}</strong><small>${sub}</small></div>`;
  if(isGroups){
    const byGroup=new Map();
    rows.forEach(r=>{ if(!byGroup.has(r.group)) byGroup.set(r.group,[]); byGroup.get(r.group).push(r); });
    byGroup.forEach((items,group)=>{
      const block=document.createElement("div");
      block.className="export-group";
      block.innerHTML=`<h3>Grupo ${group}</h3>${exportTableMarkup(items)}`;
      wrap.appendChild(block);
    });
  }else{
    wrap.insertAdjacentHTML("beforeend", exportTableMarkup(rows));
  }
  return wrap;
}
function exportTableMarkup(rows){
  return `<table class="export-table"><thead><tr><th>Pos</th><th>Time</th><th>Pts</th><th>J</th><th>V</th><th>SG</th></tr></thead><tbody>${rows.map(r=>{ const cls=r.status?` class="export-status-${r.status}"`:""; const trophy=r.status==="champion"?"🏆 ":""; return `<tr${cls}><td>${r.pos}</td><td><span class="export-team"><strong>${trophy}${r.name}</strong></span></td><td>${r.pts}</td><td>${r.played}</td><td>${r.wins}</td><td>${r.gd}</td></tr>`; }).join("")}</tbody></table>`;
}
function exportCurrentTable(type="png"){
  const t=data.activeTournament;
  if(!t){ alert("Não há torneio ativo para exportar."); return; }
  if(typeof html2canvas!=="function") { alert("Exportação indisponível no momento. Tente novamente com internet ativa."); return; }
  const sheet=buildExportTable(t);
  if(!sheet){ alert("Nada para exportar ainda."); return; }
  const holder=document.createElement("div");
  holder.className="export-holder";
  holder.appendChild(sheet);
  document.body.appendChild(holder);
  const fileBase=slug([t.cfg.championshipName||t.cfg.name, t.cfg.divisionName, "tabela"].filter(Boolean).join("-")) || "brocket-tabela";
  html2canvas(sheet,{backgroundColor:"#ffffff",scale:2,useCORS:true,logging:false}).then(canvas=>{
    const url=canvas.toDataURL("image/png");
    const a=document.createElement("a");
    a.href=url; a.download=`${fileBase}.png`; a.click();
  }).catch(()=>alert("Não consegui gerar a imagem desta tabela.")).finally(()=>holder.remove());
}
function buildExportBracket(t){
  if(!t.knockout?.length) return null;
  const wrap=document.createElement("div");
  wrap.className="export-bracket-sheet";
  const title=[t.cfg.championshipName||t.cfg.name, t.cfg.divisionName, t.cfg.seasonName||t.cfg.customEditionName].filter(Boolean).join(" — ");
  const sub=[formatLabel(t.cfg.format), `${t.teams?.length||0} times`].filter(Boolean).join(" • ");
  wrap.innerHTML=`<div class="export-bracket-head"><strong>${title||"Brocket"}</strong><small>${sub}</small></div>${renderBracketBoard(t,{export:true,cardW:220,cardH:76,roundGap:62,baseGap:22})}`;
  return wrap;
}
function exportCurrentBracket(){
  const t=data.activeTournament;
  if(!t?.knockout?.length){ alert("Não há mata-mata para exportar."); return; }
  if(typeof html2canvas!=="function") { alert("Exportação indisponível no momento. Tente novamente com internet ativa."); return; }
  const sheet=buildExportBracket(t);
  const holder=document.createElement("div");
  holder.className="export-holder export-holder-bracket";
  holder.appendChild(sheet);
  document.body.appendChild(holder);
  const fileBase=slug([t.cfg.championshipName||t.cfg.name, t.cfg.divisionName, "mata-mata"].filter(Boolean).join("-")) || "brocket-mata-mata";
  html2canvas(sheet,{backgroundColor:null,scale:2,useCORS:true,logging:false}).then(canvas=>{
    const url=canvas.toDataURL("image/png");
    const a=document.createElement("a");
    a.href=url; a.download=`${fileBase}.png`; a.click();
  }).catch(()=>alert("Não consegui gerar a imagem do mata-mata.")).finally(()=>holder.remove());
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
  $("#tournamentName").textContent=t.cfg.name; $("#tournamentFormat").textContent=[formatLabel(t.cfg.format), t.cfg.divisionName].filter(Boolean).join(" • ");
  const next=nextPlayable(t);
  const hasBracket=!!t.knockout?.length;
  const exportBtns=`<button class="play-btn export" data-export-table="png">Baixar tabela PNG</button>${hasBracket?`<button class="play-btn export" data-export-bracket="png">Baixar mata-mata PNG</button>`:""}`;
  $("#tournamentActions").innerHTML = t.status==="finished"
    ? `<button class="play-btn dark">🏆 Torneio finalizado e salvo</button>${exportBtns}`
    : `<button class="play-btn" id="simulateNext">Simular próxima partida</button><button class="play-btn" id="simulateRound">Simular rodada</button><button class="play-btn subtle" id="simulateAll">Simular tudo</button>${exportBtns}<button class="play-btn danger-lite" id="deleteActiveTournament">Apagar torneio</button><button class="play-btn dark" data-go="create">Criar outro</button>`;
  $("#summaryBar").innerHTML = t.status==="finished"
    ? `<div class="next-card"><small>Campeão</small><strong>🏆 ${t.champion}</strong></div>`
    : `<div class="next-card"><small>Próxima partida</small><strong>${next?`${next.home.name} x ${next.away.name}`:"aguardando"}</strong></div>`;
  renderLeague(t); renderGroups(t); renderBracket(t);
  const btn=$("#simulateNext"); if(btn) btn.onclick=simulateNext; const roundBtn=$("#simulateRound"); if(roundBtn) roundBtn.onclick=simulateRound; const allBtn=$("#simulateAll"); if(allBtn) allBtn.onclick=simulateAll; const delBtn=$("#deleteActiveTournament"); if(delBtn) delBtn.onclick=deleteActiveTournament;
}

function groupClassificationInfo(t){
  const directIds = new Set();
  const extraIds = new Set();
  const relegatedIds = new Set();
  const per=clamp(Number(t.cfg.qualifiersPerGroup)||2,0,99);
  const extra=Number(t.cfg.bestExtraQualifiers)||0;
  const releg=Number(t.cfg.groupRelegatedCount)||0;
  const extras=[];
  t.groups.forEach(g=>{
    const table=g.table?.length?g.table:g.teams;
    table.slice(0,per).forEach(tm=>directIds.add(tm.id));
    if(extra>0 && table[per]) extras.push({...table[per], group:g.name, pos:per+1});
    if(releg>0) table.slice(Math.max(0,table.length-releg)).forEach(tm=>relegatedIds.add(tm.id));
  });
  extras.sort((a,b)=>compareRows(a,b,t.cfg));
  extras.slice(0,extra).forEach(x=>extraIds.add(x.id));
  return {directIds, extraIds, relegatedIds, per, extra, relegated:releg, isCopa48:Number(t.cfg.teamCount)===48 && Number(t.cfg.groupSize)===4 && t.groups.length===12};
}
function groupRowTag(t,x,i,info,mode="screen"){
  if(info?.directIds?.has(x.id) || info?.extraIds?.has(x.id)) return mode==="export" ? statusMarker("direct","Classificado") : "";
  if(info?.relegatedIds?.has(x.id)) return mode==="export" ? statusMarker("relegated","Rebaixado") : "";
  return "";
}
function renderQualifiedSummary(t){
  if(!t.groups?.length) return "";
  const info=groupClassificationInfo(t);
  const extra=info.extra ? ` + ${info.extra} melhores campanhas` : "";
  const rebaix=info.relegated ? ` • ${info.relegated} rebaixado(s) por grupo` : "";
  const odd=(Number(t.cfg.groupSize)||0)%2 ? ` • descanso automático nas rodadas` : "";
  const title=info.isCopa48 ? "Formato Copa 48" : "Regras dos grupos";
  return `<div class="qualified-box compact-qualified rule-only"><strong>${title}</strong><small>Classificam ${info.per} por grupo${extra}${rebaix}${odd}.</small></div>`;
}

function rowStatusClass(t,x,i){ const tag=leagueRowTag(t,x,i,"class"); return tag ? `status-${tag}` : ""; }
function leagueRowTag(t,x,i,mode="screen"){
  const cfg=t.cfg||{};
  const n=(t.league?.table||[]).length;
  const tier=cfg.divisionTier||"top";
  const promoted=Number(cfg.promotedCount)||0;
  const relegated=Number(cfg.relegatedCount)||0;
  if(t.status==="finished" && i===0 && tier==="top"){ if(mode==="class") return "champion"; return mode==="export" ? statusMarker("champion","Campeão") : ""; }
  if(tier!=="top" && promoted>0 && i<promoted){ if(mode==="class") return "promoted"; return mode==="export" ? statusMarker("promoted","Promovido") : ""; }
  if(tier!=="bottom" && relegated>0 && i>=n-relegated){ if(mode==="class") return "relegated"; return mode==="export" ? statusMarker("relegated","Rebaixado") : ""; }
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
  $("#leagueArea").innerHTML = `<div class="section-title on-field"><h2>Tabela</h2></div><div class="group-card table-card"><div class="table-scroll"><table class="table standings-table"><thead><tr><th>Pos</th><th>Time</th><th>Pts</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th><th>GP</th><th></th></tr></thead><tbody>${table.map((x,i)=>`<tr class="${[t.status==="finished"&&i===0?"champion-row":"", rowStatusClass(t,x,i)].filter(Boolean).join(" ")}"><td>${i+1}</td><td>${teamCellWithDelta(x,t.status==="finished"&&i===0)}</td><td>${x.pts}</td><td>${x.w+x.d+x.l}</td><td>${x.w}</td><td>${x.d}</td><td>${x.l}</td><td>${x.gd}</td><td>${x.gf}</td><td>${leagueRowTag(t,x,i)}</td></tr>`).join("")}</tbody></table></div></div><div class="section-title on-field"><h2>Rodadas</h2></div>${roundNav("league",idx,rounds.length)}<div class="groups-grid one-round">${round?`<div class="group-card"><h3>${round.name}</h3><div class="match-list">${round.matches.map(matchMini).join("")}</div></div>`:""}</div>`;
}
function groupMatchesByStage(matches){
  const map=new Map();
  matches.forEach(m=>{ if(!map.has(m.stage)) map.set(m.stage,[]); map.get(m.stage).push(m); });
  return Array.from(map.entries());
}
function renderGroups(t){
  if(!t.groups?.length){ $("#groupsArea").innerHTML=""; return; }
  const adj=t.autoAdjustment?.target ? `<div class="auto-adjust-note"><strong>Ajuste automático:</strong> ${t.autoAdjustment.classified} classificados geram Rodada preliminar. ${t.autoAdjustment.byes} entram direto e ${t.autoAdjustment.prelimTeams} jogam a preliminar.</div>` : "";
  const info=groupClassificationInfo(t);
  $("#groupsArea").innerHTML = `<div class="section-title on-field"><h2>Fase de grupos</h2></div>${adj}${renderQualifiedSummary(t)}<div class="groups-grid group-stage-grid">${t.groups.map(g=>groupStageCard(t,g,info)).join("")}</div>`;
}
function groupStageCard(t,g,info){
  sortGroup(g,t.cfg);
  const rows=g.table.length?g.table:g.teams;
  const matches=g.matches||[];
  const byes=g.byes||[];
  const allPlayed=matches.length>0 && matches.every(m=>m.played);
  return `<div class="group-card group-card--clean group-stage-card">
    <div class="group-stage-head">
      <div class="group-stage-title">
        <h3>Grupo ${g.name}</h3>
        ${allPlayed?`<span class="group-status">✓ Encerrado</span>`:""}
      </div>
      <button class="group-sim-btn" data-sim-group="${g.name}">Simular</button>
    </div>
    <div class="table-scroll group-table-wrap">
      <table class="table group-table standings-table group-standings">
        <thead><tr><th>#</th><th>Time</th><th>P</th><th>V</th><th>E</th><th>D</th><th>SG</th><th>PTS</th></tr></thead>
        <tbody>${rows.map((x,i)=>groupStandingRow(t,x,i,info)).join("")}</tbody>
      </table>
    </div>
    <div class="group-matches-list">${groupMatchSections(matches,byes)}</div>
  </div>`;
}
function groupStandingRow(t,x,i,info){
  const qualified=info.directIds?.has(x.id)||info.extraIds?.has(x.id);
  const relegated=info.relegatedIds?.has(x.id);
  const cls=qualified?"status-qualified":relegated?"status-relegated":"";
  const played=(x.w||0)+(x.d||0)+(x.l||0);
  const gd=(x.gd||0)>0?`+${x.gd}`:(x.gd||0);
  const delta=deltaBadge(x.posDelta);
  const short=teamShort(x);
  return `<tr class="${cls}" title="${escapeAttr(x.name)}">
    <td><span class="group-rank"><span class="group-pos ${qualified?"qualified":""}">${i+1}</span><span class="rank-delta">${delta}</span></span></td>
    <td><span class="group-team-name ${qualified?"qualified":""}" title="${escapeAttr(x.name)}">${teamCrest(x,18)}<span class="group-team-text group-team-full">${escapeHtml(x.name)}</span><span class="group-team-text group-team-short">${escapeHtml(short)}</span></span></td>
    <td>${played}</td><td>${x.w||0}</td><td>${x.d||0}</td><td>${x.l||0}</td><td>${gd}</td><td><strong>${x.pts||0}</strong></td>
  </tr>`;
}
function normalizeRoundLabel(stage){
  return (stage?.match(/Rodada \d+/)||[stage||"Rodada"])[0];
}
function groupMatchSections(matches=[],byes=[]){
  const map=new Map();
  matches.forEach(m=>{
    const key=normalizeRoundLabel(m.stage);
    if(!map.has(key)) map.set(key,{matches:[],byes:[]});
    map.get(key).matches.push(m);
  });
  byes.forEach(b=>{
    const key=normalizeRoundLabel(b.stage);
    if(!map.has(key)) map.set(key,{matches:[],byes:[]});
    map.get(key).byes.push(b);
  });
  return [...map.entries()].map(([round,items])=>`<div class="group-round-block"><small>${round}</small>${items.matches.map(matchMini).join("")}${items.byes.map(byeMini).join("")}</div>`).join("");
}
function byeMini(b){
  return `<div class="group-match-row bye-match"><span class="group-match-team home">Descansa</span><strong class="group-match-score">—</strong><span class="group-match-team away">${teamNameWithCrest(b.team,{size:20,compact:true})}</span><div class="mini-actions"><em>folga</em></div></div>`;
}
function matchMini(m){
  const played=m.played;
  const homeWon=played && m.homeGoals>m.awayGoals;
  const awayWon=played && m.awayGoals>m.homeGoals;
  const score=played?`${scoreCell(m,"home")} – ${scoreCell(m,"away")}`:"—";
  return `<div class="group-match-row ${played?"played":""}">
    <span class="group-match-team home ${homeWon?"winner":""}">${teamNameWithCrest(m.home,{size:20,compact:true})}</span>
    <button class="group-match-score" data-edit-match="${m.id}">${score}</button>
    <span class="group-match-team away ${awayWon?"winner":""}">${teamNameWithCrest(m.away,{size:20,compact:true})}</span>
    <div class="mini-actions">${played?`<button data-edit-match="${m.id}">editar</button>`:`<button data-sim="${m.id}">simular</button><button data-edit-match="${m.id}">manual</button>`}</div>
  </div>`;
}

function renderBracket(t){
  if(!t.knockout?.length){ $("#bracketArea").innerHTML=""; $("#knockoutTitle").style.display=t.league?"none":"flex"; return; }
  $("#knockoutTitle").style.display="flex";
  $("#bracketArea").innerHTML = renderBracketBoard(t);
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
function saveEdition(t){ if(t.cfg.saveMode==="single") return; const c=data.competitions.find(x=>x.id===t.cfg.competitionId); if(!c) return; c.editions.push({id:uid(), name:t.cfg.name, championshipName:t.cfg.championshipName, divisionName:t.cfg.divisionName, format:formatLabel(t.cfg.format), champion:t.champion, runnerUp:t.runnerUp, date:new Date().getFullYear().toString(), teams:t.teams.map(x=>x.name), matches:flattenMatches(t), promoted:t.league?.table?.filter((x,i)=>leagueRowTag(t,x,i,"class")==="promoted")?.map(x=>x.name)||[], relegated:t.league?.table?.filter((x,i)=>leagueRowTag(t,x,i,"class")==="relegated")?.map(x=>x.name)||[], leagueTable:t.league?.table?.map(x=>({team:x.name,pts:x.pts,w:x.w,d:x.d,l:x.l,gf:x.gf,ga:x.ga,gd:x.gd}))||null}); save(); }

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
function rankCard(title,obj,unit,asc=false){ const rows=rankEntries(obj,asc).slice(0,6).map(([n,v],i)=>`<div class="rank-row"><span>${medal(i)} ${n}</span><strong>${v} ${unit}</strong></div>`).join("") || `<small class="muted">Sem dados ainda.</small>`; return `<div class="stat-card"><h3>${title}</h3>${rows}</div>`; }
function feature(title,value,sub=""){ return `<div class="stat-card featured"><small>${title}</small><strong>${value||"—"}</strong><span>${sub}</span></div>`; }
function matchText(m){ return m?`${m.home} ${m.homeGoals} x ${m.awayGoals} ${m.away}`:"—"; }
function renderCompetitionDetail(c){
  const s=statsFor(c);
  const hasFinals=s.matches.some(m=>isFinalStage(m.stage));
  const hasLeague=(c.editions||[]).some(e=>e.format==="Pontos corridos" || e.leagueTable);
  $("#competitionHero").innerHTML = [`<div class="stat"><small>Edições</small><strong>${s.editions.length}</strong></div>`,`<div class="stat"><small>Jogos salvos</small><strong>${s.matches.length}</strong></div>`,`<div class="stat"><small>Times</small><strong>${s.teams.length}</strong></div>`,`<div class="stat"><small>Maior campeão</small><strong>${s.topChampion}</strong></div>`].join("");
  $("#overviewStats").innerHTML = [feature("🏆 Maior campeão",s.topChampion),feature("🥈 Vice-campeão",rankEntries(s.vices)[0]?.[0]||"—"),feature("⚽ Maior goleada",matchText(s.biggestWin)),hasFinals?feature("🔥 Final com mais gols",matchText(s.finalGoals)):"",rankCard("Maiores campeões",s.titles,"títulos"),hasFinals?rankCard("Mais finais",s.finals,"finais"):""].join("");
  $("#rankingStats").innerHTML = [rankCard("Maiores campeões",s.titles,"títulos"),rankCard("Maiores vices",s.vices,"vices"),hasFinals?rankCard("Mais finais",s.finals,"finais"):"",rankCard("Mais participações",s.parts,"part."),hasFinals?rankCard("Títulos nos pênaltis",s.pensTitles,"títulos"):"",hasLeague?rankCard("Mais pontos em ligas",s.leaguePoints,"pts"):"",hasLeague?rankCard("Mais vitórias em ligas",s.leagueWins,"vitórias"):""].join("");
  $("#teamStatsList").innerHTML = Object.values(s.teamStats).sort((a,b)=>b.titles-a.titles||b.points-a.points||b.gd-a.gd||b.gf-a.gf).map(t=>`<div class="list-card"><div><strong>${t.team}</strong><small>${t.titles} títulos • ${t.vices} vices • ${t.parts} participações</small><small>${t.played}J ${t.w}V ${t.d}E ${t.l}D • ${t.gf} gols • ${t.ga} gols sofridos • SG ${t.gd}</small></div><span class="pill">${t.points} pts</span></div>`).join("") || `<div class="panel">Sem estatísticas de times.</div>`;
  $("#recordStats").innerHTML = [feature("Maior goleada",matchText(s.biggestWin)),hasFinals?feature("Final com mais gols",matchText(s.finalGoals)):"",feature("Campeões invictos",[...new Set(s.undefeated)].slice(0,5).join(", ")||"—"),hasLeague?rankCard("Melhor ataque em ligas",s.leagueGF,"gols"):"",hasLeague?rankCard("Menos gols sofridos em ligas",s.leagueDefense,"gols sofridos",true):""].join("");
  $("#editionList").innerHTML = (c.editions||[]).map(e=>`<div class="list-card"><div><strong>${e.name}</strong><small>${e.format} • campeão: ${e.champion}</small><small>${(e.teams||[]).length} times • ${(e.matches||[]).length} jogos</small></div><button class="mini-danger" data-delete-edition="${e.id}">apagar</button></div>`).join("") || `<div class="panel">Sem edições ainda.</div>`;
}

function deleteEdition(id){ const c=data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return; if(confirm("Apagar esta edição?")){ c.editions=c.editions.filter(e=>e.id!==id); save(); renderCompetitionDetail(c); renderCompetitions(); } }
function deleteCompetition(id=currentCompetitionId){
  const c=data.competitions.find(x=>x.id===id); if(!c) return;
  if(confirm(`Apagar o campeonato "${c.name}" e todas as edições?`)){
    data.competitions=data.competitions.filter(x=>x.id!==c.id);
    if(currentCompetitionId===c.id) currentCompetitionId=data.competitions[0]?.id || null;
    save(); renderAll(); go("competitions");
  }
}
function deleteCustomTeam(id){ if(confirm("Apagar este time criado?")){ data.customTeams=data.customTeams.filter(t=>t.id!==id); save(); renderAll(); } }

$("#toggleCompetitionForm").onclick=()=>$("#competitionForm").hidden=!$("#competitionForm").hidden;
$("#saveCompetition").onclick=()=>{ const name=$("#newCompetitionName").value.trim(); if(!name) return; const c={id:uid(),name,editions:[]}; data.competitions.push(c); currentCompetitionId=c.id; renderCompetitionSelect(); $("#newCompetitionName").value=""; $("#competitionForm").hidden=true; save(); renderAll(); };
$("#renameCompetition").onclick=()=>{ const c=data.competitions.find(x=>x.id===currentCompetitionId); if(!c) return; c.name=$("#editCompetitionName").value.trim()||c.name; save(); openCompetition(c.id); };
$("#deleteCompetition").onclick=()=>deleteCompetition(currentCompetitionId);
$("#addCustomTeam").onclick=()=>{ const name=$("#customTeamName").value.trim(), power=clamp(Number($("#customTeamPower").value)||70,1,100), short=cleanShort($("#customTeamShort")?.value); if(!name) return; data.customTeams.push(team(name,power,"Meu time",short)); $("#customTeamName").value=""; if($("#customTeamShort")) $("#customTeamShort").value=""; save(); renderAll(); };
const bind=(sel,ev,fn)=>{ const el=$(sel); if(el) el[ev]=fn; };
bind("#pickStrongest","onclick",pickStrongest); bind("#pickRandom","onclick",pickRandom); bind("#pickBalanced","onclick",pickBalanced);
bind("#clearTeams","onclick",()=>{selectedTeams=[]; previewOrder=null; renderSelected();});
bind("#fillMissingRandom","onclick",()=>fillMissing("random")); bind("#fillMissingStrongest","onclick",()=>fillMissing("strongest")); bind("#selectVisible","onclick",selectVisibleTeams); bind("#applyQuotas","onclick",applyQuotas); bind("#reshufflePreview","onclick",reshufflePreview);
bind("#teamSearch","oninput",e=>{teamSearch=e.target.value; renderAvailableTeams();}); bind("#powerFilter","onchange",e=>{powerFilter=e.target.value; renderAvailableTeams();});
bind("#generateTournament","onclick",generateTournament);
bind("#quickGenerateTop","onclick",generateTournament);
bind("#championshipName","oninput",()=>renderCompetitionTemplateSuggestion());
bind("#championshipName","onchange",()=>autoApplyCompetitionTemplate());
bind("#applyTemplateSuggestion","onclick",()=>applyTemplateFromName(false));
bind("#saveFootballDataToken","onclick",saveFootballDataToken);
bind("#clearFootballDataToken","onclick",clearFootballDataToken);
bind("#fetchFootballDataTeams","onclick",fetchFootballDataForCurrentTemplate);
bind("#fetchTemplateOfficialCrests","onclick",fetchFootballDataForCurrentTemplate);
bind("#formatSelect","onchange",()=>{ clearManualGroupsIfAny(); previewOrder=null; toggleRuleVisibility(); renderDrawPreview(); }); bind("#teamCount","onchange",()=>{ clearManualGroupsIfAny(); selectedTeams=selectedTeams.slice(0,desiredTeamCount()); previewOrder=null; renderSelected(); });
bind("#competitionSelect","onchange",e=>{ currentCompetitionId=e.target.value; renderCompetitionTemplateSuggestion(); autoApplyCompetitionTemplate(); });
document.addEventListener("change",e=>{
  const leagueSel=e.target.closest("[data-league-select]"); if(leagueSel){ setLeagueRound(leagueSel.value); return; }
  const groupSel=e.target.closest("[data-group-select]"); if(groupSel){ const t=data.activeTournament; const stages=[...new Set((t?.groups||[]).flatMap(g=>g.matches.map(m=>(m.stage.match(/Rodada \d+/)||["Rodada 1"])[0])))]; setGroupRound(stages[Number(groupSel.value)]||stages[0]); return; }
  const p=e.target.closest("[data-pack]"); if(p){ p.checked?selectedPacks.add(p.dataset.pack):selectedPacks.delete(p.dataset.pack); selectedTeams=[]; manualGroups=null; previewOrder=null; renderAll(); return; }
  const addGroup=e.target.closest("[data-add-to-group]"); if(addGroup && addGroup.value){ const t=getPreviewOrder(cfg()).find(x=>x.id===addGroup.value); if(t){ manualGroups.forEach(g=>{ const idx=g.findIndex(x=>x.id===t.id); if(idx>=0) g.splice(idx,1); }); manualGroups[Number(addGroup.dataset.addToGroup)].push(t); renderManualGroups(); } return; }
  const pow=e.target.closest("[data-power-team]"); if(pow){ const t=selectedTeams.find(x=>x.id===pow.dataset.powerTeam); if(t){ t.power=clamp(Number(pow.value)||70,1,100); previewOrder=null; renderSelected(); } return; }
  if(["bracketShuffle","groupShuffle","groupTurns","groupSize","groupCount","qualifiersPerGroup","bestExtraQualifiers","groupRelegatedCount","leagueTurns","tiePreset","divisionTier","promotedCount","relegatedCount","divisionName","editionName"].includes(e.target.id)){ clearManualGroupsIfAny(); previewOrder=null; renderSelected(); renderDrawPreview(); }
  if(e.target.id==="championshipName"){ renderCompetitionTemplateSuggestion(); }
});
$$('.tab').forEach(t=>t.onclick=()=>{ $$('.tab').forEach(x=>x.classList.remove('active')); t.classList.add('active'); $$('.tab-page').forEach(p=>p.classList.remove('active')); $(`#${t.dataset.tab}Tab`)?.classList.add('active'); });

$$('input[name="saveMode"]').forEach(r=>r.onchange=()=>{ updateSaveModeUI(); renderCompetitionTemplateSuggestion(); autoApplyCompetitionTemplate(); renderSelected(); renderDrawPreview(); });

bind("#addCustomPack","onclick",addCustomPack);
bind("#autoFillGroups","onclick",autoFillManualGroups);
bind("#clearManualGroups","onclick",clearManualGroups);
bind("#closeManualResult","onclick",closeManualResult);
bind("#saveManualResult","onclick",saveManualResult);
bind("#clearLocalData","onclick",()=>{ if(confirm("Tem certeza que deseja apagar todos os dados locais? Essa ação não pode ser desfeita.")){ localStorage.removeItem(STORAGE); data=structuredClone(starter); currentCompetitionId=null; selectedTeams=[]; manualGroups=null; save(); renderAll(); go("home"); } });
bind("#exportBackup","onclick",()=>{ const box=$("#backupBox"); if(box) box.value=JSON.stringify(data,null,2); });
bind("#importBackup","onclick",()=>{ const box=$("#backupBox"); if(!box?.value.trim()) return; try{ const imported=JSON.parse(box.value); data={...structuredClone(starter),...imported}; data=sanitizeLoadedData(data); currentCompetitionId=data.competitions?.[0]?.id || null; save(); renderAll(); alert("Backup importado."); }catch(e){ alert("Backup inválido."); } });
bind("#showChampionshipImportExample","onclick",()=>{ const box=$("#championshipImportBox"); if(box) box.value=exampleChampionshipImport(); });
bind("#importChampionships","onclick",()=>{ const box=$("#championshipImportBox"); if(!box?.value.trim()){ alert("Cole o JSON de campeonato/pacote primeiro."); return; } importChampionshipPayload(box.value); });
bind("#refreshBuiltinCrests","onclick",()=>{ const n=refreshBuiltinPackCrests(); alert(n ? `${n} escudo(s) atualizados.` : "Os escudos dos packs já estavam atualizados."); });
renderAll();

document.addEventListener("change",(ev)=>{
  if(["formatSelect","teamCount","groupSize","groupCount","groupShuffle"].includes(ev.target?.id)) clearManualGroupsIfAny();
});

function matchLegDisplay(m){
  if(!m) return "";
  if(m.legs?.length===2){
    const l1=m.legs[0], l2=m.legs[1];
    const ap=m.extraTime?" • A.P.":"";
    const pens=m.penalties?` • Pênaltis ${m.penalties[0]}-${m.penalties[1]}`:"";
    return `Ida ${l1.home||""} ${l1.a}-${l1.b} ${l1.away||""} • Volta ${l2.home||""} ${l2.a}-${l2.b} ${l2.away||""}${ap}${pens}`;
  }
  return "";
}
