import { Product } from './types';

export const INITIAL_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    name: "Noir Truffle Excellence",
    description: "70% single-origin dark chocolate ganache layered with velvet sponge.",
    price: 2400,
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Single Origin Chocolate", "Artisanal Ganache", "Gold Leaf Garnish"],
    inStock: true
  },
  {
    name: "Crimson Velvet Royale",
    description: "Traditional buttermilk sponge with Madagascar vanilla bean cream cheese.",
    price: 2800,
    category: "Anniversary",
    imageUrl: "https://images.unsplash.com/photo-1616541823729-00fe0ea135f1?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Vanilla Bean", "Premium Velvet", "Hand-piped Decor"],
    inStock: true
  },
  {
    name: "Orchard Harvest Gateau",
    description: "Light chiffon sponge with hand-picked seasonal fruits and chantilly cream.",
    price: 2200,
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Seasonal Fruits", "Organic Cream", "Feather Light"],
    inStock: true
  },
  {
    name: "Golden Praline Crunch",
    description: "Salted caramel and roasted hazelnut praline with brown butter cream.",
    price: 2600,
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Roasted Hazelnuts", "Salted Caramel", "Signature Crunch"],
    inStock: true
  },
  {
    name: "Alabaster Wedding Tier",
    description: "Classic white chocolate and raspberry coulis with elegant fondant finish.",
    price: 4500,
    category: "Wedding",
    imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Raspberry Coulis", "Silk Fondant", "Bespoke Design"],
    inStock: true
  },
  {
    name: "Artisan Celebration Hat",
    description: "Hand-crafted silk finish celebratory headwear for distinguished guests.",
    price: 450,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1558234857-e854b7ffb589?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Silk Finish", "Designer Collection", "Adjustable Fit"],
    inStock: true
  },
  {
    name: "Gilded Taper Candles",
    description: "Hand-dipped metallic gold taper candles for a sophisticated glow.",
    price: 350,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1602498456745-e9503b30470b?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Hand-dipped", "Metallic Gold", "Slow Burn"],
    inStock: true
  },
  {
    name: "Crystal Confetti Poppers",
    description: "Premium biodegradable metallic confetti for a grand celebration.",
    price: 650,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Metallic Foil", "Grand Burst", "Eco-friendly"],
    inStock: true
  },
  {
    name: "Bespoke Gold Topper",
    description: "Custom-designed laser-cut gold acrylic topper for the final touch.",
    price: 850,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Laser Cut", "24k Gold Hue", "Keepsake Quality"],
    inStock: true
  }
];
