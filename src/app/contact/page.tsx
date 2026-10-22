"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your full name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errs.subject = "Please select or enter an inquiry subject.";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: "#f8fafc" }}>
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
              Contact
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">Direct Communication</span>
          <h1 className="display-5 fw-bold text-dark mb-3">Get in Touch with Our Commercial Team</h1>
          <p className="lead text-muted fs-6" style={{ maxWidth: "620px", margin: "0 auto", lineHeight: "1.8" }}>
            Have a question about bulk enterprise ordering, hardware technical specifications, or warranty assistance? We are here to help.
          </p>
        </div>

        <div className="row g-4 mb-5">
          {/* Contact Details Column */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white h-100">
              <h2 className="h5 fw-bold text-dark mb-4">Enterprise Coordinates</h2>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 bg-light rounded-3 text-primary">
                    <i className="bi bi-geo-alt fs-5" />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold text-dark mb-1">Corporate Headquarters</h3>
                    <p className="text-muted small mb-0">{siteConfig.contact.address}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 bg-light rounded-3 text-primary">
                    <i className="bi bi-envelope fs-5" />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold text-dark mb-1">Electronic Inquiries</h3>
                    <p className="text-muted small mb-0">General: {siteConfig.contact.email}</p>
                    <p className="text-muted small mb-0">Support: {siteConfig.contact.supportEmail}</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 bg-light rounded-3 text-primary">
                    <i className="bi bi-telephone fs-5" />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold text-dark mb-1">Direct Phone Lines</h3>
                    <p className="text-muted small mb-0">{siteConfig.contact.phone}</p>
                    <p className="text-muted small mb-0">Toll-free across North America</p>
                  </div>
                </div>

                <div className="d-flex align-items-start gap-3">
                  <div className="p-3 bg-light rounded-3 text-primary">
                    <i className="bi bi-clock fs-5" />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold text-dark mb-1">Operating Hours</h3>
                    <p className="text-muted small mb-0">{siteConfig.contact.hours}</p>
                  </div>
                </div>
              </div>

              {/* Demo Notice Box */}
              <div className="mt-4 pt-4 border-top">
                <div className="p-3 rounded-3 bg-light text-muted small">
                  <i className="bi bi-info-circle text-primary me-2" />
                  This contact system is configured for portfolio demonstration. Submitted inquiries will display demo confirmation without transmitting live emails.
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white h-100">
              <h2 className="h5 fw-bold text-dark mb-2">Send an Inquiry</h2>
              <p className="text-muted small mb-4">
                Please complete the form below and an enterprise representative will respond promptly.
              </p>

              {isSubmitted ? (
                <div className="alert alert-success bg-success bg-opacity-10 border-success p-4 rounded-4 text-center my-auto">
                  <div className="p-3 bg-success bg-opacity-25 text-success rounded-circle d-inline-flex mb-3">
                    <i className="bi bi-check-lg fs-2" />
                  </div>
                  <h3 className="h5 fw-bold text-dark mb-2">Demo Inquiry Submitted!</h3>
                  <p className="text-muted small mb-3">
                    Thank you for reaching out. In an active production environment, this message would be routed directly to our CRM desk.
                  </p>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary-custom"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label htmlFor="contactName" className="form-label small fw-semibold text-dark">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        id="contactName"
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>

                    <div className="col-sm-6">
                      <label htmlFor="contactEmail" className="form-label small fw-semibold text-dark">
                        Business Email <span className="text-danger">*</span>
                      </label>
                      <input
                        id="contactEmail"
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        placeholder="name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="contactSubject" className="form-label small fw-semibold text-dark">
                        Inquiry Subject <span className="text-danger">*</span>
                      </label>
                      <select
                        id="contactSubject"
                        className={`form-select ${errors.subject ? "is-invalid" : ""}`}
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      >
                        <option value="">Select an inquiry type...</option>
                        <option value="B2B Order Quote">B2B Order Quote & Bulk Invoicing</option>
                        <option value="Hardware Consultation">Hardware Consultation & Samples</option>
                        <option value="Order Tracking">Existing Order Tracking</option>
                        <option value="Warranty / Technical">Warranty & Technical Support</option>
                        <option value="General Question">General Commercial Question</option>
                      </select>
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>

                    <div className="col-12">
                      <label htmlFor="contactMessage" className="form-label small fw-semibold text-dark">
                        Your Message <span className="text-danger">*</span>
                      </label>
                      <textarea
                        id="contactMessage"
                        rows={5}
                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                        placeholder="Detail your requirements, team size, or specific hardware questions..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>

                    <div className="col-12 mt-4">
                      <button type="submit" className="btn btn-primary-custom w-100 py-2.5">
                        <i className="bi bi-send me-2" />
                        Send Commercial Inquiry
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Commercial FAQ Accordion */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white">
          <div className="text-center mb-4">
            <span className="section-tag">Common Inquiries</span>
            <h2 className="h4 fw-bold text-dark">Frequently Asked Questions</h2>
          </div>

          <div className="row g-4">
            {[
              {
                q: "What payment terms are offered for corporate orders?",
                a: "Qualified businesses can apply for Net-30 credit terms. We also support ACH direct transfers, major corporate credit cards, and consolidated monthly billing.",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes. NEXORA coordinates palletized and parcel freight to over 40 countries with complete customs declaration documentation and tracked courier services.",
              },
              {
                q: "What is your warranty policy on workplace hardware?",
                a: "All items include a standard 3-year commercial warranty against manufacturing defects, with expedited hardware replacement for registered corporate accounts.",
              },
              {
                q: "Can we request sample units for evaluation?",
                a: "Absolutely. For fleet orders of 10 or more units, we provide 30-day evaluation units with prepaid return shipping.",
              },
            ].map((item, idx) => (
              <div key={idx} className="col-md-6">
                <div className="p-3 bg-light rounded-3 h-100">
                  <h3 className="h6 fw-bold text-dark mb-2">
                    <i className="bi bi-question-circle text-primary me-2" />
                    {item.q}
                  </h3>
                  <p className="small text-muted mb-0" style={{ lineHeight: "1.7" }}>
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
