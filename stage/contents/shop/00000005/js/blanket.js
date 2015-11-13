/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(n,e,t,u,a){
//alert(jQuery.easing.default);
return jQuery.easing[jQuery.easing.def](n,e,t,u,a)},easeInQuad:function(n,e,t,u,a){return u*(e/=a)*e+t},easeOutQuad:function(n,e,t,u,a){return-u*(e/=a)*(e-2)+t},easeInOutQuad:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e+t:-u/2*(--e*(e-2)-1)+t},easeInCubic:function(n,e,t,u,a){return u*(e/=a)*e*e+t},easeOutCubic:function(n,e,t,u,a){return u*((e=e/a-1)*e*e+1)+t},easeInOutCubic:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e+t:u/2*((e-=2)*e*e+2)+t},easeInQuart:function(n,e,t,u,a){return u*(e/=a)*e*e*e+t},easeOutQuart:function(n,e,t,u,a){return-u*((e=e/a-1)*e*e*e-1)+t},easeInOutQuart:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e+t:-u/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(n,e,t,u,a){return u*(e/=a)*e*e*e*e+t},easeOutQuint:function(n,e,t,u,a){return u*((e=e/a-1)*e*e*e*e+1)+t},easeInOutQuint:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e*e+t:u/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(n,e,t,u,a){return-u*Math.cos(e/a*(Math.PI/2))+u+t},easeOutSine:function(n,e,t,u,a){return u*Math.sin(e/a*(Math.PI/2))+t},easeInOutSine:function(n,e,t,u,a){return-u/2*(Math.cos(Math.PI*e/a)-1)+t},easeInExpo:function(n,e,t,u,a){return 0==e?t:u*Math.pow(2,10*(e/a-1))+t},easeOutExpo:function(n,e,t,u,a){return e==a?t+u:u*(-Math.pow(2,-10*e/a)+1)+t},easeInOutExpo:function(n,e,t,u,a){return 0==e?t:e==a?t+u:(e/=a/2)<1?u/2*Math.pow(2,10*(e-1))+t:u/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(n,e,t,u,a){return-u*(Math.sqrt(1-(e/=a)*e)-1)+t},easeOutCirc:function(n,e,t,u,a){return u*Math.sqrt(1-(e=e/a-1)*e)+t},easeInOutCirc:function(n,e,t,u,a){return(e/=a/2)<1?-u/2*(Math.sqrt(1-e*e)-1)+t:u/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return-(s*Math.pow(2,10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i))+t},easeOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return s*Math.pow(2,-10*e)*Math.sin((e*a-r)*(2*Math.PI)/i)+u+t},easeInOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(2==(e/=a/2))return t+u;if(i||(i=a*(.3*1.5)),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return 1>e?-.5*(s*Math.pow(2,10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i))+t:s*Math.pow(2,-10*(e-=1))*Math.sin((e*a-r)*(2*Math.PI)/i)*.5+u+t},easeInBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*(e/=a)*e*((r+1)*e-r)+t},easeOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*((e=e/a-1)*e*((r+1)*e+r)+1)+t},easeInOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),(e/=a/2)<1?u/2*(e*e*(((r*=1.525)+1)*e-r))+t:u/2*((e-=2)*e*(((r*=1.525)+1)*e+r)+2)+t},easeInBounce:function(n,e,t,u,a){return u-jQuery.easing.easeOutBounce(n,a-e,0,u,a)+t},easeOutBounce:function(n,e,t,u,a){return(e/=a)<1/2.75?u*(7.5625*e*e)+t:2/2.75>e?u*(7.5625*(e-=1.5/2.75)*e+.75)+t:2.5/2.75>e?u*(7.5625*(e-=2.25/2.75)*e+.9375)+t:u*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(n,e,t,u,a){return a/2>e?.5*jQuery.easing.easeInBounce(n,2*e,0,u,a)+t:.5*jQuery.easing.easeOutBounce(n,2*e-a,0,u,a)+.5*u+t}});
jQuery.support.opacity&&// for avoiding lte IE8 
/*
  doormat - http://jh3y.github.io/doormat
  @license MIT

  jh3y (c) 2015.
 */
function(){var e,n;n={CLASS:"doormat",PANEL_CLASS:"doormat__panel",CURRENT_CLASS:"is--current"},e=window.doormat=function(r){var t,i;if(!r)throw Error("doormat: Must define an element");return e=this,e.el=r,e.el.className+=" "+n.CLASS,e.panels=e.el.children,t=function(){var r,t,i;for(i=0,r=0;r<e.panels.length;)t=e.panels[r],t.style.minHeight=window.innerHeight+"px",-1===t.className.indexOf(n.PANEL_CLASS)&&(t.className+=" "+n.PANEL_CLASS),t.DOORMAT_HEIGHT=t.offsetHeight,t.DOORMAT_POS=i,i+=t.offsetHeight,r++;return document.body.style.height=i+"px"},t(),e.current=e.panels[0],e.current.className+=" "+n.CURRENT_CLASS,i=function(r){var t;return t=e.current,t.className=t.className.replace(n.CURRENT_CLASS,""),t.style.top="next"===r?-t.DOORMAT_HEIGHT+"px":0,e.current=t[r+"ElementSibling"],e.current.className+=" "+n.CURRENT_CLASS},window.onresize=function(e){return t()},window.onscroll=function(n){var r;if(r=e.current,r.style.top=-(window.scrollY-r.DOORMAT_POS)+"px",window.scrollY>r.DOORMAT_HEIGHT+r.DOORMAT_POS){if(r.nextElementSibling)return i("next")}else if(window.scrollY<r.DOORMAT_POS&&r.previousElementSibling)return i("previous")}}}.call(this);
if(jQuery.support.opacity){// for avoiding lte IE8 
/*
		doormat - http://jh3y.github.io/doormat
		@license MIT
	
		jh3y (c) 2015
	 */
var doormat,props;props={CLASS:"doormat",PANEL_CLASS:"doormat__panel",CURRENT_CLASS:"is--current"},doormat=window.doormat=function(e){var o,t;if(!e)throw Error("doormat: Must define an element");return doormat=this,doormat.el=e,doormat.el.className+=" "+props.CLASS,doormat.panels=doormat.el.children,o=function(){var e,o,t;for(t=0,e=0;e<doormat.panels.length;)o=doormat.panels[e],o.style.minHeight=window.innerHeight+"px",-1===o.className.indexOf(props.PANEL_CLASS)&&(o.className+=" "+props.PANEL_CLASS),o.DOORMAT_HEIGHT=o.offsetHeight,o.DOORMAT_POS=t,t+=o.offsetHeight,e++;return document.body.style.height=t+"px"},o(),doormat.current=doormat.panels[0],doormat.current.className+=" "+props.CURRENT_CLASS,t=function(e){var o;return o=doormat.current,o.className=o.className.replace(props.CURRENT_CLASS,""),o.style.top="next"===e?-o.DOORMAT_HEIGHT+"px":0,doormat.current=o[e+"ElementSibling"],doormat.current.className+=" "+props.CURRENT_CLASS},window.onresize=function(e){return o()},window.onscroll=function(e){var o,a;if(o=doormat.current,a=window.scrollY||window.pageYOffset,o.style.top=-(a-o.DOORMAT_POS)+"px",a>o.DOORMAT_HEIGHT+o.DOORMAT_POS){if(o.nextElementSibling)return t("next")}else if(a<o.DOORMAT_POS&&o.previousElementSibling)return t("previous")}}}/**
 * blanket用処理
 */
bkScrFlg=!1,//clickでのスクロールイベントが終わっているかどうかの判定用
$(window).load(function(){$("a[href='#top']").on("click",function(){$("html,body").animate({scrollTop:0},1e3,"easeOutQuad")}),$(".bk_spec_wrapper").each(function(){var e=$(this),o=e.find(".bk_spec");e.hover(function(){o.stop().addClass("bk_active")},function(){o.stop().removeClass("bk_active")})}),
// for sp
$("#navToggleOff").on("click",function(){$(this).fadeOut(300,"easeOutQuad",function(){$("#navToggleOn, #bk_nav").addClass("bk_toggled"),$(".sp_menu_title").addClass("bk_hidden"),$("#bk_header").addClass("bg_gray")})}),$("#navToggleOn, .sec_move").on("click",function(){$("#bk_header").removeClass("bg_gray"),$("#navToggleOn, #bk_nav").removeClass("bk_toggled"),$(".sp_menu_title").removeClass("bk_hidden"),$("#navToggleOff").fadeIn(500,"easeOutQuad")});var e=$(window).outerWidth();if(jQuery.support.opacity&&e>640){// IE8と640px width以下の端末を除外
$(document).scroll(function(){console.log(bkScrFlg);var e=$("#bk_header"),o=$("#header"),t=$("#bk_btn_totop");$(".bk_brand").hasClass("is--current")&&(bkScrFlg=!0),$("#bk_home").length&&bkScrFlg&&setTimeout(function(){curHash=$(".is--current").attr("id"),curHash&&(location.hash=curHash),$(".bk_brand").hasClass("is--current")?(o.addClass("bk_active"),e.addClass("bk_active"),e.addClass("bk_active"),t.stop().addClass("bk_active")):(o.removeClass("bk_active"),e.removeClass("bk_active"),t.stop().removeClass("bk_active"))},200)}),$("#bk_home").length&&bkScrFlg&&(// 
curHash=$(".is--current").attr("id"),curHash&&(location.hash=curHash));var o=$("#header").outerHeight()-10;$("a[href='#sec02']").on("click",function(){var e=$("#sec01").outerHeight();$("html,body").animate({scrollTop:e+o},500,"easeOutQuad",function(){bkScrFlg=!0})}),$("a[href='#sec03']").on("click",function(){var e=$("#sec01").outerHeight()+$("#sec02").outerHeight();$("html,body").animate({scrollTop:e+o},500,"easeOutQuad",function(){bkScrFlg=!0})}),$("a[href='#sec04']").on("click",function(){var e=$("#sec01").outerHeight()+$("#sec02").outerHeight()+$("#sec03").outerHeight();$("html,body").animate({scrollTop:e+o},500,"easeOutQuad",function(){bkScrFlg=!0})}),$("a[href='#sec05']").on("click",function(){var e=$("#sec01").outerHeight()+$("#sec02").outerHeight()+$("#sec03").outerHeight()+$("#sec04").outerHeight();$("html,body").animate({scrollTop:e+o},500,"easeOutQuad",function(){bkScrFlg=!0})}),$("a[href='#sec06']").on("click",function(){var e=$("#sec01").outerHeight()+$("#sec02").outerHeight()+$("#sec03").outerHeight()+$("#sec04").outerHeight()+$("#sec05").outerHeight();$("html,body").animate({scrollTop:e+o},500,"easeOutQuad",function(){bkScrFlg=!0})});
// URLにハッシュが含まれる場合のページ内移動
var t=$(document).scrollTop();location.hash?setTimeout(function(){"#sec02"==location.hash?$("a[href='#sec02']").click():"#sec03"==location.hash?$("a[href='#sec03']").click():"#sec04"==location.hash?$("a[href='#sec04']").click():"#sec05"==location.hash?$("a[href='#sec05']").click():"#sec06"==location.hash&&$("a[href='#sec06']").click()},500):($("html,body").animate({scrollTop:t+1},10).animate({scrollTop:t+0},10).animate({scrollTop:t+1},10).animate({scrollTop:t+0},10).animate({scrollTop:t+1},10).animate({scrollTop:t+0},10).animate({scrollTop:t+1},10).animate({scrollTop:t+0},10).animate({scrollTop:t+1},10).animate({scrollTop:t+0},10),console.log("no hash"))}});