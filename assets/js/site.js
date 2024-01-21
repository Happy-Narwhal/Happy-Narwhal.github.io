$(document).ready(function () {

  $('.team-card').on('click', function () {

    if ($(this).hasClass('open')) {
      $(this).removeClass('open');
    } else {
      $('.team-card').removeClass('open');
      $(this).addClass('open');
    }

  });

  $(".bar1").click(function () {
    $("#rails").prop("checked", true);
  })
  $(".bar2").click(function () {
    $("#mern").prop("checked", true);
  })
  $(".bar3").click(function () {
    $("#jekyll").prop("checked", true);
  })

  $(".bar").click(function () {
    $(this).addClass("active").siblings().removeClass("active")
  })

  /*services-development*/
  $(".box1").click(function () {
    $(".development").prop("checked", true);
  })

  $(".box2").click(function () {
    $(".design").prop("checked", true);
  })

  $(".type-box").click(function () {
    $(this).addClass("active").siblings().removeClass("active")
  })

  /*development-subcategories*/
  $(".dev1").click(function () {
    $(".website").prop("checked", true);
  })

  $(".dev2").click(function () {
    $(".other").prop("checked", true);
  })

  $(".dev3").click(function () {
    $(".tech").prop("checked", true);
  })

  $(".dev-type-box").click(function () {
    $(this).addClass("open").siblings().removeClass("open")
  })

  /*logo animation*/
  $(window).scroll(function () {
    $(this).removeClass("animate");

    $('.animation').each(function () {
      var imagePos = $('.top').offset().top;
      var resetPost = $('.top').offset().bottom;
      var imageHeight = $('.top').height();
      var topOfWindow = $(window).scrollTop();

      if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
        $(this).addClass("animate");
        jQuery('.typo').stop().animate({ left: '50px', width: '0px' });
      }

      if (imagePos == topOfWindow) {
        $(this).removeClass("animate");
        if ($(window).width() < 858) {
          jQuery('.typo').stop().animate({ left: '110px', width: '200px' });
        }
        else {
          jQuery('.typo').stop().animate({ left: '140px', width: '200px' });
        }
      }
    });
  });


});
