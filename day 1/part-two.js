const fs = require("fs");

function getResult(input) {
  const numLetters = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };
  const values = input
    .trim()
    .split("\n")
    .map((line) => {
      const firstNumberLetter = [];
      const lastNumberLetter = [];
      for (let numLetter of Object.keys(numLetters)) {
        let firstIndex = line.indexOf(numLetter);
        let lastIndex = line.lastIndexOf(numLetter);
        if (firstIndex !== -1) {
          firstNumberLetter.push([firstIndex, numLetters[numLetter]]);
        }
        if (lastIndex !== -1) {
          lastNumberLetter.push([lastIndex, numLetters[numLetter]]);
        }
      }
      firstNumberLetter.sort((pair1, pair2) => pair1[0] - pair2[0]);
      lastNumberLetter.sort((pair1, pair2) => pair2[0] - pair1[0]);
      return firstNumberLetter[0][1] * 10 + lastNumberLetter[0][1];
    });
    return values.reduce((s, v) => s + v);
}

const input = fs.readFileSync("input.txt", "utf8");
console.log(getResult(input));
