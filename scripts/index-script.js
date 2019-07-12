// checks if the viewport can fit the content in #col_id. If not change the display
// of the #target_id
function checkSize(col_id, target_id) {
  var h = $(window).height();
  if (($(col_id).outerHeight()) > h) {
    $(target_id).css('height', 'auto');
  } else {
    $(target_id).css('height', h - navHeight);
  }
}

$(document).ready(function () {
  navHeight = $('#navbar').height() + 8;
  $('.spacer-row').height(navHeight);

  checkSize('#home', '#home_row');

  $('#loader-container').fadeOut(1500);

  $('#btn-about-me').click(function() {
    $('body').css('overflow', 'auto');
    $('#about').fadeIn(1500);
    checkSize('#about', '#about_row');
    document.getElementById('about').scrollIntoView(true);
  });

  $('#btn-skills').click(function() {
    $('#skills').fadeIn(1500);
    checkSize('#skills', '#skills_row');
    document.getElementById('skills').scrollIntoView(true);
  })

  $(window).resize(function() {checkSize('#home', '#home_row')});
  $(window).resize(function() {checkSize('#about', '#about_row')});
  $(window).resize(function() {checkSize(checkSize('#about', '#about_row'))});
  $(window).resize(function() {checkSize('#skills', '#skills_row')});
});
