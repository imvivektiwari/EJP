// import remote from 'electron';
import PlayerControls from './Player/PlayerControls';
import { initAudioFrame, stopAudioFrame } from './Analyser/analyser'

let audio = new Audio();
let canvas = document.getElementById("analyser-render");
let video = document.getElementById("video-player");
let currentMedia = audio, playerState = 0, playerControls, anyTimePlayed = false;

const setSourceFile = (files) => {
    let file = files[0];
    refreshMediaType(file.type);
    currentMedia.pause();
    if (file.type.includes("audio")) {
        audio.src = file.path;
        currentMedia = audio;
        initAudioFrame(audio, canvas);
    }
    else if (file.type.includes("video")) {
        stopAudioFrame();
        video.src = file.path;
        currentMedia = video;
    }
    currentMedia.play();
    playerControls.setMediaName(file.name);
    playerControls.showPause();
    playerState = 1;
    setTimeout(() => {
        playerControls.setMediaDuration(new Date(Math.floor(currentMedia.duration) * 1000).toISOString().substr(11, 8))
    }, 1500);
    anyTimePlayed = true;

};

const playPause = () => {

    if (anyTimePlayed && playerState === 1) {
        playerState = 0;
        currentMedia.pause();
        playerControls.showPlay();
    }
    else if (anyTimePlayed && playerState === 0) {
        playerState = 1;
        currentMedia.play();
        playerControls.showPause();
    }
};

const stop = () => {
    if (anyTimePlayed) {
        currentMedia.pause();
        currentMedia.currentTime = 0;
        playerControls.stop();
    }
};

const onMediaEnd = () => {
    playerControls.showPlay();
    playerState = 0;
};

const repeat = () => {
    currentMedia.loop = !currentMedia.loop;
    playerControls.repeat(currentMedia.loop);
    audio.loop = currentMedia.loop;
    video.loop = currentMedia.loop;
}

const setAudio = (e) => {
    let value = e.target.value / 100;
    audio.volume = value;
    video.volume = value;
};

const updateTime = () => {
    playerControls.updateCurrentTime(new Date(Math.floor(currentMedia.currentTime) * 1000).toISOString().substr(11, 8))
}


const refreshMediaType = (mediaType) => {
    console.log(mediaType);
    if (mediaType.includes("audio")) {
        canvas.style.display = "block";
        video.style.display = "none";
    }
    else if (mediaType.includes("video")) {
        video.style.display = "block";
        canvas.style.display = "none";
    }
};

window.addEventListener("load", function (event) {

    let playPauseBtn = document.getElementById("play-button");
    let stopBtn = document.getElementById("stop-button");
    let repeatBtn = document.getElementById("repeat-button");
    let durationText = document.getElementById("total-duration");
    let currentTimeText = document.getElementById("current-time");
    let volumeRange = document.getElementById("volume-range");
    let mediaName = document.getElementById("media-name");
    playPauseBtn.addEventListener('click', playPause);
    stopBtn.addEventListener('click', stop);
    repeatBtn.addEventListener('click', repeat);
    playerControls = new PlayerControls(playPauseBtn, stopBtn, repeatBtn, durationText, currentTimeText, mediaName)


    let fileChooser = document.getElementById("media-chooser");
    let fakeFileChooser = document.getElementById("media-chooser-button");
    fakeFileChooser.addEventListener('click', () => {
        fileChooser.click();
    });
    fileChooser.addEventListener('change', function () {
        setSourceFile(this.files);
    });
    audio.addEventListener('timeupdate', updateTime);
    video.addEventListener('timeupdate', updateTime);
    video.onended = onMediaEnd;
    audio.onended = onMediaEnd;

    volumeRange.addEventListener('input', setAudio);

    document.getElementById("window-close").addEventListener("click", () => window.close());
});