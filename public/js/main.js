/*
Theme Name: Ovro - Personal Portfolio PHP Template
Theme URI: #
Author: Markey
Author URI: #
Version: 1.0.0
*/

(function ($) {
  "use strict";
  // Preloader
  $(window).on("load", function () {
    $("#preloader").fadeOut("slow", function () {
      $(this).remove();
    });
  });

  /*=========================================
  =            Intersection observer          =
  =========================================*/
  if (!!window.IntersectionObserver) {
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active-animation");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -100px 0px",
      }
    );
    document.querySelectorAll(".has-animation").forEach((block) => {
      observer.observe(block);
    });
  } else {
    document.querySelectorAll(".has-animation").forEach((block) => {
      block.classList.remove("has-animation");
    });
  }

  /*=========================================
  =            mobile menu          =
  =========================================*/
  // mobile menu
  $("#hamburger").on("click", function () {
    $(".mobile-nav").addClass("show");
    $(".overlay").addClass("active");
  });

  $(".close-nav").on("click", function () {
    $(".mobile-nav").removeClass("show");
    $(".overlay").removeClass("active");
  });

  $(".overlay").on("click", function () {
    $(".mobile-nav").removeClass("show");
    $(".overlay").removeClass("active");
  });

  $("#mobile-menu").metisMenu();

  /*=========================================
  =             magnific-popup          =
  =========================================*/
  $(".video-play-btn").magnificPopup({
    type: "video",
  });
  $(".img-popup").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /*=========================================
  =             Aos          =
  =========================================*/
  AOS.init({
    once: true,
    duration: 1000,
  });

  //  Counter Js
  if ($(".counter").length) {
    $(".counter").counterUp({
      delay: 10,
      time: 1000,
    });
  }

  /*=========================================
  =            Theme Setting          =
  =========================================*/

  $(".icon-bar-2").on("click", function () {
    $(".theme-setting-area").toggleClass("show");
  });
  $(".theme-setting-area .close").on("click", function () {
    $(".theme-setting-area").removeClass("show");
  });

  /*=========================================
  =            Wow Js          =
  =========================================*/
  new WOW().init();

  /*=========================================
  =             slick-slider          =
  =========================================*/
  $(".testimonial-slider-active").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false,
  });

  $(".marquee-slider-active").slick({
    dots: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    variableWidth: true,
    pauseOnHover: false,
  });

  $(".marquee-slider-active-2").slick({
    dots: false,
    infinite: true,
    speed: 10000,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    variableWidth: true,
    rtl: true,
    pauseOnHover: false,
  });

  $(".portfolio-slider-active").slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 2,
    adaptiveHeight: true,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fa-solid fa-arrow-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fa-solid fa-arrow-right"></i></button>',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  /*=========================================
  =            GSAP          =
  =========================================*/
  const splitText = new SplitText(".h2-2", { type: "words, chars" });
  const chars = splitText.chars;

  gsap.from(chars, {
    duration: 1,
    opacity: 0,
    y: 10,
    ease: "power2.inOut",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".h2-2",
      start: "top 80%", // Adjust start position as needed
      end: "top 20%", // Adjust end position as needed
      // markers: true, // Uncomment for debugging
    },
  });

  /*=========================================
  =            Cursor          =
  =========================================*/
  $(".procus-cursor").on("mouseenter", function () {
    $(".mouse-cursor").addClass("cursor-big");
  });
  $(".procus-cursor").on("mouseleave", function () {
    $(".mouse-cursor").removeClass("cursor-big");
  });

  var a = document.querySelector(".procus-cursor");
  var b = document.querySelector(".procus-cursor2");

  if (a, b) {
    document.addEventListener("mousemove", (e) => {
      a.setAttribute("style", "transform: translate3d(calc(-50% + " + e.clientX + "px), calc(-50% + " + e.clientY + "px), 0px) ");
    });

    document.addEventListener("mousemove", (e) => {
      b.setAttribute("style", "top: " + e.clientY + "px; left: " + e.clientX + "px;");
    });
  }

  /*=========================================
  =            Smooth Scroll          =
  =========================================*/
  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
  });

  /*=========================================
  =            popup          =
  =========================================*/
  $(".click-here").on("click", function () {
    $(".custom-model-main").addClass("model-open");
  });

  $(".close-btn, .bg-overlay").click(function () {
    $(".custom-model-main").removeClass("model-open");
  });
  $(".popup-close-btn").click(function () {
    $(".portfolio-popup").removeClass("model-open");
  });

  // Nice Select
  $(".nice-select").niceSelect();
  $(".nice-select6").niceSelect();

  /*=========================================
  =            sticky header          =
  =========================================*/

  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 250) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
  });

  /*=========================================
  =            scroll-top          =
  =========================================*/
  //   scroll-top
  var progressPath = document.querySelector(".progress-wrap path");
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  var duration = 550;
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate(
      {
        scrollTop: 0,
      },
      duration
    );
    return false;
  });

  /*=========================================
  =            Active          =
  =========================================*/
  $(".list-group-item").on("click", function () {
    $(this).siblings(".active").removeClass("active");
    $(this).addClass("active");
  });
})(jQuery);


// =======================================================================================
//  My Custom Code for Portfolio Video Popup
// =======================================================================================
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.querySelector('.portfolio-popup');
    if (!popup) {
        console.error('Portfolio popup element not found');
        return;
    }

    const popupTitle = popup.querySelector('.popup-title');
    const popupIframe = popup.querySelector('iframe');
    const closeBtn = popup.querySelector('.popup-close-btn');

    const openPopup = (title, videoUrl) => {
        if (!popupTitle || !popupIframe) return;
        popupTitle.textContent = title;
        // Add autoplay and other params for a better experience
        popupIframe.setAttribute('src', `${videoUrl}?autoplay=1&rel=0&showinfo=0`); 
        document.body.classList.add('model-open');
    };

    const closePopup = () => {
        document.body.classList.remove('model-open');
        if (popupIframe) {
            popupIframe.setAttribute('src', ''); 
        }
    };

    document.querySelectorAll('.click-here').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('data-video-url');
            const title = this.getAttribute('data-title');
            if (videoUrl && title) {
                openPopup(title, videoUrl);
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    popup.addEventListener('click', function(e) {
        // Close if clicking on the background overlay itself, not its children
        if (e.target === popup) {
            closePopup();
        }
    });
});

