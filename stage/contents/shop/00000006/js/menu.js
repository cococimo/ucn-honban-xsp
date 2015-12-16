jQuery(function(){
				
	jQuery('ul#nav ul').each(function(){
	
	this.style.display = 'none';
													  
	});
	
	
	jQuery('ul#nav > li').each(function(index){
	
	if(index == 1){
		
		jQuery(this).hover(function(){
									
					jQuery(this).find('ul').css('display','block');
					var src = jQuery(this).find('img:first').attr('src');
					jQuery(this).find('img:first').attr('src',src.replace(/(\.gif|\.jpg|\.png)/, "_on" + "$1"));
						},
					function(){
					jQuery(this).find('ul').css('display','none');
					var src = jQuery(this).find('img:first').attr('src');
					jQuery(this).find('img:first').attr('src',src.replace("_on", ''));
					});
	}
	
	});
	
	
});