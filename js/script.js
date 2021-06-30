// gameBoard module
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

    const gridClick = () => {
        let grids = document.querySelectorAll(".grid-item");
        let gridsArr =  Array.from(grids);
        gridsArr.forEach(element =>
            element.addEventListener("click", ()=>{
                //invoke game logic
                if (validCheck(element)){
                    return;
                };
                nextMove(element);
                winCheck(element);
            })
        );
    };
    
    const validCheck = (grid) => {
        if (grid.textContent!=""){
            return true;
        }
    };

    const winCheck = (grid) => {
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

        for (let i = 0; i <= 7; i++) {
            const winCondition = winningCondition[i];
            let a = grid.getAttribute(winCondition[0]);
            let b = gridsArr[winCondition[1]];
            let c = gridsArr[winCondition[2]];
            console.log(a);
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                console.log("win");
                break
            }
        }
    };

    const nextMove = (grid) => {
        if (toggleMarker){
            grid.textContent = "X";
        }
        else {
            grid.textContent = "O";
        }
        toggleMarker=!toggleMarker;
    };
    
    return {
        createBoard,
        gridClick
    };
})(); // module has IIFE and can be imported/exported, factory does not and just create

// player factory
const playerFactory = (name) => {

    return {
        name
    };
};


//initialization
gameBoard.createBoard();
gameBoard.gridClick();
