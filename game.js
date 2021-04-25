'Use Strict'
const Gameboard = require('./gameboard');
const Player = require('./player');


class Game{
    constructor(){
        this.playerOne = new Player();
        this.playerTwo = new Player();
    }

    runGame(){
        this.displayRules();
        let playerOneGrid = this.playerOne.runSetup();
        console.log("Finished displaying the first player one grid.");
        console.log("playerOneGrid =" +  playerOneGrid);
        console.log("playerOneGrid length =" + playerOneGrid.length);
        this.playerOne.playerBoard.displayGrid(playerOneGrid);
        let playerTwoGrid = this.playerTwo.runSetup();
        this.playerTwo.playerBoard.displayGrid(playerTwoGrid);
    }

    displayRules(){
        console.log("Welcome to Battleship!");
        console.log("Where you place your ships on the 20 x 20 grid and hope to guess where your opponent placed their ships first.");
        console.log("First one to sink all their opponents ships wins.");
    }
}
module.exports = Game;