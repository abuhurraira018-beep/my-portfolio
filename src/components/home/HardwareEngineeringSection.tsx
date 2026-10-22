"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

// Dynamically import the 3D scene with SSR disabled for optimal performance
const ScrollEngineeringScene = dynamic(
  () => import("@/components/3d/ScrollEngineeringScene"),
  { ssr: false, loading: () => <div className="text-center py-5 text-muted">Initializing 3D Lab...</div> }
);

interface PhaseData {
  id: number;
  label: string;
  badge: string;
  title: string;
  desc: string;
  specs: { label: string; value: string }[];
}

const PHASES: PhaseData[] = [
  {
    id: 0,
    label: "Phase 01",
    badge: "Structural Architecture",
    title: "Layered Acoustic Dampening & Chassis Rigidity",
    desc: "Dual-layer high-density sound dampening silicone sandwiches the PCB, eliminating internal case resonance and yielding a deep, authoritative acoustic signature across every keystroke.",
    specs: [
      { label: "Internal Foam", value: "3.5mm Custom Poron" },
      { label: "Vibration Dissipation", value: "-14dB Attenuation" },
      { label: "Mounting Style", value: "Gasket-Mounted Plate" },
    ],
  },
  {
    id: 1,
    label: "Phase 02",
    badge: "Tactile Precision",
    title: "Hot-Swappable 5-Pin Matrix & Gold Sockets",
    desc: "Modular mechanical switch architecture with Kailh gold-plated hot-swap sockets rated for 500+ component insertions. Effortlessly interchange tactile, linear, and silent switch varieties.",
    specs: [
      { label: "Actuation Travel", value: "2.0mm Pre-Travel" },
      { label: "Contact Plating", value: "24K Hard Gold" },
      { label: "Switch Compatibility", value: "3-Pin & 5-Pin MX" },
    ],
  },
  {
    id: 2,
    label: "Phase 03",
    badge: "Commercial Resilience",
    title: "6063 Anodized CNC Aerospace Unibody",
    desc: "Milled from single billets of aircraft-grade 6063 aluminum, glass-bead blasted, and anodized for scratch resistance. Engineered to maintain structural integrity across intense commercial workloads.",
    specs: [
      { label: "Chassis Material", value: "6063 CNC Aluminum" },
      { label: "Surface Finish", value: "Type II Anodization" },
      { label: "Total Unit Mass", value: "1,850g Weighted Base" },
    ],
  },
];

export const HardwareEngineeringSection: React.FC = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(false);
  const { isAuthenticated } = useAuth();

  // Auto-cycle phases every 6 seconds if enabled
  useEffect(() => {
    if (!isAutoCycling) return;
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % PHASES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoCycling]);

  const current = PHASES[activePhase];

  return (
    <section className="py-5 py-lg-6 position-relative text-white overflow-hidden" style={{ backgroundColor: "#0b0f19" }}>
      <div className="container py-lg-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill bg-white bg-opacity-10 border border-white border-opacity-10 mb-3">
            <span className="badge rounded-pill bg-primary p-1">
              <i className="bi bi-cpu text-white" />
            </span>
            <span className="small text-uppercase tracking-wider fw-semibold text-white" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
              NEXORA PRECISION 3D LAB
            </span>
          </div>
          <h2 className="display-6 fw-bold mb-3 text-white">
            The Anatomy of Commercial Reliability
          </h2>
          <p className="text-secondary small mb-0" style={{ maxWidth: "620px", margin: "0 auto", lineHeight: "1.7" }}>
            Explore the multi-layer mechanical architecture, CNC metalwork, and acoustic isolation engineered into every Nexora commercial workstation peripheral.
          </p>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="d-flex justify-content-center mb-5">
          <div className="p-1.5 rounded-pill bg-dark border border-secondary border-opacity-25 d-flex gap-1 shadow-sm">
            {PHASES.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`btn btn-sm rounded-pill px-3 py-1.5 fw-semibold transition-all ${
                  activePhase === p.id
                    ? "btn-primary text-white shadow-sm"
                    : "btn-dark text-secondary hover-white border-0"
                }`}
                style={{ fontSize: "0.8125rem" }}
                onClick={() => {
                  setActivePhase(p.id);
                  setIsAutoCycling(false);
                }}
              >
                <span className="me-1.5 opacity-75">{p.label}:</span>
                <span>{p.badge}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main 3D Lab Layout */}
        <div className="row align-items-center g-5">
          {/* Left Column: Interactive Technical Narrative */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg p-4 p-md-5 rounded-4 bg-dark text-white border border-secondary border-opacity-25" style={{ backgroundColor: "#111827" }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-primary bg-opacity-20 text-primary border border-primary border-opacity-50 px-3 py-1.5 rounded-pill small">
                  {current.badge}
                </span>
                <span className="text-secondary small fw-bold">
                  {activePhase + 1} of {PHASES.length}
                </span>
              </div>

              <h3 className="h4 fw-bold text-white mb-3" style={{ lineHeight: "1.3" }}>
                {current.title}
              </h3>

              <p className="text-secondary small mb-4" style={{ lineHeight: "1.75" }}>
                {current.desc}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="p-3.5 rounded-3 bg-white bg-opacity-5 border border-white border-opacity-10 mb-4">
                <div className="d-flex flex-column gap-2.5">
                  {current.specs.map((s, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center small">
                      <span className="text-secondary">{s.label}</span>
                      <span className="text-white fw-bold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="d-flex align-items-center gap-3">
                <Link
                  href={isAuthenticated ? "/products" : "/portal?redirect=/products"}
                  className="btn btn-primary-custom flex-grow-1 py-2.5 d-flex align-items-center justify-content-center gap-2"
                >
                  <span>{isAuthenticated ? "Inspect Full Catalog" : "Sign In to Test Hardware"}</span>
                  <i className="bi bi-arrow-right" />
                </Link>

                <button
                  type="button"
                  className={`btn btn-sm border rounded-3 p-2.5 d-flex align-items-center justify-content-center ${
                    isAutoCycling ? "btn-warning text-dark border-warning" : "btn-dark text-secondary border-secondary"
                  }`}
                  onClick={() => setIsAutoCycling(!isAutoCycling)}
                  title={isAutoCycling ? "Pause Automatic Rotation" : "Auto-Cycle Engineering Phases"}
                >
                  <i className={`bi ${isAutoCycling ? "bi-pause-fill" : "bi-arrow-repeat"} fs-5`} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Real-time 3D Exploded Interactive Scene */}
          <div className="col-lg-7">
            <div className="position-relative rounded-4 overflow-hidden border border-secondary border-opacity-25 shadow-lg bg-dark" style={{ backgroundColor: "#111827", minHeight: "480px" }}>
              {/* Scene Canvas */}
              <ScrollEngineeringScene phase={activePhase} />

              {/* Floating Camera Status Pill */}
              <div className="position-absolute top-0 start-0 m-3 px-3 py-1.5 rounded-pill bg-dark bg-opacity-75 border border-secondary border-opacity-50 small d-flex align-items-center gap-2 text-white">
                <span className="spinner-grow spinner-grow-sm text-primary" role="status" />
                <span style={{ fontSize: "0.75rem" }}>Live Hardware Simulation &bull; 60 FPS</span>
              </div>

              {/* Interactive Layer Scrub Hints */}
              <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-gradient-dark d-flex justify-content-between align-items-center text-secondary small" style={{ fontSize: "0.75rem" }}>
                <span>
                  <i className="bi bi-arrows-move me-1 text-primary" />
                  Phase {activePhase + 1}: {activePhase === 1 ? "Exploded Matrix" : "Chassis Alignment"}
                </span>
                <div className="d-flex gap-1">
                  {PHASES.map((p) => (
                    <span
                      key={p.id}
                      className={`d-inline-block rounded-pill ${
                        activePhase === p.id ? "bg-primary" : "bg-secondary bg-opacity-40"
                      }`}
                      style={{ width: "24px", height: "4px", transition: "all 0.3s ease" }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HardwareEngineeringSection;
