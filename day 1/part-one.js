const fs = require("fs");

function getResult(input){
    const values = input.trim().split("\n").map((line) => {
        const firstNumber = line.split('').find((v) => !Number.isNaN(Number(v)));
        const lastNumber = line.split('').findLast((v) => !Number.isNaN(Number(v)));

        return Number(firstNumber + lastNumber);
    });
    return values.reduce((s, v) => s + v);
}

const input = fs.readFileSync("exampleInput.txt", "utf8");
console.log(getResult(input));