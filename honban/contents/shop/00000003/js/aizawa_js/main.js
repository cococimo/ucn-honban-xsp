$(window).on('load resize', function() {
	var winW = $(window).width();
	//console.log(winW);
	if(winW <= 640) {
		$('.a-03 .item-section').tile(2);
		$('.a-02').each(function() {
			$(this).find('.spec-block').css('height', 'auto');
		});
	} else {
		$('.a-03 .item-section').tile(3);
		$('.a-02').each(function() {
			$(this).find('.spec-block').tile(4);
		});
	}
});

