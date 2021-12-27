window.onscroll = function () {
  var scroll = window.scrollY;
  var navbar = document.getElementById("navbar_top");
  if (scroll > 160) {
    navbar.classList.remove("main-header");
    navbar.classList.add("main-header-sticky");
  } else {
    navbar.classList.remove("main-header-sticky");
    navbar.classList.add("main-header");
  }
};
