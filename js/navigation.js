// ============================================================
// Navigation: sticky shell, mobile menu, smooth anchor scroll,
// active-link highlighting driven by IntersectionObserver, and
// a liquid-glass pill that morphs to whichever desktop link is
// active — the Apple-style sliding tab-bar effect.
// ============================================================
import { throttleRAF, debounce, prefersReducedMotion } from './helpers.js';
import { scrollToTarget } from './smooth-scroll.js';

export function initNavigation() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const desktopLinks = document.querySelectorAll('.nav-links a');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  const sections = document.querySelectorAll('main section[id]');
  const pill = document.getElementById('navPill');

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
      const navHeight = document.getElementById('navbar').offsetHeight;
      scrollToTarget(target, { offset: -(navHeight - 4) });
    });
  });

  // Reads physical left/width/height off the active link — safe under RTL
  // since these are measured pixel offsets, not logical properties being
  // authored, so nothing needs mirroring here.
  function movePill(link) {
    if (!pill || !link) return;
    pill.style.width = `${link.offsetWidth}px`;
    pill.style.height = `${link.offsetHeight}px`;
    pill.style.transform = `translateX(${link.offsetLeft}px)`;
    pill.style.opacity = '1';
  }

  const setActive = (id) => {
    let activeLink = null;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
      if (isActive && link.closest('.nav-links')) activeLink = link;
    });
    if (activeLink) movePill(activeLink);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActive(entry.target.getAttribute('id'));
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => observer.observe(s));

  if (pill && desktopLinks.length) {
    if (prefersReducedMotion) pill.style.transition = 'none';
    // Home is the default active section on load, before any scroll fires.
    requestAnimationFrame(() => movePill(desktopLinks[0]));
    document.fonts?.ready?.then(() => {
      const current = document.querySelector('.nav-links a.active') || desktopLinks[0];
      movePill(current);
    });
    window.addEventListener('resize', debounce(() => {
      const current = document.querySelector('.nav-links a.active') || desktopLinks[0];
      movePill(current);
    }, 150));
  }
}
