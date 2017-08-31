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

});