// ============================================================
// Cinematic preload sequence (~2.2s) followed by a synced
// cross-fade into the hero. If GSAP didn't load, a CSS-only
// timeline of the same length takes over — same pacing, same
// hand-off, no dependency on the network.
// ============================================================
import { prefersReducedMotion } from './helpers.js';

export function runPreloader(motion) {
  const el = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  if (!el) return Promise.resolve();

  document.documentElement.style.overflow = 'hidden';

  // A multi-second cinematic hand-off is itself a motion effect — someone
  // who has asked for reduced motion wants the content, not the show, so
  // they get a near-instant fade instead of the full sequence.
  if (prefersReducedMotion) {
    el.classList.add('hidden');
    document.body.classList.add('hero-ready', 'is-loaded');
    document.documentElement.style.overflow = '';
    return new Promise((r) => setTimeout(r, 80));
  }

  const sequence = new Promise((resolve) => {
    if (motion && motion.gsap) {
      const { gsap } = motion;
      gsap.timeline({ onComplete: resolve })
        .to('.preloader-logo', { opacity: 1, scale: 1, duration: 0.65, ease: 'power3.out' })
        .to('.preloader-word', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, '-=0.35')
        .to(fill, { scaleX: 1, duration: 1.15, ease: 'power1.inOut' }, '-=0.15')
        .to({}, { duration: 0.15 }); // a beat to let the filled bar register before fading
    } else {
      el.classList.add('css-run');
      setTimeout(resolve, 2200);
    }
  });

  return sequence.then(() => {
    el.classList.add('hidden');
    document.body.classList.add('hero-ready', 'is-loaded');
    document.documentElement.style.overflow = '';
    return new Promise((r) => setTimeout(r, 650)); // let the fade-out finish before cleanup
  });
}
