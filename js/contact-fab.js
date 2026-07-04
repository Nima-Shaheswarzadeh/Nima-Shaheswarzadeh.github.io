// ============================================================
// Floating quick-contact button: expands into direct channels.
// Scroll-aware — closes itself if the user scrolls a meaningful
// amount so it never lingers open and blocks content.
// ============================================================
export function initContactFab() {
  const fab = document.getElementById('contact-fab');
  const items = document.getElementById('contact-fab-items');
  if (!fab || !items) return;

  const itemEls = items.querySelectorAll('.fab-item');
  let open = false;
  let lastY = window.scrollY;

  function setOpen(next) {
    open = next;
    fab.classList.toggle('active', open);
    fab.setAttribute('aria-expanded', String(open));
    itemEls.forEach((el, i) => {
      setTimeout(() => el.classList.toggle('show', open), open ? i * 45 : 0);
    });
  }

  fab.addEventListener('click', () => setOpen(!open));

  document.addEventListener('click', (e) => {
    if (open && !fab.contains(e.target) && !items.contains(e.target)) setOpen(false);
  });

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (open && Math.abs(y - lastY) > 80) setOpen(false);
    lastY = y;
  }, { passive: true });
}
