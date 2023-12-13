const fs = require("fs");

function getResult(input){
    const data = input.map((line) => {
        return line.split(":")[1].trim().split(" ").filter(elem => elem !== "");
    })
    const values = [];
    for (let i = 0; i < data[0].length; i++){
        let numOfWinings = 0;
        let currentTime = parseInt(data[0][i]);
        while (currentTime > 0){
            let distance = currentTime * (parseInt(data[0][i]) - currentTime);
            if (distance > parseInt(data[1][i])){
                numOfWinings++;
            }
            currentTime--;
        }
        values.push(numOfWinings);
    }
    return values.reduce((p, v) => p * v, 1);
}

const input = fs.readFileSync("exampleInput.txt", "utf8").trim().split("\n");
console.log(getResult(input));