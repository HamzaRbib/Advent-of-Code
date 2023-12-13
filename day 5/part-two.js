const fs = require("fs");

function getResult(input, seed, range) {
  for (let i = 0; i < range; i++) {
    const currentCategoryNumbers = [seed + i];
    for (let j = 1; j < input.length; j++) {
      const typeValues = input[j]
        .substring(input[j].indexOf("\n") + 1)
        .split("\n");
      for (let line of typeValues) {
        const values = line
          .trim()
          .split(" ")
          .map((num) => parseInt(num));
        if (
          values[1] <=
            currentCategoryNumbers[currentCategoryNumbers.length - 1] &&
          values[1] + values[2] >=
            currentCategoryNumbers[currentCategoryNumbers.length - 1]
        ) {
          currentCategoryNumbers.push(
            values[0] +
              (currentCategoryNumbers[currentCategoryNumbers.length - 1] -
                values[1])
          );
          console.log(currentCategoryNumbers);
          break;
        }
      }
    }
    minLocation = Math.min(
      minLocation,
      currentCategoryNumbers[currentCategoryNumbers.length - 1]
    );
  }
  return minLocation;
}

const input = fs.readFileSync("exampleInput.txt", "utf8").split("\n\n");
const seeds = input[0].split(":")[1].trim().split(" ");
let minLocation = Infinity;
for (let i = 0; i < seeds.length; i += 2) {
  minLocation = Math.min(
    minLocation,
    getResult(input, parseInt(seeds[i]), parseInt(seeds[i + 1]))
  );
}

console.log(minLocation);
