// ==========================
// تغییر تم (دارک / لایت)
// ==========================
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// کلاس دارک
const css = document.documentElement.style;
document.body.classList.contains('dark-mode') ? css.setProperty('--bg-light', '#1a1a1a') : css.setProperty('--bg-light', '#f0f0f0');

// ==========================
// فلش‌کارت‌ها با صدا و انیمیشن
// ==========================
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
  setTimeout(() => {
    card.style.transform = 'translateX(0)';
    card.style.opacity = '1';
    // پخش صدا
    const audio = new Audio(card.dataset.sound);
    audio.play();
  }, index * 300); // هر کارت 300ms بعد از قبلی
});

// ==========================
// نوار متحرک بی‌پایان
// ==========================
const bar = document.getElementById('moving-bar');
let pos = -200; // شروع خارج صفحه

function moveBar() {
  pos += 2; // سرعت حرکت
  if (pos > window.innerWidth) pos = -200; // برگشت به ابتدا
  bar.style.right = `${pos}px`;
  requestAnimationFrame(moveBar);
}

moveBar();
