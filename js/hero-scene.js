// ============================================================
// Hero signature element: a soft constellation / network field
// rendered with Three.js. Represents connections between
// technology & craft. Lazily loaded, mouse-reactive, and fully
// disabled for reduced-motion, touch, or small screens so it
// never costs a real user real battery for a decorative flourish.
// ============================================================
import { prefersReducedMotion, isMobileViewport } from './helpers.js';

export async function initHeroScene(canvas) {
  if (prefersReducedMotion || isMobileViewport() || !canvas) return;
  if (!('IntersectionObserver' in window)) return;

  let THREE;
  try {
    THREE = await import('https://unpkg.com/three@0.160.0/build/three.module.js');
  } catch {
    return; // Offline / blocked CDN — the CSS mesh background still carries the hero.
  }

  const parent = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 22;

  const COUNT = 70;
  const positions = new Float32Array(COUNT * 3);
  const speeds = [];
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 34;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    speeds.push(0.04 + Math.random() * 0.08);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x24e0c2,
    size: 0.22,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, pointsMaterial);
  scene.add(points);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x3a6ea5,
    transparent: true,
    opacity: 0.18,
  });
  const lineGeometry = new THREE.BufferGeometry();
  let lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineMesh);

  const LINK_DIST = 6.2;

  function rebuildLinks() {
    const verts = [];
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < LINK_DIST) {
          verts.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  }
  rebuildLinks();

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  function resize() {
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let frame = 0;
  let visible = true;
  const io = new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
  });
  io.observe(parent);

  function animate() {
    requestAnimationFrame(animate);
    if (!visible) return;
    frame++;

    if (frame % 3 === 0) {
      for (let i = 0; i < COUNT; i++) {
        positions[i * 3 + 1] += Math.sin(frame * 0.01 + i) * 0.004;
        positions[i * 3] += Math.cos(frame * 0.008 + i) * 0.003;
      }
      geometry.attributes.position.needsUpdate = true;
      if (frame % 18 === 0) rebuildLinks();
    }

    scene.rotation.y += (mouseX * 0.15 - scene.rotation.y) * 0.02;
    scene.rotation.x += (-mouseY * 0.08 - scene.rotation.x) * 0.02;
    scene.rotation.y += 0.0004;

    renderer.render(scene, camera);
  }
  animate();
}
