"use client";

import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function WishlistPage() {
  const { wishlist, products, isHydrated } = useShop();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (!isHydrated) {
    return (
      <div className="py-5 text-center" style={{ minHeight: "60vh" }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="py-5" style={{ backgroundColor: "#f8fafc", minHeight: "80vh" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small text-muted">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none text-muted">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              Saved Wishlist
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h2 fw-bold text-dark mb-1">Saved Products & Hardware</h1>
            <p className="text-muted small mb-0">
              Items you have marked for future procurement or team review.
            </p>
          </div>
          {wishlistProducts.length > 0 && (
            <span className="badge bg-white text-dark border px-3 py-2 rounded-pill small">
              {wishlistProducts.length} saved {wishlistProducts.length === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="card border-0 shadow-sm p-5 text-center bg-white rounded-4 my-4">
            <div
              className="mx-auto rounded-circle bg-light d-flex align-items-center justify-content-center text-muted mb-4"
              style={{ width: "80px", height: "80px" }}
            >
              <i className="bi bi-heart fs-1 text-danger" />
            </div>
            <h2 className="h4 fw-bold text-dark mb-2">Your Wishlist is Empty</h2>
            <p className="text-muted small mb-4" style={{ maxWidth: "440px", margin: "0 auto" }}>
              Explore our executive catalog and click the heart icon on any product to save it here for later.
            </p>
            <div>
              <Link href="/products" className="btn btn-primary-custom px-4 py-2.5">
                <i className="bi bi-arrow-left me-2" />
                Browse Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
