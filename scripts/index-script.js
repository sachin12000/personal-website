$(document).ready(function () {
  $('#loader-container').fadeOut(1500);

  $('#btn-about-me').click(function() {
    $('body').css('overflow', 'auto');
    $('#about').fadeIn(1500);
    document.getElementById('about').scrollIntoView(true);
  });

  $('#btn-skills').click(function() {
    $('#skills').fadeIn(1500);
    document.getElementById('skills').scrollIntoView(true);
  })
});
