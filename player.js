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

    userValidationRow(userChoice, validationMessage){
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
        }else if (userChoice.length == 1){
            if  (userChoice.charCodeAt(userChoice.toLowerCase()) > 96 && userChoice.charCodeAt(userChoice.toLowerCase()) < 117){
                return true;
            }else{
                console.log(validationMessage);
                return false;
            }
        }else {
            console.log(validationMessage);
            return false;
        }
    }

    userValidationColumn(userChoice){
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

    setShipRow(){
        console.log("What row would you like to choose:");
        let userInputColumn = prompt().toLowerCase();
        let test = false;
        while(test === false){
            test = this.userValidationRow(userInputColumn, 'Please input a letter from A-T');
            if (test === false){
                userInputColumn = prompt();
            }
        }
        return userInputColumn;
    }

    setShipColumn(){
        console.log("What column would you like to choose:");
        let userInputRow = parseInt(prompt());
        let test = false;
        while(test === false){
            test = this.userValidationColumn(userInputRow);
            if (test === false){
                userInputRow = prompt();
            }
        }
        return userInputRow;
    }

    runSetup(){
        this.name = this.userName();
        let playerGrid = this.userInitialTurn();
        for (let i=0; i < 4; i++){
            console.log(this.name + " -- Please decide where to place your ship " + this.playerShips[i].name + ", size " + this.playerShips[i].size + ", (ex. row G column 10).");
            let playerRow = this.setShipRow();
            let playerColumn = this.setShipColumn();
            console.log("You picked " + playerRow.toUpperCase() + playerColumn);
            
            playerGrid = this.setShip(playerRow, playerColumn, playerGrid);
            this.playerBoard.displayGrid(playerGrid);
        }
    }

    setShip(playerRow, playerColumn, playerGrid){
        playerRow = playerRow.charCodeAt(playerRow);
        if (playerColumn > 1 && playerColumn <= 10){
            playerGrid[playerRow-96][playerColumn] = "  X  ";
        }else {
            playerGrid[playerRow-96][playerColumn] = "   X  ";
        }
        return playerGrid;
    }

    shipBoundaries(){
        let rightBound = this.playerBoard.checkRightBoundary(playerColumn, this.playerShips[0].size);
        let leftBound = this.playerBoard.checkLeftBoundary(playerColumn, this.playerShips[0].size);
        let topBound = this.playerBoard.checkTopBoundary(playerRow, this.playerShips[0].size);
        let bottomBound = this.playerBoard.checkBottomBoundary(playerRow, this.playerShips[0].size);
    }
}

module.exports = Player;