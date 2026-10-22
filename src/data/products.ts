/*
=========================================================
PRODUCT MANAGEMENT GUIDE
=========================================================

ADD PRODUCT:
Add a new Product object to the products array below.

UPDATE PRODUCT:
Find the product by its unique ID and edit its fields.

REMOVE PRODUCT:
Delete the product object from the array.

FEATURED PRODUCT:
Set featured: true or featured: false.

HIDE PRODUCT:
Set active: false to hide the product from public listings.

IMAGE:
Place local images in public/images/ and reference them
using paths such as /images/headphones.jpg.

IMPORTANT:
Keep IDs unique and use valid image paths.
All public product sections must use the shared product source.
=========================================================
*/

import { Product } from "@/types/product";

export const initialProducts: Product[] = [
  {
    id: "prod-001",
    name: "Apex Pro Wireless Noise-Cancelling Headphones",
    slug: "apex-pro-wireless-headphones",
    description: "Enterprise-grade wireless audio featuring dual 40mm neodymium drivers, active hybrid noise cancellation, and up to 40 hours of continuous battery life. Perfect for focus in busy workplaces.",
    price: 249.99,
    originalPrice: 299.99,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    rating: 4.8,
    reviewCount: 142,
    stock: 24,
    featured: true,
    active: true,
  },
  {
    id: "prod-002",
    name: "Tactile Precision Mechanical Keyboard",
    slug: "tactile-precision-mechanical-keyboard",
    description: "Engineered for maximum typing productivity with hot-swappable tactile switches, sound-dampening acoustic foam, and premium PBT doubleshot keycaps. Multi-device Bluetooth 5.2 and USB-C connectivity.",
    price: 139.50,
    originalPrice: 169.00,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
    rating: 4.9,
    reviewCount: 98,
    stock: 18,
    featured: true,
    active: true,
  },
  {
    id: "prod-003",
    name: "ErgoFlow Executive Lumbar Chair",
    slug: "ergoflow-executive-lumbar-chair",
    description: "Designed for all-day posture optimization. Features dynamic 4D armrests, breathable Korean mesh back, and an adjustable synchronized recline mechanism supporting up to 350 lbs.",
    price: 489.00,
    originalPrice: 599.00,
    category: "Office & Workspace",
    image: "https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=800&q=80",
    rating: 4.7,
    reviewCount: 86,
    stock: 9,
    featured: true,
    active: true,
  },
  {
    id: "prod-004",
    name: "Chronos Executive Smart Connected Watch",
    slug: "chronos-executive-smartwatch",
    description: "Aerospace-grade titanium bezel with sapphire crystal glass. Integrates business calendar alerts, heart rate tracking, oxygen saturation telemetry, and 14-day extended battery endurance.",
    price: 329.00,
    originalPrice: 379.00,
    category: "Smart Living",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    rating: 4.6,
    reviewCount: 64,
    stock: 15,
    featured: true,
    active: true,
  },
  {
    id: "prod-005",
    name: "Lumina Architectural LED Desk Lamp",
    slug: "lumina-architectural-led-desk-lamp",
    description: "Color-temperature adjustable task lighting with 95+ CRI for true-to-life color precision. Built-in 15W Qi wireless base charger and smooth touch dimming slider.",
    price: 89.99,
    originalPrice: 109.99,
    category: "Office & Workspace",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
    rating: 4.5,
    reviewCount: 41,
    stock: 30,
    featured: false,
    active: true,
  },
  {
    id: "prod-006",
    name: "Aura True Wireless Active Earbuds",
    slug: "aura-true-wireless-active-earbuds",
    description: "Ultra-compact form factor with crystal clear 6-mic beamforming noise suppression for conference calls. IPX5 water resistance and wireless charging cradle.",
    price: 119.00,
    originalPrice: 149.00,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
    rating: 4.6,
    reviewCount: 112,
    stock: 22,
    featured: false,
    active: true,
  },
  {
    id: "prod-007",
    name: "UltraView 34-Inch Curved IPS Monitor",
    slug: "ultraview-34-curved-ips-monitor",
    description: "3440 x 1440 WQHD panoramic screen with 99% sRGB color gamut and USB-C 90W single-cable power delivery. Streamline multitasking across spreadsheets, design, and analytics.",
    price: 649.99,
    originalPrice: 749.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    rating: 4.9,
    reviewCount: 53,
    stock: 7,
    featured: true,
    active: true,
  },
  {
    id: "prod-008",
    name: "Artisan Full-Grain Leather Tech Folio",
    slug: "artisan-leather-tech-folio",
    description: "Handcrafted from top-tier vegetable-tanned leather. Fits up to 16-inch laptops with dedicated slots for tablet, passport, business cards, charging cables, and stylus.",
    price: 95.00,
    originalPrice: 120.00,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    rating: 4.8,
    reviewCount: 77,
    stock: 14,
    featured: false,
    active: true,
  },
  {
    id: "prod-009",
    name: "OmniVoice 360 Conference Speakerphone",
    slug: "omnivoice-360-conference-speakerphone",
    description: "Omnidirectional microphone array with AI acoustic echo cancellation. Seamlessly connects via Bluetooth or USB for boardrooms, huddle spaces, and remote executive desks.",
    price: 179.99,
    originalPrice: 219.99,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    rating: 4.7,
    reviewCount: 35,
    stock: 12,
    featured: false,
    active: true,
  },
  {
    id: "prod-010",
    name: "Magna3-in-1 Fast Charging Station",
    slug: "magna-3-in-1-fast-charging-station",
    description: "Weighted matte aluminum architecture capable of simultaneous rapid charging for smartphone, smartwatch, and wireless earbuds. Declutters any executive desk surface.",
    price: 79.99,
    originalPrice: 99.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1622445268045-3f05625201dd?w=800&q=80",
    rating: 4.6,
    reviewCount: 93,
    stock: 28,
    featured: true,
    active: true,
  },
  {
    id: "prod-011",
    name: "AeroRise Motorized Height-Adjustable Desk",
    slug: "aerorise-motorized-height-adjustable-desk",
    description: "Dual whisper-quiet motors with anti-collision sensors, digital memory presets, and solid bamboo surface (60 x 30 in). Transition smoothly from sit to stand.",
    price: 529.00,
    originalPrice: 620.00,
    category: "Office & Workspace",
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&q=80",
    rating: 4.8,
    reviewCount: 61,
    stock: 0,
    featured: false,
    active: true,
  },
  {
    id: "prod-012",
    name: "PureBreeze HEPA Pro Air Purifier",
    slug: "purebreeze-hepa-pro-air-purifier",
    description: "Medical-grade H13 HEPA filtration system captures 99.97% of airborne particles down to 0.1 microns. Whisper-quiet night mode and real-time PM2.5 laser display.",
    price: 199.99,
    originalPrice: 239.99,
    category: "Smart Living",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80",
    rating: 4.7,
    reviewCount: 49,
    stock: 11,
    featured: false,
    active: true,
  },
];
