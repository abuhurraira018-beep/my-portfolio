# NEXORA — Business & Commerce

A premium, enterprise-grade commercial website and product catalog built with **Next.js (App Router)**, **React**, **TypeScript**, **Bootstrap 5**, and **Bootstrap Icons**.

Designed as a flagship portfolio project demonstrating commercial front-end development, responsive layouts, centralized data management, reactive cart & wishlist management, and a browser-based product administration portal.

---

## 🌟 Key Features

- **Executive Commercial Aesthetic**: Built with a corporate palette (Navy `#101828`, Accent Blue `#2563EB`, Canvas `#F8FAFC`), crisp typography, polished cards, and subtle hover interactions.
- **Next.js App Router Architecture**: Clean route separation with server layouts and client components scoped only where state or browser APIs are required (`"use client"`).
- **Centralized Data Management**: Single source of truth for products (`src/data/products.ts`) with derived category counts and zero data duplication.
- **Enterprise Gateway & Authentication Barrier**:
  - **Portal Selection (`/portal`)**: Pre-login gateway offering 3 distinct commercial tiers:
    1. *Corporate & Enterprise B2B* (Net-30 invoicing, fleet logistics, procurement officer accounts)
    2. *Individual & Professional Studio* (Direct checkout, studio member setup)
    3. *Evaluator Quick Pass* (One-click instant login pre-filled with demo credentials for employers and recruiters)
  - **Commercial Login (`/login`)**: Account type switcher, email & password authentication, auto-fill demo credentials helper, and "Remember this workstation" state.
  - **Account Registration (`/register`)**: Organization onboarding with company name, account tier selection, and instant session start.
  - **Route Guard (`AuthGuard`)**: Users not logged in are restricted to the Home page (`/`), Portal (`/portal`), and Auth forms. Any attempt to browse products, categories, cart, wishlist, admin, or contact redirects smoothly to the portal gateway.
- **Product Catalog & Dynamic Filtering**:
  - Live text search across titles, descriptions, and categories.
  - Multi-category filtering with dynamic item counts.
  - Interactive price range slider ($50 – $1,000).
  - In-stock availability toggle & minimum star rating filters.
  - Sorting (Featured, Price: Low to High, Price: High to Low, Highest Rated, Alphabetical).
  - Desktop sticky sidebar + mobile offcanvas drawer.
- **Product Details (`/products/[slug]`)**:
  - High-res product imagery with discount & featured badges.
  - Real-time stock status indicator with low-stock warnings.
  - Quantity selector with max-stock capping.
  - Add to Cart with floating toast notifications.
  - Wishlist toggle.
  - Category-matched related hardware recommendations.
- **Full Shopping Cart (`/cart`)**:
  - Quantity increment/decrement bounded by available stock.
  - Item removal and cart clearing.
  - Subtotal, promotional discount calculation (e.g. `NEXORA10` for 10% off, `WELCOME20` for 20% off).
  - Dynamic free shipping progress bar ($150 threshold).
  - Itemized commercial sales tax (8%).
  - Simulated commercial checkout modal with order reference generation.
- **Wishlist (`/wishlist`)**: Save items across browsing sessions with count badges in the navigation.
- **Admin Product Dashboard (`/admin/products`)**:
  - Real-time KPI counters (Total Products, Active, Out of Stock, Featured).
  - Filterable & searchable product data table.
  - Add Product & Edit Product modals with validation.
  - Safe deletion with confirmation dialog.
  - LocalStorage overlay synchronization with a "Reset Defaults" fallback.
- **Corporate Pages**:
  - **About Us (`/about`)**: Company story, mission, core values, and corporate commitments.
  - **Services (`/services`)**: Product consultation, customer support, fleet logistics, and turnkey enterprise packages.
  - **Contact (`/contact`)**: Validated contact form, corporate coordinates, and interactive commercial FAQ.
  - **Category Pages (`/categories/[slug]`)**: Dedicated category portals with header banners.
  - **Custom 404 Page (`/not-found`)**: Branded fallback with quick return links.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 14+** | App Router, SSR layout, static route optimization |
| **React 18** | Reusable UI components & custom hooks |
| **TypeScript** | Strict type definitions for products, categories, filters, and carts |
| **Bootstrap 5** | Grid layout, responsive utilities, modals, offcanvas drawers |
| **Bootstrap Icons** | Scalable commercial vector iconography |
| **CSS Modules & Custom Tokens** | Fine-grained spacing, shadows, radii, and transitions |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx                # Root layout (Announcement, Navbar, Footer, Toast)
│   ├── page.tsx                  # Homepage assembling all homepage sections
│   ├── globals.css               # Design tokens, Bootstrap imports, utility styling
│   ├── not-found.tsx             # Branded 404 handler
│   ├── products/
│   │   ├── page.tsx              # Main catalog with search & sidebar filters
│   │   └── [slug]/page.tsx       # Dynamic product detail page
│   ├── categories/
│   │   └── [slug]/page.tsx       # Dynamic category catalog page
│   ├── cart/page.tsx             # Shopping cart & simulated checkout modal
│   ├── wishlist/page.tsx         # Saved products page
│   ├── about/page.tsx            # Corporate mission & values page
│   ├── services/page.tsx         # Enterprise solutions & process page
│   ├── contact/page.tsx          # Contact form & commercial FAQ page
│   └── admin/
│       └── products/page.tsx     # Admin product management dashboard
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx   # Top banner from site-config
│   │   ├── Navbar.tsx            # Sticky responsive nav with search & badges
│   │   ├── Footer.tsx            # Columns, links, categories, dynamic year
│   │   ├── BootstrapClient.tsx   # Dynamic client Bootstrap JS loader
│   │   └── ToastContainer.tsx    # Floating notification system
│   ├── home/
│   │   ├── HeroSection.tsx       # Hero with CTAs and trust indicators
│   │   ├── BenefitsSection.tsx   # 4 commercial benefit cards
│   │   ├── CategoriesSection.tsx # Dynamic category cards with live counts
│   │   ├── FeaturedProducts.tsx  # Featured product showcase
│   │   ├── AboutSection.tsx      # Homepage story preview
│   │   ├── ServicesSection.tsx   # Homepage service highlights
│   │   ├── WhyChooseUsSection.tsx# Commercial advantages grid
│   │   ├── TestimonialsSection.tsx# Labeled demo client experiences
│   │   └── NewsletterSection.tsx # Validated briefing subscription
│   └── products/
│       ├── ProductCard.tsx       # Reusable product card
│       ├── ProductSidebar.tsx    # Desktop sidebar & mobile offcanvas filter
│       └── ProductSearch.tsx     # Query input & sort dropdown bar
├── context/
│   └── ShopContext.tsx           # Cart, Wishlist, Products & Toast provider
├── data/
│   ├── site-config.ts            # Central branding, contact, shipping settings
│   ├── products.ts               # Central product records with developer header
│   ├── categories.ts             # Central category definitions
│   └── testimonials.ts           # Demo customer testimonials
├── lib/
│   ├── format-currency.ts        # Central currency formatting utility
│   └── product-utils.ts          # Search, filter, sort & metric helpers
└── types/
    ├── product.ts                # TypeScript models for products & filters
    └── category.ts               # TypeScript models for categories
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18.x` or higher
- npm or yarn

### Installation

1. Clone or extract the project repository.
2. Navigate to the project root directory:
   ```bash
   cd "nexora-business-commerce"
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Product Management Guide

The central source of truth for products is located in:
`src/data/products.ts`

### 1. Add a Product
Add a new `Product` object to the `initialProducts` array in `src/data/products.ts`:
```typescript
{
  id: "prod-013",
  name: "Nexora Studio Acoustic Desk Divider",
  slug: "nexora-studio-acoustic-desk-divider",
  description: "Sound-absorbing PET felt desk clamp partition.",
  price: 119.00,
  originalPrice: 149.00,
  category: "Office & Workspace",
  image: "https://images.unsplash.com/...",
  rating: 4.8,
  reviewCount: 19,
  stock: 25,
  featured: true,
  active: true,
}
```
*Note: The product will automatically appear across the homepage, catalog, category counts, and search results.*

### 2. Update a Product
Find the product by its unique `id` or `slug` in `src/data/products.ts` and modify any field (e.g., adjust `price`, `stock`, or `featured`).

### 3. Remove a Product
Delete the product object from the `initialProducts` array in `src/data/products.ts`. It will instantly be removed from all derived counts and catalog views.

### 4. Admin Portal (`/admin/products`)
For interactive demonstration in the browser:
- Visit `/admin/products`.
- Use the **Add New Product** modal to test client-side additions.
- Click **Edit** to adjust stock levels or prices.
- Click **Delete** to remove a product with confirmation.
- Click **Reset Defaults** at any time to restore the initial catalog.

---

## 🚢 Production Build & Deployment

### Build Verification
To compile an optimized production build:
```bash
npm run build
```

To start the production server:
```bash
npm run start
```

### Deploying to Vercel
1. Initialize a git repository if not already done:
   ```bash
   git init
   git add .
   git commit -m "feat: complete NEXORA business & commerce website"
   ```
2. Push the repository to GitHub:
   ```bash
   git remote add origin https://github.com/your-username/nexora-commerce.git
   git branch -M main
   git push -u origin main
   ```
3. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
4. Import your GitHub repository.
5. Vercel automatically detects Next.js. Leave default build settings (`npm run build`).
6. Click **Deploy**.

---

## 📄 License
This project is released under the MIT License.
