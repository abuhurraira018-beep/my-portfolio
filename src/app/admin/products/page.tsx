"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types/product";
import { categories } from "@/data/categories";
import { formatCurrency } from "@/lib/format-currency";

export default function AdminProductsPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    isHydrated,
  } = useShop();

  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Form State for Add / Edit
  const [formState, setFormState] = useState<Partial<Product>>({
    name: "",
    slug: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    rating: 5.0,
    reviewCount: 1,
    stock: 10,
    featured: false,
    active: true,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Summary Metrics
  const totalCount = products.length;
  const activeCount = useMemo(() => products.filter((p) => p.active).length, [products]);
  const outOfStockCount = useMemo(() => products.filter((p) => p.stock <= 0).length, [products]);
  const featuredCount = useMemo(() => products.filter((p) => p.featured).length, [products]);

  // Filtered Table Data
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.category.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesId = p.id.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesId) return false;
      }
      return true;
    });
  }, [products, categoryFilter, searchFilter]);

  const openAddModal = () => {
    setFormState({
      name: "",
      slug: "",
      description: "",
      price: 99.99,
      originalPrice: 129.99,
      category: categories[0]?.name || "Electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      rating: 5.0,
      reviewCount: 0,
      stock: 20,
      featured: false,
      active: true,
    });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormState({ ...product });
    setFormErrors({});
  };

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formState.name?.trim()) errs.name = "Product name is required.";
    if (!formState.slug?.trim()) {
      errs.slug = "Slug is required.";
    } else if (!/^[a-z0-9-]+$/.test(formState.slug)) {
      errs.slug = "Slug must contain only lowercase letters, numbers, and hyphens.";
    }
    if (!formState.description?.trim()) errs.description = "Description is required.";
    if (typeof formState.price !== "number" || formState.price <= 0) {
      errs.price = "Price must be a positive number.";
    }
    if (typeof formState.stock !== "number" || formState.stock < 0) {
      errs.stock = "Stock count cannot be negative.";
    }
    if (!formState.image?.trim()) errs.image = "Product image URL is required.";

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, formState);
      setEditingProduct(null);
    } else {
      addProduct(formState as Omit<Product, "id">);
      setIsAddModalOpen(false);
    }
  };

  const confirmDelete = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  if (!isHydrated) {
    return (
      <div className="py-5 text-center" style={{ minHeight: "70vh" }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="py-5" style={{ backgroundColor: "#f8fafc", minHeight: "85vh" }}>
      <div className="container">
        {/* Header Breadcrumb & Actions */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb small text-muted mb-1">
                <li className="breadcrumb-item">
                  <Link href="/" className="text-decoration-none text-muted">
                    Home
                  </Link>
                </li>
                <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
                  Admin Portal
                </li>
              </ol>
            </nav>
            <h1 className="h2 fw-bold text-dark m-0">Product Catalog Management</h1>
            <p className="text-muted small m-0">
              Manage inventory, prices, visibility, and catalog entries with reactive browser synchronization.
            </p>
          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-custom d-inline-flex align-items-center gap-1.5"
              onClick={resetProductsToDefault}
              title="Reset products to default initial code array"
            >
              <i className="bi bi-arrow-counterclockwise" />
              <span>Reset Defaults</span>
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary-custom d-inline-flex align-items-center gap-1.5"
              onClick={openAddModal}
            >
              <i className="bi bi-plus-circle" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>

        {/* Developer & Data Management Notice Banner */}
        <div className="alert alert-info border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border-start border-4 border-primary">
          <div className="d-flex align-items-start gap-3">
            <div className="p-2.5 bg-primary bg-opacity-10 text-primary rounded-3">
              <i className="bi bi-terminal fs-4" />
            </div>
            <div className="flex-grow-1">
              <h2 className="h6 fw-bold text-dark mb-1">
                Architecture Note: Central Source Code vs. Browser Storage
              </h2>
              <p className="small text-muted mb-2" style={{ lineHeight: "1.6" }}>
                <strong>Source of Truth:</strong> The baseline product list is defined in{" "}
                <code className="text-dark bg-light px-1.5 py-0.5 rounded">src/data/products.ts</code>.
                Because Next.js runs client-side in the browser after compilation, client CRUD actions here
                persist via <code className="text-dark bg-light px-1.5 py-0.5 rounded">localStorage</code>{" "}
                without exposing insecure server rewrite permissions.
              </p>
              <p className="small text-muted mb-0">
                To permanently modify the initial seed catalog across all fresh deploys, edit{" "}
                <code className="text-dark bg-light px-1.5 py-0.5 rounded">src/data/products.ts</code> directly following the developer guide header in that file.
              </p>
            </div>
          </div>
        </div>

        {/* KPI Counter Cards */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm p-3 rounded-4 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="small text-muted fw-semibold">Total Catalog</span>
                <i className="bi bi-box-seam text-primary fs-5" />
              </div>
              <div className="fs-3 fw-bold text-dark">{totalCount}</div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm p-3 rounded-4 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="small text-muted fw-semibold">Active Listings</span>
                <i className="bi bi-check-circle text-success fs-5" />
              </div>
              <div className="fs-3 fw-bold text-success">{activeCount}</div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm p-3 rounded-4 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="small text-muted fw-semibold">Out of Stock</span>
                <i className="bi bi-exclamation-triangle text-danger fs-5" />
              </div>
              <div className="fs-3 fw-bold text-danger">{outOfStockCount}</div>
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="card border-0 shadow-sm p-3 rounded-4 bg-white">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="small text-muted fw-semibold">Featured Items</span>
                <i className="bi bi-star-fill text-warning fs-5" />
              </div>
              <div className="fs-3 fw-bold text-warning">{featuredCount}</div>
            </div>
          </div>
        </div>

        {/* Table & Filter Card */}
        <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
          {/* Table Search & Filter Bar */}
          <div className="row g-2 align-items-center mb-4">
            <div className="col-12 col-md-6">
              <div className="input-group input-group-sm">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-search text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search products by title, ID, or category..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
                {searchFilter && (
                  <button
                    className="btn btn-light border-0 text-muted"
                    type="button"
                    onClick={() => setSearchFilter("")}
                  >
                    <i className="bi bi-x-circle" />
                  </button>
                )}
              </div>
            </div>

            <div className="col-12 col-md-4 ms-auto">
              <select
                className="form-select form-select-sm bg-light border-0 text-dark fw-medium"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories ({products.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table align-middle table-hover mb-0">
              <thead className="table-light">
                <tr className="small text-uppercase text-muted" style={{ letterSpacing: "0.05em" }}>
                  <th scope="col" style={{ minWidth: "260px" }}>Product</th>
                  <th scope="col">Category</th>
                  <th scope="col">Price</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Status</th>
                  <th scope="col">Featured</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-5 text-muted small">
                      No products found matching &quot;{searchFilter}&quot;
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => (
                    <tr key={p.id}>
                      {/* Product Name & Image */}
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <div
                            className="position-relative rounded-2 overflow-hidden bg-light border flex-shrink-0"
                            style={{ width: "48px", height: "48px" }}
                          >
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="48px"
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                          <div>
                            <div className="fw-bold text-dark small">{p.name}</div>
                            <div className="text-muted" style={{ fontSize: "0.72rem" }}>
                              ID: {p.id} &bull; Slug: {p.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td>
                        <span className="badge bg-light text-dark border px-2 py-1 small">
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td>
                        <div className="fw-bold text-dark small">{formatCurrency(p.price)}</div>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <div className="text-muted text-decoration-line-through" style={{ fontSize: "0.7rem" }}>
                            {formatCurrency(p.originalPrice)}
                          </div>
                        )}
                      </td>

                      {/* Stock */}
                      <td>
                        {p.stock <= 0 ? (
                          <span className="badge-outofstock">0 (Sold Out)</span>
                        ) : p.stock < 10 ? (
                          <span className="badge-instock text-warning-emphasis bg-warning-subtle border-warning-subtle">
                            {p.stock} units
                          </span>
                        ) : (
                          <span className="badge-instock">{p.stock} units</span>
                        )}
                      </td>

                      {/* Active Status */}
                      <td>
                        {p.active ? (
                          <span className="badge bg-success bg-opacity-10 text-success border border-success-subtle rounded-pill">
                            Active
                          </span>
                        ) : (
                          <span className="badge bg-secondary bg-opacity-10 text-secondary border border-secondary-subtle rounded-pill">
                            Hidden
                          </span>
                        )}
                      </td>

                      {/* Featured */}
                      <td>
                        {p.featured ? (
                          <i className="bi bi-star-fill text-warning" title="Featured on Homepage" />
                        ) : (
                          <i className="bi bi-star text-muted" title="Not Featured" />
                        )}
                      </td>

                      {/* Action Buttons */}
                      <td className="text-end">
                        <div className="d-flex justify-content-end gap-1.5">
                          <Link
                            href={`/products/${p.slug}`}
                            className="btn btn-sm btn-light border p-1.5 text-muted hover-primary"
                            title="View Public Page"
                          >
                            <i className="bi bi-box-arrow-up-right" />
                          </Link>
                          <button
                            type="button"
                            className="btn btn-sm btn-light border p-1.5 text-primary hover-bg-light"
                            title="Edit Product"
                            onClick={() => openEditModal(p)}
                          >
                            <i className="bi bi-pencil-square" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-light border p-1.5 text-danger hover-bg-light"
                            title="Delete Product"
                            onClick={() => setDeletingProductId(p.id)}
                          >
                            <i className="bi bi-trash3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add / Edit Product Modal */}
        {(isAddModalOpen || editingProduct) && (
          <>
            <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
              <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content rounded-4 border-0 shadow-lg">
                  <div className="modal-header border-bottom">
                    <h5 className="modal-title fw-bold text-dark fs-6">
                      <i className={`bi ${editingProduct ? "bi-pencil-square" : "bi-plus-circle"} text-primary me-2`} />
                      {editingProduct ? `Edit Product: ${editingProduct.name}` : "Add New Commercial Product"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setEditingProduct(null);
                      }}
                    />
                  </div>

                  <form onSubmit={handleSaveProduct} noValidate>
                    <div className="modal-body p-4">
                      <div className="row g-3">
                        {/* Name */}
                        <div className="col-md-8">
                          <label className="form-label small fw-semibold text-dark">
                            Product Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control form-control-sm ${formErrors.name ? "is-invalid" : ""}`}
                            value={formState.name || ""}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormState((prev) => ({
                                ...prev,
                                name: val,
                                slug: prev.slug ? prev.slug : val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
                              }));
                            }}
                          />
                          {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                        </div>

                        {/* Category */}
                        <div className="col-md-4">
                          <label className="form-label small fw-semibold text-dark">Category</label>
                          <select
                            className="form-select form-select-sm"
                            value={formState.category}
                            onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                          >
                            {categories.map((c) => (
                              <option key={c.id} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Slug */}
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold text-dark">
                            URL Slug <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control form-control-sm ${formErrors.slug ? "is-invalid" : ""}`}
                            value={formState.slug || ""}
                            onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                          />
                          {formErrors.slug && <div className="invalid-feedback">{formErrors.slug}</div>}
                        </div>

                        {/* Image URL */}
                        <div className="col-md-6">
                          <label className="form-label small fw-semibold text-dark">
                            Image URL <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className={`form-control form-control-sm ${formErrors.image ? "is-invalid" : ""}`}
                            value={formState.image || ""}
                            onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                          />
                          {formErrors.image && <div className="invalid-feedback">{formErrors.image}</div>}
                        </div>

                        {/* Price */}
                        <div className="col-md-4">
                          <label className="form-label small fw-semibold text-dark">
                            Price ($) <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className={`form-control form-control-sm ${formErrors.price ? "is-invalid" : ""}`}
                            value={formState.price ?? 0}
                            onChange={(e) => setFormState({ ...formState, price: parseFloat(e.target.value) || 0 })}
                          />
                          {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
                        </div>

                        {/* Original Price */}
                        <div className="col-md-4">
                          <label className="form-label small fw-semibold text-dark">Original Price ($)</label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control form-control-sm"
                            value={formState.originalPrice ?? ""}
                            onChange={(e) =>
                              setFormState({
                                ...formState,
                                originalPrice: e.target.value ? parseFloat(e.target.value) : undefined,
                              })
                            }
                          />
                        </div>

                        {/* Stock */}
                        <div className="col-md-4">
                          <label className="form-label small fw-semibold text-dark">
                            Units in Stock <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className={`form-control form-control-sm ${formErrors.stock ? "is-invalid" : ""}`}
                            value={formState.stock ?? 0}
                            onChange={(e) => setFormState({ ...formState, stock: parseInt(e.target.value, 10) || 0 })}
                          />
                          {formErrors.stock && <div className="invalid-feedback">{formErrors.stock}</div>}
                        </div>

                        {/* Description */}
                        <div className="col-12">
                          <label className="form-label small fw-semibold text-dark">
                            Product Description <span className="text-danger">*</span>
                          </label>
                          <textarea
                            rows={3}
                            className={`form-control form-control-sm ${formErrors.description ? "is-invalid" : ""}`}
                            value={formState.description || ""}
                            onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                          />
                          {formErrors.description && <div className="invalid-feedback">{formErrors.description}</div>}
                        </div>

                        {/* Featured and Active Switches */}
                        <div className="col-md-6">
                          <div className="form-check form-switch pt-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="activeSwitch"
                              checked={formState.active ?? true}
                              onChange={(e) => setFormState({ ...formState, active: e.target.checked })}
                            />
                            <label className="form-check-label small fw-semibold text-dark" htmlFor="activeSwitch">
                              Active Listing (visible in catalog)
                            </label>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-check form-switch pt-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              id="featuredSwitch"
                              checked={formState.featured ?? false}
                              onChange={(e) => setFormState({ ...formState, featured: e.target.checked })}
                            />
                            <label className="form-check-label small fw-semibold text-dark" htmlFor="featuredSwitch">
                              Featured Showcase (highlighted on Homepage)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer border-top bg-light">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-custom"
                        onClick={() => {
                          setIsAddModalOpen(false);
                          setEditingProduct(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-sm btn-primary-custom">
                        {editingProduct ? "Save Changes" : "Create Product"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-backdrop fade show" />
          </>
        )}

        {/* Delete Confirmation Modal */}
        {deletingProductId && (
          <>
            <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content rounded-4 border-0 shadow-lg">
                  <div className="modal-header border-bottom">
                    <h5 className="modal-title fw-bold text-danger fs-6">
                      <i className="bi bi-exclamation-triangle-fill me-2" />
                      Confirm Product Deletion
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setDeletingProductId(null)}
                    />
                  </div>
                  <div className="modal-body p-4">
                    <p className="text-dark small mb-2">
                      Are you sure you want to remove this product from the demo catalog?
                    </p>
                    <p className="text-muted small mb-0">
                      Product ID: <strong>{deletingProductId}</strong>
                    </p>
                  </div>
                  <div className="modal-footer border-top bg-light">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-custom"
                      onClick={() => setDeletingProductId(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger px-3"
                      onClick={confirmDelete}
                    >
                      Delete Product
                    </button>
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
