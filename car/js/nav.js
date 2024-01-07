document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.getElementById("hamburger-menu");
  const nav__menuWrap = document.getElementById("nav__menuWrap");

  hamburgerMenu.addEventListener("click", function () {
    nav__menuWrap.classList.toggle("show");
  });
});
