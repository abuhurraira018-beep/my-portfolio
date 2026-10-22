"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { formatCurrency } from "@/lib/format-currency";
import { siteConfig } from "@/data/site-config";

export default function CartPage() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    shippingFee,
    taxAmount,
    discountAmount,
    cartTotal,
    promoCode,
    applyPromoCode,
    removePromoCode,
    isHydrated,
  } = useShop();

  const [promoInput, setPromoInput] = useState("");
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyPromoCode(promoInput);
    setPromoInput("");
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

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
              Shopping Cart
            </li>
          </ol>
        </nav>

        <h1 className="h2 fw-bold text-dark mb-4">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="card border-0 shadow-sm p-5 text-center bg-white rounded-4 my-4">
            <div
              className="mx-auto rounded-circle bg-light d-flex align-items-center justify-content-center text-muted mb-4"
              style={{ width: "80px", height: "80px" }}
            >
              <i className="bi bi-cart-x fs-1" />
            </div>
            <h2 className="h4 fw-bold text-dark mb-2">Your Cart is Currently Empty</h2>
            <p className="text-muted small mb-4" style={{ maxWidth: "440px", margin: "0 auto" }}>
              Explore our commercial catalog for ergonomic seating, mechanical peripherals, and high-fidelity workplace audio.
            </p>
            <div>
              <Link href="/products" className="btn btn-primary-custom px-4 py-2.5">
                <i className="bi bi-arrow-left me-2" />
                Explore Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {/* Cart Items List */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white mb-4">
                <div className="d-flex justify-content-between align-items-center pb-3 border-bottom mb-3">
                  <h2 className="h6 fw-bold text-dark m-0">
                    Cart Items ({cart.reduce((acc, i) => acc + i.quantity, 0)})
                  </h2>
                  <button
                    type="button"
                    className="btn btn-link btn-sm text-danger p-0 text-decoration-none"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="d-flex flex-column gap-3">
                  {cart.map((item) => {
                    const lineTotal = item.product.price * item.quantity;
                    return (
                      <div
                        key={item.product.id}
                        className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 p-3 rounded-3 bg-light"
                      >
                        {/* Product Image & Title */}
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="position-relative rounded-3 overflow-hidden bg-white border"
                            style={{ width: "70px", height: "70px", flexShrink: 0 }}
                          >
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              sizes="70px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div>
                            <Link
                              href={`/products/${item.product.slug}`}
                              className="text-dark fw-bold text-decoration-none small hover-primary"
                            >
                              {item.product.name}
                            </Link>
                            <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                              Unit Price: {formatCurrency(item.product.price)} &bull; {item.product.category}
                            </div>
                            {item.product.stock < item.quantity && (
                              <div className="text-danger small mt-1">
                                Notice: Only {item.product.stock} currently in stock.
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Quantity Stepper & Price */}
                        <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-3">
                          {/* Quantity Controls */}
                          <div className="input-group input-group-sm" style={{ width: "110px" }}>
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              <i className="bi bi-dash" />
                            </button>
                            <input
                              type="text"
                              readOnly
                              className="form-control text-center fw-bold bg-white"
                              value={item.quantity}
                              aria-label="Item quantity"
                            />
                            <button
                              type="button"
                              className="btn btn-outline-secondary"
                              disabled={item.quantity >= item.product.stock}
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              <i className="bi bi-plus" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <div className="text-end" style={{ minWidth: "90px" }}>
                            <span className="fw-bold text-dark">{formatCurrency(lineTotal)}</span>
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            className="btn btn-sm btn-link text-muted p-1 hover-danger"
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <i className="bi bi-trash3 text-danger" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Free Shipping Progress Alert */}
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2.5 bg-primary bg-opacity-10 text-primary rounded-circle">
                    <i className="bi bi-truck fs-4" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="fw-bold text-dark small">
                      {cartSubtotal >= siteConfig.shipping.freeShippingThreshold
                        ? "Congratulations! You have unlocked Free Express Commercial Shipping."
                        : `Add ${formatCurrency(siteConfig.shipping.freeShippingThreshold - cartSubtotal)} more to qualify for Free Shipping!`}
                    </div>
                    <div className="progress mt-2" style={{ height: "6px" }}>
                      <div
                        className="progress-bar bg-primary"
                        role="progressbar"
                        style={{
                          width: `${Math.min(100, (cartSubtotal / siteConfig.shipping.freeShippingThreshold) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white position-sticky" style={{ top: "85px" }}>
                <h2 className="h6 fw-bold text-dark mb-3 pb-2 border-bottom">Order Summary</h2>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="mb-3">
                  <label htmlFor="promoCodeInput" className="small text-muted fw-semibold mb-1">
                    Promotional Voucher
                  </label>
                  <div className="input-group">
                    <input
                      id="promoCodeInput"
                      type="text"
                      className="form-control text-uppercase small"
                      placeholder="e.g. NEXORA10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                    />
                    <button type="submit" className="btn btn-outline-custom btn-sm">
                      Apply
                    </button>
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.72rem", marginTop: "4px" }}>
                    Demo codes: <strong>NEXORA10</strong> (10% off) or <strong>WELCOME20</strong> (20% off)
                  </div>
                </form>

                {promoCode && (
                  <div className="d-flex justify-content-between align-items-center p-2 mb-3 rounded-2 bg-success bg-opacity-10 text-success small">
                    <span>
                      <i className="bi bi-tag-fill me-1" /> Code <strong>{promoCode}</strong> Active
                    </span>
                    <button
                      type="button"
                      className="btn-close btn-close-sm"
                      style={{ fontSize: "0.55rem" }}
                      onClick={removePromoCode}
                      aria-label="Remove promo code"
                    />
                  </div>
                )}

                {/* Calculation Rows */}
                <div className="d-flex flex-column gap-2 small pb-3 border-bottom">
                  <div className="d-flex justify-content-between text-muted">
                    <span>Subtotal</span>
                    <span className="text-dark fw-medium">{formatCurrency(cartSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="d-flex justify-content-between text-success">
                      <span>Discount</span>
                      <span>-{formatCurrency(discountAmount)}</span>
                    </div>
                  )}

                  <div className="d-flex justify-content-between text-muted">
                    <span>Estimated Shipping</span>
                    <span className="text-dark fw-medium">
                      {shippingFee === 0 ? <span className="text-success fw-bold">FREE</span> : formatCurrency(shippingFee)}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between text-muted">
                    <span>Commercial Sales Tax (8%)</span>
                    <span className="text-dark fw-medium">{formatCurrency(taxAmount)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="d-flex justify-content-between align-items-center py-3 mb-3">
                  <span className="fw-bold text-dark fs-6">Estimated Total</span>
                  <span className="fw-bold text-primary fs-4">{formatCurrency(cartTotal)}</span>
                </div>

                {/* Checkout Trigger */}
                <button
                  type="button"
                  className="btn btn-primary-custom w-100 py-2.5 fw-semibold mb-3 d-flex align-items-center justify-content-center gap-2"
                  onClick={() => setIsCheckoutModalOpen(true)}
                >
                  <i className="bi bi-credit-card-2-front" />
                  <span>Proceed to Demo Checkout</span>
                </button>

                <div className="text-center text-muted" style={{ fontSize: "0.72rem" }}>
                  <i className="bi bi-shield-lock me-1" />
                  256-Bit SSL Encrypted &bull; Commercial Demo Mode
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demo Checkout Modal */}
        {isCheckoutModalOpen && (
          <>
            <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 border-0 shadow-lg">
                  <div className="modal-header border-bottom">
                    <h5 className="modal-title fw-bold text-dark fs-6">
                      <i className="bi bi-shield-lock-fill text-primary me-2" />
                      Commercial Demo Checkout
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => {
                        setIsCheckoutModalOpen(false);
                        setCheckoutComplete(false);
                      }}
                    />
                  </div>

                  <div className="modal-body p-4">
                    {checkoutComplete ? (
                      <div className="text-center py-4">
                        <div className="p-3 bg-success bg-opacity-10 text-success rounded-circle d-inline-flex mb-3">
                          <i className="bi bi-check2-circle fs-1" />
                        </div>
                        <h4 className="fw-bold text-dark mb-2">Simulated Order Placed!</h4>
                        <p className="text-muted small mb-3">
                          Thank you for evaluating the NEXORA commerce workflow. As this is a portfolio frontend application, no financial transaction has taken place.
                        </p>
                        <div className="badge bg-light text-dark border p-2 mb-3">
                          Order Reference: #NEX-{Math.floor(100000 + Math.random() * 900000)}
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-primary-custom"
                            onClick={() => {
                              setIsCheckoutModalOpen(false);
                              setCheckoutComplete(false);
                            }}
                          >
                            Return to Store
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSimulateCheckout}>
                        <div className="alert alert-info py-2 px-3 small rounded-3 mb-3">
                          <i className="bi bi-info-circle-fill me-1" />
                          <strong>Demo Mode Notice:</strong> This simulates a standard corporate procurement workflow. No actual payments are charged.
                        </div>

                        <div className="mb-3">
                          <label className="form-label small fw-semibold text-dark">Company / Organization</label>
                          <input type="text" className="form-control form-control-sm" defaultValue="Acme Studios Inc." required />
                        </div>

                        <div className="mb-3">
                          <label className="form-label small fw-semibold text-dark">Procurement Contact Email</label>
                          <input type="email" className="form-control form-control-sm" defaultValue="procurement@acme.example.com" required />
                        </div>

                        <div className="mb-3">
                          <label className="form-label small fw-semibold text-dark">Shipping Destination</label>
                          <input type="text" className="form-control form-control-sm" defaultValue="450 Lexington Ave, Suite 1200, New York, NY" required />
                        </div>

                        <div className="p-3 bg-light rounded-3 d-flex justify-content-between align-items-center mb-4">
                          <span className="small fw-semibold text-dark">Simulated Due:</span>
                          <span className="fw-bold text-primary fs-5">{formatCurrency(cartTotal)}</span>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-custom flex-grow-1"
                            onClick={() => setIsCheckoutModalOpen(false)}
                          >
                            Cancel
                          </button>
                          <button type="submit" className="btn btn-primary-custom flex-grow-1">
                            Complete Demo Order
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" />
          </>
        )}
      </div>
    </div>
  );
}
