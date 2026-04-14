import { Product } from './types';

export const INITIAL_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    name: "Noir Truffle Excellence",
    description: "70% single-origin dark chocolate ganache layered with velvet sponge.",
    price: 2400,
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Single Origin Chocolate", "Artisanal Ganache", "Gold Leaf Garnish"],
    inStock: true
  },
  {
    name: "Crimson Velvet Royale",
    description: "Traditional buttermilk sponge with Madagascar vanilla bean cream cheese.",
    price: 2800,
    category: "Anniversary",
    imageUrl: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Vanilla Bean", "Premium Velvet", "Hand-piped Decor"],
    inStock: true
  },
  {
    name: "Orchard Harvest Gateau",
    description: "Light chiffon sponge with hand-picked seasonal fruits and chantilly cream.",
    price: 2200,
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Seasonal Fruits", "Organic Cream", "Feather Light"],
    inStock: true
  },
  {
    name: "Golden Praline Crunch",
    description: "Salted caramel and roasted hazelnut praline with brown butter cream.",
    price: 2600,
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Roasted Hazelnuts", "Salted Caramel", "Signature Crunch"],
    inStock: true
  },
  {
    name: "Alabaster Wedding Tier",
    description: "Classic white chocolate and raspberry coulis with elegant fondant finish.",
    price: 4500,
    category: "Wedding",
    imageUrl: "https://images.unsplash.com/photo-1535254973040-607b474cb844?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Raspberry Coulis", "Silk Fondant", "Bespoke Design"],
    inStock: true
  },
  {
    name: "Artisan Celebration Hat",
    description: "Hand-crafted silk finish celebratory headwear for distinguished guests.",
    price: 450,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Silk Finish", "Designer Collection", "Adjustable Fit"],
    inStock: true
  },
  {
    name: "Gilded Taper Candles",
    description: "Hand-dipped metallic gold taper candles for a sophisticated glow.",
    price: 350,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Hand-dipped", "Metallic Gold", "Slow Burn"],
    inStock: true
  },
  {
    name: "Crystal Confetti Poppers",
    description: "Premium biodegradable metallic confetti for a grand celebration.",
    price: 650,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1514525253344-f814d074e015?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Metallic Foil", "Grand Burst", "Eco-friendly"],
    inStock: true
  },
  {
    name: "Bespoke Gold Topper",
    description: "Custom-designed laser-cut gold acrylic topper for the final touch.",
    price: 850,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1533285326576-292057ee3ed0?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Laser Cut", "24k Gold Hue", "Keepsake Quality"],
    inStock: true
  },
  {
    name: "Velvet Dream Cupcakes",
    description: "Box of 6 signature red velvet cupcakes with cream cheese frosting.",
    price: 1200,
    category: "Cupcakes",
    imageUrl: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Red Velvet", "Cream Cheese", "Box of 6"],
    inStock: true
  },
  {
    name: "French Butter Croissants",
    description: "Flaky, golden-brown pastries made with 100% French butter.",
    price: 800,
    category: "Pastries",
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["French Butter", "Flaky Layers", "Baked Daily"],
    inStock: true
  },
  {
    name: "Celebration Combo Royale",
    description: "Signature Noir Truffle cake paired with a bouquet of fresh roses and a gold topper.",
    price: 4200,
    category: "Combos",
    imageUrl: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=1200",
    characteristics: ["Cake + Flowers", "Gold Topper", "Luxury Gift"],
    inStock: true
  }
];
