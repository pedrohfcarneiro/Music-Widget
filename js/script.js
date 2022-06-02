const playerWrapper = document.querySelector(".playerWrapper"),
musicIMG = playerWrapper.querySelector(".img-area img"),
musicName = playerWrapper.querySelector(".song-details .name"),
musicArtist = playerWrapper.querySelector(".song-details .artist"),
mainAudio = playerWrapper.querySelector("#main-audio"),
playPauseBtn = playerWrapper.querySelector(".play-pause"),
nextBtn = playerWrapper.querySelector("#next"),
prevBtn = playerWrapper.querySelector("#prev"),
progressBar = playerWrapper.querySelector(".progress-bar"),
progressArea = playerWrapper.querySelector(".progress-area"),
musicList = playerWrapper.querySelector(".music-list"),
showMoreBtn = playerWrapper.querySelector("#queue-music"),
hideMoreBtn = playerWrapper.querySelector("#close");


let musicIndex = Math.floor((Math.random() * allMusic.length) + 1); //First music to play

window.addEventListener("load", () => {
    mainAudio.volume = 0.07;
    loadMusic(musicIndex);
    let musicCurrentTime = playerWrapper.querySelector(".current"),
    musicDuration = playerWrapper.querySelector(".duration");
    mainAudio.addEventListener("loadeddata", () => {

        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    playingNow();
})

//function for loading music
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicIMG.src = `imgs/${allMusic[indexNumb - 1].img}`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;
}

function playMusic() {
    playerWrapper.classList.add("playing");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
    playingNow();
}

function pauseMusic() {
    playerWrapper.classList.remove("playing");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

function nextMusic() {
    musicIndex++;
    //if music index is greater than allMusic array length then return to first index
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

//play or pause button event
playPauseBtn.addEventListener("click", () => {
    const isMusicPlaying = playerWrapper.classList.contains("playing");
    isMusicPlaying ? pauseMusic() : playMusic();
})

nextBtn.addEventListener("click", () => {
    nextMusic();
})

prevBtn.addEventListener("click", () => {
    prevMusic();
})

mainAudio.addEventListener("timeupdate", (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = playerWrapper.querySelector(".current"),
    musicDuration = playerWrapper.querySelector(".duration");

    //Adding event listener every timeupdate??? why don't add it on page load?
    /* mainAudio.addEventListener("loadeddata", () => {

        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;


    }); */
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (event) => {
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffsetX = event.offsetX; //getting offset x value
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffsetX / progressWidthVal) * songDuration;
    playMusic();
})

mainAudio.addEventListener("ended", () => {
    nextMusic();
    playingNow();
})

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
})

hideMoreBtn.addEventListener("click", () => {
    showMoreBtn.click();
})

const ulTag = playerWrapper.querySelector("ul");

for(let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].src}" src="songs/${allMusic[i].src}.mp3"></audio>
                    <span id="${allMusic[i].src}" class="audio-duration">3:40</span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);
    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].src}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if(totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        //Adding an attribute t-duration with the duration of the song, so we can easely access it later on
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    })
}

const allLiTags = ulTag.querySelectorAll("li");

function playingNow() {
    for(let i = 0; i < allLiTags.length; i++) {
        let audioDuration = allLiTags[i].querySelector(".audio-duration")
        if(allLiTags[i].classList.contains("playing")) {
            allLiTags[i].classList.remove("playing");
            let audDuration = audioDuration.getAttribute("t-duration");
            audioDuration.innerText = audDuration;
        }
        if(allLiTags[i].getAttribute("li-index") == musicIndex) {
            allLiTags[i].classList.add("playing");
            audioDuration.innerText = "Playing";
        }
        allLiTags[i].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}