const inputContainer = document.querySelector("#input-container"),
  countdownForm = document.querySelector("#countdownForm"),
  dataEl = document.querySelector("#date-picker"),
  countdownEl = document.querySelector("#countdown"),
  countdownElTitle = document.querySelector("#countdown-title"),
  countdownBtn = document.querySelector("#countdown-button"),
  timeElements = document.querySelectorAll("span"),
  completeEl = document.querySelector("#complete"),
  completeElInfo = document.querySelector("#complete-info"),
  completeBtn = document.querySelector("#complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60; // 1000*60
const hour = minute * 60; // 1000*60*60
const day = hour * 24; // 1000*60*60*24

//   Set Date Input Min with Today's Date
const today = new Date().toLocaleDateString().split(".").reverse().join("-");
// 2021-11-27
dataEl.setAttribute("min", today);

// Populate Countdown / Complete UI
function updateDOM() {
  countdownActive = setInterval(() => {
    const now = new Date();

    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //   Hide Input
    inputContainer.hidden = true;

    // If the countdown has ended, show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      // Else, show the countdown in progress

      //   Populate Countdown
      countdownElTitle.textContent = countdownTitle;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;

      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

// Take Values Form Input
function updateCountDown(e) {
  e.preventDefault();

  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;

  if (countdownDate) {
    savedCountdown = {
      title: countdownTitle,
      date: countdownDate,
    };

    localStorage.setItem("countdown", JSON.stringify(savedCountdown));
  }

  // Check for valid date
  if (countdownDate === "") {
    alert("Please select a date for the countdonw");
  } else {
    //   Get number version of current Date, updateDOM
    countdownValue = new Date(`${countdownDate} 00:00:00`);

    updateDOM();
  }
}

// Reset All Values
function reset() {
  // Hide Countdowns, show Input
  countdownEl.hidden = true;
  inputContainer.hidden = false;

  completeEl.hidden = true;

  // Stop the countdown
  clearInterval(countdownActive);

  // Reset values
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

// Get countdown from LocaleStorage
function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem("countdown"));

    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;

    countdownValue = new Date(`${countdownDate} 00:00:00`);

    updateDOM();
  }
}

// Event Listeners
countdownForm.addEventListener("submit", updateCountDown);
countdownBtn.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);

// On load, check localStorage
restorePreviousCountdown();
