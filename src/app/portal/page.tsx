"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";

const AmbientParticles = dynamic(() => import("@/components/3d/AmbientParticles"), {
  ssr: false,
});

function PortalContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/products";
  const { loginAsDemo, isAuthenticated } = useAuth();
  const { showToast } = useShop();

  const handleInstantDemoLogin = (accountType: "corporate" | "individual") => {
    loginAsDemo(accountType);
    showToast(
      `Welcome! Logged in as ${accountType === "corporate" ? "Corporate Enterprise Partner" : "Professional Studio Member"}.`,
      "success"
    );
    router.push(redirectTarget);
  };

  return (
    <div className="py-5 position-relative overflow-hidden" style={{ backgroundColor: "#0c111d", minHeight: "88vh" }}>
      {/* 3D Ambient Particles */}
      <AmbientParticles particleCount={40} color="#38bdf8" />

      <div className="container py-lg-4 position-relative" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 text-white">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-white bg-opacity-10 border border-white border-opacity-10 mb-3">
            <span className="badge rounded-pill bg-primary p-1">
              <i className="bi bi-shield-check text-white" />
            </span>
            <span className="small text-uppercase tracking-wider fw-semibold text-white" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
              NEXORA COMMERCIAL GATEWAY
            </span>
          </div>

          <h1 className="display-6 fw-bold mb-3 text-white">
            Select Your Business Portal
          </h1>
          <p className="text-secondary small mb-0" style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.7" }}>
            Every professional commercial platform provides tailored account gateways. Select the access tier that matches your organization to unlock catalog pricing, purchase orders, and fleet procurement.
          </p>
        </div>

        {/* Portal Options Grid */}
        <div className="row g-4 justify-content-center mb-5">
          {/* Option 1: Corporate & Enterprise B2B */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-lg rounded-4 p-4 p-lg-4.5 bg-dark text-white border border-secondary border-opacity-25 d-flex flex-column position-relative overflow-hidden" style={{ backgroundColor: "#151c2d" }}>
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-50 small rounded-pill px-2.5 py-1">
                  B2B Commercial
                </span>
              </div>

              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-15 text-primary mb-3.5"
                style={{ width: "56px", height: "56px" }}
              >
                <i className="bi bi-buildings fs-3" />
              </div>

              <h2 className="h5 fw-bold text-white mb-2">Corporate & Enterprise</h2>
              <p className="text-secondary small mb-4" style={{ lineHeight: "1.6" }}>
                For enterprises, procurement leads, and corporate divisions requiring bulk orders and formal billing.
              </p>

              <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary mb-4 flex-grow-1">
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-primary" />
                  <span>Consolidated Net-30 monthly invoicing</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-primary" />
                  <span>Dedicated corporate procurement specialist</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-primary" />
                  <span>Multi-location fleet hardware dispatch</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-primary" />
                  <span>Asset tracking & commercial warranty tier</span>
                </li>
              </ul>

              <div className="d-flex flex-column gap-2 mt-auto">
                <Link
                  href={`/login?type=corporate&redirect=${encodeURIComponent(redirectTarget)}`}
                  className="btn btn-primary-custom w-100 py-2.5 d-flex align-items-center justify-content-center gap-2"
                >
                  <span>Sign In as Corporate Client</span>
                  <i className="bi bi-arrow-right" />
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light w-100 py-2"
                  style={{ opacity: 0.85 }}
                  onClick={() => handleInstantDemoLogin("corporate")}
                >
                  <i className="bi bi-lightning-charge me-1.5 text-warning" />
                  Instant Demo Login (Corporate)
                </button>
              </div>
            </div>
          </div>

          {/* Option 2: Individual & Professional Studio */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-lg rounded-4 p-4 p-lg-4.5 bg-dark text-white border border-secondary border-opacity-25 d-flex flex-column position-relative overflow-hidden" style={{ backgroundColor: "#151c2d" }}>
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-info bg-opacity-25 text-info border border-info border-opacity-50 small rounded-pill px-2.5 py-1">
                  Professional / Studio
                </span>
              </div>

              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 bg-info bg-opacity-15 text-info mb-3.5"
                style={{ width: "56px", height: "56px" }}
              >
                <i className="bi bi-person-workspace fs-3" />
              </div>

              <h2 className="h5 fw-bold text-white mb-2">Individual & Studio</h2>
              <p className="text-secondary small mb-4" style={{ lineHeight: "1.6" }}>
                For architects, design studios, consultants, and remote professionals outfitting private offices.
              </p>

              <ul className="list-unstyled d-flex flex-column gap-2 small text-secondary mb-4 flex-grow-1">
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-info" />
                  <span>Direct card checkout & instant receipts</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-info" />
                  <span>Express personal courier fulfillment</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-info" />
                  <span>3-year manufacturer hardware warranty</span>
                </li>
                <li className="d-flex align-items-center gap-2">
                  <i className="bi bi-check-circle-fill text-info" />
                  <span>Saved wishlist & order tracking telemetry</span>
                </li>
              </ul>

              <div className="d-flex flex-column gap-2 mt-auto">
                <Link
                  href={`/login?type=individual&redirect=${encodeURIComponent(redirectTarget)}`}
                  className="btn btn-outline-custom text-white border-secondary w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 hover-bg-light"
                >
                  <span>Sign In as Professional Studio</span>
                  <i className="bi bi-arrow-right" />
                </Link>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light w-100 py-2"
                  style={{ opacity: 0.85 }}
                  onClick={() => handleInstantDemoLogin("individual")}
                >
                  <i className="bi bi-lightning-charge me-1.5 text-info" />
                  Instant Demo Login (Studio)
                </button>
              </div>
            </div>
          </div>

          {/* Option 3: Quick Evaluation Showcase (One-Click Instant Access) */}
          <div className="col-12 col-md-8 col-lg-4">
            <div className="card h-100 border-0 shadow-lg rounded-4 p-4 p-lg-4.5 bg-dark text-white border border-warning border-opacity-30 d-flex flex-column position-relative overflow-hidden" style={{ backgroundColor: "#171a26" }}>
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-warning bg-opacity-25 text-warning border border-warning border-opacity-50 small rounded-pill px-2.5 py-1">
                  Portfolio Review Mode
                </span>
              </div>

              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-15 text-warning mb-3.5"
                style={{ width: "56px", height: "56px" }}
              >
                <i className="bi bi-stars fs-3" />
              </div>

              <h2 className="h5 fw-bold text-white mb-2">Evaluator Quick Pass</h2>
              <p className="text-secondary small mb-4" style={{ lineHeight: "1.6" }}>
                Designed specifically for employers, clients, and portfolio reviewers who want to explore all restricted routes immediately without filling forms.
              </p>

              <div className="p-3 rounded-3 bg-white bg-opacity-5 border border-white border-opacity-10 small mb-4 flex-grow-1">
                <div className="fw-semibold text-warning mb-1">Pre-configured Executive Profile:</div>
                <div className="text-secondary" style={{ fontSize: "0.78rem" }}>
                  &bull; Alexander Sterling (Acme Enterprise)<br />
                  &bull; Unrestricted access to /products, /cart, /wishlist, /admin/products, and corporate invoicing.
                </div>
              </div>

              <div className="d-flex flex-column gap-2 mt-auto">
                <button
                  type="button"
                  className="btn btn-warning fw-bold text-dark w-100 py-2.5 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  onClick={() => handleInstantDemoLogin("corporate")}
                >
                  <i className="bi bi-box-arrow-in-right fs-5" />
                  <span>One-Click Instant Enter</span>
                </button>
                <div className="text-center text-secondary small" style={{ fontSize: "0.72rem" }}>
                  Bypasses credential inputs & persists in browser session
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar in Portal */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-4 border-top border-secondary border-opacity-25 text-secondary small gap-3">
          <div>
            Don&apos;t have a commercial account yet?{" "}
            <Link href={`/register?redirect=${encodeURIComponent(redirectTarget)}`} className="text-primary fw-semibold text-decoration-underline ms-1">
              Register New Organization
            </Link>
          </div>
          <div className="d-flex gap-3">
            <Link href="/" className="text-secondary text-decoration-none hover-white">
              <i className="bi bi-arrow-left me-1" />
              Return to Public Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortalPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center text-white" style={{ minHeight: "80vh" }}>
          <div className="spinner-border text-primary" role="status" />
        </div>
      }
    >
      <PortalContent />
    </Suspense>
  );
}
