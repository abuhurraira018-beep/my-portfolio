"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ScrollEngineeringSceneProps {
  phase: number; // 0, 1, or 2
  scrollProgress?: number; // 0.0 to 1.0
}

export const ScrollEngineeringScene: React.FC<ScrollEngineeringSceneProps> = ({
  phase,
  scrollProgress = 0,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const explodedPartsRef = useRef<THREE.Mesh[]>([]);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 4.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    mount.appendChild(renderer.domElement);

    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
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

    // Materials
    const chassisMat = regM(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1e293b"),
        metalness: 0.85,
        roughness: 0.25,
      })
    ) as THREE.MeshStandardMaterial;

    const pcbMat = regM(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#065f46"),
        metalness: 0.2,
        roughness: 0.7,
      })
    ) as THREE.MeshStandardMaterial;

    const switchMat = regM(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#2563eb"),
        metalness: 0.5,
        roughness: 0.3,
        emissive: new THREE.Color("#1d4ed8"),
        emissiveIntensity: 0.4,
      })
    ) as THREE.MeshStandardMaterial;

    const keycapMat = regM(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f1f5f9"),
        metalness: 0.1,
        roughness: 0.4,
      })
    ) as THREE.MeshStandardMaterial;

    const goldContactMat = regM(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f59e0b"),
        metalness: 0.9,
        roughness: 0.1,
      })
    ) as THREE.MeshStandardMaterial;

    // Layer 1: Solid Anodized CNC Base Chassis
    const baseGeo = regG(new THREE.BoxGeometry(3.2, 0.2, 1.4));
    const baseMesh = new THREE.Mesh(baseGeo, chassisMat);
    baseMesh.position.y = -0.5;
    modelGroup.add(baseMesh);

    // Layer 2: FR4 Multi-Layer PCB Circuit Board
    const pcbGeo = regG(new THREE.BoxGeometry(3.0, 0.05, 1.25));
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    pcbMesh.position.y = -0.25;
    modelGroup.add(pcbMesh);

    // Layer 3: Polycarbonate Switch Plate
    const plateGeo = regG(new THREE.BoxGeometry(3.05, 0.04, 1.28));
    const plateMesh = new THREE.Mesh(plateGeo, chassisMat);
    plateMesh.position.y = 0.0;
    modelGroup.add(plateMesh);

    // Array of Keycap & Switch Matrix Elements
    const explodedParts: THREE.Mesh[] = [];
    explodedPartsRef.current = explodedParts;

    const rows = 4;
    const cols = 8;
    const spacingX = 0.34;
    const spacingZ = 0.28;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Individual switch stem
        const switchGeo = regG(new THREE.BoxGeometry(0.18, 0.14, 0.18));
        const sMesh = new THREE.Mesh(switchGeo, switchMat);
        const xPos = (c - cols / 2 + 0.5) * spacingX;
        const zPos = (r - rows / 2 + 0.5) * spacingZ;
        sMesh.position.set(xPos, 0.15, zPos);
        modelGroup.add(sMesh);
        explodedParts.push(sMesh);

        // Keycap atop switch
        const capGeo = regG(new THREE.CylinderGeometry(0.12, 0.14, 0.16, 4));
        const cMesh = new THREE.Mesh(capGeo, keycapMat);
        cMesh.rotation.y = Math.PI / 4;
        cMesh.position.set(xPos, 0.35, zPos);
        modelGroup.add(cMesh);
        explodedParts.push(cMesh);
      }
    }

    // Gold hot-swap sockets on PCB underside
    for (let i = 0; i < 6; i++) {
      const socketGeo = regG(new THREE.CylinderGeometry(0.04, 0.04, 0.06, 12));
      const socketMesh = new THREE.Mesh(socketGeo, goldContactMat);
      socketMesh.position.set((i - 2.5) * 0.45, -0.3, 0);
      modelGroup.add(socketMesh);
    }

    // Studio Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const dirKey = new THREE.DirectionalLight(0xffffff, 2.5);
    dirKey.position.set(3, 4, 3);
    scene.add(dirKey);

    const dirFill = new THREE.DirectionalLight(0x60a5fa, 1.5);
    dirFill.position.set(-3, 2, -2);
    scene.add(dirFill);

    const rimBlue = new THREE.PointLight(0x2563eb, 3.5, 8);
    rimBlue.position.set(0, -1, 3);
    scene.add(rimBlue);

    // Tilt model toward camera
    modelGroup.rotation.x = 0.45;
    modelGroup.rotation.y = -0.35;

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      const time = clock.getElapsedTime();

      // Continuous slow rotation
      modelGroup.rotation.y += 0.002;

      renderer.render(scene, camera);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      disposables.geometries.forEach((g) => g.dispose());
      disposables.materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update transforms based on active phase and scrollProgress
  useEffect(() => {
    if (!modelGroupRef.current || !cameraRef.current) return;
    const model = modelGroupRef.current;
    const camera = cameraRef.current;

    if (phase === 0) {
      // Phase 0: Compact Assembly Focus
      model.rotation.x = 0.4;
      model.rotation.z = 0.0;
      camera.position.set(0, 1.4, 4.2);

      // Compact positions
      explodedPartsRef.current.forEach((part, idx) => {
        const isKeycap = idx % 2 === 1;
        part.position.y = isKeycap ? 0.35 : 0.15;
      });
    } else if (phase === 1) {
      // Phase 1: Exploded Layer Disassembly View
      model.rotation.x = 0.6;
      model.rotation.z = -0.15;
      camera.position.set(-0.3, 1.8, 4.6);

      // Elevated exploded view
      explodedPartsRef.current.forEach((part, idx) => {
        const isKeycap = idx % 2 === 1;
        part.position.y = isKeycap ? 0.95 : 0.45;
      });
    } else {
      // Phase 2: Aerospace CNC Structural Rigidity
      model.rotation.x = 0.25;
      model.rotation.z = 0.2;
      camera.position.set(0.4, 1.2, 3.8);

      // Balanced precision position
      explodedPartsRef.current.forEach((part, idx) => {
        const isKeycap = idx % 2 === 1;
        part.position.y = isKeycap ? 0.42 : 0.2;
      });
    }
  }, [phase, scrollProgress]);

  return (
    <div
      ref={mountRef}
      className="w-100 h-100 position-relative"
      style={{ minHeight: "480px" }}
    />
  );
};

export default ScrollEngineeringScene;
