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

  $(window).scroll(function () {
    $(this).removeClass("animate");

    $('.animation').each(function () {
        var imagePos = $('.top').offset().top;
        var resetPost = $('.top').offset().bottom;
        var imageHeight = $('.top').height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
            $(this).addClass("animate");
            jQuery('.typo').stop().animate({ left: '50px', width: '0px'  });
        } 
        
        if(imagePos == topOfWindow) {
          $(this).removeClass("animate");
          if ($(window).width() < 858) {
            jQuery('.typo').stop().animate({ left: '110px', width: '200px'  });
          }
          else{
            jQuery('.typo').stop().animate({ left: '140px', width: '200px'  });
          }
        }
    }); 
  });
});
