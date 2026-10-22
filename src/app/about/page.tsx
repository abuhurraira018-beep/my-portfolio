import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";

export const metadata = {
  title: "About Us",
  description: "Learn about NEXORA's mission, quality standards, and dedication to modern commercial workspace hardware.",
};

export default function AboutPage() {
  const values = [
    {
      icon: "bi-gem",
      title: "Material Integrity",
      desc: "We prioritize aerospace-grade alloys, FSC-certified bamboo, precision mechanical switches, and durable upholstery built to withstand heavy daily use.",
    },
    {
      icon: "bi-person-gear",
      title: "Ergonomic Science",
      desc: "Our catalog selections adhere to certified biomechanical posture principles to reduce repetitive strain and elevate cognitive focus.",
    },
    {
      icon: "bi-arrow-repeat",
      title: "Circular Responsibility",
      desc: "We prioritize modularity and field-repairable components, reducing corporate e-waste and supporting long-term hardware lifecycles.",
    },
    {
      icon: "bi-shield-check",
      title: "Direct Accountability",
      desc: "No outsourced call centers or automated loops. Every enterprise partner is paired with a knowledgeable hardware specialist.",
    },
  ];

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
              About Us
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">About Nexora</span>
          <h1 className="display-5 fw-bold text-dark mb-3">
            Empowering Modern Enterprises Through Superior Workspace Hardware
          </h1>
          <p className="lead text-muted fs-6" style={{ maxWidth: "700px", margin: "0 auto", lineHeight: "1.8" }}>
            At NEXORA, we believe that the physical tools professionals touch every day—from their keyboard and chair to acoustic headsets—fundamentally define their workplace clarity and well-being.
          </p>
        </div>

        {/* Story Section */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white mb-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="text-uppercase text-primary fw-bold small" style={{ letterSpacing: "0.08em" }}>
                Our Foundation
              </span>
              <h2 className="h3 fw-bold text-dark mb-3 mt-1">
                From Commercial Need to Standard-Setting Quality
              </h2>
              <p className="text-muted" style={{ lineHeight: "1.8" }}>
                Founded with a focus on equipping tech enterprises and design practices, NEXORA was conceived to bridge the gap between consumer retail gadgets and rigid industrial procurement.
              </p>
              <p className="text-muted" style={{ lineHeight: "1.8" }}>
                We curate, test, and deliver hardware tailored to executive workstations, hybrid workforces, and collaborative studios. Our products combine clean minimalist design with commercial durability.
              </p>
              <div className="d-flex align-items-center gap-4 pt-3 border-top">
                <div>
                  <div className="fw-bold fs-4 text-dark">5+</div>
                  <div className="small text-muted">Curated Categories</div>
                </div>
                <div className="border-start ps-4">
                  <div className="fw-bold fs-4 text-dark">3-Year</div>
                  <div className="small text-muted">Commercial Warranty</div>
                </div>
                <div className="border-start ps-4">
                  <div className="fw-bold fs-4 text-dark">100%</div>
                  <div className="small text-muted">Inspected Hardware</div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="position-relative rounded-4 overflow-hidden border" style={{ height: "380px" }}>
                <Image
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80"
                  alt="Nexora precision keyboard engineering"
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-5">
          <div className="text-center mb-5">
            <span className="section-tag">Principles</span>
            <h2 className="h3 fw-bold text-dark">Our Core Commitments</h2>
          </div>
          <div className="row g-4">
            {values.map((v, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white nexora-card">
                  <div
                    className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className={`bi ${v.icon} fs-4`} />
                  </div>
                  <h3 className="h6 fw-bold text-dark mb-2">{v.title}</h3>
                  <p className="text-muted small mb-0" style={{ lineHeight: "1.7" }}>
                    {v.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="card border-0 shadow-sm rounded-4 p-5 bg-dark text-white text-center" style={{ backgroundColor: "#101828" }}>
          <h2 className="h3 fw-bold mb-3 text-white">Equip Your Team with Nexora</h2>
          <p className="text-secondary small mb-4" style={{ maxWidth: "540px", margin: "0 auto", lineHeight: "1.7" }}>
            Reach out to our B2B commercial advisors to discuss bulk pricing, scheduled logistics, or customized workspace sample testing.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link href="/products" className="btn btn-primary-custom px-4">
              Explore Products
            </Link>
            <Link href="/contact" className="btn btn-outline-light px-4">
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
