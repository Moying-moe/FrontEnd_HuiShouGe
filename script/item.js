const pointMall = [
    {
        price: 10,
        name: '防滑隔热垫',
        point: 100,
        src: 'images/waste-recycling/wr3_1.jpg',
        desc: '硅胶防滑隔热垫，安全无毒，遇热不分解。<br>过热时不会产生有毒物质，废弃可自然降解，安全环保。',
        left: 6,
    },
    {
        price: 25,
        name: '城市果园盆栽',
        point: 250,
        src: 'images/waste-recycling/wr3_2.jpg',
        desc: '绿色盆栽，清新自然，清洁空气，绿色环保。',
        left: 10,
    },
    {
        price: 25,
        name: '康乐欧式纸巾盒',
        point: 100,
        src: 'images/waste-recycling/wr3_3.jpg',
        desc:
            '采用陶瓷材质，不使用塑料，环境危害小。<br>使用纸巾盒装纸巾而不是盒装纸巾，可以减少白色污染，更加绿色环保。',
        left: 3,
    },
    {
        price: 30,
        name: '迷你风扇',
        point: 350,
        src: 'images/waste-recycling/wr3_4.jpg',
        desc: '小巧便携，风力强劲',
        left: 25,
    },
    {
        price: 40,
        name: '咪咪熊煮蛋器',
        point: 400,
        src: 'images/waste-recycling/wr3_5.jpg',
        desc: '早餐神器煮蛋器，让你摆脱一晚饥饿',
        left: 3,
    },
    {
        price: 60,
        name: '花篮加湿器',
        point: 600,
        src: 'images/waste-recycling/wr3_6.jpg',
        desc: '采用冷蒸发方式的加湿器，相比超声波加湿器更加安全更加自然，不容易形成白雾',
        left: 1,
    },
    {
        price: 70,
        name: '盆栽太阳能灯',
        point: 700,
        src: 'images/waste-recycling/wr3_7.jpg',
        desc: '节能太阳能灯，采用太阳能+插座双向供电。<br>节能LED灯管，寿命更长，光线更柔和。',
        left: 10,
    },
    {
        price: 149,
        name: '金刚音响',
        point: 1490,
        src: 'images/waste-recycling/wr3_8.jpg',
        desc: '小巧音响，音量强劲',
        left: 22,
    },
    {
        price: 149,
        name: '多功能电蒸锅',
        point: 1490,
        src: 'images/waste-recycling/wr3_9.jpg',
        desc: '多功能电蒸锅，更节电',
        left: 6,
    },
    {
        price: 169,
        name: '零碳台灯',
        point: 1690,
        src: 'images/waste-recycling/wr3_10.jpg',
        desc: '0碳排放台灯，节能环保，环境友好',
        left: 13,
    },
];

const rawSize = 400;
const zoomRate = 2;
const windowSize = rawSize / zoomRate;

var zoomActivate = false;

var tmp = $('#zoom-img')[0];
tmp.style.height = tmp.style.width = (rawSize * zoomRate).toString() + 'px';
tmp = $('#overlay')[0];
tmp.style.height = tmp.style.width = windowSize.toString() + 'px';

$('#raw-img-div').mousemove((e) => {
    if (zoomActivate) {
        var x = e.offsetX;
        var y = e.offsetY;
        var ox = x - windowSize / 2;
        var oy = y - windowSize / 2;

        if (ox < 0) {
            ox = 0;
        }
        if (ox + windowSize > rawSize) {
            ox = rawSize - windowSize;
        }
        if (oy < 0) {
            oy = 0;
        }
        if (oy + windowSize > rawSize) {
            oy = rawSize - windowSize;
        }

        var zx = -ox * zoomRate;
        var zy = -oy * zoomRate;

        var overlay = $('#overlay');
        overlay[0].style.top = (oy - rawSize).toString() + 'px';
        overlay[0].style.left = ox.toString() + 'px';

        var zoomimg = $('#zoom-img');
        zoomimg[0].style.top = zy.toString() + 'px';
        zoomimg[0].style.left = zx.toString() + 'px';
    }
});

$('#raw-img-div').mouseenter((e) => {
    $('#overlay').show();
    $('.zoom-box').show();
    zoomActivate = true;
});

$('#raw-img-div').mouseleave((e) => {
    $('#overlay').hide();
    $('.zoom-box').hide();
    zoomActivate = false;
});

var args = location.href.split('?')[1];
var gid = 0;
if (args) {
    var tmp = args.split('=');
    var key = tmp[0],
        value = tmp[1];
    if (key == 'gid') {
        gid = parseInt(value);
    }
}
$('#name').text(pointMall[gid].name);
$('title').text('积分兑换 - '+pointMall[gid].name)
$('#price').text(pointMall[gid].price);
$('#point').text(pointMall[gid].point);
$('#desc').html(pointMall[gid].desc);
$('#img').attr('src',pointMall[gid].src);
$('#zoom-img').attr('src',pointMall[gid].src);
var gleft = pointMall[gid].left;

var cnt = 1;

$('#count-left').text(gleft);

function incre() {
    cnt++;
    if (cnt >= gleft) {
        $('#incre').attr('disabled', '');
        cnt = gleft;
    }
    $('#decre').removeAttr('disabled');
    $('#count').val(cnt);
}

function decre() {
    cnt--;
    if (cnt <= 1) {
        $('#decre').attr('disabled', '');
        cnt = 1;
    }
    $('#incre').removeAttr('disabled');
    $('#count').val(cnt);
}
