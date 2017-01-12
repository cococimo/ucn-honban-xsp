$(function() {
	// ���[�U�[���r���[�̊J��
	$('.voice-toggle a').click( function() {
		var thisBtn = $(this);
		if( $(this).hasClass('opened')) {
			$(this).removeClass('opened');
			$('.voice-second').slideUp(200, function() {
				var thisBtnTop = thisBtn.offset().top;
				accordionAdj(thisBtnTop);
			});
			$(this).html( $(this).text().replace( $(this).text(), '�� ���[�U�[�̐���<br class="sp-v">�����ƌ���'));		
		} else {
			$(this).addClass('opened');
			$('.voice-second').slideDown(300);
			$(this).html( $(this).text().replace( $(this).text(), '�� ����'));
		}
		return false;
	});

	// ���^���e�̊J��
	$('.contain-toggle a').click( function() {
		var thisBtn = $(this);
		if( $(this).hasClass('opened')) {
			$(this).removeClass('opened');
			$('.contain-second').slideUp(200, function() {
				var thisBtnTop = thisBtn.offset().top;
				accordionAdj(thisBtnTop);
			});
			$(this).html( $(this).text().replace( $(this).text(), '�� ���^���e��<br class="sp-v">�����ƌ���'));	
		} else {
			$(this).addClass('opened');
			$('.contain-second').slideDown(300);
			$(this).html( $(this).text().replace( $(this).text(), '�� ����'));
		}
		return false;
	});

	// �A�R�[�f�B�I�����鎞�̍��W�C���p
	function accordionAdj(thisBtnTop) {
		//console.log(thisBtnTop);
		thisAdjOffset = -20;
		$('html,body').animate({scrollTop: thisBtnTop + thisAdjOffset}, 300);
	}
	
    // �X���[�X�X�N���[��
	if ($.support.leadingWhitespace) { // IE8�ȉ������O
	    $("a[href^='#']").not('.noscroll').fixedHeaderScroll({
	        headerSelector: '#cnav',
	        smoothDuration: 300,
	        offset: -20
	    });
	}
    
    //�y�[�W���i�r
$(window).on('load resize scroll',function() {
    var hdTop = $('#header').offset().top;
    	$('#c-nav').fadeIn();
    	// �i�r�ʒu����
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
    	var AdjHeight = 45; //���������p
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