import React from "react";

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: "bi-patch-check-fill",
      title: "Quality Products",
      description: "Rigorous commercial QA standards ensure every device and workstation component meets strict durability guidelines.",
      accent: "text-primary",
      bgAccent: "bg-primary-subtle",
    },
    {
      icon: "bi-truck",
      title: "Reliable Service",
      description: "Direct enterprise fulfillment with transparent dispatch tracking and rapid courier dispatch worldwide.",
      accent: "text-success",
      bgAccent: "bg-success-subtle",
    },
    {
      icon: "bi-shield-lock-fill",
      title: "Secure Shopping",
      description: "End-to-end encrypted checkout flows and certified data integrity for worry-free commercial procurement.",
      accent: "text-info",
      bgAccent: "bg-info-subtle",
    },
    {
      icon: "bi-headset",
      title: "Customer Support",
      description: "Dedicated account specialists ready to provide personalized order assistance and technical consultation.",
      accent: "text-warning",
      bgAccent: "bg-warning-subtle",
    },
  ];

  return (
    <section className="py-5" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        <div className="row g-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="col-12 col-sm-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white nexora-card">
                <div
                  className={`d-inline-flex align-items-center justify-content-center rounded-3 p-3 mb-3 ${benefit.bgAccent} ${benefit.accent}`}
                  style={{ width: "54px", height: "54px" }}
                >
                  <i className={`bi ${benefit.icon} fs-4`} />
                </div>
                <h3 className="h6 fw-bold text-dark mb-2">{benefit.title}</h3>
                <p className="text-muted small mb-0" style={{ lineHeight: "1.6" }}>
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
