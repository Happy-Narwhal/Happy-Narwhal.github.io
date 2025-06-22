(function ($) {
  "use strict";


  /*==================================================================
  [ Validate ]*/
  var name = $('.validate-input input[name="name"]');
  var email = $('.validate-input input[name="email"]');
  var phone = $('.validate-input input[name="phone"]');
  var website = $('.validate-input input[name="website"]');
  var project = $('.validate-input input[name="project"]');
  var message = $('.validate-input textarea[name="message"]');
  var validm = $('.validate-message');

  $('.validate-form').on('submit', function (e) {

    var check = true;

    if ($(name).val().trim() == '') {
      showValidate(name);
      check = false;
    }

    if ($(phone).val().trim() == '') {
      showValidate(phone);
      check = false;
    }

    if ($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
      showValidate(email);
      check = false;
    }

    if ($(message).val().trim() == '') {
      showValidate(message);
      check = false;
    }

    e.preventDefault();
//      url: "https://script.google.com/macros/s/AKfycbxwLBatp-RP7v2UWSffxSCCqrpIZLnol4uQa6qYuyHfoGs3J1EAr2UkyLFpcw_HJYs37w/exec",

    if (!check)
      return false;

    // const data = new FormData(e.currentTarget);
    // var data = $(".contact1-form").serialize();
    // redirect: "follow",
    // "Access-Control-Allow-Origin": '*',//'http://script.google.com',
    // mode: "no-cors",

    // contentType: "application/javascript",

    var data = {email: "email@address.com"};

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbxOPQes5sMsioPIfW4VDeiTydxNz26sQTb2K_5M7RHy1wUJ80gCG6pp3vERFC6iGFpb9Q/exec",
      method: "POST",
      crossDomain: true,
      async: true,
      // dataType: "jsonp",
      // jsonpCallback: 'callback',
      data: data,
      responseType:'application/json',
      withCredentials: false,
      // xhrFields: {
      //     withCredentials: false
      // },
      // "Access-Control-Allow-Origin": 'script.google.com',
      contentType: 'application/json',
      "X-Content-Type-Options": "nosniff",
      headers: {
        // "Content-Type": "text/plain;charset=utf-8",
        // "Content-Type": "application/json",
        // "X-Content-Type-Options": "nosniff",
        "Access-Control-Allow-Origin": 'script.google.com',
        // "Content-Length": data.length,
        // "Host": "script.google.com"
      },
      success: function (response) {
        if (response.result == "success") {
          $('.contact1-form')[0].reset();
          alert('Your message is en route.');
          return true;
        }
        else {
          alert("Something went awry response. This must be a sign of the end.")
        }
      },
      error: function (response) {
        alert("Something went awry ajax error. This must be a sign of the end.")
      }
    })
  });


  $('.validate-form .input1').each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');

    $(validm)[0].style.display = 'block';
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
    $(validm)[0].style.display = 'none';
  }

})(jQuery);
