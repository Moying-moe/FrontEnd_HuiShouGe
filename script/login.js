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

function errorTip(text, parentEL){
    parentEL.attr('error','');

    var errortip = $('#error-tip');
    errortip.text(text);
    errortip[0].style.top = (parentEL.offset().top - (errortip.height()+32 - parentEL.height())/2).toString() + 'px';
    errortip[0].style.left = (parentEL.offset().left - errortip.width() - 32 - 20).toString() + 'px';

    errortip.show();
    errortip.addClass('shake');
    setTimeout("$('#error-tip').removeClass('shake')",700);
    setTimeout("$('#error-tip').fadeOut(1000)",1000);
}

function login() {
    $('[error]').removeAttr('error');

    var user = $('#user').val();
    var pwd = $("#pwd").val();
    if(user == ''){
        errorTip('请输入用户名', $('#user').parent());
        return ;
    }else if(pwd == ''){
        errorTip('请输入密码', $('#pwd').parent());
        return ;
    }

    $.cookie('user',user);

    $('#input-box').hide(500);
    addLoadingMark('#loading-effect');
    setTimeout("location.href='/index.html'", Math.random()*1000+3000);
}

function signup() {
    $('[error]').removeAttr('error');

    var user = $('#suser').val();
    var email = $('#semail').val();
    var pwd = $('#spwd').val();
    var pwdrepeat = $('#spwdrepeat').val();
    var agree = $('#cb-agree')[0].checked;
    if(user.length < 1 || user.length > 14){
        errorTip('昵称长度需要在1-14字', $('#suser').parent());
        return ;
    }else if(! /^[a-zA-Z0-9_]+?@[a-zA-Z0-9_-]+?\.[a-zA-Z0-9]+?$/.test(email)){
        errorTip('邮箱格式不正确', $('#semail').parent());
        return ;
    }else if(pwd.length < 6 || pwd.length > 16){
        errorTip('密码长度需要在6-16个字符', $('#spwd').parent());
        return ;
    }else if(pwd != pwdrepeat){
        errorTip('两次输入密码不一致', $('#spwdrepeat').parent());
        return ;
    }else if(!agree){
        errorTip('请同意用户协议', $('#cb-agree').parent());
        return ;
    }

    $.cookie('user',user);

    $('#input-box-s').hide(500);
    addLoadingMark('#loading-effect-s');
    setTimeout("location.href='/index.html'", Math.random()*1000+3000);
}

function toSignup(method) {
    if(method == 'quick'){
        windowSwitch();
    }else{
        addLoadingMark('#loading-effect');
        $('.login-box').addClass('fade-to-signup');
        $('.main-container').addClass('fade-to-signup');
        $('.login-box').children(':not(#loading-effect)').hide(500);
        setTimeout(windowSwitch,2000);
    }
}

function windowSwitch() {
    $('.login-box').hide();
    $('.signup-box').children().hide();
    $('.signup-box').show();
    $('.signup-box').children().fadeIn(500);
}


var oldHash = window.location.hash;

if ('onhashchange' in window && (typeof document.documentMode === 'undefined' || document.documentMode == 8)) {
    // 浏览器支持onhashchange事件
    window.onhashchange = hashChangeTrigger;
} else {
    // 不支持
    setInterval(function () {
        var ischanged = (oldHash != window.location.hash);
        if (ischanged) {
            oldHash = window.location.hash;
            hashChangeTrigger();
        }
    }, 150);
}
function hashChangeTrigger() {
    var enterTab = window.location.hash;
    if(enterTab == '#signup') {
        toSignup('quick');
    }
}

hashChangeTrigger();