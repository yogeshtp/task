document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgermenu");
  const navElements = document.querySelectorAll(".hamburgermenu-data");
  const navbar = document.querySelectorAll("navbar");
  hamburgerBtn.addEventListener("click", function () {
    navElements.forEach(e =>{
        e.classList.toggle("mobile-nav");
    });
  });
});
