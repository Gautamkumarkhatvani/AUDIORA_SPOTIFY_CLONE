// Song data - you can match these names to your actual files
const songs = [
  { title: "On & On", file: "songs/1.mp3", cover: "covers/1.jpg" },
  { title: "Energy", file: "songs/2.mp3", cover: "covers/2.jpg" },
  { title: "Alive", file: "songs/3.mp3", cover: "covers/3.jpg" },
  { title: "Hope", file: "songs/4.mp3", cover: "covers/4.jpg" },
  { title: "Rise Up", file: "songs/5.mp3", cover: "covers/5.jpg" },
  { title: "Summer Time", file: "songs/6.mp3", cover: "covers/6.jpg" },
  { title: "Dreams", file: "songs/7.mp3", cover: "covers/7.jpg" },
  { title: "Chill Vibes", file: "songs/8.mp3", cover: "covers/8.jpg" },
  { title: "Epic Beat", file: "songs/9.mp3", cover: "covers/9.jpg" },
  { title: "Zen Mode", file: "songs/10.mp3", cover: "covers/10.jpg" }
];

let currentSongIndex = 0;
let audio = new Audio(songs[currentSongIndex].file);
let isPlaying = false;

// DOM Elements
const songListDiv = document.getElementById("songList");
const currentCover = document.getElementById("currentCover");
const currentTitle = document.getElementById("currentTitle");
const gif = document.getElementById("gif");
const playPauseBtn = document.getElementById("playPause");
const progressBar = document.getElementById("progressBar");

// Load songs into UI
songs.forEach((song, index) => {
  const songDiv = document.createElement("div");
  songDiv.classList.add("song-item");
  songDiv.innerHTML = `
    <img src="${song.cover}" alt="Cover" />
    <div class="song-title">${song.title}</div>
    <button class="play-btn" onclick="playSong(${index})">
      <i class="fas fa-play"></i>
    </button>
  `;
  songListDiv.appendChild(songDiv);
});

// Play a selected song
function playSong(index) {
  currentSongIndex = index;
  audio.src = songs[index].file;
  currentCover.src = songs[index].cover;
  currentTitle.textContent = songs[index].title;
  audio.play();
  gif.style.display = "inline";
  updatePlayPauseIcon(true);
  isPlaying = true;
}

// Toggle play/pause
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    gif.style.display = "none";
    updatePlayPauseIcon(false);
  } else {
    audio.play();
    gif.style.display = "inline";
    updatePlayPauseIcon(true);
  }
  isPlaying = !isPlaying;
});

// Update progress bar as song plays
audio.addEventListener("timeupdate", () => {
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress || 0;
});

// Seek song position
progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value * audio.duration) / 100;
});

// Update play/pause icon
function updatePlayPauseIcon(playState) {
  playPauseBtn.innerHTML = playState
    ? '<i class="fas fa-pause"></i>'
    : '<i class="fas fa-play"></i>';
}

// Prev/Next buttons
document.getElementById("prev").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
});

document.getElementById("next").addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
});
