// ----- 郵便番号検索Ajax版(JSON使用) ここから --------//
/* 郵便番号検索Ajax版(JSON使用) */
var prefectureCodeArr = ["010","020","030","040","050","060","070","080","090","100","110","120","130","140","150","160","170","180","190","200","210","220","230","240","250","260","270","280","290","300","310","320","330","340","350","360","370","380","390","400","410","420","430","440","450","460","470"];
var prefectureNameArr = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県","茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県","新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県","静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県","奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県","徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県","熊本県","大分県","宮崎県","鹿児島県","沖縄県"];
var xmlHttp;
var callbackFncname;
var wk_frm_area_code;
var wk_frm_city;
var wk_frm_street;
var wk_asyncstat;

// INパラメータ
// 1. 郵便番号(ハイフンなし7桁)
// 2. 都道府県コード(出力先)
// 3. 市区町村(出力先)
// 4. 番地(出力先)
function searchAddress(frm_post_code, frm_area_code, frm_city, frm_street){
	var postCode = frm_post_code.value;
	wk_frm_area_code = frm_area_code;
	wk_frm_city = frm_city;
	wk_frm_street = frm_street;
	if(!wk_asyncstat){
		wk_asyncstat = document.getElementById("postcode_asyncstat");
	}
	if(postCode != null && postCode.length == 7){
		if (postCode.match(/[^0-9０-９]/g)){
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

// ステータス表示
// 非同期通信中のステータスを親HTMLに表示
function setPostCodeAsyncStat(stat){
	if(wk_asyncstat){
		if(stat == 1){
			wk_asyncstat.innerHTML = "検索中..";
		}else if(stat == 2){
			wk_asyncstat.innerHTML = "";
		}else if(stat == 3){
			wk_asyncstat.innerHTML = "該当する住所が存在しない もしくは 2件以上あります。";
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
	/* ▼▼ チェンジイベントを項目設定後に起こすための設定 2015.08.25 ▼▼ */
	var bChange = false;
	var idx = -1;
	/* ▲▲ チェンジイベントを項目設定後に起こすための設定 2015.08.25 ▲▲ */
	var address_area = oJson.area;
	var address_city = oJson.city;
	var address_street = oJson.street;
	if(address_area != ""){
		idx = jQuery.inArray(address_area, $(prefectureNameArr));
		if(idx >= 0){
			/* ▼▼  郵便番号変更時のチェンジイベントの発生に対応/変更時のみセットするように拡張変更 2015.08.24 ▼▼ */
//			wk_frm_area_code.value = prefectureCodeArr[idx];
////			if(wk_frm_area_code.value!=prefectureCodeArr[idx]){	
//				$(wk_frm_area_code).val(prefectureCodeArr[idx]).trigger('change');
			bChange = true;
////			}
			/* ▼▼  郵便番号変更時のチェンジイベントの発生に対応/変更時のみセットするように拡張変更 2015.08.24 ▼▼ */
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
//----- 郵便番号検索Ajax版(JSON使用) ここまで --------//

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
	if (confirm("選択された商品をカートから削除します。\nよろしいですか？")) {
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
		if (confirm("カートに商品が入っていますが、ログアウトしますか？")) {
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
	if (confirm("選択された商品をカートに追加します。\nよろしいですか？")) {
		form.action = prepareUri(form.action) + "__cart=";
		form.submit();
	}
}
function forwardGoodsFavorite(form) {
	if (confirm("選択された商品をお気に入りに追加します。\nよろしいですか？")) {
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
 * ボタンクリックイベント用のscript
 *
 * anchorでボタンクリックイベントを発生させる場合に使用する。
 * このscriptによりEECE#CEcDefaultActionにボタンイベントを通知する。
 *
 * @form : Document form
 * @buttonName : ボタン名
 *
 */
function appendButtonAction( form, buttonName ) {
	// inputオブジェクトを生成
	var obj = document.createElement( "input" );

	// hiddenでボタン名を埋め込み
	obj.type = "hidden";
	obj.name = "__" + buttonName;
	obj.value = "click";

	form.appendChild( obj );
}

function anchorButtonClick(form){
	return anchorButtonClick(form, null, null);
}
/**
 * Anchorクリックでのform.submit();
 *
 * @form : Document form
 * @buttonName : ボタン名
 *
 */
function anchorButtonClick( form, buttonName ) {
	return anchorButtonClick( form, buttonName, null );
}


/**
 * Anchorクリックでのform.submit();
 *
 * @form : Document form
 * @buttonName : ボタン名
 * @location : actionのurl
 *
 */
function anchorButtonClick( form, buttonName, location ) {
// alert( "from=" + form + ", buttonName=" + buttonName +  ", location=" + location );
	// ボタン名をhiddenに埋め込み
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
 * 郵便番号一覧のPOP UP表示
 *
 * @postCode : 郵便番号
 */
function postCodeList( postCode, disp ) {
	var url = "postCode.do?disp=" + disp + "&post_code=" + postCode;
	// var postCodeList = window.open( url,'postCodeList','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=670,height=770' ); 
	var postCodeList = window.open( url,'postCodeList','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=980,height=840' );
	postCodeList.focus();

	return false;
}

/**
 * 郵便番号一覧のPOP UP表示(スマートフォン用)
 *
 * @postCode : 郵便番号
 */
function postCodeListSP( postCode, disp , postUrl) {
	var url = postUrl + "?disp=" + disp + "&post_code=" + postCode;
	var postCodeList = window.open( url,'postCodeList','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=670,height=770' );
	postCodeList.focus();

	return false;
}

/**
 * Stringオブジェクト拡張(trim関数)
 */
String.prototype.trim = function() {
	return this.replace(/^[\s\n\r\t　]+|[\s\n\r\t　]+$/g, '');
}
/**
 * 注文者情報入力画面住所録選択処理
 *
 * @form : Document form
 * @address_book_id : 住所録ID
 * @name_sei : お名前姓
 * @name_mei : お名前名
 * @name_sei_kana : フリガナ姓
 * @name_mei_kana : フリガナ名
 * @dst_office : 勤務先名
 * @postCode : 郵便番号
 * @area_name : 住所(都道府県)
 * @address1 : 住所(市区町村)
 * @address2 : 住所(番地など)
 * @address3 : 住所(建物名・部屋番号など)
 * @address4 :
 * @address_co_sei : 様方(姓)
 * @address_co_mei : 様方(名)
 * @tel_no : 連絡先電話番号
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
 * 注文者情報入力画面都道府県リスト選択処理
 *
 * @selectObject : 住所(都道府県)選択リストボックス
 * @area_name : 住所(都道府県)
 */
function selectDstAreaOption(selectObject, area_name) {
	for (var i = 0; i < selectObject.length; i++) {
		if (selectObject.options[i].text.trim().indexOf(area_name.trim()) == 0) {
			/* ▼▼ 個別送料対応 2015.08.24 ▼▼ */
// 			selectObject.options[i].selected = true;
////			if(selectObject.options[i].selectedIndex != i){
			selectObject.options[i].selected = true;
			$(selectObject).trigger('change');
////			}
			/* ▲▲ 個別送料対応 2015.08.24 ▲▲ */
			break;
		}
	}
}
/**
 * ページトップ表示処理
 */
function goPageTop() {
	window.scrollTo(0,0);
	return false;
}
/**
 * 確認用の入力項目に対するコピー(Ctrl+C)、貼り付け(Ctrl+P)、切り取り(Ctrl+X)を禁止
 * @event : イベント
 */
function checkConfirmKeyDown(event) {
	if((event.keyCode == "67" || event.keyCode == "86" || event.keyCode == "88") && event.ctrlKey == true) {
		return false;
	}
	return true;
}
/**
 * サイトカタリスト カートを見る
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

//---商品一覧系からカート投入用 2015.07.18 add----------------------
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

//通常商品用
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

//SKU商品用
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

//最近チェックした商品
function dispCartAddBtnSkuRecent(formName,CartAddCD,BtnID,shopS,displayCD,notCartBtnID){
	if(CartAddCD)
	{
		var addGoodsCD = CartAddCD.split("_");

		//SKU種別初回設定時
		for(var i = 0; i < document.getElementsByName("goods_sku_code").length; i++){
			for(var j = 0; j < document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option').length; j++){
				if(document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option')[j].value == CartAddCD){
					document.getElementsByName("goods_sku_code")[i].getElementsByTagName('option')[j].selected = true;
					document.getElementsByName("goods_sku_code")[i].setAttribute("name","rSelected_"+BtnID);
					break;
				}
			}
		}

		//SKU種別変更時
		for(var i = 0; i < document.getElementsByName("rSelected_"+BtnID).length; i++){
			for(var j = 0; j < document.getElementsByName("rSelected_"+BtnID)[i].getElementsByTagName('option').length; j++){
				if(document.getElementsByName("rSelected_"+BtnID)[i].getElementsByTagName('option')[j].value == CartAddCD){
					document.getElementsByName("rSelected_"+BtnID)[i].getElementsByTagName('option')[j].selected = true;
				}
			}
		}

		//name属性を一意に設定
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

		//SKU選択解除
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

//新着商品
//function dispCartAddBtnSkuNew(formName,goodsSkuCD,BtnID,shopS,displayCD,strExtCD,notCartBtnID){
function dispCartAddBtnSkuNew(formName,CartAddCD,BtnID,shopS,displayCD,notCartBtnID){
	//if(goodsSkuCD)
	if(CartAddCD)
	{

		var addGoodsCD = CartAddCD.split("_");

		//SKU種別初回設定時
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

		//SKU種別変更時
		for(var i = 0; i < document.getElementsByName("nSelected_"+BtnID).length; i++){
			for(var j = 0; j　< document.getElementsByName("nSelected_"+BtnID)[i].getElementsByTagName('option').length; j++){
				//if(document.getElementsByName("nSelected_"+BtnID)[i].getElementsByTagName('option')[j].value == goodsSkuCD){
				if(document.getElementsByName("nSelected_"+BtnID)[i].getElementsByTagName('option')[j].value == CartAddCD){
					document.getElementsByName("nSelected_"+BtnID)[i].getElementsByTagName('option')[j].selected = true;
				}
			}
		}

		//name属性を一意に設定
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

		//SKU選択解除
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

//---商品一覧系からカート投入用 2015.07.18 add----------------------
//---商品個別送料対応 2015.08.10 add----------------------------
/**
 * 個別送料のPOP UP表示
 *
 * @param postageGroupCode : 送料グループコード
 * @param ShopNo ： ショップ番号
 */
function postageList( postageGroupCode, ShopNo ) {
	var url = "/shop/goodsPostage.do?postage_group_code=" + postageGroupCode + "&_S=" + ShopNo;
	var postageList = window.open( url,'postageList','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=980,height=840' );
	postageList.focus();

	return false;
}
/* ▼▼ 個別送料対応 2015.08.25 ▼▼ */
var wk_asyncstat_calculate;
/* 送料再計算Ajax版(JSON使用) */
// INパラメータ
// 1. ショップ番号
// 2. 配送先指定
// 3. 都道府県コード(お客様情報)
// 4. 都道府県コード(配送先情報)
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
		if (areaCode.match(/[^0-9０-９]/g)){
			return;
		}
		setAsyncStatForCalculate(1);
		execAsyncJson("/shop/orderCalculate.do?_S=" + shopCode + "&area_code=" + areaCode, "setJSON_callbackForCalculate");
	}
}

//ステータス表示
//非同期通信中のステータスを親HTMLに表示
function setAsyncStatForCalculate(stat){
	if(wk_asyncstat_calculate){
		if(stat == 1){
			wk_asyncstat_calculate.innerHTML = "検索中..";
		}else if(stat == 2){
			wk_asyncstat_calculate.innerHTML = "";
		}else if(stat == 3){
			wk_asyncstat_calculate.innerHTML = "送料再計算に失敗しました。";
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
// 以下のgetElementsByName()方式では、正しく動かなかったため、document.form.xxxx.valueで
// 直接設定する方針とする
//		var node = document.getElementsByName('order_hash_code');
//		node.value = order_hash;
///		document.orderForm.order_hash_code.value = order_hash;
		var node = document.getElementById("order_hash_code");	//trial idにしたら？
		node.value = order_hash;
//alert('order_hash='+document.orderForm.order_hash_code.value);
	}
	if(order_postage != ""){
		var node = document.getElementById("ord_postage");
		node.innerHTML = String(order_postage).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')+' 円';
	}
	if(order_total != ""){
		var node = document.getElementById("total_amt");
		node.innerHTML = String(order_total).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')+' 円';
	}
	if(order_point != ""){
		var node = document.getElementById("total_point_amt");
		if(node != null){
			node.innerHTML = String(order_point).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')+' pt';
		}
	}
}

/* ▲▲ 個別送料対応 2015.08.25 ▲▲ */

// ▼▼ 商品URL統一化対応 2015.10.09 add ▼▼
/**
 * 商品URLから商品詳細画面へ遷移
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
 * 商品URLから商品詳細画面へ遷移(カートSKU商品用)
 **/
function goodsDetailStaticPostFromCart(strGoodsUrl,strShopUrl,strCategoryCode,strExtGoodsSku) {
	document.goodsDetailStaticForm.ext_goods_sku_code.value = strExtGoodsSku;
	goodsDetailStaticPost(strGoodsUrl,strShopUrl,strCategoryCode);
}
/**
 * 商品URLから商品詳細画面へ遷移(商品詳細SKU商品用)
 **/
function goodsDetailStaticPostFromDetail(strGoodsUrl,strShopUrl,strCategoryCode,strExtGoodsSku,strGoodsSku) {
	document.goodsDetailStaticForm.ext_goods_sku_code.value = document.getElementById(strGoodsSku).value;
	goodsDetailStaticPost(strGoodsUrl,strShopUrl,strCategoryCode);
}
// ▲▲ 商品URL統一化対応 2015.10.09 add ▲▲
//↓↓↓ トークン決済対応 20171106 start
/**
 * GMOのトークン取得を行うかの判定をします。
 */
function isExecuteGetToken() {
	var target = document.getElementById("use_register_card_1");
	
	// 登録済カードを使用する場合はトークン取得をしない
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
 * 数値の範囲チェックを行います。
 * @param value チェック値
 * @param min 最小値
 * @param max 最大値
 * @param objName 項目名
 */
function checkNumberRange(value, min, max, objName) {
	try {
		var errMsg = objName + "は" + ("0" + min).slice(-2) + "～" + ("0" + max).slice(-2) + "の範囲で入力してください。";
		
		if(value == "") {
			return "";
		}
		//数値チェック
		if(checkHalfNum(value, objName) != "") {
			return errMsg;
		}
		//桁数チェック
		if(value.length != 2) {
			return errMsg;
		}
		
		var numValue = parseInt(value);
		
		//範囲チェック
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
 * 半角数字チェックを行います。
 * @param value チェック値
 * @param objName 項目名
 */
function checkHalfNum(value, objName) {
	if(value.replace(/[0-9]/g, "") != "") {
		// 半角数字以外が含まれている
		return objName + "は半角数字で入力してください。";
	} else {
		return "";
	}
}

/**
 * 必須チェックを行います。
 * @param value チェック値
 * @param objName 項目名
 */
function checkRequired(value, objName) {
	var errMsg = objName + "は必須です。";
	
	if(value) {
		return "";
	} else {
		return errMsg;
	}
}

/**
 *  GMO決済のトークンを取得します。
 * @param cardNo カード番号
 * @param expYear 有効期限(年)
 * @param expMonth 有効期限(月)
 * @param securityCode セキュリティコード
 * @param apiKey APIキー
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
	
	objectName = "カード会社";
	errorMessage = checkRequired(cardBrand, objectName); //必須チェック
	if(errorMessage != "") {
		err_card_brand.innerHTML = errorMessage;
		hasError = true;
	} else {
		err_card_brand.innerHTML = "";
	}
	
	objectName = "カード番号";
	errorMessage = checkRequired(cardNo, objectName); //必須チェック
	if(errorMessage == "") {
		errorMessage = checkHalfNum(cardNo, objectName); //半角数字チェック
	}
	if(errorMessage != "") {
		err_card_number.innerHTML = errorMessage;
		hasError = true;
	} else {
		err_card_number.innerHTML = "";
	}
	
	objectName = "カード有効期限（月）";
	errorMessage = checkRequired(expMonth, objectName); //必須チェック
	if(errorMessage == "") {
		errorMessage = checkNumberRange(expMonth, 1, 12, objectName); //数値範囲チェック
	}
	if(errorMessage != "") {
		err_card_exp_month.innerHTML = errorMessage;
		hasError = true;
	} else {
		err_card_exp_month.innerHTML = "";
	}
	
	objectName = "カード有効期限（年）";
	errorMessage = checkRequired(expYear, objectName); //必須チェック
	if(errorMessage == "") {
		errorMessage = checkNumberRange(expYear, 0, 99, objectName); //数値範囲チェック
	}
	if(errorMessage != "") {
		err_card_exp_year.innerHTML = errorMessage;
		hasError = true;
	} else {
		err_card_exp_year.innerHTML = "";
	}
	
	objectName = "セキュリティコード";
	errorMessage = checkRequired(securityCode, objectName); //必須チェック
	if(errorMessage == "") {
		errorMessage = checkHalfNum(securityCode, objectName); //半角数字チェック
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
 * GMO決済トークン取得処理のコールバック処理
 * @param response APIから返却されたresonse
 */
function setToken (response) {
	if( response.resultCode != 000 ){
		window.alert("処理中にエラーが発生しました");
	}else{
		//カード情報は念のため値を除去
		document.getElementById('card_number').value="";
		document.getElementById('card_exp_year').value="";
		document.getElementById('card_exp_month').value="";
		document.getElementById('security_code').value="";
		document.getElementById('card_number').value = response.tokenObject.maskedCardNo;
		document.getElementById('token_code').value = response.tokenObject.token;
		
		document.forms['orderForm'].submit(); 
	}
}
// ↑↑↑ トークン決済対応 20171106 end