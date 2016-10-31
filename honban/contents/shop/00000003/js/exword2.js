$(function() {
	// ユーザーレビューの開閉
	$('.voice-toggle a').click( function() {
		var thisBtn = $(this);
		if( $(this).hasClass('opened')) {
			$(this).removeClass('opened');
			$('.voice-second').slideUp(200, function() {
				var thisBtnTop = thisBtn.offset().top;
				accordionAdj(thisBtnTop);
			});
			$(this).html( $(this).text().replace( $(this).text(), '▼ ユーザーの声を<br class="sp-v">もっと見る'));		
		} else {
			$(this).addClass('opened');
			$('.voice-second').slideDown(300);
			$(this).html( $(this).text().replace( $(this).text(), '▲ 閉じる'));
		}
		return false;
	});

	// 収録内容の開閉
	$('.contain-toggle a').click( function() {
		var thisBtn = $(this);
		if( $(this).hasClass('opened')) {
			$(this).removeClass('opened');
			$('.contain-second').slideUp(200, function() {
				var thisBtnTop = thisBtn.offset().top;
				accordionAdj(thisBtnTop);
			});
			$(this).html( $(this).text().replace( $(this).text(), '▼ 収録内容を<br class="sp-v">もっと見る'));	
		} else {
			$(this).addClass('opened');
			$('.contain-second').slideDown(300);
			$(this).html( $(this).text().replace( $(this).text(), '▲ 閉じる'));
		}
		return false;
	});

	// アコーディオン閉じる時の座標修正用
	function accordionAdj(thisBtnTop) {
		//console.log(thisBtnTop);
		thisAdjOffset = -20;
		$('html,body').animate({scrollTop: thisBtnTop + thisAdjOffset}, 300);
	}
	
    // スムーススクロール
	if ($.support.leadingWhitespace) { // IE8以下を除外
	    $("a[href^='#']").not('.noscroll').fixedHeaderScroll({
	        headerSelector: '#cnav',
	        smoothDuration: 300,
	        offset: -20
	    });
	}
    
    //ページ内ナビ
$(window).on('load resize scroll',function() {
    var hdTop = $('#header').offset().top;
    	$('#c-nav').fadeIn();
    	// ナビ位置調整
       if($(window).scrollTop() > hdTop) {
            $('#c-nav').css({top:'20px'});	
        } else {
        	navMenu();
        }

 });

function navMenu() {
	    var hdHeight = 0;
    	var PaHeight = 0;
    	var navHeight = 0;
    	var AdjHeight = 45; //高さ調整用
        hdHeight = $('#header').innerHeight();
    	PaHeight = $('#pan-navi').innerHeight();
    	navHeight = hdHeight + PaHeight + AdjHeight;
    	console.log('hdHeight:' + hdHeight + 'PaHeight:' + PaHeight + 'navHeight' + navHeight)
        $('#c-nav').css({top:navHeight + 'px'});
}



	$('#c-nav-open').click( function() {
		$('.c-nav-inner').slideDown(300);
	});

	$('#c-nav-close').click( function() {
		$('.c-nav-inner').slideUp(300);
	});

	$('#c-nav ul a').click( function() {
		setTimeout( function() {
			$('.c-nav-inner').slideUp(300);
		}, 200);
	});
	
});