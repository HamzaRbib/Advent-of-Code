const fs = require("fs");
const collect = require("collect.js");

function getHandType(hand) {
  const collection = collect(hand.split(""));
  const cards = collection.countBy();

  let type = "";
  let jokerNumber = 0;
  for (let [card, count] of Object.entries(cards.all())) {
    if (card === "J") {
      jokerNumber = count;
      continue;
    }
    if (count > 1) {
      type += count;
    }
  }
  if (jokerNumber === 5) return "5";
  return type === ""
    ? (jokerNumber + 1).toString()
    : (parseInt(type) + jokerNumber).toString();
}

function compareHands(a, b) {
  const cards = [
    "A",
    "K",
    "Q",
    "T",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "J",
  ];
  for (let i = 0; i < 5; i++) {
    if (a[0][i] !== b[0][i]) {
      let index_a = cards.indexOf(a[0][i]);
      let index_b = cards.indexOf(b[0][i]);
      return index_a - index_b;
    }
  }
  return false;
}

function getResult(hands) {
  const handTypes = {
    5: [],
    4: [],
    32: [],
    3: [],
    22: [],
    2: [],
    1: [],
  };
  //adding hands to thier hand type
  for (const hand of hands) {
    let index = getHandType(hand[0]);
    if (index === "23") {
      index = "32";
    }
    handTypes[index].push(hand);
  }

  let size = hands.length;
  let result = 0;
  const handsStrenght = [5, 4, 32, 3, 22, 2, 1];
  for (let i of handsStrenght) {
    for (let hand of handTypes[i].sort((a, b) => compareHands(a, b))) {
      result += parseInt(hand[1]) * size;
      size--;
    }
  }
  return result;
}

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((line) => line.split(" "));
console.log(getResult(input));
