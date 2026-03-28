const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");
const player1SymbolSelect = document.getElementById("player1Symbol");
const player2SymbolSelect = document.getElementById("player2Symbol");
const score1Text = document.getElementById("score1");
const score2Text = document.getElementById("score2");

let board = ["", "", "", "", "", "", "", "", ""];
let player1Symbol = player1SymbolSelect.value;
let player2Symbol = player2SymbolSelect.value;
let currentPlayer = player1Symbol;
let gameActive = true;
let score1 = 0;
let score2 = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function updateStatus() {
  statusText.textContent = `Ход игрока: ${currentPlayer}`;
}

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] !== "" || !gameActive) {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  let roundWon = false;

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusText.textContent = `Победил игрок: ${currentPlayer}`;
    gameActive = false;

    if (currentPlayer === player1Symbol) {
      score1++;
      score1Text.textContent = score1;
    } else {
      score2++;
      score2Text.textContent = score2;
    }

    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "Ничья!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === player1Symbol ? player2Symbol : player1Symbol;
  updateStatus();
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  player1Symbol = player1SymbolSelect.value;
  player2Symbol = player2SymbolSelect.value;

  if (player1Symbol === player2Symbol) {
    alert("Символы игроков не должны совпадать!");
    player1Symbol = "X";
    player2Symbol = "O";
    player1SymbolSelect.value = "X";
    player2SymbolSelect.value = "O";
  }

  currentPlayer = player1Symbol;
  gameActive = true;
  updateStatus();

  cells.forEach(cell => {
    cell.textContent = "";
  });
}

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);

player1SymbolSelect.addEventListener("change", restartGame);
player2SymbolSelect.addEventListener("change", restartGame);

restartGame();