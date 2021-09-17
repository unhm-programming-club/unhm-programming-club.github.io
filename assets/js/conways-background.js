class ConwaysBackground {

    constructor(canvas, squareSize=20, 
                backgroundColor="rgb(253, 253, 253)", 
                squareColor="#DDDDDD", 
                canvasWidth=500, 
                canvasHeight=500, 
                timeInterval = 300,
                survivesLower = 2,
                survivesHigher = 3,
                becomesAlive = 3,
                gameBoard = undefined) {
        console.log('Conways Game of Life Background');
        console.log('Coded by Karl Miller and Davis Moore');

        this.canvas = canvas;

        let bb = document.body.getBoundingClientRect();

        canvas.width = bb.width;
        canvas.height = bb.height;
        canvas.style.zIndex = -1; 
        canvas.style.position = 'fixed';

        this.squareSize = squareSize;
        this.backgroundColor = backgroundColor;
        this.squareColor = squareColor;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.timeInterval = timeInterval;
        this.survivesLower = survivesLower;
        this.survivesHigher = survivesHigher;
        this.becomesAlive = becomesAlive;
        this.ctx = canvas.getContext('2d');


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
    clickBoard() {
        let that = this;
        return function(ev) {
            if(ev.buttons == 1 || ev.type == "mousedown") {
                let canvas_bounds = that.canvas.getBoundingClientRect();
                let canvas_x = ev.clientX - canvas_bounds.x;
                let canvas_y = ev.clientY - canvas_bounds.y;
                let square_x = Math.floor(canvas_x / that.squareSize);
                let square_y = Math.floor(canvas_y / that.squareSize);
                if(square_x < that.boardWidth) { 
                    let column = that.gameBoard[square_x];
                    if(square_y < that.boardHeight) {
                        let cell = column[square_y];
                        // newvalue = (cell == 1) ? 0 : 1;
                        column[square_y] = 1;
                        that.drawSquare(square_x, square_y);
                    }
                }
            }
        }

    }
    // toggle() {
    //     if(!cb.running) {
    //         cb.running = true;
    //         cb.resizeBoard();
    //         sessionStorage.setItem('conways-bg', 'true');
    //         cb.run();
    //     } else {
    //         cb.running = false;
    //         sessionStorage.setItem('conways-bg', 'false')
    //         cb.board = cb.getNewEmptyBoard();
    //         cb.renderBoard();
    //     }
    // }
    async run() {
        while(this.running) {
            this.stepBoard();
            this.renderBoard();
            await this.sleep(this.timeInterval);
        }
    }
    addDocumentListeners() {
        window.addEventListener('resize', this.resizeBoard);
        document.addEventListener('mousedown', this.clickBoard());
        document.addEventListener('mousemove', this.clickBoard());
        let imageElements = document.getElementsByTagName('img');
        for(let i = 0; i < imageElements.length; i++) {
            let img = imageElements[i];
            img.addEventListener('click', this.toggle);
        }
    }
}


/**
 * The following ties Conways to the PopoutMenu (in settings-menu.js)
 */

var conwaysCanvas = null; 
var conwaysProgram = null;

function createConwaysBg() {
    if(conwaysCanvas || conwaysProgram) destroyConwaysBg();
    conwaysCanvas = document.createElement('canvas');
    document.body.appendChild(conwaysCanvas)
    conwaysProgram = new ConwaysBackground(conwaysCanvas);
    conwaysProgram.randomizeBoard();
    conwaysProgram.running = true;
    conwaysProgram.run();
}
function destroyConwaysBg() {
    if(conwaysProgram) conwaysProgram.running = false;
    if(conwaysCanvas) conwaysCanvas.remove();    
}

function toggleConwaysBackground(trueFalse) {
    if(trueFalse == "true") {
        createConwaysBg();
    } else {
        destroyConwaysBg();
    }
}

popoutMenu.createMenuTopicSection('conways-bg', 'radio', ['true','false'], toggleConwaysBackground);