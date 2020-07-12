let canvas, ctx, analyser, stopId;

export const stopAudioFrame = () => {
    window.cancelAnimationFrame(stopId);
};

export const initAudioFrame = (audio, _canvas) => {
    canvas = _canvas;
    ctx = canvas.getContext('2d');
    let context = new AudioContext();
    try {
        if (!analyser) {
            let source = context.createMediaElementSource(audio);
            analyser = context.createAnalyser();
            source.connect(analyser);
            analyser.connect(context.destination);
        }
    } catch (ex) {
        //console.log(ex);
    }
    setTimeout(() => {
        frameLooper();
    }, 500);
};

const frameLooper = () => {
    stopId = window.requestAnimationFrame(frameLooper);
    let fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = '#3C9FB8'; // Color of the bars
    let bars = 100;
    for (var i = 0; i < bars; i++) {
        var bar_x = i * 3;
        var bar_width = 2;
        var bar_height = -(fbc_array[i] / 2);
        //  fillRect( x, y, width, height ) // Explanation of the parameters below
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
};