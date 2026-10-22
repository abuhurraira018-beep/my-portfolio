"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";
import { AccountType } from "@/types/auth";
import { siteConfig } from "@/data/site-config";

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") || "/products";
  const typeParam = (searchParams.get("type") as AccountType) || "corporate";

  const { register } = useAuth();
  const { showToast } = useShop();

  const [accountType, setAccountType] = useState<AccountType>(typeParam);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    if (!password.trim() || password.length < 4) {
      setErrorMessage("Password must be at least 4 characters.");
      return;
    }

    if (!agreed) {
      setErrorMessage("Please accept the commercial terms of service to proceed.");
      return;
    }

    const res = register({
      name,
      email,
      company,
      accountType,
      password,
    });

    if (res.success) {
      showToast(`Account created! Welcome to NEXORA, ${name}.`, "success");
      router.push(redirectTarget);
    } else {
      setErrorMessage(res.message || "Failed to create account.");
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#f8fafc", minHeight: "85vh" }}>
      <div className="container py-lg-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
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
              <h1 className="h4 fw-bold text-dark mb-1">Create Commercial Account</h1>
              <p className="text-muted small mb-0">
                Unlock wholesale product pricing, customized procurement, and tax-exempt ordering.
              </p>
            </div>

            {/* Registration Card */}
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
              {/* Account Type Selector Pills */}
              <div className="d-flex p-1 bg-light rounded-3 mb-4">
                <button
                  type="button"
                  className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold ${
                    accountType === "corporate" ? "bg-white text-primary shadow-sm" : "text-muted"
                  }`}
                  onClick={() => setAccountType("corporate")}
                >
                  <i className="bi bi-buildings me-1.5" />
                  Corporate Account
                </button>
                <button
                  type="button"
                  className={`btn btn-sm flex-grow-1 rounded-2 fw-semibold ${
                    accountType === "individual" ? "bg-white text-primary shadow-sm" : "text-muted"
                  }`}
                  onClick={() => setAccountType("individual")}
                >
                  <i className="bi bi-person-workspace me-1.5" />
                  Studio / Individual
                </button>
              </div>

              {errorMessage && (
                <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-exclamation-octagon-fill" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="regName" className="form-label small fw-semibold text-dark">
                      Contact Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      id="regName"
                      type="text"
                      className="form-control"
                      placeholder="e.g. Rachel Adams"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="regEmail" className="form-label small fw-semibold text-dark">
                      {accountType === "corporate" ? "Work Email Address" : "Professional Email"}{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      id="regEmail"
                      type="email"
                      className="form-control"
                      placeholder="rachel.adams@enterprise.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="regCompany" className="form-label small fw-semibold text-dark">
                      {accountType === "corporate" ? "Organization / Company Name" : "Studio / Practice Name"}
                    </label>
                    <input
                      id="regCompany"
                      type="text"
                      className="form-control"
                      placeholder={accountType === "corporate" ? "Acme Technologies LLC" : "Adams Studio"}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="regPassword" className="form-label small fw-semibold text-dark">
                      Create Password <span className="text-danger">*</span>
                    </label>
                    <input
                      id="regPassword"
                      type="password"
                      className="form-control"
                      placeholder="Minimum 4 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="termsCheck"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                      />
                      <label className="form-check-label small text-muted" htmlFor="termsCheck">
                        I agree to the commercial terms of service, warranty provisions, and demo privacy policy.
                      </label>
                    </div>
                  </div>

                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-primary-custom w-100 py-2.5 fw-semibold">
                      <i className="bi bi-person-check me-2" />
                      Complete Account Registration
                    </button>
                  </div>
                </div>
              </form>

              {/* Bottom Login Link */}
              <div className="text-center mt-4 pt-3 border-top small text-muted">
                Already registered?{" "}
                <Link
                  href={`/login?type=${accountType}&redirect=${encodeURIComponent(redirectTarget)}`}
                  className="text-primary fw-bold text-decoration-none"
                >
                  Sign in to your account
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

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-5 text-center" style={{ minHeight: "80vh" }}>
          <div className="spinner-border text-primary" role="status" />
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
