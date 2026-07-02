// ============================================================
// Shared utility helpers
// ============================================================

export function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function throttleRAF(fn) {
  let ticking = false;
  return (...args) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      fn(...args);
      ticking = false;
    });
  };
}

export const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

export const isMobileViewport = () => window.innerWidth <= 640;
