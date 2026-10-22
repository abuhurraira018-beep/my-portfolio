"use client";

import React from "react";
import { SortOption } from "@/types/product";

interface ProductSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalFiltered: number;
  onOpenMobileFilters?: () => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalFiltered,
  onOpenMobileFilters,
}) => {
  return (
    <div className="card border-0 shadow-sm p-3 mb-4 rounded-3 bg-white">
      <div className="row g-2 align-items-center">
        {/* Search Input */}
        <div className="col-12 col-md-5">
          <div className="input-group">
            <span className="input-group-text bg-light border-0 text-muted">
              <i className="bi bi-search" />
            </span>
            <input
              type="text"
              className="form-control bg-light border-0"
              placeholder="Search by product name, category, or keyword..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search catalog"
            />
            {searchQuery && (
              <button
                className="btn btn-light border-0 text-muted"
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                <i className="bi bi-x-circle" />
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="col-6 col-md-3 text-start text-md-center">
          <span className="small text-muted fw-medium">
            Showing <strong className="text-dark">{totalFiltered}</strong> products
          </span>
        </div>

        {/* Sort Dropdown & Mobile Filter Button */}
        <div className="col-6 col-md-4 d-flex justify-content-end align-items-center gap-2">
          {onOpenMobileFilters && (
            <button
              type="button"
              className="btn btn-sm btn-outline-custom d-lg-none d-inline-flex align-items-center gap-1.5"
              onClick={onOpenMobileFilters}
            >
              <i className="bi bi-funnel" />
              <span>Filters</span>
            </button>
          )}

          <div className="d-flex align-items-center gap-1.5 flex-grow-1 flex-md-grow-0">
            <label htmlFor="sortSelect" className="visually-hidden">
              Sort by
            </label>
            <select
              id="sortSelect"
              className="form-select form-select-sm bg-light border-0 fw-medium text-dark"
              style={{ minWidth: "160px" }}
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name-asc">Alphabetical (A-Z)</option>
              <option value="name-desc">Alphabetical (Z-A)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
