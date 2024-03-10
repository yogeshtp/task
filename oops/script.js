"use strict";

const Person = function (firstname, birthYear) {
  this.firstname = firstname;
  this.birthYear = birthYear;
};

const jonas = new Person("jonAs", 1991);
console.log(jonas);

const yogesh = new Person("yogesh", 2001);
console.log(yogesh);

// prototype
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
Person.prototype.species = "gay";

console.log(jonas.species, yogesh);
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
