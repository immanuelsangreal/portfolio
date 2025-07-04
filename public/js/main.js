; (function ($) {

    $(document).ready(function () {

        //========== SIDEBAR/SEARCH AREA ============= //
        $(".hamburger_menu").on("click", function (e) {
            e.preventDefault();
            $(".slide-bar").toggleClass("show");
            $("body").addClass("on-side");
            $('.body-overlay').addClass('active');
            $(this).addClass('active');
        });
        $(".close-mobile-menu > a").on("click", function (e) {
            e.preventDefault();
            $(".slide-bar").removeClass("show");
            $("body").removeClass("on-side");
            $('.body-overlay').removeClass('active');
            $('.hamburger_menu').removeClass('active');
        });
        //========== SIDEBAR/SEARCH AREA ============= //

        //========== PAGE PROGRESS STARTS ============= // 
        var progressPath = document.querySelector(".progress-wrap path");
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "none";
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
            jQuery("html, body").animate({ scrollTop: 0 }, duration);
            return false;
        });
        //========== PAGE PROGRESS STARTS ============= // 

        //========== VIDEO POPUP STARTS ============= //
        if ($(".popup-youtube").length > 0) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
        //========== VIDEO POPUP ENDS ============= //
        AOS.init;
        AOS.init({ disable: 'mobile' });

        //========== NICE SELECT ============= //
        $('select').niceSelect();

    });
    //========== COUNTER UP============= //
    const ucounter = $('.counter');
    if (ucounter.length > 0) {
        ucounter.countUp();
    };

    //========== PRELOADER ============= //
    $(window).on("load", function (event) {
        setTimeout(function () {
            $("#preloader").fadeToggle();
        }, 200);

    });

    //========== POPUP AREA ============= //
    $(".click-here").on('click', function () {
        $(".custom-model-main").addClass('model-open');
    });
    $(".close-btn, .bg-overlay").click(function () {
        $(".custom-model-main").removeClass('model-open');
    });

})(jQuery);

//========== GSAP AREA ============= //
if ($('.reveal').length) { gsap.registerPlugin(ScrollTrigger); let revealContainers = document.querySelectorAll(".reveal"); revealContainers.forEach((container) => { let image = container.querySelector("img"); let tl = gsap.timeline({ scrollTrigger: { trigger: container, toggleActions: "play none none none" } }); tl.set(container, { autoAlpha: 1 }); tl.from(container, 1.5, { xPercent: -100, ease: Power2.out }); tl.from(image, 1.5, { xPercent: 100, scale: 1.3, delay: -1.5, ease: Power2.out }); }); }

// Theme toggle functionality
const toggleButton = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('light-mode');
    toggleButton.checked = true;
}
toggleButton.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');

    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark-mode');
    }
});

// UPDATE: I was able to get this working again... Enjoy!
var cursor = document.querySelector('.procus-cursor');
var cursorinner = document.querySelector('.procus-cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function () {
    cursor.classList.add('click');
    cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function () {
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
})
document.addEventListener('DOMContentLoaded', function() {
  let currentVideoItem = null;

  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
      // If a video is already playing in another item, we need to stop it.
      if (currentVideoItem && currentVideoItem !== this) {
        const oldContainer = currentVideoItem.querySelector('.video-container');
        const oldThumbnail = currentVideoItem.querySelector('.thumbnail');
        
        if (oldContainer) {
          oldContainer.innerHTML = ''; // Remove the old iframe
          oldContainer.style.display = 'none'; // Hide the container
        }
        if (oldThumbnail) {
          oldThumbnail.style.display = 'block'; // Show the old thumbnail again
        }
      }
      
      const thumbnail = this.querySelector('.thumbnail');
      const videoContainer = this.querySelector('.video-container');
      
      // If the user clicks the same item again, don't do anything.
      if (videoContainer.querySelector('iframe')) {
        return;
      }

      // I've added some extra params for a better playback experience:
      // background=1 makes the player chromeless (less Vimeo UI).
      // muted=1 is often required for autoplay to work in modern browsers.
      // title=0&byline=0&portrait=0 removes extra text overlays.
      const videoUrl = this.getAttribute('data-video') + '?autoplay=1&title=0&byline=0&portrait=0';
      
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', videoUrl);
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('allow', 'autoplay; picture-in-picture');

      // Add the new iframe to our container and show it.
      videoContainer.innerHTML = ''; // Clear it first just in case.
      videoContainer.appendChild(iframe);
      videoContainer.style.display = 'block';

      // Hide the thumbnail.
      thumbnail.style.display = 'none';

      // Set this item as the one with the currently playing video.
      currentVideoItem = this;
    });
  });
});
