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
    userValidation(userChoice, validationMessage){
        var letterCheck = /^[A-Za-z]+$/;
        if (userChoice==null || userChoice=="")
        {
            console.log(validationMessage);
            return false;
        }
        else if (!userChoice.match(letterCheck))
        {
            console.log("Choice must contain letters only!");
            console.log(validationMessage);
            return false;
        }
        else {
            return true;
        }
    }

    userValidationColumn(userChoice, validationMessage){
        var letterCheck = /^[A-Za-z]+$/;
        if (userChoice==null || userChoice=="")
        {
            console.log(validationMessage);
            return false;
        }else if (!userChoice.match(letterCheck))
        {
            console.log("Choice must contain letters only!");
            console.log(validationMessage);
            return false;
        }else if (userChoice.length == 1 && userChoice.charCodeAt(userChoice) > 97 && userChoice.charCodeAt(userChoice) < 117){
            return true;
        }else {
            console.log(validationMessage);
            return false;
        }
    }

    userValidationRow(userChoice){
        if (userChoice == null) {
            console.log("Please input a number.");
            return false;
        }else if (isNaN(userChoice)){
            console.log("Invalid input. Please input a number.");
            return false;
        }else if (userChoice > 0 && userChoice < 21){
            return true;
        }else {
            console.log("Input a number from 1-20");
            return false;
        }
    }

    userInitialTurn(){
        let playerOneInitialGrid = this.playerBoard.startGrid();
        return playerOneInitialGrid;
    }

    setShipColumn(){
        console.log("What column would you like to choose:");
        let userInputColumn = prompt().toLowerCase();
        console.log(userInputColumn.charCodeAt(userInputColumn));
        let test = false;
        while(test === false){
            test = this.userValidationColumn(userInputColumn, 'Please input a letter from A-T');
            if (test === false){
                userInputColumn = prompt();
            }
        }
        return userInputColumn;
    }

    setShipRow(){
        console.log("What row would you like to choose:");
        let userInputRow = parseInt(prompt());
        let test = false;
        while(test === false){
            test = this.userValidationRow(userInputRow);
            if (test === false){
                userInputRow = prompt();
            }
        }
        return userInputRow;
    }
}

module.exports = Player;