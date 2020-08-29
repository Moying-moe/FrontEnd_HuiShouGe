/* 商品表单交互计算 */



$(".reduce").click(function() {
	var val = +$(this).next().val()
	$(this).next().val(--val);
	if (val <= 1) {
		$(this).attr("disabled", "true");
	}
	$(this).siblings(".add")[0]["disabled"] = false;
	amount_calc($(this), val);
})
$(".add").click(function() {
	var val = +$(this).prev().val();
	$(this).prev().val(++val);
	if (val >= 100) {
		$(this).attr("disabled", "true");
	}
	$(this).siblings(".reduce")[0]["disabled"] = false;

	amount_calc($(this), val);
})



function amount_calc(obj, val) {
	var this_row = obj.parents("tr");

	var price = +this_row.find(".goods-price")[0]["innerText"];
	this_row.find(".goods-amount")[0]["innerText"] = "￥" + price * val;
	this_row.find(".carbon-credits")[0]["innerText"] = 4500 * val + "分";
	this_row.find(".carbon-reduction")[0]["innerText"] = 150 * val + "千克";

	if (this_row.find(".goods-selected")[0]["checked"] == true) {
		total_calc()
	}
}

$(".goods-selected").change(function() {
	total_calc()
});

$("#all-selected").click(function() {
	if (this.checked == true) {
		$(".goods-selected").each(function() {
			this.checked = true
		})
	} else {
		$(".goods-selected").each(function() {
			this.checked = false
		})
	}
	total_calc()
})

function total_calc() {
	// Checkbox
	var goods_checkboxs = $(".goods-selected");
	var summary_checkbox = $("#all-selected")[0];
	
	// amount calc
	var goods_amount = $(".goods-amount");
	var carbon_credits = $(".carbon-credits");
	var carbon_reduction = $(".carbon-reduction");
	
	var total_amount = $("#total-amount")[0];
	var total_credit = $("#total-carbon-credit")[0];
	var total_reduction = $("#total-carbon-reduction")[0];
	
	var amount = 0;
	var credit = 0;
	var reduction = 0;
	var all_selected_flag = true;

	// 计算总额
	for (i = 0; i < goods_checkboxs.length; i++) {
		if (goods_checkboxs[i]["checked"] == true) {
			amount += +goods_amount[i]["innerText"].split('￥')[1];
			credit += +carbon_credits[i]["innerText"].split('分')[0];
			reduction += +carbon_reduction[i]["innerText"].split('千克')[0];
		} else {
			all_selected_flag = false;
		}
	}

	// 检查是否全选
	if (all_selected_flag == true) {
		summary_checkbox["checked"] = true;
	} else {
		summary_checkbox["checked"] = false;
	}

	// 显示结果
	total_amount["innerText"] = "￥" + amount;
	total_credit["innerText"] = "碳积分：" + credit + "分";
	total_reduction["innerText"] = "碳减排：" + reduction + "千克";
}

// option
if($("tr").length != 2){
	console.log("wow")
	$("#baskets-is-empty").css("display","none");
}
$(".delete-item").click(function(){
	if(confirm('确认删除该商品吗')){
		$(this).parents("tr").find(".goods-selected")[0]["checked"] = false;
		$(this).parents("tr").remove();
		total_calc();
		if($("tr").length == 2){
			console.log("why")
			$("#baskets-is-empty").css("display","table-row");
			$("#all-selected")[0]["checked"] = false;
		}
	}
})



$("#delete-selected").click(function(){
	if(confirm("确认删除选中的商品吗")){
		var goods_list = $(".goods-selected");
		for(i=0;i<goods_list.length;i++){
			if(goods_list[i]["checked"]==true){
				$(goods_list[i]).parents("tr").remove();
			}
		}
		total_calc();
		if($("tr").length == 2){
			console.log("why")
			$("#baskets-is-empty").css("display","table-row");
			$("#all-selected")[0]["checked"] = false;
		}
	}
}) 

$("#delete-all").click(function(){
	if(confirm("确认清空废品框吗")){
		var goods_list = $(".goods-selected");
		for(i=0;i<goods_list.length;i++){
			$(goods_list[i]).parents("tr").remove();
		}
		total_calc();
		$("#baskets-is-empty").css("display","table-row");
		$("#all-selected")[0]["checked"] = false;
	}
}) 

function submit() {
	alert('提交成功');
	location.href="/lucky.html"
}
