// // Write a JavaScript program to display the current day and time in the following format.
// // Sample Output : Today is : Tuesday.
// // Current time is : 10 PM : 30 : 38

day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
console.log(`Today is :  ${day[new Date().getDay()]}`);
console.log(
  `${new Date().toLocaleString("en-IN", {
    hour: "numeric",
    hour12: true,
  })} : ${new Date().getMinutes()}:${new Date().getSeconds()} `
);

// var dateWithoutSecond = new Date();
// dateWithoutSecond.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second:'2-digit'});
