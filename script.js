console.log("Welcome To Tunes");
let songIndex = 0;
let audioElement = new Audio('tune/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif  = document.getElementById('gif');
let masterSongName  = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songs = [
    {songName:"Dynamite", filePath: "tune/1.mp3", coverPath:"images/1.png"},
    {songName:"song1", filePath: "tune/2.mp3", coverPath:"images/2.png"},
    {songName:"song2", filePath: "tune/3.mp3", coverPath:"images/3.png"},
    {songName:"Friend", filePath: "tune/4.mp3", coverPath:"images/4.png"},
    {songName:"Dynamite", filePath: "tune/5.mp3", coverPath:"images/1.png"},
    {songName:"Hi", filePath: "tune/6.mp3", coverPath:"images/2.png"},
    {songName:"New", filePath: "tune/7.mp3", coverPath:"images/3.png"},
    {songName:"World", filePath: "tune/8.mp3", coverPath:"images/4.png"}
]

songItems.forEach ((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
//Update seekbar
progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllPlays();
        masterSongName.innerText = songs[songIndex].songName;
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src= `tune/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=8){
        songIndex = 0
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `tune/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -=1;
    }
    audioElement.src = 'tune/5.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})