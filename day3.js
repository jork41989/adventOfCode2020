var fs = require("fs");
var hillMaster = fs.readFileSync("./day3.txt").toString("utf-8");
var hillArr = hillMaster.split("\n");
var hillTest = fs.readFileSync("./day3Test.txt").toString("utf-8");
var hillTestArr = hillTest.split("\n");


let treeCount = function (hill) {
  let row = 0
  let col = 0
  let count = 0
  let maxLen = hill[0].length - 1;
  console.log(hill[0].length)
  while (row < hill.length){
    let curIdx = hill[row][col]
    console.log(row, col, curIdx)
    if(curIdx === "#"){
      count++
    }
    row++
    let newLen = col + 3
    if (newLen > maxLen){
      col = newLen - maxLen - 1
      console.log(newLen, col)
    } else {
      col = newLen
    }
  }
  return count
}

let treeCountDuex = function (hill, colInc, rowInc) {
  let row = 0;
  let col = 0;
  let count = 0;
  let maxLen = hill[0].length - 1;
  console.log(hill[0].length);
  while (row < hill.length) {
    let curIdx = hill[row][col];
    console.log(row, col, curIdx);
    if (curIdx === "#") {
      count++;
    }
    row = rowInc + row;
    let newLen = col + colInc;
    if (newLen > maxLen) {
      col = newLen - maxLen - 1;
      console.log(newLen, col);
    } else {
      col = newLen;
    }
  }
  return count;
};

let totalPossibleTreeCount = function (hill, arr){
  totals = []
  arr.forEach(inc => {
    totals.push(treeCountDuex(hill, inc[0], inc[1]))
  });
  output = totals[0]
  for(let i = 1; i < totals.length; i++){
    output = totals[i] * output
  }
  return output
}


let incArr = [
  [1,1],
  [3,1],
  [5,1],
  [7,1],
  [1,2]
]

console.log(totalPossibleTreeCount(hillArr, incArr))
