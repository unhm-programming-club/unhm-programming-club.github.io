

const ConwaysCanvas = document.getElementById("conways-background");


let bb = document.body.getBoundingClientRect();

class ConwaysBackground {

    constructor(squareSize=20, 
                backgroundColor="pink", 
                squareColor="indigo", 
                canvasWidth=500, 
                canvasHeight=500, 
                timeInterval = 500,
                survivesLower = 2,
                survivesHigher = 3,
                becomesAlive = 3,
                gameBoard = undefined) {
        this.squareSize = squareSize;
        this.backgroundColor = backgroundColor;
        this.squareColor = squareColor;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.timeInterval = timeInterval;
        this.survivesLower = survivesLower;
        this.survivesHigher = survivesHigher;
        this.becomesAlive = becomesAlive;

        let bb = document.body.getBoundingClientRect();

        // not yet implemented - if board state is somehow saved between pages, this will allow keeping old board state 
        if(Array.isArray(gameBoard) && Array.isArray(gameBoard[0])) {
            this.gameBoard = gameBoard;
            this.boardWidth = gameBoard.length;
            this.boardHeight = gameBoard[0].length;
        } else {
            this.boardWidth = Math.floor(this.canvasWidth / this.squareSize);
            this.boardHeight = Math.floor(this.canvasHeight / this.squareSize);
            this.gameBoard = this.getNewEmptyBoard();
        }
    }
    getNewEmptyBoard() {
        let new_board = []
        for(let i = 0; i < this.boardWidth; i++) {
            let column = []
            for(let j = 0; j < this.boardHeight; j++) {
                column.push(0)
            }
            new_board.push(column)
        }
        return new_board;
    }
    randomizeBoard() {
        for(let x = 0; x < this.gameBoard.length; x++) {
            let column = this.gameBoard[x];
            for(let y = 0; y < column.length; y++) {
                column[y] = Math.round(Math.random())
            }
        }
    }
    renderBoard() {
        for(let x = 0; x < gameBoard.length; x++) {
            let column = gameBoard[x];
            for(let y = 0; y < column.length; y++) {
                drawSquare(x,y);
            }
        }
    }
}