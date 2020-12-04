var fs = require("fs");
const { connected } = require("process");
const { parse } = require("querystring");
var passportMaster = fs.readFileSync("./day4.txt").toString("utf-8");
var passportArr = passportMaster.split("Cut HERE");
var passportTest = fs.readFileSync("./day4Test.txt").toString("utf-8");
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
  workingArr.forEach((passport) => {
    if (Object.keys(passport).length === feilds.length) {
      credCheck(passport)
    }
    if (Object.keys(passport).length === 7 && !passport.cid) {
      credCheck(passport);
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
  if (byr >= 1920 && byr <= 2002) count++
  if (iyr >= 2010 && iyr <=2020) count++
  if(eyr >=2020 && eyr <=2030) count++
  if(eyeClr.includes(passport["ecl"])) count++
  if(pid.length === 9 && pid[0] === "0") count++
  if (hghtMes === "cm"){
    if(hghtQnt >= 150 && hghtQnt <= 193) count++
  } else if (hghtMes === "in"){
    if (hghtQnt >= 59 && hghtQnt <= 76) count++;
  }
  
  

  console.log(count, "credCheck")
}
// passportValidator(passportTestArr);

// passportValidator(passportArr);
passportValidatorDuex(passportTestArr)
