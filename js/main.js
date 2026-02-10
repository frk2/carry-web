/* ============================================================
   CARRY — Main JavaScript
   Scroll reveals, counter animation, nav behavior, mobile menu
   ============================================================ */

(function () {
    'use strict';

    // --- Scroll Reveal via IntersectionObserver ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));


    // --- Stat Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat__number[data-count]');
    let statsCounted = false;

    const statsSection = document.querySelector('.stats');

    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !statsCounted) {
                    statsCounted = true;
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounters() {
        statNumbers.forEach((el, index) => {
            const target = parseInt(el.getAttribute('data-count'), 10);
            const duration = 1500;
            const delay = index * 100;

            setTimeout(() => {
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    el.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }
                }

                requestAnimationFrame(update);
            }, delay);
        });
    }


    // --- Navigation Scroll Behavior ---
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    function handleNavScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > 60) {
            nav.classList.add('nav--scrolled');
        } else {
            nav.classList.remove('nav--scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // run on load


    // --- Mobile Menu ---
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = isActive ? '' : 'hidden';
        });

        mobileLinks.forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }


    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });


    // --- Reserve Form (Buttondown API) ---
    const reserveForm = document.getElementById('reserveForm');
    if (reserveForm) {
        reserveForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('.cta__input');
            const btn = this.querySelector('.cta__btn');
            const email = input.value.trim();

            if (!email || !input || !btn) return;

            const originalText = btn.textContent;
            btn.textContent = 'Joining...';
            btn.disabled = true;
            input.disabled = true;

            fetch('https://api.buttondown.com/v1/subscribers', {
                method: 'POST',
                headers: {
                    'Authorization': 'Token ec064b1e-7757-48fb-968d-2d1dd5e892b4',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email_address: email }),
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.email_address || data.id) {
                    btn.textContent = "You're on the list!";
                    btn.style.background = 'var(--color-secondary)';
                    input.value = '';
                } else if (data.detail) {
                    btn.textContent = 'Already signed up!';
                    btn.style.background = 'var(--color-secondary)';
                    input.value = '';
                } else {
                    btn.textContent = 'Something went wrong';
                }
            })
            .catch(() => {
                btn.textContent = 'Something went wrong';
            })
            .finally(() => {
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    input.disabled = false;
                    btn.disabled = false;
                }, 4000);
            });
        });
    }


    // --- Parallax on Hero (subtle) ---
    const heroBg = document.querySelector('.hero__bg-img');

    if (heroBg && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `scale(${1.05 - scrolled * 0.00005}) translateY(${scrolled * 0.2}px)`;
            }
        }, { passive: true });
    }

})();
