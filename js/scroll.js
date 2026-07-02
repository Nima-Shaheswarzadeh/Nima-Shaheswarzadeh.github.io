// ============================================================
// Scroll-driven interactions
// ============================================================
import { throttleRAF } from './helpers.js';

export function initScrollReveal() {
  const revealTargets = document.querySelectorAll('[data-reveal], [data-reveal-group]');
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

export function initTimelineDraw() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;
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
          el.textContent = `+${Math.round(eased * target)}`;
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

export function initSectionDots() {
  const dots = document.querySelectorAll('.dot');
  const sections = document.querySelectorAll('main section[id]');
  if (!dots.length) return;

  dots.forEach((dot) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(dot.getAttribute('href'));
      if (target) {
        const offset = target.offsetTop - (document.getElementById('navbar').offsetHeight - 4);
        window.scrollTo({ top: offset, behavior: 'smooth' });
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
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
