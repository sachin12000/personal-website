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
  var showAbout = function () {
    $('body').css('overflow', 'auto');
    $('#about').fadeIn(1500);
    checkSize('#about_col', '#about_row');
  }

  var showSkills = function() {
    $('body').css('overflow', 'auto');
    $('#skills').fadeIn(1500);
    checkSize('#skills_col', '#skills_row');
  }
  //top part of the script is for sizing elements properly
  navHeight = $('#navbar').height() + 8;
  $('.spacer-row').height(navHeight);

  checkSize('#home_col', '#home_row');

  $('#loader-container').fadeOut(1500);

  $('#btn-about-me, [href=\"#about\"]').one('click', function() {
    showAbout();
    document.getElementById('about').scrollIntoView(true);
  });

  $('#btn-skills, [href=\"#skills\"]').one('click', function() {
    showAbout();
    showSkills();
  });

  $('#btn-contact-me, [href=\"#replace\"]').one('click', function() {
    showAbout();
    showSkills();

    $('#contact_me').height('auto');
    $('#contact_me_row').animate({opacity: 1}, 1500);
    checkSize('#contact_me_col', '#contact_me_row');
    $('[href=\"#replace\"]').attr('href', '#contact_me');
    document.getElementById('contact_me').scrollIntoView(true);
  });

  $('#btn-about-me').click(() => {document.getElementById('about').scrollIntoView(true);});

  $('#btn-skills').click(() => {document.getElementById('skills').scrollIntoView(true);});

  $('#btn-contact-me').click(() =>{document.getElementById('contact_me').scrollIntoView(true);});

  $(window).resize(function() {checkSize('#home_col', '#home_row')});
  $(window).resize(function() {checkSize('#about_col', '#about_row')});
  $(window).resize(function() {checkSize('#skills_col', '#skills_row')});
  $(window).resize(function() {checkSize('#contact_me_col', '#contact_me_row')});

  //code below handles the validation (including captcha) for the contact me form
  const config = {
  apiKey: "AIzaSyDA56KXcwKsZDYt75bqT2ILjnSI0F37PoU",
  authDomain: "forgingahead-17f20.firebaseapp.com",
  databaseURL: "https://forgingahead-17f20.firebaseio.com",
  projectId: "forgingahead-17f20",
  storageBucket: "",
  messagingSenderId: "1006422903305",
  appId: "1:1006422903305:web:223093ae9e1a13cc"};
  firebase.initializeApp(config);
  const db = firebase.database().ref();

  $("#contactMeForm").submit(function(e) {
    e.preventDefault();
    db.push({
      name: $('#name').val(),
      email: $('#email').val(),
      subject: $('#subject').val(),
      message: $('#message').val()
    }, (e) => {
      if (e === null) {
        displayModal('Success', 'Message sent successfully!', 'text-success');
      } else {
        displayModal('Error! Message not sent', 'Error message: ' + String(e), 'text-danger');
      }
    });
  });
});
