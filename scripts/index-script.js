$(document).ready(function () {
  var checkSkills = (function() {
    var h = $( window ).height();
    // console.log($('#skills-col').outerHeight());
    if ($('#skills-col').outerHeight() > h) {
      $('#skills').css('height', 'auto');
    } else {
      $('#skills').css('height', '100vh');
    }
  });
  checkSkills();
  
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

  $(window).resize(checkSkills);
});
