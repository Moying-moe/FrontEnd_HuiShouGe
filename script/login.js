$('.main-container').addClass('bg-'+parseInt(Math.random()*3+1).toString());

const circleR = 20;
const circleX = 25;
const circleY = 25;
var startDeg = 0;
var overDeg = 0;
var lastOverDeg = 0;
var startFromEnd = false;

function addLoadingMark(selector) {
    var target = $(selector);
    if(!target.length){
        return -1;
    }
    // var svg = $('<svg>');
    var svg = $(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
    svg.attr('width', 50);
    svg.attr('height', 50);
    svg.attr('style', 'stroke: black;fill: none;stroke-width: 5;');
    svg.appendTo(target);

    var path = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
    path.attr('style', 'stroke: black;fill: none;stroke-width: 5;');
    var pid = 'path-' + new Date().getTime().toString() + Math.random().toString().replace('.','');
    path.attr('id', pid);
    path.appendTo(svg);

    var lid = setInterval('step("'+pid+'")',20);
    svg.attr('lid',lid);
    return lid;
}

function removeLoadingMark(lid) {
    clearInterval(lid);
    $('svg[lid="'+lid.toString()+'"]').remove();
}

function step(pid) {
    var p = $('#'+pid);

    overDeg = (overDeg+0.1)%(2*Math.PI);
    if(overDeg < lastOverDeg){
        startFromEnd = !startFromEnd;
    }
    startDeg = (startDeg+0.1)%(2*Math.PI);
    var endDeg = (startDeg+overDeg)%(2*Math.PI);
    if(startFromEnd){
        var overPI = (overDeg > Math.PI)?0:1;
    }else{
        var overPI = (overDeg > Math.PI)?1:0;
    }
    var sx = circleR*Math.cos(startDeg) + circleX;
    var sy = circleR*Math.sin(startDeg) + circleY;
    var ex = circleR*Math.cos(endDeg) + circleX;
    var ey = circleR*Math.sin(endDeg) + circleY;
    if(startFromEnd){
        p.attr('d','M'+ex+' '+ey+' A'+circleR+','+circleR+' 0 '+overPI+',1 '+sx+','+sy);
    }else{
        p.attr('d','M'+sx+' '+sy+' A'+circleR+','+circleR+' 0 '+overPI+',1 '+ex+','+ey);
    }
    lastOverDeg = overDeg;
    // p.attr('d', 'M25,25 L'+sx+','+sy+' M25,25 L'+ex+','+ey);
}