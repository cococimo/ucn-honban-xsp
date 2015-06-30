$(document).ready(function(){
// dt 要素をクリックして dd 要素を表示する
  $("#catList dt").click(function(){
    $(this).next("dd:not(:animated)").slideToggle("fast");
// active クラスを加える
    $(this).toggleClass("active");
	if($(this).hasClass("active")){
		$(this).find("img").attr("src", "contents/shop/00000003/image/commons/sideSearchMenu_mokuteki_active_off.gif");
	}
	else {
		$(this).find("img").attr("src", "contents/shop/00000003/image/commons/sideSearchMenu_mokuteki_off.gif");
	}
    return false;
  });
});







