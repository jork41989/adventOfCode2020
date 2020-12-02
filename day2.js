var fs = require("fs");
var passMaster = fs.readFileSync("./day2.txt").toString("utf-8");
var passArr = passMaster.split("\n")

let passValid = function (arr){
  let count = 0
  arr.forEach(pass => {
    let splt = pass.split(" ")
    let rangeSplt = splt[0].split("-")
    let high = rangeSplt[1]
    let low = rangeSplt[0]
    let letter = splt[1][0]
    let password = splt[2]
    let letCount = password.split(letter).length - 1;
    if (letCount <= high && letCount >= low){
      count++
    }
  });
  return count

}

let passValidDuex = function (arr){
  let count = 0;
  arr.forEach((pass) => {
    let splt = pass.split(" ");
    let rangeSplt = splt[0].split("-");
    let highIdx = rangeSplt[1];
    highIdx = parseInt(highIdx) - 1
    let lowIdx = rangeSplt[0];
    lowIdx = parseInt(lowIdx) - 1;
    let letter = splt[1][0];
    let password = splt[2];
    if (password[lowIdx] === letter && password[highIdx] != letter) {
        count++;
    } else if (password[highIdx] === letter && password[lowIdx] != letter) {
      count++;
    }
  });
  return count;
}

let testArr = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

console.log(passValid(passArr))
console.log(passValidDuex(passArr))