"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";

// Dynamically import 3D scenes with SSR disabled for optimal loading
const HeroHardwareScene = dynamic(() => import("@/components/3d/HeroHardwareScene"), {
  ssr: false,
  loading: () => (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-light rounded-4" style={{ minHeight: "460px" }}>
      <div className="spinner-border text-primary mb-2" role="status" />
      <span className="small text-muted fw-semibold">Loading 3D Hardware Engine...</span>
    </div>
  ),
});

const AmbientParticles = dynamic(() => import("@/components/3d/AmbientParticles"), {
  ssr: false,
});

export const HeroSection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeView, setActiveView] = useState<"3d" | "photo">("3d");

  return (
    <section className="py-5 py-lg-6 position-relative overflow-hidden" style={{ backgroundColor: "#ffffff" }}>
      {/* Background Interactive 3D Particles */}
      <AmbientParticles particleCount={50} color="#2563eb" />

      <div className="container py-lg-4 position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center g-5">
          {/* Left Column Content */}
          <div className="col-lg-6">
            <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-light border border-subtle mb-3">
              <span className="badge rounded-pill bg-primary p-1">
                <i className="bi bi-shield-check text-white" />
              </span>
              <span className="small fw-semibold text-dark text-uppercase tracking-wider" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                YOUR TRUSTED BUSINESS PARTNER
              </span>
            </div>

            <h1 className="display-4 fw-bolder text-dark mb-3 lh-sm" style={{ letterSpacing: "-0.03em" }}>
              Discover Better Products. <br />
              <span className="text-primary">Experience Better Service.</span>
            </h1>

            <p className="lead text-muted mb-4 fs-6" style={{ lineHeight: "1.75" }}>
              NEXORA equips forward-thinking enterprises, modern workspaces, and professional studios with precision-engineered hardware, acoustic conference systems, and ergonomic technology. Built for commercial reliability.
            </p>

            {/* Public Preview Alert for Unauthenticated Users */}
            {!isAuthenticated && (
              <div className="alert alert-light border shadow-sm p-3 rounded-3 d-flex align-items-center gap-3 mb-4">
                <div className="p-2 bg-primary bg-opacity-10 text-primary rounded-circle">
                  <i className="bi bi-lock-fill fs-5" />
                </div>
                <div className="small">
                  <strong className="text-dark d-block">Public Preview Mode:</strong>
                  <span className="text-muted">
                    Full catalog browsing, cart ordering, and corporate pricing require sign in.
                  </span>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <Link
                href={isAuthenticated ? "/products" : "/portal?redirect=/products"}
                className="btn btn-primary-custom px-4 py-2.5 d-inline-flex align-items-center gap-2"
              >
                <span>{isAuthenticated ? "Explore Products" : "Sign In to Access Catalog"}</span>
                <i className="bi bi-arrow-right" />
              </Link>
              <Link
                href={isAuthenticated ? "/about" : "/portal?redirect=/about"}
                className="btn btn-outline-custom px-4 py-2.5 d-inline-flex align-items-center gap-2"
              >
                <span>{isAuthenticated ? "Learn About Us" : "Enterprise Portals"}</span>
                <i className="bi bi-building" />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="row g-3 pt-3 border-top border-light-subtle">
              <div className="col-4">
                <div className="fw-bold fs-5 text-dark">99.8%</div>
                <div className="small text-muted" style={{ fontSize: "0.75rem" }}>
                  On-Time Fulfillment
                </div>
              </div>
              <div className="col-4 border-start border-end">
                <div className="fw-bold fs-5 text-dark">4.9 / 5.0</div>
                <div className="small text-muted" style={{ fontSize: "0.75rem" }}>
                  Client Satisfaction
                </div>
              </div>
              <div className="col-4">
                <div className="fw-bold fs-5 text-dark">24 / 7</div>
                <div className="small text-muted" style={{ fontSize: "0.75rem" }}>
                  Enterprise Support
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Showcase Visual with 3D Canvas */}
          <div className="col-lg-6 position-relative">
            {/* View Mode Switcher Header */}
            <div className="d-flex justify-content-between align-items-center mb-2 px-1">
              <span className="small text-muted fw-semibold">
                {activeView === "3d" ? "Interactive 3D Hardware Model" : "Studio Environment Photography"}
              </span>
              <div className="btn-group btn-group-sm bg-light rounded-pill p-1 border">
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
                    activeView === "3d" ? "btn-primary text-white" : "btn-light text-muted"
                  }`}
                  onClick={() => setActiveView("3d")}
                >
                  <i className="bi bi-box me-1" />
                  Interactive 3D
                </button>
                <button
                  type="button"
                  className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold ${
                    activeView === "photo" ? "btn-primary text-white" : "btn-light text-muted"
                  }`}
                  onClick={() => setActiveView("photo")}
                >
                  <i className="bi bi-image me-1" />
                  Studio Photo
                </button>
              </div>
            </div>

            {/* Dynamic View Display Container */}
            <div className="position-relative mx-auto rounded-4 overflow-hidden shadow-lg border border-subtle" style={{ height: "480px" }}>
              {activeView === "3d" ? (
                <HeroHardwareScene />
              ) : (
                <div className="position-relative w-100 h-100">
                  <Image
                    src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1000&q=80"
                    alt="Modern executive workstation setup with Nexora hardware"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    className="position-absolute bottom-0 start-0 m-4 p-3 rounded-3 shadow-lg bg-white border border-subtle d-flex align-items-center gap-3"
                    style={{ maxWidth: "320px", backdropFilter: "blur(8px)", backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                  >
                    <div className="bg-primary text-white rounded-circle p-2.5 d-flex align-items-center justify-content-center">
                      <i className="bi bi-award fs-4" />
                    </div>
                    <div>
                      <div className="fw-bold text-dark small">Enterprise Standard</div>
                      <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                        Backed by our 3-year commercial hardware guarantee
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
