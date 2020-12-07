var fs = require("fs");
const { connected } = require("process");
const { parse } = require("querystring");
var passportMaster = fs.readFileSync("./day4.txt").toString("utf-8");
var passportArr = passportMaster.split("Cut HERE");
var passportTest = fs.readFileSync("./day4Part2Test.txt").toString("utf-8");
var passportTestArr = passportTest.split("Cut Here");

let formatter = function (list) {
  let checkArr = [];
  list.forEach((passport) => {
    let newObj = {};
    let spceSplt = passport.split(" ");
    spceSplt.forEach((cat) => {
      if (cat != " ") {
        let item = cat.split(":");
        if (item[1]) {
          newObj[item[0]] = item[1];
        }
      }
    });
    checkArr.push(newObj);
  });
  return checkArr;
};

let passportValidator = function (passportList) {
  let workingArr = formatter(passportList);
  let feilds = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid', 'cid']
  let count = 0;
  console.log(workingArr)
  workingArr.forEach(passport =>{
    console.log(Object.keys(passport).length, feilds.length, passport);
   if(Object.keys(passport).length === feilds.length) count++
   if(Object.keys(passport).length === 7 && !passport.cid) count++
  }) 
  console.log(count)
};

let passportValidatorDuex = function (passportList) {

  let workingArr = formatter(passportList);
  let feilds = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid", "cid"];
  let count = 0;
  let check1 = 0
  console.log(workingArr)
  workingArr.forEach((passport) => {
    if (Object.keys(passport).length === feilds.length) {
      check1++
     if (credCheck(passport)) count++
    }
    if (Object.keys(passport).length === 7 && !passport.cid) {
      check1++
      if (credCheck(passport)) count++
    }
  });
  console.log(count, "extCount");
}

let credCheck = function (passport){
  let count = 0
  let eyeClr = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
  let byr = parseInt(passport["byr"]);
  let iyr =  parseInt(passport["iyr"]);
  let eyr = parseInt(passport["eyr"]);
  let pid = passport["pid"];
  let hghtMes = passport["hgt"].slice(-2);
  let hghtQnt = passport["hgt"].slice(0,-2);
  let hcl = passport["hcl"]
  let alphaNum = "abcdefghijklmnopqrstuvwxyz1234567890";
  if (byr >= 1920 && byr <= 2002) {
    count++
    console.log("pass byr")
  }
  if (iyr >= 2010 && iyr <=2020){
    count++;
    console.log("pass iyr");
  }
  if(eyr >=2020 && eyr <=2030) {
    count++;
    console.log("pass eyr");
  }
  if(eyeClr.includes(passport["ecl"])) {
    count++;
    console.log("pass ecl");
  }
  if(pid.length === 9) {
    count++;
    console.log("pass pid");
  } else {
    console.log(pid)
  }
  if (hghtMes === "cm"){
    if(hghtQnt >= 150 && hghtQnt <= 193) count++
  } else if (hghtMes === "in"){
    if (hghtQnt >= 59 && hghtQnt <= 76) count++;
  }
  if (hcl[0]=== "#"){
    if (hcl.slice(1).length === 6){
      let clear = true
      let splt = hcl.slice(1).split("")
      splt.forEach(char => {
        if (!alphaNum.includes(char)) clear = false
      })
      if (clear) count++
    }
  }

  console.log(count)  
  if (count === 7) {
    console.log(passport)
    return true
  }
}
// passportValidator(passportTestArr);

// passportValidator(passportArr);
passportValidatorDuex(passportArr)
