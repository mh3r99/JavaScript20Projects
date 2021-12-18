const toggleSwitch = document.querySelector("input[type='checkbox']"),
  nav = document.querySelector("#nav"),
  toggleIcon = document.querySelector("#toggle-icon"),
  image1 = document.querySelector("#image1"),
  image2 = document.querySelector("#image2"),
  image3 = document.querySelector("#image3"),
  textBox = document.querySelector("#text-box");

// Dark or Light Images
function imageMode(color) {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function toggleThemeMode(isDark) {
  nav.style.backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
  textBox.style.backgroundColor = isDark
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";

  toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Light Mode";
  isDark
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  isDark ? imageMode("dark") : imageMode("light");
}

// //  Dark Mode Styles
// function darkMode() {
//   nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
//   textBox.style.backgroundColor = "rgb(255 255 255 / 50%)";
//   toggleIcon.children[0].textContent = "Dark Mode";
//   toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
//   imageMode("dark");
// }

// //Light Mode Styles
// function lightMode() {
//   nav.style.backgroundColor = "rgb(255 255 255 / 50%)";
//   textBox.style.backgroundColor = "rgb(0 0 0 / 50%)";
//   toggleIcon.children[0].textContent = "Light Mode";
//   toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
//   imageMode("light");
// }

// Switch Theme Dynamically
function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    // darkMode();
    toggleThemeMode(true);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    // lightMode();
    toggleThemeMode(false);
    localStorage.setItem("theme", "light");
  }
}

// Event Listener
toggleSwitch.addEventListener("change", switchTheme);

// Check Local Storage For Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    // darkMode();
    toggleThemeMode(true);
  }
}
