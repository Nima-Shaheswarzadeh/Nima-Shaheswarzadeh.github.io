// ============================================================
// Premium micro-interactions: a cursor-tracking light on every
// glass surface, and a restrained 3D tilt on the larger cards.
// Both are desktop-only — on touch there is no hover to track,
// so the listeners are simply never attached.
// ============================================================
import { isTouchDevice, prefersReducedMotion } from './helpers.js';

export function initInteractions() {
  if (isTouchDevice) return;

  document.querySelectorAll('.glass').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  if (prefersReducedMotion) return;

  const MAX_TILT = 5; // degrees — enough to read as "alive", never gimmicky
  document.querySelectorAll('.card-tilt').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      el.classList.remove('is-settling');
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform =
        `perspective(900px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.classList.add('is-settling');
      el.style.transform = '';
    });
  });
}
