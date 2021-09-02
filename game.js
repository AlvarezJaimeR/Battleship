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
        this.playerOne.runSetup();
        console.log("Finished displaying the first player grid.");
        this.playerOne.playerBoard.displayGrid(this.playerOne.playerGrid);
        console.log(this.playerOne);
        console.log("Enemy Grid");
        this.playerTwo.runSetup();
        console.log("Finished displaying the second player grid.");
        this.playerOne.enemyBoard.displayGrid(this.playerOne.enemyGrid);
        while (this.playerOne.score < this.playerOne.playerShips.length){
            this.playerOne.playerAttack(this.playerOne.enemyGrid, this.playerTwo.playerGrid);
            this.playerOne.enemyBoard.displayGrid(this.playerOne.enemyGrid);
            console.log(this.playerOne);
        }
/*         let playerTwoGrid = this.playerTwo.runSetup();
        console.log("Finished displaying the second player grid.");
        this.playerTwo.playerBoard.displayGrid(playerTwoGrid);
        console.log("This is the enemy grid! (Player Two's Grid)");
        this.playerOne.enemyBoard.enemyGrid(playerTwoGrid); */
        if (this.playerOne.score == this.playerOne.playerShips.length){
            console.log(this.playerOne.name + " has won the game!");
        }else {
            console.log(this.playerOne.name + " has lost the game... Better luck next time!");
        }
    }

    displayRules(){
        console.log("Welcome to Battleship!");
        console.log("Where you place your ships on the 20 x 20 grid and hope to guess where your opponent placed their ships first.");
        console.log("First one to sink all their opponents ships wins.");
    }
}
module.exports = Game;