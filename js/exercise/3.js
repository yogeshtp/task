// Write a JavaScript program to rotate the string 'w3resource' in the right direction. This is done by periodically removing one letter from the string end and attaching it to the front.
// "use strict";
let str = "w3resource".split("");
revStr = [];
for (let i = 0; i < str.length; i++) {
  revStr.unshift(str[i]);
}
console.log(revStr.join(""));
