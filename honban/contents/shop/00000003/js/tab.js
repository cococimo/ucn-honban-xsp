$(document).ready(function() {
var tabcnt = 0;
var tabnum = 0;
$('#tab > li > a', this.group).each(function(){
var tabclass = ""+tabcnt;
$(this).parent().addClass(tabclass);
$(this).parent().css("cursor","pointer");
$(this).parent().append($(this).html());
$(this).remove();
tabcnt++;
});
Src = $('#tab > li.0').children('img').attr('src').replace("_off.", "_active.");
$('#tab > li.0').children('img').attr('src', Src);
$('#tab > li.0').css("cursor","default");
$('#tab_content > div', this.group).each(function(){
$(this).hide();
}).filter(':eq(0)').fadeIn("slow");
$('#tab > li').click(function() {
tabnum = $(this).attr('class');
$('#tab > li', this.group).each(function(){
var Src2 = $(this).children('img').attr('src').replace("_active.", "_off.");
$(this).children('img').attr('src', Src2);
$(this).css("cursor","pointer");
});
$(this).css("cursor","default");
var Src3 = $(this).children('img').attr('src').replace("_on.", "_active.");
Src3 = Src3.replace("_off.", "_active.");
$(this).children('img').attr('src', Src3);
$('#tab_content > div', this.group).each(function(){
$(this).hide();
}).filter(':eq('+tabnum+')').fadeIn("slow"); 
smartRollover();
});
}); 