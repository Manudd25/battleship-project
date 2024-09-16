import promptSync from "prompt-sync"; 
const prompt = promptSync();

// BATTLESHIP GAME 

const battleshipGame = {
    gridSize: 10, // Size of the board (10x10)


    // Ships
    ships: [
        {name: 'Carrier', size: 5},
        {name: 'Battleship', size: 4},
        {name: 'Cruiser', size: 3},
        {name: 'Submarine', size: 3},
        {name: 'Destroyer', size: 2}
    ],


// Creating a blank board (10x10 grid)
    initBoard() {
        const board = Array.from({length: this.gridSize}, () => 
            Array.from({length: this.gridSize},() => ({hasShip: false, hit: false})) // creating empty cells
        );
        return board;
    },

// Printing the game board to the console
    printBoard(board) {
        console.log('  ' + Array.from({length: this.gridSize}, (_, i) => i + 1).join(' '));
        board.forEach((row, i) => {
            //Converting row index to letter (A-J)
            const rowLabel = String.fromCharCode(65 + i) // This method converts Unicode into characters (65 = A, 66 = B, 67 = C, etc.)
            const rowDisplay = row.map(cell => cell.hit ? (cell.hasShip ? 'X' : 'O') : '~').join(' ');
            console.log(rowLabel + ' ' + rowDisplay);
        });
    },
    
    //Taking a shot 
    takeShot(board, coordinates) {
        const row = coordinates[0].charCodeAt(0) - 65; // Convert letter (A-J) to row index
        const col = parseInt(coordinates.slice(1)) -1; // Convert number to column index

        if(row < 0 || row >= this.gridSize || col < 0 || col >= this.gridSize) {
            console.log('Invalid coordinates. Try again.');
            return false;
        }

        const cell = board[row][col];
        if (cell.hit) {
            console.log('You already shot here!');
            return false;
        }


        cell.hit = true; // Mark the cell as hit
        if(cell.hasShip) {
            console.log('You hit a ship!')
            return true; // Successful hit
        } else {
            console.log('Miss!')
            return false;
        }
    },

    checkAllShipsSunk(board) {
        return board.every(row => row.every(cell => !cell.hasShip || (cell.hasShip && cell.hit)));
    },

    // Placing ships 
    placeShipsRandomly(board) {
        for (const ship of this.ships) {
            let placed = false;
            while (!placed) {
                // Randomly decide the orientation. The condition < 0.5 is used to split the range of possible values into two equal halves: one for horizontal and one for vertical.
                const isHorizontal = Math.random() < 0.5; 
                const startRow = Math.floor(Math.random() * this.gridSize);
                const startCol = Math.floor(Math.random() * this.gridSize);
    
                // Check if the ship fits in the chosen orientation
                if (this.canPlaceShip(board, startRow, startCol, ship.size, isHorizontal)) {
                    this.placeShip(board, startRow, startCol, ship.size, isHorizontal); // Place the ship
                    placed = true;
                }
            }
        }
    },
    
    // Helper function to check if a ship can be placed
    canPlaceShip(board, row, col, size, isHorizontal) { 
        for (let i = 0; i < size; i++) { // iterating over the length of the ship size 
            const r = isHorizontal ? row : row + i; // if the ship is horizontal, the row remains the same but the column changes, meaning the ship is placed across columns (left to right).
            const c = isHorizontal ? col + i : col; // if the ship is vertical, the row changes, but the column remains the same, meaning the ship is placed down rows (top to bottom).
    
            if (r >= this.gridSize || c >= this.gridSize || board[r][c].hasShip) { // check if the current ship placement is invalid
                return false; // Out of bounds or overlap detected
            }
        }
        return true; // Ship can be placed
    },
    
    // Helper function to place the ship on the board
    placeShip(board, row, col, size, isHorizontal) {
        for (let i = 0; i < size; i++) {
            const r = isHorizontal ? row : row + i; // moving the ship downward across rows 
            const c = isHorizontal ? col + i : col; // moving the ship to the right across columns
            board[r][c].hasShip = true; // Mark the cells where the ship is placed
        }
    },

    // STARTING THE GAME
       

    startGame() {
        let playing = true; 

        while (playing) {
        const playerBoard = this.initBoard();
        const enemyBoard = this.initBoard();
        this.placeShipsRandomly(enemyBoard); // Placing enemy ships

        console.log('Welcome to Battleship!');

        while(true) {
            this.printBoard(enemyBoard); // Shows the board to the player

            let input = prompt('Enter coordinates (e.g., A4):').toUpperCase(); // Gets the player input
        


            //Input validation: makes sure input is at least 2 characters long and the number is valid
            while(
                input.length < 2 || 
                (input !== 'QUIT' && (input[0] < 'A' || input[0] > 'J' || // checking if the letter is between A and J
                isNaN(input.slice(1)) || // checking if the second part is a number
                parseInt(input.slice(1)) < 1 || parseInt(input.slice(1)) > 10)) // ensures the number is btw 1-10 
                ) {
                console.log('Invalid input. Please enter a letter (A-J) followed by a number (1-10)')
                input = prompt('Enter coordinates (e.g., A4 or type QUIT to exit):').toUpperCase();
            } 

            if(input.toUpperCase() === 'QUIT') {
                console.log('Game over! Thank you for playing Battleship!');
                playing = false;
                break;
            }



            // Take a shot and handle result
            const shotResult = this.takeShot(enemyBoard, input);



            // Checking if all ships are sunk
            if(this.checkAllShipsSunk(enemyBoard)) {
                console.log('You sank all the enemy ships! You win!');

                let playAgain;
                do {
                    playAgain = prompt('Another round? (yes/no): ').toLowerCase()
                    if (playAgain !== 'yes' && playAgain !== 'no') {
                        console.log('Invalid input. Please answer "yes" or "no".');
                    }
                } while (playAgain !== 'yes' && playAgain !== 'no')
                

                if (playAgain !== 'yes') {
                    console.log('Thank you for playing Battleship!')
                    playing = false;
            } 
            break;
        }
      }
    }
  }
};

battleshipGame.startGame();


/*    
        'Carrier', size: 5
        'Battleship', size: 4
        'Cruiser', size: 3
        'Submarine', size: 3
        'Destroyer', size: 2
*/
