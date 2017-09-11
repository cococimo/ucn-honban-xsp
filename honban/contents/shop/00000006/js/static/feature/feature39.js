$(function(){
	
	$('.anc_list a').off('click').on('click', function(){
		var href = $(this).attr('href');
				
		if( href.substring(0,1) === '#' && href.length > 1){
			var fixed = 0;
			if($(window).width() > 640){
				fixed = $('#header').height() + 50;
			}
			var target = $(href).offset().top - fixed;
			$('html,body').stop().animate({ scrollTop: target },500);
			return false;
		}
	});
	
	
	$('.days_product_detail').each(function(){
		var href = $(this).find('a').attr('href');
		
		$(this).prev('.days_product_image').find('img').wrap('<a href="' + href + '" target="_blank"></a>');
	});

});