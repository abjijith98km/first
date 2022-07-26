// $('#homeHeroSlider .slider-wrap').slick();

var homeHeroSlider = $("#homeHeroSlider .slider-wrap"),
  homeHeroIframes = homeHeroSlider.find(".embed-player"),
  homeHerolazyImages = homeHeroSlider.find(".slide-image"),
  homeHerolazyCounter = 0;

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command) {
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control) {
  var currentSlide, slideType, startTime, player, video;
  currentSlide = slick.find(".slick-current");
  slideType = currentSlide.attr("class").split(" ")[1];
  player = currentSlide.find("iframe").get(0);
  startTime = 0;
  console.log(slideType, player)
  if (slideType == "vimeo") {
    switch (control) {
      case "play":
        if (
          startTime != null &&
          startTime > 0 &&
          !currentSlide.hasClass("started")
        ) {
          currentSlide.addClass("started");
          postMessageToPlayer(player, {
            method: "setCurrentTime",
            value: startTime,
          });
        }
        postMessageToPlayer(player, {
          method: "play",
          value: 1,
        });
        homeHeroSlider.slick('slickSetOption', {
          'autoplay': false
        }, false);
        break;
      case "pause":
        postMessageToPlayer(player, {
          method: "pause",
          value: 1,
        });
        break;
    }
  } else if (slideType == "youtube") {
    console.log(control);
    switch (control) {
      case "play":
        postMessageToPlayer(player, {
          event: "command",
          func: "mute",
        });
        postMessageToPlayer(player, {
          event: "command",
          func: "playVideo",
        });
        homeHeroSlider.slick('slickSetOption', {
          'autoplay': false
        }, false);
        break;
      case "pause":
        postMessageToPlayer(player, {
          event: "command",
          func: "pauseVideo",
        });
        break;
    }
  } else if (slideType == "video") {
    video = currentSlide.children("video").get(0);
    if (video != null) {
      if (control === "play") {
        video.play();
      } else {
        video.pause();
      }
    }
  }
}

// Resize player
function resizePlayer(homeHeroIframes, ratio) {
  if (!homeHeroIframes[0]) return;
  var win = $(".main-slider"),
    width = win.width(),
    playerWidth,
    height = win.height(),
    playerHeight,
    ratio = ratio || 16 / 9;

  homeHeroIframes.each(function () {
    var current = $(this);
    if (width / ratio < height) {
      playerWidth = Math.ceil(height * ratio);
      current
        .width(playerWidth)
        .height(height)
        .css({
          left: (width - playerWidth) / 2,
          top: 0,
        });
    } else {
      playerHeight = Math.ceil(width / ratio);
      current
        .width(width)
        .height(playerHeight)
        .css({
          left: 0,
          top: (height - playerHeight) / 2,
        });
    }
  });
}

// DOM Ready
$(function () {
  // Initialize
  homeHeroSlider.on("init", function (slick) {
    slick = $(slick.currentTarget);
    playPauseVideo(slick, "play");
    resizePlayer(homeHeroIframes, 16 / 9);
    $('section.hero-banner .slide-image.slide-media').addClass('show');
    $('body.homepage').addClass('banner-loaded');
  });
  homeHeroSlider.on("beforeChange", function (event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick, "pause");
  });
  homeHeroSlider.on("afterChange", function (event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick, "play");
  });
  homeHeroSlider.on("lazyLoaded", function (event, slick, image, imageSource) {
    homeHerolazyCounter++;
    if (homeHerolazyCounter === homeHerolazyImages.length) {
      homeHerolazyImages.addClass("show");
      homeHeroSlider.slick("slickPlay");
    }
  });

  //start the slider
  homeHeroSlider.slick({
    // fade:true,
    autoplay: true,
    autoplaySpeed: 6000,
    lazyLoad: "progressive",
    speed: 900,
    arrows: false,
    dots: true,
    rtl: rtl,
    // appendDots: $('#homeHeroSlider .slider-dots'),
    asNavFor: '#homeHeroSlider .slide-thumbs',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          appendDots: $('#homeHeroSlider .slider-dots'),
        }
      },
    ]
  });
});

// Resize event
$(window).on("resize.slickVideoPlayer", function () {
  resizePlayer(homeHeroIframes, 16 / 9);
});

$('#homeHeroSlider .slide-thumbs').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '#homeHeroSlider .slider-wrap',
  dots: false,
  centerMode: true,
  focusOnSelect: true,
  arrows: false,
  infinite: true,
  variableWidth: true,
  fade: true,
  cssEase: 'linear',
  rtl: rtl,
});