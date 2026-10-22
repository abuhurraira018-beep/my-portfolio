"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { notFound, useParams } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/lib/format-currency";
import { calculateDiscountPercentage, getRelatedProducts } from "@/lib/product-utils";
import { ProductCard } from "@/components/products/ProductCard";

const ProductViewer3D = dynamic(() => import("@/components/3d/ProductViewer3D"), {
  ssr: false,
  loading: () => (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-light rounded-4" style={{ minHeight: "440px" }}>
      <div className="spinner-border text-primary mb-2" role="status" />
      <span className="small text-muted fw-semibold">Loading 3D Hardware Inspector...</span>
    </div>
  ),
});

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeMediaTab, setActiveMediaTab] = useState<"photo" | "3d">("photo");

  // Find product by slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const isFavorite = isInWishlist(product.id);
  const discountPct = calculateDiscountPercentage(product.price, product.originalPrice);
  const isOutOfStock = product.stock <= 0;
  const relatedProducts = getRelatedProducts(products, product.id, product.category, 4);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => {
      const next = prev + delta;
      if (next < 1) return 1;
      if (next > product.stock) return product.stock;
      return next;
    });
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#f8fafc", minHeight: "85vh" }}>
      <div className="container">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb small text-muted">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none text-muted">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/products" className="text-decoration-none text-muted">
                Products
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="text-decoration-none text-muted"
              >
                {product.category}
              </Link>
            </li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Details Section Card */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden p-4 p-lg-5 bg-white mb-5">
          <div className="row g-5">
            {/* Product Media Column with 3D Inspector */}
            <div className="col-lg-6">
              {/* Media Mode Tabs */}
              <div className="d-flex justify-content-between align-items-center mb-2 px-1">
                <span className="small text-muted fw-semibold">
                  {activeMediaTab === "3d" ? "Interactive 3D Hardware Inspector" : "High-Resolution Product Photography"}
                </span>
                <div className="btn-group btn-group-sm bg-light rounded-pill p-1 border">
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
                      activeMediaTab === "photo" ? "btn-primary text-white" : "btn-light text-muted"
                    }`}
                    onClick={() => setActiveMediaTab("photo")}
                  >
                    <i className="bi bi-image me-1" />
                    Photography
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
                      activeMediaTab === "3d" ? "btn-primary text-white" : "btn-light text-muted"
                    }`}
                    onClick={() => setActiveMediaTab("3d")}
                  >
                    <i className="bi bi-box me-1" />
                    3D Inspector
                  </button>
                </div>
              </div>

              {/* Media Display Container */}
              <div className="position-relative rounded-4 overflow-hidden border border-subtle bg-light shadow-sm" style={{ height: "480px" }}>
                {activeMediaTab === "3d" ? (
                  <ProductViewer3D product={product} />
                ) : (
                  <>
                    <div className="position-relative w-100 h-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 992px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    {/* Badges on image */}
                    <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-1">
                      {product.featured && <span className="badge-featured">Featured Product</span>}
                      {discountPct && <span className="badge-discount">Save {discountPct}%</span>}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Product Info & Purchase Column */}
            <div className="col-lg-6 d-flex flex-column justify-content-between">
              <div>
                {/* Category & Stock */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-uppercase text-primary fw-bold small" style={{ letterSpacing: "0.08em" }}>
                    {product.category}
                  </span>
                  {isOutOfStock ? (
                    <span className="badge-outofstock">Out of Stock</span>
                  ) : product.stock < 10 ? (
                    <span className="badge-instock text-warning-emphasis bg-warning-subtle border-warning-subtle">
                      Low Stock: {product.stock} units remaining
                    </span>
                  ) : (
                    <span className="badge-instock">In Stock &bull; Ready to Dispatch</span>
                  )}
                </div>

                {/* Product Title */}
                <h1 className="h2 fw-bolder text-dark mb-3">{product.name}</h1>

                {/* Rating & Reviews */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="d-flex text-warning">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`bi ${star <= Math.round(product.rating) ? "bi-star-fill star-filled" : "bi-star star-empty"}`}
                      />
                    ))}
                  </div>
                  <span className="fw-bold text-dark">{product.rating.toFixed(1)}</span>
                  <span className="text-muted small">
                    &bull; {product.reviewCount} verified enterprise evaluations
                  </span>
                </div>

                {/* Price Display */}
                <div className="d-flex align-items-baseline gap-3 mb-4 pb-3 border-bottom">
                  <span className="display-6 fw-bold text-dark">{formatCurrency(product.price)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="fs-5 text-muted text-decoration-line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted mb-4" style={{ lineHeight: "1.8", fontSize: "1rem" }}>
                  {product.description}
                </p>

                {/* Enterprise Guarantee Highlights */}
                <div className="p-3 bg-light rounded-3 mb-4 small">
                  <div className="row g-2">
                    <div className="col-sm-6 d-flex align-items-center gap-2 text-dark">
                      <i className="bi bi-shield-check text-success" />
                      <span>3-Year Enterprise Warranty</span>
                    </div>
                    <div className="col-sm-6 d-flex align-items-center gap-2 text-dark">
                      <i className="bi bi-truck text-primary" />
                      <span>Fast Track Courier Dispatch</span>
                    </div>
                    <div className="col-sm-6 d-flex align-items-center gap-2 text-dark">
                      <i className="bi bi-arrow-return-left text-info" />
                      <span>30-Day Evaluation Returns</span>
                    </div>
                    <div className="col-sm-6 d-flex align-items-center gap-2 text-dark">
                      <i className="bi bi-receipt text-warning" />
                      <span>Itemized Commercial Invoicing</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Controls (Quantity, Add to Cart, Wishlist) */}
              <div className="pt-3 border-top">
                <div className="row g-3 align-items-center">
                  {/* Quantity Stepper */}
                  <div className="col-sm-4">
                    <label className="visually-hidden" htmlFor="qtySelect">
                      Quantity
                    </label>
                    <div className="input-group">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={quantity <= 1 || isOutOfStock}
                        onClick={() => handleQuantityChange(-1)}
                      >
                        <i className="bi bi-dash" />
                      </button>
                      <input
                        id="qtySelect"
                        type="text"
                        readOnly
                        className="form-control text-center fw-bold bg-white"
                        value={quantity}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={quantity >= product.stock || isOutOfStock}
                        onClick={() => handleQuantityChange(1)}
                      >
                        <i className="bi bi-plus" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="col-sm-6">
                    <button
                      type="button"
                      className="btn btn-primary-custom w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                      disabled={isOutOfStock}
                      onClick={() => addToCart(product, quantity)}
                    >
                      <i className="bi bi-bag-plus fs-5" />
                      <span className="fw-semibold">
                        {isOutOfStock ? "Currently Sold Out" : `Add to Cart (${quantity})`}
                      </span>
                    </button>
                  </div>

                  {/* Wishlist Toggle Button */}
                  <div className="col-sm-2">
                    <button
                      type="button"
                      className={`btn w-100 py-2.5 border rounded-3 d-flex align-items-center justify-content-center ${
                        isFavorite ? "btn-danger text-white border-danger" : "btn-light text-dark"
                      }`}
                      onClick={() => toggleWishlist(product.id)}
                      title={isFavorite ? "Remove from Wishlist" : "Save to Wishlist"}
                    >
                      <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"} fs-5`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <span className="section-tag">Related Hardware</span>
                <h2 className="h4 fw-bold text-dark m-0">Similar Items in {product.category}</h2>
              </div>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="btn btn-outline-custom btn-sm"
              >
                View Category
              </Link>
            </div>
            <div className="row g-4">
              {relatedProducts.map((rel) => (
                <div key={rel.id} className="col-12 col-sm-6 col-lg-3">
                  <ProductCard product={rel} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
