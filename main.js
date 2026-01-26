const navToggle = document.querySelector('.nav-toggle');
const header = document.querySelector('.site-header');

if (navToggle && header) {
  navToggle.addEventListener('click', () => {
    const isOpen = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealElements = document.querySelectorAll('[data-reveal]');
const parallaxItems = document.querySelectorAll('[data-parallax]');
const counterElements = document.querySelectorAll('[data-count]');

if (prefersReduced) {
  revealElements.forEach((el) => el.classList.add('reveal-visible'));
  counterElements.forEach((el) => {
    el.textContent = el.dataset.count;
  });
} else if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  revealElements.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
      }
    );
  });

  parallaxItems.forEach((item) => {
    const amount = parseFloat(item.dataset.parallax || '0.2');
    gsap.to(item, {
      yPercent: amount * -20,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  counterElements.forEach((el) => {
    const endValue = parseInt(el.dataset.count, 10);
    const counter = { value: 0 };
    gsap.to(counter, {
      value: endValue,
      duration: 1.6,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.round(counter.value);
      },
    });
  });
}
