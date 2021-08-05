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
        this.row = '';
        this.column = '';
        this.playerGrid;
        this.enemyGrid;
    }

    //main function that runs the initial set up
    runSetup(){
        this.name = this.userName();
        this.playerBoard.name = this.name;
        let playerGrid = this.userInitialTurn();
        this.playerGrid = this.pickShipLocation(playerGrid);
        this.enemyGrid = this.enemyBoard.startGrid();
/*         console.log("playerGrid from player run setup  =", playerGrid);
        console.log("playerGrid length from player run setup =", playerGrid.length); */
        return playerGrid;
    }

    playerAttack(enemyGrid, playerGrid){
        //user decides the row and column for the ship location
            console.log(this.name + " -- Please decide where to attack! (ex. row G column 10).");
        this.playerChoice();
        //check if the column / row is already occupied 
        let secondCheckSpot = this.checkSpot(this.row, this.column, enemyGrid);
        let loopChoice = this.loopSpot(secondCheckSpot, enemyGrid);
            console.log('able to attack here', loopChoice);
            console.log(this.row, this.column);
        let hit = this.checkForShip(this.row, this.column, playerGrid);
            console.log("Hit", hit);
        this.enemyGrid = this.setAttack(this.row, this.column, enemyGrid, hit);
        this.shipHealth(this.row, this.column, hit);
        //console.log(grid);
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
        let initialGrid = this.playerBoard.startGrid();
        return initialGrid;
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

    playerChoice(){
        this.row = this.setShipRow();
        this.column = this.setShipColumn();
            console.log("You picked " + this.row.toUpperCase() + this.column);
            //console.log("player row pre update " + this.row);
        //convert the row to letter to an integer
        this.row = this.row.charCodeAt(this.row)-96;
            //console.log("player column " + this.column);
            //console.log("player row updated " + this.row);
    }

    loopSpot(check, playerGrid){
        while (check === false){
            this.playerChoice();
            let shipSpot = this.checkSpot(this.row, this.column, playerGrid);
            check = shipSpot;
        }
        return true;
    }

    checkBoundary(i, grid){
        //check if the column chosen is close to the boundary
        let playerColumnCheck = this.shipBoundaryWidth(this.column, i);
            //console.log("number check width: " + playerColumnCheck);
        let playerColumnCheckLeft = this.shipColumnCheckLeft(this.column, this.row, i, grid);
            //console.log("left check", playerColumnCheckLeft);
        let playerColumnCheckRight = this.shipColumnCheckRight(this.column, this.row, i, grid);
            //console.log("right check", playerColumnCheckRight);
        //check if the row chosen is close to the boundary
        let playerRowCheck = this.shipBoundaryLength(this.row, i);
            //console.log("number check length: " + playerRowCheck);
        let playerRowCheckUp = this.shipRowCheckUp(this.column, this.row, i, grid);
            //console.log("up check", playerRowCheckUp);
        let playerRowCheckDown = this.shipRowCheckDown(this.column, this.row, i, grid);
            //console.log("down check", playerRowCheckDown);
        //filter the player's choice
        //user to decide the orientation of the ship
        let filteredChoice = this.filterPlayerChoiceBoundary(playerColumnCheck, playerRowCheck);
            //console.log("filteredChoice", filteredChoice);
        //orientation needs to be checked.
        let finalOrientChoice = this.shipChoiceOrientation(playerColumnCheck, playerRowCheck, playerRowCheckUp, playerRowCheckDown, playerColumnCheckLeft, playerColumnCheckRight);
            console.log("Pass the orientation check.", finalOrientChoice); 
            while (finalOrientChoice === undefined){
                this.filterPlayerChoiceBoundary(playerColumnCheck, playerRowCheck);
                finalOrientChoice = this.shipChoiceOrientation(playerColumnCheck, playerRowCheck, playerRowCheckUp, playerRowCheckDown, playerColumnCheckLeft, playerColumnCheckRight);
            }
            console.log("Final pass orient check.", finalOrientChoice);
        return finalOrientChoice;
    }

    filterPlayerChoiceBoundary(playerColumnCheck, playerRowCheck){
        let filteredChoice = 0;
        if (playerColumnCheck === 0 && playerRowCheck === 0){
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n1 - up, 2 - down, 3 - left, or 4 - right.");
            filteredChoice = 0;
            return filteredChoice;
        } else if (playerColumnCheck === 1 && playerRowCheck === 0){
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n1 - up, 3 - left, or 4 - right.");
            filteredChoice = 1
            return filteredChoice;
        } else if (playerColumnCheck === -1 && playerRowCheck === 0){
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n2 - down, 3 - left, or 4 - right.");
            filteredChoice = 2
            return filteredChoice;
        } else if (playerColumnCheck === 0 && playerRowCheck === -1){
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n1 - up, 2 - down, or 3 - left.");
            filteredChoice = 3
            return filteredChoice;
        } else if (playerColumnCheck === 0 && playerRowCheck === 1){
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n1 - up, 2 - down, or 4 - right.");
            filteredChoice = 4
            return filteredChoice;
        } else if (playerColumnCheck === 1 && playerRowCheck === -1){
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n1 - up or 3 - left.");
            filteredChoice = 5
            return filteredChoice;
        } else if (playerColumnCheck === 1 && playerRowCheck === 1){
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n1 - up or 4 - right.");
            filteredChoice = 6
            return filteredChoice;
        } else if (playerColumnCheck === -1 && playerRowCheck === -1){
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n2 - down or 3 - left.");
            filteredChoice = 7
            return filteredChoice;
        } else if (playerColumnCheck === -1 && playerRowCheck === 1){
            console.log("What orientation would you like to place the ship? pick a number to designate the oritentation: \n2 - down or 4 - right.");
            filteredChoice = 8
            return filteredChoice;
        }
        console.log('filteredPlayerChoice', filteredChoice);
        return filteredChoice;
    }

    pickShipLocation(playerGrid){
        for (let i=0; i < this.playerShips.length; i++){
            //user decides the row and column for the ship location
                console.log(this.name + " -- Please decide where to place your ship " + this.playerShips[i].name + 
                    ", size " + this.playerShips[i].size + ", (ex. row G column 10).");
            this.playerChoice();
            //check if the column / row is already occupied 
            let firstCheck = this.checkSpot(this.row, this.column, playerGrid);
            let loopChoice = this.loopSpot(firstCheck, playerGrid);
                console.log('able to drop ship', loopChoice);
            //place the ship on the grid for a visual to the user
            playerGrid = this.setShip(this.row, this.column, playerGrid);
            this.playerBoard.displayGrid(playerGrid);
            //check boundaries
            let userOrientChoice = this.checkBoundary(i, playerGrid);
            //continue to fill in the spots for the ship depending on the size
                this.playerShips[i].spot.push({"row": this.row, "column": this.column, "hitStatus":false});
                console.log("current ship location", this.playerShips[i].spot);
                console.log(this.playerShips[i].spot[0].hitStatus);
            this.playerBoard.displayGrid(playerGrid);
            playerGrid = this.shipFill(this.row, this.column, userOrientChoice, this.playerShips[i].size, playerGrid, i);
                console.log("Check player grid after adding the length of the ship.");
                console.log(this.playerShips[i].spot);
                console.log("Ship information",this.playerShips[i]);
            this.playerBoard.displayGrid(playerGrid);
        }
        return playerGrid;
    }

    shipHealth(row, column, hit){
        console.log("Checking ship health");
        if (hit === true){
            for (let i = 0; i < this.playerShips.length; i++){
                for (let j = 0; j < this.playerShips[i].spot.length; j++){
                    //console.log(this.playerShips[i].spot.length);
                    if (this.playerShips[i].spot[j].row === row && this.playerShips[i].spot[j].column === column){
                        this.playerShips[i].spot[j].hitStatus = true;
                        this.playerShips[i].shipHealth++;
                        //console.log(this.playerShips[i]);
                        console.log("Current ship that got hit is the",this.playerShips[i].name);
                        console.log("You hit spot #",j+1,"of the ship");
                        if (this.playerShips[i].shipHealth === this.playerShips[i].spot.length){
                            console.log("You sunk the",this.playerShips[i].name);
                            this.playerShips[i].sunk = true;
                        }
                        return;
                    }else {
                        console.log("Skipping ship ", this.playerShips[i].name);
                    }
                }
            }
        }
        else if (hit === false) {
            console.log("Didn't hit a ship. No changes to ship health.");
        }
    }

    shipFill(row, column, orientation, shipSize, playerGrid, shipIndex){
        switch(orientation){
            //up
            case '1':
                for(let i=1; i < shipSize; i++){
                    playerGrid = this.setShip(row - 1, column, playerGrid);
                    row --;
                    this.playerShips[shipIndex].spot.push({"row": row, "column": column, "hitStatus":false});
                    //console.log(this.playerShips[shipIndex].name);
                    //console.log(this.playerShips[shipIndex].spot);
                }
                return playerGrid;
            //down
            case '2':
                for(let i=1; i < shipSize; i++){
                    playerGrid = this.setShip(row + 1, column, playerGrid);
                    row ++;
                    this.playerShips[shipIndex].spot.push({"row": row, "column": column, "hitStatus":false});
                    //console.log(this.playerShips[shipIndex].name);
                    //onsole.log(this.playerShips[shipIndex].spot);
                }
                return playerGrid;
            //left
            case '3':
                for(let i=1; i < shipSize; i++){
                    playerGrid = this.setShip(row, column - 1, playerGrid);
                    column --;
                    this.playerShips[shipIndex].spot.push({"row": row, "column": column, "hitStatus":false});
                    //console.log(this.playerShips[shipIndex].name);
                    //console.log(this.playerShips[shipIndex].spot);
                }
                return playerGrid;
            //right
            case '4':
                for(let i=1; i < shipSize; i++){
                    playerGrid = this.setShip(row, column + 1, playerGrid);
                    column ++;
                    this.playerShips[shipIndex].spot.push({"row": row, "column": column, "hitStatus":false});
                    //console.log(this.playerShips[shipIndex].name);
                    //console.log(this.playerShips[shipIndex].spot);
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

    setAttack(playerRow, playerColumn, playerGrid, hit){
        if (hit === true){
            if (playerColumn >= 1 && playerColumn <= 10){
                playerGrid[playerRow][playerColumn] = "  H  ";
            }else {
                playerGrid[playerRow][playerColumn] = "   H  ";
            }
        }
        else if (hit === false){
            if (playerColumn >= 1 && playerColumn <= 10){
                playerGrid[playerRow][playerColumn] = "  O  ";
            }else {
                playerGrid[playerRow][playerColumn] = "   O  ";
            }
        }
        return playerGrid;
    }

    orientValidation(orientChoice){
        console.log("Starting orientation validation!", orientChoice);
        if (orientChoice >= 1 && orientChoice <= 4){
            return orientChoice;
        }else {
            console.log("Please choose one of the options: \n1 - up, 2 - down, 3 - left, or 4 - right.");
            orientChoice = prompt();
            return orientChoice;
        }
    }

    shipChoiceOrientation(playerColumnCheck, playerRowCheck, upCheck, downCheck, leftCheck, rightCheck){
        //console.log(playerColumnCheck, playerRowCheck);
        let orientChoice = prompt();
        console.log("Starting orientation check!");
        orientChoice = this.orientValidation(orientChoice);
        //console.log(orientChoice);
        switch(orientChoice){
            case '1': 
                if(playerRowCheck == 1){
                    console.log("Too close to the top boundary. Unable to place the piece with this orientation.");
                    break;
                } else if (upCheck === false){
                    console.log("There are ships already placed in the way. Unable to place the piece with this orientation.");
                    break;
                }
                console.log("up", orientChoice);
                return orientChoice;
            case '2':
                if(playerRowCheck == -1){
                    console.log("Too close to the bottom boundary. Unable to place the piece with this orientation.");
                    break;
                } else if (downCheck === false){
                    console.log("There are ships already placed in the way. Unable to place the piece with this orientation.");
                    break;
                }
                console.log("down", orientChoice);
                return orientChoice;
            case '3':
                if(playerColumnCheck == -1){
                    console.log("Too close to the left boundary. Unable to place the piece with this orientation.");
                    break;
                } else if (leftCheck === false){
                    console.log("There are ships already placed in the way. Unable to place the piece with this orientation.");
                    break;
                }
                console.log("left", orientChoice);
                return orientChoice;
            case '4':
                if(playerColumnCheck == 1){
                    console.log("Too close to the right boundary. Unable to place the piece with this orientation.");
                    break;
                } else if (rightCheck === false){
                    console.log("There are ships already placed in the way. Unable to place the piece with this orientation.");
                    break;
                }
                console.log("right", orientChoice);
                return orientChoice;
        }
    } 

    checkSpot(row, column, grid){
        //console.log(row);
        //console.log(column);
        if (row === 21 || column === 21){
            console.log("Hitting the boundary.");
            return false;
        }
        let spot = grid[row][column];
        //console.log('Check spot', spot);
        if (grid[row][column] === "  -  " || grid[row][column] === "   -  "){
            return true;
        }
        else 
            console.log("Unable to choose specific spot since it's already occupied.");
            return false;
    }

    checkForShip(row, column, grid){
        //console.log(row);
        //console.log(column);
        let spot = grid[row][column];
        //console.log('Check spot', spot);
        if (grid[row][column] === "  X  " || grid[row][column] === "   X  "){
            console.log("HIT!!!");
            return true;
        }
        else 
            console.log("Swing and a miss...");
            return false;
    }

    shipColumnCheckLeft(playerColumn, playerRow, i, grid){
        //console.log(this.playerShips[i].size);
        //console.log(playerColumn , playerRow);
        let left = true;       
        for (let j = 0; j < this.playerShips[i].size - 1; j++){
            left = this.checkSpot(playerRow, playerColumn - 1, grid);
            playerColumn --;
            if (left === false) {
                return false;
            }
        }
        return true;
    }

    shipColumnCheckRight(playerColumn, playerRow, i, grid){
        //console.log(this.playerShips[i].size);
        //console.log(playerColumn, playerRow);
        let right = true;
        for (let j = 0; j < this.playerShips[i].size - 1; j++){
            right = this.checkSpot(playerRow, playerColumn + 1, grid);
            playerColumn ++;
            if (right === false) {
                return false;
            }
        }
        return true;
    }

    shipRowCheckUp(playerColumn, playerRow, i, grid){
        //console.log(this.playerShips[i].size);
        //console.log(playerColumn, playerRow);
        let up = true;
        for (let j = 0; j < this.playerShips[i].size - 1; j++){
            up = this.checkSpot(playerRow - 1, playerColumn, grid);
            playerRow --;
            if (up === false) {
                return false;
            }
        }
        return true;
    }

    shipRowCheckDown(playerColumn, playerRow, i, grid){
        //console.log(this.playerShips[i].size);
        //console.log(playerColumn, playerRow);
        let down = true;
        for (let j = 0; j < this.playerShips[i].size - 1; j++){
            down = this.checkSpot(playerRow + 1, playerColumn, grid);
            playerRow ++;
            if (down === false) {
                return false;
            }
        }
        return true;
    }

    shipBoundaryWidth(playerColumn, i){
        //console.log("player column (width)" + playerColumn);
        let rightBound = this.playerBoard.checkRightBoundary(playerColumn, this.playerShips[i].size);
        let leftBound = this.playerBoard.checkLeftBoundary(playerColumn, this.playerShips[i].size);
        //console.log("right Bound: ", rightBound);
        //console.log("left bound: ", leftBound);
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
        //console.log("player row (length)" + playerRow);
        let topBound = this.playerBoard.checkTopBoundary(playerRow, this.playerShips[i].size);
        let bottomBound = this.playerBoard.checkBottomBoundary(playerRow, this.playerShips[i].size);
        //console.log("top bound: ", topBound);
        //console.log("bottom bound: ", bottomBound);
        if(topBound === true && bottomBound === true){
            console.log("No bounds on length.");
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