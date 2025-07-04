const players = [];
let currentPlayerIndex = 0;
let selectedType = ""; // "truth" or "dare"

const truths = [
  "Who’s your secret crush?",
  "What’s something embarrassing you’ve done?",
  "What’s your weirdest habit?",
];

const dares = [
  "Do 10 squats right now!",
  "Text your crush ‘hey 😏’",
  "Speak in robot voice for 2 minutes",
];

// DOM elements
const setupScreen = document.getElementById("setup-screen");
const gameScreen = document.getElementById("game-screen");
const playerList = document.getElementById("player-list");
const nameInput = document.getElementById("player-name");

document.getElementById("add-player").onclick = () => {
  const name = nameInput.value.trim();
  if (name) {
    players.push(name);
    const li = document.createElement("li");
    li.textContent = name;
    playerList.appendChild(li);
    nameInput.value = "";
  }
};

document.getElementById("start-game").onclick = () => {
  if (players.length < 2) {
    alert("Add at least 2 players!");
    return;
  }
  setupScreen.style.display = "none";
  gameScreen.style.display = "block";
  showTurn();
};

function showTurn() {
  const player = players[currentPlayerIndex];
  document.getElementById("turn-header").textContent = `🎯 It's ${player}'s turn!`;
  document.getElementById("choice-screen").style.display = "block";
  document.getElementById("spinner-screen").style.display = "none";
  document.getElementById("result-screen").style.display = "none";
}

document.getElementById("truth-btn").onclick = () => {
  selectedType = "truth";
  showSpinner();
};

document.getElementById("dare-btn").onclick = () => {
  selectedType = "dare";
  showSpinner();
};

function showSpinner() {
  document.getElementById("choice-screen").style.display = "none";
  document.getElementById("spinner-screen").style.display = "block";
}

document.getElementById("spin-btn").onclick = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.animation = "spin 2s ease-out";

  // Disable the button to avoid spam
  document.getElementById("spin-btn").disabled = true;

  setTimeout(() => {
    spinner.style.animation = "none";
    const challenge = getRandomChallenge(selectedType);
    document.getElementById("result-text").textContent = challenge;
    document.getElementById("spinner-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("spin-btn").disabled = false;
  }, 2000);
};

function getRandomChallenge(type) {
  const list = type === "truth" ? truths : dares;
  return list[Math.floor(Math.random() * list.length)];
}

document.getElementById("next-player").onclick = () => {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  showTurn();
};


