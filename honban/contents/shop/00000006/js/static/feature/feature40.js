$(function(){
	$('.page-link a').off('click').on('click', function(){
		var href = $(this).attr('href');
				
		if( href.substring(0,1) === '#' && href.length > 1){
			var fixed = 0;
			if($(window).width() > 640){
				fixed = 100;
			}
			var target = $(href).offset().top - fixed;
			$('html,body').stop().animate({ scrollTop: target },500);
			return false;
		}
	});

	$('.sec .item .txt .ph .text .links a').each(function(){
		var href = $(this).attr('href');
		var a = '<a href="' + href + '" target="_blank"></a>'
		
		$(this).parent('.links').prev('.photo').children('img').wrap(a);
	});
});