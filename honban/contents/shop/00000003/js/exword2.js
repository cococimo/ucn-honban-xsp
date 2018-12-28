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
		if($(window).width() > 767){
			thisAdjOffset = -20;
		}else{
			var thisAdjOffset = $('#header').outerHeight() * 1.5 * -1;
		}
		$('html,body').animate({scrollTop: thisBtnTop + thisAdjOffset}, 300);
	}
	
 //    // �X���[�X�X�N���[��
	// if ($.support.leadingWhitespace) { // IE8�ȉ������O
	//     $("a[href^='#']").not('.noscroll').fixedHeaderScroll({
	//         headerSelector: '#cnav',
	//         smoothDuration: 300,
	//         offset: -20
	//     });
	// }

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

   //�y�[�W���i�r
    $(window).load(function() {
	var hdTop = $('#header').outerHeight() + 45;
	var navTop = $('#header').outerHeight() + 20;
	var headerHight = $('#header').outerHeight();
	var flag = false;
	var wrapHeight = $('#footer').get(0).offsetTop;
	var nowWidth = $(window).width();
	var timer = false;
	var breakpoint = 767;
	var spFlag;

	//sp or pc
	spFlag = nowWidth < breakpoint ? true : false;
   	if(spFlag) { 
    	$('#c-nav').css({'position':'fixed','top': navTop + 'px','left':'auto','right':'20px'});
	} else {
    	$('#c-nav').css({'position':'fixed','top':'20px','left':'auto','right':'20px'});
	}

	//���T�C�Y����
	  window.addEventListener('resize', ReLayout); 

	  function ReLayout() {
	    if (timer !== false) {
	      clearTimeout(timer);
	    }
	    timer = setTimeout(function() {
	      if(nowWidth !== $(window).innerWidth()) {
	      	nowWidth = $(window).width();
	      	hdTop = 0;
	        wrapHeight = 0;
	        hdTop = $('#header').outerHeight() + 45;
	        wrapHeight = $('#footer').get(0).offsetTop;
	        navTop = $('#header').outerHeight() + 20;

			//sp or pc
			spFlag = nowWidth < breakpoint ? true : false;
	       	if(spFlag) { 
	        	$('#c-nav').css({'position':'fixed','top': navTop + 'px','left':'auto','right':'20px'});
	    	} else {
	        	$('#c-nav').css({'position':'fixed','top':'20px','left':'auto','right':'20px'});
	    	}
	      }

	    }, 200);
	  }


	$(window).on('scroll',function() {
	    	// �i�r�ʒu����
	       if($(window).scrollTop() > hdTop && $(window).scrollTop() < wrapHeight){
				if(flag == false) {$('#c-nav').fadeIn()};
				flag = true;
	        } else {
				if(flag == true) {$('#c-nav').fadeOut()};
				flag = false;
	        }

	 });
});