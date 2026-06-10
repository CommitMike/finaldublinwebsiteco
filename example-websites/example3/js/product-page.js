// ─── PRODUCT PAGE ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const params  = new URLSearchParams(window.location.search);
  const product = findProductFromLocation(params);
  const el      = document.getElementById("productPage");

  if (!product || !el) {
    el && (el.innerHTML = `<p style="padding:80px 0;color:#6b7280">Product not found. <a href="shop.html">Back to Shop</a></p>`);
    return;
  }

  document.title = `${product.name} | LUXECORE`;

  // Build size options
  const sizeHTML = product.sizes.map(s =>
    `<button class="size-btn" data-size="${s}">${s}</button>`
  ).join("");

  // Build color options
  const colorHTML = product.colors.map(c =>
    `<button class="color-btn" data-color="${c}">${c}</button>`
  ).join("");

  // Related products (same category, different id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const relatedHTML = related.map(p => `
    <a href="${productUrl(p)}" class="related-card">
      <div class="related-img-wrap">
        ${p.art}
      </div>
      <div class="related-info">
        <div class="tag">${p.category}</div>
        <h4>${p.name}</h4>
        <strong>€${p.price}</strong>
      </div>
    </a>
  `).join("");

  el.innerHTML = `
    <div class="breadcrumb">
      <a href="index.html">Home</a>
      <span>/</span>
      <a href="shop.html">Shop</a>
      <span>/</span>
      <span>${product.name}</span>
    </div>

    <div class="product-layout">

      <div class="product-images">
        <div class="main-img-wrap">
          <div id="mainImg" class="main-art">${product.art}</div>
          ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
        </div>
      </div>

      <div class="product-details">
        <div class="tag" style="margin-bottom:16px">${product.category}</div>
        <h1 class="product-title">${product.name}</h1>
        <div class="product-price">€${product.price}</div>
        <p class="product-desc">${product.description}</p>

        <div class="option-group">
          <label class="option-label">Size <span id="selectedSize" style="color:#b8895c;margin-left:8px"></span></label>
          <div class="option-row" id="sizeOptions">${sizeHTML}</div>
        </div>

        <div class="option-group">
          <label class="option-label">Colour <span id="selectedColor" style="color:#b8895c;margin-left:8px"></span></label>
          <div class="option-row" id="colorOptions">${colorHTML}</div>
        </div>

        <button class="add-btn" id="addBtn" onclick="handleAdd()">
          Add to Bag
        </button>

        <a href="cart.html" class="view-cart-link">View Cart →</a>

        <div class="product-accordion">
          <button class="accord-trigger" onclick="toggleAccord(this)">
            Product Details
            <span class="accord-icon">+</span>
          </button>
          <div class="accord-body">
            <ul>
              ${product.details.map(d => `<li>${d}</li>`).join("")}
            </ul>
          </div>

          <button class="accord-trigger" onclick="toggleAccord(this)">
            Shipping & Returns
            <span class="accord-icon">+</span>
          </button>
          <div class="accord-body">
            <ul>
              <li>Free worldwide shipping on orders over €200</li>
              <li>Standard delivery 3-5 business days</li>
              <li>Express delivery 1-2 business days</li>
              <li>Free returns within 30 days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    ${related.length ? `
    <div class="related-section">
      <h2 class="related-title">You May Also Like</h2>
      <div class="related-grid">${relatedHTML}</div>
    </div>` : ""}
  `;

  // Select first size and color by default
  const firstSize  = el.querySelector(".size-btn");
  const firstColor = el.querySelector(".color-btn");
  if (firstSize)  selectOption(firstSize, "sizeOptions",  "selectedSize");
  if (firstColor) selectOption(firstColor, "colorOptions", "selectedColor");

  // Attach click handlers
  el.querySelectorAll(".size-btn").forEach(btn => {
    btn.addEventListener("click", () => selectOption(btn, "sizeOptions", "selectedSize"));
  });
  el.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", () => selectOption(btn, "colorOptions", "selectedColor"));
  });
});

function switchImg(thumb, src) {
  document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
  thumb.classList.add("active");
}

function findProductFromLocation(params) {
  const raw =
    params.get("product") ||
    params.get("slug") ||
    params.get("id") ||
    window.location.hash.replace("#", "") ||
    window.location.pathname.split("/").pop().replace(".html", "");

  const value = decodeURIComponent(String(raw || "")).trim().toLowerCase();
  const id = Number.parseInt(value, 10);

  return products.find(product =>
    product.id === id ||
    String(product.id) === value ||
    product.slug === value ||
    slugify(product.name) === value
  );
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function productUrl(product) {
  const key = product.slug || product.id;
  return `product.html?product=${encodeURIComponent(key)}`;
}

function selectOption(btn, groupId, labelId) {
  document.querySelectorAll(`#${groupId} button`).forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
  const label = document.getElementById(labelId);
  if (label) label.textContent = btn.dataset.size || btn.dataset.color || "";
}

function handleAdd() {
  const params  = new URLSearchParams(window.location.search);
  const product = findProductFromLocation(params);
  const id      = product ? product.id : Number.parseInt(params.get("id"), 10);
  const sizeBtn  = document.querySelector("#sizeOptions .selected");
  const colorBtn = document.querySelector("#colorOptions .selected");
  const size     = sizeBtn  ? (sizeBtn.dataset.size  || sizeBtn.textContent)  : null;
  const color    = colorBtn ? (colorBtn.dataset.color || colorBtn.textContent) : null;

  addToCart(id, size, color);

  const btn = document.getElementById("addBtn");
  btn.textContent = "Added ✓";
  btn.style.background = "#b8895c";
  setTimeout(() => {
    btn.textContent = "Add to Bag";
    btn.style.background = "#111";
  }, 2000);
}

function toggleAccord(trigger) {
  const body = trigger.nextElementSibling;
  const icon = trigger.querySelector(".accord-icon");
  const open = body.style.maxHeight && body.style.maxHeight !== "0px";
  body.style.maxHeight  = open ? "0px"  : body.scrollHeight + "px";
  body.style.opacity    = open ? "0"    : "1";
  icon.textContent      = open ? "+"    : "−";
}
