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

/*     let test = this.gameboardOne.startGrid();
    this.displayGrid(test);
    test[1][3] = "  X  ";
    this.displayGrid(test); */
}

module.exports = Gameboard;