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
        let userInputRow = prompt().toLowerCase();
        let test = false;
        while(test === false){
            test = this.userValidationRow(userInputRow, 'Please input a letter from A-T');
            if (test === false){
                userInputRow = prompt();
            }
        }
        return userInputRow;
    }

    setShipColumn(){
        console.log("What column would you like to choose:");
        let userInputColumn = parseInt(prompt());
        let test = false;
        while(test === false){
            test = this.userValidationColumn(userInputColumn);
            if (test === false){
                userInputColumn = prompt();
            }
        }
        return userInputColumn;
    }

    //main function that runs the initial set up
    runSetup(){
        this.name = this.userName();
        let playerGrid = this.userInitialTurn();
        for (let i=0; i < 4; i++){
            console.log(this.name + " -- Please decide where to place your ship " + this.playerShips[i].name + ", size " + this.playerShips[i].size + ", (ex. row G column 10).");
            let playerRow = this.setShipRow();
            let playerColumn = this.setShipColumn();
            console.log("You picked " + playerRow.toUpperCase() + playerColumn);
            console.log("player row pre update " + playerRow);
            playerRow = playerRow.charCodeAt(playerRow)-96;
            console.log("player column " + playerColumn);
            console.log("player row updated " + playerRow);
            let playerColumnCheck = this.shipBoundaryWidth(playerColumn, i);
            console.log("number check width: " + playerColumnCheck);
            //this.shipBoundaryLength(playerRow, i);
            playerGrid = this.setShip(playerRow, playerColumn, playerGrid);
            this.playerBoard.displayGrid(playerGrid);
        }
    }

    setShip(playerRow, playerColumn, playerGrid){
        if (playerColumn > 1 && playerColumn <= 10){
            playerGrid[playerRow][playerColumn] = "  X  ";
        }else {
            playerGrid[playerRow][playerColumn] = "   X  ";
        }
        return playerGrid;
    }

    shipBoundaryWidth(playerColumn, i){
        console.log("player column (width)" + playerColumn);
        let rightBound = this.playerBoard.checkRightBoundary(playerColumn, this.playerShips[i].size);
        let leftBound = this.playerBoard.checkLeftBoundary(playerColumn, this.playerShips[i].size);
        console.log("right Bound: ", rightBound);
        console.log("left bound: ", leftBound);
        if(rightBound === true && leftBound === true){
            console.log("No bounds on width.");
            return 0;
        }else if(rightBound === true && leftBound === false) {
            console.log("Not able to place the ship orientation to the left.");
            return -1;
        }else if(rightBound === false && leftBound === true){
            console.log("Not able to place the ship orientation to the right.");
            return 1;
        }else {
            console.log("Shouldn't hit this spot.");
        }
    }

    shipBoundaryLength(playerRow, i){
        console.log("player row (width)" + playerRow);
        let topBound = this.playerBoard.checkTopBoundary(playerRow, this.playerShips[i].size);
        let bottomBound = this.playerBoard.checkBottomBoundary(playerRow, this.playerShips[i].size);
        console.log("top bound: ", topBound);
        console.log("bottom bound: ", bottomBound);
        if(topBound === true && bottomBound === true){
            console.log("No bounds on width.");
            return 0;
        }else if(topBound === true && bottomBound === false) {
            console.log("Not able to place the ship orientation down.");
            return -1;
        }else if(topBound === false && bottomBound === true){
            console.log("Not able to place the ship orientation up.");
            return 1;
        }else {
            console.log("Shouldn't hit this spot.");
        }
    }
}

module.exports = Player;