// Write a JavaScript program to calculate the days left before Christmas.
let chriDate = new Date("December 25, 2024");
curr = new Date();
console.log(Math.ceil((chriDate - curr) / 86400000));
