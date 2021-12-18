const image = document.querySelector("img"),
  title = document.querySelector("#title"),
  artist = document.querySelector("#artist"),
  music = document.querySelector("audio"),
  currentTimeEl = document.querySelector("#current-time"),
  durationEl = document.querySelector("#duration"),
  progress = document.querySelector("#progress"),
  progressContainer = document.querySelector("#progress-container"),
  prevBtn = document.querySelector("#prev"),
  playBtn = document.querySelector("#play"),
  nextBtn = document.querySelector("#next");

//   Music
const songs = [
  {
    name: "2pac-1",
    displayName: "All eyes on me",
    artist: "2Pac",
  },
  {
    name: "2pac-2",
    displayName: "California love",
    artist: "2Pac",
  },
  {
    name: "2pac-3",
    displayName: "Hit em up",
    artist: "2Pac",
  },
];

//   Check if Playing
let isPlaying = false;

//   Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause Event Listeners
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

loadSong(songs[songIndex]);

// Prev song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Calc display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    durationSeconds =
      durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;

    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    currentSeconds =
      currentSeconds < 10 ? `0${currentSeconds}` : `${currentSeconds}`;

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth,
    clickX = e.offsetX;

  const { duration } = music; // duration=music.duration
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
