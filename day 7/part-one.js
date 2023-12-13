const fs = require("fs");
const collect = require("collect.js");

function getHandType(hand){
    const collection = collect(hand.split(""));
    const cards = collection.countBy();
    let type = "";
    for (let count of Object.values(cards.all()).sort().reverse()){
        if (count > 1){
            type += `${count}`;
        }
    }
    return type === "" ? "1" : type;
}

function compareHands(a, b){
    const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
    for (let i = 0; i < 5; i++){
        if (a[0][i] !== b[0][i]){
            let index_a = cards.indexOf(a[0][i]);
            let index_b = cards.indexOf(b[0][i]);
            return index_a - index_b;
        }
    }
    return false;
}

function getResult(hands){
    const handTypes = {
        5: [],
        4: [],
        32: [],
        3: [],
        22: [],
        2: [],
        1: [],
    }
    //adding hands to thier hand type
    for (const hand of hands){
        handTypes[getHandType(hand[0])].push(hand);
    }

    let size = hands.length;
    let result = 0;
    const handsStrenght = [5, 4, 32, 3, 22, 2, 1];
    for (let i of handsStrenght){
        for (let hand of handTypes[i].sort((a, b) => compareHands(a, b))){
            result += parseInt(hand[1]) * size;
            size--;
        }
    }
    return result;
}

const input = fs.readFileSync("exampleInput.txt", "utf8").split("\n").map((line) => line.split(" "));
console.log(getResult(input));