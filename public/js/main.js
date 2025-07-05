;(function ($) {
    'use strict';

    // Function to handle the popup logic
    const setupCtaPopup = () => {
        const ctaPopup = document.querySelector('#cta-popup');
        if (!ctaPopup) {
            // If the popup doesn't exist on the page, do nothing.
            return;
        }

        const body = document.body;
        const closeBtn = ctaPopup.querySelector('.cta-close-btn');
        const bgOverlay = ctaPopup.querySelector('.bg-overlay');
        const triggerButtons = document.querySelectorAll('.cta-popup-trigger');

        const openCtaPopup = (e) => {
            e.preventDefault();
            body.classList.add('model-open');
            const iframe = ctaPopup.querySelector('iframe');
            if (iframe && iframe.src.includes('vimeo')) {
                // Start video playback when opening
                iframe.setAttribute('src', iframe.src.replace('autoplay=0', 'autoplay=1'));
            }
        };

        const closeCtaPopup = () => {
            body.classList.remove('model-open');
            const iframe = ctaPopup.querySelector('iframe');
            if (iframe && iframe.src.includes('vimeo')) {
                // Stop video playback when closing
                iframe.setAttribute('src', iframe.src.replace('autoplay=1', 'autoplay=0'));
            }
        };

        // Attach event listeners to all trigger buttons
        triggerButtons.forEach(button => {
            button.addEventListener('click', openCtaPopup);
        });

        // Attach event listeners for closing the popup
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCtaPopup);
        }
        if (bgOverlay) {
            bgOverlay.addEventListener('click', closeCtaPopup);
        }
    };

    // jQuery-dependent scripts
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

        //========== PAGE PROGRESS STARTS ============= //
        var progressPath = document.querySelector(".progress-wrap path");
        if (progressPath) {
            var pathLength = progressPath.getTotalLength();
            progressPath.style.transition = progressPath.style.WebkitTransition = "none";
            progressPath.style.strokeDasharray = pathLength + " " + pathLength;
            progressPath.style.strokeDashoffset = pathLength;
            progressPath.getBoundingClientRect();
            progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
            var updateProgress = function () {
                var scroll = $(window).scrollTop();
                var height = $(document).height() - $(window).height();
                var progress = pathLength - (scroll * pathLength) / height;
                progressPath.style.strokeDashoffset = progress;
            };
            updateProgress();
            $(window).scroll(updateProgress);
        }
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

        //========== VIDEO POPUP (Magnific) ============= //
        if ($(".popup-youtube").length > 0) {
            $(".popup-youtube").magnificPopup({
                type: "iframe",
            });
        }

        //========== AOS INIT ============= //
        AOS.init({ disable: 'mobile' });

        //========== NICE SELECT ============= //
        $('select').niceSelect();

        //========== COUNTER UP============= //
        const ucounter = $('.counter');
        if (ucounter.length > 0) {
            ucounter.countUp();
        }
    });

    // Vanilla JS scripts that run after the DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        // Setup for the main CTA popup
        setupCtaPopup();

        // Setup for the portfolio video player
        let currentVideoItem = null;
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', function(e) {
                if (e.target.closest('.video-container')) {
                    return; // Do nothing if the click is inside an already open video
                }

                if (currentVideoItem === this) {
                    const videoContainer = this.querySelector('.video-container');
                    const thumbnail = this.querySelector('.thumbnail');
                    if (videoContainer) {
                        videoContainer.innerHTML = '';
                        videoContainer.style.display = 'none';
                    }
                    if (thumbnail) {
                        thumbnail.style.display = 'block';
                    }
                    currentVideoItem = null;
                    return;
                }

                if (currentVideoItem) {
                    const oldContainer = currentVideoItem.querySelector('.video-container');
                    const oldThumbnail = currentVideoItem.querySelector('.thumbnail');
                    if (oldContainer) {
                        oldContainer.innerHTML = '';
                        oldContainer.style.display = 'none';
                    }
                    if (oldThumbnail) {
                        oldThumbnail.style.display = 'block';
                    }
                }

                const thumbnail = this.querySelector('.thumbnail');
                const videoContainer = this.querySelector('.video-container');
                const videoUrl = this.getAttribute('data-video') + '?autoplay=1&loop=1&controls=0&title=0&byline=0&portrait=0&muted=1';
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', videoUrl);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('allow', 'autoplay; picture-in-picture');
                videoContainer.innerHTML = '';
                videoContainer.appendChild(iframe);
                videoContainer.style.display = 'block';
                if (thumbnail) {
                    thumbnail.style.display = 'none';
                }
                currentVideoItem = this;
            });

            item.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            });
        });

        // Theme toggle functionality
        const toggleButton = document.getElementById('theme-toggle');
        if(toggleButton) {
            if (localStorage.getItem('theme') === 'light') {
                document.body.classList.add('light-mode');
                toggleButton.checked = true;
            }
            toggleButton.addEventListener('change', () => {
                document.body.classList.toggle('light-mode');
                if (document.body.classList.contains('light-mode')) {
                    localStorage.setItem('theme', 'light');
                } else {
                    localStorage.removeItem('theme');
                }
            });
        }

        // Custom cursor functionality
        var cursor = document.querySelector('.procus-cursor');
        var cursorinner = document.querySelector('.procus-cursor2');
        if(cursor && cursorinner) {
            var a = document.querySelectorAll('a');
            document.addEventListener('mousemove', function (e) {
                cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
                cursorinner.style.left = e.clientX + 'px';
                cursorinner.style.top = e.clientY + 'px';
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
            });
        }
    });

    //========== PRELOADER ============= //
    $(window).on("load", function (event) {
        setTimeout(function () {
            $("#preloader").fadeToggle();
        }, 200);
    });

})(jQuery);
