// Countries
const places = [
  { name: "🇮🇳 India", vip: true,  fact: "Fun fact: India has one of the largest rail networks in the world!", souvenir: "🧿 Evil Eye Charm", location: "🏰 Taj Mahal (VIP Night Tour)" },
  { name: "🏔️ Colorado", vip: true, fact: "Fun fact: Colorado has the highest paved road in North America!", souvenir: "⛷️ Mini Ski Goggles", location: "🏔️ Secret Mountain Hot Springs (VIP)" },
  { name: "🌺 Hawaii", vip: false, fact: "Fun fact: Hawaii is the only U.S. state made entirely of islands!", souvenir: "🌸 Flower Lei", location: "🌋 Volcano Viewpoint" },
  { name: "🌴 Costa Rica", vip: false, fact: "Fun fact: Costa Rica has no official army — it was abolished in 1949!", souvenir: "🦥 Sloth Keychain", location: "🌧️ Misty Rainforest Trail" },
  { name: "🇳🇬 Nigeria", vip: false, fact: "Fun fact: Nigeria is Africa’s most populous country!", souvenir: "🥁 Mini Talking Drum", location: "🎭 Lagos Street Market" },
  { name: "🇫🇷 France", vip: false, fact: "Fun fact: France is the most visited country in the world!", souvenir: "🥐 Tiny Croissant Plush", location: "🗼 Eiffel Tower Picnic Spot" },
  { name: "🇯🇵 Japan", vip: false, fact: "Fun fact: Japan has more than 6,000 islands!", souvenir: "🍡 Dango Charm", location: "⛩️ Hidden Shrine Path" },
  { name: "🇧🇷 Brazil", vip: false, fact: "Fun fact: The Amazon rainforest is the largest rainforest on Earth!", souvenir: "🦜 Parrot Feather Badge", location: "🌿 Amazon Canopy Walk" },
  { name: "🇪🇬 Egypt", vip: false, fact: "Fun fact: The Great Pyramid of Giza is one of the Seven Wonders of the Ancient World!", souvenir: "🐫 Tiny Camel Statue", location: "🏜️ Desert Sunset Dunes" }
];

const placeImages = {
  "🇮🇳 India": "assets/backgrounds/india.svg",
  "🏔️ Colorado": "assets/backgrounds/colorado.svg",
  "🌺 Hawaii": "assets/backgrounds/hawaii.svg",
  "🌴 Costa Rica": "assets/backgrounds/costa-rica.svg",
  "🇳🇬 Nigeria": "assets/backgrounds/nigeria.svg",
  "🇫🇷 France": "assets/backgrounds/france.svg",
  "🇯🇵 Japan": "assets/backgrounds/japan.svg",
  "🇧🇷 Brazil": "assets/backgrounds/brazil.svg",
  "🇪🇬 Egypt": "assets/backgrounds/egypt.svg"
};

function setTravelBackground(placeName){
  const image = placeImages[placeName] || placeImages["🌺 Hawaii"] || "assets/backgrounds/default.svg";
  document.body.style.background = `linear-gradient(140deg, rgba(7, 47, 95, 0.45), rgba(12, 145, 163, 0.15)), url(${image}) center/cover no-repeat fixed`;
}

// Elements
const stampsEl = document.getElementById("stamps");
const destinationEl = document.getElementById("destination");
const factEl = document.getElementById("fact");
const travelEcoBtn = document.getElementById("travelEcoBtn");
const travelFcBtn = document.getElementById("travelFcBtn");
const clearBtn = document.getElementById("clearBtn");

// Tabs/screens
const tabPassport = document.getElementById("tabPassport");
const tabLounge = document.getElementById("tabLounge");
const tabStore = document.getElementById("tabStore");
const tabParty = document.getElementById("tabParty");
const screenPassport = document.getElementById("screenPassport");
const screenLounge = document.getElementById("screenLounge");
const screenStore = document.getElementById("screenStore");
const screenParty = document.getElementById("screenParty");

// Lounge
const loungeCoinsEl = document.getElementById("loungeCoins");
const snackArea = document.getElementById("snackArea");
const startSnackGame = document.getElementById("startSnackGame");
const stopSnackGame = document.getElementById("stopSnackGame");
const boardEcoBtn = document.getElementById("boardEcoBtn");
const boardFcBtn = document.getElementById("boardFcBtn");
const boardingNote = document.getElementById("boardingNote");

// Store
const buyFcBtn = document.getElementById("buyFcBtn");
const buySuitcaseBtn = document.getElementById("buySuitcaseBtn");
const buySodaBtn = document.getElementById("buySodaBtn");
const storeMsg = document.getElementById("storeMsg");

// Top stats
const coinsEl = document.getElementById("coins");
const fcTicketsEl = document.getElementById("fcTickets");
const currentPlayerNameEl = document.getElementById("currentPlayerName");

// Souvenir list (current player)
const souvenirListEl = document.getElementById("souvenirList");

// Sounds UI
const countrySelect = document.getElementById("countrySelect");
const musicUrlInput = document.getElementById("musicUrl");
const ambientUrlInput = document.getElementById("ambientUrl");
const saveMusicBtn = document.getElementById("saveMusic");
const saveAmbientBtn = document.getElementById("saveAmbient");
const playMusicBtn = document.getElementById("playMusic");
const stopMusicBtn = document.getElementById("stopMusic");
const playAmbientBtn = document.getElementById("playAmbient");
const stopAmbientBtn = document.getElementById("stopAmbient");
const volumeSlider = document.getElementById("volume");
const volText = document.getElementById("volText");
const soundMsg = document.getElementById("soundMsg");

// Party mode UI
const playerCountEl = document.getElementById("playerCount");
const playerNamesEl = document.getElementById("playerNames");
const startPartyBtn = document.getElementById("startParty");
const nextTurnBtn = document.getElementById("nextTurn");
const partyCurrentEl = document.getElementById("partyCurrent");
const scoreboardEl = document.getElementById("scoreboard");

// Audio state
const musicAudio = new Audio(); musicAudio.loop = true;
const ambientAudio = new Audio(); ambientAudio.loop = true;

// Sound settings per country
const soundSettings = {}; // { [countryName]: { musicUrl, ambientUrl } }

// ---------- Multiplayer State ----------
let players = [
  makePlayer("Solo")
];
let currentPlayerIndex = 0;

// global stamps feed (shows everyone)
let globalVisitedCountries = []; // for preventing duplicates per PLAYER we handle separately

function makePlayer(name){
  return {
    name,
    coins: 0,
    fcTickets: 0,
    visited: [],      // visited countries for that player
    souvenirs: [],    // souvenirs for that player
    stampsCount: 0
  };
}

function getP(){ return players[currentPlayerIndex]; }

// ---------- Helpers ----------
function toast(el, text){
  el.textContent = text;
  setTimeout(() => { if (el.textContent === text) el.textContent = ""; }, 2200);
}

function setVolume(v){
  const vol = Math.max(0, Math.min(1, v/100));
  musicAudio.volume = vol;
  ambientAudio.volume = Math.max(0, Math.min(1, vol * 0.7));
  volText.textContent = `${v}%`;
}
setVolume(parseInt(volumeSlider.value, 10));
volumeSlider.addEventListener("input", () => setVolume(parseInt(volumeSlider.value, 10)));

function stopAllAudio(){
  musicAudio.pause(); musicAudio.currentTime = 0;
  ambientAudio.pause(); ambientAudio.currentTime = 0;
}

function ensureSoundKey(name){
  if (!soundSettings[name]) soundSettings[name] = { musicUrl: "", ambientUrl: "" };
}

function refreshSoundInputs(){
  const key = countrySelect.value;
  ensureSoundKey(key);
  musicUrlInput.value = soundSettings[key].musicUrl || "";
  ambientUrlInput.value = soundSettings[key].ambientUrl || "";
}

function tryPlay(audio, url){
  if (!url) return false;
  audio.src = url;
  audio.play().catch(()=> toast(soundMsg, "Tap Play again if browser blocks audio."));
  return true;
}

// ---------- UI Updates ----------
function renderSouvenirsForCurrent(){
  const s = getP().souvenirs;
  souvenirListEl.innerHTML = "";
  if (s.length === 0) {
    const d = document.createElement("div");
    d.className = "pill";
    d.style.opacity = "0.7";
    d.textContent = "No souvenirs yet… travel to collect some!";
    souvenirListEl.appendChild(d);
    return;
  }
  s.forEach(item => {
    const pill = document.createElement("div");
    pill.className = "pill";
    pill.textContent = item;
    souvenirListEl.appendChild(pill);
  });
}

function updateTopStats(){
  const p = getP();
  coinsEl.textContent = p.coins;
  fcTicketsEl.textContent = p.fcTickets;
  currentPlayerNameEl.textContent = p.name;
  partyCurrentEl.textContent = p.name;
  renderSouvenirsForCurrent();
  renderScoreboard();
}

function renderScoreboard(){
  scoreboardEl.innerHTML = "";
  players.forEach((pl, i) => {
    const card = document.createElement("div");
    card.className = "scoreCard";
    card.style.outline = (i === currentPlayerIndex) ? "3px solid rgba(43,108,255,0.35)" : "none";
    card.innerHTML = `
      <div class="scoreName">${pl.name}${i === currentPlayerIndex ? " ⭐" : ""}</div>
      <div class="scoreLine">💰 Coins: ${pl.coins}</div>
      <div class="scoreLine">🎟️ First Class: ${pl.fcTickets}</div>
      <div class="scoreLine">🛂 Stamps: ${pl.stampsCount}</div>
      <div class="scoreLine">🎁 Souvenirs: ${pl.souvenirs.length}</div>
    `;
    scoreboardEl.appendChild(card);
  });
}

// ---------- Travel + Stamps ----------
function choosePlace(){
  return places[Math.floor(Math.random() * places.length)];
}

function showSouvenirPopup(text){
  const pop = document.createElement("div");
  pop.textContent = text;
  pop.style.position = "fixed";
  pop.style.left = "50%";
  pop.style.top = "18px";
  pop.style.transform = "translateX(-50%)";
  pop.style.padding = "12px 16px";
  pop.style.borderRadius = "999px";
  pop.style.background = "#111";
  pop.style.color = "#fff";
  pop.style.fontWeight = "900";
  pop.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  pop.style.zIndex = "9999";
  document.body.appendChild(pop);
  setTimeout(() => pop.remove(), 1600);
}

function addGlobalStamp(place, isFirstClass, playerName){
  const stamp = document.createElement("div");

  let cls = "stamp";
  if (place.vip) cls += " vipStamp";
  if (isFirstClass) cls += " fcStamp";
  stamp.className = cls;

  stamp.innerHTML = `
    <div class="big">${place.name}${place.vip ? " ✨" : ""}</div>
    <div class="small">👤 Player: <b>${playerName}</b></div>
    <div class="small">${isFirstClass ? "✨ FIRST CLASS trip! Bonus coins!" : (place.vip ? "VIP Exclusive Location!" : "Standard stamp")}</div>
    <div class="small">📍 Location: <b>${place.location}</b></div>
    <div class="small">🎁 Souvenir: <b>${place.souvenir}</b></div>
  `;
  stampsEl.prepend(stamp);
}

function autoSwitchCountryInSoundPanel(placeName){
  countrySelect.value = placeName;
  refreshSoundInputs();
  ensureSoundKey(placeName);
  const m = soundSettings[placeName].musicUrl;
  if (m) tryPlay(musicAudio, m);
}

function travel(isFirstClass){
  const p = getP();

  if (isFirstClass) {
    if (p.fcTickets <= 0) {
      destinationEl.textContent = "No First Class tickets 😭";
      factEl.textContent = "Go to the Store and buy a First Class Ticket!";
      return;
    }
    p.fcTickets -= 1;
  }

  const place = choosePlace();

  // update main display
  destinationEl.textContent = place.name + (place.vip ? " ✨ (VIP)" : "");
  setTravelBackground(place.name);
  factEl.textContent = `${place.fact} | 📍 ${place.location} | 🎁 Souvenir: ${place.souvenir} | 👤 ${p.name}`;

  // coins earned
  p.coins += isFirstClass ? 3 : 1;

  // per-player visited + souvenirs
  if (!p.visited.includes(place.name)) {
    p.visited.push(place.name);
    p.stampsCount += 1;
  }
  if (!p.souvenirs.includes(place.souvenir)) {
    p.souvenirs.push(place.souvenir);
    showSouvenirPopup(`🎁 ${p.name} got: ${place.souvenir}!`);
  }

  // global stamp feed (always shows)
  addGlobalStamp(place, isFirstClass, p.name);

  // sound switch
  autoSwitchCountryInSoundPanel(place.name);

  updateTopStats();
  checkWinner();
}

// ---------- Tabs ----------
function setActiveTab(which){
  tabPassport.classList.toggle("active", which === "passport");
  tabLounge.classList.toggle("active", which === "lounge");
  tabStore.classList.toggle("active", which === "store");
  tabParty.classList.toggle("active", which === "party");

  screenPassport.classList.toggle("hidden", which !== "passport");
  screenLounge.classList.toggle("hidden", which !== "lounge");
  screenStore.classList.toggle("hidden", which !== "store");
  screenParty.classList.toggle("hidden", which !== "party");

  boardingNote.textContent = "";
}
tabPassport.addEventListener("click", () => setActiveTab("passport"));
tabLounge.addEventListener("click", () => setActiveTab("lounge"));
tabStore.addEventListener("click", () => setActiveTab("store"));
tabParty.addEventListener("click", () => setActiveTab("party"));

// Passport buttons
travelEcoBtn.addEventListener("click", () => travel(false));
travelFcBtn.addEventListener("click", () => travel(true));

// Reset
clearBtn.addEventListener("click", () => {
  players = [makePlayer("Solo")];
  currentPlayerIndex = 0;
  stampsEl.innerHTML = "";
  destinationEl.textContent = "Choose a travel button to start!";
  factEl.textContent = "";
  stopAllAudio();
  updateTopStats();
  setActiveTab("passport");
});

// ---------- Lounge mini game (earns coins for CURRENT player) ----------
let snackTimer = null;
let loungeCoins = 0;
const snackEmojis = ["🍪","🍫","🍿","🥨","🧃","🍩","🍓","🧁"];

function spawnSnack() {
  const hint = snackArea.querySelector(".snackHint");
  if (hint) hint.style.display = "none";

  const snack = document.createElement("div");
  snack.className = "snack";
  snack.textContent = snackEmojis[Math.floor(Math.random() * snackEmojis.length)];

  const pad = 30;
  const x = Math.floor(Math.random() * (snackArea.clientWidth - pad));
  const y = Math.floor(Math.random() * (snackArea.clientHeight - pad));
  snack.style.left = x + "px";
  snack.style.top = y + "px";

  snack.addEventListener("click", () => {
    loungeCoins += 1;
    loungeCoinsEl.textContent = loungeCoins;
    snack.remove();
  });

  snackArea.appendChild(snack);
  setTimeout(() => { if (snack.parentNode) snack.remove(); }, 900);
}

function startGame(){
  if (snackTimer) return;
  boardingNote.textContent = "Mini game started! Tap snacks to earn coins.";
  snackTimer = setInterval(spawnSnack, 450);
}
function stopGame(){
  if (!snackTimer) return;
  clearInterval(snackTimer);
  snackTimer = null;
  boardingNote.textContent = "Mini game stopped. Ready to board!";
}

startSnackGame.addEventListener("click", startGame);
stopSnackGame.addEventListener("click", stopGame);

function cashOutLoungeCoins(){
  const p = getP();
  if (loungeCoins > 0) {
    p.coins += loungeCoins;
    loungeCoins = 0;
    loungeCoinsEl.textContent = "0";
    updateTopStats();
  }
}

boardEcoBtn.addEventListener("click", () => {
  stopGame();
  cashOutLoungeCoins();
  travel(false);
  boardingNote.textContent = "Boarded Economy! ✈️";
  setActiveTab("passport");
});
boardFcBtn.addEventListener("click", () => {
  stopGame();
  cashOutLoungeCoins();
  travel(true);
  boardingNote.textContent = "Boarded First Class! ✨";
  setActiveTab("passport");
});

// ---------- Store (buys for CURRENT player) ----------
function canAfford(cost){ return getP().coins >= cost; }

buyFcBtn.addEventListener("click", () => {
  const cost = 10;
  const p = getP();
  if (!canAfford(cost)) return toast(storeMsg, "Not enough coins 😭 Go earn coins in the Lounge!");
  p.coins -= cost;
  p.fcTickets += 1;
  updateTopStats();
  toast(storeMsg, `Bought 1 First Class Ticket for ${p.name}! 🎟️✨`);
});

buySuitcaseBtn.addEventListener("click", () => {
  const cost = 6;
  const p = getP();
  if (!canAfford(cost)) return toast(storeMsg, "Not enough coins 😭");
  p.coins -= cost;
  updateTopStats();
  toast(storeMsg, `${p.name} bought a fancy suitcase! 🧳`);
});

buySodaBtn.addEventListener("click", () => {
  const cost = 3;
  const p = getP();
  if (!canAfford(cost)) return toast(storeMsg, "Not enough coins 😭");
  p.coins -= cost;
  updateTopStats();
  toast(storeMsg, `${p.name} bought a lounge soda! 🥤`);
});

// ---------- Sounds UI wiring ----------
places.forEach(p => {
  const opt = document.createElement("option");
  opt.value = p.name;
  opt.textContent = p.name;
  countrySelect.appendChild(opt);
  ensureSoundKey(p.name);
});

countrySelect.addEventListener("change", refreshSoundInputs);
refreshSoundInputs();

saveMusicBtn.addEventListener("click", () => {
  const key = countrySelect.value;
  ensureSoundKey(key);
  soundSettings[key].musicUrl = musicUrlInput.value.trim();
  toast(soundMsg, "Saved Music URL ✅");
});

saveAmbientBtn.addEventListener("click", () => {
  const key = countrySelect.value;
  ensureSoundKey(key);
  soundSettings[key].ambientUrl = ambientUrlInput.value.trim();
  toast(soundMsg, "Saved Ambient URL ✅");
});

playMusicBtn.addEventListener("click", () => {
  const key = countrySelect.value;
  ensureSoundKey(key);
  const url = soundSettings[key].musicUrl;
  if (!url) return toast(soundMsg, "Paste an MP3 link first.");
  tryPlay(musicAudio, url);
  toast(soundMsg, "Playing music ▶️");
});

stopMusicBtn.addEventListener("click", () => {
  musicAudio.pause(); musicAudio.currentTime = 0;
  toast(soundMsg, "Music stopped ⏹");
});

playAmbientBtn.addEventListener("click", () => {
  const key = countrySelect.value;
  ensureSoundKey(key);
  const url = soundSettings[key].ambientUrl;
  if (!url) return toast(soundMsg, "Paste an ambient MP3 link first (optional).");
  tryPlay(ambientAudio, url);
  toast(soundMsg, "Playing ambient 🌊");
});

stopAmbientBtn.addEventListener("click", () => {
  ambientAudio.pause(); ambientAudio.currentTime = 0;
  toast(soundMsg, "Ambient stopped ⏹");
});

// ---------- Party Mode setup ----------
function renderNameInputs(count){
  playerNamesEl.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const input = document.createElement("input");
    input.className = "partyNameInput";
    input.placeholder = `Player ${i+1} name`;
    input.value = (count === 1 && i === 0) ? "Solo" : `Player ${i+1}`;
    input.dataset.idx = String(i);
    playerNamesEl.appendChild(input);
  }
}

playerCountEl.addEventListener("change", () => {
  renderNameInputs(parseInt(playerCountEl.value, 10));
});

renderNameInputs(1);

startPartyBtn.addEventListener("click", () => {
  const count = parseInt(playerCountEl.value, 10);
  const inputs = [...playerNamesEl.querySelectorAll("input")];

  players = inputs.slice(0, count).map(inp => makePlayer(inp.value.trim() || "Player"));
  currentPlayerIndex = 0;

  updateTopStats();
  toast(soundMsg, "Party started! 🎉");
});

nextTurnBtn.addEventListener("click", () => {
  if (!players || players.length === 0) return;
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  updateTopStats();
  showSouvenirPopup(`➡️ Next turn: ${getP().name}!`);
});

// Start
updateTopStats();
setTravelBackground("🌺 Hawaii");

// Winner modal elements
const winnerModal = document.getElementById("winnerModal");
const winnerText = document.getElementById("winnerText");
const confettiEl = document.getElementById("confetti");
const playAgainBtn = document.getElementById("playAgainBtn");
const keepPlayingBtn = document.getElementById("keepPlayingBtn");
const WIN_SOUVENIRS = 5;

function makeConfetti(){
  confettiEl.innerHTML = "";
  const pieces = 80;
  for (let i = 0; i < pieces; i++){
    const p = document.createElement("div");
    p.className = "confettiPiece";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDelay = (Math.random() * 0.6) + "s";
    p.style.transform = `rotate(${Math.random()*360}deg)`;
    p.style.background = `hsl(${Math.floor(Math.random()*360)}, 90%, 60%)`;
    p.style.width = (8 + Math.random()*8) + "px";
    p.style.height = (10 + Math.random()*10) + "px";
    confettiEl.appendChild(p);
  }
}

function showWinner(playerName){
  winnerText.textContent = `${playerName} collected ${WIN_SOUVENIRS} souvenirs! 🎁🎁🎁🎁🎁`;
  winnerModal.classList.remove("hidden");
  makeConfetti();
}

function hideWinner(){
  winnerModal.classList.add("hidden");
  confettiEl.innerHTML = "";
}

function checkWinner(){
  const p = getP();
  if (p.souvenirs.length >= WIN_SOUVENIRS) showWinner(p.name);
}

keepPlayingBtn.addEventListener("click", hideWinner);

playAgainBtn.addEventListener("click", () => {
  players = [makePlayer("Solo")];
  currentPlayerIndex = 0;
  stampsEl.innerHTML = "";
  destinationEl.textContent = "Choose a travel button to start!";
  factEl.textContent = "";
  stopAllAudio();
  hideWinner();
  setTravelBackground("🌺 Hawaii");
  updateTopStats();
  setActiveTab("passport");
});

// ===== WALK AROUND MODE (Canvas) =====
const enterWalkBtn = document.getElementById("enterWalk");
const exitWalkBtn = document.getElementById("exitWalk");
const gameCanvas = document.getElementById("gameCanvas");
const walkHint = document.getElementById("walkHint");
const ctx = gameCanvas.getContext("2d");

let walkMode = false;
let keys = {};

const player = { x: 80, y: 180, r: 14, speed: 2.6 };

const objects = {
  souvenir: { x: 620, y: 90, w: 110, h: 70, emoji: "🎁", label: "Souvenir Stand" },
  lounge:   { x: 620, y: 230, w: 110, h: 70, emoji: "🛋️", label: "Lounge Door" }
};

function rectHitCircle(rect, c){
  const closestX = Math.max(rect.x, Math.min(c.x, rect.x + rect.w));
  const closestY = Math.max(rect.y, Math.min(c.y, rect.y + rect.h));
  const dx = c.x - closestX;
  const dy = c.y - closestY;
  return (dx*dx + dy*dy) <= (c.r*c.r);
}

function getTheme(){
  const country = (typeof countrySelect !== "undefined" && countrySelect.value) ? countrySelect.value : "World";
  if (country.includes("India")) return { bg:"#fff3d6", deco:"🕌" };
  if (country.includes("Colorado")) return { bg:"#e7f5ff", deco:"🏔️" };
  if (country.includes("Hawaii")) return { bg:"#e9fff2", deco:"🌺" };
  if (country.includes("Costa Rica")) return { bg:"#f0ffef", deco:"🦥" };
  if (country.includes("Nigeria")) return { bg:"#eef8ff", deco:"🥁" };
  if (country.includes("France")) return { bg:"#fff0f6", deco:"🗼" };
  if (country.includes("Japan")) return { bg:"#f2f2ff", deco:"⛩️" };
  if (country.includes("Brazil")) return { bg:"#f3ffe7", deco:"🦜" };
  if (country.includes("Egypt")) return { bg:"#fff7e6", deco:"🏺" };
  return { bg:"#eef7ff", deco:"🌍" };
}

function drawObject(o){
  ctx.save();
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  ctx.fillRect(o.x, o.y, o.w, o.h);
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.lineWidth = 2;
  ctx.strokeRect(o.x, o.y, o.w, o.h);
  ctx.font = "30px Arial";
  ctx.fillText(o.emoji, o.x + 12, o.y + 38);
  ctx.font = "bold 12px Arial";
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.fillText(o.label, o.x + 10, o.y + o.h - 10);
  ctx.restore();
}

function draw(){
  const theme = getTheme();
  ctx.clearRect(0,0,gameCanvas.width, gameCanvas.height);
  ctx.fillStyle = theme.bg;
  ctx.fillRect(0,0,gameCanvas.width, gameCanvas.height);
  ctx.font = "28px Arial";
  ctx.fillText(theme.deco, 20, 40);
  ctx.fillText(theme.deco, 200, 320);
  ctx.fillText(theme.deco, 420, 60);
  ctx.fillStyle = "rgba(0,0,0,0.06)";
  ctx.fillRect(0, 160, 520, 40);
  drawObject(objects.souvenir);
  drawObject(objects.lounge);
  ctx.beginPath();
  ctx.fillStyle = "#2b6cff";
  ctx.arc(player.x, player.y, player.r, 0, Math.PI*2);
  ctx.fill();
  ctx.font = "bold 12px Arial";
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.fillText("YOU", player.x - 14, player.y - 20);
}

function update(){
  if (!walkMode) return;

  let dx = 0, dy = 0;
  if (keys["ArrowLeft"] || keys["a"]) dx -= 1;
  if (keys["ArrowRight"] || keys["d"]) dx += 1;
  if (keys["ArrowUp"] || keys["w"]) dy -= 1;
  if (keys["ArrowDown"] || keys["s"]) dy += 1;

  const len = Math.hypot(dx, dy) || 1;
  player.x += (dx/len) * player.speed;
  player.y += (dy/len) * player.speed;

  player.x = Math.max(player.r, Math.min(gameCanvas.width - player.r, player.x));
  player.y = Math.max(player.r, Math.min(gameCanvas.height - player.r, player.y));

  const p = (typeof getP === "function") ? getP() : null;

  if (rectHitCircle(objects.souvenir, player)) {
    walkHint.textContent = "🎁 You found the Souvenir Stand! (Walk away to stop triggering.)";
    if (!update._souvenirCooldown) {
      update._souvenirCooldown = true;
      setTimeout(()=> update._souvenirCooldown = false, 1000);

      if (p) {
        p.coins += 1;
        if (typeof updateTopStats === "function") updateTopStats();
      }
      if (typeof showSouvenirPopup === "function") showSouvenirPopup("🎁 Bonus coin from walking!");
    }
  } else if (rectHitCircle(objects.lounge, player)) {
    walkHint.textContent = "🛋️ Lounge Door! Go to the Lounge tab to play Snack Catcher.";
  } else {
    walkHint.textContent = "Tip: Walk into the 🎁 Souvenir Stand to earn a bonus coin!";
  }

  draw();
  requestAnimationFrame(update);
}

enterWalkBtn.addEventListener("click", () => {
  walkMode = true;
  gameCanvas.classList.remove("hidden");
  draw();
  requestAnimationFrame(update);
});

exitWalkBtn.addEventListener("click", () => {
  walkMode = false;
  gameCanvas.classList.add("hidden");
});

window.addEventListener("keydown", (e) => { keys[e.key] = true; });
window.addEventListener("keyup", (e) => { keys[e.key] = false; });
