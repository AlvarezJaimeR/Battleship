"use strict"

class Ship{
    constructor(name, size){
        this.name = name;
        this.size = size;
        this.spot = [];
    }
}

class Destroyer extends Ship{
    constructor(){
        super("Destroyer", 2);
    }
}

class Submarine extends Ship{
    constructor(){
        super("Submarine", 3);
    }
}

class Battleship extends Ship{
    constructor(){
        super("Battleship", 4);
    }
}

class AircraftCarrier extends Ship{
    constructor(){
        super("AircraftCarrier", 5);
    }
}

module.exports = {
    Destroyer: Destroyer,
    Submarine: Submarine,
    Battleship: Battleship,
    AircraftCarrier: AircraftCarrier
}