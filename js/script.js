const playerWrapper = document.querySelector(".playerWrapper")
musicIMG = playerWrapper.querySelector(".img-area img")
musicName = playerWrapper.querySelector(".song-details .name")
musicArtist = playerWrapper.querySelector(".song-details .artist")
mainAudio = playerWrapper.querySelector("#main-audio")
playPauseBtn = playerWrapper.querySelector(".play-pause")

let musicIndex = 3

window.addEventListener("load", () => {
    loadMusic(musicIndex)
})

//function for loading music
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name
    musicArtist.innerText = allMusic[indexNumb - 1].artist
    musicIMG.src = `imgs/${allMusic[indexNumb - 1].img}`
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`
}

function playMusic() {
    playerWrapper.classList.add("playing")
    playPauseBtn.querySelector("i").innerText = "pause"
    mainAudio.play()
}

function pauseMusic() {
    playerWrapper.classList.remove("playing")
    playPauseBtn.querySelector("i").innerText = "play_arrow"
    mainAudio.pause()
}

//play or pause button event
playPauseBtn.addEventListener("click", () => {
    const isMusicPlaying = playerWrapper.classList.contains("playing")
    isMusicPlaying ? pauseMusic() : playMusic()
})