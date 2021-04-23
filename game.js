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
        this.initialSetupPlayerOne();
    }

    initialSetupPlayerOne(){
        //first setup
        this.playerOne.name = this.playerOne.userName();
        console.log(this.playerOne.name + " -- Please decide where to place your destroyer, size 2, (ex. column G row 10).");
        let playerOneGrid = this.playerOne.userInitialTurn();
        let playerOneColumn = this.playerOne.setShipColumn();
        let playerOneRow = this.playerOne.setShipRow();
        console.log("You picked " + playerOneColumn.toUpperCase() + playerOneRow);
        playerOneColumn = playerOneColumn.charCodeAt(playerOneColumn);
        console.log(playerOneColumn-96);
        console.log(playerOneRow+1);
        playerOneGrid[playerOneColumn-96][playerOneRow] = "  X  ";
        this.playerOne.playerBoard.displayGrid(playerOneGrid);
    }

    displayRules(){
        console.log("Welcome to Battleship!");
        console.log("Where you place your ships on the 20 x 20 grid and hope to guess where your opponent placed their ships first.");
        console.log("First one to sink all their opponents ships wins.");
    }
}
module.exports = Game;