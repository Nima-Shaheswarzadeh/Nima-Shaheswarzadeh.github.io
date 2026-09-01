// ============================================================
// Smooth scroll: Lenis drives the actual scrolling, synced to
// GSAP's ticker so ScrollTrigger stays perfectly in step with it.
// If either library failed to load (offline, blocked CDN), the
// page simply keeps native `scroll-behavior: smooth` — nothing
// breaks, it's just less silky.
// ============================================================
import { prefersReducedMotion } from './helpers.js';

let lenisInstance = null;

export function initSmoothScroll(motion) {
  if (!motion || !motion.Lenis || prefersReducedMotion) return null;
  const { gsap, ScrollTrigger, Lenis } = motion;

  const lenis = new Lenis({
    duration: 1.25,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.78,
    touchMultiplier: 0.95,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Lenis owns scroll easing now — the CSS fallback would fight it.
  document.documentElement.style.scrollBehavior = 'auto';

  lenisInstance = lenis;
  window.__lenis = lenis;
  return lenis;
}

/** Smoothly scroll to an element (or Y position), accounting for the
 *  fixed navbar. Works whether or not Lenis is active. */
export function scrollToTarget(target, { offset = 0 } = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.15 });
    return;
  }
  const top = typeof target === 'number'
    ? target
    : target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
