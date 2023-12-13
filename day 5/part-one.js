const fs = require("fs");

function getResult(input) {
  const numbersOfEachType = [];
  // adding seeds to the resulting array
  input[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .forEach((seed) => {
      numbersOfEachType.push([parseInt(seed)]);
    });
  // iterating through each map
  for (let i = 1; i < input.length; i++) {
    const typeValues = input[i]
      .substring(input[i].indexOf("\n") + 1)
      .split("\n");
      // each seed we need to get its corresponding map values
    for (let j = 0; j < numbersOfEachType.length; j++) {
      let flag = false;  
      for (let line of typeValues) {
        const values = line.trim().split(" ").map((num) => parseInt(num));
        if (
          values[1] <= numbersOfEachType[j][numbersOfEachType[j].length - 1] &&
          values[1] + values[2] >=
            numbersOfEachType[j][numbersOfEachType[j].length - 1]
        ) {
            numbersOfEachType[j].push(values[0] + (numbersOfEachType[j][numbersOfEachType[j].length - 1] - values[1]));
            flag = true;
            break;
        }
      }
      if (!flag){
        numbersOfEachType[j].push(numbersOfEachType[j][numbersOfEachType[j].length - 1]);
      }
    }
  }
  return Math.min(...numbersOfEachType.map((arr) => arr[arr.length - 1]));
}

const input = fs.readFileSync("input.txt", "utf8").split("\n\n");
console.log(getResult(input));
