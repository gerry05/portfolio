"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function seeded(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function Dust({ count = 48 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seeded(i) - 0.5) * 7;
      arr[i * 3 + 1] = seeded(i + 100) * 3.2 - 0.2;
      arr[i * 3 + 2] = (seeded(i + 200) - 0.5) * 3.5 - 0.5;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.015;
    points.current.position.y = Math.sin(clock.elapsedTime * 0.12) * 0.05;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.028}
        color="#a8a29e"
        transparent
        opacity={0.4}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

export function BookScene({
  reducedMotion = false,
}: {
  reducedMotion?: boolean;
}) {
  if (reducedMotion) return null;

  return (
    <div className="book-scene" aria-hidden>
      <Canvas
        dpr={[1, 1.25]}
        camera={{ position: [0, 0.8, 5], fov: 40, near: 0.1, far: 20 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "low-power",
        }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.2} />
        <Dust />
      </Canvas>
    </div>
  );
}
