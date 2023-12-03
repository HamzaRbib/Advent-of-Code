const fs = require("fs");

function getResult(input) {
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const value = input
    .trim()
    .split("\n")
    .map((line) => {
      const lineSplit = line.split(":");
      const gameId = lineSplit[0].split(" ")[1];
      const gameSets = lineSplit[1].trim().split(";");
      for (let set of gameSets) {
        const subSet = set.trim().split(",");
        for (let cube of subSet) {
          cube = cube.trim().split(" ");
          if (cube[0] > bag[cube[1]]) {
            return 0;
          }
        }
      }
      return Number(gameId);
    });
  return value.reduce((s, v) => s + v);
}

const input = fs.readFileSync("input.txt", "utf8");
console.log(getResult(input));
