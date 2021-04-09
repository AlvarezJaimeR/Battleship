'Use Strict'
console.log('Hello World');

let createGrid = (width, height) => {
    let grid = [];
    let row = [];
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            row.push(" w ");
        }
        grid.push(row);
        row = [];
    }
    return (grid);
}

displayGrid = (grid) => {
    for (var i = 0; i < grid.length; i++) {
        console.log(grid[i].join(""));
    }
}

let gameGrid = createGrid(20, 20);
displayGrid(gameGrid);