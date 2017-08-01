/**
 *  GETパラメータを配列にして返す
 *  
 *  @return     パラメータのObject
 *
 */
var getUrlVars = function(){
    var vars = {}; 
    var param = location.search.substring(1).split('&');
    for(var i = 0; i < param.length; i++) {
        var keySearch = param[i].search(/=/);
        var key = '';
        if(keySearch != -1) key = param[i].slice(0, keySearch);
        var val = param[i].slice(param[i].indexOf('=', 0) + 1);
        if(key != '') vars[key] = decodeURI(val);
    } 
    return vars; 
}

function showBlogLink(){
	
}

$(function(){
	for( var i=0; i<Math.ceil( $('.link-list li').length / 20 ); i++ ){
		$('.pagenation').append('<li>' + (i+1) + '</li>');
	}
	
	$('.pagenation li').click(function(){
		var index = $('.pagenation li').index(this);
		
		$('.pagenation li').removeClass('current');
		$(this).addClass('current');
		
		$('.link-list li').removeClass('show');
		
		for(var i=index * 20; i< (index+1) * 20; i++){
			$('.link-list li').eq(i).addClass('show');
		}

		$('body,html').animate({scrollTop:0}, 0);
	});

	$('.pagenation li:first-child').trigger('click');
});
