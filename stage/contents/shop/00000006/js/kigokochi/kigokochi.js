/*
 * - jqueryは1.7.2
 * - ページトップのスムーススクロール
 * - ロールオーバー
 * - お買い物かごを見るを挿入
 * - SP用のアコーディオン（カートボタン）JSでDOM複製するかhtmlで置いとくか要相談
 * - カルーセル
 * - 左カラムの商品押したら左カラムの商品入れ替え 
 * - 基本的なPCSP判定
 * - PC用ヘッダーの全商品一覧プルダウン
 * 
 * 
 * 
 * 
 * culumus用
 */
;(function(win, doc, $) {
  'use strict';

  if (!$) { return; }

  var ua_ = navigator.userAgent.toLowerCase(),
    ios_ = /(iphone|ipad|ipod)/.test(ua_),
    Android_ = /android/.test(ua_),
    sp_ = ios_ || Android_ || false;
  //fixed number

  var
  _isSP = false,
  _isOpen = {},

  _PC_ = {
    CLASS: 'devicePC'
  },
  _SP_ = {
    SIZE:  640,
    CLASS: 'deviceSP'
  },
  _THUMB_NUM_ = {
    CAROUSEL: 10,
    RELATED: 3
  },
  _SRC_ = {
    TOP_SLIDE: {
      NEXT: '<img src="/contents/shop/00000006/shop/image/kigokochi/main_arrow_r.gif" alt="">',
      PREV: '<img src="/contents/shop/00000006/shop/image/kigokochi/main_arrow_l.gif" alt="">'
    },
    SLIDE: {
      NEXT: '<img src="/contents/shop/00000006/shop/image/kigokochi/detail_arrow_r.png" alt="">',
      PREV: '<img src="/contents/shop/00000006/shop/image/kigokochi/detail_arrow_l.png" alt="">'
    }
  },
  _dom = {
    body: 'body',
    spnav: '.sp_nav',
    spmember: '.sp_member',
    splogin: '.sp_login_menu',
    headcart: '.header_cart',
    color: '.colorList',
    contcart: '.acoBox',
    contcartbtn: '.acoBtn',
    settle: '.l_con_list_03',
    itemdetail: '.r_con_box_03',
    itemslide: '.slideSection',
    hover: 'a:not(.variation-hover), button, input[type="submit"], input[type="image"], .colorList li img',
    hover_cumulus: '.cumulus .variation-area li a',
    related: '.related_item',
    socialbtn: '.social-btn',
    headkigokochi: '#header_kigokochi'
  },
  _name = {
    active: 'active',
    android: 'android',
    slide: 'slides',
    spcart: 'sp_cart',
    spsettle: 'sp_settle'
  },
  _style = ''+
    '<style type="text/css">'+
      '.deviceSP .sliderCarousel .slides li img{'+
        'width: 95%;'+
        'height: auto;'+
        'border: 1px solid #eaeaea;'+
      '}'+
      '.deviceSP .sliderCarousel .slides .flex-active-slide img{'+
        'border: 1px solid #000;'+
      '}'+
      '.deviceSP .con_list .box_01{'+
        'width: 86.2%;'+
        'margin: 0 auto;'+
      '}'+
      '.devicePC .acoBox.sp_cart{'+
        'display: none;'+
      '}'+
      '.deviceSP .acoBox.sp_cart{'+
        'display: block;'+
      '}'+
      '.devicePC .sp_settle{'+
        'display: none;'+
      '}'+
      '.deviceSP .sp_settle{'+
        'display: block;'+
      '}'+
      '.devicePC .sliderCarousel .slides{'+
        'margin-left: 0 !important;'+
      '}'+
      '.flex-direction-nav .flex-disabled{'+
        // 'opacity: 1 !important;'+
        'display: none !important;'+
      '}'+
      '.deviceSP{'+
        'min-width: 0;'+
      '}'+
      '.deviceSP #container{'+
        'min-width: 0;'+
      '}'+
      '.deviceSP #top #mainVisual{'+
        'padding-bottom: 25px;'+
        'margin-bottom: 25px;'+
      '}'+
      '.deviceSP #top #mainVisual .flex-control-nav{'+
        'bottom: 0;'+
      '}'+
      '.deviceSP .flex-control-paging li a{'+
        'width: 15px;'+
        'height: 15px;'+
      '}'+
      '.deviceSP #top #mainVisual .flex-viewport{'+
        'width: 100%;'+
        'height: auto;'+
        'padding-bottom: 0;'+
      '}'+
      '.deviceSP #top #mainVisual .slides li a{'+
        'width: auto;'+
      '}'+
      '.deviceSP #top #mainVisual .flex-direction-nav{'+
        'display: none;'+
      '}'+
      '.deviceSP #top #mainVisual .slides{'+
        'position: relative;'+
      '}'+
      '.deviceSP #top #mainVisual ul{'+
        'margin-left: 0 !important;'+
      '}'+
      '.deviceSP #top #mainVisual .flex-viewport{'+
        'overflow: hidden !important;'+
      '}'+
      '.devicePC #top #mainVisual .slides li span,'+
      '.devicePC #top #mainVisual .slides li a{'+
        'display: block;'+
        'width: 970px;'+
        'text-align: center;'+
      '}'+
      '.devicePC #top #mainVisual .flex-direction-nav .flex-prev{'+
        'left: 350px;'+
      '}'+
      '.devicePC #top #mainVisual .flex-direction-nav .flex-next{'+
        'right: 350px;'+
      '}'+
      '.devicePC #top #mainVisual{'+
        'width: 970px;'+
        'margin: 0 -5px;'+
      '}'+
      '.deviceSP #header{'+
        'position: absolute;'+
      '}'+
      '.devicePC #header #header_wrap #header_r #header_search{'+
        'top: 58px;'+
      '}'+
      '.devicePC #header{'+
        // 'top: -10px;'+
        'height: 106px;'+
      '}'+
      '.devicePC #header #header_wrap .header_list_03{'+
        'margin: 0;'+
        'position: relative;'+
        'top: -30px;'+
      '}'+
      '.devicePC #header #header_wrap #header_r{'+
        'position: absolute;'+
      '}'+
      '.deviceSP #header #header_wrap{'+
        'top: 100%;'+
      '}'+
      '.deviceSP #header #header_wrap .header_lists{'+
        'display: none;'+
      '}'+
      /* sp header */
      '.deviceSP #header .sp_top_menu,'+
      '.deviceSP #header .sp_top_home,'+
      '.deviceSP #header .sp_header_cart{'+
        'height: auto;'+
        'line-height: 0;'+
      '}'+
      '.deviceSP #header .sp_top_menu a,'+
      '.deviceSP #header .sp_top_home a,'+
      '.deviceSP #header .sp_header_cart a{'+
        'padding-top: 42%;'+
      '}'+
      '.deviceSP #header #header_wrap #header_logo{'+
        'height: auto;'+
        'line-height: 0;'+
        'padding-top: 14%;'+
      '}'+
      '.deviceSP #header .sp_nav .sp_member a,'+
      '.deviceSP #header .sp_nav .sp_login_menu a{'+
        'width: 100% !important;'+
        'background-size: 100%;'+
        'line-height: 0 !important;'+
        'padding-top: 27%;'+
      '}'+
      '.deviceSP #contents{'+
        'padding-top: 50%;'+
      '}'+
      '.deviceSP #header #header_wrap #header_r #header_search{'+
        'top: auto;'+
      '}'+
      '.deviceSP #header #header_wrap #header_r{'+
        'padding-top: 13%;'+
      '}'+
    '</style>';
  $(_style).appendTo('head');

  $(function(){
    _init();
  });
  return;

  function _init(){
    var
    _num = 0,
    _clone,
    _clone_settle,
    _target,
    _cartLabel;

    //scroll
//    $(doc.body).find('a[href^="#"]').each(function(e){
//      $(this).click(function(e) {
//        if($(this)[0].className.match(/(flex-next|flex-prev)/)) return;
//        e.originalEvent.preventDefault();
//
//        _target = $(this)[0].href ? $('#' + $(this)[0].href.split('#')[1]) : $('html');
//        if(!_target.offset()) return;
//        $('html, body').animate({scrollTop: _target.offset().top},500);
//      });
//    });

    //rollover
    if(!sp_){
      $(_dom.body).on('mouseout', _dom.hover, function(){
          $(this).stop().animate({'opacity': 1}, 300);
      });
      $(_dom.body).on('mouseover', _dom.hover, function(){
          $(this).stop().animate({'opacity': .5}, 300);
      });
    }
    if(Android_) {
      $('html').addClass(_name.android);
    }
    //
    if(sp_){
    }
    /* cart button label */
    _cartLabel = (sp_) ? 'お買い物かご' : 'お買い物かごを見る';
    $(_dom.headcart).children('a').text(_cartLabel);

    // SP,PC問わずDOMを複製生成、表示はCSSにて切り替え
    _clone = $(_dom.contcart).clone(true);
    _clone.addClass(_name.spcart);

    _clone_settle = $(_dom.settle).clone(true);
    _clone_settle.addClass(_name.spsettle);
    $(_dom.itemdetail).append(_clone);
    $(_dom.itemdetail).append(_clone_settle);
      if(sp_){
	  $(_dom.socialbtn).insertAfter(_clone_settle);
//	  $(_dom.spnav).append($(_dom.headkigokochi));
      }
     //ログインしてたら
     if(!$("#header_login").text().length){
	 $('.header_list_02').addClass('islogin');
     }

    /* accordion for cart button */
    $(_dom.contcartbtn).each(function(i) {
      _num = i;
      _isOpen[i] = false;
      $(this).addClass('close');
      $(this).click(function() {
        var _self = $(this);
        if(!_isOpen[_num]) {
          _isOpen[_num] = true;
        }else{
          _isOpen[_num] = false;
        }
        $(this).next().slideToggle('slow','swing', function() {
          if(!_isOpen[_num]) {
            _self.removeClass('open');
            _self.addClass('close');
	    _self.find('img').attr('src', _self.find('img').attr('src').replace('_selection_icon_on.png', '_selection_icon.png'));
          }else{
            _self.removeClass('close');
            _self.addClass('open');
	    _self.find('img').attr('src', _self.find('img').attr('src').replace('_selection_icon.png', '_selection_icon_on.png'));
          }
        });
      });
    });
    $(_dom.contcartbtn).on('click', function(e){
//      $(e.target).next().slideToggle('slow','swing');
    });

    $(_dom.spnav).append($(_dom.spmember).clone(true));
    $(_dom.spnav).append($(_dom.splogin).clone(true));

    // page init
    _topInit();
    _detailInit();

    // window event
    _resize();
    $(win).resize(_resize);


      //culumus
      $(_dom.body).on('mouseover', _dom.hover_cumulus, function(){
          $(this).children('img').eq(0).stop().animate({'opacity': .5}, 300);
	  $(this).find('.variation-txt').show();
	  
      });
      $(_dom.body).on('mouseout', _dom.hover_cumulus, function(){
          $(this).children('img').eq(0).stop().animate({'opacity': 1}, 300);
	  $(this).find('.variation-txt').hide();
      });
	
		$('#header_itemlist>a').click(function(){
			_itemPullDown(this);
			return false;
		});
  }
	
		
	function _itemPullDown(target){
		if(!$(target).hasClass('active')){
			$(target).addClass('active').next().fadeIn();
		}else{
			$(target).removeClass('active').next().fadeOut();
		}
	}
	
	function _itemPullDownResize(){
		
	}

  function _imageLoad(elem, func){
    var
    _newImage,
    _image = $(elem).find('img'),
    _imageCnt = _image.length,
    _completeImageCnt = 0;

    _image.each(function() {
      _newImage = $('<img>');
      _newImage.load(function() {
        _completeImageCnt++;
        if (_imageCnt == _completeImageCnt){
          func && func();
        }
      }).attr('src',$(this).attr('src'));
    });
  }

  function _topInit() {
    var
    _main = $('#mainVisual'),
    _ul = _main.find('ul').get(0);

    _imageLoad('#mainVisual', function() {
      $(_ul).addClass(_name.slide);
      _main.flexslider({
        animation: 'slide',
        controlNav: true,
        directionNav: true,
        animationLoop: true,
        slideshow: true,
        nextText: _SRC_.TOP_SLIDE.NEXT,
        prevText: _SRC_.TOP_SLIDE.PREV
      });
    });
  }

  function _detailInit() {
    var
    _slider = $('.sliderInner'),
    _nav = $('.sliderCarousel'),
    _prefix = 'js-slider',
    _suffixus = '-ctrl';

    /* carousel */
    // id set.
    _slider.each(function(i) {
      var _id = _prefix + i;
      $(this).attr('id', _id);
    });
    _nav.each(function(i) {
      var _ctrlId = _prefix + i + _suffixus;
      $(this).attr('id', _ctrlId);
    });

    // init.
    _imageLoad('.sliderInner', function() {
      _slider.each(function(i) {
        var
        _id = _prefix + i,
        _ctrlId = _prefix + i + _suffixus;

        $('#' + _ctrlId).flexslider({
          animation: 'slide',
          controlNav: false,
          directionNav: true,
          animationLoop: false,
          slideshow: false,
          nextText: _SRC_.SLIDE.NEXT,
          prevText: _SRC_.SLIDE.PREV,
          itemWidth: 10,
          maxItems: _THUMB_NUM_.CAROUSEL,
          asNavFor: '#' + _id
        });

        $('#' + _id).flexslider({
          namespace: 'flex-',
          animation: 'slide',
          directionNav: true,
          animationLoop: true,
          controlNav: false,
          nextText: _SRC_.SLIDE.NEXT,
          prevText: _SRC_.SLIDE.PREV,
          slideshow: false,
          sync: '#' + _ctrlId
        });
      });
      /* color init */
      _colorInit.call({
        main: _dom.itemslide,
        elem: _dom.color,
        active: _name.active,
        current: 0
      });
      /* color change */
      $(_dom.color).find('li').each(function(i) {
        $(this).click(function() {
          if($(this).hasClass(_name.active)) return;
          _colorInit.call({
            main: _dom.itemslide,
            elem: _dom.color,
            active: _name.active,
            current: i
          });
        });
      });
    });

    _imageLoad(_dom.related, function() {
      $(_dom.related).find('ul').addClass(_name.slide);
      $(_dom.related).flexslider({
        namespace: 'flex-',
        animation: 'slide',
        directionNav: true,
        controlNav: false,
        nextText: _SRC_.SLIDE.NEXT,
        prevText: _SRC_.SLIDE.PREV,
        itemWidth: 10,
        // itemMargin: 8,
        maxItems: _THUMB_NUM_.RELATED,
        slideshow: false
      });
    });

    $(win).resize(function() {
      setTimeout(function() {
        $('.sliderCarousel').find('li').css({'width': ($('.sliderCarousel').find('.flex-viewport').width() / _THUMB_NUM_.CAROUSEL)});
        $(_dom.related).find('li').css({'width': ($(_dom.related).find('.flex-viewport').width() / _THUMB_NUM_.RELATED)});
      }, 1000);
    });

  }

  function _colorInit() {
    var
    _self = this,
    _li = '.flex-direction-nav li',
    _innerLi = '.sliderInner .flex-viewport li';

    $(this.main).each(function(i) {
      if(i == _self.current) {
        if(!$(this).hasClass(_self.active)) {
          $(this).addClass(_self.active);
        }
        $(this).find(_li).css({'display': 'block'});
        $(this).css({'height': 'auto', 'overflow': 'visible'});
        $(this).find(_innerLi).css({'display': 'block'});
      }else{
        if($(this).hasClass(_self.active)) {
          $(this).removeClass(_self.active);
        }
        $(this).find(_li).css({'display': 'none'});
        $(this).css({'height': '0px', 'overflow': 'hidden'});
        $(this).find(_innerLi).css({'display': 'none'});
      }
    });

    $(this.elem).find('li').each(function(i) {
      if(i == _self.current) {
        if(!$(this).hasClass(_self.active)) {
          $(this).addClass(_self.active);
        }
      }else{
        if($(this).hasClass(_self.active)) {
          $(this).removeClass(_self.active);
        }
      }
    });
  }

  function _resize() {
    var
    _html = $('html'),
    _width = win.innerWidth || doc.body.clientWidth;

    if(_width > _SP_.SIZE) {
      _isSP = false;
      if(_html.hasClass(_SP_.CLASS)) {
        _html.removeClass(_SP_.CLASS);
      }
      if(!_html.hasClass(_PC_.CLASS)) {
        _html.addClass(_PC_.CLASS);
      }
    }else{
      _isSP = true;
      if(!_html.hasClass(_SP_.CLASS)) {
        _html.addClass(_SP_.CLASS);
      }
      if(_html.hasClass(_PC_.CLASS)) {
        _html.removeClass(_PC_.CLASS);
      }
    }
  }

  function _getSP() {
    return _isSP;
  }
	
	

	
	

})(window, document, jQuery);





/**
 *  ブラウザ名を取得
 *  
 *  @return     ブラウザ名(ie6、ie7、ie8、ie9、ie10、ie11、chrome、safari、opera、firefox、unknown)
 *
 */
var getBrowser = function(){
    var ua = window.navigator.userAgent.toLowerCase();
    var ver = window.navigator.appVersion.toLowerCase();
    var name = 'unknown';

    if (ua.indexOf("msie") != -1){
        if (ver.indexOf("msie 6.") != -1){
            name = 'ie6';
        }else if (ver.indexOf("msie 7.") != -1){
            name = 'ie7';
        }else if (ver.indexOf("msie 8.") != -1){
            name = 'ie8';
        }else if (ver.indexOf("msie 9.") != -1){
            name = 'ie9';
        }else if (ver.indexOf("msie 10.") != -1){
            name = 'ie10';
        }else{
            name = 'ie';
        }
    }else if(ua.indexOf('trident/7') != -1){
        name = 'ie11';
    }else if (ua.indexOf('chrome') != -1){
        name = 'chrome';
    }else if (ua.indexOf('safari') != -1){
        name = 'safari';
    }else if (ua.indexOf('opera') != -1){
        name = 'opera';
    }else if (ua.indexOf('firefox') != -1){
        name = 'firefox';
    }
    return name;
};


$(function(){
	$('.sp_nav #header_member').clone().insertAfter('.sp_nav #header_login');	
	$('.sp_nav #header_mypage').clone().insertAfter('.sp_member li');
	$('.header_lists li:empty, .sp_nav li:empty').remove();
	
	$('.goods_datail_table').clone().insertAfter('.l_con_list_03');
	$('.goods_datail_table').parents('.i_main').remove();
	

	var iMainIndex = 0;
	//var iMainLoop = true;
	$('.i_main').each(function(index, element) {
		//if(!iMainLoop)return;
		
		//中身が空の場合は要素ごと削除
		if($(this).find('.detailsImg').length === 0){
			$(this).remove();
		}
		
		//テキストから始まる場合、テキスト用クラスを付与
		if(index == 0){
			if($(this).find('h2').length > 0 ){
				$(this).attr('class','introTxt');
			}	
			return;
		}
		
		//i_mainの偶数番目と奇数番目の識別用クラスを付与
		if(iMainIndex % 2 == 0 ){
			$(this).addClass('odd');
		}else{
			$(this).addClass('even');
		}
		

		
		iMainIndex++;
		
	
		/*
		if(	$('.i_main:first-child').find('h2').length === 0 ){
			$('.i_main:nth-child(odd)').css({
				'clear':'both',
				'padding-right':'15px'
			});
			
			$('.i_main:nth-child(even)').css({
				'padding-left':'15px'
			});
			
			if($('.i_main').length % 2 === 0 ){
				$('.i_main:last-child').css({
					'margin':'0 auto',
					'float':'none',
					'padding-right':0
				});
			}
		}
		*/
  });
	
	$('.bannerbox li').each(function(index, element) {
    if($(this).children().length === 0){
			$(this).remove();
		}
  });
	
	$('.res_cart .left_sku_img').each(function(index, element) {
		var imgCell = $(this).parent().prev().find('.left_sku_img');
		var txtCell = $('.res_cart .left_sku_img').next();
		
    if($(this).children().length === 0){			
			imgCell.css('top','5px')
			imgCell.find('img').css('position','absolute');			
			$(this).next().css({
				'border-top':'1px solid #DCDCDC'
			});
			$(this).next().css('height','46px');
			$(this).parent().prev().find('td').last().css('height','46px');
		}else{
			if($(this).parent().next().find('.left_sku_img').children().length > 0 || $(this).parent().next().length == 0){
				$(this).next().css('height','80px');			
			}

			$(this).parent().css({
				'border-top':'1px solid #DCDCDC'
			});
		}
  });
	
	$('.sp_gnav_link.accordion>a').click(function(){
		$(this).toggleClass('active').next().slideToggle();
		return false;
	});
	
	if($(window).width() <= 640){
		$('#footer01 .inner ul li.accordion>a').click(function(){
			$(this).toggleClass('active').next().slideToggle();
			return false;
		});
		
		$('.cate_link.only_sp>div>a').click(function(){
			$(this).parents('.cate_link').toggleClass('active').children('div').children('div').slideToggle();
			return false;
		});
		
		$('.cate_link.only_sp .btn_close_sp a').click(function(){
			$(this).parent().parent().slideUp();
			$(this).parents('.cate_link').removeClass('active');
			return false;
		});
	}
});

$(window).on('load scroll', function(){
	if(getBrowser() != 'ie8'){
		if($(this).scrollTop() > 0){
			$('#header').addClass('small');
		}else{
			$('#header').removeClass('small');
		}
		
		if($(this).scrollTop() > 500 && $(this).width() > 640){
			$('.pagetop').fadeIn();
		}else{
			$('.pagetop').fadeOut();
		}
	}
});

$(window).on('load resize', function(){
	if(getBrowser() != 'ie8'){
		if($(this).width() <= 640){
			$('.pagetop').hide();
		}else{
			if($(this).scrollTop() > 500){
				$('.pagetop').show();
			}
		}
	}
	
	$('#header_itemlist_pullDown').width($(this).width()).css('left', -($('#header #header_gnav').offset().left) + 'px');
});

