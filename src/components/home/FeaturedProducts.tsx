"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/context/AuthContext";
import { ProductCard } from "@/components/products/ProductCard";

export const FeaturedProducts: React.FC = () => {
  const { products } = useShop();
  const { isAuthenticated } = useAuth();

  const featuredItems = products.filter((p) => p.featured && p.active).slice(0, 4);

  return (
    <section className="py-5 py-lg-6" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 mb-lg-5">
          <div>
            <span className="section-tag">Curated Highlights</span>
            <h2 className="section-title h2 mb-2">Featured Commercial Hardware</h2>
            <p className="section-desc mb-0">
              Handpicked executive instruments and workstation essentials backed by superior build quality.
            </p>
          </div>
          <div className="mt-3 mt-md-0">
            <Link
              href={isAuthenticated ? "/products" : "/portal?redirect=/products"}
              className="btn btn-outline-custom d-inline-flex align-items-center gap-2 fw-semibold"
            >
              <span>View Full Catalog</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="row g-4">
          {featuredItems.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
