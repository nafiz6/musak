window.onload = init;
var context;
var bufferLoader;
var slider = document.getElementById("volume");
var songSlider = document.getElementById("song");
var gainNode;
var processor;
var analyzer;
var data;
var source1;
var currBuffer;
var pausedAt=0;
var startedAt=0;
var playing = false;
var canPlay = false;
var duration=1;
var menu=0;


function init() {
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    processor = context.createScriptProcessor(1024);
    analyzer = context.createAnalyser();
    processor.connect(context.destination);
    analyzer.connect(processor);
    data = new Uint8Array(analyzer.frequencyBinCount);
    gainNode = context.createGain();
    bufferLoader = new BufferLoader(
        context,
        [
            'holoscene.mp3'
        ],
        finishedLoading
    );
    bufferLoader.load();

}


function finishedLoading(bufferedList) {
    currBuffer = bufferedList[0];
    canPlay=true;
    duration = currBuffer.duration;
}

function play() {
    source1 = context.createBufferSource();
    source1.buffer = currBuffer;
    source1.connect(gainNode);
    gainNode.connect(analyzer);
    gainNode.connect(context.destination);
    gainNode.gain.value=slider.value/slider.max;
    processor.onaudioprocess = function() {
        analyzer.getByteFrequencyData(data);
    };
    startedAt = context.currentTime-pausedAt;
    source1.start(0,pausedAt);
    playing = true;
}

function pause() {
    pausedAt = context.currentTime-startedAt;
    source1.stop(0);
    playing = false;

}

slider.oninput = function(){
    gainNode.gain.value = slider.value/slider.max;
}

songSlider.oninput = function (ev) {
    var pl=false;
    if (playing)pl=true;
    if (pl)pause();
    pausedAt=(songSlider.value/songSlider.max)*duration;
    if (pl)play();
}

function showMenu() {
    if (menu==0){
        document.getElementById("player").style.marginLeft="20%";
        document.getElementById("menu").style.display="block";
        menu=1;
    }

    else if (menu==1){
        document.getElementById("player").style.marginLeft="0%";
        document.getElementById("menu").style.display="none";
        menu=0;
    }

}

start();
