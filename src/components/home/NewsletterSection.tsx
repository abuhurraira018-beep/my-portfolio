"use client";

import React, { useState } from "react";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "duplicate" | "error">("idle");
  const [submittedEmails, setSubmittedEmails] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setStatus("error");
      return;
    }

    // Check duplicate
    if (submittedEmails.includes(cleanEmail)) {
      setStatus("duplicate");
      return;
    }

    setSubmittedEmails((prev) => [...prev, cleanEmail]);
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-5 py-lg-6 position-relative text-white" style={{ backgroundColor: "#101828" }}>
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-lg-8 col-xl-6">
            <span
              className="badge px-3 py-1.5 rounded-pill mb-3"
              style={{ backgroundColor: "rgba(37, 99, 235, 0.2)", color: "#93c5fd" }}
            >
              Industry Insights
            </span>
            <h2 className="display-6 fw-bold mb-3 text-white">
              Stay Ahead of Workplace Innovation
            </h2>
            <p className="text-secondary small mb-4" style={{ lineHeight: "1.7" }}>
              Subscribe to the Nexora briefing. Receive quarterly commercial hardware roundups, ergonomic research, and early access to enterprise product lines.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="mb-3" noValidate>
              <div className="row g-2 justify-content-center">
                <div className="col-12 col-sm-8">
                  <label htmlFor="newsletterEmail" className="visually-hidden">
                    Business Email Address
                  </label>
                  <input
                    type="email"
                    id="newsletterEmail"
                    className="form-control form-control-lg bg-dark text-white border-secondary border-opacity-50 py-2.5 px-3 fs-6 rounded-3"
                    placeholder="Enter your business email..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status !== "idle") setStatus("idle");
                    }}
                    required
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <button type="submit" className="btn btn-primary-custom btn-lg w-100 py-2.5 fs-6">
                    Subscribe
                  </button>
                </div>
              </div>
            </form>

            {/* Feedback Messages */}
            {status === "success" && (
              <div className="alert alert-success bg-success bg-opacity-25 border-success text-white small py-2 px-3 rounded-3 mt-3">
                <i className="bi bi-check-circle-fill me-2" />
                Demo subscription received! No real emails are sent during this portfolio demonstration.
              </div>
            )}
            {status === "duplicate" && (
              <div className="alert alert-warning bg-warning bg-opacity-25 border-warning text-white small py-2 px-3 rounded-3 mt-3">
                <i className="bi bi-info-circle-fill me-2" />
                This email address is already subscribed in the demo session.
              </div>
            )}
            {status === "error" && (
              <div className="alert alert-danger bg-danger bg-opacity-25 border-danger text-white small py-2 px-3 rounded-3 mt-3">
                <i className="bi bi-exclamation-triangle-fill me-2" />
                Please enter a valid business email address.
              </div>
            )}

            <div className="text-secondary small mt-3" style={{ fontSize: "0.75rem" }}>
              Zero spam guarantee. This is a front-end demo with no live server data retention.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
