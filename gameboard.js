"use strict"

class Gameboard {
    constructor(name){
        this.name = name;
    }

    startGrid(){
    let createGrid = (width, height, alphabetArray) => {
        let grid = [];
        let row = [];
            for (let i = 0; i < width; i++) {
                for (let j = 0; j < height; j++) {
                    if(i==0 && j==0){
                        pushNumbers(row);
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

    function pushNumbers(row){
        for (let i=0; i<21; i++){
            row.push('  ' + i + '  ');
        }
    }

        let displayGrid = (grid) => {
            for (let i = 0; i < grid.length; i++) {
                console.log(grid[i].join(""));
            }
        }

        let alphabetArray = ['  A  ', '  B  ', '  C  ', '  D  ', '  E  ', '  F  ', '  G  ', '  H  ', '  I  ', '  J  ', '  K  ', '  L  ', '  M  ', '  N  ', '  O  ', '  P  ', '  Q  ', '  R  ', '  S  ', '  T  '];
        let gameGrid = createGrid(21, 21, alphabetArray);
        displayGrid(gameGrid);
        return gameGrid;
    }
}

module.exports = Gameboard;