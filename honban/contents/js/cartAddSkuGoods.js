function AddCart_trans2(formName){
  return anchorButtonClick(formName);
}

function siteCatalistAddCart2(formName,s_products){
return anchorButtonClick(formName);
}

function getSkuGoodsParam(formName,displayCD,goodsSkuCD,extGoodsSkuCD){
	document.forms[formName].display_code.value = displayCD;
	document.forms[formName].goods_sku_code.value = goodsSkuCD;
	document.forms[formName].ext_goods_sku_code.value = extGoodsSkuCD;
	document.forms[formName].order_num_string.value = 1;
	siteCatalistAddCart2(formName,extGoodsSkuCD);
}

function getSkuGoodsParamMono(formName){
	document.forms[formName].order_num_string.value = 1;
	siteCatalistAddCart2(formName,document.forms[formName].ext_goods_sku_code.value);
}

function cartAddSkuForRadio(){
	var radioList = document.getElementsByName("sku_radio");
	var paramList = "";
	for(var i=0; i<radioList.length; i++){
			if (radioList[i].checked) {
				
				paramList = document.getElementById("sku_radio" + i).value;
				break;
			}
	}
	var cartAddRadioParam= paramList.split(",");
	getSkuGoodsParam(cartAddRadioParam[0],cartAddRadioParam[1],cartAddRadioParam[2],cartAddRadioParam[3]);
}