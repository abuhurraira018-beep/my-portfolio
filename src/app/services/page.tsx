import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Commercial Services",
  description: "Enterprise consultation, fleet procurement, and dedicated customer support by NEXORA.",
};

export default function ServicesPage() {
  const serviceDetails = [
    {
      id: "consultation",
      icon: "bi-diagram-3",
      title: "Product Consultation & Ergonomic Audits",
      desc: "Selecting hardware across divergent team roles can be complex. Our engineering consultants evaluate your workspace floor plans, noise levels, and computational workflows to recommend cohesive equipment configurations.",
      bullets: [
        "Biomechanical seating & motorized desk audits",
        "Acoustic perimeter testing for conference spaces",
        "Peripheral compatibility matrix for macOS, Windows & Linux",
        "Pilot sample program for departmental trial evaluation",
      ],
    },
    {
      id: "support",
      icon: "bi-headset",
      title: "Enterprise Customer Support",
      desc: "Commercial clients receive dedicated account liaisons. We eliminate ticketing bottlenecks by offering phone and email priority lines with guaranteed response windows.",
      bullets: [
        "Priority 4-hour business day email response time",
        "Immediate express replacement on warranty claims",
        "Dedicated account liaison for businesses with 10+ seats",
        "Comprehensive driver, firmware, and user guides library",
      ],
    },
    {
      id: "orders",
      icon: "bi-box-seam",
      title: "Order Assistance & Fleet Logistics",
      desc: "Whether outfitting a single new floor or coordinating staged deliveries across international branches, our logistics team simplifies freight management.",
      bullets: [
        "Consolidated electronic invoicing & net-30 terms",
        "Customized multi-location palletized shipping",
        "Scheduled delivery windows with dockside notifications",
        "Serialized asset tag tracking support on dispatch",
      ],
    },
    {
      id: "solutions",
      icon: "bi-buildings",
      title: "Turnkey Business Solutions",
      desc: "End-to-end workspace hardware bundles combining high-resolution curved monitors, ergonomic seating, wireless fast-charging hubs, and conference speakerphones into pre-vetted bundles.",
      bullets: [
        "Executive Suite hardware packages",
        "Engineering & Developer workstation bundles",
        "Acoustically tuned huddle room kits",
        "Remote employee onboarding hardware stipends",
      ],
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
              Services
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="section-tag">B2B Solutions</span>
          <h1 className="display-5 fw-bold text-dark mb-3">
            Enterprise Services Designed for Seamless Scalability
          </h1>
          <p className="lead text-muted fs-6" style={{ maxWidth: "680px", margin: "0 auto", lineHeight: "1.8" }}>
            From individual product consultations to international fleet procurement, NEXORA provides the operational backbone your modern enterprise demands.
          </p>
        </div>

        {/* Detailed Service Cards */}
        <div className="row g-4 mb-5">
          {serviceDetails.map((service) => (
            <div key={service.id} id={service.id} className="col-12 col-lg-6">
              <div className="card h-100 border-0 shadow-sm p-4 p-md-5 rounded-4 bg-white nexora-card">
                <div
                  className="p-3 bg-primary bg-opacity-10 text-primary rounded-3 d-inline-flex align-items-center justify-content-center mb-3.5"
                  style={{ width: "54px", height: "54px" }}
                >
                  <i className={`bi ${service.icon} fs-4`} />
                </div>
                <h2 className="h5 fw-bold text-dark mb-3">{service.title}</h2>
                <p className="text-muted small mb-4" style={{ lineHeight: "1.7" }}>
                  {service.desc}
                </p>
                <div className="pt-3 border-top mt-auto">
                  <h3 className="h6 fw-semibold text-dark small mb-2">Key Service Highlights:</h3>
                  <ul className="list-unstyled d-flex flex-column gap-2 small text-muted m-0">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2">
                        <i className="bi bi-check2 text-primary mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Steps */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-lg-5 bg-white mb-5">
          <div className="text-center mb-5">
            <span className="section-tag">How It Works</span>
            <h2 className="h3 fw-bold text-dark">Our 4-Step Procurement Process</h2>
          </div>
          <div className="row g-4">
            {[
              { step: "01", title: "Needs Discovery", desc: "Share your team size, workplace parameters, and device standards with our specialists." },
              { step: "02", title: "Custom Proposal", desc: "Receive an itemized quote with volume discounts, freight estimates, and delivery timeline." },
              { step: "03", title: "Sample Testing", desc: "Optionally test sample evaluation units at your corporate headquarters for 30 days." },
              { step: "04", title: "Staged Dispatch", desc: "Direct insured shipment with tracking numbers and post-installation warranty support." },
            ].map((p, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="p-3 rounded-3 bg-light h-100">
                  <div className="fw-bold fs-3 text-primary mb-2">{p.step}</div>
                  <h3 className="h6 fw-bold text-dark mb-1">{p.title}</h3>
                  <p className="small text-muted mb-0">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 text-center bg-primary text-white">
          <h2 className="h3 fw-bold mb-2 text-white">Ready to Discuss Your Corporate Workspace?</h2>
          <p className="text-white text-opacity-75 small mb-4" style={{ maxWidth: "550px", margin: "0 auto" }}>
            Connect with our enterprise solutions desk to explore custom pricing and tailored equipment packages.
          </p>
          <div>
            <Link href="/contact" className="btn btn-light text-primary fw-bold px-4 py-2.5">
              Request a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
