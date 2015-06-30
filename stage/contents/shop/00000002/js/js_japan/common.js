$(function(){
	alert('test');
	$('.cartArea .itemImg:last-child').hide();
	$('.cartArea .itemSelect li').click(function){
		alert($(this).index());
	});
});