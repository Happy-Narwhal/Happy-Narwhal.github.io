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

});
