document.addEventListener("DOMContentLoaded", function () {
  let burgerMenu = document.querySelector(".burger-menu");
  let menu = document.querySelector(".menu");

  burgerMenu.addEventListener("click", function () {
    menu.classList.toggle("open");
  });
});
