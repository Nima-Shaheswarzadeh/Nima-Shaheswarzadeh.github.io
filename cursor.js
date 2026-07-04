// ============================================================
// App entry point
// ============================================================
import { initCursor } from './cursor.js';
import { initNavigation } from './navigation.js';
import {
  initScrollReveal,
  initGroupReveals,
  initSkillBars,
  initTimelineDraw,
  initCounters,
  initSectionDots,
  initBackToTop,
  initHeroParallax,
} from './scroll.js';
import { initTyping } from './typing.js';
import { initContactFab } from './contact-fab.js';
import { initHeroScene } from './hero-scene.js';
import { initInteractions } from './interactions.js';
import { loadMotionLibs } from './motion.js';
import { initSmoothScroll } from './smooth-scroll.js';
import { runPreloader } from './preloader.js';
import { prefersReducedMotion } from './helpers.js';

function splitHeroName() {
  const el = document.querySelector('[data-split-text]');
  if (!el) return;
  const text = el.textContent.trim();
  el.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'split-char';
    span.style.setProperty('--i-delay', `${0.1 + i * 0.035}s`);
    span.textContent = char === ' ' ? '\u00A0' : char;
    el.appendChild(span);
  });
  if (prefersReducedMotion) {
    el.querySelectorAll('.split-char').forEach((s) => {
      s.style.animation = 'none';
      s.style.opacity = '1';
      s.style.transform = 'none';
    });
  }
}

async function init() {
  // Split into spans now (so layout is stable and CLS-free), but the
  // per-character animation itself stays paused via CSS until the
  // preloader hands off — see .split-char in animations.css. That way the
  // stagger actually plays as the curtain lifts, instead of finishing
  // invisibly underneath it.
  splitHeroName();
  initCursor();
  initNavigation();
  initInteractions();
  initSectionDots();
  initBackToTop();
  initContactFab();
  initCounters();

  const canvas = document.getElementById('hero-canvas');
  initHeroScene(canvas);

  // Motion libraries (GSAP/ScrollTrigger/Lenis) load in parallel with
  // everything above. Every consumer below degrades gracefully to a
  // CSS/IntersectionObserver fallback if they never arrive.
  const motionPromise = loadMotionLibs();

  const motion = await motionPromise;
  initSmoothScroll(motion);
  initScrollReveal();
  initGroupReveals(motion);
  initSkillBars();
  initTimelineDraw(motion);
  initHeroParallax(motion);

  await runPreloader(motion);
  initTyping('heroRole');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', run);
} else {
  run();
}

function run() {
  // Absolute worst case (an unexpected error anywhere in init): never let
  // the preloader trap the visitor. It force-clears itself after 6s.
  const safety = setTimeout(() => {
    document.getElementById('preloader')?.classList.add('hidden');
    document.body.classList.add('hero-ready', 'is-loaded');
    document.documentElement.style.overflow = '';
  }, 6000);

  init()
    .catch((err) => console.error('Init error:', err))
    .finally(() => clearTimeout(safety));
}

