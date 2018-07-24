var myIcons = new SVGMorpheus('#icons');

var select = function(s) {
        return document.querySelector(s);
    },
    icons = select('#icons'),
    button = select('.playButton');



button.addEventListener('click', function() {
    if (!canPlay)return;
    if (playing) {
        myIcons.to('play-icon');
        pause();

    } else {
        myIcons.to('pause-icon');
        play()
    }
})

document.body.onkeydown= function (ev) {
    if (ev.keyCode==32){
        if (!canPlay)return;
        if (playing) {
            myIcons.to('play-icon');
            pause();

        } else {
            myIcons.to('pause-icon');
            play()
        }
    }
}