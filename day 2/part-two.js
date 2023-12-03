const fs = require("fs");

function getResult(input) {
  const values = input
    .trim()
    .split("\n")
    .map((line) => {
      const minNum = {
        red: 0,
        green: 0,
        blue: 0,
      };
      const lineSplit = line.split(":");
      const gameSets = lineSplit[1].trim().split(";");
      for (let set of gameSets) {
        const subSet = set.trim().split(",");
        for (let cube of subSet) {
          cube = cube.trim().split(" ");
          minNum[cube[1]] = Math.max(minNum[cube[1]], cube[0]);
        }
      }
      return Object.values(minNum).reduce((p, v) => p * v, 1);
    });
  return values.reduce((s, v) => s + v);
}

const input = fs.readFileSync("input.txt", "utf8");
console.log(getResult(input));