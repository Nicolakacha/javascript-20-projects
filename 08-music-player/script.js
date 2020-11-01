const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const music = document.querySelector('audio');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');
const prev = document.querySelector('#prev');
const play = document.querySelector('#play');
const next = document.querySelector('#next');

// Music
const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven',
    artist: 'Jacinto Design',
  },
  {
    name: 'jacinto-3',
    displayName: 'Cool Song',
    artist: 'Jacinto Design',
  },
  {
    name: 'metric-1',
    displayName: 'Woo',
    artist: 'Jacinto Design',
  },
]


// Check if playing
let isPlaying = false;

// Play
function playSong() {
  music.play();
  play.classList.replace('fa-play', 'fa-pause');
  play.setAttribute('title', 'Pause');
  isPlaying = true;
}

// Pause
function pauseSong() {
  music.pause();
  play.classList.replace('fa-pause', 'fa-play');
  play.setAttribute('title', 'Play');
  isPlaying = false;
}

// Play or Pause
play.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
function preSong() {
  songIndex--;
  if (songIndex < 0 ) {
    songIndex = songs.length -1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length -1 ) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On load - Select First Song
loadSong(songs[songIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime} = e.srcElement;
    // update width
    const progressPercent = ( currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Cal display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // delay switching duration to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Cal display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}


// Event Listeners
prev.addEventListener('click', preSong);
next.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);