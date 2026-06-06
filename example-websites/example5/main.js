// NAV
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', scrollY > 20));

// MOBILE NAV — inject mobile menu from nav-right links
const navToggle = document.getElementById('navToggle');
let mobileMenu = null;
navToggle.addEventListener('click', () => {
  if (!mobileMenu) {
    mobileMenu = document.createElement('div');
    mobileMenu.style.cssText = `
      position:fixed;top:72px;left:0;right:0;z-index:199;
      background:var(--linen);border-bottom:1px solid var(--stone);
      padding:20px 24px;display:flex;flex-direction:column;gap:4px;
      box-shadow:0 8px 32px rgba(28,58,46,0.08);
    `;
    document.querySelectorAll('.nav-right a').forEach(a => {
      const link = document.createElement('a');
      link.href = a.href; link.textContent = a.textContent;
      link.style.cssText = 'padding:12px 0;font-family:var(--sans);font-size:15px;font-weight:500;color:var(--mid);border-bottom:1px solid var(--stone);';
      link.addEventListener('click', () => { mobileMenu.remove(); mobileMenu = null; navToggle.setAttribute('aria-expanded', false); });
      mobileMenu.appendChild(link);
    });
    document.body.appendChild(mobileMenu);
    navToggle.setAttribute('aria-expanded', true);
  } else {
    mobileMenu.remove(); mobileMenu = null;
    navToggle.setAttribute('aria-expanded', false);
  }
});

// SCROLL REVEALS
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left').forEach(el => obs.observe(el));

// FORM
document.getElementById('bookForm').addEventListener('submit', e => {
  e.preventDefault();
  const fname = document.getElementById('bfname').value.trim();
  const phone = document.getElementById('bphone').value.trim();
  if (!fname || !phone) { alert('Please enter your name and phone number so we can confirm your booking.'); return; }
  document.getElementById('bookForm').style.display = 'none';
  document.getElementById('formSuccess').classList.add('show');
});