/* ═══════════════════════════════════════════════════════
   Jared Matayo — Portfolio Scripts
   ═══════════════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ──────────────────────────────────── */
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');

let mx = 0, my = 0;   // mouse target
let rx = 0, ry = 0;   // ring (lagged)

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function tick() {
  // Dot follows instantly
  cur.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;

  // Ring eases toward the dot
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;

  requestAnimationFrame(tick);
})();

/* ── STICKY NAV ─────────────────────────────────────── */
const nav = document.getElementById('site-nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 60);
}, { passive: true });

/* ── SCROLL REVEAL ──────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── REPORT MODAL ───────────────────────────────────── */
function openReport() {
  const modal = document.getElementById('report-modal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReport(e) {
  // Close if clicking the backdrop (not the inner box) or the X button
  if (e && e.target !== document.getElementById('report-modal') &&
      !e.target.closest('.report-modal-close')) return;
  const modal = document.getElementById('report-modal');
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeReport({ target: document.getElementById('report-modal') });
});
