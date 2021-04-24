"use strict"

const ship = require("./ship");

class Gameboard {
    constructor(name){
        this.name = name
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
        let gameGrid = createGrid(21, 21, alphabetArray);
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
        if (20 - pickedColumn + shipSize >= 0){
            return true;
        }else{
            console.log("Too close to the right boundary. The ship can't face this way.");
            return false;
        }
    }

    checkLeftBoundary(pickedColumn, shipSize){
        if (pickedColumn - shipSize >= 0){
            return true;
        }else{
            console.log("Too close to the left boundary. The ship can't face this way.");
            return false;
        }
    }

    checkTopBoundary(pickedRow, shipSize){
        if (pickedRow - shipSize >= 0){
            return true;
        }else{
            console.log("Too close to the top boundary. The ship can't face this way.");
            return false;
        }
    }

    checkBottomBoundary(pickedRow, shipSize){
        if (20 - pickedRow + shipSize >= 0){
            return false;
        }
    }
}

module.exports = Gameboard;