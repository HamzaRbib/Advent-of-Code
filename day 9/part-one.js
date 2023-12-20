const fs = require("fs")

function computeDifferences(values){
    const diffrences = []
    for (let i = 0; i < values.length - 1; i++){
        diffrences.push(values[i + 1] - values[i])
    }
    return diffrences
}

function extrapolat(values){
    if (values.every(value => value === 0)) return 0
    const extrapolatedValue = extrapolat(computeDifferences(values))
    return values[values.length - 1] + extrapolatedValue
}

function getResult(input){
    const values = input.map((line) => {
        return extrapolat(line.split(" ").map(v => parseInt(v)))
    })
    return values.reduce((s, v) => s + v)
}

const input = fs.readFileSync("input.txt", "utf8").split("\n")
console.log(getResult(input))