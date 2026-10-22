"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Product } from "@/types/product";

interface ProductViewer3DProps {
  product: Product;
}

type FinishColor = "#334155" | "#94a3b8" | "#1e293b" | "#e2e8f0";

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({ product }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [finishColor, setFinishColor] = useState<FinishColor>("#334155");

  const meshRef = useRef<THREE.Group | null>(null);
  const mainMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.5, 3.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const modelGroup = new THREE.Group();
    meshRef.current = modelGroup;
    scene.add(modelGroup);

    const disposables: { geometries: THREE.BufferGeometry[]; materials: THREE.Material[] } = {
      geometries: [],
      materials: [],
    };
    const regG = (g: THREE.BufferGeometry) => {
      disposables.geometries.push(g);
      return g;
    };
    const regM = (m: THREE.Material) => {
      disposables.materials.push(m);
      return m;
    };

    // Primary PBR Material
    const mainMat = regM(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(finishColor),
        metalness: 0.85,
        roughness: 0.25,
      })
    ) as THREE.MeshStandardMaterial;
    mainMatRef.current = mainMat;

    const accentMat = regM(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2563eb"),
        emissive: new THREE.Color("#1d4ed8"),
        emissiveIntensity: 0.6,
        metalness: 0.4,
        roughness: 0.3,
      })
    ) as THREE.MeshStandardMaterial;

    const darkTrimMat = regM(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0f172a"),
        metalness: 0.2,
        roughness: 0.8,
      })
    ) as THREE.MeshStandardMaterial;

    // Build adaptive geometry based on category
    const cat = product.category.toLowerCase();

    if (cat.includes("audio")) {
      // Audio Headset/Speaker
      const ringGeo = regG(new THREE.TorusGeometry(1.1, 0.08, 16, 48));
      const ringMesh = new THREE.Mesh(ringGeo, mainMat);
      modelGroup.add(ringMesh);

      const cupLGeo = regG(new THREE.CylinderGeometry(0.45, 0.5, 0.3, 32));
      const cupLMesh = new THREE.Mesh(cupLGeo, darkTrimMat);
      cupLMesh.rotation.z = Math.PI / 2;
      cupLMesh.position.set(-1.1, -0.4, 0);
      modelGroup.add(cupLMesh);

      const cupRGeo = regG(new THREE.CylinderGeometry(0.45, 0.5, 0.3, 32));
      const cupRMesh = new THREE.Mesh(cupRGeo, darkTrimMat);
      cupRMesh.rotation.z = Math.PI / 2;
      cupRMesh.position.set(1.1, -0.4, 0);
      modelGroup.add(cupRMesh);

      const ledGeo = regG(new THREE.TorusGeometry(0.35, 0.02, 16, 32));
      const ledMesh = new THREE.Mesh(ledGeo, accentMat);
      ledMesh.rotation.y = Math.PI / 2;
      ledMesh.position.set(1.26, -0.4, 0);
      modelGroup.add(ledMesh);
    } else if (cat.includes("workspace") || cat.includes("office")) {
      // Ergonomic Chair / Desk geometry representation
      const seatGeo = regG(new THREE.BoxGeometry(1.6, 0.15, 1.4));
      const seatMesh = new THREE.Mesh(seatGeo, darkTrimMat);
      modelGroup.add(seatMesh);

      const backGeo = regG(new THREE.BoxGeometry(1.4, 1.8, 0.1));
      const backMesh = new THREE.Mesh(backGeo, mainMat);
      backMesh.position.set(0, 0.9, -0.65);
      modelGroup.add(backMesh);

      const stemGeo = regG(new THREE.CylinderGeometry(0.08, 0.08, 1.2, 16));
      const stemMesh = new THREE.Mesh(stemGeo, mainMat);
      stemMesh.position.set(0, -0.65, 0);
      modelGroup.add(stemMesh);

      const baseStarGeo = regG(new THREE.TorusGeometry(0.8, 0.06, 12, 5));
      const baseStarMesh = new THREE.Mesh(baseStarGeo, mainMat);
      baseStarMesh.rotation.x = Math.PI / 2;
      baseStarMesh.position.set(0, -1.2, 0);
      modelGroup.add(baseStarMesh);
    } else {
      // Electronics / Keyboard / Monitor geometry
      const chassisGeo = regG(new THREE.BoxGeometry(2.4, 0.18, 1.2));
      const chassisMesh = new THREE.Mesh(chassisGeo, mainMat);
      modelGroup.add(chassisMesh);

      const screenGeo = regG(new THREE.BoxGeometry(2.3, 0.02, 1.1));
      const screenMesh = new THREE.Mesh(screenGeo, accentMat);
      screenMesh.position.set(0, 0.1, 0);
      modelGroup.add(screenMesh);

      const dialGeo = regG(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24));
      const dialMesh = new THREE.Mesh(dialGeo, accentMat);
      dialMesh.position.set(0.9, 0.15, -0.35);
      modelGroup.add(dialMesh);
    }

    // Studio Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(amb);

    const dir1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dir1.position.set(3, 4, 3);
    scene.add(dir1);

    const dir2 = new THREE.DirectionalLight(0x93c5fd, 1.5);
    dir2.position.set(-3, -2, -2);
    scene.add(dir2);

    const point = new THREE.PointLight(0x2563eb, 2.0, 6);
    point.position.set(0, 1.5, 2);
    scene.add(point);

    // Drag-to-Rotate interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = 0.3;
    let targetRotX = 0.2;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      targetRotY += dx * 0.01;
      targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX + dy * 0.008));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let frameId: number;
    const render = () => {
      frameId = requestAnimationFrame(render);
      if (isAutoRotating && !isDragging) {
        targetRotY += 0.005;
      }
      modelGroup.rotation.y += (targetRotY - modelGroup.rotation.y) * 0.08;
      modelGroup.rotation.x += (targetRotX - modelGroup.rotation.x) * 0.08;
      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      disposables.geometries.forEach((g) => g.dispose());
      disposables.materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (canvas.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    };
  }, [product.category, isAutoRotating]);

  // Wireframe toggle
  useEffect(() => {
    if (mainMatRef.current) {
      mainMatRef.current.wireframe = isWireframe;
    }
  }, [isWireframe]);

  // Finish color update
  useEffect(() => {
    if (mainMatRef.current) {
      mainMatRef.current.color.set(finishColor);
    }
  }, [finishColor]);

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.max(2.2, Math.min(5.5, cameraRef.current.position.z + delta));
  };

  const handleResetCamera = () => {
    if (cameraRef.current && meshRef.current) {
      cameraRef.current.position.set(0, 0.5, 3.8);
      meshRef.current.rotation.set(0.2, 0.3, 0);
    }
  };

  return (
    <div className="position-relative w-100 h-100 bg-light rounded-4 overflow-hidden border border-subtle">
      {/* 3D Canvas */}
      <div
        ref={mountRef}
        className="w-100 h-100"
        style={{ minHeight: "440px", cursor: "grab" }}
      />

      {/* Floating 3D Controls Overlay */}
      <div className="position-absolute top-0 start-0 w-100 p-3 d-flex justify-content-between align-items-center pointer-events-none" style={{ zIndex: 4 }}>
        <span className="badge rounded-pill bg-dark bg-opacity-75 text-white px-3 py-1.5 small shadow-sm d-flex align-items-center gap-1.5">
          <i className="bi bi-box" />
          <span>Interactive 3D Inspector</span>
        </span>

        {/* Zoom & Reset Toolbar */}
        <div className="btn-group btn-group-sm bg-white rounded-pill p-1 shadow-sm border border-subtle">
          <button
            type="button"
            className="btn btn-sm btn-light rounded-circle p-1.5"
            onClick={() => handleZoom(-0.4)}
            title="Zoom In"
            aria-label="Zoom In"
          >
            <i className="bi bi-zoom-in" />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-light rounded-circle p-1.5"
            onClick={() => handleZoom(0.4)}
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <i className="bi bi-zoom-out" />
          </button>
          <button
            type="button"
            className="btn btn-sm btn-light rounded-circle p-1.5"
            onClick={handleResetCamera}
            title="Reset Perspective"
            aria-label="Reset Perspective"
          >
            <i className="bi bi-arrow-counterclockwise" />
          </button>
        </div>
      </div>

      {/* Bottom Finish Palette & Mode Bar */}
      <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ zIndex: 4 }}>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 p-2 bg-white bg-opacity-90 backdrop-blur rounded-3 border border-subtle shadow-sm">
          {/* Material Finishes */}
          <div className="d-flex align-items-center gap-1.5">
            <span className="small text-muted fw-bold me-1" style={{ fontSize: "0.72rem" }}>
              FINISH:
            </span>
            {[
              { label: "Space Gray", color: "#334155" as FinishColor },
              { label: "Silver Alloy", color: "#94a3b8" as FinishColor },
              { label: "Executive Navy", color: "#1e293b" as FinishColor },
              { label: "Arctic White", color: "#e2e8f0" as FinishColor },
            ].map((f) => (
              <button
                key={f.color}
                type="button"
                className={`btn btn-sm rounded-circle p-0 border ${
                  finishColor === f.color ? "border-primary border-3" : "border-secondary"
                }`}
                style={{
                  width: "22px",
                  height: "22px",
                  backgroundColor: f.color,
                }}
                onClick={() => setFinishColor(f.color)}
                title={f.label}
                aria-label={f.label}
              />
            ))}
          </div>

          {/* Wireframe & Auto-orbit Toggles */}
          <div className="d-flex align-items-center gap-1">
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-2.5 py-0.5 border ${
                isWireframe ? "btn-info text-white" : "btn-light text-dark"
              }`}
              style={{ fontSize: "0.72rem" }}
              onClick={() => setIsWireframe(!isWireframe)}
            >
              <i className="bi bi-grid-3x3 me-1" />
              Wireframe
            </button>
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-2.5 py-0.5 border ${
                isAutoRotating ? "btn-light text-primary" : "btn-light text-muted"
              }`}
              style={{ fontSize: "0.72rem" }}
              onClick={() => setIsAutoRotating(!isAutoRotating)}
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

export default ProductViewer3D;
