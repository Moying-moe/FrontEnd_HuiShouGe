/* 表单地址 */
var prov = document.getElementById("prov");
var city = document.getElementById("city");
var county = document.getElementById("county");

var current = {
	prov: '',
	city: '',
	county: ''
};

// 加载省份资源
function loadProv() {
	var len = provice.length;
	for (i = 0; i < len; i++) {
		var provEle = document.createElement('option');
		provEle.innerText = provice[i]['name'];
		provEle.value = i;
		prov.appendChild(provEle);
	}
};

// 省份变化引起表单变化
function loadCity() {
	// 读取表单页省份数据
	var val = $("#prov").val();
	// 检测到省份发生变化
	if (val != current.prov) {
		current.prov = val;
		current.city = '';
		current.county = '';
		// 清空城市 区县
		city.length = 1;
		city.value = '';
		county.length = 1;
		county.value = '';

		if (val != '') {
			var cityLen = provice[val]["city"].length;
			for (var j = 0; j < cityLen; j++) {
				var cityEle = document.createElement('option');
				cityEle.innerText = provice[val]["city"][j].name;
				cityEle.value = j;
				city.appendChild(cityEle);
			}
		}
	}
}

// 城市变化引起表单变化
function loadCounty() {
	// 读取表单页城市数据
	var val = $("#city").val();
	// 检测到城市发生变化
	if (val != current.city) {
		current.city = val;
		current.county = '';
		// 清空区县
		county.length = 1;
		county.value = '';

		if (val != '') {
			var countyLen = provice[current.prov]["city"][val]["districtAndCounty"].length;
			for (var j = 0; j < countyLen; j++) {
				var countyEle = document.createElement('option');
				countyEle.innerText = provice[current.prov]["city"][val]["districtAndCounty"][j];
				countyEle.value = j;
				county.appendChild(countyEle);
			}
		}
	}
}

function saveAddr() {

}

// 选择地址点击事件
$(".select-address").click(
	function() {
		var position = $("span.select-address").position();
		position["left"] = position["left"] - 110;
		$("#usual-address").css(position);
		$("#usual-address").toggle();
		event.stopPropagation();
	}
);
$("#usual-address li").click(function() {
	// find 
	var pos = $(this)[0].innerText.split(" ");
	loadPosition(pos[0],pos[1],pos[2],pos[3]);
})

function loadPosition(prov, city, county, detailed) {
	// 读取省份
	var prov_index = '';
	for (i = 0; i < provice.length; i++) {
		if (provice[i].name == prov) {
			prov_index = i;
			break;
		}
	}
	$("#prov").val(prov_index);
	// 读取城市
	loadCity();
	var city_index= '';
	for (i = 0; i < provice[prov_index]["city"].length; i++) {
		if (provice[prov_index]["city"][i].name == city) {
			city_index = i;
			break;
		}
	}
	$("#city").val(city_index);
	// 读取区县
	loadCounty();
	var county_index = '';
	for (i = 0; i < provice[prov_index]["city"][city_index]["districtAndCounty"].length; i++) {
		if (provice[prov_index]["city"][city_index]["districtAndCounty"][i] == county) {
			county_index = i;
			break;
		}
	}
	$("#county").val(county_index);
	$("#detailed-address").val(detailed);
}

function findCity() {
	prov_index = findProv()
	for (i = 0; i < provice.length; i++) {
		if (provice[i].name == prov) {
			return i;
		}
	}
	return -1;
}
$("body").click(function() {
	$("#usual-address").hide();
})
