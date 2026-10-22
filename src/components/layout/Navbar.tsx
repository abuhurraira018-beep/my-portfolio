"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";
import { useAuth } from "@/context/AuthContext";
import { siteConfig } from "@/data/site-config";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { cartCount, wishlistCount, showToast } = useShop();
  const { user, isAuthenticated, logout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/", protected: false },
    { name: "Products", href: "/products", protected: true },
    { name: "Categories", href: "/products#categories", protected: true },
    { name: "About", href: "/about", protected: true },
    { name: "Services", href: "/services", protected: true },
    { name: "Contact", href: "/contact", protected: true },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push(`/portal?redirect=${encodeURIComponent(`/products?search=${encodeURIComponent(navSearchQuery.trim())}`)}`);
      setIsMobileMenuOpen(false);
      return;
    }
    if (navSearchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(navSearchQuery.trim())}`);
      setIsSearchExpanded(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    showToast("You have been signed out. Welcome back anytime.", "info");
    setIsUserDropdownOpen(false);
    router.push("/");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky-navbar">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light py-2.5 px-0" aria-label="Main Navigation">
          {/* Brand Logo & Name */}
          <Link href="/" className="navbar-brand d-flex align-items-center me-lg-4">
            <span
              className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-3 me-2 shadow-sm"
              style={{ width: "36px", height: "36px" }}
            >
              <i className="bi bi-intersect fs-5" />
            </span>
            <div className="d-flex flex-column">
              <span className="fw-bold tracking-tight text-dark fs-5 lh-1">{siteConfig.name}</span>
              <span className="text-muted text-uppercase" style={{ fontSize: "0.625rem", letterSpacing: "0.08em" }}>
                Commerce
              </span>
            </div>
          </Link>

          {/* Mobile Right Controls */}
          <div className="d-flex align-items-center d-lg-none gap-2 ms-auto me-2">
            {isAuthenticated ? (
              <>
                <Link
                  href="/wishlist"
                  className="btn btn-sm btn-light position-relative p-2 text-dark rounded-circle"
                  aria-label="Wishlist"
                >
                  <i className="bi bi-heart fs-6" />
                  {wishlistCount > 0 && <span className="badge-counter">{wishlistCount}</span>}
                </Link>

                <Link
                  href="/cart"
                  className="btn btn-sm btn-light position-relative p-2 text-dark rounded-circle"
                  aria-label="Shopping Cart"
                >
                  <i className="bi bi-bag fs-6" />
                  {cartCount > 0 && <span className="badge-counter">{cartCount}</span>}
                </Link>
              </>
            ) : (
              <Link href="/portal" className="btn btn-sm btn-outline-primary px-2.5 py-1 fw-semibold small">
                Sign In
              </Link>
            )}

            <button
              className="navbar-toggler border-0 p-2 shadow-none"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <i className={`bi ${isMobileMenuOpen ? "bi-x-lg" : "bi-list"} fs-4 text-dark`} />
            </button>
          </div>

          {/* Collapsible Navbar (Desktop + Mobile) */}
          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? "show py-3" : ""}`}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-1">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.name}>
                  <Link
                    href={link.href}
                    className={`nav-link nav-link-custom ${isActive(link.href) ? "active" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{link.name}</span>
                    {!isAuthenticated && link.protected && (
                      <i className="bi bi-lock-fill text-muted ms-1.5" style={{ fontSize: "0.7rem" }} title="Requires Authentication" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Right Side Utilities */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              {/* Search Bar / Input */}
              <form onSubmit={handleSearchSubmit} className="d-flex align-items-center position-relative">
                <div
                  className="input-group input-group-sm"
                  style={{ width: isSearchExpanded ? "220px" : "180px", transition: "all 0.3s ease" }}
                >
                  <input
                    type="search"
                    className="form-control bg-light border-0 rounded-pill ps-3 pe-4"
                    placeholder="Search catalog..."
                    value={navSearchQuery}
                    onChange={(e) => setNavSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchExpanded(true)}
                    onBlur={() => !navSearchQuery && setIsSearchExpanded(false)}
                    aria-label="Search products"
                  />
                  <button
                    type="submit"
                    className="btn position-absolute end-0 top-50 translate-middle-y border-0 text-muted pe-3 bg-transparent"
                    aria-label="Submit search"
                  >
                    <i className="bi bi-search" />
                  </button>
                </div>
              </form>

              {/* Conditional Authentication Actions */}
              {isAuthenticated && user ? (
                <>
                  {/* Wishlist Link (Desktop) */}
                  <Link
                    href="/wishlist"
                    className="btn btn-light position-relative p-2 text-dark rounded-circle d-none d-lg-inline-flex"
                    title="View Wishlist"
                    aria-label={`Wishlist with ${wishlistCount} items`}
                  >
                    <i className="bi bi-heart fs-6" />
                    {wishlistCount > 0 && <span className="badge-counter">{wishlistCount}</span>}
                  </Link>

                  {/* Cart Link (Desktop) */}
                  <Link
                    href="/cart"
                    className="btn btn-light position-relative p-2 text-dark rounded-circle d-none d-lg-inline-flex"
                    title="View Cart"
                    aria-label={`Shopping cart with ${cartCount} items`}
                  >
                    <i className="bi bi-bag fs-6" />
                    {cartCount > 0 && <span className="badge-counter">{cartCount}</span>}
                  </Link>

                  {/* Admin Portal Link */}
                  <Link
                    href="/admin/products"
                    className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1.5 ms-1"
                    title="Admin Product Manager"
                  >
                    <i className="bi bi-speedometer2" />
                    <span>Admin</span>
                  </Link>

                  {/* User Account Dropdown */}
                  <div className="position-relative ms-1">
                    <button
                      type="button"
                      className="btn btn-sm btn-light border d-flex align-items-center gap-2 rounded-pill px-2.5 py-1 text-dark"
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      aria-expanded={isUserDropdownOpen}
                      aria-label="User Account Menu"
                    >
                      <span
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                        style={{ width: "24px", height: "24px", fontSize: "0.75rem" }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="small fw-semibold d-none d-sm-inline" style={{ maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {user.name.split(" ")[0]}
                      </span>
                      <i className="bi bi-chevron-down small text-muted" />
                    </button>

                    {isUserDropdownOpen && (
                      <div
                        className="card border-0 shadow-lg position-absolute end-0 mt-2 p-3 rounded-3 bg-white"
                        style={{ width: "250px", zIndex: 1050 }}
                      >
                        <div className="pb-2 border-bottom mb-2">
                          <div className="fw-bold text-dark small">{user.name}</div>
                          <div className="text-muted" style={{ fontSize: "0.72rem" }}>
                            {user.email}
                          </div>
                          <span className={`badge mt-1.5 rounded-pill small ${user.accountType === "corporate" ? "bg-primary" : "bg-info text-dark"}`}>
                            {user.accountType === "corporate" ? "Corporate Account" : "Studio Member"}
                          </span>
                        </div>

                        <ul className="list-unstyled d-flex flex-column gap-1 small m-0">
                          <li>
                            <Link
                              href="/admin/products"
                              className="dropdown-item py-1.5 rounded-2 d-flex align-items-center gap-2 text-dark"
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              <i className="bi bi-speedometer2 text-primary" />
                              <span>Admin Dashboard</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/cart"
                              className="dropdown-item py-1.5 rounded-2 d-flex align-items-center gap-2 text-dark"
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              <i className="bi bi-bag text-primary" />
                              <span>Cart ({cartCount})</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/wishlist"
                              className="dropdown-item py-1.5 rounded-2 d-flex align-items-center gap-2 text-dark"
                              onClick={() => setIsUserDropdownOpen(false)}
                            >
                              <i className="bi bi-heart text-primary" />
                              <span>Saved Wishlist ({wishlistCount})</span>
                            </Link>
                          </li>
                          <li className="pt-2 border-top mt-1">
                            <button
                              type="button"
                              className="dropdown-item py-1.5 text-danger rounded-2 d-flex align-items-center gap-2"
                              onClick={handleLogout}
                            >
                              <i className="bi bi-box-arrow-right" />
                              <span>Sign Out</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Unauthenticated Actions (Gateway / Sign In / Register) */
                <div className="d-flex align-items-center gap-2">
                  <Link
                    href="/portal"
                    className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1.5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <i className="bi bi-box-arrow-in-right" />
                    <span>Portals</span>
                  </Link>
                  <Link
                    href="/login"
                    className="btn btn-sm btn-primary-custom d-inline-flex align-items-center gap-1.5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>Sign In</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Account Notice when Logged Out */}
            {!isAuthenticated && isMobileMenuOpen && (
              <div className="d-lg-none mt-3 pt-3 border-top text-center">
                <div className="p-2.5 bg-light rounded-3 small text-muted mb-2">
                  <i className="bi bi-shield-lock me-1 text-primary" />
                  Catalog and pricing require commercial authentication.
                </div>
                <div className="d-flex gap-2">
                  <Link href="/portal" className="btn btn-sm btn-outline-custom flex-grow-1" onClick={() => setIsMobileMenuOpen(false)}>
                    View Portals
                  </Link>
                  <Link href="/register" className="btn btn-sm btn-primary-custom flex-grow-1" onClick={() => setIsMobileMenuOpen(false)}>
                    Register
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
