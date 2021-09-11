

const ConwaysCanvas = document.getElementById("conways-background");
ConwaysCanvas.style.zIndex = -1;
ConwaysCanvas.style.position = 'fixed';


let bb = document.body.getBoundingClientRect();

class ConwaysBackground {

    constructor(squareSize=20, 
                backgroundColor="rgb(253, 253, 253)", 
                squareColor="#D9D9D9", 
                canvasWidth=bb.width, 
                canvasHeight=bb.height, 
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
        this.ctx = ConwaysCanvas.getContext('2d');

        ConwaysCanvas.width = this.canvasWidth;
        ConwaysCanvas.height = this.canvasHeight;

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
        for(let x = 0; x < this.gameBoard.length; x++) {
            let column = this.gameBoard[x];
            for(let y = 0; y < column.length; y++) {
                this.drawSquare(x,y);
            }
        }
    }
    drawSquare(x,y) {
        let val = this.gameBoard[x][y];
        let start_x = x * this.squareSize;
        let start_y = y * this.squareSize;
        if(val == 0) {
            this.ctx.fillStyle = this.backgroundColor;
        }
        else {
            this.ctx.fillStyle = this.squareColor;
        }
        this.ctx.fillRect(start_x, start_y, this.squareSize, this.squareSize);

    }
    countNeighbors(x,y) {
        var counter = 0;
           
        for(let row=-1;row <= 1;row++){
            for(let col = -1;col <= 1;col++){
                if(!(row==0&&col==0)){              
                  if (x+row>=0  && y + col>=0 && x+row < this.boardWidth && y + col < this.boardHeight ){
                     counter += this.gameBoard[x+row][y+col];
                    }  
                }                           
            }
        }        
        return counter;
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    stepBoard() {
        let new_board = this.getNewEmptyBoard();
        for(let x = 0; x < this.boardWidth; x++) {
            for(let y = 0; y < this.boardHeight; y++) {
                let square_was_alive = (this.gameBoard[x][y] == 1);
                let neighbors = this.countNeighbors(x,y);
                if(square_was_alive) {
                    if(neighbors >= this.survivesLower && neighbors <= this.survivesHigher) {
                        new_board[x][y] = 1;
                    }
                    else {
                        new_board[x][y] = 0;
                    }
                }
                else {
                    if(neighbors == this.becomesAlive) {
                        new_board[x][y] = 1;
                    }
                }
            }
        }
        this.gameBoard = new_board;
    }
    async run() {
        while(this.running) {
            this.stepBoard();
            this.renderBoard();
            await this.sleep(this.timeInterval);
        }
    }
}


let cb = new ConwaysBackground();
cb.randomizeBoard();
cb.running = true;
cb.run();