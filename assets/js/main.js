(function ($) {
  "use strict";


  /*==================================================================
  [ Validate ]*/
  var name = $('.validate-input input[name="name"]');
  var email = $('.validate-input input[name="email"]');
  var phone = $('.validate-input input[name="phone"]');
  var website = $('.validate-input input[name="website"]');
  var project = $('.validate-input textarea[name="project"]');
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

    if (!check)
      return false;

    // Get form data
    var formData = {
      name: $(name).val().trim(),
      email: $(email).val().trim(),
      phone: $(phone).val().trim(),
      website: $(website).val().trim(),
      project: $(project).val().trim(),
      message: $(message).val().trim()
    };

    // Show loading state
    var submitBtn = $('.contact1-form-btn');
    var originalText = submitBtn.find('span').text();
    submitBtn.find('span').text('Sending...');
    submitBtn.prop('disabled', true);

    // Try multiple approaches to handle CORS issues
    function trySubmit() {
      // Method: JSONP with GET request
      $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwffTUEp2p_rUNxXHzSq9QFYJ7-ugMZWWsGL1l2dTeLpin38OZMOTOYWLnkHMNXIkh58A/exec",
        method: "GET",
        data: formData,
        dataType: "jsonp",
        jsonpCallback: 'callback',
        crossDomain: true,
        timeout: 8000,
        success: function (response) {
          submitBtn.find('span').text(originalText);
          submitBtn.prop('disabled', false);

          if (response && response.result == "success") {
            $('.contact1-form')[0].reset();
            alert('Your message is en route.');
            return true;
          }
          else {
            alert("Something went awry. Please try again or contact us directly.");
          }
        },
        error: function (xhr, status, error) {
          // console.log("JSONP Error:", status, error);

          // Method 2: Fallback to form submission
          submitBtn.find('span').text(originalText);
          submitBtn.prop('disabled', false);

          // Create a temporary form and submit it
          var tempForm = $('<form>', {
            'method': 'POST',
            'action': 'https://script.google.com/macros/s/AKfycbwffTUEp2p_rUNxXHzSq9QFYJ7-ugMZWWsGL1l2dTeLpin38OZMOTOYWLnkHMNXIkh58A/exec'
          });

          $.each(formData, function(key, value) {
            if (value) {
              tempForm.append($('<input>', {
                'type': 'hidden',
                'name': key,
                'value': value,
              }));
            }
          });

          $('body').append(tempForm);

          tempForm.submit(function() {
            return false;
          });
          tempForm.remove();

          alert('Your message has been sent!');
          $('.contact1-form')[0].reset();
        }
      });
    }

    // Start the submission process
    trySubmit();
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

  /*==================================================================
  [ Mobile Dropdown Navigation ]*/
  // Prevent navigation for dropdown parent links that are just '#'
  $(document).on('click', '#nav ul li.dropdown > a[href="#"]', function(e) {
    e.preventDefault();
  });
  
  // Toggle dropdown menus on mobile
  $(document).on('click', '#nav ul li.dropdown > a', function(e) {
    if ($(window).width() <= 960) {
      e.preventDefault();
      var $dropdown = $(this).parent('.dropdown');
      var $menu = $dropdown.find('.dropdown-menu');
      
      // Close other dropdowns
      $('.dropdown').not($dropdown).find('.dropdown-menu').slideUp(200);
      $('.dropdown').not($dropdown).removeClass('active');
      
      // Toggle current dropdown
      $dropdown.toggleClass('active');
      $menu.slideToggle(200);
    }
  });

  // Close dropdowns when clicking outside on mobile
  $(document).on('click', function(e) {
    if ($(window).width() <= 960) {
      if (!$(e.target).closest('#nav ul li.dropdown').length) {
        $('.dropdown-menu').slideUp(200);
        $('.dropdown').removeClass('active');
      }
    }
  });
  
  // Close dropdowns when mobile menu is closed
  $('#check').on('change', function() {
    if (!$(this).is(':checked')) {
      $('.dropdown-menu').slideUp(200);
      $('.dropdown').removeClass('active');
    }
  });

})(jQuery);
