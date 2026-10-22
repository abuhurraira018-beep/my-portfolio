"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";
import { AccountType } from "@/types/auth";
import { siteConfig } from "@/data/site-config";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/products";
  const typeParam = (searchParams.get("type") as AccountType) || "corporate";

  const { login, loginAsDemo, isAuthenticated } = useAuth();
  const { showToast } = useShop();

  const [accountType, setAccountType] = useState<AccountType>(typeParam);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeParam && (typeParam === "corporate" || typeParam === "individual")) {
      setAccountType(typeParam);
    }
  }, [typeParam]);

  // If already authenticated, redirect
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTarget);
    }
  }, [isAuthenticated, redirectTarget, router]);

  const handleFillDemo = () => {
    if (accountType === "corporate") {
      setEmail("procurement@acme-enterprises.com");
      setPassword("Enterprise2024!");
    } else {
      setEmail("clara.dubois@studioworkspace.design");
      setPassword("StudioDesign2024!");
    }
    setErrorMessage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    if (!password.trim() || password.length < 4) {
      setErrorMessage("Password must be at least 4 characters.");
      return;
    }

    const res = login(email, password, accountType);
    if (res.success) {
      showToast(`Welcome back! Successfully logged into ${accountType === "corporate" ? "Corporate" : "Studio"} account.`, "success");
      router.push(redirectTarget);
    } else {
      setErrorMessage(res.message || "Failed to authenticate.");
    }
  };

  const handleQuickDemoBypass = () => {
    loginAsDemo(accountType);
    showToast("Signed in using demo credentials.", "success");
    router.push(redirectTarget);
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#f8fafc", minHeight: "85vh" }}>
      <div className="container py-lg-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-5">
            {/* Brand Logo & Heading */}
            <div className="text-center mb-4">
              <Link href="/" className="d-inline-flex align-items-center gap-2 text-decoration-none mb-3">
                <span
                  className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-3 shadow-sm"
                  style={{ width: "42px", height: "42px" }}
                >
                  <i className="bi bi-intersect fs-4" />
                </span>
                <span className="fw-bolder fs-3 text-dark">{siteConfig.name}</span>
              </Link>
              <h1 className="h4 fw-bold text-dark mb-1">Commercial Account Sign In</h1>
              <p className="text-muted small mb-0">
                Access your procurement dashboard, approved orders, and catalog pricing.
              </p>
            </div>

            {/* Login Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              {/* Account Type Selector Pills */}
              <div className="d-flex p-1 bg-light rounded-3 mb-4">
                <button
                  type="button"
                  className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold ${
                    accountType === "corporate" ? "bg-white text-primary shadow-sm" : "text-muted"
                  }`}
                  onClick={() => {
                    setAccountType("corporate");
                    setErrorMessage("");
                  }}
                >
                  <i className="bi bi-buildings me-1.5" />
                  Corporate B2B
                </button>
                <button
                  type="button"
                  className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold ${
                    accountType === "individual" ? "bg-white text-primary shadow-sm" : "text-muted"
                  }`}
                  onClick={() => {
                    setAccountType("individual");
                    setErrorMessage("");
                  }}
                >
                  <i className="bi bi-person-workspace me-1.5" />
                  Studio / Pro
                </button>
              </div>

              {/* Portal Change Link */}
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
                <span className="small text-muted" style={{ fontSize: "0.78rem" }}>
                  Selected Portal: <strong>{accountType === "corporate" ? "Corporate & Enterprise" : "Individual & Studio"}</strong>
                </span>
                <Link
                  href={`/portal?redirect=${encodeURIComponent(redirectTarget)}`}
                  className="small text-primary text-decoration-none fw-semibold"
                  style={{ fontSize: "0.78rem" }}
                >
                  Switch Gateway &rarr;
                </Link>
              </div>

              {errorMessage && (
                <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-exclamation-octagon-fill" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="loginEmail" className="form-label small fw-semibold text-dark">
                    {accountType === "corporate" ? "Work / Corporate Email" : "Professional Email"}
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-envelope" />
                    </span>
                    <input
                      id="loginEmail"
                      type="email"
                      className="form-control border-start-0 ps-0"
                      placeholder={accountType === "corporate" ? "procurement@company.com" : "name@studio.design"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <label htmlFor="loginPassword" className="form-label small fw-semibold text-dark m-0">
                      Security Password
                    </label>
                    <button
                      type="button"
                      className="btn btn-link btn-sm p-0 text-decoration-none text-muted"
                      style={{ fontSize: "0.75rem" }}
                      onClick={handleFillDemo}
                    >
                      <i className="bi bi-magic me-1 text-primary" />
                      Auto-fill Demo
                    </button>
                  </div>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0 text-muted">
                      <i className="bi bi-lock" />
                    </span>
                    <input
                      id="loginPassword"
                      type="password"
                      className="form-control border-start-0 ps-0"
                      placeholder="Enter account password..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label className="form-check-label small text-muted" htmlFor="rememberMe">
                      Remember this workstation
                    </label>
                  </div>
                  <span className="small text-muted" style={{ fontSize: "0.75rem" }}>
                    Demo Mode Enabled
                  </span>
                </div>

                <button type="submit" className="btn btn-primary-custom w-100 py-2.5 fw-semibold mb-3">
                  <i className="bi bi-box-arrow-in-right me-2" />
                  Sign In to Enterprise Workspace
                </button>

                {/* Instant Quick Pass */}
                <button
                  type="button"
                  className="btn btn-outline-custom w-100 py-2 small d-flex align-items-center justify-content-center gap-1.5"
                  onClick={handleQuickDemoBypass}
                >
                  <i className="bi bi-lightning-charge-fill text-warning" />
                  <span>One-Click Instant Demo Login</span>
                </button>
              </form>

              {/* Bottom Registration Link */}
              <div className="text-center mt-4 pt-3 border-top small text-muted">
                New enterprise customer?{" "}
                <Link
                  href={`/register?type=${accountType}&redirect=${encodeURIComponent(redirectTarget)}`}
                  className="text-primary fw-bold text-decoration-none"
                >
                  Create an account
                </Link>
              </div>
            </div>

            {/* Back to Home Link */}
            <div className="text-center mt-4">
              <Link href="/" className="text-muted small text-decoration-none hover-primary">
                <i className="bi bi-arrow-left me-1" />
                Return to Public Home Page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center" style={{ minHeight: "80vh" }}>
          <div className="spinner-border text-primary" role="status" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
