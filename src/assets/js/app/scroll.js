var scrollEl = document.querySelector('#pageScrollBar');
var Scrollbar = window.Scrollbar;
var winHeight = scrollEl.clientHeight;
var bodyScroll;
var fired = false;

function hideDropdowns() {
  $('.custom-select').select2('close');
  $('.custom-select-simple').select2('close');
  $('.icon-wrap[data-toggle="datepicker"]').datepicker('hide');
}

if(viewPort > 860){
  
  bodyScroll = Scrollbar.init(scrollEl, {
    damping: 0.1
  });

  bodyScroll.addListener(function(status) {

    var docHeight = scrollEl.scrollHeight;
    var scrollAmount = status.offset.y;
    var scrolltrigger = 0.95;
    var scrollPercent = (scrollAmount/(docHeight-winHeight))*100;

    // Scroll progress
    $('.scroll-progress').width(scrollPercent + '%');

    // Activate sticky
    if (scrollPercent >= 20) {
      $("body").addClass("sticky");
    } else {
      $("body").removeClass("sticky");
    }

    // Check page end
    if  ((scrollAmount/(docHeight-winHeight)) > scrolltrigger) {
      $("body").addClass("scroll-end");
    } else {
      $("body").removeClass("scroll-end");
    }
    
    // Banner Aniamtion
    var scale = (scrollPercent / 40) + 1;
    $('.hero-banner .slide-image').css('transform', 'matrix(' + scale + ', 0, 0, ' + scale + ', '+scrollPercent+', '+scrollPercent+')');

    // Active sections
    var sections = $('section');
    var sectionLength = $(sections).length;
    for(var i = 0; sectionLength > i; i++){
      if( bodyScroll.isVisible( sections[i] ) ){
        $(sections[i]).addClass('visible');
        var elems = $(sections[i]).find('[data-aos]');
        for(var j = 0; $(elems).length > j; j++){
          if( bodyScroll.isVisible( elems[j] ) ){
            $(elems[j]).addClass('aos-init aos-animate');
          }
        }
      }
    }

    var cardsListSection = document.querySelector('section.cards-listing');
    if(cardsListSection){
      if( bodyScroll.isVisible( cardsListSection ) ){
        setTimeout(function(){
          $('section.cards-listing').find('.card.brand').each(function(){
            $(this).addClass('loaded');
          });
        }, 2000);
      }
    }

    hideDropdowns();

  },{
    capture: true,
    passive: true
  });

}

var sections = $('section');
var sectionLength = $(sections).length;
for(var i = 0; sectionLength > i; i++){
  if( visibleElInViewPort(sections[i]) ){
    $(sections[i]).addClass('visible');
    var elems = $(sections[i]).find('[data-aos]');
    for(var j = 0; $(elems).length > j; j++){
      if( visibleElInViewPort(elems[j]) ){
        $(elems[j]).addClass('aos-init aos-animate');
      } else {
        $(elems[j]).removeClass('aos-init aos-animate');
      }
    }
  } else {
    $(sections[i]).removeClass('visible');
  }
}

var cardsListSection = document.querySelector('section.cards-listing');
if(cardsListSection){
  if( visibleElInViewPort(cardsListSection) ){
    setTimeout(function(){
      $('section.cards-listing').find('.card.brand, .card.product, .card.news').each(function(){
        $(this).addClass('loaded');
      });
    }, 2000);
  }
}

var firstScroll = true;
var offsetTopVal = 100;
var viewPort = $(window).width();
function scrollToElem(elem){
  var offset = $(elem).offset().top;

  if(firstScroll){
    offsetTopVal = 385;
  } else {
    offsetTopVal = 135;
  }
  $('[data-aos]').addClass('aos-init aos-animate');
  if(viewPort > 860){
   bodyScroll.scrollIntoView(document.querySelector(elem), {
    offsetTop: offsetTopVal,
    offsetLeft: 0,
    onlyScrollIfNeeded: true,
  });
  } else {
    $('html, body').animate({
      scrollTop: offset 
    }, 300);
  }
  
  firstScroll = false;
}

if(window.location.hash != ''){
  var elem = '.'+window.location.hash.split('#')[1];
  console.log(elem);
  scrollToElem(elem);
}