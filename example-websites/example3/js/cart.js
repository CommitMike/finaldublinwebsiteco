// ─── CART STATE ───────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem("luxecore-cart")) || [];

function saveCart() {
  localStorage.setItem("luxecore-cart", JSON.stringify(cart));
}

// ─── ADD / REMOVE / UPDATE ────────────────────────────────────
function addToCart(id, size, color) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const selectedSize  = size  || (product.sizes  && product.sizes[0])  || "One Size";
  const selectedColor = color || (product.colors && product.colors[0]) || "Default";
  const key = `${id}-${selectedSize}-${selectedColor}`;

  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      key,
      id,
      name:     product.name,
      price:    product.price,
      image:    product.image,
      size:     selectedSize,
      color:    selectedColor,
      quantity: 1
    });
  }

  saveCart();
  updateCartCount();
  showCartToast(product.name);
}

function removeFromCart(key) {
  cart = cart.filter(item => item.key !== key);
  saveCart();
  updateCartCount();
  if (typeof renderCart === "function") renderCart();
}

function updateQuantity(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  saveCart();
  updateCartCount();
  if (typeof renderCart === "function") renderCart();
}

// ─── UI HELPERS ───────────────────────────────────────────────
function updateCartCount() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? "flex" : "none";
}

function cartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function showCartToast(name) {
  let toast = document.getElementById("cartToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cartToast";
    toast.style.cssText = `
      position:fixed;bottom:32px;right:32px;z-index:9999;
      background:#111;color:#fff;padding:18px 28px;border-radius:999px;
      font-family:Inter,sans-serif;font-weight:600;font-size:15px;
      box-shadow:0 20px 60px rgba(0,0,0,0.25);
      transform:translateY(20px);opacity:0;
      transition:all 0.35s cubic-bezier(.22,1,.36,1);
      display:flex;align-items:center;gap:12px;
    `;
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span style="color:#b8895c">✓</span> ${name} added to bag`;
  requestAnimationFrame(() => {
    toast.style.transform = "translateY(0)";
    toast.style.opacity   = "1";
  });
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.transform = "translateY(20px)";
    toast.style.opacity   = "0";
  }, 2800);
}

// Run on page load
updateCartCount();
