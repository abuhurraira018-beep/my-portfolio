import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-5 d-flex align-items-center" style={{ minHeight: "75vh", backgroundColor: "#f8fafc" }}>
      <div className="container text-center">
        <div
          className="mx-auto rounded-circle bg-light d-flex align-items-center justify-content-center text-primary mb-4 shadow-sm"
          style={{ width: "96px", height: "96px" }}
        >
          <i className="bi bi-compass fs-1" />
        </div>

        <span className="section-tag mb-2">Error 404 &bull; Page Not Found</span>
        <h1 className="display-5 fw-bold text-dark mb-3">Item or Destination Unavailable</h1>
        <p className="text-muted small mb-4" style={{ maxWidth: "460px", margin: "0 auto", lineHeight: "1.7" }}>
          The requested page or commercial product could not be located. It may have been archived, renamed, or relocated within our catalog.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link href="/" className="btn btn-primary-custom px-4 py-2.5">
            <i className="bi bi-house-door me-2" />
            Return Home
          </Link>
          <Link href="/products" className="btn btn-outline-custom px-4 py-2.5">
            <i className="bi bi-grid me-2" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
