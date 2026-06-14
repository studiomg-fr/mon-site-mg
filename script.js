/* ============================================================
   MG STUDIO — script.js
   ============================================================ */

/* ─── Curseur personnalisé ────────────────────────────────── */
(function initCursor() {
  const cursor    = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursorDot');
  if (!cursor || !cursorDot) return;

  let mouseX = -100, mouseY = -100;
  let curX = -100, curY = -100;
  let raf;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top  = mouseY + 'px';
  });

  function animateCursor() {
    const ease = 0.12;
    curX += (mouseX - curX) * ease;
    curY += (mouseY - curY) * ease;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    raf = requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const hoverTargets = 'a, button, .card, .masonry-img-wrap, input, select, textarea, .social-link';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
})();


/* ─── Header : effet scroll ───────────────────────────────── */
(function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ─── Menu Burger ─────────────────────────────────────────── */
(function initBurger() {
  const burger    = document.getElementById('burger');
  const navLinks  = document.getElementById('navLinks');
  if (!burger || !navLinks) return;

  const toggle = () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.classList.toggle('active', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const close = () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', toggle);

  // Fermer au clic sur un lien
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', close);
  });

  // Fermer avec Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
})();


/* ─── Intersection Observer : fade-up ────────────────────── */
(function initFadeUp() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();


/* ─── Hero : Ken Burns au chargement ─────────────────────── */
(function initHeroKenBurns() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  requestAnimationFrame(() => {
    setTimeout(() => hero.classList.add('loaded'), 100);
  });
})();


/* ─── Formulaire de contact : feedback visuel ────────────── */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn  = form.querySelector('button[type="submit"]');
    const span = btn.querySelector('span');
    const origText = span.textContent;

    btn.disabled = true;
    span.textContent = 'Envoi en cours…';
    btn.style.opacity = '.7';

    // Simulation envoi (à remplacer par un vrai fetch/API)
    setTimeout(() => {
      span.textContent = 'Message envoyé ✓';
      btn.style.background = '#4CAF50';
      btn.style.borderColor = '#4CAF50';
      btn.style.opacity = '1';
      form.reset();

      setTimeout(() => {
        span.textContent = origText;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3500);
    }, 1200);
  });
})();


/* ─── Navigation active au scroll ────────────────────────── */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === '#' + id
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => observer.observe(s));
})();
