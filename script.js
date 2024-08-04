console.log("welcome to Spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Love Me Like You Do", filePath: "songs/1.mp3", coverPath: "covers/love.jpg"},
    {songName: "Come with Me", filePath: "songs/2.mp3", coverPath: "covers/come.webp"},
    {songName: "Ek Ladki Ko Dekha", filePath: "songs/3.mp3", coverPath: "covers/ek.webp"},
    {songName: "Tere Naal Menu", filePath: "songs/4.mp3", coverPath: "covers/1.webp"},
    {songName: "Tere Bin", filePath: "songs/5.mp3", coverPath: "covers/2.webp"},
    {songName: "Let Me Love You", filePath: "songs/6.mp3", coverPath: "covers/3.webp"},
];

//Setting song and cover
songItems.forEach((element, i) =>{
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => { 
    // Update SeekBar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);  
    myProgressBar.value = progress;
});

// // Allow seeking with the progress bar
myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});

//Playing song through small icon
const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })
}

//Playing song according to index
const playIndex = () =>{
    audioElement.src = `songs/${songIndex+1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.addEventListener('click', (e)=>{
        //console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.add('fa-circle-pause');
        e.target.classList.remove('fa-circle-play');
        masterSongName.innerText = songs[songIndex].songName;
        playIndex();
        gif.style.opacity = 1;
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 6){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    playIndex();
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    playIndex();
    gif.style.opacity = 1;
})