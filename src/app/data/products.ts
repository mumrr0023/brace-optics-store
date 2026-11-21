export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  category: string;
  description: string;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "CLUBMASTER AMBER",
    price: 219,
    image: "/images/products/glasses-1.jpeg",
    hoverImage: "/images/products/wearing-1.jpeg",
    category: "Sunglasses",
    description: "Classic browline silhouette combining rich tortoiseshell acetate with a refined gold wire rim and warm brown gradient lenses.",
    features: ["UV400 Protection", "Tortoiseshell & Gold Frame", "Brown Gradient Lenses", "Adjustable Nose Pads"],
    inStock: true
  },
  {
    id: "2",
    name: "TORTOISE CAT-EYE",
    price: 199,
    image: "/images/products/glasses-2.jpeg",
    hoverImage: "/images/products/wearing-2.jpeg",
    category: "Optical",
    description: "Sophisticated tortoiseshell cat-eye optical frame with soft curves for effortless everyday elegance.",
    features: ["Italian Acetate", "Prescription Ready", "Lightweight Design", "Spring Hinges"],
    inStock: true
  },
  {
    id: "3",
    name: "CRYSTAL CAT-EYE",
    price: 209,
    image: "/images/products/glasses-3.jpeg",
    hoverImage: "/images/products/wearing-3.jpeg",
    category: "Optical",
    description: "Sculptural transparent acetate cat-eye frame accented with polished gold hardware at the temples.",
    features: ["Crystal Clear Acetate", "Gold Hinge Accents", "Prescription Ready", "Anti-Glare Coating"],
    inStock: true
  },
  {
    id: "4",
    name: "AVIATOR GOLD OPTICAL",
    price: 239,
    image: "/images/products/glasses-4.jpeg",
    hoverImage: "/images/products/wearing-4.jpeg",
    category: "Optical",
    description: "Timeless double-bridge aviator silhouette crafted from ultra-lightweight gold-plated titanium.",
    features: ["Gold-Plated Titanium", "Double Bridge Design", "Prescription Ready", "Adjustable Nose Pads"],
    inStock: true
  },
  {
    id: "5",
    name: "ROUND DOUBLE-BRIDGE",
    price: 229,
    image: "/images/products/glasses-5.jpeg",
    hoverImage: "/images/products/wearing-5.jpeg",
    category: "Sunglasses",
    description: "Vintage-inspired round gold metal frame featuring a sleek top bar, tortoiseshell temple tips, and warm gradient lenses.",
    features: ["Gold Metal Frame", "Double Nose Bridge", "Gradient Tinted Lenses", "100% UV Protection"],
    inStock: true
  },
  {
    id: "6",
    name: "CLUBMASTER SLATE",
    price: 225,
    image: "/images/products/glasses-6.jpeg",
    hoverImage: "/images/products/wearing-6.jpeg",
    category: "Sunglasses",
    description: "Iconic dark tortoiseshell browline frame paired with cool slate-silver reflective lenses and gold rim detailing.",
    features: ["Polarized Slate Lenses", "Acetate & Gold Rim", "UV400 Protection", "Adjustable Nose Pads"],
    inStock: true
  },
  {
    id: "7",
    name: "ROUND SAGE GOLD",
    price: 215,
    image: "/images/products/glasses-7.jpeg",
    hoverImage: "/images/products/wearing-7.jpeg",
    category: "Sunglasses",
    description: "Minimalist round gold wire sunglasses with soothing sage-green gradient lenses and crystal temple tips.",
    features: ["Featherweight Metal", "Sage Gradient Lenses", "Engraved Temples", "UV400 Protection"],
    inStock: true
  },
  {
    id: "8",
    name: "CAT-EYE HAVANA SUN",
    price: 229,
    image: "/images/products/glasses-8.jpeg",
    hoverImage: "/images/products/wearing-8.jpeg",
    category: "Sunglasses",
    description: "Bold Havana tortoiseshell cat-eye sunglasses finished with signature gold arrow temple accents and warm gradient lenses.",
    features: ["Havana Acetate Frame", "Gold Temple Accents", "Brown Gradient Lenses", "UV400 Protection"],
    inStock: true
  },
  {
    id: "9",
    name: "ROUND VINTAGE AMBER",
    price: 209,
    image: "/images/products/glasses-9.jpeg",
    hoverImage: "/images/products/wearing-9.jpeg",
    category: "Sunglasses",
    description: "Retro round gold wire frame with soft amber-tinted lenses and classic tortoiseshell ear tips.",
    features: ["Titanium Wire Frame", "Amber Tinted Lenses", "Tortoiseshell Tips", "100% UV Protection"],
    inStock: false
  },
  {
    id: "10",
    name: "ROUND WIRE OPTICAL",
    price: 219,
    image: "/images/products/glasses-10.jpeg",
    hoverImage: "/images/products/wearing-10.jpeg",
    category: "Optical",
    description: "Refined round gold optical frame with finely engraved double-bridge detailing and crystal temple tips.",
    features: ["Engraved Gold Metal", "Double Bridge", "Prescription Ready", "Featherweight Comfort"],
    inStock: true
  },
  {
    id: "11",
    name: "MODERN CRYSTAL SQUARE",
    price: 235,
    image: "/images/products/glasses-11.jpeg",
    hoverImage: "/images/products/wearing-11.jpeg",
    category: "Sunglasses",
    description: "Contemporary oversized square frame in crystal-clear acetate paired with smoky grey gradient lenses.",
    features: ["Crystal Acetate Frame", "Smoky Gradient Lenses", "Exposed Wire Core", "UV400 Protection"],
    inStock: true
  },
  {
    id: "12",
    name: "OVERSIZED TORTOISE GLAM",
    price: 249,
    image: "/images/products/glasses-12.jpeg",
    hoverImage: "/images/products/wearing-12.jpeg",
    category: "Sunglasses",
    description: "Statement oversized square tortoiseshell sunglasses with dark gradient lenses and signature gold hinge hardware.",
    features: ["Oversized Square Fit", "Premium Tortoise Acetate", "Gradient UV400 Lenses", "Luxury Case Included"],
    inStock: true
  },
  {
    id: "13",
    name: "SPORT WRAP PRO",
    price: 189,
    image: "/images/products/glasses-13.jpeg",
    hoverImage: "/images/products/wearing-13.jpeg",
    category: "Sunglasses",
    description: "High-performance matte navy wraparound frame engineered with fiery red-orange mirrored polarized lenses.",
    features: ["Impact-Resistant Frame", "Mirrored Polarized Lenses", "Aerodynamic Temple Vents", "Non-Slip Grip"],
    inStock: false
  }
];

// Curated collections used by footer/shop links
export const newCollectionIds = ["8", "9", "10", "11", "12", "13"];
export const bestSellerIds = ["1", "2", "5", "6", "12"];
