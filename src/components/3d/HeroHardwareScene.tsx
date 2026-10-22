"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hotspot {
  id: string;
  title: string;
  desc: string;
  position: [number, number, number];
  tag: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "driver",
    title: "40mm Neodymium Driver",
    desc: "Titanium-coated acoustic diaphragms tuned for 20Hz - 40kHz high-resolution enterprise conference clarity.",
    position: [1.2, 0.2, 0.4],
    tag: "Acoustic Engine",
  },
  {
    id: "band",
    title: "Aerospace Titanium Arch",
    desc: "Lightweight memory-alloy core supporting over 100,000 continuous flex cycles with zero tensile fatigue.",
    position: [0, 1.8, 0],
    tag: "Biomechanical Core",
  },
  {
    id: "anc",
    title: "Hybrid ANC Array",
    desc: "Quad beamforming external microphones canceling up to 38dB of ambient office & background noise.",
    position: [-1.2, -0.1, 0.4],
    tag: "Signal Telemetry",
  },
];

type LightingMode = "studio" | "dark" | "wireframe";

export const HeroHardwareScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [lightingMode, setLightingMode] = useState<LightingMode>("studio");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.8, 5.2);

    // WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Root Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Track all disposable resources
    const disposables: { geometries: THREE.BufferGeometry[]; materials: THREE.Material[] } = {
      geometries: [],
      materials: [],
    };

    const registerGeo = (g: THREE.BufferGeometry) => {
      disposables.geometries.push(g);
      return g;
    };
    const registerMat = (m: THREE.Material) => {
      disposables.materials.push(m);
      return m;
    };

    // Shared Materials
    const metalMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d1d5db"),
        metalness: 0.9,
        roughness: 0.2,
      })
    ) as THREE.MeshStandardMaterial;

    const darkLeatherMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#182030"),
        metalness: 0.1,
        roughness: 0.85,
      })
    ) as THREE.MeshStandardMaterial;

    const glowAccentMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2563eb"),
        emissive: new THREE.Color("#1d4ed8"),
        emissiveIntensity: 0.8,
        metalness: 0.5,
        roughness: 0.2,
      })
    ) as THREE.MeshStandardMaterial;

    const goldAccentMat = registerMat(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#eab308"),
        metalness: 0.8,
        roughness: 0.3,
      })
    ) as THREE.MeshStandardMaterial;

    // Headphone Construct
    const headphoneGroup = new THREE.Group();

    // 1. Headband Arch (Semi-torus)
    const bandGeo = registerGeo(new THREE.TorusGeometry(1.4, 0.07, 16, 64, Math.PI));
    const bandMesh = new THREE.Mesh(bandGeo, metalMat);
    bandMesh.rotation.z = -Math.PI;
    bandMesh.position.y = 0.2;
    headphoneGroup.add(bandMesh);

    // 2. Headband Cushion (Soft inner layer)
    const cushionGeo = registerGeo(new THREE.TorusGeometry(1.36, 0.09, 16, 48, Math.PI * 0.75));
    const cushionMesh = new THREE.Mesh(cushionGeo, darkLeatherMat);
    cushionMesh.rotation.z = -Math.PI * 0.875;
    cushionMesh.position.y = 0.2;
    headphoneGroup.add(cushionMesh);

    // 3. Earcups (Left & Right)
    const buildEarcup = (isLeft: boolean) => {
      const earcupGroup = new THREE.Group();
      const xOffset = isLeft ? -1.4 : 1.4;

      // Stem connector
      const stemGeo = registerGeo(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 16));
      const stemMesh = new THREE.Mesh(stemGeo, metalMat);
      stemMesh.position.set(0, 0.2, 0);
      earcupGroup.add(stemMesh);

      // Yoke fork
      const yokeGeo = registerGeo(new THREE.TorusGeometry(0.35, 0.035, 12, 24, Math.PI));
      const yokeMesh = new THREE.Mesh(yokeGeo, metalMat);
      yokeMesh.rotation.z = Math.PI;
      yokeMesh.position.set(0, 0.02, 0);
      earcupGroup.add(yokeMesh);

      // Main Outer Earcup Body (Ellipsoidal beveled shell)
      const cupGeo = registerGeo(new THREE.CylinderGeometry(0.48, 0.52, 0.32, 32));
      const cupMesh = new THREE.Mesh(cupGeo, darkLeatherMat);
      cupMesh.rotation.z = Math.PI / 2;
      cupMesh.position.set(isLeft ? 0.08 : -0.08, -0.3, 0);
      earcupGroup.add(cupMesh);

      // Outer Metallic Backplate
      const plateGeo = registerGeo(new THREE.CylinderGeometry(0.46, 0.46, 0.04, 32));
      const plateMesh = new THREE.Mesh(plateGeo, metalMat);
      plateMesh.rotation.z = Math.PI / 2;
      plateMesh.position.set(isLeft ? -0.1 : 0.1, -0.3, 0);
      earcupGroup.add(plateMesh);

      // Glowing LED Ring
      const ringGeo = registerGeo(new THREE.TorusGeometry(0.36, 0.02, 16, 32));
      const ringMesh = new THREE.Mesh(ringGeo, glowAccentMat);
      ringMesh.rotation.y = Math.PI / 2;
      ringMesh.position.set(isLeft ? -0.13 : 0.13, -0.3, 0);
      earcupGroup.add(ringMesh);

      // Inner Ear Cushion (Leather padding against head)
      const padGeo = registerGeo(new THREE.TorusGeometry(0.44, 0.12, 16, 32));
      const padMesh = new THREE.Mesh(padGeo, darkLeatherMat);
      padMesh.rotation.y = Math.PI / 2;
      padMesh.position.set(isLeft ? 0.24 : -0.24, -0.3, 0);
      earcupGroup.add(padMesh);

      // Acoustic Driver Grille mesh
      const grilleGeo = registerGeo(new THREE.CircleGeometry(0.32, 24));
      const grilleMesh = new THREE.Mesh(grilleGeo, goldAccentMat);
      grilleMesh.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;
      grilleMesh.position.set(isLeft ? 0.25 : -0.25, -0.3, 0);
      earcupGroup.add(grilleMesh);

      earcupGroup.position.set(xOffset, 0, 0);
      return earcupGroup;
    };

    const leftEarcup = buildEarcup(true);
    const rightEarcup = buildEarcup(false);
    headphoneGroup.add(leftEarcup);
    headphoneGroup.add(rightEarcup);

    // 4. Stand & Base Pedestal
    const standGroup = new THREE.Group();

    // Base disc
    const baseGeo = registerGeo(new THREE.CylinderGeometry(0.9, 0.95, 0.08, 36));
    const baseMesh = new THREE.Mesh(baseGeo, darkLeatherMat);
    baseMesh.position.y = -1.5;
    standGroup.add(baseMesh);

    // Base accent trim
    const baseTrimGeo = registerGeo(new THREE.TorusGeometry(0.92, 0.02, 16, 36));
    const baseTrimMesh = new THREE.Mesh(baseTrimGeo, glowAccentMat);
    baseTrimMesh.rotation.x = Math.PI / 2;
    baseTrimMesh.position.y = -1.48;
    standGroup.add(baseTrimMesh);

    // Stand Stem
    const stemGeo = registerGeo(new THREE.CylinderGeometry(0.06, 0.07, 2.8, 24));
    const stemMesh = new THREE.Mesh(stemGeo, metalMat);
    stemMesh.position.set(0, -0.1, -0.1);
    standGroup.add(stemMesh);

    // Cradle top curved hanger
    const cradleGeo = registerGeo(new THREE.TorusGeometry(0.4, 0.05, 16, 24, Math.PI * 0.7));
    const cradleMesh = new THREE.Mesh(cradleGeo, metalMat);
    cradleMesh.rotation.z = Math.PI * 1.15;
    cradleMesh.position.set(0, 1.25, -0.1);
    standGroup.add(cradleMesh);

    modelGroup.add(headphoneGroup);
    modelGroup.add(standGroup);

    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    mainKeyLight.position.set(3, 4, 4);
    scene.add(mainKeyLight);

    const coolFillLight = new THREE.DirectionalLight(0x93c5fd, 1.4);
    coolFillLight.position.set(-4, 2, 2);
    scene.add(coolFillLight);

    const blueRimLight = new THREE.PointLight(0x3b82f6, 3.0, 10);
    blueRimLight.position.set(0, -1, -3);
    scene.add(blueRimLight);

    // Subtle floor shadow
    const floorGeo = registerGeo(new THREE.PlaneGeometry(8, 8));
    const floorMat = registerMat(
      new THREE.ShadowMaterial({
        opacity: 0.15,
      })
    );
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.55;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    setIsLoading(false);

    // Drag-to-Rotate & Mouse Parallax Interaction State
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotationVelocityX = 0;
    let rotationVelocityY = 0;
    let targetRotationY = 0.2;
    let targetRotationX = 0.05;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseParallaxX = normX * 0.15;
      mouseParallaxY = normY * 0.1;

      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        rotationVelocityY = deltaX * 0.008;
        rotationVelocityX = deltaY * 0.005;

        targetRotationY += rotationVelocityY;
        targetRotationX = Math.max(-0.4, Math.min(0.4, targetRotationX + rotationVelocityX));
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle breathing motion
      headphoneGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.03;

      if (isAutoRotating && !isDragging) {
        targetRotationY += 0.003;
      }

      // Smooth interpolation for rotation
      modelGroup.rotation.y += (targetRotationY + mouseParallaxX - modelGroup.rotation.y) * 0.08;
      modelGroup.rotation.x += (targetRotationX - mouseParallaxY - modelGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Mode-based Material adjustments handler
    const applyLightingMode = (mode: LightingMode) => {
      if (mode === "wireframe") {
        metalMat.wireframe = true;
        darkLeatherMat.wireframe = true;
        glowAccentMat.wireframe = true;
        mainKeyLight.intensity = 1.0;
        renderer.toneMappingExposure = 1.0;
      } else if (mode === "dark") {
        metalMat.wireframe = false;
        darkLeatherMat.wireframe = false;
        glowAccentMat.wireframe = false;
        metalMat.color.set("#475569");
        darkLeatherMat.color.set("#0b0f19");
        glowAccentMat.emissiveIntensity = 2.0;
        mainKeyLight.intensity = 1.2;
        coolFillLight.intensity = 2.2;
        renderer.toneMappingExposure = 1.4;
      } else {
        // Studio
        metalMat.wireframe = false;
        darkLeatherMat.wireframe = false;
        glowAccentMat.wireframe = false;
        metalMat.color.set("#d1d5db");
        darkLeatherMat.color.set("#182030");
        glowAccentMat.emissiveIntensity = 0.8;
        mainKeyLight.intensity = 2.2;
        coolFillLight.intensity = 1.4;
        renderer.toneMappingExposure = 1.2;
      }
    };

    applyLightingMode(lightingMode);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvasDom.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      disposables.geometries.forEach((g) => g.dispose());
      disposables.materials.forEach((m) => m.dispose());
      renderer.dispose();

      if (canvasDom.parentElement) {
        canvasDom.parentElement.removeChild(canvasDom);
      }
    };
  }, [lightingMode, isAutoRotating]);

  return (
    <div className="position-relative w-100 h-100 rounded-4 overflow-hidden border border-subtle bg-white shadow-lg">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-100 h-100 position-relative"
        style={{ minHeight: "440px", cursor: "grab" }}
      />

      {/* Loading Screen Overlay */}
      {isLoading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-light">
          <div className="spinner-border text-primary mb-2" role="status" />
          <span className="small text-muted fw-semibold">Loading 3D Hardware Engine...</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center pointer-events-none" style={{ zIndex: 5 }}>
        <div className="d-flex align-items-center gap-2">
          <span className="badge rounded-pill bg-dark bg-opacity-75 text-white px-3 py-1.5 small shadow-sm d-flex align-items-center gap-1.5">
            <span className="spinner-grow spinner-grow-sm text-primary" role="status" />
            <span>Interactive 3D Canvas</span>
          </span>
        </div>

        {/* Lighting Mode Selector */}
        <div className="btn-group btn-group-sm bg-white bg-opacity-90 rounded-pill p-1 shadow-sm border border-subtle">
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-2.5 py-1 ${
              lightingMode === "studio" ? "btn-primary text-white" : "btn-light text-dark"
            }`}
            onClick={() => setLightingMode("studio")}
            title="Studio Lighting"
          >
            Studio
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-2.5 py-1 ${
              lightingMode === "dark" ? "btn-dark text-white" : "btn-light text-dark"
            }`}
            onClick={() => setLightingMode("dark")}
            title="Executive Night View"
          >
            Dark
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-2.5 py-1 ${
              lightingMode === "wireframe" ? "btn-info text-white" : "btn-light text-dark"
            }`}
            onClick={() => setLightingMode("wireframe")}
            title="Technical Blueprint Wireframe"
          >
            Wireframe
          </button>
        </div>
      </div>

      {/* Interactive Hotspot Callout Bar */}
      <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ zIndex: 5 }}>
        <div className="d-flex flex-column gap-2">
          {/* Active Hotspot Detail Card */}
          {activeHotspot && (
            <div className="card border-0 shadow-lg p-3 rounded-3 bg-white border-start border-4 border-primary">
              <div className="d-flex justify-content-between align-items-start mb-1">
                <div>
                  <span className="badge bg-primary bg-opacity-10 text-primary small mb-1">
                    {activeHotspot.tag}
                  </span>
                  <h4 className="h6 fw-bold text-dark m-0">{activeHotspot.title}</h4>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-sm"
                  onClick={() => setActiveHotspot(null)}
                  aria-label="Close hotspot info"
                />
              </div>
              <p className="small text-muted m-0">{activeHotspot.desc}</p>
            </div>
          )}

          {/* Hotspot Trigger Pills */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 p-2 bg-white bg-opacity-90 backdrop-blur rounded-3 border border-subtle shadow-sm">
            <div className="d-flex align-items-center gap-1.5">
              <span className="small text-muted fw-bold me-1" style={{ fontSize: "0.72rem" }}>
                INSPECT:
              </span>
              {HOTSPOTS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  className={`btn btn-sm rounded-pill px-2.5 py-0.5 small ${
                    activeHotspot?.id === h.id ? "btn-primary text-white" : "btn-light text-dark border"
                  }`}
                  style={{ fontSize: "0.75rem" }}
                  onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
                >
                  <i className="bi bi-crosshair me-1" />
                  {h.tag}
                </button>
              ))}
            </div>

            {/* Auto Rotate Toggle */}
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-2 py-0.5 border ${
                isAutoRotating ? "btn-light text-primary" : "btn-light text-muted"
              }`}
              style={{ fontSize: "0.72rem" }}
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              title={isAutoRotating ? "Pause Auto Rotation" : "Resume Auto Rotation"}
            >
              <i className={`bi ${isAutoRotating ? "bi-pause-fill" : "bi-play-fill"} me-1`} />
              360° Orbit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHardwareScene;
