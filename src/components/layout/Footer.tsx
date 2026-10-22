import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { categories } from "@/data/categories";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary border-opacity-25" style={{ backgroundColor: "#0c111d" }}>
      <div className="container">
        <div className="row g-4 mb-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <span
                className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-3 me-2 shadow-sm"
                style={{ width: "36px", height: "36px" }}
              >
                <i className="bi bi-intersect fs-5" />
              </span>
              <span className="fw-bold fs-4 text-white">{siteConfig.name}</span>
            </div>
            <p className="text-secondary small pe-lg-4 mb-4" style={{ lineHeight: "1.7" }}>
              NEXORA delivers enterprise-grade workplace hardware, acoustic systems, and precision commercial accessories designed to drive executive performance and organizational focus.
            </p>
            <div className="d-flex gap-2">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center text-white"
                  style={{ width: "36px", height: "36px" }}
                  aria-label={social.name}
                >
                  <i className={`bi ${social.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold text-white small mb-3 tracking-wider" style={{ letterSpacing: "0.08em" }}>
              Company
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <Link href="/" className="text-secondary text-decoration-none hover-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-secondary text-decoration-none hover-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-secondary text-decoration-none hover-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-secondary text-decoration-none hover-white">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-secondary text-decoration-none hover-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin/products" className="text-secondary text-decoration-none hover-white">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-secondary text-decoration-none hover-white">
                  Client Portals
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-secondary text-decoration-none hover-white">
                  Account Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold text-white small mb-3 tracking-wider" style={{ letterSpacing: "0.08em" }}>
              Categories
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-secondary text-decoration-none hover-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information & Hours */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase fw-bold text-white small mb-3 tracking-wider" style={{ letterSpacing: "0.08em" }}>
              Direct Support
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-3 small text-secondary">
              <li className="d-flex align-items-start">
                <i className="bi bi-geo-alt text-primary me-2 mt-1" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-telephone text-primary me-2" />
                <a href={`tel:${siteConfig.contact.phone}`} className="text-secondary text-decoration-none">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-envelope text-primary me-2" />
                <a href={`mailto:${siteConfig.contact.email}`} className="text-secondary text-decoration-none">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-clock text-primary me-2" />
                <span>{siteConfig.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Legal */}
        <div className="pt-4 border-top border-secondary border-opacity-25 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 small text-secondary">
          <div>
            &copy; {currentYear} {siteConfig.name} — Business & Commerce. All rights reserved.
          </div>
          <div className="d-flex gap-3">
            <Link href="/about" className="text-secondary text-decoration-none">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/about" className="text-secondary text-decoration-none">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link href="/contact" className="text-secondary text-decoration-none">
              Commercial Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
