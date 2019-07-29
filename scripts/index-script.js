// checks if the viewport can fit the content in #col_id. If not change the display
// of the #target_id
function checkSize(col_id, target_id) {
  var h = $(window).height();
  if (($(col_id).outerHeight() + navHeight) > h) {
    $(target_id).css('height', 'auto');
  } else {
    $(target_id).css('height', h - navHeight);
  }
}

//captcha handling code
var captchaSucess = false;
function captchaSuccess(token) {
  captchaSucess = true;
}

function captchaExpired() {
  captchaSucess = false;
}

function captchaError() {
  captchaSucess = false;
}

function validateText(text) {
  if ((text === undefined) || (text === null) || (text === '')) {
    return false;
  } else {
    return true;
  }
}

var lastClass = '';
//displays a modal with the specified title, message and the text color
function displayModal(title, message, colorClass) {
  var t = $('#contactPopupTitle');
  var m = $('#contactPopupMessage');

  t.html(title);
  m.html(message);

  if (lastClass != '') {
    t.removeClass(lastClass);
    m.removeClass(lastClass);
  }
  t.addClass(colorClass);
  m.addClass(colorClass);
  lastClass = colorClass;

  $('#contactPopup').modal();
}

$(document).ready(function () {
  //top part of the script is for sizing elements properly
  navHeight = $('#navbar').height() + 8;
  $('.spacer-row').height(navHeight);

  checkSize('#home_col', '#home_row');

  $('#loader-container').fadeOut(1500);

  $('#btn-about-me').click(function() {
    $('body').css('overflow', 'auto');
    $('#about').fadeIn(1500);
    checkSize('#about_col', '#about_row');
    document.getElementById('about').scrollIntoView(true);
  });

  $('#btn-skills').click(function() {
    $('#skills').fadeIn(1500);
    checkSize('#skills_col', '#skills_row');
    document.getElementById('skills').scrollIntoView(true);
  });

  $('#btn-contact-me').click(function() {
    $('#skills').fadeIn(1000);
    checkSize('#skills_col', '#skills_row');

    $('#contact_me').height('auto');
    $('#contact_me_row').animate({opacity: 1}, 1500);
    checkSize('#contact_me_col', '#contact_me_row');
    document.getElementById('contact_me').scrollIntoView(true);
  });

  $(window).resize(function() {checkSize('#home_col', '#home_row')});
  $(window).resize(function() {checkSize('#about_col', '#about_row')});
  $(window).resize(function() {checkSize('#skills_col', '#skills_row')});
  $(window).resize(function() {checkSize('#contact_me_col', '#contact_me_row')});

  //Part below handles the validation (including captcha) for the contact me form
  $("#contactMeForm").submit(function(e){
    e.preventDefault();
    var t = grecaptcha.getResponse();
    if (!captchaSucess || !validateText(t)) {
      displayModal('Error!', 'Please complete the captcha challenge', 'text-danger');
      return;
    }
    $.post('post',
    {
      name: $('#name').val(),
      email: $('#email').val(),
      subject: $('#subject').val(),
      message: $('#message').val(),
      token: t
    }).done(function(data,status) {
      if (data.code == 0) {
        displayModal('Success', 'Message sent successfully!', 'text-success');
        grecaptcha.reset();
        captchaSucess = false;
      }
    }).fail(function (xhr, status, error) {
      if (xhr.status == 401) {
        displayModal('Error!', 'Please complete the captcha challenge', 'text-danger');
        captchaSucess = false;
      } else if (xhr.status == 500) {
        displayModal('Error!', error, 'text-danger');
        captchaSucess = false;
      } else {
        displayModal('Error!', 'Couldn\'t send the message', 'text-danger');
        captchaSucess = false;
      }
    });
  });
});
