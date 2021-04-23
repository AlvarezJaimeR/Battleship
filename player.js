"use strict"

const Gameboard = require('./gameboard');
const {Destroyer, Submarine, Battleship, AircraftCarrier} = require('./ship');
const prompt = require('prompt-sync')();

class Player {
    constructor(name){
        this.score = 0;
        this.name = name;
        this.playerBoard = new Gameboard();
        this.enemyBoard = new Gameboard();
        this.playerShips = [new Destroyer(), new Submarine(), new Battleship(), new AircraftCarrier()]; 
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

    userInitialTurn(){
        let playerOneInitialGrid = this.playerBoard.startGrid();
        return playerOneInitialGrid;
    }

    setShipColumn(){
        console.log("What column would you like to choose:");
        let userInputColumn = prompt().toLowerCase();
        return userInputColumn;
    }

    setShipRow(){
        console.log("What row would you like to choose:");
        let userInputRow = parseInt(prompt());
        return userInputRow;
    }
}

module.exports = Player;