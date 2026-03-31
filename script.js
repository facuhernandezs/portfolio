const revealItems = document.querySelectorAll('.reveal');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');

      if (entry.target.classList.contains('mini-chart')) {
        const bars = entry.target.querySelectorAll('.bar-fill');
        bars.forEach((bar) => {
          const width = bar.getAttribute('data-width') || '0';
          bar.style.width = `${width}%`;
        });
      }

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

const chart = document.querySelector('.mini-chart');
if (chart) {
  revealObserver.observe(chart);
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('is-open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 760) {
        navLinks.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}
