import promptSync from "prompt-sync"; 
const prompt = promptSync();

// BATTLESHIP GAME 

const battleshipGame = {
    playerBoard: [],
    enemyBoard: [],
    shipSizes: [5, 4, 3, 3, 2], // creating ships (Carrier, Submarine, Destroyer, Patrol Boat)
    gridSize: 10, 
    rows: "ABCDEFGHIJ".split(''),
    columns: 10,


// Creating a blank board (10x10 grid)
    initBoard(board) {
    for(let i = 0; i < this.gridSize; i++) {
        board[i] = []; // row of the grid
        for(let j = 0; j < this.gridSize; j++) {
            board[i][j] = {hasShip: false, hit: false}; // empty cell 
        }
    }
},

// Printing the board with labels (A-J, 1-10)    
    printBoard(board) {
        let header = '  '; // Padding before column numbers
        for (let i = 1; i <= this.columns; i++) {
            header += i + '  ';
        }
        console.log(header)


// Printing rows with row labels (A-J)

    },


}



