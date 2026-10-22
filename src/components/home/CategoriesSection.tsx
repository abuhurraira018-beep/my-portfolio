"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/context/AuthContext";
import { getCategoryProductCount } from "@/lib/product-utils";

export const CategoriesSection: React.FC = () => {
  const { products } = useShop();
  const { isAuthenticated } = useAuth();

  return (
    <section id="categories" className="py-5 py-lg-6" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 mb-lg-5">
          <div>
            <span className="section-tag">Catalog Directory</span>
            <h2 className="section-title h2 mb-2">Explore by Category</h2>
            <p className="section-desc mb-0">
              Browse our commercial lines tailored for modern offices, executive suites, and tech teams.
            </p>
          </div>
          <div className="mt-3 mt-md-0">
            <Link
              href={isAuthenticated ? "/products" : "/portal?redirect=/products"}
              className="btn btn-outline-custom d-inline-flex align-items-center gap-2 fw-semibold"
            >
              <span>View All Products</span>
              <i className="bi bi-arrow-right" />
            </Link>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="row g-4">
          {categories.map((category) => {
            const count = getCategoryProductCount(products, category.name);
            const targetHref = isAuthenticated
              ? `/categories/${category.slug}`
              : `/portal?redirect=${encodeURIComponent(`/categories/${category.slug}`)}`;

            return (
              <div key={category.id} className="col-12 col-sm-6 col-lg-4 col-xl">
                <Link
                  href={targetHref}
                  className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden text-decoration-none nexora-card group"
                >
                  <div className="position-relative" style={{ height: "180px", width: "100%" }}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background: "linear-gradient(to top, rgba(16, 24, 40, 0.85) 0%, rgba(16, 24, 40, 0.2) 100%)",
                      }}
                    />
                    <div className="position-absolute bottom-0 start-0 p-3 w-100 text-white">
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <i className={`bi ${category.icon} text-primary fs-5`} />
                          <h3 className="h6 fw-bold m-0 text-white">{category.name}</h3>
                        </div>
                        <span className="badge bg-white bg-opacity-25 text-white fw-medium small">
                          {count} {count === 1 ? "item" : "items"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
