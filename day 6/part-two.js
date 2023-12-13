const fs = require("fs");

function getResult(input){
    const data = input.map((line) => {
        return line.split(":")[1].trim().split(" ").filter(elem => elem !== "");
    });

    let time = parseInt(data[0].reduce((s, v) => s + v));
    const maxDistance = parseInt(data[1].reduce((s, v) => s + v));

    let numOfWinings = 0;
    let counter = 0;
    while (time > 0){
        let distance = time * counter;
        if (distance > maxDistance){
            numOfWinings++;
        }
        time--;
        counter++;
    }
    return numOfWinings;
}

const input = fs.readFileSync("input.txt", "utf8").split("\n");
console.log(getResult(input));