const videoElement = document.querySelector("#video"),
  button = document.querySelector("#button");

// Prompt to select media stream, pass to video element, then play

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    //   Catch Error Here
    console.log("Error: ", error);
  }
}

button.addEventListener("click", async () => {
  // Disable Button
  button.disabled = true;
  //   Start picture in picture
  await videoElement.requestPictureInPicture();
  // Reset Button
  button.disabled = false;
});

selectMediaStream();
