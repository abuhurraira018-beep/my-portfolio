"use client";

import React from "react";
import { ProductFilters } from "@/types/product";
import { categories } from "@/data/categories";
import { Product } from "@/types/product";
import { getCategoryProductCount } from "@/lib/product-utils";
import { formatCurrency } from "@/lib/format-currency";

interface ProductSidebarProps {
  filters: ProductFilters;
  onFilterChange: (updated: Partial<ProductFilters>) => void;
  onResetFilters: () => void;
  products: Product[];
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const ProductSidebar: React.FC<ProductSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  products,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const sidebarContent = (
    <div className="d-flex flex-column gap-4">
      {/* Header & Reset Button */}
      <div className="d-flex justify-content-between align-items-center pb-2 border-bottom">
        <h5 className="fw-bold m-0 fs-6 text-dark d-flex align-items-center gap-2">
          <i className="bi bi-funnel text-primary" />
          Filter Products
        </h5>
        <button
          type="button"
          className="btn btn-sm text-primary p-0 border-0 fw-semibold"
          style={{ fontSize: "0.8125rem" }}
          onClick={onResetFilters}
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h6 className="fw-bold small text-uppercase text-muted mb-2.5" style={{ letterSpacing: "0.05em" }}>
          Categories
        </h6>
        <div className="d-flex flex-column gap-1.5">
          <button
            type="button"
            className={`btn btn-sm text-start d-flex justify-content-between align-items-center py-1.5 px-2 rounded-2 border-0 ${
              filters.category === "all" ? "bg-primary text-white fw-semibold" : "text-dark bg-transparent hover-bg-light"
            }`}
            onClick={() => onFilterChange({ category: "all" })}
          >
            <span>All Categories</span>
            <span className={`badge ${filters.category === "all" ? "bg-white text-primary" : "bg-light text-muted"}`}>
              {getCategoryProductCount(products, "all")}
            </span>
          </button>

          {categories.map((cat) => {
            const count = getCategoryProductCount(products, cat.name);
            const isSelected = filters.category.toLowerCase() === cat.name.toLowerCase();

            return (
              <button
                key={cat.id}
                type="button"
                className={`btn btn-sm text-start d-flex justify-content-between align-items-center py-1.5 px-2 rounded-2 border-0 ${
                  isSelected ? "bg-primary text-white fw-semibold" : "text-dark bg-transparent hover-bg-light"
                }`}
                onClick={() => onFilterChange({ category: cat.name })}
              >
                <span>{cat.name}</span>
                <span className={`badge ${isSelected ? "bg-white text-primary" : "bg-light text-muted"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6 className="fw-bold small text-uppercase text-muted m-0" style={{ letterSpacing: "0.05em" }}>
            Max Price
          </h6>
          <span className="fw-bold text-primary small">{formatCurrency(filters.maxPrice)}</span>
        </div>
        <input
          type="range"
          className="form-range"
          min="50"
          max="1000"
          step="25"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
        />
        <div className="d-flex justify-content-between text-muted" style={{ fontSize: "0.75rem" }}>
          <span>$50</span>
          <span>$500</span>
          <span>$1,000</span>
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <h6 className="fw-bold small text-uppercase text-muted mb-2.5" style={{ letterSpacing: "0.05em" }}>
          Availability
        </h6>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="inStockSwitch"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
          />
          <label className="form-check-label small fw-medium text-dark" htmlFor="inStockSwitch">
            In Stock Only
          </label>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h6 className="fw-bold small text-uppercase text-muted mb-2.5" style={{ letterSpacing: "0.05em" }}>
          Minimum Rating
        </h6>
        <div className="d-flex flex-column gap-1.5">
          {[
            { label: "All Ratings", value: 0 },
            { label: "4.5 Stars & Above", value: 4.5 },
            { label: "4.0 Stars & Above", value: 4.0 },
          ].map((item) => (
            <div key={item.value} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="ratingRadio"
                id={`rating-${item.value}`}
                checked={filters.minRating === item.value}
                onChange={() => onFilterChange({ minRating: item.value })}
              />
              <label className="form-check-label small text-dark fw-medium" htmlFor={`rating-${item.value}`}>
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="d-none d-lg-block">
        <div className="card border-0 shadow-sm p-4 rounded-3 bg-white position-sticky" style={{ top: "85px" }}>
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Offcanvas Drawer */}
      <div
        className={`offcanvas offcanvas-start ${isOpenMobile ? "show" : ""}`}
        tabIndex={-1}
        id="mobileFilterDrawer"
        aria-labelledby="mobileFilterDrawerLabel"
        style={{ visibility: isOpenMobile ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fs-6 fw-bold" id="mobileFilterDrawerLabel">
            Filter Products
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            aria-label="Close"
            onClick={onCloseMobile}
          />
        </div>
        <div className="offcanvas-body p-4">{sidebarContent}</div>
        <div className="p-3 border-top bg-light">
          <button type="button" className="btn btn-primary-custom w-100" onClick={onCloseMobile}>
            Apply Filters
          </button>
        </div>
      </div>
      {isOpenMobile && (
        <div className="offcanvas-backdrop fade show" onClick={onCloseMobile} />
      )}
    </>
  );
};
