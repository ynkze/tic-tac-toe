let gameActive = true;

// gameBoard module
let message = document.querySelector("#playerTurn");

const gameBoard = (function(){

    let toggleMarker = true;
    const container = document.querySelector("#grid-container");
    
    // create 3x3 grid with data-index
    const createBoard = () => {
        for (let i=0;i<9;i++){
            let col = document.createElement("div");
            col.classList.add("grid-item");
            col.setAttribute("data-index", `${i}`);
            col.textContent = "";
            container.appendChild(col);
            container.style.gridTemplateColumns = `repeat(${3}, 1fr)`;
            container.style.gridTemplateRows = `repeat(${3}, 1fr)`;
        };
    } 

    const gridClick = (gameActive) => {
        let gridsArr =  Array.from(document.querySelectorAll(".grid-item"));
        gridsArr.forEach(element =>
            element.addEventListener("click", ()=>{
                /* invoke game logic: 
                1. check whether already clicked
                2. switch to next player
                3. check if win/tie */
                if (gameActive){
                    if (element.textContent!=""){
                        return;
                    };
                    nextMove(element);
                    winCheck();
                }
            })
        )
    }

    const winCheck = () => {
        const winningCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        let gridsArr =  Array.from(document.querySelectorAll(".grid-item"));
        // check for win condition
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningCondition[i];
            let a = gridsArr[winCondition[0]].textContent;
            let b = gridsArr[winCondition[1]].textContent;
            let c = gridsArr[winCondition[2]].textContent;

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                message.textContent = (a=="X")? "Player X wins!": "Player O wins!";
                gameActive = false;
                break;
            }
        }

        //tie when all filled
        if (gridsArr.every((element)=> element.textContent!="")){
            message.textContent = "It's a tie!";
            gameActive = false;
        };
    };

    const nextMove = (grid) => {
        if (toggleMarker){
            grid.textContent = "X";
            message.textContent = playerO.turnMessage;
        }
        else {
            grid.textContent = "O";
            message.textContent = playerX.turnMessage;
        }
        toggleMarker=!toggleMarker;
    };
    
    return {
        createBoard,
        gridClick,
    };
})(); // module has IIFE and can be imported/exported, factory does not and just create

// player factory
const playerFactory = (name) => {
    const turnMessage = name + " turn";
    const winMessage = name + " wins!";
    return {
        name,
        turnMessage,
        winMessage
    };
};

// create 2 player (can change to custom name if want to)
const playerX = playerFactory('Player X');
const playerO = playerFactory('Player O');

// initialization
gameBoard.createBoard();
gameBoard.gridClick(gameActive);

// restart button clear board and message, enable clicking again
let restart = document.querySelector("#restart");
restart.addEventListener("click", () => {
    let gridsArr =  Array.from(document.querySelectorAll(".grid-item"));
    gridsArr.forEach((element)=> element.textContent="");
    gameBoard.gridClick(gameActive);
    message.textContent = "Start game!";
})
