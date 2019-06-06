// ----- �X�֔ԍ�����Ajax��(JSON�g�p) �������� --------//
/* �X�֔ԍ�����Ajax��(JSON�g�p) */
var prefectureCodeArr = ["010","020","030","040","050","060","070","080","090","100","110","120","130","140","150","160","170","180","190","200","210","220","230","240","250","260","270","280","290","300","310","320","330","340","350","360","370","380","390","400","410","420","430","440","450","460","470"];
var prefectureNameArr = ["�k�C��","�X��","��茧","�{�錧","�H�c��","�R�`��","������","��錧","�Ȗ،�","�Q�n��","��ʌ�","��t��","�����s","�_�ސ쌧","�V����","�x�R��","�ΐ쌧","���䌧","�R����","���쌧","�򕌌�","�É���","���m��","�O�d��","���ꌧ","���s�{","���{","���Ɍ�","�ޗǌ�","�a�̎R��","���挧","������","���R��","�L����","�R����","������","���쌧","���Q��","���m��","������","���ꌧ","���茧","�F�{��","�啪��","�{�茧","��������","���ꌧ"];
var xmlHttp;
var callbackFncname;
var wk_frm_area_code;
var wk_frm_city;
var wk_frm_street;
var wk_asyncstat;

// IN�p�����[�^
// 1. �X�֔ԍ�(�n�C�t���Ȃ�7��)
// 2. �s���{���R�[�h(�o�͐�)
// 3. �s�撬��(�o�͐�)
// 4. �Ԓn(�o�͐�)
function searchAddress(frm_post_code, frm_area_code, frm_city, frm_street){
	var postCode = frm_post_code.value;
	wk_frm_area_code = frm_area_code;
	wk_frm_city = frm_city;
	wk_frm_street = frm_street;
	if(!wk_asyncstat){
		wk_asyncstat = document.getElementById("postcode_asyncstat");
	}
	if(postCode != null && postCode.length == 7){
		if (postCode.match(/[^0-9�O-�X]/g)){
			var elem_nextaddr = document.getElementById("nextaddr");
			if(elem_nextaddr){
				elem_nextaddr.style.display = "none";
			}
			return;
		}
		setPostCodeAsyncStat(1);
		execAsyncJson("/shop/addressSearch.do?post_code=" + postCode, "setAddressJSON_callback");
	}
}

function searchAddress2(frm_post_code, frm_area_code, frm_city, frm_street, asyncstat){
	wk_asyncstat = document.getElementById(asyncstat);
	searchAddress(frm_post_code, frm_area_code, frm_city, frm_street);
}

// �X�e�[�^�X�\��
// �񓯊��ʐM���̃X�e�[�^�X��eHTML�ɕ\��
function setPostCodeAsyncStat(stat){
	if(wk_asyncstat){
		if(stat == 1){
			wk_asyncstat.innerHTML = "������..";
		}else if(stat == 2){
			wk_asyncstat.innerHTML = "";
		}else if(stat == 3){
			wk_asyncstat.innerHTML = "�Y������Z�������݂��Ȃ� �������� 2���ȏ゠��܂��B";
		}
	}
}
function execAsyncJson(url, fncname){
	callbackFncname = fncname;
	if(url != null){
		try{
			xmlHttp = createXMLHttp();
			if(xmlHttp){
				xmlHttp.onreadystatechange = createJsonObject;
				xmlHttp.open("GET", url);
				xmlHttp.send("");
			} else {
				alert("cannot create xmlHttp.");
			}
		}catch(e){
			alert("exception at using xmlHttp." + e.getMessage);
		}
	}
}

function createXMLHttp(){
	if(document.all){
		try{
			return new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}else{
		return new XMLHttpRequest();
	}
}
function createJsonObject(){
	if(xmlHttp.readyState == 4){
		if(wk_asyncstat){
			setPostCodeAsyncStat(2);
		}
		if(xmlHttp.status == 200){
			eval("var oJson = " + xmlHttp.responseText);
			eval(callbackFncname + "(oJson)");
		} else {
			alert("Server Error [" + xmlHttp.status + "]");
		}
	}
}

function setAddressJSON_callback(oJson){
	if(!oJson || oJson.area == null || oJson.area == ''){
		setPostCodeAsyncStat(3);
	}
	/* ���� �`�F���W�C�x���g�����ڐݒ��ɋN�������߂̐ݒ� 2015.08.25 ���� */
	var bChange = false;
	var idx = -1;
	/* ���� �`�F���W�C�x���g�����ڐݒ��ɋN�������߂̐ݒ� 2015.08.25 ���� */
	var address_area = oJson.area;
	var address_city = oJson.city;
	var address_street = oJson.street;
	if(address_area != ""){
		idx = jQuery.inArray(address_area, $(prefectureNameArr));
		if(idx >= 0){
			/* ����  �X�֔ԍ��ύX���̃`�F���W�C�x���g�̔����ɑΉ�/�ύX���̂݃Z�b�g����悤�Ɋg���ύX 2015.08.24 ���� */
//			wk_frm_area_code.value = prefectureCodeArr[idx];
////			if(wk_frm_area_code.value!=prefectureCodeArr[idx]){	
//				$(wk_frm_area_code).val(prefectureCodeArr[idx]).trigger('change');
			bChange = true;
////			}
			/* ����  �X�֔ԍ��ύX���̃`�F���W�C�x���g�̔����ɑΉ�/�ύX���̂݃Z�b�g����悤�Ɋg���ύX 2015.08.24 ���� */
		}
	}
	if(address_city != ""){
//		wk_frm_city.value = address_city;
		$(wk_frm_city).val(address_city);
	}
	if(address_street != ""){
//		wk_frm_street.value = address_street;
		$(wk_frm_street).val(address_street);
	}

	if(bChange){
		$(wk_frm_area_code).val(prefectureCodeArr[idx]).trigger('change');
	}
}
//----- �X�֔ԍ�����Ajax��(JSON�g�p) �����܂� --------//

function prepareUri(uri) {
	return uri.indexOf("?") >= 0 ? uri + "&" : uri + "?";
}
function prepareShopUri(uri, shopNo) {
	return prepareUri(uri) + "___SHOP_NO=" + shopNo;
}

//------------------------------------------------------------------------------

function forwardMall(form) {
	location.href = "top.do";
}

function forwardCart(form) {
	location.href = "cart.do";
}

function forwardMember(form) {
	location.href = "member.do";
}

//------------------------------------------------------------------------------

function forwardShop(form, shopNo) {
	location.href = prepareShopUri("shop.do", shopNo);
}

//------------------------------------------------------------------------------

function forwardNews(form, uri) {
	location.href = uri;
}

function forwardCategory(form, shopNo, category) {
	location.href= prepareShopUri("searchShop.do", shopNo) + "&category=" + category;
}

//------------------------------------------------------------------------------

function deleteCart(form, cartNo, seqNo) {
	if (confirm("�I�����ꂽ���i���J�[�g����폜���܂��B\n��낵���ł����H")) {
		form.action = prepareUri(form.action) + "__delete=&cart_no=" + cartNo + "&seqno=" + seqNo;
		form.submit();
	}
}
function calculateCart(form) {
	form.action = prepareUri(form.action) + "__calculate=";
	form.submit();
}
function settlementCart(form, shopNo, cartNo) {
	location.href = prepareShopUri("settlementInput.do", shopNo) + "&cart_no=" + cartNo;
}
function admissionCart(form, shopNo) {
	location.href = prepareShopUri("memberAdmission.do", shopNo) + "&__settlement=";
}
function logout(form, goodsNum) {
	if(goodsNum>0){
		if (confirm("�J�[�g�ɏ��i�������Ă��܂����A���O�A�E�g���܂����H")) {
			location.href = prepareUri("logout.do");
		}
	} else {
		location.href = prepareUri("logout.do");
	}
}

//------------------------------------------------------------------------------

function forwardGoods(form, shopNo, goodsCode, goodsSkuCode, displayCode, category) {
	location.href = prepareShopUri("searchDetail.do", shopNo) + "&goods_code=" + goodsCode
		+ "&goods_sku_code=" + goodsSkuCode + "&display_code=" + displayCode + "&category=" + category;
}
function forwardGoodsCart(form) {
	if (confirm("�I�����ꂽ���i���J�[�g�ɒǉ����܂��B\n��낵���ł����H")) {
		form.action = prepareUri(form.action) + "__cart=";
		form.submit();
	}
}
function forwardGoodsFavorite(form) {
	if (confirm("�I�����ꂽ���i�����C�ɓ���ɒǉ����܂��B\n��낵���ł����H")) {
		form.action = prepareUri(form.action) + "__favorite=";
		form.submit();
	}
}
function popupGoods(form, directory, file) {
	window.open(directory + "/" + file);
}

//------------------------------------------------------------------------------

function agreeMember(form) {
	if (form.agree[0].checked) {
		form.submit();
	}
}

function agreeOrder(form1, form2) {
	if (form1.agree[0].checked) {
		form1.submit();
	} else if (form1.agree[1].checked) {
		form2.submit();
	}
}

//------------------------------------------------------------------------------

function forwardOrder(form, orderNo) {
	location.href = prepareUri("memberOrderLog.do") + "order_no=" + orderNo;
}

//------------------------------------------------------------------------------

function forwardPoint(form, shopNo) {
	location.href = prepareShopUri("memberPointDetail.do", shopNo);
}

//------------------------------------------------------------------------------

function pageSelect(form, argPageNo) {
	var pageNo = parseInt(argPageNo);
	form.page_no.value = pageNo;
	form.submit();
}
function pageStart(form) {
	form.page_no.value = 1;
	form.submit();
}
function pageEnd(form, argMaxPageNo) {
	var maxPageNo = parseInt(argMaxPageNo);
	form.page_no.value = maxPageNo;
	form.submit();
}
function pagePrev(form) {
	var pageNo = parseInt(form.page_no.value);
	if (pageNo > 1) {
		form.page_no.value = pageNo - 1;
	}
	form.submit();
}
function pageNext(form, argMaxPageNo) {
	var maxPageNo = parseInt(argMaxPageNo);
	var pageNo = parseInt(form.page_no.value);
	if ((pageNo + 1) <= maxPageNo) {
		form.page_no.value = pageNo + 1;
	}
	form.submit();
}

/**
 * �{�^���N���b�N�C�x���g�p��script
 *
 * anchor�Ń{�^���N���b�N�C�x���g�𔭐�������ꍇ�Ɏg�p����B
 * ����script�ɂ��EECE#CEcDefaultAction�Ƀ{�^���C�x���g��ʒm����B
 *
 * @form : Document form
 * @buttonName : �{�^����
 *
 */
function appendButtonAction( form, buttonName ) {
	// input�I�u�W�F�N�g�𐶐�
	var obj = document.createElement( "input" );

	// hidden�Ń{�^�����𖄂ߍ���
	obj.type = "hidden";
	obj.name = "__" + buttonName;
	obj.value = "click";

	form.appendChild( obj );
}

function anchorButtonClick(form){
	return anchorButtonClick(form, null, null);
}
/**
 * Anchor�N���b�N�ł�form.submit();
 *
 * @form : Document form
 * @buttonName : �{�^����
 *
 */
function anchorButtonClick( form, buttonName ) {
	return anchorButtonClick( form, buttonName, null );
}


/**
 * Anchor�N���b�N�ł�form.submit();
 *
 * @form : Document form
 * @buttonName : �{�^����
 * @location : action��url
 *
 */
function anchorButtonClick( form, buttonName, location ) {
// alert( "from=" + form + ", buttonName=" + buttonName +  ", location=" + location );
	// �{�^������hidden�ɖ��ߍ���
	if (buttonName != null){
		appendButtonAction( form, buttonName );
	}

	if( location != null ) {
		form.action = location;
	}

	form.submit();
	return false;
}

/**
 * �X�֔ԍ��ꗗ��POP UP�\��
 *
 * @postCode : �X�֔ԍ�
 */
function postCodeList( postCode, disp ) {
	var url = "postCode.do?disp=" + disp + "&post_code=" + postCode;
	// var postCodeList = window.open( url,'postCodeList','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=670,height=770' ); 
	var postCodeList = window.open( url,'postCodeList','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=980,height=840' );
	postCodeList.focus();

	return false;
}

/**
 * �X�֔ԍ��ꗗ��POP UP�\��(�X�}�[�g�t�H���p)
 *
 * @postCode : �X�֔ԍ�
 */
function postCodeListSP( postCode, disp , postUrl) {
	var url = postUrl + "?disp=" + disp + "&post_code=" + postCode;
	var postCodeList = window.open( url,'postCodeList','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=670,height=770' );
	postCodeList.focus();

	return false;
}

/**
 * String�I�u�W�F�N�g�g��(trim�֐�)
 */
String.prototype.trim = function() {
	return this.replace(/^[\s\n\r\t�@]+|[\s\n\r\t�@]+$/g, '');
}
/**
 * �����ҏ����͉�ʏZ���^�I������
 *
 * @form : Document form
 * @address_book_id : �Z���^ID
 * @name_sei : �����O��
 * @name_mei : �����O��
 * @name_sei_kana : �t���K�i��
 * @name_mei_kana : �t���K�i��
 * @dst_office : �Ζ��於
 * @postCode : �X�֔ԍ�
 * @area_name : �Z��(�s���{��)
 * @address1 : �Z��(�s�撬��)
 * @address2 : �Z��(�Ԓn�Ȃ�)
 * @address3 : �Z��(�������E�����ԍ��Ȃ�)
 * @address4 :
 * @address_co_sei : �l��(��)
 * @address_co_mei : �l��(��)
 * @tel_no : �A����d�b�ԍ�
 */
function selectDstAddrBook(form, address_book_id, name_sei, name_mei, name_sei_kana, name_mei_kana, dst_office, postCode, area_name, address1, address2, address3, address4, address_co_sei, address_co_mei, tel_no) {
	form.address_book_id.value = address_book_id;
	form.dst_name_sei.value = name_sei;
	form.dst_name_mei.value = name_mei;
	form.dst_name_sei_kana.value = name_sei_kana;
	form.dst_name_mei_kana.value = name_mei_kana;
	// form.dst_office.value = dst_office;
	form.dst_post_code.value = postCode;
	selectDstAreaOption(form.dst_area_code, area_name);
	form.dst_address1.value = address1;
	form.dst_address2.value = address2;
	form.dst_address3.value = address3;
	form.dst_address4.value = address4;
	form.dst_address_co_sei.value = address_co_sei;
	form.dst_address_co_mei.value = address_co_mei;
	form.dst_tel_no1.value = '';
	form.dst_tel_no2.value = '';
	form.dst_tel_no3.value = '';
	var tel_no_array = tel_no.split("-");
	if (tel_no_array != null && tel_no_array.length > 0){
		form.dst_tel_no1.value = tel_no_array[0];
	}
	if (tel_no_array != null && tel_no_array.length > 1){
		form.dst_tel_no2.value = tel_no_array[1];
	}
	if (tel_no_array != null && tel_no_array.length > 2){
		form.dst_tel_no3.value = tel_no_array[2];
	}
}
/**
 * �����ҏ����͉�ʓs���{�����X�g�I������
 *
 * @selectObject : �Z��(�s���{��)�I�����X�g�{�b�N�X
 * @area_name : �Z��(�s���{��)
 */
function selectDstAreaOption(selectObject, area_name) {
	for (var i = 0; i < selectObject.length; i++) {
		if (selectObject.options[i].text.trim().indexOf(area_name.trim()) == 0) {
			/* ���� �ʑ����Ή� 2015.08.24 ���� */
// 			selectObject.options[i].selected = true;
////			if(selectObject.options[i].selectedIndex != i){
			selectObject.options[i].selected = true;
			$(selectObject).trigger('change');
////			}
			/* ���� �ʑ����Ή� 2015.08.24 ���� */
			break;
		}
	}
}
/**
 * �y�[�W�g�b�v�\������
 */
function goPageTop() {
	window.scrollTo(0,0);
	return false;
}
/**
 * �m�F�p�̓��͍��ڂɑ΂���R�s�[(Ctrl+C)�A�\��t��(Ctrl+P)�A�؂���(Ctrl+X)���֎~
 * @event : �C�x���g
 */
function checkConfirmKeyDown(event) {
	if((event.keyCode == "67" || event.keyCode == "86" || event.keyCode == "88") && event.ctrlKey == true) {
		return false;
	}
	return true;
}
/**
 * �T�C�g�J�^���X�g �J�[�g������
 */
function siteCatalistShowCart() {
	/*
	s.linkTrackVars='events';
	s.linkTrackEvents='scView';
	s.events='scView';
	s.tl(this,'o','cartview',null,'navigate');
	*/
	return false;
}

//---���i�ꗗ�n����J�[�g�����p 2015.07.18 add----------------------
function siteCatalistAddCartDirect(s_products){
	return anchorButtonClick(document.cartGoodsAddFormDirect);
}

function cartAddItem(formName,strExtCD,shopS,displayCD,goodsSkuCD){
	document.forms[formName].display_code.value = displayCD;
	document.forms[formName].goods_sku_code.value = goodsSkuCD;
	document.forms[formName].ext_goods_sku_code.value = strExtCD;
	document.forms[formName].order_num_string.value = 1;
	document.forms[formName]._S.value = shopS;
	siteCatalistAddCartDirect(strExtCD);
}

//�ʏ폤�i�p
function dispCartAddBtn(formName,goodsSkuCD,BtnID,shopS,displayCD,strExtCD,notCartBtnID){
	var skuForm = document.getElementById(BtnID);
	var notAddCart = document.getElementById(notCartBtnID);
	if(goodsSkuCD)
	{
		notAddCart.setAttribute("style","display:none");
		skuForm.setAttribute("href","javascript:cartAddItem('" +formName+"','" +strExtCD+ "','" +shopS+ "','" +displayCD+ "','" +goodsSkuCD+ "')");
		skuForm.setAttribute("style","display:block");
	}else{
		notAddCart.setAttribute("style","display:block");
		skuForm.setAttribute("style","display:none");
	}
}

//SKU���i�p
function dispCartAddBtnSku(formName,CartAddCD,BtnID,shopS,displayCD,notCartBtnID){
	var skuForm = document.getElementById(BtnID);
	var notAddCart = document.getElementById(notCartBtnID);
	if(CartAddCD)
	{
		var addGoodsCD = CartAddCD.split("_");

		notAddCart.setAttribute("style","display:none");
		skuForm.setAttribute("href","javascript:cartAddItem('" +formName+"','" +addGoodsCD[1]+ "','" +shopS+ "','" +displayCD+ "','" +addGoodsCD[0]+ "')");
		skuForm.setAttribute("style","display:block");
	}else{
		notAddCart.setAttribute("style","display:block");
		skuForm.setAttribute("style","display:none");
	}
}

//�ŋ߃`�F�b�N�������i
function dispCartAddBtnSkuRecent(formName,CartAddCD,BtnID,shopS,displayCD,notCartBtnID){
	if(CartAddCD)
	{
		var addGoodsCD = CartAddCD.split("_");

		//SKU��ʏ���ݒ莞
		for(var i = 0; i < document.getElementsByName("goods_sku_code").length; i++){
			for(var j = 0; j < document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option').length; j++){
				if(document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option')[j].value == CartAddCD){
					document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option')[j].selected = true;
					document.getElementsByName("goods_sku_code")[i].setAttribute("name","rSelected_"+BtnID);
					break;
				}
			}
		}

		//SKU��ʕύX��
		for(var i = 0; i < document.getElementsByName("rSelected_"+BtnID).length; i++){
			for(var j = 0; j < document.getElementsByName("rSelected_"+BtnID)[i].getElementsByTagName('option').length; j++){
				if(document.getElementsByName("rSelected_"+BtnID)[i].getElementsByTagName('option')[j].value == CartAddCD){
					document.getElementsByName("rSelected_"+BtnID)[i].getElementsByTagName('option')[j].selected = true;
				}
			}
		}

		//name��������ӂɐݒ�
		for(var i = 0; i < document.getElementsByName(notCartBtnID).length; i++){
			document.getElementsByName(notCartBtnID)[i].setAttribute("name",notCartBtnID+"_rName_"+i);
			document.getElementsByName(notCartBtnID+"_rName_"+i)[0].setAttribute("style","display:none");
		}

		for(var i = 0; i < document.getElementsByName(notCartBtnID).length; i++){
			document.getElementsByName(notCartBtnID)[i].setAttribute("style","display:none");
		}

		for(var i = 0; i < document.getElementsByName(BtnID).length; i++){
			document.getElementsByName(BtnID)[i].setAttribute("name",BtnID+"_rName_"+i);
			document.getElementsByName(BtnID+"_rName_"+i)[0].setAttribute("style","display:block");
			document.getElementsByName(BtnID+"_rName_"+i)[0].setAttribute("href","javascript:cartAddItem('" +formName+"','" +addGoodsCD[1]+ "','" +shopS+ "','" +displayCD+ "','" +addGoodsCD[0]+ "')");
		}

		for(var i = 0; i< document.getElementsByName(BtnID).length; i++){
			document.getElementsByName(BtnID)[i].setAttribute("style","display:block");
			document.getElementsByName(BtnID)[i].setAttribute("href","javascript:cartAddItem('" +formName+"','" +addGoodsCD[1]+ "','" +shopS+ "','" +displayCD+ "','" +addGoodsCD[0]+ "')");
		}

	}else{

		//SKU�I������
		for(var i = 0; i < document.getElementsByName("rSelected_"+BtnID).length; i++){
			document.getElementsByName("rSelected_"+BtnID)[i].selectedIndex = "";
			document.getElementsByName("rSelected_"+BtnID)[i].setAttribute("name","goods_sku_code");
		}

		for(var i = 0; i< document.getElementsByName(notCartBtnID).length; i++){
			document.getElementsByName(notCartBtnID)[i].setAttribute("style","display:block");
			document.getElementsByName(notCartBtnID+"_rName_"+i)[0].setAttribute("style","display:block");
		}

		for(var i = 0; i < document.getElementsByName(BtnID).length; i++){
			document.getElementsByName(BtnID)[i].setAttribute("style","display:none");
			document.getElementsByName(BtnID+"_rName_"+i)[0].setAttribute("style","display:none");
		}
	}
}

//�V�����i
//function dispCartAddBtnSkuNew(formName,goodsSkuCD,BtnID,shopS,displayCD,strExtCD,notCartBtnID){
function dispCartAddBtnSkuNew(formName,CartAddCD,BtnID,shopS,displayCD,notCartBtnID){
	//if(goodsSkuCD)
	if(CartAddCD)
	{

		var addGoodsCD = CartAddCD.split("_");

		//SKU��ʏ���ݒ莞
		for(var i = 0; i < document.getElementsByName("goods_sku_code").length; i++){
			for(var j = 0; j < document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option').length; j++){
				//if(document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option')[j].value == goodsSkuCD){
				if(document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option')[j].value == CartAddCD){
					document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option')[j].selected = true;
					document.getElementsByName("goods_sku_code")[i].setAttribute("name","nSelected_"+BtnID);
					break;
				}
			}
		}

		//SKU��ʕύX��
		for(var i = 0; i < document.getElementsByName("nSelected_"+BtnID).length; i++){
			for(var j = 0; j�@< document.getElementsByName("nSelected_"+BtnID)[i].getElementsByTagName('option').length; j++){
				//if(document.getElementsByName("nSelected_"+BtnID)[i].getElementsByTagName('option')[j].value == goodsSkuCD){
				if(document.getElementsByName("nSelected_"+BtnID)[i].getElementsByTagName('option')[j].value == CartAddCD){
					document.getElementsByName("nSelected_"+BtnID)[i].getElementsByTagName('option')[j].selected = true;
				}
			}
		}

		//name��������ӂɐݒ�
		for(var i = 0; i < document.getElementsByName(notCartBtnID).length; i++){
			document.getElementsByName(notCartBtnID)[i].setAttribute("name",notCartBtnID+"_nName_"+i);
			document.getElementsByName(notCartBtnID+"_nName_"+i)[0].setAttribute("style","display:none");
		}

		for(var i = 0; i < document.getElementsByName(notCartBtnID).length; i++){
			document.getElementsByName(notCartBtnID)[i].setAttribute("style","display:none");
		}

		for(var i = 0; i < document.getElementsByName(BtnID).length; i++){
			document.getElementsByName(BtnID)[i].setAttribute("name",BtnID+"_nName_"+i);
			document.getElementsByName(BtnID+"_nName_"+i)[0].setAttribute("style","display:block");
			//document.getElementsByName(BtnID+"_nName_"+i)[0].setAttribute("href","javascript:cartAddItem('" +formName+"','" +strExtCD+ "','" +shopS+ "','" +displayCD+ "','" +goodsSkuCD+ "')");
			document.getElementsByName(BtnID+"_nName_"+i)[0].setAttribute("href","javascript:cartAddItem('" +formName+"','" +addGoodsCD[1]+ "','" +shopS+ "','" +displayCD+ "','" +addGoodsCD[0]+ "')");
		}

		for(var i = 0; i< document.getElementsByName(BtnID).length; i++){
			document.getElementsByName(BtnID)[i].setAttribute("style","display:block");
			//document.getElementsByName(BtnID)[i].setAttribute("href","javascript:cartAddItem('" +formName+"','" +strExtCD+ "','" +shopS+ "','" +displayCD+ "','" +goodsSkuCD+ "')");
			document.getElementsByName(BtnID)[i].setAttribute("href","javascript:cartAddItem('" +formName+"','" +addGoodsCD[1]+ "','" +shopS+ "','" +displayCD+ "','" +addGoodsCD[0]+ "')");
		}

	}else{

		//SKU�I������
		for(var i = 0; i < document.getElementsByName("nSelected_"+BtnID).length; i++){
			document.getElementsByName("nSelected_"+BtnID)[i].selectedIndex = "";
			document.getElementsByName("nSelected_"+BtnID)[i].setAttribute("name","goods_sku_code");
		}

		for(var i = 0; i< document.getElementsByName(notCartBtnID).length; i++){
			document.getElementsByName(notCartBtnID)[i].setAttribute("style","display:block");
			document.getElementsByName(notCartBtnID+"_nName_"+i)[0].setAttribute("style","display:block");
		}

		for(var i = 0; i < document.getElementsByName(BtnID).length; i++){
			document.getElementsByName(BtnID)[i].setAttribute("style","display:none");
			document.getElementsByName(BtnID+"_nName_"+i)[0].setAttribute("style","display:none");
		}
	}
}

//---���i�ꗗ�n����J�[�g�����p 2015.07.18 add----------------------
//---���i�ʑ����Ή� 2015.08.10 add----------------------------
/**
 * �ʑ�����POP UP�\��
 *
 * @param postageGroupCode : �����O���[�v�R�[�h
 * @param ShopNo �F �V���b�v�ԍ�
 */
function postageList( postageGroupCode, ShopNo ) {
	var url = "/shop/goodsPostage.do?postage_group_code=" + postageGroupCode + "&_S=" + ShopNo;
	var postageList = window.open( url,'postageList','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=980,height=840' );
	postageList.focus();

	return false;
}
/* ���� �ʑ����Ή� 2015.08.25 ���� */
var wk_asyncstat_calculate;
/* �����Čv�ZAjax��(JSON�g�p) */
// IN�p�����[�^
// 1. �V���b�v�ԍ�
// 2. �z����w��
// 3. �s���{���R�[�h(���q�l���)
// 4. �s���{���R�[�h(�z������)
function orderCalculate(frm_shop_code, frm_destined, frm_ord_area_code, frm_dst_area_code){
	var destined;
	var areaCode;
	var selectObject = frm_destined;
	var shopCode;

	for (var i = 0; i < selectObject.length; i++) {
		if (selectObject[i].checked){
			destined = selectObject[i].value;
			break;
		}
	}
	if(destined == '0'){
		areaCode = frm_ord_area_code.options[frm_ord_area_code.selectedIndex].value;
	}else{
		areaCode = frm_dst_area_code.options[frm_dst_area_code.selectedIndex].value;
	}
	if(!wk_asyncstat_calculate){
		wk_asyncstat_calculate = document.getElementById("calculate_asyncstat");
	}
	shopCode = frm_shop_code.value;
	if(areaCode != null && areaCode.length == 3){
		if (areaCode.match(/[^0-9�O-�X]/g)){
			return;
		}
		setAsyncStatForCalculate(1);
		execAsyncJson("/shop/orderCalculate.do?_S=" + shopCode + "&area_code=" + areaCode, "setJSON_callbackForCalculate");
	}
}

//�X�e�[�^�X�\��
//�񓯊��ʐM���̃X�e�[�^�X��eHTML�ɕ\��
function setAsyncStatForCalculate(stat){
	if(wk_asyncstat_calculate){
		if(stat == 1){
			wk_asyncstat_calculate.innerHTML = "������..";
		}else if(stat == 2){
			wk_asyncstat_calculate.innerHTML = "";
		}else if(stat == 3){
			wk_asyncstat_calculate.innerHTML = "�����Čv�Z�Ɏ��s���܂����B";
		}
	}
}
function execAsyncJsonForCalculate(url, fncname){
	callbackFncname = fncname;
	if(url != null){
		try{
			xmlHttp = createXMLHttp();
			if(xmlHttp){
				xmlHttp.onreadystatechange = createJsonObjectForCalculate;
				xmlHttp.open("GET", url);
				xmlHttp.send("");
			} else {
				alert("cannot create xmlHttp.");
			}
		}catch(e){
			alert("exception at using xmlHttp." + e.getMessage);
		}
	}
}

function createJsonObjectForCalculate(){
	if(xmlHttp.readyState == 4){
		if(wk_asyncstat_calculate){
			setAsyncStatForCalculate(2);
		}
		if(xmlHttp.status == 200){
			eval("var oJson = " + xmlHttp.responseText);
			eval(callbackFncname + "(oJson)");
		} else {
			alert("Server Error [" + xmlHttp.status + "]");
		}
	}
}

function setJSON_callbackForCalculate(oJson){
	if(!oJson || oJson.area == null || oJson.area == ''){
		setAsyncStatForCalculate(3);
	}
	var order_key = oJson.key;
	var order_hash = oJson.hash;
	var order_postage = oJson.postage;
	var order_total   = oJson.total;
	var order_point   = oJson.point;

	if(order_hash != ""){
// �ȉ���getElementsByName()�����ł́A�����������Ȃ��������߁Adocument.form.xxxx.value��
// ���ڐݒ肷����j�Ƃ���
//		var node = document.getElementsByName('order_hash_code');
//		node.value = order_hash;
///		document.orderForm.order_hash_code.value = order_hash;
		var node = document.getElementById("order_hash_code");	//trial id�ɂ�����H
		node.value = order_hash;
//alert('order_hash='+document.orderForm.order_hash_code.value);
	}
	if(order_postage != ""){
		var node = document.getElementById("ord_postage");
		node.innerHTML = String(order_postage).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')+' �~';
	}
	if(order_total != ""){
		var node = document.getElementById("total_amt");
		node.innerHTML = String(order_total).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')+' �~';
	}
	if(order_point != ""){
		var node = document.getElementById("total_point_amt");
		if(node != null){
			node.innerHTML = String(order_point).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')+' pt';
		}
	}
}

/* ���� �ʑ����Ή� 2015.08.25 ���� */

// ���� ���iURL���ꉻ�Ή� 2015.10.09 add ����
/**
 * ���iURL���珤�i�ڍ׉�ʂ֑J��
 **/
function goodsDetailStaticPost(strGoodsUrl,strShopUrl,strCategoryCode) {
	document.goodsDetailStaticForm.goods_url.value = strGoodsUrl;
	document.goodsDetailStaticForm._S.value=strShopUrl
	document.goodsDetailStaticForm.category_code.value = strCategoryCode;
	if(strShopUrl == "lifestyle"){
		document.goodsDetailStaticForm.action = '/' + strShopUrl + '/' + strGoodsUrl + '/';
	} else {
		document.goodsDetailStaticForm.action = '/' + strGoodsUrl + '/';
	}
	document.goodsDetailStaticForm.submit();
}
/**
 * ���iURL���珤�i�ڍ׉�ʂ֑J��(�J�[�gSKU���i�p)
 **/
function goodsDetailStaticPostFromCart(strGoodsUrl,strShopUrl,strCategoryCode,strExtGoodsSku) {
	document.goodsDetailStaticForm.ext_goods_sku_code.value = strExtGoodsSku;
	goodsDetailStaticPost(strGoodsUrl,strShopUrl,strCategoryCode);
}
/**
 * ���iURL���珤�i�ڍ׉�ʂ֑J��(���i�ڍ�SKU���i�p)
 **/
function goodsDetailStaticPostFromDetail(strGoodsUrl,strShopUrl,strCategoryCode,strExtGoodsSku,strGoodsSku) {
	document.goodsDetailStaticForm.ext_goods_sku_code.value = document.getElementById(strGoodsSku).value;
	goodsDetailStaticPost(strGoodsUrl,strShopUrl,strCategoryCode);
}
// ���� ���iURL���ꉻ�Ή� 2015.10.09 add ����
//������ �g�[�N�����ϑΉ� 20171106 start
/**
 * GMO�̃g�[�N���擾���s�����̔�������܂��B
 */
function isExecuteGetToken() {
	var target = document.getElementById("use_register_card_1");
	
	// �o�^�σJ�[�h���g�p����ꍇ�̓g�[�N���擾�����Ȃ�
	if(target) {
		if(target.checked == true) {
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
	
}

/**
 * ���l�͈̔̓`�F�b�N���s���܂��B
 * @param value �`�F�b�N�l
 * @param min �ŏ��l
 * @param max �ő�l
 * @param objName ���ږ�
 */
function checkNumberRange(value, min, max, objName) {
	try {
		var errMsg = objName + "��" + ("0" + min).slice(-2) + "�`" + ("0" + max).slice(-2) + "�͈̔͂œ��͂��Ă��������B";
		
		if(value == "") {
			return "";
		}
		//���l�`�F�b�N
		if(checkHalfNum(value, objName) != "") {
			return errMsg;
		}
		//�����`�F�b�N
		if(value.length != 2) {
			return errMsg;
		}
		
		var numValue = parseInt(value);
		
		//�͈̓`�F�b�N
		if(numValue >= min && numValue <= max) {
			return "";
		} else {
			return errMsg;
		}
	} catch(e) {
		return errMsg;
	}
}

/**
 * ���p�����`�F�b�N���s���܂��B
 * @param value �`�F�b�N�l
 * @param objName ���ږ�
 */
function checkHalfNum(value, objName) {
	if(value.replace(/[0-9]/g, "") != "") {
		// ���p�����ȊO���܂܂�Ă���
		return objName + "�͔��p�����œ��͂��Ă��������B";
	} else {
		return "";
	}
}

/**
 * �K�{�`�F�b�N���s���܂��B
 * @param value �`�F�b�N�l
 * @param objName ���ږ�
 */
function checkRequired(value, objName) {
	var errMsg = objName + "�͕K�{�ł��B";
	
	if(value) {
		return "";
	} else {
		return errMsg;
	}
}

/**
 *  GMO���ς̃g�[�N�����擾���܂��B
 * @param cardNo �J�[�h�ԍ�
 * @param expYear �L������(�N)
 * @param expMonth �L������(��)
 * @param securityCode �Z�L�����e�B�R�[�h
 * @param apiKey API�L�[
 */
function getGmoToken(cardNo, expYear, expMonth, securityCode, apiKey) {
	var errorMessage = "";
	var hasError = false; 
	var objectName = "";
	
	if(!isExecuteGetToken()) {
		document.forms['orderForm'].submit(); 
	}
	var cardBrand = document.getElementById('card_brand').value;
	
	var err_card_brand = document.getElementById('js_err_card_brand');
	var err_card_number = document.getElementById('js_err_card_number');
	var err_card_exp_month = document.getElementById('js_err_card_exp_month');
	var err_card_exp_year = document.getElementById('js_err_card_exp_year');
	var err_security_code = document.getElementById('js_err_security_code');
	
	objectName = "�J�[�h���";
	errorMessage = checkRequired(cardBrand, objectName); //�K�{�`�F�b�N
	if(errorMessage != "") {
		err_card_brand.innerHTML = errorMessage;
		hasError = true;
	} else {
		err_card_brand.innerHTML = "";
	}
	
	objectName = "�J�[�h�ԍ�";
	errorMessage = checkRequired(cardNo, objectName); //�K�{�`�F�b�N
	if(errorMessage == "") {
		errorMessage = checkHalfNum(cardNo, objectName); //���p�����`�F�b�N
	}
	if(errorMessage != "") {
		err_card_number.innerHTML = errorMessage;
		hasError = true;
	} else {
		err_card_number.innerHTML = "";
	}
	
	objectName = "�J�[�h�L�������i���j";
	errorMessage = checkRequired(expMonth, objectName); //�K�{�`�F�b�N
	if(errorMessage == "") {
		errorMessage = checkNumberRange(expMonth, 1, 12, objectName); //���l�͈̓`�F�b�N
	}
	if(errorMessage != "") {
		err_card_exp_month.innerHTML = errorMessage;
		hasError = true;
	} else {
		err_card_exp_month.innerHTML = "";
	}
	
	objectName = "�J�[�h�L�������i�N�j";
	errorMessage = checkRequired(expYear, objectName); //�K�{�`�F�b�N
	if(errorMessage == "") {
		errorMessage = checkNumberRange(expYear, 0, 99, objectName); //���l�͈̓`�F�b�N
	}
	if(errorMessage != "") {
		err_card_exp_year.innerHTML = errorMessage;
		hasError = true;
	} else {
		err_card_exp_year.innerHTML = "";
	}
	
	objectName = "�Z�L�����e�B�R�[�h";
	errorMessage = checkRequired(securityCode, objectName); //�K�{�`�F�b�N
	if(errorMessage == "") {
		errorMessage = checkHalfNum(securityCode, objectName); //���p�����`�F�b�N
	}
	if(errorMessage != "") {
		err_security_code.innerHTML = errorMessage;
		hasError = true;
	} else {
		err_security_code.innerHTML = "";
	}
	
	if(hasError == true) {
		return false;
	}
	
	var expYm = expYear + expMonth;
	
	Multipayment.init(apiKey);
	Multipayment.getToken({
		cardno: cardNo,
		expire: expYm,
		securitycode: securityCode,
		holdername: ""
		},setToken
	);
}

/**
 * GMO���σg�[�N���擾�����̃R�[���o�b�N����
 * @param response API����ԋp���ꂽresonse
 */
function setToken (response) {
	if( response.resultCode != 000 ){
		window.alert("�������ɃG���[���������܂���");
	}else{
		//�J�[�h���͔O�̂��ߒl������
		document.getElementById('card_number').value="";
		document.getElementById('card_exp_year').value="";
		document.getElementById('card_exp_month').value="";
		document.getElementById('security_code').value="";
		document.getElementById('card_number').value = response.tokenObject.maskedCardNo;
		document.getElementById('token_code').value = response.tokenObject.token;
		
		document.forms['orderForm'].submit(); 
	}
}
// ������ �g�[�N�����ϑΉ� 20171106 end