// Client-side motion + interaction. Bundled by Astro, runs on every page.

const reduceMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal() {
  const els = document.querySelectorAll<HTMLElement>('.reveal');
  if (!els.length) return;
  if (reduceMotion()) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  // threshold 0 fires for any element regardless of height. A fixed
  // percentage threshold silently fails on elements taller than the
  // viewport (e.g. a full article body), leaving them stuck hidden.
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -10% 0px' }
  );
  els.forEach((el) => io.observe(el));
}

function initNav() {
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    const setOpen = (open: boolean) => {
      links.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    };
    toggle.addEventListener('click', () => setOpen(!links.classList.contains('open')));
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Active section highlighting
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navAnchors = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[href*="#"]');
  if (sections.length && navAnchors.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.getAttribute('id');
            navAnchors.forEach((a) =>
              a.classList.toggle('active', (a.getAttribute('href') || '').endsWith(`#${id}`))
            );
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => spy.observe(s));
  }
}

function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const sync = () => {
    const t = root.getAttribute('data-theme') || 'dark';
    if (btn) {
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      btn.dataset.theme = t;
    }
  };
  sync();

  // Follow the OS theme live, unless the user has explicitly chosen one.
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      sync();
    }
  });

  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    sync();
  });
}

function initCards() {
  if (reduceMotion()) return;
  const cards = document.querySelectorAll<HTMLElement>('.card');
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
      if (isFinePointer && card.dataset.tilt !== 'off') {
        const rx = ((y - r.height / 2) / r.height) * -5;
        const ry = ((x - r.width / 2) / r.width) * 5;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

function initParallax() {
  if (reduceMotion()) return;
  const ambient = document.querySelector<HTMLElement>('.ambient');
  const floats = Array.from(document.querySelectorAll<HTMLElement>('[data-float]'));
  let mx = 0,
    my = 0,
    cx = 0,
    cy = 0,
    raf = 0;

  const tick = () => {
    cx += (mx - cx) * 0.06;
    cy += (my - cy) * 0.06;
    if (ambient) {
      ambient.style.transform = `translate(${cx * 26}px, ${cy * 26}px)`;
    }
    floats.forEach((el) => {
      const s = parseFloat(el.dataset.float || '12');
      el.style.transform = `translate(${cx * s}px, ${cy * s}px)`;
    });
    if (Math.abs(mx - cx) > 0.001 || Math.abs(my - cy) > 0.001) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };

  window.addEventListener(
    'mousemove',
    (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    },
    { passive: true }
  );

  // Scroll-driven parallax for elements with data-parallax (speed)
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (items.length) {
    const onScroll = () => {
      const vh = window.innerHeight;
      items.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.1');
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - vh / 2;
        el.style.setProperty('--py', `${(-offset * speed).toFixed(1)}px`);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
}

/*
  Count-up on scroll-into-view (Revyl-style).

  Markup contract — the element's text content IS the final value, so no-JS and
  reduced-motion readers always see the real number:
    <span data-count>$3.6M</span>
  The utility parses the FIRST number it finds in that text (here 3.6), keeps
  everything before it as a prefix ("$") and after it as a suffix ("M"), and
  animates only the number. Decimals are inferred from the literal so "3.6"
  counts with one decimal and "8" counts as an integer. Values with no leading
  number (e.g. "0→$3.6M", "3×") are left untouched.
*/
function initCounters() {
  const nums = document.querySelectorAll<HTMLElement>('[data-count]');
  if (!nums.length) return;

  // reduced motion / no-JS: text content already holds the final value.
  if (reduceMotion()) return;

  const animate = (el: HTMLElement) => {
    const raw = (el.dataset.countTo ?? el.textContent ?? '').trim();
    // first number, with optional decimals; capture prefix and suffix around it
    const m = raw.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s);
    if (!m) return; // nothing numeric to animate; leave as-is
    const prefix = m[1];
    const numStr = m[2].replace(/,/g, '');
    const suffix = m[3];
    const target = parseFloat(numStr);
    if (!isFinite(target)) return;
    const dot = numStr.indexOf('.');
    const decimals = dot === -1 ? 0 : numStr.length - dot - 1;
    const hadComma = m[2].includes(',');
    const fmt = (v: number) => {
      const s = v.toFixed(decimals);
      return hadComma ? Number(s).toLocaleString('en-US') : s;
    };

    const dur = 1100;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = prefix + fmt(target) + suffix;
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        animate(el);
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((n) => io.observe(n));
}

export function initMotion() {
  const run = () => {
    initReveal();
    initNav();
    initTheme();
    initCards();
    initParallax();
    initCounters();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
}
