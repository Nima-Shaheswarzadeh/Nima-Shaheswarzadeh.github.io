// ============================================================
// Loads GSAP, ScrollTrigger and Lenis from a CDN as ES modules.
// Every consumer awaits the same cached promise, and every
// consumer treats a `null` result (offline, blocked CDN) as a
// normal case — the site is fully usable without these libraries,
// just calmer in its motion.
// ============================================================
let cache = null;

export function loadMotionLibs() {
  if (cache) return cache;

  cache = (async () => {
    try {
      const [gsapMod, stMod, lenisMod] = await Promise.all([
        import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js'),
        import('https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js'),
        import('https://cdn.jsdelivr.net/npm/lenis@1.1.14/dist/lenis.mjs'),
      ]);
      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      const Lenis = lenisMod.default;
      if (!gsap || !ScrollTrigger || !Lenis) throw new Error('motion libs incomplete');
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger, Lenis };
    } catch {
      return null;
    }
  })();

  return cache;
}
