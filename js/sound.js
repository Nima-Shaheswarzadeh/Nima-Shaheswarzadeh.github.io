// ============================================================
// Restored from the previous site version: a very short, soft
// Web Audio "click" on interactive elements. Improved with a
// persisted mute toggle so it's genuinely optional, not just
// present — a UI sound nobody can turn off isn't a feature.
// Silently no-ops if Web Audio is unsupported or the browser
// hasn't granted an audio-capable gesture yet.
// ============================================================
import { prefersReducedMotion } from './helpers.js';

const STORAGE_KEY = 'nima-site-sound';
let audioCtx = null;
let enabled = localStorage.getItem(STORAGE_KEY) !== 'off';

function getContext() {
  if (audioCtx) return audioCtx;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  } catch {
    audioCtx = null;
  }
  return audioCtx;
}

function playClick() {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx || ctx.state === 'suspended') return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 720;
    gain.gain.setValueAtTime(0.05, ctx.currentTime); // deliberately quiet — a texture, not a notification
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.09);
  } catch {
    // Fail silent — a missing click sound should never surface as an error.
  }
}

function setEnabled(next, toggleBtn) {
  enabled = next;
  localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
  toggleBtn?.classList.toggle('is-muted', !enabled);
  toggleBtn?.setAttribute('aria-pressed', String(!enabled));
  if (enabled) playClick();
}

export function initSound() {
  // Unlock the AudioContext on the first real user gesture — browsers
  // block audio until then, regardless of what this module wants.
  document.addEventListener('click', function unlock() {
    const ctx = getContext();
    if (ctx && ctx.state === 'suspended') ctx.resume();
  }, { once: true });

  document.addEventListener('click', (e) => {
    const target = e.target.closest(
      'a, button, .card-tilt, .social-icon, .tool-chip, .glass'
    );
    if (target && !target.closest('#sound-toggle')) playClick();
  });

  const toggleBtn = document.getElementById('sound-toggle');
  if (!toggleBtn) return;

  toggleBtn.classList.toggle('is-muted', !enabled);
  toggleBtn.setAttribute('aria-pressed', String(!enabled));
  toggleBtn.addEventListener('click', () => setEnabled(!enabled, toggleBtn));

  if (prefersReducedMotion) {
    // Reduced motion is about calmer stimulus in general, not only visual —
    // default to muted for these visitors, though they can still switch it
    // back on themselves.
    setEnabled(false, toggleBtn);
  }
}
