const fs = require("fs");

function getResult(input){
    const mapping = {};
    const directions = input[0];
    for (let i = 1; i < input.length; i++){
        const line = input[i].split("=");
        const address = line[0].trim();
        const distination = line[1].split(",");
        const dr1 = distination[0].trim().substring(1);
        const dr2 = distination[1].trim().substring(0, 3);
        mapping[address] = [dr1, dr2];
    }

    let index = 0;
    let counter = 0;
    let startingPoint = "AAA";
    while (startingPoint !== "ZZZ"){
        if (directions[index] === "L"){
            startingPoint = mapping[startingPoint][0];
        }else if (directions[index] === "R"){
            startingPoint = mapping[startingPoint][1];
        }
        index = (index + 1) % directions.length;
        counter++;
    }
    return counter;
}

const input = fs.readFileSync("input.txt", "utf8").split("\n");
input.splice(1, 1);
console.log(getResult(input));