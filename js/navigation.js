// ============================================================
// Navigation: sticky shell, mobile menu, smooth anchor scroll,
// active-link highlighting driven by IntersectionObserver.
// ============================================================
import { throttleRAF } from './helpers.js';

export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const sections = document.querySelectorAll('main section[id]');

  const onScroll = throttleRAF(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      mobileMenu?.classList.remove('open');
      toggle?.classList.remove('open');
      const offset = target.offsetTop - (document.getElementById('navbar').offsetHeight - 4);
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => observer.observe(s));
}
