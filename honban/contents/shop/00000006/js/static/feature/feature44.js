$(function(){
	$('.products .prod_block .prod_image .photo_item_list .txt_bold a').each(function(){
		var href = $(this).attr('href');
		$(this).siblings('.btn_more').wrap('<a href="' + href + '" target="_blank">');
	});
});