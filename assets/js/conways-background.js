console.log('Conways Game of Life Background');
console.log('Coded by Karl Miller and Davis Moore');

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
                timeInterval = 300,
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
        this.addDocumentListeners();
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
    resizeBoard() {
        let bb = document.body.getBoundingClientRect();
        this.canvasWidth=bb.width;
        this.canvasHeight=bb.height; 
        ConwaysCanvas.width = this.canvasWidth;
        ConwaysCanvas.height = this.canvasHeight;
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
    clickBoard(ev) {
        if(ev.buttons == 1 || ev.type == "mousedown") {
            let canvas_bounds = ConwaysCanvas.getBoundingClientRect();
            let canvas_x = ev.clientX - canvas_bounds.x;
            let canvas_y = ev.clientY - canvas_bounds.y;
            let square_x = Math.floor(canvas_x / cb.squareSize);
            let square_y = Math.floor(canvas_y / cb.squareSize);
            if(square_x < cb.boardWidth) { 
                let column = cb.gameBoard[square_x];
                if(square_y < cb.boardHeight) {
                    let cell = column[square_y];
                    // newvalue = (cell == 1) ? 0 : 1;
                    column[square_y] = 1;
                    cb.drawSquare(square_x, square_y);
                }
            }
        }

    }
    toggle() {
        if(!cb.running) {
            cb.running = true;
            sessionStorage.setItem('conways-bg', 'true');
            cb.run();
        } else {
            cb.running = false;
            sessionStorage.setItem('conways-bg', 'false')
            cb.board = cb.getNewEmptyBoard();
            cb.renderBoard();
        }
    }
    async run() {
        while(this.running) {
            this.stepBoard();
            this.renderBoard();
            await this.sleep(this.timeInterval);
        }
    }
    addDocumentListeners() {
        window.addEventListener('resize', this.resizeBoard);
        document.addEventListener('mousedown', this.clickBoard);
        document.addEventListener('mousemove', this.clickBoard);
        let imageElements = document.getElementsByTagName('img');
        for(let i = 0; i < imageElements.length; i++) {
            let img = imageElements[i];
            img.addEventListener('click', this.toggle);
        }
    }
}


let cb = new ConwaysBackground();
cb.randomizeBoard();
if(sessionStorage.getItem('conways-bg') == "true") {
    cb.running = true;
    cb.run();
}