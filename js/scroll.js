// ============================================================
// Scroll-driven interactions
// ============================================================
import { throttleRAF, toPersianDigits, prefersReducedMotion } from './helpers.js';
import { scrollToTarget } from './smooth-scroll.js';

export function initScrollReveal() {
  // Single-element reveals only — [data-reveal-group] is owned by
  // initGroupReveals() below, decided once after motion libs are known,
  // so the two systems never race for the same elements.
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
  );
  revealTargets.forEach((el) => io.observe(el));
}

/**
 * Staggered reveal for [data-reveal-group] containers. Deliberately uses
 * the same plain IntersectionObserver + .in-view pattern as every single
 * [data-reveal] element on the site, rather than a GSAP ScrollTrigger
 * timeline — a scroll-linked trigger that silently never fires (which can
 * happen with dynamically-loaded GSAP/ScrollTrigger paired with a custom
 * scroll library) leaves `gsap.from()`'s initial opacity:0 state stuck
 * forever, i.e. permanently invisible content. For decorative motion
 * that's an acceptable risk; for entire sections (stats, tool grid,
 * projects, contact tiles) it isn't, so this stays on the boring,
 * always-correct path.
 */
export function initGroupReveals() {
  const groups = document.querySelectorAll('[data-reveal-group]');
  if (!groups.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
  );
  groups.forEach((el) => io.observe(el));
}

export function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width;
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  bars.forEach((bar) => io.observe(bar));
}

export function initTimelineDraw(motion) {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  if (motion && motion.gsap && motion.ScrollTrigger && !prefersReducedMotion) {
    const { gsap, ScrollTrigger } = motion;
    gsap.set(timeline, { '--line-scale': 0 });
    gsap.to(timeline, {
      '--line-scale': 1,
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 78%',
        end: 'bottom 65%',
        scrub: 0.6,
      },
    });
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          timeline.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  io.observe(timeline);
}

export function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.counter, 10);
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `+${toPersianDigits(Math.round(eased * target))}`;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => io.observe(c));
}

export function initHeroParallax(motion) {
  if (!motion || !motion.gsap || !motion.ScrollTrigger || prefersReducedMotion) return;
  const { gsap, ScrollTrigger } = motion;
  const hero = document.querySelector('.hero');
  if (!hero) return;

  gsap.to('.hero-inner', {
    yPercent: 14,
    opacity: 0.35,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('#hero-canvas', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
}

export function initSectionDots() {
  const dots = document.querySelectorAll('.dot');
  const sections = document.querySelectorAll('main section[id]');
  if (!dots.length) return;

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(dot.getAttribute('href'));
      if (target) {
        const navHeight = document.getElementById('navbar').offsetHeight;
        scrollToTarget(target, { offset: -(navHeight - 4) });
      }
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        dots.forEach((d) => d.classList.toggle('active', d.dataset.section === id));
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}

export function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  const onScroll = throttleRAF(() => {
    btn.classList.toggle('show', window.scrollY > 600);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => scrollToTarget(0));
}
