const fs = require("fs");

function checkAdjacentSymbole(i, j, lines){
    const adjacentIndex = [[0, -1], [0, 1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (let index of adjacentIndex){
        if ((i + index[0] >= 0 && i + index[0] < lines.length) && (j + index[1] >= 0 && j + index[1] < lines.length)){
            if ("#$%&/?+-*!=@".includes(lines[i + index[0]][j + index[1]])){
                return true;
            }
        }
    }
    return false;
}

function getResult(input){
    const lines = input.trim().split("\n");
    let result = 0;
    for (let i = 0; i < lines.length; i++){
        const currentNumber = {number: "", isPartNumber: false};
        for (let j = 0; j < lines[i].length; j++){
            if (!Number.isNaN(Number(lines[i][j]))){
                currentNumber.number += lines[i][j];
                if (checkAdjacentSymbole(i, j, lines)){
                    currentNumber.isPartNumber = true;
                }
                continue;
            }
            if (currentNumber.isPartNumber){
                result += Number(currentNumber.number);
            }
            currentNumber.number = "";
            currentNumber.isPartNumber = false;
        }
        if (currentNumber.isPartNumber){
            result += Number(currentNumber.number);
        }
    }
    return result;
}

const input = fs.readFileSync("input.txt", "utf8");
console.log(getResult(input));