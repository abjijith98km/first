var viewPort = $(window).width();

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

document.cookie = 'GPS=youtube.com; SameSite=Lax';
document.cookie = 'remote_sid=youtube.com; SameSite=None; Secure';

function visibleElInViewPort(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

var init = {
  scrollUp: function() {
    if(viewPort > 860){
      $('#scrollUp').click(function(e){
        bodyScroll.scrollTo(0, 0, 2000, function(scroll){
        })
        e.preventDefault();
      });
    } else {
      $('html, body').animate({
        scrollTop: 0
      }, 2000);
    }
  },
  customSelect: function() {

    $('.custom-select-simple').select2({
      minimumResultsForSearch: -1
    }).on("change", function (e) {
      $(this).valid();
    });

    $('.custom-select').select2().on("change", function (e) {
      $(this).valid();
    });

  },
  ieToggle: function() {
    $('.close-ie-support').click(function(){
      $('.ie-support').remove();
    });
  }
}

init.scrollUp();
init.ieToggle();

if(viewPort > 860){
  init.customSelect();
} else {
  $('.select-wrap select').change(function(){
    $(this).addClass('selected');
  });
  
  $( ".select-wrap select" ).focusin(function() {
    $(this).parent().addClass('focused');
  }).blur(function() {
    $(this).parent().removeClass('focused');
  });

  if (navigator.userAgent.match(/(iPad|iPhone|iPod touch);.*CPU.*OS 7_\d/i)) {
    var selects = document.querySelectorAll("select");
    for (var i = 0; i < selects.length; i++ ){
        selects[i].appendChild(document.createElement("optgroup"));
    }
  }
}

var rtl_status = $('html').attr('dir');

var rtl = false;
  if (rtl_status == 'rtl') {
    rtl = true;
  }


  $("#counter").counter({
    autoStart: true,           // true/false, default: true
    duration: 2000,             // milliseconds, default: 1500
    countFrom: 0,              // start counting at this number, default: 0
    countTo: 100,                // count to this number, default: 0
    easing: "easeInOutQuad",     // see http://gsgd.co.uk/sandbox/jquery/easing

  });
  $(document).ready(function(){

    setTimeout(() => {
      $('.render_blade').addClass('hide_blade')
      $('html').removeClass('overflow-hidden')
    }, 3200);
  })


$(".anchor_links").click(function(e) {
e.preventDefault()
  var id = $(this).attr('href');
  var scroll = $(`${id}`).offset().top - 90;
  $('html, body').animate({
    scrollTop: scroll
  }, 100);
});

$(window).scroll(function(){
  if(window.scrollY > 240){
    $('body').addClass('sticky_header')
  }else{
    $('body').removeClass('sticky_header')
  }
})