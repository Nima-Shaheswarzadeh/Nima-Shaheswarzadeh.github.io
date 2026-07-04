// ============================================================
// Premium custom cursor: trailing ring + magnetic pull on
// interactive elements. Disabled entirely on touch devices.
// ============================================================
import { isTouchDevice, prefersReducedMotion } from './helpers.js';

export function initCursor() {
  if (isTouchDevice) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(dot, ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  }, { passive: true });

  function tick() {
    const ease = 0.18;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  }
  if (!prefersReducedMotion) requestAnimationFrame(tick);

  const magnetic = document.querySelectorAll('a, button, .card-tilt, .tool-chip');
  magnetic.forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));

    if (el.matches('.btn, .social-icon, .brand img, .tool-chip, .fab-item, #contact-fab, #back-to-top')) {
      const pull = el.matches('.btn') ? 0.25 : 0.3;
      // .social-icon / .tool-chip already lift on :hover in CSS — since the
      // inline transform set below takes priority over that rule, the lift
      // is folded in here instead of silently getting clobbered by it.
      const lift = el.matches('.social-icon, .tool-chip') ? 'translateY(-4px) ' : '';
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const relX = e.clientX - (r.left + r.width / 2);
        const relY = e.clientY - (r.top + r.height / 2);
        el.style.transform = `${lift}translate(${relX * pull}px, ${relY * pull}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    }
  });
}
