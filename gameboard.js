"use strict"
const ship = require("./ship");

class Gameboard {
    constructor(name){
        this.name = name
        this.width = 21;
        this.length = 21;
    }

    startGrid(){
    let createGrid = (width, height, alphabetArray) => {
        let grid = [];
        let row = [];
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    if(i==0 && j==0){
                        this.pushNumbers(row);
                    }
                    if(i!=0 && j==0){
                    row.push(alphabetArray[i-1]);
                    }
                    if(i!=0 && j!=0 && j<=10){
                    row.push("  -  ");
                    }
                    if(i!=0 && j!=0 && j>=11){
                    row.push("   -  ");
                    }
                }
                grid.push(row);
                row = [];
            }
            return (grid);
    }

        let alphabetArray = ['  A  ', '  B  ', '  C  ', '  D  ', '  E  ', '  F  ', '  G  ', '  H  ', '  I  ', '  J  ', '  K  ', '  L  ', '  M  ', '  N  ', '  O  ', '  P  ', '  Q  ', '  R  ', '  S  ', '  T  '];
        let gameGrid = createGrid(this.width, this.length, alphabetArray);
        this.displayGrid(gameGrid);
        return gameGrid;
    }

    pushNumbers(row){
        for (let i=0; i<21; i++){
            row.push('  ' + i + '  ');
        }
    }

    displayGrid = (grid) => {
        for (let i = 0; i < grid.length; i++) {
            console.log(grid[i].join(""));
        }
    }

    checkRightBoundary(pickedColumn, shipSize){
        console.log("right bound " + pickedColumn + " " + shipSize);
        if (this.width - 1 - pickedColumn - shipSize + 1 < 0){
            console.log("Too close to the right boundary. The ship can't face this way.");
            return false;
        }else{
            console.log("Right Boundary pass");
            return true;
        }
    }

    checkLeftBoundary(pickedColumn, shipSize){
        console.log("left bound " + pickedColumn + " " + shipSize);
        if (pickedColumn - shipSize + 1 <= 0){
            console.log("Too close to the left boundary. The ship can't face this way.");
            return false;
        }else{
            console.log("Left Boundary Pass");
            return true;
        }
    }

    checkTopBoundary(pickedRow, shipSize){
        console.log("top bound " + pickedRow + " " + shipSize);
        if (pickedRow - shipSize + 1 >= 0){
            return true;
        }else{
            console.log("Too close to the top boundary. The ship can't face this way.");
            return false;
        }
    }

    checkBottomBoundary(pickedRow, shipSize){
        console.log("top bound " + pickedRow + " " + shipSize);
        if (this.length - 1 - pickedRow - shipSize + 1 >= 0){
            return true;
        }else{
            console.log("Too close to the bottom boundary. The ship can't face this way.");
            return false;
        }
    }
}

module.exports = Gameboard;