console.log("Welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/ali_mola_ali_dam_dam.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "ali_mola_ali_dam_dam", filePath: "songs/ali_mola_ali_dam_dam.mp3", coverPath: "cover/ns.jpg" },
    { songName: "hazarat_abbas", filePath: "songs/hazarat_abbas.mp3", coverPath: "cover/ns.jpg" },
    { songName: "hoga_ya_hussain_nadeem", filePath: "songs/hoga_ya_hussain_nadeem.mp3", coverPath: "cover/ns.jpg" },
    { songName: "mera_imam_hussain_2024", filePath: "songs/mera_imam_hussain_2024.mp3", coverPath: "cover/ns.jpg" },
    { songName: "mola_mola_noha.mp3", filePath: "songs/mola_mola_noha.mp3", coverPath: "cover/ns.jpg" },
    { songName: "salam_hussain_2020", filePath: "songs/salam_hussain_2020.mp3", coverPath: "cover/ns.jpg" },
    { songName: "salam_ullah", filePath: "songs/salam_ullah.mp3", coverPath: "cover/ns.jpg" },
];

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause for the master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events for song item play/pause
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0 || songIndex !== parseInt(e.target.id)) {
            makeAllPlays(); // Reset all play icons
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        } else {
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
    });
});

// Function to reset all play icons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// Listen to the progress bar change and sync the pause/play icon in songItem
myProgressBar.addEventListener('input', () => {
    // Sync progress bar with audio current time
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;

    // If the audio is playing, update the songItem play/pause icon to 'pause' for the current song
    if (!audioElement.paused) {
        const currentSongItem = document.getElementById(songIndex);
        if (currentSongItem) {
            currentSongItem.classList.remove('fa-play-circle');
            currentSongItem.classList.add('fa-pause-circle');
        }
    }
});

// Listen to the audioElement's timeupdate to update the progress bar and sync play/pause icon
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

    // If audioElement is paused, update the play icon in the songItem
    if (audioElement.paused) {
        const currentSongItem = document.getElementById(songIndex);
        if (currentSongItem) {
            currentSongItem.classList.remove('fa-pause-circle');
            currentSongItem.classList.add('fa-play-circle');
        }
    }
});

// Handle next song functionality
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 7) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// Handle previous song functionality
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});
