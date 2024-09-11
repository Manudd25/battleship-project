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
            console.log('Hit!');
            return true; // Successful hit
        } else {
            console.log('Miss!');
            return false;
        }
    },

    checkAllShipsSunk(board) {
        return board.every(row => row.every(cell => !cell.hasShip || (cell.hasShip && cell.hit)));
    },


    placeShipsRandomly(board) {
        for (const ship of this.ships) {
            let placed = false;
            while (!placed) {
                const isHorizontal = Math.random() < 0.5; // Randomly decide the orientation
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
        for (let i = 0; i < size; i++) {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;
    
            if (r >= this.gridSize || c >= this.gridSize || board[r][c].hasShip) {
                return false; // Out of bounds or overlap detected
            }
        }
        return true; // Ship can be placed
    },
    
    // Helper function to place the ship on the board
    placeShip(board, row, col, size, isHorizontal) {
        for (let i = 0; i < size; i++) {
            const r = isHorizontal ? row : row + i;
            const c = isHorizontal ? col + i : col;
            board[r][c].hasShip = true; // Mark the cells where the ship is placed
        }
    },


    // STARTING THE GAME

    startGame() {
        const playerBoard = this.initBoard();
        const enemyBoard = this.initBoard();


        this.placeShipsRandomly(enemyBoard); // Place enemy ships

        console.log('Welcome to Battleship!');
        while(true) {
            this.printBoard(enemyBoard); // Show the board to the player

            const input = prompt('Enter coordinates (e.g., A4):').toUpperCase(); // Get the player input


            if(input === 'QUIT') {
                console.log('Game over');
                break;
            }

            // Take a shot and handle result
            if(this.takeShot(enemyBoard, input)) {
                console.log('You hit a ship!');
            } else {
              console.log('You missed!');
            }

            // Checking if all ships are sunk
            if(this.checkAllShipsSunk(enemyBoard)) {
                console.log('You sank all the enemy ships! You win!');
                break;
            }
        }
    }
    };

    battleshipGame.startGame();




