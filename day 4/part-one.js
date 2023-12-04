const fs = require("fs");

function getResult(input){
    const values = input.trim().split("\n").map((line) => {
        const game = line.trim().split(":");
        const gameCards = game[1].trim().split("|");
        const mainCard = gameCards[0].trim().split(" ");
        const scratchcards = gameCards[1].trim().split(" ");
        let point = 0;
        for (let number of mainCard){
            if (number !== "" && scratchcards.includes(number)){
                point = point === 0 ? 1 : point * 2;
            }
        }
        return point;
    })
    return values.reduce((s, v) => s + v);
}

const input = fs.readFileSync("input.txt", "utf8");
console.log(getResult(input));