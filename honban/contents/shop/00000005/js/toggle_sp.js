$(document).ready(function(){
// dt 要素をクリックして dd 要素を表示する
  $(".catList dt").click(function(){
    $(this).next("dd:not(:animated)").slideToggle("fast");
// active クラスを加える
    $(this).toggleClass("active");
  });
// dt 要素をクリックして dd 要素を表示する
  $(".rankingList dt").click(function(){
    $(this).next("dd:not(:animated)").slideToggle("fast");
// active クラスを加える
    $(this).toggleClass("active");
  });
// dt 要素をクリックして dd 要素を表示する
  $(".treeList dt").click(function(){
    $(this).next("dd:not(:animated)").slideToggle("fast");
// active クラスを加える
    $(this).toggleClass("active");
  });
});







