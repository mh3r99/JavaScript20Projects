const menuBars = document.querySelector("#menu-bars"),
  overlay = document.querySelector("#overlay"),
  nav1 = document.querySelector("#nav-1"),
  nav2 = document.querySelector("#nav-2"),
  nav3 = document.querySelector("#nav-3"),
  nav4 = document.querySelector("#nav-4"),
  nav5 = document.querySelector("#nav-5");

const navItems = [nav1, nav2, nav3, nav4, nav5];

// Control Navigation Animation
function navAnimation(direction1, direction2) {
  navItems.forEach((nav, i) => {
    nav.classList.replace(
      `slide-${direction1}-${i + 1}`,
      `slide-${direction2}-${i + 1}`
    );
  });
}

function toggleNav() {
  //   Toggle: Menu Bars Open/Closed
  menuBars.classList.toggle("change");
  //   Toggle: Menu Active
  overlay.classList.toggle("overlay-active");
  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");

    // Animate In - Nav Items
    navAnimation("out", "in");
  } else {
    overlay.classList.replace("overlay-slide-right", "overlay-slide-left");

    // Animate Out - Nav Items
    navAnimation("in", "out");
  }
}

//   Event Listeners
menuBars.addEventListener("click", toggleNav);
navItems.forEach((nav) => nav.addEventListener("click", toggleNav));
