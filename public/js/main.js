(function ($) {

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
        if (progressPath) {
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
        }
        //========== PAGE PROGRESS STARTS ============= // 

        //========== VIDEO POPUP (OLD) ============= //
        // This is the generic theme popup - we will not use it for our custom popups.
        if ($(".popup-youtube").length > 0) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }
        //========== VIDEO POPUP ENDS ============= //
        
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

})(jQuery);

//========== GSAP AREA ============= //
if ($('.reveal').length) { gsap.registerPlugin(ScrollTrigger); let revealContainers = document.querySelectorAll(".reveal"); revealContainers.forEach((container) => { let image = container.querySelector("img"); let tl = gsap.timeline({ scrollTrigger: { trigger: container, toggleActions: "play none none none" } }); tl.set(container, { autoAlpha: 1 }); tl.from(container, 1.5, { xPercent: -100, ease: Power2.out }); tl.from(image, 1.5, { xPercent: 100, scale: 1.3, delay: -1.5, ease: Power2.out }); }); }

// Theme toggle functionality
const toggleButton = document.getElementById('theme-toggle');
if(toggleButton){
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
}


// Custom Cursor
var cursor = document.querySelector('.procus-cursor');
var cursorinner = document.querySelector('.procus-cursor2');
var a = document.querySelectorAll('a');
if(cursor){
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
}


// =======================================================================================
//  SANGREAL PORTFOLIO - CTO's UNIFIED POPUP & INLINE-PLAYER SCRIPT
// =======================================================================================
document.addEventListener("DOMContentLoaded", function() {

    // --- Portfolio Inline Video Player ---
    let currentVideoItem = null;
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            if (currentVideoItem === this && this.querySelector('iframe')) {
                return; // Do nothing if we click the already playing video's container
            }

            // If another video is playing, close it first.
            if (currentVideoItem) {
                const oldIframe = currentVideoItem.querySelector('iframe');
                if (oldIframe) oldIframe.remove();
                currentVideoItem.querySelector('.thumbnail').style.display = 'block';
                const oldTitle = currentVideoItem.querySelector('.video-title');
                if(oldTitle) oldTitle.style.display = 'block';
            }
            
            const thumbnail = this.querySelector('.thumbnail');
            const title = this.querySelector('.video-title');
            
            const videoUrl = this.getAttribute('data-video') + '?autoplay=1&title=0&byline=0&portrait=0';
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', videoUrl);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('allow', 'autoplay; picture-in-picture');

            // Set the correct height based on the parent class
            iframe.style.height = this.classList.contains('vertical') ? '500px' : '280px';
            iframe.style.width = '100%';

            thumbnail.style.display = 'none';
            if(title) title.style.display = 'none';
            this.appendChild(iframe);

            currentVideoItem = this;
        });
    });

    // --- CTA "Book Me" Popup ---
    const ctaPopup = document.querySelector('#cta-popup');
    if(ctaPopup) {
        const body = document.body;
        const closeBtn = ctaPopup.querySelector('.cta-close-btn');
        const bgOverlay = ctaPopup.querySelector('.bg-overlay');

        const openCtaPopup = () => {
            body.classList.add('model-open');
            ctaPopup.style.display = 'block';
            const iframe = ctaPopup.querySelector('iframe');
            if (iframe) {
                const originalSrc = iframe.getAttribute('src').split('?')[0];
                iframe.setAttribute('src', `${originalSrc}?autoplay=1&loop=1&autopause=0&muted=1&background=1`);
            }
        };

        const closeCtaPopup = () => {
            body.classList.remove('model-open');
            const iframe = ctaPopup.querySelector('iframe');
            if (iframe) {
                const originalSrc = iframe.getAttribute('src').split('?')[0];
                iframe.setAttribute('src', `${originalSrc}?autoplay=0&loop=1&autopause=0&muted=1&background=1`);
            }
            ctaPopup.style.display = 'none';
        };

        document.querySelectorAll('.cta-popup-trigger').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                openCtaPopup();
            });
        });

        if(closeBtn) closeBtn.addEventListener('click', closeCtaPopup);
        if(bgOverlay) bgOverlay.addEventListener('click', closeCtaPopup);
    }
});
