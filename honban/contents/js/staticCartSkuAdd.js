//siteCatalistAddCart
function AddCart_trans(){
   document.cartGoodsAddForm.order_num_string.value=document.goodsDetailCartForm.order_num_string.value;
  return anchorButtonClick(document.cartGoodsAddForm);
}
function siteCatalistAddCart(s_products){
   document.cartGoodsAddForm.order_num_string.value=document.goodsDetailCartForm.order_num_string.value;
  return anchorButtonClick(document.cartGoodsAddForm);
}
function AddCart_trans1(){
//  document.cartGoodsAddForm1.order_num_string.value=document.goodsDetailCartForm1.order_num_string.value;
  return anchorButtonClick(document.cartGoodsAddForm1);
}
function siteCatalistAddCart1(s_products){
//  document.cartGoodsAddForm1.order_num_string.value=document.goodsDetailCartForm1.order_num_string.value;
  return anchorButtonClick(document.cartGoodsAddForm1);
}
//siteCatalistAddCart SKU
function showCartButton(obj){
  var idx = obj.selectedIndex;
  var goods_sku_code = obj.options[idx].value;
  var cartButton = document.getElementsByClassName("cartButton");
  var selectButton = document.getElementsByClassName("selectButton");
  if( idx != 0 ){
      cartButton[0].style.display='inline';
      selectButton[0].style.display='none';
  }else{
    cartButton[0].style.display='none';
    selectButton[0].style.display='inline';
  }
}
function AddCart_trans_renewal(){
   document.cartGoodsAddForm.order_num_string.value=document.goodsDetailCartForm.order_num_string.value;
   document.cartGoodsAddForm.goods_sku_code.value=document.goodsDetailCartForm.goods_sku_code.value;
  return anchorButtonClick(document.cartGoodsAddForm);
}
function siteCatalistAddCart_renewal(s_products){
   document.cartGoodsAddForm.order_num_string.value=document.goodsDetailCartForm.order_num_string.value;
   document.cartGoodsAddForm.goods_sku_code.value=document.goodsDetailCartForm.goods_sku_code.value;
  return anchorButtonClick(document.cartGoodsAddForm);
}
function AddCart_trans1_renewal(){
   document.cartGoodsAddForm1.order_num_string.value=document.goodsDetailCartForm1.order_num_string.value;
   document.cartGoodsAddForm1.goods_sku_code.value=document.goodsDetailCartForm1.goods_sku_code.value;
  return anchorButtonClick(document.cartGoodsAddForm1);
}
function siteCatalistAddCart1_renewal(s_products,static_){
   document.cartGoodsAddForm1.order_num_string.value=document.goodsDetailCartForm1.order_num_string.value;
   document.cartGoodsAddForm1.goods_sku_code.value=document.goodsDetailCartForm1.goods_sku_code.value;
  return anchorButtonClick(document.cartGoodsAddForm1);
}
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
function AddCart_trans_static(){
  //document.cartGoodsAddForm.action="https://" + document.domain + "/shop/cartGoodsAdd.do";
  return anchorButtonClick(document.cartGoodsAddForm);
}
function siteCatalistAddCart_static(s_products,static_goods_sku_code,static_display_code){
    document.cartGoodsAddForm.order_num_string.value="1";
    document.cartGoodsAddForm.goods_sku_code.value=static_goods_sku_code;
    document.cartGoodsAddForm.display_code.value=static_display_code;
    document.cartGoodsAddForm.ext_goods_sku_code.value=s_products;
  return anchorButtonClick(document.cartGoodsAddForm);
}
function siteCatalistAddCart_skuStatic(static_goods_sku_code,static_display_code){
	if(!static_goods_sku_code){
		alert("色・サイズを選択してください。");
		return;
	}
    document.cartGoodsAddForm.order_num_string.value="1";
    document.cartGoodsAddForm.goods_sku_code.value=static_goods_sku_code;
    document.cartGoodsAddForm.display_code.value=static_display_code;
    document.cartGoodsAddForm.ext_goods_sku_code.value=document.getElementById(static_goods_sku_code).value;
  return anchorButtonClick(document.cartGoodsAddForm);
}
function cartAddSkuForRadio_static(cartGoodsAddForm_staticName){
	var radioListForm = document.getElementById(cartGoodsAddForm_staticName);
	var paramList = "";
	var radioList = radioListForm.sku_radio;
	for(var i=0; i<radioList.length; i++){
		if (radioList[i].checked) {
			
			paramList = radioList[i].value;
			break;
		}
		if(i==radioList.length-1){
			alert("色・サイズを選択してください。");
			return;
		}
	}
	var cartAddRadioParam= paramList.split(",");
	getSkuGoodsParam(cartAddRadioParam[0],cartAddRadioParam[1],cartAddRadioParam[2],cartAddRadioParam[3]);
}
function AddCart_trans2(formName){
  document.cartGoodsAddForm.action="https://" + document.domain + "/shop/cartGoodsAdd.do";
  return anchorButtonClick(formName);
}

function siteCatalistAddCart2(formName,s_products){
  document.cartGoodsAddForm.action="https://" + document.domain + "/shop/cartGoodsAdd.do";
  return anchorButtonClick(formName);
}

function getSkuGoodsParam(formName,displayCD,goodsSkuCD,extGoodsSkuCD){
	document.forms[formName].display_code.value = displayCD;
	document.forms[formName].goods_sku_code.value = goodsSkuCD;
	document.forms[formName].ext_goods_sku_code.value = extGoodsSkuCD;
	document.forms[formName].order_num_string.value = 1;
	siteCatalistAddCart2(formName,extGoodsSkuCD);
}