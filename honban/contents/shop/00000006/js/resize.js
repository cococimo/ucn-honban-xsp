jQuery(window).on("load",function(){								
												//新着商品リスト
				function li_size(key){
				var rep = 0;
					key.each(function(i){
						
						var itemHeight = parseInt($(this).height());
						if(itemHeight > rep){
								rep = itemHeight;
							
						}
						
					});
					return rep;
					}
	
	
	var userAgent = window.navigator.userAgent.toLowerCase();
var appVersion = window.navigator.appVersion.toLowerCase();


								
								
								
		//saize変更
									
							
	$(window).resize(function() {
														var wWidth = $(window).width();
														
														
if(wWidth < 357) {
						$('.con_list_four li').each(function(i){					
							$(this).css({marginRight:2+"px",marginLeft:2+"px",width:48.5+"%"});
							$(this).siblings().css({marginRight:2+"px",marginBottom:2+"px"});
						});	
						$('.con_list_four_min li').each(function(i){					
							$(this).css({marginRight:2+"px",marginLeft:2+"px",width:48.5+"%"});
							$(this).siblings().css({marginRight:2+"px",marginBottom:2+"px"});
						});	
						
						$('.con_list_five li').each(function(i){					
							$(this).css({marginRight:1+"%",marginLeft:1+"%",width:48.5+"%"});
							$(this).siblings().css({marginRight:1+"%",marginBottom:1+"%"});
						});	
						$('.con_list_five li:nth-child(2n)').css({marginLeft:0+"%"});
						
						
						$('.con_list_three_o li').each(function(i){					
							$(this).css({marginRight:2+"px",marginLeft:2+"px",width:138+"px"});
							$(this).siblings().css({marginRight:2+"px",marginBottom:2+"px"});
						});																
						$('.blogArea').css({float:+"none",width:98+"%"});
						$('.tokuArea').css({float:+"none",width:98+"%",marginLeft:0});
						$('.blogArea .con_list_three li').each(function(i){					
							$(this).css({marginRight:1+"%",marginLeft:1+"%",width:48.0+"%"});
							$(this).siblings().css({marginRight:1+"%",marginBottom:1+"%"});
						});		
						$('.tokuArea .con_list_three li').each(function(i){					
							$(this).css({marginRight:1+"%",marginLeft:1+"%",width:98+"%"});
						});
							
					}else if(wWidth < 768 && wWidth > 640) {
						$('.con_list_four li').each(function(i){	
							$(this).css({marginRight:0+"%",marginLeft:2+"%",width:22.5+"%"});				
						});		
						$('.con_list_four_min li').each(function(i){	
							$(this).css({marginRight:0+"%",marginLeft:2+"%",width:22.5+"%"});				
						});	
							
						$('.con_list_five li').each(function(i){	
								$(this).css({marginRight:0+"%",marginLeft:2+"%",width:14.66+"%"});				
						});							
						$('.con_list_five li:nth-child(5n)').css({marginRight:0+"px",marginLeft:0+"px"});	
						
						$('.con_list_three_o li').each(function(i){	
								$(this).css({marginRight:2+"%",marginLeft:0+"px",width:32+"%"});				
						});							
						$('.con_list_three_o li:nth-child(3n)').css({marginRight:0+"px"});						
						
						$('.blogArea').css({float:+"left",width:66+"%",marginLeft:2+"%"});
						$('.tokuArea').css({float:+"left",width:28+"%",marginLeft:2+"%"});
						$('.con_list_three li').each(function(i){	
								$(this).css({marginRight:3+"%",marginLeft:0+"px",width:48.0+"%"});
								$('.con_list_three li:nth-child(2n)').css({marginRight:0+"px"});					
						});
						$('.tokuArea .con_list_three li').css({float:+"left",width:100+"%",marginLeft:0});
						
					}else if(wWidth < 640 && wWidth > 357) {
						$('.con_list_four li').each(function(i){	
							$(this).css({marginRight:0+"%",marginLeft:2+"%",width:22.5+"%"});				
						});		
						$('.con_list_four_min li').each(function(i){	
							$(this).css({marginRight:0+"%",marginLeft:2+"%",width:22.5+"%"});				
						});	
							
						$('.con_list_five li').each(function(i){	
								$(this).css({marginRight:0+"%",marginLeft:2+"%",width:14.66+"%"});				
						});							
						$('.con_list_five li:nth-child(5n)').css({marginRight:0+"px",marginLeft:0+"px"});	
						
						$('.con_list_three_o li').each(function(i){	
								$(this).css({marginRight:2+"%",marginLeft:0+"px",width:32+"%"});				
						});							
						$('.con_list_three_o li:nth-child(3n)').css({marginRight:0+"px"});						
						
						$('.blogArea').css({float:+"left",width:66+"%",marginLeft:2+"%"});
						$('.tokuArea').css({float:+"left",width:28+"%",marginLeft:2+"%"});
						$('.con_list_three li').each(function(i){	
								$(this).css({marginRight:3+"%",marginLeft:0+"px",width:48.0+"%"});
								$('.con_list_three li:nth-child(2n)').css({marginRight:0+"px"});					
						});
						$('.tokuArea .con_list_three li').css({float:+"left",width:100+"%",marginLeft:0});
						
					}else if(wWidth > 640) {
						$('.con_list_four li').each(function(i){	
							$(this).css({marginRight:10+"px",marginLeft:0+"px",width:177+"px"});				
						});
						$('.con_list_four li:nth-child(4n)').css({marginRight:0+"px"});	
						$('.con_list_four_min li').each(function(i){	
							$(this).css({marginRight:10+"px",marginLeft:0+"px",width:177+"px"});				
						});
						$('.con_list_four_min li:nth-child(4n)').css({marginRight:0+"px"});	
												
						$('.con_list_five li').each(function(i){	
							$(this).css({marginRight:10+"px",marginLeft:0+"px",width:140+"px"});				
						});
						$('.con_list_five li:nth-child(5n)').css({marginRight:0+"px"});	
							
						$('.con_list_three_o li').each(function(i){	
							$(this).css({marginRight:10+"px",marginLeft:0+"px",width:140+"px"});				
						});
						$('.con_list_three_o li:nth-child(3n)').css({marginRight:0+"px"});						
							
					}
				});				
			
				

				

	
	
	//risize
	var wWidth = $(window).width();
					if(wWidth < 357) {
						$('.con_list_four li').each(function(i){					
							$(this).css({marginRight:2+"px",marginLeft:2+"px",width:48.5+"%"});
							$(this).siblings().css({marginRight:2+"px",marginBottom:2+"px"});
						});	
						$('.con_list_four_min li').each(function(i){					
							$(this).css({marginRight:2+"px",marginLeft:2+"px",width:48.5+"%"});
							$(this).siblings().css({marginRight:2+"px",marginBottom:2+"px"});
						});						
						
						$('.con_list_five li').each(function(i){					
							$(this).css({marginRight:1+"%",marginLeft:1+"%",width:48.5+"%"});
							$(this).siblings().css({marginRight:1+"%",marginBottom:1+"%"});
						});	
						$('.con_list_five li:nth-child(2n)').css({marginLeft:0+"%"});
						
						
						$('.con_list_three_o li').each(function(i){					
							$(this).css({marginRight:2+"px",marginLeft:2+"px",width:138+"px"});
							$(this).siblings().css({marginRight:2+"px",marginBottom:2+"px"});
						});																
						$('.blogArea').css({float:+"none",width:98+"%"});
						$('.tokuArea').css({float:+"none",width:98+"%",marginLeft:0});
						$('.blogArea .con_list_three li').each(function(i){					
							$(this).css({marginRight:1+"%",marginLeft:1+"%",width:48.0+"%"});
							$(this).siblings().css({marginRight:1+"%",marginBottom:1+"%"});
						});		
						$('.tokuArea .con_list_three li').each(function(i){					
							$(this).css({marginRight:1+"%",marginLeft:1+"%",width:98+"%"});
						});
							
					}else if(wWidth < 768 && wWidth > 640) {
						$('.con_list_four li').each(function(i){	
							$(this).css({marginRight:0+"%",marginLeft:2+"%",width:22.5+"%"});				
						});		
						$('.con_list_four_min li').each(function(i){	
							$(this).css({marginRight:0+"%",marginLeft:2+"%",width:22.5+"%"});				
						});	
							
						$('.con_list_five li').each(function(i){	
								$(this).css({marginRight:0+"%",marginLeft:2+"%",width:14.66+"%"});				
						});							
						$('.con_list_five li:nth-child(5n)').css({marginRight:0+"px",marginLeft:0+"px"});	
						
						$('.con_list_three_o li').each(function(i){	
								$(this).css({marginRight:2+"%",marginLeft:0+"px",width:32+"%"});				
						});							
						$('.con_list_three_o li:nth-child(3n)').css({marginRight:0+"px"});						
						
						$('.blogArea').css({float:+"left",width:66+"%",marginLeft:2+"%"});
						$('.tokuArea').css({float:+"left",width:28+"%",marginLeft:2+"%"});
						$('.con_list_three li').each(function(i){	
								$(this).css({marginRight:3+"%",marginLeft:0+"px",width:48.0+"%"});
								$('.con_list_three li:nth-child(2n)').css({marginRight:0+"px"});					
						});
						$('.tokuArea .con_list_three li').css({float:+"left",width:100+"%",marginLeft:0});
						
					}else if(wWidth < 640 && wWidth > 357) {
						$('.con_list_four li').each(function(i){	
							$(this).css({marginRight:0+"%",marginLeft:2+"%",width:22.5+"%"});				
						});	
						$('.con_list_four_min li').each(function(i){	
							$(this).css({marginRight:0+"%",marginLeft:2+"%",width:22.5+"%"});				
						});		

							
						$('.con_list_five li').each(function(i){	
								$(this).css({marginRight:0+"%",marginLeft:2+"%",width:14.66+"%"});				
						});							
						$('.con_list_five li:nth-child(5n)').css({marginRight:0+"px",marginLeft:0+"px"});	
						
						$('.con_list_three_o li').each(function(i){	
								$(this).css({marginRight:2+"%",marginLeft:0+"px",width:32+"%"});				
						});							
						$('.con_list_three_o li:nth-child(3n)').css({marginRight:0+"px"});						
						
						$('.blogArea').css({float:+"left",width:66+"%",marginLeft:2+"%"});
						$('.tokuArea').css({float:+"left",width:28+"%",marginLeft:2+"%"});
						$('.con_list_three li').each(function(i){	
								$(this).css({marginRight:3+"%",marginLeft:0+"px",width:48.0+"%"});
								$('.con_list_three li:nth-child(2n)').css({marginRight:0+"px"});					
						});
						$('.tokuArea .con_list_three li').css({float:+"left",width:100+"%",marginLeft:0});
						
					}else if(wWidth > 640) {
						$('.con_list_four li').each(function(i){	
							$(this).css({marginRight:10+"px",marginLeft:0+"px",width:177+"px"});				
						});
						$('.con_list_four li:nth-child(4n)').css({marginRight:0+"px"});	

						$('.con_list_four_min li').each(function(i){	
							$(this).css({marginRight:10+"px",marginLeft:0+"px",width:177+"px"});				
						});
						$('.con_list_four_min li:nth-child(4n)').css({marginRight:0+"px"});	
						
						$('.con_list_five li').each(function(i){	
							$(this).css({marginRight:10+"px",marginLeft:0+"px",width:140+"px"});				
						});
						$('.con_list_five li:nth-child(5n)').css({marginRight:0+"px"});	
							
						$('.con_list_three_o li').each(function(i){	
							$(this).css({marginRight:10+"px",marginLeft:0+"px",width:140+"px"});				
						});
						$('.con_list_three_o li:nth-child(3n)').css({marginRight:0+"px"});						
							
					}
	
	
	if (userAgent.indexOf('chrome') != -1) {

				$('.con_list_four li img').bind('load',function(){
					resize = li_size($('.con_list_four li'));
					$('.con_list_four li').each(function(i){					
						$(this).css({height:resize+10+"px"});
					});
					
					$('.con_list_four li:nth-child(4n)').css({marginRight:0+"px"});
				});
				$('.con_list_four_min li img').bind('load',function(){
					resize = li_size($('.con_list_four_min li'));
					$('.con_list_four_min li').each(function(i){					
						$(this).css({height:resize+10+"px"});
					});
					
					$('.con_list_four_min li:nth-child(4n)').css({marginRight:0+"px"});
				});	
				$('.con_list_five li img').bind('load',function(){	
					resize5 = li_size($('.con_list_five li'));
					$('.con_list_five li').each(function(i){					
						$(this).css({height:resize5+"px"});
					});
					$('.con_list_five li:nth-child(5n)').css({marginRight:0+"px"});
				});	
	
					if(wWidth < 360) {
					$('.blogArea').css({float:+"none",width:98+"%",marginBottom:20+"px"});
					$('.tokuArea').css({float:+"none",width:98+"%",marginLeft:0});
					resize6 = li_size($('.blogArea .con_list_three li'));
					$('.blogArea .con_list_three li').each(function(i){					
						$(this).css({height:resize6+30+"px"});
					});
					$('.blogArea .con_list_three li:eq(1)').css({marginRight:0+"px"});	
				
					resize7 = li_size($('.tokuArea .con_list_three li'));
					$('.tokuArea .con_list_three li').each(function(i){					
						$(this).css({height:resize7-100+"px"});
					});				
						
						}else{
						
						resize6 = li_size($('.con_list_three li'));
					$('.con_list_three li').each(function(i){					
						$(this).css({height:resize6+"px"});
					});
					$('.con_list_three li:eq(1)').css({marginRight:0+"px"});	
						
						}	


	}else if (userAgent.indexOf('safari') != -1) {
		
				$('.con_list_four li img').bind('load',function(){
					resize = li_size($('.con_list_four li'));
					$('.con_list_four li').each(function(i){					
						$(this).css({height:resize+10+"px"});
					});
					
					$('.con_list_four li:nth-child(4n)').css({marginRight:0+"px"});
				});
				$('.con_list_four_min li img').bind('load',function(){
					resize = li_size($('.con_list_four_min li'));
					$('.con_list_four_min li').each(function(i){					
						$(this).css({height:resize+10+"px"});
					});
					
					$('.con_list_four_min li:nth-child(4n)').css({marginRight:0+"px"});
				});
					
				$('.con_list_five li img').bind('load',function(){	
					resize5 = li_size($('.con_list_five li'));
					$('.con_list_five li').each(function(i){					
						$(this).css({height:resize5+"px"});
					});
					$('.con_list_five li:nth-child(5n)').css({marginRight:0+"px"});
				});	
	
					if(wWidth < 360) {
					$('.blogArea').css({float:+"none",width:98+"%",marginBottom:20+"px"});
					$('.tokuArea').css({float:+"none",width:98+"%",marginLeft:0});
					resize6 = li_size($('.blogArea .con_list_three li'));
					$('.blogArea .con_list_three li').each(function(i){					
						$(this).css({height:resize6+30+"px"});
					});
					$('.blogArea .con_list_three li:eq(1)').css({marginRight:0+"px"});	
				
					resize7 = li_size($('.tokuArea .con_list_three li'));
					$('.tokuArea .con_list_three li').each(function(i){					
						$(this).css({height:resize7-100+"px"});
					});			
				
						}else{
						
						resize6 = li_size($('.con_list_three li'));
					$('.con_list_three li').each(function(i){					
						$(this).css({height:resize6+"px"});
					});
					$('.con_list_three li:eq(1)').css({marginRight:0+"px"});	
						
						}
	
	}else {
					resize = li_size($('.con_list_four li'));
					$('.con_list_four li').each(function(i){					
						$(this).css({height:resize+10+"px"});
					});
					$('.con_list_four li:nth-child(4n)').css({marginRight:0+"px"});

					resize = li_size($('.con_list_four_min li'));
					$('.con_list_four_min li').each(function(i){					
						$(this).css({height:resize+10+"px"});
					});
					$('.con_list_four_min li:nth-child(4n)').css({marginRight:0+"px"});
					
					resize5 = li_size($('.con_list_five li'));
					$('.con_list_five li').each(function(i){					
						$(this).css({height:resize5+"px"});
					});
					$('.con_list_five li:nth-child(5n)').css({marginRight:0+"px"});
					
	
					
					if(wWidth < 360) {
					$('.blogArea').css({float:+"none",width:98+"%",marginBottom:20+"px"});
					$('.tokuArea').css({float:+"none",width:98+"%",marginLeft:0});
					resize6 = li_size($('.blogArea .con_list_three li'));
					$('.blogArea .con_list_three li').each(function(i){					
						$(this).css({height:resize6+35+"px"});
					});
					$('.blogArea .con_list_three li:eq(1)').css({marginRight:0+"px"});	
				
					resize7 = li_size($('.tokuArea .con_list_three li'));
					$('.tokuArea .con_list_three li').each(function(i){					
						$(this).css({height:resize7-100+"px"});
					});			
					
				
						}else{
						
						resize6 = li_size($('.con_list_three li'));
					$('.con_list_three li').each(function(i){					
						$(this).css({height:resize6+"px"});
					});
					$('.con_list_three li:eq(1)').css({marginRight:0+"px"});	
						
						}
					
		
	}
	

	
			//カテゴリースクロール
	
	$('.header_cate a').on('click',function(e){
	e.preventDefault();
	
	var y = document.getElementById('catLink').offsetTop;
	
	$('body,html').animate({scrollTop:y}, 400, 'swing');
	});
	
	//sp_menu
					$('.sp_top_menu a').on('click',function(){
				$('.sp_nav').slideToggle();
					return false;
				});
				
				$('.sp_nav_close a').on('click',function(){
				$('.sp_nav').slideToggle();
					return false;
				});
				
				$('.btn_close_sp a').on('click',function(){
					$('.sp_nav').slideUp();
					return false;
				});
						
});