// ─── INJECT SHARED NAV & FOOTER ───────────────────────────────
(function () {
  const nav = `
  <div class="announcement">
    Free Worldwide Shipping On Orders Over €200
  </div>
  <nav class="nav">
    <div class="container nav-wrap">
      <a href="index.html" class="logo">LUXE<span>CORE</span></a>
      <div class="nav-links">
        <a href="shop.html">New Arrivals</a>
        <a href="shop.html?cat=outerwear">Women</a>
        <a href="shop.html?cat=essentials">Men</a>
        <a href="shop.html">Collections</a>
      </div>
      <div class="nav-actions">
        <a href="shop.html" class="icon-btn" aria-label="Search">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </a>
        <a href="cart.html" class="icon-btn cart-icon-btn" aria-label="Cart" style="position:relative">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span id="cartCount" style="
            display:none;position:absolute;top:-6px;right:-6px;
            background:#b8895c;color:white;border-radius:999px;
            width:20px;height:20px;font-size:11px;font-weight:700;
            align-items:center;justify-content:center;font-family:Inter,sans-serif;
          ">0</span>
        </a>
      </div>
    </div>
  </nav>`;

  const footer = `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <a href="index.html" class="logo" style="text-decoration:none;display:block;margin-bottom:18px">LUXE<span style="color:#b8895c">CORE</span></a>
          <p>Premium ecommerce concept built for modern fashion brands, luxury lifestyle labels, and elevated online retail.</p>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <a href="shop.html">New Arrivals</a>
          <a href="shop.html?cat=outerwear">Outerwear</a>
          <a href="shop.html?cat=footwear">Footwear</a>
          <a href="shop.html?cat=accessories">Accessories</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Journal</a>
          <a href="#">Careers</a>
          <a href="#">Stores</a>
        </div>
        <div class="footer-col">
          <h4>Support</h4>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Contact</a>
          <a href="#">FAQs</a>
        </div>
      </div>
      <div class="footer-bottom">
        © 2026 LUXECORE — Premium Ecommerce Demo
      </div>
    </div>
  </footer>`;

  document.addEventListener("DOMContentLoaded", () => {
    // Inject nav before body's first child
    const navPlaceholder = document.getElementById("nav-placeholder");
    if (navPlaceholder) navPlaceholder.outerHTML = nav;

    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) footerPlaceholder.outerHTML = footer;
  });
})();
