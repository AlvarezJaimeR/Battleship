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
                userInputRow = this.setShipRow();
                return userInputRow;
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
        this.pickShipLocation(playerGrid);
    }

    pickShipLocation(playerGrid){
        for (let i=0; i < this.playerShips.length; i++){
            //user decides the row and column for the ship location
            console.log(this.name + " -- Please decide where to place your ship " + this.playerShips[i].name + 
                ", size " + this.playerShips[i].size + ", (ex. row G column 10).");
            let playerRow = this.setShipRow();
            let playerColumn = this.setShipColumn();
                console.log("You picked " + playerRow.toUpperCase() + playerColumn);
                console.log("player row pre update " + playerRow);
            //convert the row to letter to an integer
            playerRow = playerRow.charCodeAt(playerRow)-96;
                console.log("player column " + playerColumn);
                console.log("player row updated " + playerRow);
            //check if the column chosen is close to the boundary
            let playerColumnCheck = this.shipBoundaryWidth(playerColumn, i);
                console.log("number check width: " + playerColumnCheck);
            //check if the row chosen is close to the boundary
            let playerRowCheck = this.shipBoundaryLength(playerRow, i);
                console.log("number check length: " + playerRowCheck);
            //place the ship on the grid for a visual to the user
            playerGrid = this.setShip(playerRow, playerColumn, playerGrid);
            this.playerBoard.displayGrid(playerGrid);
            //user to decide the orientation of the ship
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n1 - up, 2 - down, 3 - left, or 4 - right.");
            //orientation needs to be checked.
            let finalOrientChoice = this.shipChoiceOrientation(playerColumnCheck, playerRowCheck);
                console.log("Pass the orientation check.");
                console.log(finalOrientChoice);
            //continue to fill in the spots for the ship depending on the size
            console.log("Check player grid prior to adding the length of the ship.");
            this.playerBoard.displayGrid(playerGrid);
            playerGrid = this.shipFill(playerRow, playerColumn, finalOrientChoice, this.playerShips[i].size, playerGrid);
            console.log("Check player grid after adding the length of the ship.");
            this.playerBoard.displayGrid(playerGrid);
        }
    }

    shipFill(row, column, orientation, shipSize, playerGrid){
        switch(orientation){
            //up
            case '1':
                for(let i=1; i < shipSize; i++){
                    playerGrid = this.setShip(row - 1, column, playerGrid);
                    row --;
                }
                return playerGrid;
            //down
            case '2':
                for(let i=1; i < shipSize; i++){
                    playerGrid = this.setShip(row + 1, column, playerGrid);
                    row ++;
                }
                return playerGrid;
            //left
            case '3':
                for(let i=1; i < shipSize; i++){
                    playerGrid = this.setShip(row, column - 1, playerGrid);
                    column --;
                }
                return playerGrid;
            //right
            case '4':
                for(let i=1; i < shipSize; i++){
                    playerGrid = this.setShip(row, column + 1, playerGrid);
                    column ++;
                }
                return playerGrid;
        }
    }

    setShip(playerRow, playerColumn, playerGrid){
        if (playerColumn >= 1 && playerColumn <= 10){
            playerGrid[playerRow][playerColumn] = "  X  ";
        }else {
            playerGrid[playerRow][playerColumn] = "   X  ";
        }
        return playerGrid;
    }

    orientValidation(orientChoice){
        console.log("Starting orientation validation!");
        if (orientChoice >= 1 && orientChoice <= 4){
            return orientChoice;
        }else {
            console.log("Please choose one of the options: \n1 - up, 2 - down, 3 - left, or 4 - right.");
            orientChoice = prompt();
            return orientChoice;
        }
    }

    shipChoiceOrientation(playerColumnCheck, playerRowCheck){
        console.log("Starting orientation check!");
        let orientChoice = prompt();
        this.orientValidation(orientChoice);
        switch(orientChoice){
            case '1': 
                if(playerRowCheck == 1){
                    console.log("Too close to the top boundary. Unable to place the piece with this orientation.");
                    this.shipChoiceOrientation(playerColumnCheck, playerRowCheck);
                }
                return orientChoice;
            case '2':
                if(playerRowCheck == -1){
                    console.log("Too close to the bottom boundary. Unable to place the piece with this orientation.");
                    this.shipChoiceOrientation(playerColumnCheck, playerRowCheck);
                }
                return orientChoice;
            case '3':
                if(playerColumnCheck == -1){
                    console.log("Too close to the left boundary. Unable to place the piece with this orientation.");
                    this.shipChoiceOrientation(playerColumnCheck, playerRowCheck);
                }
                return orientChoice;
            case '4':
                if(playerColumnCheck == 1){
                    console.log("Too close to the right boundary. Unable to place the piece with this orientation.");
                    this.shipChoiceOrientation(playerColumnCheck, playerRowCheck);
                }
                return orientChoice;
        }
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