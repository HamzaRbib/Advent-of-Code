const fs = require("fs");

function checkAdjacentSymbole(i, j, lines){
    const adjacentIndex = [[0, -1], [0, 1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    for (let index of adjacentIndex){
        if ((i + index[0] >= 0 && i + index[0] < lines.length) && (j + index[1] >= 0 && j + index[1] < lines.length)){
            if (lines[i + index[0]][j + index[1]] === "*"){
                return {result: true, index: [i + index[0], j + index[1]]};
            }
        }
    }
    return {result: false};
}

function checkGear(index, gearTemp){
    for (let i = 0; i < gearTemp.length; i++){
        if (gearTemp[i].starIndex[0] === index[0] && gearTemp[i].starIndex[1] === index[1]){
            return Number(gearTemp[i].number);
        }
    }
    return 0;
}

function getResult(input){
    const lines = input.trim().split("\n");
    let result = 0;
    const gearTemp = [];
    for (let i = 0; i < lines.length; i++){
        let currentNumber = {number: "", isPartNumber: false, starIndex: [0, 0]};
        for (let j = 0; j < lines[i].length; j++){
            if (!Number.isNaN(Number(lines[i][j]))){
                currentNumber.number += lines[i][j];
                const adj = checkAdjacentSymbole(i, j, lines);
                if (adj.result){
                    currentNumber.isPartNumber = true;
                    currentNumber.starIndex = adj.index;
                }
                continue;
            }
            if (currentNumber.isPartNumber){
                let gear = checkGear(currentNumber.starIndex, gearTemp);
                result += Number(currentNumber.number) * gear;
                gearTemp.push({...currentNumber});
            }
            currentNumber.number = "";
            currentNumber.isPartNumber = false;
            currentNumber.starIndex = [0, 0];
        }
        if (currentNumber.isPartNumber){
            let gear = checkGear(currentNumber.starIndex, gearTemp);
            result += Number(currentNumber.number) * gear;
            gearTemp.push({...currentNumber});
        }
    }
    return result;
}

const input = fs.readFileSync("input.txt", "utf8");
console.log(getResult(input));