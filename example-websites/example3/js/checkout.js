// ─── CHECKOUT PAGE ────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderOrderSummary();

  const form = document.getElementById("checkoutForm");
  if (form) {
    form.addEventListener("submit", handleCheckout);
  }

  // Card number formatting
  const cardInput = document.getElementById("cardNumber");
  if (cardInput) {
    cardInput.addEventListener("input", e => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 16);
      e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
    });
  }

  // Expiry formatting
  const expInput = document.getElementById("expiry");
  if (expInput) {
    expInput.addEventListener("input", e => {
      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
      if (v.length >= 2) v = v.slice(0,2) + "/" + v.slice(2);
      e.target.value = v;
    });
  }

  // CVV
  const cvvInput = document.getElementById("cvv");
  if (cvvInput) {
    cvvInput.addEventListener("input", e => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
    });
  }
});

function renderOrderSummary() {
  const summary = document.getElementById("orderSummary");
  if (!summary) return;

  if (!cart || cart.length === 0) {
    summary.innerHTML = `<p style="color:#6b7280">Your cart is empty. <a href="shop.html">Shop now</a></p>`;
    return;
  }

  const subtotal  = cartSubtotal();
  const shipping  = subtotal >= 200 ? 0 : 12;
  const total     = subtotal + shipping;

  summary.innerHTML = `
    <div class="summary-items">
      ${cart.map(item => `
        <div class="summary-row">
          <div class="summary-item-info">
            <img src="${item.image}" alt="${item.name}" style="width:64px;height:64px;object-fit:cover;border-radius:12px;flex-shrink:0">
            <div>
              <div style="font-weight:700;margin-bottom:4px">${item.name}</div>
              <div style="font-size:13px;color:#6b7280">${item.size} · ${item.color} · Qty ${item.quantity}</div>
            </div>
          </div>
          <div style="font-weight:700;color:#b8895c">€${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `).join("")}
    </div>

    <div class="summary-totals">
      <div class="total-row">
        <span>Subtotal</span>
        <span>€${subtotal.toFixed(2)}</span>
      </div>
      <div class="total-row">
        <span>Shipping</span>
        <span>${shipping === 0 ? '<span style="color:#065f46">Free</span>' : "€" + shipping.toFixed(2)}</span>
      </div>
      <div class="total-row grand-total">
        <span>Total</span>
        <span>€${total.toFixed(2)}</span>
      </div>
    </div>

    ${shipping > 0 ? `
    <div class="free-shipping-notice">
      Add €${(200 - subtotal).toFixed(2)} more for free shipping
      <div class="progress-bar"><div class="progress-fill" style="width:${Math.min(100, (subtotal/200)*100)}%"></div></div>
    </div>` : ""}
  `;
}

function handleCheckout(e) {
  e.preventDefault();

  const btn = document.getElementById("placeOrderBtn");
  btn.textContent = "Processing…";
  btn.disabled    = true;

  // Simulate a payment delay
  setTimeout(() => {
    localStorage.removeItem("luxecore-cart");
    window.location.href = "success.html";
  }, 1800);
}
