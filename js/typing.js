// ============================================================
// Rotating "role" typewriter text in the hero subhead.
// ============================================================
import { prefersReducedMotion } from './helpers.js';

const ROLES = [
  'علاقه‌مند به تکنولوژی',
  'طراح وب',
  'متخصص Unity',
  'برنامه‌نویس C#',
  'گرافیست',
  'طراح تصویر',
];

export function initTyping(targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  if (prefersReducedMotion) {
    el.textContent = ROLES[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function step() {
    const current = ROLES[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(step, 1600);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
      }
    }
    setTimeout(step, deleting ? 35 : 65);
  }
  step();
}
