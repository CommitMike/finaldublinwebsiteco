require("dotenv").config();

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 4242;

const PRODUCT_PRICES = {
  1: 420,
  2: 240,
  3: 360,
  4: 260,
  5: 220,
  6: 290,
  7: 310,
  8: 150,
  9: 380,
  10: 520,
  11: 170,
  12: 250,
  13: 460,
  14: 340,
  15: 130,
  16: 160
};

const allowedOrigins = new Set([
  process.env.CLIENT_URL,
  "http://localhost:8080",
  "http://localhost:8081",
  "http://localhost:8082",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:8081",
  "http://127.0.0.1:8082"
].filter(Boolean));

app.use(cors({
  origin(origin, callback) {
    const isLocalDevOrigin = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || "");

    if (!origin || allowedOrigins.has(origin) || isLocalDevOrigin) {
      callback(null, true);
      return;
    }
    callback(new Error(`Origin not allowed: ${origin}`));
  },
  methods: ["GET", "POST"]
}));

app.use((req, res, next) => {
  if (req.originalUrl === "/webhook") {
    next();
    return;
  }
  express.json()(req, res, next);
});

app.get("/", (req, res) => {
  res.json({ status: "LUXECORE backend running" });
});

app.get("/config", (req, res) => {
  if (!process.env.STRIPE_PUBLISHABLE_KEY) {
    res.status(500).json({ error: "Missing STRIPE_PUBLISHABLE_KEY" });
    return;
  }

  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
      return;
    }

    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "No items provided" });
      return;
    }

    let subtotalEuros = 0;

    for (const item of items) {
      const id = Number(item.id);
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const serverPrice = PRODUCT_PRICES[id];

      if (!serverPrice) {
        res.status(400).json({ error: `Unknown product id: ${item.id}` });
        return;
      }

      subtotalEuros += serverPrice * quantity;
    }

    const shippingEuros = subtotalEuros >= 200 ? 0 : 12;
    const totalEuros = subtotalEuros + shippingEuros;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalEuros * 100),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
      metadata: {
        item_count: items.length,
        subtotal: subtotalEuros,
        shipping: shippingEuros
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: totalEuros
    });
  } catch (err) {
    console.error("PaymentIntent error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const sig = req.headers["stripe-signature"];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    try {
      handleWebhookEvent(JSON.parse(req.body.toString()));
      res.json({ received: true });
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
    return;
  }

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, secret);
    handleWebhookEvent(event);
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook signature failed:", err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

function handleWebhookEvent(event) {
  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    console.log(`Payment succeeded: ${pi.id} - EUR ${(pi.amount / 100).toFixed(2)}`);
    return;
  }

  if (event.type === "payment_intent.payment_failed") {
    const pi = event.data.object;
    console.log(`Payment failed: ${pi.id}`);
    return;
  }

  console.log(`Unhandled webhook event: ${event.type}`);
}

const server = app.listen(PORT, () => {
  console.log(`LUXECORE backend running at http://localhost:${PORT}`);
  console.log(`Stripe secret key loaded: ${process.env.STRIPE_SECRET_KEY ? "yes" : "no"}`);
});

server.on("error", err => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Stop the existing backend or run this server with PORT=4243 npm start.`);
    process.exit(1);
  }

  throw err;
});
