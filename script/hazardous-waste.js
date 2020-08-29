const titleData = {
    1: {
        titleCate: '首页>普及知识>垃圾成堆',
        title: '线下活动'
    },
    2: {
        titleCate: '首页>业界动态>公司活动',
        title: '公司活动'
    }
}

function articleRandomize() {
    var parent = $('.en-value-right-2').children('ul');
    var tmp = new Array();
    for(var e of parent.children('li')){
        tmp.push(e);
    }
    tmp = tmp.sort(function(){return Math.random()-0.5;});
    parent.children('li').remove();
    console.log(tmp);
    
    for(var e of tmp){
        parent.append(e);
    }
}

function tabSwitch(ind) {
    $('li[role="tab-switcher"]').removeClass('actived');
    $('li#tab-btn-'+ind.toString()).addClass('actived');
    $('#title-cate').text(titleData[ind].titleCate);
    $('#title').text(titleData[ind].title);
    articleRandomize();
}