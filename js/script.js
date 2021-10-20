console .log('welcome to spotify');
let songs=[
    {songName:'Enna Sona - OK Jaanu', filepath:'./songs/mp1.mp3'},
    {songName:'Ban Ja Rani - Tumhari Sulu', filepath:'./songs/mp2.mp3'},
    {songName:'Nazm Nazm - Bareilly Ki Barfi', filepath:'./songs/mp3.mp3'},
    {songName:'Lambiyaan Si Judaiyan - Raabta', filepath:'./songs/mp4.mp3'},
    {songName:'Aaj Din Chadheya - Love Aaj Kal', filepath:'./songs/mp5.mp3'}
]

// initialize the variable
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar"); 
let main = document.querySelector("Main");
let songList = document.querySelector('.songList');
let forward = document.getElementById('forward');
let backward = document.getElementById('backward');

let isPlaying=true;
let i=0;
let audio;

songs.forEach((val,index)=>{
    songList.insertAdjacentHTML(
        'afterbegin',
        `
        <div class="list">
        <span>${val.songName}</span>
        <span class="songlistplay">
        <span class="timestamp">05:34</span>
        <i class="fas fa-play-circle"></i>
        </span>
    </div>`
    );
})

const playMusic=()=>{
    isPlaying=false;
    masterPlay.classList.replace('fa-play-circle','fa-pause-circle')
    audio=new Audio(songs[i].filepath);
    audio.play();
    highlight(i);
    audio.addEventListener('timeupdate',()=>{
        progress=parseInt((audio.currentTime/audio.duration)*100);
        progressBar.value=progress;
    });

}

const pauseMusic=(indexNumber)=>{
    isPlaying=true;
    masterPlay.classList.replace('fa-pause-circle','fa-play-circle')
    audio.pause();
}

masterPlay.addEventListener("click",()=>{
    isPlaying?playMusic(i):pauseMusic();
}); 


const nextSong=()=>{
    i=(i+1)%songs.length;
    pauseMusic();
    playMusic(i);
    highlight(i);
}
  
const prevSong=()=>{
    i=(i - 1 + songs.length)%songs.length;
    pauseMusic();
    playMusic(i);
    highlight(i);
}

const highlight=(i)=>{
    let songitem = document.querySelectorAll('.songList .list');
    let getSiblings=(e)=>{
        let siblings = []; 
        // if no parent, return no sibling
        if(!e.parentNode) {
            return siblings;
        }
     // first child of the parent node
        let sibling  = e.parentNode.firstChild;
        while (sibling) {
            if (sibling.nodeType === 1 && sibling !== e) {
                siblings.push(sibling);
            }
            sibling = sibling.nextSibling;
        }
        return siblings;
        
    }

    songitem[i].classList.add('highlight');
    let siblings = getSiblings(songitem[i]);
    siblingText = siblings.map(e => e);
    siblingText.forEach((value,index)=>{
        value.classList.remove('highlight');
    })

}

progressBar.addEventListener('change',()=>{
    audio.currentTime=progressBar.value*audio.duration/100;
});


forward.addEventListener("click",nextSong); 
backward.addEventListener("click",prevSong);