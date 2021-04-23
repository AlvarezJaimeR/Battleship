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
        let playerOneGrid = this.playerOne.userInitialTurn();

        //able to pick a coordinate and change the value
/*         playerOneGrid[10][6] = "  X  ";
        this.playerOne.playerBoard.displayGrid(playerOneGrid); */
    }

    displayRules(){
        console.log("Welcome to Battleship!");
        console.log("Where you place your ships on the 20 x 20 grid and hope to guess where your opponent placed their ships first.");
        console.log("First one to sink all their opponents ships wins.");
    }
}
module.exports = Game;