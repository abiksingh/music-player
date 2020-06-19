const musicContainer = document.getElementById('music_container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress_container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//Song titile
const songs = ['Lakeside', 'Friends', 'Whenever'];

//Keep track of song
let songIndex = 2

//Initial songs 
loadSong(songs[songIndex]);


//Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.wav`;
    cover.src = `images/${song}.jpg`;
}


//Play song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();  
}

//Pasue song
//Play song
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();  
}





// Event Listeners
playBtn.addEventListener('click', ()=> {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying){
        pauseSong();
    } else {
        playSong();
    }
});


// Prev Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
}


// Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1 ){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}

//Update progress bar
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/ duration) * 100;
    progress.style.width = `${progressPercent}%`
}


// Set progress bar
function setProgress(e){
    const width = this.clientWidth;

    const clickX = e.offsetX;

    const duration = audio.duration;

    audio.currentTime = (clickX/ width) * duration;
}



//Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// Time/ song update or songs bar function
audio.addEventListener('timeupdate', updateProgress);


// Click on progress bar
progressContainer.addEventListener('click', setProgress);


// switch to next song when a song ends
audio.addEventListener('ended', nextSong);

