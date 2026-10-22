"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/format-currency";
import { calculateDiscountPercentage } from "@/lib/product-utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useShop();
  const { isAuthenticated } = useAuth();

  const isFavorite = isInWishlist(product.id);
  const discountPct = calculateDiscountPercentage(product.price, product.originalPrice);
  const isOutOfStock = product.stock <= 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast("Authentication required to manage your wishlist.", "warning");
      router.push(`/portal?redirect=${encodeURIComponent(`/products/${product.slug}`)}`);
      return;
    }
    toggleWishlist(product.id);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast("Please sign in or select a portal to add products to your cart.", "warning");
      router.push(`/portal?redirect=${encodeURIComponent(`/products/${product.slug}`)}`);
      return;
    }
    addToCart(product, 1);
  };

  const productLink = isAuthenticated
    ? `/products/${product.slug}`
    : `/portal?redirect=${encodeURIComponent(`/products/${product.slug}`)}`;

  return (
    <div className="card h-100 nexora-card border-0 d-flex flex-column position-relative">
      {/* Top Badges & Wishlist Action */}
      <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center" style={{ zIndex: 3 }}>
        <div className="d-flex flex-column gap-1 align-items-start">
          {product.featured && <span className="badge-featured">Featured</span>}
          {discountPct && <span className="badge-discount">-{discountPct}%</span>}
        </div>
        <button
          type="button"
          className="btn btn-sm btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center text-dark"
          style={{ width: "36px", height: "36px", backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          onClick={handleWishlistClick}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
          title={isFavorite ? "In Wishlist" : "Add to Wishlist"}
        >
          <i className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"}`} />
        </button>
      </div>

      {/* Product Image Link */}
      <Link href={productLink} className="text-decoration-none">
        <div className="img-aspect-box position-relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="img-fluid"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        </div>
      </Link>

      {/* Card Content */}
      <div className="card-body p-3.5 d-flex flex-column flex-grow-1">
        {/* Category & Stock Indicator */}
        <div className="d-flex justify-content-between align-items-center mb-1.5">
          <span className="text-uppercase text-muted fw-semibold" style={{ fontSize: "0.6875rem", letterSpacing: "0.06em" }}>
            {product.category}
          </span>
          {isOutOfStock ? (
            <span className="badge-outofstock">Out of Stock</span>
          ) : product.stock < 10 ? (
            <span className="badge-instock text-warning-emphasis bg-warning-subtle border-warning-subtle">
              Only {product.stock} left
            </span>
          ) : (
            <span className="badge-instock">In Stock</span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="h6 fw-bold mb-2 text-truncate-2" style={{ lineHeight: "1.4", minHeight: "2.8rem" }}>
          <Link href={productLink} className="text-dark text-decoration-none hover-primary">
            {product.name}
          </Link>
        </h3>

        {/* Rating & Review Count */}
        <div className="d-flex align-items-center gap-1 mb-2.5 small">
          <div className="d-flex text-warning">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`bi ${star <= Math.round(product.rating) ? "bi-star-fill star-filled" : "bi-star star-empty"}`}
                style={{ fontSize: "0.8125rem" }}
              />
            ))}
          </div>
          <span className="fw-semibold text-dark ms-1" style={{ fontSize: "0.8125rem" }}>
            {product.rating.toFixed(1)}
          </span>
          <span className="text-muted" style={{ fontSize: "0.75rem" }}>
            ({product.reviewCount})
          </span>
        </div>

        {/* Price Row */}
        <div className="d-flex align-items-baseline gap-2 mb-3 mt-auto">
          <span className="fs-5 fw-bold text-dark">{formatCurrency(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-muted text-decoration-line-through small">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-sm btn-primary-custom flex-grow-1 d-inline-flex align-items-center justify-content-center gap-1.5"
            disabled={isOutOfStock}
            onClick={handleAddToCartClick}
          >
            <i className="bi bi-cart-plus" />
            <span>{isOutOfStock ? "Sold Out" : "Add to Cart"}</span>
          </button>
          <Link
            href={productLink}
            className="btn btn-sm btn-outline-custom p-2 d-inline-flex align-items-center justify-content-center"
            title="View Details"
            aria-label="View Details"
          >
            <i className="bi bi-arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};
