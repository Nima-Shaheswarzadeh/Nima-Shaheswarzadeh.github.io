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
import { initSound } from './sound.js';
import { prefersReducedMotion } from './helpers.js';

function splitHeroName() {
  // Word-level split only — Vazirmatn is a joined Persian script, and
  // wrapping individual *characters* in their own inline-block spans (as
  // this used to do) silently breaks that letter joining. Splitting by
  // word keeps every word's letters intact while still allowing a staggered
  // entrance. This is what the (previously unused) `.hero-name .word` rule
  // in components.css was already built for.
  const el = document.querySelector('[data-split-text]');
  if (!el) return;
  const text = el.textContent.trim();
  const words = text.split(' ');
  el.textContent = '';
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.style.setProperty('--i-delay', `${0.15 + i * 0.13}s`);
    span.textContent = word;
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode('\u00A0'));
  });
  if (prefersReducedMotion) {
    el.querySelectorAll('.word').forEach((s) => {
      s.style.transition = 'none';
      s.style.opacity = '1';
      s.style.transform = 'none';
    });
  }
}

async function init() {
  // Split into word-level spans now (so layout is stable and CLS-free), but
  // the entrance transition itself only fires once body.hero-ready is added
  // — see .hero-name .word in animations.css. That way the stagger actually
  // plays as the curtain lifts, instead of finishing invisibly underneath it.
  splitHeroName();
  initCursor();
  initNavigation();
  initInteractions();
  initSectionDots();
  initBackToTop();
  initContactFab();
  initCounters();
  initSound();
  initScrollReveal();
  initGroupReveals();
  initSkillBars();

  const canvas = document.getElementById('hero-canvas');
  initHeroScene(canvas);

  // Motion libraries (GSAP/ScrollTrigger/Lenis) load in parallel with
  // everything above. Only the consumers below actually need them, and
  // every one of those still degrades gracefully to a CSS/
  // IntersectionObserver fallback if the libraries never arrive.
  const motionPromise = loadMotionLibs();

  const motion = await motionPromise;
  initSmoothScroll(motion);
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

