const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell'); 
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

// Game variables
let currentPlayer = 'X'; 
let boardState = ['', '', '', '', '', '', '', '', '']; 
let gameActive = true; 

// winning combinations
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

// Functions 


function handleCellClick(event) {
    const clickedCell = event.target; 
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index')); 

   
    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return; 
    }

   
    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); 

    
    if (checkResult()) {
        return; 
    }

    
    switchPlayer();
}

// Function to switch the current player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Toggle between 'X' and 'O'
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`; // Update the status message
}

// Function to check if there's a winner or a draw
function checkResult() {
    let roundWon = false;
    // Iterate through all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i]; // e.g., [0, 1, 2]
        let a = boardState[winCondition[0]];
        let b = boardState[winCondition[1]];
        let c = boardState[winCondition[2]];

        // If any cell in the condition is empty, this condition isn't met
        if (a === '' || b === '' || c === '') {
            continue; // Go to the next winning condition
        }
        // If all three cells in the condition match
        if (a === b && b === c) {
            roundWon = true; // We have a winner!
            break; // No need to check further
        }
    }

    // If a winner was found
    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false; // Stop the game
        return true; // Indicate that the game ended
    }

    // Check for a draw (if no winner and all cells are filled)
    if (!boardState.includes('')) {
        statusDisplay.textContent = `Game is a Draw!`;
        gameActive = false; // Stop the game
        return true; // Indicate that the game ended
    }

    // If no win and no draw, the game continues
    return false;
}

// Function to reset the game state
function resetGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`; // Reset status

    // Clear the display of all cells
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x'); // Remove styling classes
        cell.classList.remove('o');
    });
}

// --- Event Listeners ---

// Add a click listener to each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Add a click listener to the reset button
resetButton.addEventListener('click', resetGame);

// Initialize the status display on page load
statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;