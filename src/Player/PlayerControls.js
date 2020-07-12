const PlayerControls = function (playPauseBtn, stopBtn, loopBtn, durationText, currentTimeText, mediaName) {
    let icon = playPauseBtn.getElementsByTagName('i')[0];
    this.showPause = () => {
        stopBtn.classList.remove("active");
        icon.classList.remove("fa-play-circle");
        icon.classList.add("fa-pause-circle");
        playPauseBtn.classList.add("active");
    };
    this.showPlay = () => {
        icon.classList.add("fa-play-circle");
        icon.classList.remove("fa-pause-circle");
        playPauseBtn.classList.remove("active");
    };
    this.stop = () => {
        stopBtn.classList.add("active");
        icon.classList.add("fa-play-circle");
        icon.classList.remove("fa-pause-circle");
        playPauseBtn.classList.remove("active");
    };
    this.repeat = (loopFlag) => {
        loopFlag ? loopBtn.classList.add("active") : loopBtn.classList.remove("active");
    }

    this.setMediaDuration = (duration) => {
        durationText.innerText = duration;
    };

    this.updateCurrentTime = (currentTime) => {
        currentTimeText.innerText = currentTime;
    };

    this.setMediaName = (nameText) => {
        if (nameText.length > 35) {
            nameText = `${nameText.substring(0, 35)}...`;
        }
        mediaName.innerText = nameText;
    }
}
export default PlayerControls;