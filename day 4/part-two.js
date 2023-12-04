const fs = require("fs");

function getResult(input){
    const numberOfCopies = [];
    const values = input.trim().split("\n").map((line) => {
        const game = line.trim().split(":");
        const gameCards = game[1].trim().split("|");
        const mainCard = gameCards[0].trim().split(" ");
        const scratchcards = gameCards[1].trim().split(" ");
        let point = 0;
        let instances = 0;
        for (let number of mainCard){
            if (number !== "" && scratchcards.includes(number)){
                point += 1;
            }
        }
        for (let numCopy of numberOfCopies){
            if (numCopy[0] > 0){
                instances += numCopy[1];
                numCopy[0] -= 1;
            }
        }
        numberOfCopies.push([point, instances + 1]);
        return instances + 1;
    });
    return values.reduce((s, v) => s + v);
}

const input = fs.readFileSync("input.txt", "utf8");
console.log(getResult(input));