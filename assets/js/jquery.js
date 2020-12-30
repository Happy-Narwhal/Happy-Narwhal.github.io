$(document).ready(function() {

  
  $(".bar1").click(function() {
    $(".meet").prop("checked", true);
  })
  $(".bar2").click(function() {
    $(".plan").prop("checked", true);
  })
  $(".bar3").click(function() {
    $(".develop").prop("checked", true);
  })
  $(".bar4").click(function() {
    $(".launch").prop("checked", true);
  })

  $(".bar").click(function() {
    $(this).addClass("active").siblings().removeClass("active")
  })

  var modal = document.getElementById('myModal');

var img = $('.myImg');
var modalImg = $("#img01");
var captionText = document.getElementById("caption");
$('.myImg').click(function(){
    modal.style.display = "block";
    var newSrc = this.src;
    modalImg.attr('src', newSrc);
    captionText.innerHTML = this.alt;
});

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

});
