/* ── NAV ──────────────────────────────────── */
const navbar   = document.getElementById('navbar');
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () =>
  navbar.classList.toggle('scrolled', scrollY > 10), { passive: true });

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(5px,5px)' : '';
  toggle.querySelectorAll('span')[1].style.opacity   = open ? '0' : '1';
  toggle.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded', false);
}));

/* ── SCROLL REVEALS ───────────────────────── */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── CATEGORY FILTER ──────────────────────── */
function filterProducts(cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat || (cat === 'all' && b.dataset.cat === 'all')));
  const cards = document.querySelectorAll('.product-card:not(.empty-state)');
  let visible = 0;
  cards.forEach(c => {
    const show = cat === 'all' || c.dataset.cat === cat;
    c.dataset.hidden = show ? 'false' : 'true';
    c.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.getElementById('emptyState').classList.toggle('show', visible === 0);
  // Scroll to shop
  document.getElementById('shop').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => filterProducts(btn.dataset.cat));
});

/* ── SORT ─────────────────────────────────── */
document.getElementById('sortSelect').addEventListener('change', function () {
  const grid  = document.getElementById('productsGrid');
  const cards = [...grid.querySelectorAll('.product-card:not(.empty-state)')];
  const val   = this.value;

  cards.sort((a, b) => {
    if (val === 'price-asc')  return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
    if (val === 'price-desc') return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
    if (val === 'name')       return a.dataset.name.localeCompare(b.dataset.name);
    return 0; // featured — original order
  });

  const empty = document.getElementById('emptyState');
  cards.forEach(c => grid.insertBefore(c, empty));
});

/* ── ADD TO CART FEEDBACK ─────────────────── */
document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('added');
    const orig = btn.textContent;
    btn.textContent = '✓ Added!';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.textContent = orig;
    }, 1600);
    showToast('Added to cart 🛒', 'green');
  });
});

/* ── NEWSLETTER ───────────────────────────── */
document.getElementById('newsletterForm').addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('nlEmail').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email address.', '');
    return;
  }
  document.getElementById('newsletterForm').style.display = 'none';
  document.getElementById('newsletterSuccess').classList.add('show');
});

/* ── TOAST ────────────────────────────────── */
function showToast(msg, type) {
  const wrap  = document.getElementById('toastWrap');
  const toast = document.createElement('div');
  toast.className = 'toast' + (type ? ' ' + type : '');
  toast.textContent = msg;
  wrap.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ── SNIPCART: update cart count colour when >0 ── */
document.addEventListener('snipcart.ready', () => {
  Snipcart.events.on('item.added', () => showToast('Item added to your cart! 🛒', 'green'));
});