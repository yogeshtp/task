var productPages = document.getElementById("product__pages");
productPages.addEventListener("click", function (event) {
  if (event.target.classList.contains("pagination__page")) {
    var allSpans = productPages.getElementsByClassName("pagination__page");
    for (var i = 0; i < allSpans.length; i++) {
      allSpans[i].classList.remove("pagination-active");
    }
    event.target.classList.add("pagination-active");
  }
});
