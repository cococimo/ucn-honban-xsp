$(function(){
	var start_ww = jQuery(window).width();
	if(start_ww<640){
		$('.order_pic').attr('src','contents/shop/00000003/image/static/shibachan/order_pic_sp.jpg');
		$('h2.sp_change').html('�b���āE�G���āE�V���<br><span>�����������d���y�b�g</span>');
	}else{
		$('.order_pic').attr('src','contents/shop/00000003/image/static/shibachan/order_pic.png');
		$('h2.sp_change').html('�b���āE�G���āE�V���<span>�����������d���y�b�g</span>');
	}
});

jQuery(window).resize(function(){
	var ww = jQuery(window).width();
	if(ww<640){
		$('.order_pic').attr('src','contents/shop/00000003/image/static/shibachan/order_pic_sp.jpg');
		$('h2.sp_change').html('�b���āE�G���āE�V���<br><span>�����������d���y�b�g</span>');
	}else{
		$('.order_pic').attr('src','contents/shop/00000003/image/static/shibachan/order_pic.png');
		$('h2.sp_change').html('�b���āE�G���āE�V���<span>�����������d���y�b�g</span>');
	}
});