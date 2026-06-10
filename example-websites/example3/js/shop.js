// ─── SHOP PAGE ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const grid   = document.getElementById("productGrid");
  const count  = document.getElementById("productCount");
  const search = document.getElementById("searchInput");
  const sort   = document.getElementById("sortSelect");

  // Read URL param for pre-selected category
  const params  = new URLSearchParams(window.location.search);
  let activeFilter = params.get("cat") || "all";

  // Highlight active filter btn
  document.querySelectorAll("[data-filter]").forEach(btn => {
    if (btn.dataset.filter === activeFilter) btn.classList.add("active");
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    });
  });

  search && search.addEventListener("input", render);
  sort   && sort.addEventListener("change", render);

  function getFiltered() {
    let list = [...products];

    // category
    if (activeFilter !== "all") {
      list = list.filter(p => p.category === activeFilter);
    }

    // search
    if (search && search.value.trim()) {
      const q = search.value.trim().toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // sort
    if (sort) {
      const s = sort.value;
      if (s === "price-asc")  list.sort((a, b) => a.price - b.price);
      if (s === "price-desc") list.sort((a, b) => b.price - a.price);
      if (s === "name")       list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }

  function render() {
    const list = getFiltered();
    if (count) count.textContent = list.length;

    if (list.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;padding:80px 0;text-align:center;color:#6b7280">
          <p style="font-size:18px">No products found.</p>
          <button onclick="location.reload()" style="margin-top:16px;padding:12px 24px;border:1px solid #e5e7eb;border-radius:999px;background:white;cursor:pointer;font-weight:600">Clear filters</button>
        </div>`;
      return;
    }

    grid.innerHTML = list.map(p => `
      <article class="product-card" role="link" tabindex="0" data-product-url="${productUrl(p)}" style="animation:fadeUp 0.4s ease both;cursor:pointer">
        <div class="product-image">
          <a href="${productUrl(p)}">
            ${p.art}
          </a>
          ${p.badge ? `<div class="product-badge-grid">${p.badge}</div>` : ""}
          <div class="quick-actions">
            <a href="${productUrl(p)}" class="quick-btn">View</a>
            <button class="quick-btn" data-add-to-bag="${p.id}">Add to Bag</button>
          </div>
        </div>
        <div class="product-info">
          <div class="tag">${p.category}</div>
          <h3>${p.name}</h3>
          <div class="product-meta">
            <strong style="color:#b8895c;font-size:20px">€${p.price}</strong>
            <span style="font-size:13px;color:#6b7280">★★★★★</span>
          </div>
        </div>
      </article>
    `).join("");

    grid.querySelectorAll(".product-card").forEach(card => {
      card.addEventListener("click", event => {
        if (event.target.closest("a,button")) return;
        window.location.href = card.dataset.productUrl;
      });
      card.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        window.location.href = card.dataset.productUrl;
      });
    });

    grid.querySelectorAll("[data-add-to-bag]").forEach(button => {
      button.addEventListener("click", event => {
        event.stopPropagation();
        addToCart(Number(button.dataset.addToBag));
      });
    });
  }

  render();
});

function productUrl(product) {
  const key = product.slug || product.id;
  return `product.html?product=${encodeURIComponent(key)}`;
}
