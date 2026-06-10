function productImage(title, category, tone = "charcoal") {
  return `images/products/${slugifyAsset(title)}.svg`;
}

function slugifyAsset(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function productArtwork(title, category, seed = 1) {
  const palettes = [
    ["#08090a", "#1a1a18", "#c8a96a"],
    ["#090d0b", "#17231c", "#9fb08e"],
    ["#12080a", "#2a1015", "#c8a96a"],
    ["#080b0d", "#17202a", "#b7b1a3"],
    ["#0d0907", "#211711", "#c8a96a"],
    ["#11100d", "#d8d0c2", "#c8a96a"]
  ];
  const [bg, panel, accent] = palettes[seed % palettes.length];
  const isFootwear = category === "footwear";
  const isAccessory = category === "accessories";
  const shape = isFootwear
    ? `<path d="M134 318c54 14 117 16 186 6 32-4 61 4 88 25 15 12 11 32-8 38-74 21-159 19-255-5-38-9-59-22-63-39-4-18 14-32 52-25Z" fill="${panel}" stroke="${accent}" stroke-width="3"/><path d="M137 320c25-47 57-76 96-89l31 84" fill="none" stroke="${accent}" stroke-width="3"/>`
    : isAccessory
      ? `<rect x="132" y="162" width="236" height="246" rx="24" fill="${panel}" stroke="${accent}" stroke-width="3"/><path d="M186 164c10-55 118-55 128 0" fill="none" stroke="${accent}" stroke-width="4"/><path d="M168 222h164M168 334h164" stroke="${accent}" stroke-width="2" opacity=".35"/>`
      : `<path d="M178 132h144l53 74-42 38v183H167V244l-42-38 53-74Z" fill="${panel}" stroke="${accent}" stroke-width="3"/><path d="M204 133c18 30 72 30 92 0M250 172v238M186 224h128" stroke="${accent}" stroke-width="2" opacity=".45"/>`;

  return `
    <svg class="product-art-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 650" role="img" aria-label="${escapeSvg(title)}">
      <defs>
        <linearGradient id="g-${seed}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${bg}"/>
          <stop offset="1" stop-color="#030303"/>
        </linearGradient>
        <radialGradient id="r-${seed}" cx=".72" cy=".18" r=".8">
          <stop offset="0" stop-color="${accent}" stop-opacity=".22"/>
          <stop offset=".55" stop-color="${accent}" stop-opacity=".04"/>
          <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="500" height="650" fill="url(#g-${seed})"/>
      <rect width="500" height="650" fill="url(#r-${seed})"/>
      <rect x="46" y="48" width="408" height="554" rx="18" fill="none" stroke="${accent}" stroke-opacity=".18"/>
      <circle cx="405" cy="114" r="46" fill="${accent}" opacity=".12"/>
      ${shape}
      <text x="58" y="560" font-family="Inter, Arial, sans-serif" font-size="17" fill="#f4efe6" font-weight="700">${escapeSvg(title)}</text>
      <text x="58" y="587" font-family="Inter, Arial, sans-serif" font-size="11" fill="${accent}" letter-spacing="4">${escapeSvg(category.toUpperCase())}</text>
    </svg>`;
}

function escapeSvg(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const products = [
  {
    id: 1,
    slug: "double-face-wool-overcoat",
    name: "Double-Face Wool Overcoat",
    category: "outerwear",
    price: 420,
    badge: "Bestseller",
    sizes: ["XS","S","M","L","XL"],
    colors: ["Black","Charcoal","Camel"],
    image: productImage("Double-Face Wool Overcoat", "outerwear", "charcoal"),
    image2: productImage("Overcoat Detail", "outerwear", "espresso"),
    description: "A substantial double-face wool overcoat with a clean shoulder, deep interior pockets, and a tailored profile for men and women.",
    details: ["90% wool, 10% cashmere","Double-face construction","Horn-effect buttons","Fully bound seams","Made in Italy"]
  },
  {
    id: 2,
    slug: "black-calf-leather-sneaker",
    name: "Black Calf Leather Sneaker",
    category: "footwear",
    price: 240,
    badge: "New",
    sizes: ["38","39","40","41","42","43","44","45"],
    colors: ["Black","Bone","Graphite"],
    image: productImage("Black Calf Leather Sneaker", "footwear", "slate"),
    image2: productImage("Leather Sneaker Detail", "footwear", "bone"),
    description: "Low-profile sneakers in smooth calf leather with tonal hardware and a cushioned cupsole for elevated daily wear.",
    details: ["Calf leather upper","Leather lining","Removable cushioned insole","Rubber cupsole","Made in Portugal"]
  },
  {
    id: 3,
    slug: "structured-leather-tote",
    name: "Structured Leather Tote",
    category: "accessories",
    price: 360,
    badge: "Limited",
    sizes: ["One Size"],
    colors: ["Black","Espresso","Forest"],
    image: productImage("Structured Leather Tote", "accessories", "espresso"),
    image2: productImage("Tote Interior", "accessories", "forest"),
    description: "A structured full-grain leather tote with discreet hardware, designed to carry workday essentials without losing its shape.",
    details: ["Full-grain leather","Suede interior","Internal laptop sleeve","Brushed brass hardware","Made in Spain"]
  },
  {
    id: 4,
    slug: "cashmere-rib-knit",
    name: "Cashmere Rib Knit",
    category: "outerwear",
    price: 260,
    badge: null,
    sizes: ["XS","S","M","L","XL"],
    colors: ["Black","Smoke","Oxblood"],
    image: productImage("Cashmere Rib Knit", "outerwear", "oxblood"),
    image2: productImage("Cashmere Texture", "outerwear", "charcoal"),
    description: "Dense cashmere knitwear with a ribbed collar and relaxed drape, cut for layering beneath coats or wearing alone.",
    details: ["100% Grade A cashmere","Ribbed collar and cuffs","Relaxed unisex fit","Hand wash cold","Made in Scotland"]
  },
  {
    id: 5,
    slug: "silk-georgette-shirt",
    name: "Silk Georgette Shirt",
    category: "essentials",
    price: 220,
    badge: "New",
    sizes: ["XS","S","M","L","XL"],
    colors: ["Black","Ivory","Midnight"],
    image: productImage("Silk Georgette Shirt", "essentials", "bone"),
    image2: productImage("Silk Cuff Detail", "essentials", "slate"),
    description: "A fluid silk shirt with a sharp collar, deep cuffs, and an evening-weight drape that works under tailoring or alone.",
    details: ["100% silk georgette","Mother-of-pearl buttons","French seams","Relaxed fit","Made in France"]
  },
  {
    id: 6,
    slug: "wide-leg-wool-trouser",
    name: "Wide-Leg Wool Trouser",
    category: "essentials",
    price: 290,
    badge: null,
    sizes: ["XS","S","M","L","XL"],
    colors: ["Black","Charcoal","Taupe"],
    image: productImage("Wide-Leg Wool Trouser", "essentials", "charcoal"),
    image2: productImage("Wool Trouser Detail", "essentials", "espresso"),
    description: "A wide-leg trouser in Italian wool with a long clean line, crisp front pleat, and concealed waistband closure.",
    details: ["Italian virgin wool","Wide-leg cut","Pressed front pleat","Concealed hook closure","Made in Italy"]
  },
  {
    id: 7,
    slug: "suede-penny-loafer",
    name: "Suede Penny Loafer",
    category: "footwear",
    price: 310,
    badge: "Bestseller",
    sizes: ["38","39","40","41","42","43","44","45"],
    colors: ["Black","Cognac","Dark Taupe"],
    image: productImage("Suede Penny Loafer", "footwear", "espresso"),
    image2: productImage("Loafer Sole Detail", "footwear", "charcoal"),
    description: "A refined penny loafer in plush suede with a leather sole, low stacked heel, and softly squared almond toe.",
    details: ["Italian suede upper","Leather lining","Goodyear welted sole","Low stacked heel","Made in Italy"]
  },
  {
    id: 8,
    slug: "cashmere-evening-scarf",
    name: "Cashmere Evening Scarf",
    category: "accessories",
    price: 150,
    badge: null,
    sizes: ["One Size"],
    colors: ["Black","Charcoal","Burgundy"],
    image: productImage("Cashmere Evening Scarf", "accessories", "slate"),
    image2: productImage("Cashmere Fringe", "accessories", "oxblood"),
    description: "A generous cashmere scarf with a brushed finish, designed to add warmth and texture to dark tailoring.",
    details: ["100% cashmere","Brushed finish","200cm x 70cm","Tonal fringe","Made in Scotland"]
  },
  {
    id: 9,
    slug: "technical-wool-bomber",
    name: "Technical Wool Bomber",
    category: "outerwear",
    price: 380,
    badge: "New",
    sizes: ["XS","S","M","L","XL"],
    colors: ["Black","Moss","Graphite"],
    image: productImage("Technical Wool Bomber", "outerwear", "forest"),
    image2: productImage("Bomber Hardware", "outerwear", "charcoal"),
    description: "A compact wool bomber with matte hardware, ribbed trims, and a clean cropped proportion.",
    details: ["Virgin wool blend","Two-way zip","Ribbed hem and cuffs","Internal welt pocket","Made in Portugal"]
  },
  {
    id: 10,
    slug: "leather-weekend-duffle",
    name: "Leather Weekend Duffle",
    category: "accessories",
    price: 520,
    badge: "Limited",
    sizes: ["One Size"],
    colors: ["Black","Espresso"],
    image: productImage("Leather Weekend Duffle", "accessories", "espresso"),
    image2: productImage("Duffle Hardware", "accessories", "charcoal"),
    description: "A weekender in grained leather with a broad opening, detachable strap, and protected metal feet.",
    details: ["Grained leather","Cotton twill lining","Detachable shoulder strap","Protective metal feet","Made in Spain"]
  },
  {
    id: 11,
    slug: "merino-roll-neck",
    name: "Merino Roll Neck",
    category: "essentials",
    price: 170,
    badge: null,
    sizes: ["XS","S","M","L","XL"],
    colors: ["Black","Stone","Burgundy"],
    image: productImage("Merino Roll Neck", "essentials", "oxblood"),
    image2: productImage("Roll Neck Rib", "essentials", "bone"),
    description: "A fine-gauge merino roll neck with a close neckline and clean body for layering under tailoring.",
    details: ["100% merino wool","Fine-gauge knit","Slim unisex fit","Ribbed neck","Made in Italy"]
  },
  {
    id: 12,
    slug: "pleated-evening-skirt",
    name: "Pleated Evening Skirt",
    category: "essentials",
    price: 250,
    badge: "New",
    sizes: ["XS","S","M","L","XL"],
    colors: ["Black","Midnight","Oxblood"],
    image: productImage("Pleated Evening Skirt", "essentials", "slate"),
    image2: productImage("Pleat Detail", "essentials", "oxblood"),
    description: "A sharp pleated evening skirt in weighty satin, balanced with a clean waistband and fluid movement.",
    details: ["Heavy satin twill","Knife pleats","Concealed side zip","Midi length","Made in France"]
  },
  {
    id: 13,
    slug: "brushed-wool-blazer",
    name: "Brushed Wool Blazer",
    category: "outerwear",
    price: 460,
    badge: "Bestseller",
    sizes: ["XS","S","M","L","XL"],
    colors: ["Black","Charcoal","Moss"],
    image: productImage("Brushed Wool Blazer", "outerwear", "charcoal"),
    image2: productImage("Blazer Lapel", "outerwear", "forest"),
    description: "A softly structured blazer in brushed wool with a broad lapel and longer line.",
    details: ["Brushed virgin wool","Single-breasted","Cupro lining","Internal breast pocket","Made in Italy"]
  },
  {
    id: 14,
    slug: "chelsea-commando-boot",
    name: "Chelsea Commando Boot",
    category: "footwear",
    price: 340,
    badge: null,
    sizes: ["38","39","40","41","42","43","44","45"],
    colors: ["Black","Espresso"],
    image: productImage("Chelsea Commando Boot", "footwear", "charcoal"),
    image2: productImage("Boot Tread Detail", "footwear", "espresso"),
    description: "A polished leather Chelsea boot with elastic side panels and a substantial commando sole.",
    details: ["Polished calf leather","Elastic side gussets","Commando rubber sole","Pull tab","Made in Portugal"]
  },
  {
    id: 15,
    slug: "brass-buckle-belt",
    name: "Brass Buckle Belt",
    category: "accessories",
    price: 130,
    badge: null,
    sizes: ["S","M","L","XL"],
    colors: ["Black","Espresso"],
    image: productImage("Brass Buckle Belt", "accessories", "bone"),
    image2: productImage("Belt Edge Detail", "accessories", "espresso"),
    description: "A full-grain leather belt with a brushed brass buckle and hand-painted edges.",
    details: ["Full-grain leather","Brushed brass buckle","Painted edges","35mm width","Made in England"]
  },
  {
    id: 16,
    slug: "satin-evening-camisole",
    name: "Satin Evening Camisole",
    category: "essentials",
    price: 160,
    badge: "New",
    sizes: ["XS","S","M","L","XL"],
    colors: ["Black","Champagne","Midnight"],
    image: productImage("Satin Evening Camisole", "essentials", "bone"),
    image2: productImage("Satin Strap Detail", "essentials", "slate"),
    description: "A minimal satin camisole with a clean neckline and adjustable straps for evening layering.",
    details: ["Silk satin blend","Adjustable straps","Bias cut","French seams","Made in France"]
  }
];

products.forEach(product => {
  product.art = productArtwork(product.name, product.category, product.id);
});
