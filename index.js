// Mai Vue Xiong
// Tic-Tac-Toe Game

const cells = document.querySelectorAll(".cell");
const gameStatusTxt = document.querySelector("#gameStatusTxt");
const restartBtn = document.querySelector("#restartBtn");
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isRunning = false;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]

startGame();

function startGame(){

    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    gameStatusTxt.textContent = `${currentPlayer}'s Turn!`;
    isRunning = true;
}
function cellClicked(){

    const cellIndex = this.getAttribute("cellIndex");
    
    if(gameBoard[cellIndex] != "" || !isRunning){
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;
    
    if(currentPlayer === "X"){
        cells[cellIndex].classList.add('colorX');
    }
    else{
        cells[cellIndex].classList.add('colorO');
    }

    checkWinner();
}
function checkWinner(){

    let winner = false;

    for(let i = 0; i < winningCombos.length; i++){          //Iterates through winning combos to find match 
        
        const combos = winningCombos[i];
        const cellA = gameBoard[combos[0]];
        const cellB = gameBoard[combos[1]];
        const cellC = gameBoard[combos[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            winner = true;
            break;
        }
    }

    if(winner){
        gameStatusTxt.textContent = `${currentPlayer} WINS!`;
        gameStatusTxt.classList.add('winColor');
        isRunning = false;
    }
    else if(!gameBoard.includes("")){
        gameStatusTxt.textContent = `DRAW!`;
        gameStatusTxt.classList.add('drawColor');
        isRunning = false;
    }
    else{
        changePlayer();
    }
}
function changePlayer(){
    currentPlayer = (currentPlayer === "X") ? "O" : "X";       // switches current player to new player
    gameStatusTxt.textContent = `${currentPlayer}'s Turn!`;
}
function restartGame(){

    gameBoard = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = "X";
    gameStatusTxt.textContent = `${currentPlayer}'s Turn!`;
    gameStatusTxt.classList.remove('winColor');
    gameStatusTxt.classList.remove('drawColor');
    
    for(let i = 0; i < cells.length; i++){                  // Iterate through all cells and remove classList colors
        cells[i].classList.remove('colorX');
        cells[i].classList.remove('colorO');
    }
    isRunning = true;
}
