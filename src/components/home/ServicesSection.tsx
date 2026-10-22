"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export const ServicesSection: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const services = [
    {
      icon: "bi-diagram-3",
      title: "Product Consultation",
      description: "Expert advice on hardware interoperability, workspace ergonomics, and fleet device compatibility tailored to your team.",
      link: "/services#consultation",
    },
    {
      icon: "bi-headset",
      title: "Customer Support",
      description: "Dedicated account managers providing rapid troubleshooting, product replacement coordination, and technical documentation.",
      link: "/services#support",
    },
    {
      icon: "bi-box-seam",
      title: "Order Assistance",
      description: "Custom bulk invoicing, scheduled freight logistics, multi-location delivery, and corporate purchase order processing.",
      link: "/services#orders",
    },
    {
      icon: "bi-buildings",
      title: "Business Solutions",
      description: "Turnkey enterprise packages for corporate headquarters, hybrid workforces, and executive conference spaces.",
      link: "/services#solutions",
    },
  ];

  return (
    <section className="py-5 py-lg-6" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">Enterprise Capabilities</span>
          <h2 className="section-title h2 mb-2">Dedicated Commercial Services</h2>
          <p className="section-desc mb-0" style={{ maxWidth: "620px", margin: "0 auto" }}>
            Beyond premium hardware, NEXORA delivers operational support and procurement consultation designed to make workplace expansion effortless.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {services.map((service, idx) => {
            const targetLink = isAuthenticated
              ? service.link
              : `/portal?redirect=${encodeURIComponent(service.link)}`;

            return (
              <div key={idx} className="col-12 col-md-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white nexora-card d-flex flex-column">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary mb-3.5"
                    style={{ width: "52px", height: "52px" }}
                  >
                    <i className={`bi ${service.icon} fs-4`} />
                  </div>
                  <h3 className="h6 fw-bold text-dark mb-2">{service.title}</h3>
                  <p className="text-muted small mb-4 flex-grow-1" style={{ lineHeight: "1.6" }}>
                    {service.description}
                  </p>
                  <Link
                    href={targetLink}
                    className="fw-semibold small text-primary d-inline-flex align-items-center gap-1.5 text-decoration-none hover-primary mt-auto"
                  >
                    <span>Learn more</span>
                    <i className="bi bi-chevron-right small" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
