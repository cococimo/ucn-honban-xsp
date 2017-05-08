$(function(){
	var start_ww = jQuery(window).width();
	if(start_ww<640){
		$('.order_pic').attr('src','contents/shop/00000003/image/static/img/shibachan/order_pic_sp_2.jpg');
		$('h2.sp_change').html('話して・触って・遊んで<br><span>癒しをくれる電動ペット</span>');
	}else{
		$('.order_pic').attr('src','contents/shop/00000003/image/static/img/shibachan/order_pic_2.png');
		$('h2.sp_change').html('話して・触って・遊んで<span>癒しをくれる電動ペット</span>');
	}
});

jQuery(window).resize(function(){
	var ww = jQuery(window).width();
	if(ww<640){
		$('.order_pic').attr('src','contents/shop/00000003/image/static/img/shibachan/order_pic_sp_2.jpg');
		$('h2.sp_change').html('話して・触って・遊んで<br><span>癒しをくれる電動ペット</span>');
	}else{
		$('.order_pic').attr('src','contents/shop/00000003/image/static/img/shibachan/order_pic_2.png');
		$('h2.sp_change').html('話して・触って・遊んで<span>癒しをくれる電動ペット</span>');
	}
});