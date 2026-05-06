const root = document.documentElement;
root.classList.add('js');

try {
  const savedTheme = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme ?? (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initialTheme);
} catch {
  root.setAttribute('data-theme', 'dark');
}

const updateThemeIcon = () => {
  const icon = document.querySelector<HTMLElement>('[data-theme-icon]');
  if (!icon) return;
  icon.className = root.getAttribute('data-theme') === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
};

updateThemeIcon();

document.querySelector<HTMLButtonElement>('[data-theme-toggle]')?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try {
    localStorage.setItem('theme', next);
  } catch {
    // Theme still changes for the current page even when storage is blocked.
  }
  updateThemeIcon();
});

const nav = document.querySelector<HTMLElement>('[data-nav]');
const setNavState = () => {
  nav?.classList.toggle('scrolled', window.scrollY > 12);
};
setNavState();
window.addEventListener('scroll', setNavState, { passive: true });

const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const navLinks = document.querySelector<HTMLElement>('[data-nav-links]');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('active') ?? false;
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const revealElements = document.querySelectorAll<HTMLElement>('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px' }
  );
  revealElements.forEach((element) => revealObserver.observe(element));
  root.classList.add('reveal-ready');
} else {
  revealElements.forEach((element) => element.classList.add('active'));
}

const planes = Array.from(document.querySelectorAll<HTMLElement>('.motion-plane'));
let pointerX = 0;
let pointerY = 0;
let raf = 0;

const updateParallax = () => {
  raf = 0;
  planes.forEach((plane, index) => {
    const multiplier = (index + 1) * 10;
    plane.style.setProperty('--mx', String(pointerX * multiplier));
    plane.style.setProperty('--my', String(pointerY * multiplier));
  });
};

document.addEventListener(
  'pointermove',
  (event) => {
    pointerX = event.clientX / window.innerWidth - 0.5;
    pointerY = event.clientY / window.innerHeight - 0.5;
    if (!raf) raf = window.requestAnimationFrame(updateParallax);
  },
  { passive: true }
);

const currentYear = document.querySelector<HTMLElement>('[data-current-year]');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());
