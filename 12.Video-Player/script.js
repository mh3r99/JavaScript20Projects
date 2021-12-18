const player = document.querySelector(".player"),
  video = document.querySelector(".video"),
  progressRange = document.querySelector(".progress-range"),
  progressBar = document.querySelector(".progress-bar"),
  playBtn = document.querySelector("#play-btn"),
  volumeIcon = document.querySelector("#volume-icon"),
  volumeRange = document.querySelector(".volume-range"),
  volumeBar = document.querySelector(".volume-bar"),
  speed = document.querySelector(".player-speed"),
  currentTimeEl = document.querySelector(".time-elapsed"),
  durationEl = document.querySelector(".time-duration"),
  fullscreenBtn = document.querySelector(".fullscreen");

// Play & Pause ----------------------------------- //
function showPlayIcon() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    showPlayIcon();
  }
}

// Progress Bar ---------------------------------- //

// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

// Format current time, duration
function updateProgress() {
  const { currentTime, duration } = video;
  progressBar.style.width = `${(currentTime / duration) * 100}%`;
  currentTimeEl.textContent = `${displayTime(currentTime)} /`;
  durationEl.textContent = displayTime(duration);
}

// Click to seek within the video
function setProgress(e) {
  const width = progressRange.clientWidth;
  const clickX = e.offsetX;
  const duration = video.duration;

  video.currentTime = (clickX / width) * duration;
}

// Volume Controls --------------------------- //
let lastVolume = 1;

// Volume Bar
function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;
  // Rounding volume up or down
  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  // Change icon depending on volume
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }

  lastVolume = volume;
}

// Mute/Unmute
function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeIcon.classList.add("fas", "fa-volume-mute");
    volumeIcon.setAttribute("title", "Unmute");
    volumeBar.style.width = 0;
  } else {
    video.volume = lastVolume;
    volumeIcon.classList.add("fas", "fa-volume-up");
    volumeIcon.setAttribute("title", "Mute");
    volumeBar.style.width = `${lastVolume * 100}%`;
  }
}

// Change Playback Speed -------------------- //
function changeSpeed() {
  video.playbackRate = speed.value;
}

// Fullscreen ------------------------------- //
//  View in fullscreen
function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen");
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen");
}

let fullscreen = false;

// Toggle Fullscreen
function toggleFullscreen() {
  !fullscreen ? openFullscreen(player) : closeFullscreen();
  fullscreen = !fullscreen;
}

// Event Listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed);
fullscreenBtn.addEventListener("click", toggleFullscreen);
// On Video End, show play button icon
video.addEventListener("ended", showPlayIcon);
