console .log('welcome to spotify');
// initialize the variable
let songIndex = 0;
let audioElement = new Audio('./songs/mp3.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar"); 
let main = document.querySelector("Main");

let songs=[
    {songName:'song1', filepath:'./songs/mp1.mp3', coverPath:'./images/mp1.jpg'},
    {songName:'song2', filepath:'./songs/mp2.mp3', coverPath:'./images/mp2.jpg'},
    {songName:'song3', filepath:'./songs/mp3.mp3', coverPath:'./images/mp1.jpg'},
    {songName:'song4', filepath:'./songs/mp4.mp3', coverPath:'./images/mp2.jpg'},
    {songName:'song5', filepath:'./songs/mp5.mp3', coverPath:'./images/mp1.jpg'}
]

masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        main.classList.add('music_start');
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle');
        main.classList.remove('music_start');
    }
})

audioElement.addEventListener('timeupdate',()=>{
    console.log(`timeupdate:${audioElement.ontimeupdate}`);
    console.log(`time ${audioElement.currentTime}`);
    console.log(`duration ${audioElement.duration}`);

    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value=progress;
    console.log(progressBar);

});

progressBar.addEventListener('change',()=>{
    audioElement.currentTime=progressBar.value*audioElement.duration/100;
})
