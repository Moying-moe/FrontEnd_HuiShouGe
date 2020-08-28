var globalIndex = 1;
var autoPlaying = true;

function activateItem(index) {
    autoPlaying = false;
    globalIndex = index;
    $('dot.actived').removeClass('actived');
    $('#dot'+index.toString()).addClass('actived');
    $('.scroll-item.actived').removeClass('actived');
    $('#banner'+index.toString()).addClass('actived');
}

function restartAuto() {
    autoPlaying = true;
}

function autoNext() {
    if(autoPlaying){
        globalIndex = globalIndex%3+1;
        activateItem(globalIndex);
    }
}

setInterval(autoNext, 5000);