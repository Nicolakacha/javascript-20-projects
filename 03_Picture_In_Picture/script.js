const video = document.querySelector("video");
const btn = document.querySelector("button");

// Prompt to select media stream, ass to video, then play
async function selectStream() {
  try {
    // put the stream containing the live screen contents in the video
    video.srcObject = await navigator.mediaDevices.getDisplayMedia();
    //when video is loaded, then play the video
    video.onloadedmetadata = () => {
      video.play();
    };
  } catch (error) {
    console.log("whops, error here: ", error);
  }
}

btn.addEventListener('click', async ()=>{
  //disable the btn
  button,disabled = true;
  //start pip
  await video.requestPictureInPicture();
  //
  btn.disabled = false;
})

selectStream();
