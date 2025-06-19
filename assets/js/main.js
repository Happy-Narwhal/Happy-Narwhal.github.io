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

    if ($(website).val().trim() == '') {
      showValidate(website);
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

    if (!check)
      return false;

    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbxwLBatp-RP7v2UWSffxSCCqrpIZLnol4uQa6qYuyHfoGs3J1EAr2UkyLFpcw_HJYs37w/exec",
      method: "POST",
      dataType: "json",
      data: $(".contact1-form").serialize(),
      success: function (response) {
        if (response.result == "success") {
          $('.contact1-form')[0].reset();
          alert('Your message is en route.');
          return true;
        }
        else {
          alert("Something went awry. This must be a sign of the end.")
        }
      },
      error: function (response) {
        alert("Something went awry. This must be a sign of the end.")
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
