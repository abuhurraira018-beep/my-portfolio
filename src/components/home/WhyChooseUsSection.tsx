import React from "react";

export const WhyChooseUsSection: React.FC = () => {
  const points = [
    {
      icon: "bi-check-all",
      title: "Commercial-Grade Testing",
      desc: "Every product is evaluated for mechanical resilience, acoustic clarity, and thermal stability in real office scenarios.",
    },
    {
      icon: "bi-shield-shaded",
      title: "Direct Manufacturer Warranty",
      desc: "All catalog hardware includes full manufacturer-backed warranties with expedited replacement processing.",
    },
    {
      icon: "bi-arrow-repeat",
      title: "30-Day Evaluation Period",
      desc: "Test products in your workflow risk-free with simple commercial returns and dedicated return packaging.",
    },
    {
      icon: "bi-file-earmark-text",
      title: "Unified B2B Billing",
      desc: "Single monthly consolidated invoices, net-30 enterprise payment terms, and clear tax itemization.",
    },
  ];

  return (
    <section className="py-5 py-lg-6" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <span className="section-tag">The Nexora Advantage</span>
            <h2 className="section-title h2 mb-3">
              Why Forward-Thinking Businesses Choose Nexora
            </h2>
            <p className="text-muted fs-6 mb-4" style={{ lineHeight: "1.75" }}>
              We eliminate procurement friction by curating only top-tier commercial equipment, providing direct point-of-contact support, and honoring rapid turnaround timelines.
            </p>
            <div className="p-4 rounded-4 bg-light border border-subtle">
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-shield-check text-primary fs-2" />
                <div>
                  <h3 className="h6 fw-bold text-dark mb-1">Risk-Free Enterprise Testing</h3>
                  <p className="small text-muted mb-0">
                    Sample units available for qualified office fit-outs and enterprise trials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <div className="row g-4">
              {points.map((pt, idx) => (
                <div key={idx} className="col-sm-6">
                  <div className="card h-100 p-4 border-0 shadow-sm rounded-4 bg-light">
                    <div
                      className="d-inline-flex align-items-center justify-content-center bg-white text-primary rounded-3 shadow-sm mb-3"
                      style={{ width: "48px", height: "48px" }}
                    >
                      <i className={`bi ${pt.icon} fs-5`} />
                    </div>
                    <h3 className="h6 fw-bold text-dark mb-2">{pt.title}</h3>
                    <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
