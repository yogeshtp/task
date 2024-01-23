const filterBtn = document.getElementById("mob__filter--btn");
filterBtn.addEventListener("click", function () {
  document
    .getElementById("listings__filter")
    .classList.toggle("mob__filter--unactive");
});


