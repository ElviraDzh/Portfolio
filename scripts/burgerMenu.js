document.addEventListener('DOMContentLoaded', function() {
    var burgerMenu = document.querySelector('.burger-menu');
    var menu = document.querySelector('.menu');

    burgerMenu.addEventListener('click', function() {
      menu.classList.toggle('open');
    });
  });
