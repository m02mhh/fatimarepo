const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle a player's move
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // If the cell is already filled or the game is not active, do nothing
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Update the game board and display the player's mark
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Add class for styling (X or O)

    checkGameResult();
}

// Function to check for a win or a draw
function checkGameResult() {
    let roundWon = false;

    // Check for winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue; // Skip if any cell in the condition is empty
        }
        if (a === b && b === c) {
            roundWon = true;
            break; // A win condition has been met
        }
    }

    if (roundWon) {
        gameStatus.innerHTML = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    // Check for a draw (if no empty cells and no winner)
    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        gameStatus.innerHTML = `It's a Draw!`;
        gameActive = false;
        return;
    }

    // If no win or draw, switch to the next player
    changePlayer();
}

// Function to switch player turns
function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerHTML = `Player ${currentPlayer}'s Turn`;
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.innerHTML = `Player ${currentPlayer}'s Turn`;

    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('X', 'O'); // Remove X and O classes for styling
    });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initial status display
gameStatus.innerHTML = `Player ${currentPlayer}'s Turn`;