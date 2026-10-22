import React from "react";
import Image from "next/image";
import { testimonials } from "@/data/testimonials";

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-5 py-lg-6" style={{ backgroundColor: "#f8fafc" }}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <div className="d-inline-flex align-items-center gap-1.5 px-3 py-1 rounded-pill bg-light border border-subtle mb-3">
            <span className="badge rounded-pill bg-secondary" style={{ fontSize: "0.65rem" }}>
              DEMO
            </span>
            <span className="small text-muted fw-semibold" style={{ fontSize: "0.75rem" }}>
              Sample Client Experiences
            </span>
          </div>
          <h2 className="section-title h2 mb-2">What Our Commercial Clients Value</h2>
          <p className="section-desc mb-0" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Illustrative feedback showcasing how organizations experience Nexora hardware and enterprise services.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="row g-4">
          {testimonials.map((t) => (
            <div key={t.id} className="col-12 col-md-4">
              <div className="card h-100 border-0 shadow-sm p-4 rounded-4 bg-white nexora-card d-flex flex-column">
                {/* Rating Stars */}
                <div className="d-flex text-warning mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <i key={i} className="bi bi-star-fill star-filled me-1" />
                  ))}
                </div>

                {/* Content Quote */}
                <p className="text-dark small mb-4 flex-grow-1" style={{ lineHeight: "1.7" }}>
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author Info */}
                <div className="d-flex align-items-center gap-3 pt-3 border-top mt-auto">
                  <div className="position-relative rounded-circle overflow-hidden bg-light" style={{ width: "44px", height: "44px" }}>
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="44px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="h6 fw-bold text-dark m-0" style={{ fontSize: "0.875rem" }}>
                      {t.name}
                    </h3>
                    <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                      {t.role} &bull; <span className="text-primary">{t.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
