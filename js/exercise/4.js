"use strict";
let year = 2024;
const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
console.log(isLeapYear ? "Leap year" : "Not a leap year");
