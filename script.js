const players = [];
let currentPlayerIndex = 0;
let selectedType = ""; // "truth" or "dare"

const truths = [
  "What’s the most embarrassing thing you’ve ever done?",

  "Who was your first crush?",

  "Have you ever lied to get out of trouble? What was the lie?",

  "What’s something you’re glad your parents don’t know about you?",

  "What’s your weirdest habit?",

  "If you could date any fictional character, who would it be?",

  "Have you ever stalked someone online?",

  "What's the most childish thing you still do?",

  "What's the worst gift you’ve ever received?",

  "Who in this group would you most want to switch lives with for a day?",
];

const dares = [
  "Speak in a fake accent until your next turn.",

  "Text someone ‘I know what you did 😏’ and don’t explain.",

  "Try to lick your elbow.",

  "Do your best impression of a baby learning to walk.",

  "Say the alphabet backward while hopping on one foot.",

  "Let someone in the group write something on your forehead with a marker.",

  "Eat a spoonful of mustard, ketchup, or something random from the kitchen.",

  "Show your last five search terms or the last five photos in your gallery.",

  "Let someone else control your phone for one minute.",

  "Do a dramatic reenactment of a breakup scene.",
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


