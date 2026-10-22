"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductSidebar } from "@/components/products/ProductSidebar";
import { ProductSearch } from "@/components/products/ProductSearch";
import { ProductFilters, SortOption } from "@/types/product";
import { filterProducts, sortProducts } from "@/lib/product-utils";

function ProductsContent() {
  const searchParams = useSearchParams();
  const { products, isHydrated } = useShop();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [filters, setFilters] = useState<ProductFilters>({
    searchQuery: initialSearch,
    category: initialCategory,
    minPrice: 0,
    maxPrice: 1000,
    inStockOnly: false,
    minRating: 0,
    sortBy: "featured",
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // Sync search param changes if URL updates
  useEffect(() => {
    const urlQuery = searchParams.get("search");
    const urlCat = searchParams.get("category");
    if (urlQuery !== null && urlQuery !== filters.searchQuery) {
      setFilters((prev) => ({ ...prev, searchQuery: urlQuery }));
    }
    if (urlCat !== null && urlCat !== filters.category) {
      setFilters((prev) => ({ ...prev, category: urlCat }));
    }
  }, [searchParams]);

  const handleFilterChange = (updated: Partial<ProductFilters>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setVisibleCount(8); // Reset page slice on filter change
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      category: "all",
      minPrice: 0,
      maxPrice: 1000,
      inStockOnly: false,
      minRating: 0,
      sortBy: "featured",
    });
    setVisibleCount(8);
  };

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(products, filters, false);
    return sortProducts(filtered, filters.sortBy);
  }, [products, filters]);

  const visibleProducts = filteredAndSortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedProducts.length;

  return (
    <div className="py-5" style={{ backgroundColor: "#f8fafc", minHeight: "80vh" }}>
      <div className="container">
        {/* Page Title & Breadcrumb */}
        <div className="mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb small text-muted mb-2">
              <li className="breadcrumb-item">
                <a href="/" className="text-decoration-none text-muted">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
                Product Catalog
              </li>
            </ol>
          </nav>
          <h1 className="h2 fw-bold text-dark mb-1">Commercial Product Catalog</h1>
          <p className="text-muted small mb-0">
            Engineered hardware, ergonomic furniture, and precision accessories for modern business teams.
          </p>
        </div>

        {/* Search & Sort Control Bar */}
        <ProductSearch
          searchQuery={filters.searchQuery}
          onSearchChange={(query) => handleFilterChange({ searchQuery: query })}
          sortBy={filters.sortBy}
          onSortChange={(sort: SortOption) => handleFilterChange({ sortBy: sort })}
          totalFiltered={filteredAndSortedProducts.length}
          onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
        />

        {/* Active Filter Badges */}
        {(filters.searchQuery ||
          filters.category !== "all" ||
          filters.inStockOnly ||
          filters.minRating > 0 ||
          filters.maxPrice < 1000) && (
          <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
            <span className="small text-muted fw-semibold">Active filters:</span>
            {filters.category !== "all" && (
              <span className="badge bg-light text-dark border px-2.5 py-1.5 d-inline-flex align-items-center gap-1.5 rounded-pill">
                Category: {filters.category}
                <button
                  type="button"
                  className="btn-close btn-close-sm"
                  style={{ fontSize: "0.55rem" }}
                  onClick={() => handleFilterChange({ category: "all" })}
                  aria-label="Remove category filter"
                />
              </span>
            )}
            {filters.searchQuery && (
              <span className="badge bg-light text-dark border px-2.5 py-1.5 d-inline-flex align-items-center gap-1.5 rounded-pill">
                Keyword: &quot;{filters.searchQuery}&quot;
                <button
                  type="button"
                  className="btn-close btn-close-sm"
                  style={{ fontSize: "0.55rem" }}
                  onClick={() => handleFilterChange({ searchQuery: "" })}
                  aria-label="Remove search filter"
                />
              </span>
            )}
            {filters.maxPrice < 1000 && (
              <span className="badge bg-light text-dark border px-2.5 py-1.5 d-inline-flex align-items-center gap-1.5 rounded-pill">
                Max ${filters.maxPrice}
                <button
                  type="button"
                  className="btn-close btn-close-sm"
                  style={{ fontSize: "0.55rem" }}
                  onClick={() => handleFilterChange({ maxPrice: 1000 })}
                  aria-label="Reset max price"
                />
              </span>
            )}
            {filters.inStockOnly && (
              <span className="badge bg-light text-dark border px-2.5 py-1.5 d-inline-flex align-items-center gap-1.5 rounded-pill">
                In Stock Only
                <button
                  type="button"
                  className="btn-close btn-close-sm"
                  style={{ fontSize: "0.55rem" }}
                  onClick={() => handleFilterChange({ inStockOnly: false })}
                  aria-label="Remove in stock filter"
                />
              </span>
            )}
            {filters.minRating > 0 && (
              <span className="badge bg-light text-dark border px-2.5 py-1.5 d-inline-flex align-items-center gap-1.5 rounded-pill">
                {filters.minRating}+ Stars
                <button
                  type="button"
                  className="btn-close btn-close-sm"
                  style={{ fontSize: "0.55rem" }}
                  onClick={() => handleFilterChange({ minRating: 0 })}
                  aria-label="Remove rating filter"
                />
              </span>
            )}
            <button
              type="button"
              className="btn btn-link btn-sm text-primary p-0 text-decoration-none fw-semibold ms-1"
              style={{ fontSize: "0.8125rem" }}
              onClick={handleResetFilters}
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout (Sidebar + Products Grid) */}
        <div className="row g-4">
          {/* Desktop Left Sidebar */}
          <div className="col-lg-3">
            <ProductSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              products={products}
              isOpenMobile={isMobileFiltersOpen}
              onCloseMobile={() => setIsMobileFiltersOpen(false)}
            />
          </div>

          {/* Product Grid Area */}
          <div className="col-lg-9">
            {!isHydrated ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading catalog...</span>
                </div>
              </div>
            ) : filteredAndSortedProducts.length === 0 ? (
              <div className="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
                <div className="mx-auto text-muted mb-3">
                  <i className="bi bi-search fs-1" />
                </div>
                <h3 className="h5 fw-bold text-dark mb-2">No Products Match Your Criteria</h3>
                <p className="text-muted small mb-4" style={{ maxWidth: "420px", margin: "0 auto" }}>
                  Try relaxing your search terms, broadening the price range, or clearing active filters to browse the entire Nexora catalog.
                </p>
                <div>
                  <button type="button" className="btn btn-primary-custom" onClick={handleResetFilters}>
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="row g-4">
                  {visibleProducts.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-xl-4">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center mt-5">
                    <button
                      type="button"
                      className="btn btn-outline-custom px-4 py-2.5 fw-semibold"
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                    >
                      <i className="bi bi-arrow-clockwise me-2" />
                      Load More Products ({filteredAndSortedProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
