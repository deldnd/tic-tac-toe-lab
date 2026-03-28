const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

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
    return;
  }

  if (!board.includes("")) {
    statusText.textContent = "Ничья!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Ход игрока: ${currentPlayer}`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Ход игрока: ${currentPlayer}`;

  cells.forEach(cell => {
    cell.textContent = "";
  });
}

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);
