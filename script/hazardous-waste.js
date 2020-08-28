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

function tabSwitch(ind) {
    $('li[role="tab-switcher"]').removeClass('actived');
    $('li#tab-btn-'+ind.toString()).addClass('actived');
    $('#title-cate').text(titleData[ind].titleCate);
    $('#title').text(titleData[ind].title);
}