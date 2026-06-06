/* ── NAV SCROLL + TOGGLE ─────────────────────── */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', scrollY > 20);
  document.getElementById('backToTop')?.classList.toggle('show', scrollY > 400);
});

navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', open);
});

navMenu?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ── BACK TO TOP ─────────────────────────────── */
document.getElementById('backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── SCROLL REVEALS ──────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── COOKIE BANNER ───────────────────────────── */
const cookieBanner = document.getElementById('cookieBanner');
if (cookieBanner && !localStorage.getItem('cookieConsent')) {
  setTimeout(() => cookieBanner.classList.add('show'), 1000);
}
document.getElementById('cookieAccept')?.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'accepted');
  cookieBanner.classList.remove('show');
});
document.getElementById('cookieDecline')?.addEventListener('click', () => {
  localStorage.setItem('cookieConsent', 'declined');
  cookieBanner.classList.remove('show');
});

/* ── CONTACT FORM (Formspree) ────────────────── */
const form = document.getElementById('contactForm');

form?.addEventListener('submit', async e => {
  e.preventDefault();

  // Validate
  let valid = true;
  const fields = [
    { id: 'name',    errId: 'nameError',    check: v => v.trim().length > 1 },
    { id: 'email',   errId: 'emailError',   check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'service', errId: 'serviceError', check: v => v !== '' },
    { id: 'message', errId: 'messageError', check: v => v.trim().length > 10 },
  ];

  fields.forEach(({ id, errId, check }) => {
    const input = document.getElementById(id);
    const err   = document.getElementById(errId);
    const ok    = check(input.value);
    input.classList.toggle('error', !ok);
    if (err) err.style.display = ok ? 'none' : 'block';
    if (!ok) valid = false;
  });

  const gdpr = document.getElementById('gdpr');
  if (!gdpr.checked) {
    valid = false;
    gdpr.style.outline = '2px solid #dc2626';
  } else {
    gdpr.style.outline = '';
  }

  if (!valid) return;

  // Submit to Formspree
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending…';
  btn.disabled    = true;

  try {
    const res = await fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
    } else {
      throw new Error('failed');
    }
  } catch {
    btn.textContent = 'Send Message →';
    btn.disabled    = false;
    alert('Something went wrong. Please email us directly at hello@dublinwebsitecompany.ie');
  }
});

/* Clear error state on input */
form?.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const err = document.getElementById(el.id + 'Error');
    if (err) err.style.display = 'none';
  });
});