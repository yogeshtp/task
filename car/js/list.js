document.querySelectorAll(".car-box__bid--expand").forEach((expand, index) => {
  expand.addEventListener("click", () => {
    const prevBids = document.querySelectorAll(".prev__bids")[index];
    prevBids.classList.toggle("active");
    prevBids.classList.toggle("unactive");
  });
});
// let exp__coll = document.querySelectorAll(".car-box__bid--expand")
// exp__coll.forEach((expand, index) => {
//   expand.addEventListener("click", () => {
//     const prevBids = document.querySelectorAll(".prev__bids")[index];

//     prevBids.classList.toggle("active");
//     prevBids.classList.toggle("unactive");

//
//     const isActive = exp__coll.classList.contains("active");

//
//     exp__coll.style.backgroundColor = isActive ? "brown" : "";
//   });
// });
