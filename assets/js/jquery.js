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


    $('.animation').each(function () {
        var imagePos = $('.top').offset().top;
        var imageHeight = $('.top').height();
        var topOfWindow = $(window).scrollTop();

        if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
            $(this).addClass("animate");
            jQuery('.typo').stop().animate({ left: '50px', width: '0px'  });
        } 
        if(imagePos == topOfWindow) {
          $(this).removeClass("animate");
          jQuery('.typo').stop().animate({ left: '140px', width: '200px'  });
        
      }
    });
    
  
});

  /*
  var $window = $(window);
  var $elem = $(".animation")
  
  function isScrolledIntoView($elem, $window) {
      var docViewTop = $window.scrollTop();
      var docViewBottom = docViewTop + $window.height();
  
      var elemTop = $elem.offset().top;
      var elemBottom = elemTop + $elem.height();
  
      return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  $(document).on("scroll", function () {
      if (isScrolledIntoView($elem, $window)) {
        $(".animation").addClass("animate")
      }
     
  });
*/


});
