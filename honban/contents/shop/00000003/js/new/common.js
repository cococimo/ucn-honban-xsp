/* ===========================================
common.js
=========================================== */
$(function () {
	/* browser
	------------------------------------- */
	var user = new getUser();
	user.getBrows();
	function getUser() {
		this.getBrows = function () {
			var _ua = window.navigator.userAgent;
			if (_ua.match(/MSIE/) || _ua.match(/Trident/)) {
				this.brows = 'is-ie';
				$('html').addClass('is-ie');
			} else if (_ua.indexOf("Edge") > -1) {
				this.brows = 'is-edge';
				$('html').addClass('is-edge is-ie11 is-ie');
			} else if (_ua.indexOf("Firefox") > -1) {
				this.brows = 'is-firefox';
				$('html').addClass('is-firefox');
			} else if (_ua.indexOf("Chrome") > -1) {
				this.brows = 'is-chrome';
				$('html').addClass('is-chrome');
			} else if (_ua.indexOf("Opera") > -1) {
				this.brows = 'is-opera';
				$('html').addClass('is-opera');
			} else if (_ua.indexOf("Safari") > -1) {
				this.brows = 'is-safari';
				$('html').addClass('is-safari');
			} else {
				this.brows = 'is-other';
				$('html').addClass('is-other');
			}
			return false;
		}
	};
	/* paramerter
	------------------------------------- */
	var arg = new Object;
	var pair = location.search.substring(1).split('&');
	for (var i = 0; pair[i]; i++) {
		var kv = pair[i].split('=');
		arg[kv[0]] = kv[1];
	}
	/* txt_trim
	------------------------------------- */
	var $setElm01 = $('.topic_list .item_list_txt');
	var $setElm02 = $('.item_list_tit a');
	var $setElm03 = $('.new_item li:nth-child(n+3) .item_list_tit a');
	var $setElm04 = $('.check_item_list .item_list_tit a');
	var cutFigure = '28';
	var cutFigure02 = '28';
	var cutFigure03 = '18';
	var cutFigure04 = '22';
	var afterTxt = ' ...';
	$setElm01.each(function () {
		var textLength = $(this).text().length;
		var textTrim = $(this).text().substr(0, (cutFigure))
		if (cutFigure < textLength) {
			$(this).html(textTrim + afterTxt).css({ visibility: 'visible' });
		} else if (cutFigure >= textLength) {
			$(this).css({ visibility: 'visible' });
		}
	});
	$setElm02.each(function () {
		var textLength02 = $(this).text().length;
		var textTrim02 = $(this).text().substr(0, (cutFigure02))
		if (cutFigure02 < textLength02) {
			$(this).html(textTrim02 + afterTxt).css({ visibility: 'visible' });
		} else if (cutFigure02 >= textLength02) {
			$(this).css({ visibility: 'visible' });
		}
	});
	$setElm03.each(function () {
		var textLength03 = $(this).text().length;
		var textTrim03 = $(this).text().substr(0, (cutFigure03))
		if (cutFigure03 < textLength03) {
			$(this).html(textTrim03 + afterTxt).css({ visibility: 'visible' });
		} else if (cutFigure03 >= textLength03) {
			$(this).css({ visibility: 'visible' });
		}
	});
	$setElm04.each(function () {
		var textLength04 = $(this).text().length;
		var textTrim04 = $(this).text().substr(0, (cutFigure04))
		if (cutFigure04 < textLength04) {
			$(this).html(textTrim04 + afterTxt).css({ visibility: 'visible' });
		} else if (cutFigure04 >= textLength04) {
			$(this).css({ visibility: 'visible' });
		}
	});
	/* pagination
	------------------------------------- */
	$('.pagination .previous:not(:has(span,a))').wrapInner('<span>');
	$('.pagination .next:not(:has(span,a))').wrapInner('<span>');
	$('.pagination li.case_01:not(:has(a)), .pagination li.before:not(:has(a))').addClass('is-current');

	/* matchHeight
	------------------------------------- */
	$('.js-matchHeight').matchHeight();
	$('.js-matchHeight01').matchHeight();
	$('.js-matchHeight02').matchHeight();

	/* toggle
	------------------------------------- */
	$('.js-more_item').on('click', function () {
		$(this).toggleClass('is-active');
		$(this).prev('.js-item_list').toggleClass('is-active');
	});

	$('.about_list_tit').on('click', function () {
		$(this).closest('li').toggleClass('is-active');
	});

	$('.faq_box_tit').on('click', function () {
		$(this).closest('li').toggleClass('is-active');
	});

	$('.header_search,.header_close_btn').on('click', function () {
		$('.header_search').toggleClass('is-open');
		$(this).closest('.header_in').find('.header_item_search_box').toggleClass('is-open');
	});

	$('.js-toggle').on('click', function () {
		$(this).closest('.js-toggle_parent').toggleClass('is-open');
	});

	$('.js-cart_wrapping_detail_wrap_tit,.js-cart_wrapping_btn01').on('click', function () {
		$('.js-cart_wrapping_detail_wrap_tit').toggleClass('is-active');
		$('#js-cart_wrapping_detail').toggle();
	});

	/* smoothScroll
	------------------------------------- */
	var nowWidth = $(window).width();
	var timer = false;
	var breakpoint = 767;
	var navTop = $('#header').outerHeight();
	var spFlag;

	//sp or pc
	spFlag = nowWidth < breakpoint ? true : false;


	//resize
	window.addEventListener('resize', ReLayout);

	function ReLayout() {
		if (timer !== false) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			if (nowWidth !== $(window).innerWidth()) {
				nowWidth = $(window).width();
				navTop = $('#header').outerHeight();
				spFlag = nowWidth < breakpoint ? true : false;
			}
		}, 200);
	}

	//pagetop btn
	$('a[href="#top"]').on('click', function () {
		//scroll speed
		var speed = 500;
		var mode = 'swing';

		$('body,html').animate({ scrollTop: '0' }, speed, 'swing');
		return false;

	});

	//other link (except for object.no-smooth)
	$('a[href^="#"]:not([href="#top"])').on('click', function () {
		//scroll speed
		var speed = 500;
		var mode = 'swing';

		if ($(this).hasClass('no-smooth')) {
		} else {
			var href = $(this).attr('href');
			var target = $(href === '#' || href === '' ? 'html' : href);
			var position;
			position = target.offset().top;

			// SP版ヘッダー固定--ページ内リンク調整
			// if (spFlag) {
			// 	position = target.offset().top - navTop;
			// } else {
			// 	position = target.offset().top;
			// }

			$('body,html').animate({ scrollTop: position }, speed, mode);
		}
	});


	/* fade appear pagetop btn
	------------------------------------- */
	if ($('#page-top').length) {
		//setting
		var pagetop = $('#page-top');
		var speed = 'fast';
		var marginSet = 300;

		//fadeIn / fadeOut
		$(window).scroll(function () {
			if ($(this).scrollTop() > marginSet) {
				pagetop.fadeIn(speed);
			} else {
				pagetop.fadeOut(speed);
			}
		});

		//if want to stop the object#page-top near footer area
		$(window).bind("scroll", function () {
			var scrollHeight = $(document).height();
			var scrollPosition = $(window).height() + $(window).scrollTop();
			var footHeight = $("#gFooter").innerHeight();

			//pattern A (add/remove .stop)
			if (scrollHeight - scrollPosition <= footHeight) {
				pagetop.addClass('stop');
			}
			else {
				pagetop.removeClass('stop');
			}

			//pattern B (set bottom)
			var rightPosition = 20;
			var bottomPosition = 20;
			var zPosition = 90;
			var newBottom = footHeight + bottomPosition - (scrollHeight - scrollPosition);

			if (scrollHeight - scrollPosition <= footHeight) {
				pagetop.css({
					"position": "fixed",
					"right": rightPosition + "px",
					"bottom": newBottom + "px",
					"z-index": zPosition,
				});
			}
			else {
				pagetop.css({
					"position": "fixed",
					"right": rightPosition + "px",
					"bottom": bottomPosition + "px",
					"z-index": zPosition
				});
			}
		});
	}


	/* sub_nav
	------------------------------------- */
	if ($('.sub_nav').length) {
		$('.category_list .item').each(function (i) {
			$(this).addClass('item' + (i + 1));
		});
		$('.category_list .item').each(function (i) {
			$(this).children("div").attr('class', 'num' + (i + 1));
		});
		$('.category_list .item').each(function (i) {
			$(this).children(".sub_nav").addClass('sub_nav' + (i + 1));
		});
		//スマホ
		$('.category_list .spItem').each(function (i) {
			$(this).addClass('spItem' + (i + 1));
		});
		$('.category_list .spItem').each(function (i) {
			$(this).children("div").attr('class', 'num' + (i + 1));
		});
		$('.category_list .spItem').each(function (i) {
			$(this).children(".sub_nav").addClass('sub_nav' + (i + 1));
		});
		//商品カテゴリ-スマホ
		$(function () {
			$('.spItem1 .num1 a').click(function () {
				event.preventDefault();
				$(".spItem1").toggleClass("on");
			})
			$('.spItem2 .num2 a').click(function () {
				event.preventDefault();
				$(".spItem2").toggleClass("on");
			})
			$('.spItem3 .num3 a').click(function () {
				event.preventDefault();
				$(".spItem3").toggleClass("on");
			})
			$('.spItem4 .num4 a').click(function () {
				event.preventDefault();
				$(".spItem4").toggleClass("on");
			})
			$('.spItem5 .num5 a').click(function () {
				event.preventDefault();
				$(".spItem5").toggleClass("on");
			})
			$('.spItem6 .num6 a').click(function () {
				event.preventDefault();
				$(".spItem6").toggleClass("on");
			})
			$('.spItem7 .num7 a').click(function () {
				event.preventDefault();
				$(".spItem7").toggleClass("on");
			})
			$('.spItem8 .num8 a').click(function () {
				event.preventDefault();
				$(".spItem8").toggleClass("on");
			})
			$('.spItem9 .num9 a').click(function () {
				event.preventDefault();
				$(".spItem9").toggleClass("on");
			})
			$('.spItem10 .num10 a').click(function () {
				event.preventDefault();
				$(".spItem10").toggleClass("on");
			})
			$('.spItem11 .num11 a').click(function () {
				event.preventDefault();
				$(".spItem11").toggleClass("on");
			})
			$('.spItem12 .num12 a').click(function () {
				event.preventDefault();
				$(".spItem12").toggleClass("on");
			})

		});
	}
});

/** UA判定
===================================*/
var ua = navigator.userAgent.toLowerCase();
var isIE = ua.match(/msie/) || ua.match(/trident/);
var isIE8 = ua.indexOf('msie 8.') != -1;
var isOldAndroid = ua.search(/android 2.[123]/) != -1 || ua.search(/android 4.0[34]/) != -1;

var isSP = (ua.indexOf('windows') != -1 && ua.indexOf('phone') != -1)
	|| ua.indexOf('iphone') != -1
	|| ua.indexOf('ipod') != -1
	|| (ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1)
	|| (ua.indexOf('firefox') != -1 && ua.indexOf('mobile') != -1)
	|| ua.indexOf('blackberry') != -1;

var isTB = (ua.indexOf('windows') != -1 && ua.indexOf('touch') != -1)
	|| ua.indexOf('ipad') != -1
	|| (ua.indexOf('android') != -1 && ua.indexOf('mobile') == -1)
	|| (ua.indexOf('firefox') != -1 && ua.indexOf('tablet') != -1)
	|| ua.indexOf('kindle') != -1
	|| ua.indexOf('silk') != -1
	|| ua.indexOf('playbook') != -1;

// タブレット時だけviewport変更
if (isTB) {
	document.getElementById('viewport').setAttribute('content', 'width=1260');
	$('html').removeClass('no-touch');
}
