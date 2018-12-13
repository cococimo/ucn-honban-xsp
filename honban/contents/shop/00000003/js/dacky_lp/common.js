(function($){
	console.log($('a.popup-youtube'));
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.indexOf('chrome') !== -1) {
		$('a[href*="youtube.com/watch"]').magnificPopup({
			type: 'iframe',
			iframe: {
				patterns: {
					youtube: {
						index: 'youtube.com', 
						id: 'v=', 
						src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0&mute=1'
					}
				}
			}	
		});
	} else {
		$('a[href*="youtube.com/watch"]').magnificPopup({
			type: 'iframe',
			iframe: {
				patterns: {
					youtube: {
						index: 'youtube.com', 
						id: 'v=', 
						src: '//www.youtube.com/embed/%id%?autoplay=1&rel=0'
					}
				}
			}	
		});
	}	
})(jQuery);
