"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { categories } from "@/data/categories";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/products/ProductCard";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { products } = useShop();

  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // Filter products matching this category
  const categoryProducts = useMemo(() => {
    return products.filter(
      (p) => p.active && p.category.toLowerCase() === category.name.toLowerCase()
    );
  }, [products, category]);

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
            <li className="breadcrumb-item">
              <Link href="/products" className="text-decoration-none text-muted">
                Categories
              </Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Category Header Banner */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5 bg-white">
          <div className="row g-0 align-items-center">
            <div className="col-lg-7 p-4 p-md-5">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-primary bg-opacity-10 text-primary mb-3">
                <i className={`bi ${category.icon}`} />
                <span className="small fw-bold text-uppercase" style={{ letterSpacing: "0.06em" }}>
                  Product Category
                </span>
              </div>
              <h1 className="h2 fw-bold text-dark mb-3">{category.name}</h1>
              <p className="lead text-muted fs-6 mb-4" style={{ lineHeight: "1.75" }}>
                {category.description}
              </p>
              <div className="d-flex align-items-center gap-3">
                <span className="badge bg-light text-dark border px-3 py-2 fs-6 rounded-pill">
                  <strong>{categoryProducts.length}</strong> available items
                </span>
                <Link href="/products" className="btn btn-outline-custom btn-sm">
                  <i className="bi bi-funnel me-1" /> All Products
                </Link>
              </div>
            </div>
            <div className="col-lg-5 position-relative" style={{ minHeight: "260px" }}>
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 992px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* Category Products Grid */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="h4 fw-bold text-dark m-0">
            {category.name} Catalog
          </h2>
          <span className="text-muted small">
            Displaying {categoryProducts.length} items
          </span>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="card border-0 shadow-sm p-5 text-center bg-white rounded-4">
            <p className="text-muted mb-3">No products currently active in this category.</p>
            <div>
              <Link href="/products" className="btn btn-primary-custom">
                Browse Full Catalog
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {categoryProducts.map((product) => (
              <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Other Categories Nav */}
        <div className="mt-5 pt-4 border-top">
          <h3 className="h6 fw-bold text-muted text-uppercase mb-3" style={{ letterSpacing: "0.06em" }}>
            Explore Other Categories
          </h3>
          <div className="d-flex flex-wrap gap-2">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/categories/${c.slug}`}
                  className="btn btn-sm btn-light border rounded-pill px-3 py-1.5 text-dark fw-medium"
                >
                  <i className={`bi ${c.icon} me-1.5 text-primary`} />
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
