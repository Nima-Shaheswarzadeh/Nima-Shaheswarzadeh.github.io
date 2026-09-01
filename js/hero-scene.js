// ============================================================
// Hero signature element: a soft constellation / network field
// rendered with Three.js. Represents connections between
// technology & craft. High mouse sensitivity, smooth parallax,
// and dynamic reactive particles.
// ============================================================
import { prefersReducedMotion, isMobileViewport } from './helpers.js';

export async function initHeroScene(canvas) {
  if (prefersReducedMotion || !canvas) return;
  if (!('IntersectionObserver' in window)) return;

  let THREE;
  try {
    THREE = await import('https://unpkg.com/three@0.160.0/build/three.module.js');
  } catch {
    return; // Offline / blocked CDN — the CSS mesh background still carries the hero.
  }

  const parent = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
  camera.position.z = 22;

  const COUNT = isMobileViewport() ? 40 : 85;
  const positions = new Float32Array(COUNT * 3);
  const basePositions = new Float32Array(COUNT * 3);
  const speeds = [];
  
  for (let i = 0; i < COUNT; i++) {
    const x = (Math.random() - 0.5) * 36;
    const y = (Math.random() - 0.5) * 22;
    const z = (Math.random() - 0.5) * 16;
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    basePositions[i * 3] = x;
    basePositions[i * 3 + 1] = y;
    basePositions[i * 3 + 2] = z;
    speeds.push(0.04 + Math.random() * 0.09);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x93aad9,
    size: isMobileViewport() ? 0.22 : 0.28,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geometry, pointsMaterial);
  scene.add(points);

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6284c1,
    transparent: true,
    opacity: 0.22,
  });
  const lineGeometry = new THREE.BufferGeometry();
  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineMesh);

  const LINK_DIST = 6.8;

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
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener('mousemove', (e) => {
    // Increased coordinate range (-1 to 1) for strong responsiveness
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // Optional subtle device tilt on mobile
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma !== null && e.beta !== null) {
        targetMouseX = Math.max(-1, Math.min(1, e.gamma / 25));
        targetMouseY = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
      }
    }, { passive: true });
  }

  function resize() {
    const w = parent.clientWidth || window.innerWidth;
    const h = parent.clientHeight || window.innerHeight;
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

    // Smooth interpolation with high follow speed
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;

    if (frame % 2 === 0) {
      for (let i = 0; i < COUNT; i++) {
        const s = speeds[i];
        const bx = basePositions[i * 3];
        const by = basePositions[i * 3 + 1];
        const bz = basePositions[i * 3 + 2];

        // Organic floating animation
        positions[i * 3 + 1] = by + Math.sin(frame * 0.012 * s + i) * 1.2;
        positions[i * 3] = bx + Math.cos(frame * 0.009 * s + i) * 1.0;
        positions[i * 3 + 2] = bz + Math.sin(frame * 0.007 * s + i * 0.5) * 0.8;
      }
      geometry.attributes.position.needsUpdate = true;
      if (frame % 12 === 0) rebuildLinks();
    }

    // Much higher sensitivity: camera translation + scene tilt
    camera.position.x = mouseX * 4.5;
    camera.position.y = -mouseY * 3.2;
    camera.lookAt(0, 0, 0);

    scene.rotation.y = mouseX * 0.55 + Math.sin(frame * 0.002) * 0.05;
    scene.rotation.x = -mouseY * 0.38 + Math.cos(frame * 0.002) * 0.03;

    renderer.render(scene, camera);
  }
  animate();
}
