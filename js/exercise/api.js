// let xhttp = new XMLHttpRequest();

// xhttp.onreadystatechange = function () {
//   if (this.readyState == 4 && this.status == 200) {
//     console.log(this.responseText);
//   } else if (this.readyState == 4 && this.status == 404) {
//     console.log(this.responseText);
//   }
// };
// xhttp.open("GET", "https://icanhazdadjoke.com/", true);
// xhttp.send();

// fetch("https://dummyjson.com/posts/add", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     title: "I am in love with someone.",
//     userId: 5,
//   }),
// })
//   .then((res) => res.json())
//   .then(console.log);

var xhr = new XMLHttpRequest();
var url = "https://dummyjson.com/posts/add";

xhr.open("POST", url, true);
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4) {
    if (xhr.status == 200) {
      console.log(JSON.parse(xhr.responseText));
    } else {
      console.error("Error:", xhr.status);
    }
  }
};

var data = JSON.stringify({
  title: "I am in love with someone.",
  userId: 77,
  id: 99,
});

xhr.send(data);
