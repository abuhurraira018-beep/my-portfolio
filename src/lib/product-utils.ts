import { Product, ProductFilters, SortOption } from "@/types/product";

/**
 * Filter an array of products based on comprehensive criteria:
 * search query, category, price range, stock status, and minimum rating.
 * Only returns active products for public listings.
 */
export function filterProducts(
  products: Product[],
  filters: ProductFilters,
  includeInactive: boolean = false
): Product[] {
  return products.filter((product) => {
    // Check active status
    if (!includeInactive && !product.active) {
      return false;
    }

    // Category filter
    if (
      filters.category &&
      filters.category !== "all" &&
      product.category.toLowerCase() !== filters.category.toLowerCase()
    ) {
      return false;
    }

    // Search query filter (matches name, description, category)
    if (filters.searchQuery && filters.searchQuery.trim() !== "") {
      const q = filters.searchQuery.toLowerCase().trim();
      const nameMatch = product.name.toLowerCase().includes(q);
      const descMatch = product.description.toLowerCase().includes(q);
      const catMatch = product.category.toLowerCase().includes(q);
      if (!nameMatch && !descMatch && !catMatch) {
        return false;
      }
    }

    // Price range filter
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }

    // In-stock only filter
    if (filters.inStockOnly && product.stock <= 0) {
      return false;
    }

    // Minimum rating filter
    if (filters.minRating > 0 && product.rating < filters.minRating) {
      return false;
    }

    return true;
  });
}

/**
 * Sort products according to the chosen SortOption.
 */
export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-high":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "featured":
    default:
      // Featured products first, then highest rating
      return sorted.sort((a, b) => {
        if (a.featured === b.featured) {
          return b.rating - a.rating;
        }
        return a.featured ? -1 : 1;
      });
  }
}

/**
 * Derived count of active products for a specific category name or slug.
 */
export function getCategoryProductCount(
  products: Product[],
  categoryNameOrSlug: string
): number {
  if (categoryNameOrSlug === "all") {
    return products.filter((p) => p.active).length;
  }
  return products.filter(
    (p) =>
      p.active &&
      (p.category.toLowerCase() === categoryNameOrSlug.toLowerCase() ||
        p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categoryNameOrSlug.toLowerCase())
  ).length;
}

/**
 * Find an active product by slug.
 */
export function getProductBySlug(
  products: Product[],
  slug: string
): Product | undefined {
  return products.find((p) => p.slug === slug && p.active);
}

/**
 * Get related products from the same category (excluding current product).
 */
export function getRelatedProducts(
  products: Product[],
  currentProductId: string,
  category: string,
  limit: number = 4
): Product[] {
  return products
    .filter((p) => p.active && p.id !== currentProductId && p.category === category)
    .slice(0, limit);
}

/**
 * Compute the discount percentage badge if originalPrice is present and greater than price.
 */
export function calculateDiscountPercentage(
  price: number,
  originalPrice?: number
): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  const pct = Math.round(((originalPrice - price) / originalPrice) * 100);
  return pct > 0 ? pct : null;
}
