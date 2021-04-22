'Use Strict'
const Gameboard = require('./gameboard');
const Player = require('./player');


class Game{
    constructor(){
        this.playerOne;
        this.playerTwo;
    }

    runGame(){
        this.displayRules();
        this.playerOne = new Player();
        this.playerOne.name = this.playerOne.userName();
        let playerOneEmptyGrid = this.playerOne.userInitialTurn();
        //let test = this.playerOne.playerBoard.displayGrid(playerOneGrid);

/*     let test = this.gameboardOne.startGrid();
    this.displayGrid(test);
    test[1][3] = "  X  ";
    this.displayGrid(test); */
    }

    displayRules(){
        console.log("Welcome to Battleship!");
        console.log("Where you place your ships on the 20 x 20 grid and hope to guess where your opponent placed their ships first.");
        console.log("First one to sink all their opponents ships wins.");
    }
}
module.exports = Game;