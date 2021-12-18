const button = document.querySelector("#button"),
  audioElement = document.querySelector("#audio");

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  console.log("tell me:", joke);
  const jokeString = joke.trim().replace(/ /g, "%20");
  console.log(jokeString);
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    // Normally, don't write out API Keys like this, but an exception made here because it's free.
    key: "e985f868e96c46d9b0789c3855350152",
    src: jokeString,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist";
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }

    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
