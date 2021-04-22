"use strict"

const Gameboard = require('./gameboard');
const prompt = require('prompt-sync')();

class Player {
    constructor(name){
        this.score = 0;
        this.name = name;
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
        userValidation(userOppChoice, validationMessage){
            var letterCheck = /^[A-Za-z]+$/;
            if (userOppChoice==null || userOppChoice=="")
            {
                console.log(validationMessage);
                return false;
            }
            else if (!userOppChoice.match(letterCheck))
            {
                console.log("Choice must contain letters only!");
                console.log(validationMessage);
                return false;
            }
            else {
                return true;
            }
        }
}

module.exports = Player;