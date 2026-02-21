(function () {
    var currentIndex = 0;
    var totalSlides = document.querySelectorAll('.slide').length;
    var wrapper = document.getElementById('slidesWrapper');
    var dots = document.querySelectorAll('.dot');
    var navLinks = document.querySelectorAll('.nav-links .nav-link');
    var arrowLeft = document.getElementById('arrowLeft');
    var arrowRight = document.getElementById('arrowRight');
    var navToggle = document.getElementById('navToggle');
    var navLinksContainer = document.getElementById('navLinks');
    var scrollPercent = document.getElementById('scrollPercent');
    var scrollThanks = document.getElementById('scrollThanks');
    var isAnimating = false;

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides || isAnimating) return;
        isAnimating = true;
        currentIndex = index;
        wrapper.style.transform = 'translateX(-' + (currentIndex * 100) + 'vw)';

        dots.forEach(function (d) { d.classList.remove('active'); });
        dots[currentIndex].classList.add('active');

        navLinks.forEach(function (l) { l.classList.remove('active'); });
        navLinks[currentIndex].classList.add('active');

        arrowLeft.disabled = currentIndex === 0;
        arrowRight.disabled = currentIndex === totalSlides - 1;

        scrollPercent.textContent = (currentIndex + 1) + ' / ' + totalSlides;

        if (currentIndex === totalSlides - 1) {
            scrollThanks.style.display = 'inline';
        } else {
            scrollThanks.style.display = 'none';
        }

        if (navLinksContainer.classList.contains('open')) {
            navLinksContainer.classList.remove('open');
        }

        setTimeout(function () { isAnimating = false; }, 700);
    }

    arrowLeft.addEventListener('click', function () {
        goToSlide(currentIndex - 1);
    });

    arrowRight.addEventListener('click', function () {
        goToSlide(currentIndex + 1);
    });

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            goToSlide(parseInt(this.getAttribute('data-index')));
        });
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            goToSlide(parseInt(this.getAttribute('data-index')));
        });
    });

    document.querySelectorAll('.btn-slide[data-index]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            goToSlide(parseInt(this.getAttribute('data-index')));
        });
    });

    navToggle.addEventListener('click', function () {
        navLinksContainer.classList.toggle('open');
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight' || e.key === 'Right') {
            goToSlide(currentIndex + 1);
        } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
            goToSlide(currentIndex - 1);
        }
    });

    var touchStartX = 0;
    var touchEndX = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
        }
    }, { passive: true });

    var wheelCooldown = false;
    document.addEventListener('wheel', function (e) {
        if (wheelCooldown) return;
        wheelCooldown = true;
        if (e.deltaY > 0 || e.deltaX > 0) {
            goToSlide(currentIndex + 1);
        } else if (e.deltaY < 0 || e.deltaX < 0) {
            goToSlide(currentIndex - 1);
        }
        setTimeout(function () { wheelCooldown = false; }, 900);
    }, { passive: true });

    goToSlide(0);
})();
