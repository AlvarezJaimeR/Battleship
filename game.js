'Use Strict'
const Gameboard = require('./gameboard');
const prompt = require('prompt-sync')();

class Game{
    constructor(){
        this.gameboardOne;
    }

    runGame(){
        //this.displayRules();
        this.gameboardOne = new Gameboard(this.userName());
        let test = this.gameboardOne.startGrid();
        this.displayGrid(test);
        test[1][3] = "  X  ";
        this.displayGrid(test);
    }

    displayGrid = (grid) => {
        for (let i = 0; i < grid.length; i++) {
            console.log(grid[i].join(""));
        }
    }

    userName(){
        console.log('What is your name?');
        let userName = prompt();
        let test = false;
        while(test === false){
            test = this.userValidation(userName, 'Please input a name');
            if (test === false){
                userName = prompt();
            }
        }return userName;
    }

/*     displayRules(){
        console.log("Welcome to Rock Paper Scissors Lizard Spock!");
        console.log('Win three rounds to win the game!');
        console.log('You may decide to vs another human or an AI.');
    } */

        //Check if the user input is all characters
        userValidation(userOppChoice, validationMessage){
            var letterCheck = /^[A-Za-z]+$/;
            if (userOppChoice==null || userOppChoice=="")
            {
                console.log(validationMessage);
                return false;
            }
            else if (!userOppChoice.match(letterCheck))
            {
                console.log("Choice must contain letters only!");
                console.log(validationMessage);
                return false;
            }
            else {
                return true;
            }
        }
}
module.exports = Game;