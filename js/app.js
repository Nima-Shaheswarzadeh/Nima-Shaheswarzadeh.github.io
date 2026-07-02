// ============================================================
// App entry point
// ============================================================
import { initCursor } from './cursor.js';
import { initNavigation } from './navigation.js';
import {
  initScrollReveal,
  initSkillBars,
  initTimelineDraw,
  initCounters,
  initSectionDots,
  initBackToTop,
} from './scroll.js';
import { initTyping } from './typing.js';
import { initContactFab } from './contact-fab.js';
import { initHeroScene } from './hero-scene.js';
import { prefersReducedMotion } from './helpers.js';

function splitHeroName() {
  const el = document.querySelector('[data-split-text]');
  if (!el) return;
  const text = el.textContent.trim();
  el.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'split-char';
    span.style.setProperty('--i-delay', `${0.5 + i * 0.045}s`);
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

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  preloader.classList.add('hidden');
  document.body.classList.add('is-loaded');
}

function init() {
  splitHeroName();
  initCursor();
  initNavigation();
  initScrollReveal();
  initSkillBars();
  initTimelineDraw();
  initCounters();
  initSectionDots();
  initBackToTop();
  initContactFab();
  initTyping('heroRole');

  const canvas = document.getElementById('hero-canvas');
  initHeroScene(canvas);

  requestAnimationFrame(() => {
    setTimeout(hidePreloader, 350);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
