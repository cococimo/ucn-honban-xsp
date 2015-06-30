$(function(){
    $(".carouselInner").css("width",300*$(".carouselInner ul.column").size()+"px");
    $(".carouselInner ul.column:last").prependTo(".carouselInner");
    $(".carouselInner").css("margin-left","-300px");
	$(".carouselInner02").css("width",670*$(".carouselInner02 ul.column").size()+"px");
    $(".carouselInner02 ul.column:last").prependTo(".carouselInner02");
    $(".carouselInner02").css("margin-left","-670px");
    $(".carouselInner03").css("width",670*$(".carouselInner03 ul.column").size()+"px");
    $(".carouselInner03 ul.column:last").prependTo(".carouselInner03");
    $(".carouselInner03").css("margin-left","-670px");
    $(".prev").click(function(){
        $(".carouselInner").animate({
            marginLeft : parseInt($(".carouselInner").css("margin-left"))+300+"px"
        },"fast","swing" , 
        function(){
            $(".carouselInner").css("margin-left","-300px")
            $(".carouselInner ul.column:last").prependTo(".carouselInner");
            $(".next,.prev").show();
        })
    })
    $(document).ready(function(){
	  $("#ph-swipe").bind("swiperight", function(){
		  $(".carouselInner").animate({
	            marginLeft : parseInt($(".carouselInner").css("margin-left"))+300+"px"
	        },"fast","swing" , 
	        function(){
	            $(".carouselInner").css("margin-left","-300px")
	            $(".carouselInner ul.column:last").prependTo(".carouselInner");
	            $(".next,.prev").show();
	        })
	  });
	});
    $(".next").click(function(){
        $(".carouselInner").animate({
            marginLeft : parseInt($(".carouselInner").css("margin-left"))-300+"px"
        },"fast","swing" , 
        function(){
            $(".carouselInner").css("margin-left","-300px")
            $(".carouselInner ul.column:first").appendTo(".carouselInner");
            $(".next,.prev").show();
        })
    })
    $(document).ready(function(){
	  $("#ph-swipe").bind("swipeleft", function(){
		  $(".carouselInner").animate({
	            marginLeft : parseInt($(".carouselInner").css("margin-left"))-300+"px"
	        },"fast","swing" , 
	        function(){
	            $(".carouselInner").css("margin-left","-300px")
	            $(".carouselInner ul.column:first").appendTo(".carouselInner");
	            $(".next,.prev").show();
	        })
	  });
	});
	$(".prev02").click(function(){
        $(".carouselInner02").animate({
            marginLeft : parseInt($(".carouselInner02").css("margin-left"))+670+"px"
        },"fast","swing" , 
        function(){
            $(".carouselInner02").css("margin-left","-670px")
            $(".carouselInner02 ul.column:last").prependTo(".carouselInner02");
            $(".next,.prev02").show();
        })
    })
    $(".next02").click(function(){
        $(".carouselInner02").animate({
            marginLeft : parseInt($(".carouselInner02").css("margin-left"))-670+"px"
        },"fast","swing" , 
        function(){
            $(".carouselInner02").css("margin-left","-670px")
            $(".carouselInner02 ul.column:first").appendTo(".carouselInner02");
            $(".next,.prev02").show();
        })
    })
    $(".prev03").click(function(){
        $(".carouselInner03").animate({
            marginLeft : parseInt($(".carouselInner03").css("margin-left"))+670+"px"
        },"fast","swing" , 
        function(){
            $(".carouselInner03").css("margin-left","-670px")
            $(".carouselInner03 ul.column:last").prependTo(".carouselInner03");
            $(".next,.prev03").show();
        })
    })
    $(".next03").click(function(){
        $(".carouselInner03").animate({
            marginLeft : parseInt($(".carouselInner03").css("margin-left"))-670+"px"
        },"fast","swing" , 
        function(){
            $(".carouselInner03").css("margin-left","-670px")
            $(".carouselInner03 ul.column:first").appendTo(".carouselInner03");
            $(".next,.prev03").show();
        })
    })
	$('.column li').mouseover(function() { 
		$(this).children().children().children("img").css({opacity:"0.8",filter:"alpha(opacity=80)"});
	});
	$('.column li').mouseout(function() { 
		$(this).children().children().children("img").css({opacity:"1",filter:"alpha(opacity=100)"});
	});
	
    
})
