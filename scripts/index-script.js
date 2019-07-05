// checks if the viewport can fit the content in #col_id. If not change the display
// of the #target_id
function checkSize(col_id, target_id) {
  var h = $(window).height();
  if ($(col_id).outerHeight() > h) {
    $(target_id).css('height', 'auto');
  } else {
    $(target_id).css('height', h);
  }
}

$(document).ready(function () {
  //add padding to the top so the navbar won't cover the content
  $('#home_col').css('padding-top', $('#navbar').height() + 8);
  $('#about_col').css('padding-top', $('#navbar').height() + 8);
  $('#skills_col').css('padding-top', $('#navbar').height() + 8);

  checkSize('#home_col', '#home');

  $('#loader-container').fadeOut(1500);

  $('#btn-about-me').click(function() {
    $('body').css('overflow', 'auto');
    $('#about').fadeIn(1500);
    checkSize('#about_col', '#about');
    document.getElementById('about').scrollIntoView(true);
  });

  $('#btn-skills').click(function() {
    $('#skills').fadeIn(1500);
    checkSize('#skills_col', '#skills');
    document.getElementById('skills').scrollIntoView(true);
  })

  $(window).resize(function() {checkSize('#about_col', '#about')});
  $(window).resize(function() {checkSize(checkSize('#about_col', '#about'))});
  $(window).resize(function() {checkSize('#skills_col', '#skills')});
});
