'Use Strict'
const Gameboard = require('./gameboard');
const Player = require('./player');

class Game{
    constructor(){
        this.playerOne = new Player();
        this.playerTwo = new Player();
        this.roll = 0;
    }

    runGame(){
        this.displayRules();
        //player one setup
        this.playerOne.runSetup();
        //console.log("Finished displaying the first player grid.");
        console.log("This is the final grid for " + this.playerOne.name);
        this.playerOne.playerBoard.displayGrid(this.playerOne.playerGrid);
        //console.log(this.playerOne);
        //player 2 setup
        this.playerTwo.runSetup();
        //console.log("Finished displaying the second player grid.");
        console.log("This is the final grid for " + this.playerOne.name);
        this.playerTwo.playerBoard.displayGrid(this.playerTwo.playerGrid);
        //display enemy grids
        this.playerOne.enemyBoard.displayGrid(this.playerOne.enemyGrid);
        this.playerTwo.enemyBoard.displayGrid(this.playerTwo.enemyGrid);
        //set the enemy board names
        this.playerOne.enemyName(this.playerTwo.name);
        this.playerTwo.enemyName(this.playerOne.name);
        //roll the dice to see what player will attack first
        console.log("Player one rolls the dice. You need to roll an even number to attack first!");
        this.playerOne.dice = this.playerOne.rollDice();
        //console.log(this.playerTwo);
        if (this.playerOne.dice % 2 == 0){
            console.log(this.playerOne.name + "has rolled an even number. You get to go first!");
                while (this.playerOne.score < this.playerTwo.playerShips.length || 
                        this.playerTwo.score < this.playerOne.playerShips.length){
                            console.log("This is your personal grid.");
                            this.playerOne.playerBoard.displayGrid(this.playerOne.playerGrid);
                            this.playerOne.playerAttack(this.playerOne.enemyGrid, this.playerTwo.playerGrid);
                            console.log("This is the enemy grid.");
                            this.playerOne.enemyBoard.displayGrid(this.playerOne.enemyGrid);
                            console.log("This is your personal grid.");
                            this.playerTwo.playerBoard.displayGrid(this.playerTwo.playerGrid);
                            this.playerTwo.playerAttack(this.playerTwo.enemyGrid, this.playerOne.playerGrid);
                            console.log("This is the enemy grid.");
                            this.playerTwo.enemyBoard.displayGrid(this.playerTwo.enemyGrid);
                }
        }else {
            console.log(this.playerOne.name + "didn't roll an even number... You have to go second!");
                while (this.playerOne.score < this.playerTwo.playerShips.length || 
                    this.playerTwo.score < this.playerOne.playerShips.length){
                        console.log("This is your personal grid.");
                        this.playerTwo.playerBoard.displayGrid(this.playerTwo.playerGrid);
                        this.playerTwo.playerAttack(this.playerTwo.enemyGrid, this.playerOne.playerGrid);
                        console.log("This is the enemy grid.");
                        this.playerTwo.enemyBoard.displayGrid(this.playerTwo.enemyGrid);
                        console.log("This is your personal grid.");
                        this.playerOne.playerBoard.displayGrid(this.playerOne.playerGrid);
                        this.playerOne.playerAttack(this.playerOne.enemyGrid, this.playerTwo.playerGrid);
                        console.log("This is the enemy grid.");
                        this.playerOne.enemyBoard.displayGrid(this.playerOne.enemyGrid);
                }
        }
        if (this.playerOne.score == this.playerOne.playerShips.length){
            console.log(this.playerOne.name + " has won the game!");
            console.log(this.playerTwo.name + " has lost the game... Better luck next time!");
        }else {
            console.log(this.playerTwo.name + " has won the game!");
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