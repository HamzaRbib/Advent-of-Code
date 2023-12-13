const fs = require("fs");

function gcd(a, b){
    if (a === 0) return b;
    return gcd(b % a, a);
}

function lcm(a, b){
    return (a * b) / gcd(a, b);
}

function getResult(input){
    const mapping = {};
    const directions = input[0];
    let startingPoint = []; 
    for (let i = 1; i < input.length; i++){
        const line = input[i].split("=");
        const address = line[0].trim();
        const distination = line[1].split(",");
        const dr1 = distination[0].trim().substring(1);
        const dr2 = distination[1].trim().substring(0, 3);
        if (address[2] === "A") startingPoint.push(address);
        mapping[address] = [dr1, dr2];
    }

    for (let i = 0; i < startingPoint.length; i++){
        let index = 0;
        let counter = 0;
        while (startingPoint[i][2] !== "Z"){
            if (directions[index] === "L"){
                startingPoint[i] = mapping[startingPoint[i]][0];
            }else{
                startingPoint[i] = mapping[startingPoint[i]][1];
            }
            index = (index + 1) % directions.length;
            counter++;
        }
        startingPoint[i] = counter;
    }
    return startingPoint.reduce(lcm, startingPoint[0]);
}

const input = fs.readFileSync("input.txt", "utf8").split("\n");
input.splice(1, 1);
console.log(getResult(input));