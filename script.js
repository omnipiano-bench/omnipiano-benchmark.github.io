// Song difficulty list (paper Table 2: steps at 20 Hz, NPS, F1).
const songs = [
  ['Gymnopédie No. 1', 1.77, 0.88],
  ['Twinkle Twinkle', 1.51, 0.86],
  ['Clair de Lune', 2.65, 0.63],
  ['French Suite No. 1, Allemande', 10.89, 0.59],
  ['French Suite No. 5, Sarabande', 3.56, 0.59],
  ['Piano Sonata No. 23, 2nd mov.', 12.80, 0.49],
  ['Pictures at an Exhibition: Great Kiev', 8.39, 0.45],
  ['Kreisleriana Op. 16 No. 8', 9.78, 0.44],
  ['Piano Sonata No. 2, 1st mov.', 6.94, 0.44],
  ['Piano Sonata K279, 1st mov.', 9.54, 0.44],
  ['Für Elise', 10.44, 0.42],
  ['French Suite No. 5, Gavotte', 6.80, 0.40],
  ['Piano Sonata D845, 1st mov.', 9.04, 0.34],
  ['Winter Wind', 16.64, 0.28],
  ['Bagatelle Op. 3 No. 4', 9.24, 0.26],
  ['Partita No. 2, 6th mov.', 11.91, 0.25],
];
const songList = document.getElementById('song-list');
if (songList) {
  songList.innerHTML = songs.map(([name, nps, f1]) => `
    <li title="${name}: NPS ${nps.toFixed(2)}, F1 ${f1.toFixed(2)}">
      <span class="name">${name} <small>· ${nps.toFixed(1)} NPS</small></span>
      <span class="bar"><i style="width:${f1 * 100}%"></i></span>
      <span class="val">${f1.toFixed(2)}</span>
    </li>`).join('');
}

// Sticky nav: show wordmark after scrolling, highlight the current section.
const nav = document.querySelector('.topnav');
const navLinks = [...document.querySelectorAll('.topnav-links a')];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 240);
  let current = null;
  sections.forEach((s) => { if (s.getBoundingClientRect().top < 120) current = s; });
  navLinks.forEach((a) => a.classList.toggle('active', current && a.getAttribute('href') === `#${current.id}`));
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Video filters.
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.video-card');
chips.forEach((chip) => chip.addEventListener('click', () => {
  const f = chip.dataset.filter;
  chips.forEach((c) => { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-pressed', c === chip); });
  cards.forEach((card) => { card.hidden = f !== 'all' && card.dataset.track !== f; });
}));

// Figure lightbox.
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.zoomable img').forEach((img) => img.addEventListener('click', () => {
  lightboxImg.src = img.currentSrc || img.src;
  lightboxImg.alt = img.alt;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}));
const closeLightbox = () => { lightbox.hidden = true; document.body.style.overflow = ''; };
lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

// Copy BibTeX.
document.querySelectorAll('[data-copy]').forEach((btn) => btn.addEventListener('click', async () => {
  const text = document.querySelector(btn.dataset.copy).textContent;
  try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied!'; }
  catch { btn.textContent = 'Select & copy'; }
  setTimeout(() => { btn.textContent = 'Copy'; }, 1600);
}));
