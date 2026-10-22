"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export const AboutSection: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-5 py-lg-6" style={{ backgroundColor: "#ffffff" }}>
      <div className="container">
        <div className="row align-items-center g-5">
          {/* Supporting Image Column */}
          <div className="col-lg-6">
            <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-subtle">
              <div className="position-relative" style={{ height: "420px", width: "100%" }}>
                <Image
                  src="https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=1000&q=80"
                  alt="Modern office architectural workspace"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="position-absolute bottom-0 start-0 m-4 p-3 bg-white rounded-3 shadow border border-subtle d-flex align-items-center gap-3"
                style={{ maxWidth: "340px" }}
              >
                <div className="p-2.5 bg-primary-subtle text-primary rounded-3">
                  <i className="bi bi-bullseye fs-4" />
                </div>
                <div>
                  <div className="fw-bold text-dark small">Uncompromising Quality</div>
                  <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                    Selected for durability, ergonomic health, and aesthetic coherence.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Mission Column */}
          <div className="col-lg-6">
            <span className="section-tag">About Nexora</span>
            <h2 className="section-title h2 mb-3">
              Crafting Workspaces Where Excellence Flourishes
            </h2>
            <p className="lead text-muted fs-6 mb-4" style={{ lineHeight: "1.75" }}>
              Founded on the belief that everyday commercial tools directly influence human output and wellbeing, NEXORA curates high-performance technology and office infrastructure for modern businesses.
            </p>

            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-start gap-3">
                <div className="p-2 bg-light rounded-circle text-primary mt-0.5">
                  <i className="bi bi-check2-circle fs-5" />
                </div>
                <div>
                  <h3 className="h6 fw-bold text-dark mb-1">Commercial Durability Standards</h3>
                  <p className="small text-muted mb-0">
                    Each catalog item undergoes rigorous mechanical and acoustic inspection prior to inclusion in our catalog.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <div className="p-2 bg-light rounded-circle text-primary mt-0.5">
                  <i className="bi bi-person-check fs-5" />
                </div>
                <div>
                  <h3 className="h6 fw-bold text-dark mb-1">Tailored B2B Consultation</h3>
                  <p className="small text-muted mb-0">
                    We assist design studios, remote teams, and corporate divisions in outfitting productive, ergonomic work environments.
                  </p>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-3">
              <Link
                href={isAuthenticated ? "/about" : "/portal?redirect=/about"}
                className="btn btn-navy-custom d-inline-flex align-items-center gap-2"
              >
                <span>Our Full Story</span>
                <i className="bi bi-arrow-right" />
              </Link>
              <Link
                href={isAuthenticated ? "/services" : "/portal?redirect=/services"}
                className="btn btn-outline-custom d-inline-flex align-items-center gap-2"
              >
                <span>Explore Services</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
