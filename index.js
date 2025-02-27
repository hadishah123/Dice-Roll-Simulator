const buttonEl = document.getElementById("roll-button");
const diceEl = document.getElementById("dice");
const rollHistoryEl = document.getElementById("roll-history");
const clearHistoryButton = document.getElementById("clear-history-button");
const diceSound = document.getElementById("dice-sound");

let historyList = [];
let rollCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

function rollDice() {
  diceSound.play(); // Play sound on roll

  const rollResult = Math.floor(Math.random() * 6) + 1;
  updateStats(rollResult);
  const diceFace = getDiceFace(rollResult);
  
  diceEl.innerHTML = diceFace;
  historyList.push(rollResult);
  updateRollHistory();
}

function updateRollHistory() {
  rollHistoryEl.innerHTML = "";
  const MAX_HISTORY = 10;
  const historyToShow = historyList.slice(-MAX_HISTORY); // Get last 10 rolls
  
  for (let i = 0; i < historyToShow.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `Roll ${historyList.length - i}: <span>${getDiceFace(historyToShow[i])}</span>`;
    rollHistoryEl.appendChild(listItem);
  }
}

function updateStats(rollResult) {
  rollCounts[rollResult]++;
  document.getElementById("total-rolls").innerText = historyList.length;
  document.getElementById("ones-count").innerText = rollCounts[1];
  document.getElementById("twos-count").innerText = rollCounts[2];
  document.getElementById("threes-count").innerText = rollCounts[3];
  document.getElementById("fours-count").innerText = rollCounts[4];
  document.getElementById("fives-count").innerText = rollCounts[5];
  document.getElementById("sixes-count").innerText = rollCounts[6];
}

function getDiceFace(rollResult) {
  return `<img src="dice${rollResult}.png" alt="Dice face" />`; // Use images for dice faces
}

buttonEl.addEventListener("click", () => {
  diceEl.classList.add("roll-animation");
  setTimeout(() => {
    diceEl.classList.remove("roll-animation");
    rollDice();
  }, 1000);
});

clearHistoryButton.addEventListener("click", () => {
  historyList = [];
  updateRollHistory();
  rollCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }; // Reset stats
  updateStats(0); // Update stats to show reset values
});
