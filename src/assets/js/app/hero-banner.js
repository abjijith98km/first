// $('#homeHeroSlider .slider-wrap').slick();



// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command) {
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}



AOS.init({offSet:200,once:false})

// Resize event
$(window).on("resize.slickVideoPlayer", function () {
  resizePlayer(homeHeroIframes, 16 / 9);
});

$('#burger_menu').click(function(){
  $('body').toggleClass('mobile_menu_open')
})