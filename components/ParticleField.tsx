"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 200;
const SPREAD_X = 16;
const SPREAD_Y = 10;
const BASE_SPEED = 0.003;
const MOUSE_RADIUS = 2.5;
const MOUSE_FORCE = 0.02;

// Colores de marca con variantes de peso visual
const BRAND_COLORS = [
  new THREE.Color("#9747ff"),
  new THREE.Color("#9747ff"),
  new THREE.Color("#1fc6f4"),
  new THREE.Color("#1fc6f4"),
  new THREE.Color("#c084fc"),
  new THREE.Color("#a78bfa"),
  new THREE.Color("#67e8f9"),
];

type FieldProps = {
  mouse: React.MutableRefObject<[number, number]>;
};

const Field = ({ mouse }: FieldProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SPREAD_X * 2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y * 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;

      vel[i * 3] = (Math.random() - 0.5) * BASE_SPEED * 2;
      vel[i * 3 + 1] = (Math.random() - 0.5) * BASE_SPEED * 2;

      const c = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, velocities: vel, colors: col };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const [mx, my] = mouse.current;
    const mouseX = mx * SPREAD_X;
    const mouseY = my * SPREAD_Y;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;

      pos[ix] += velocities[ix];
      pos[ix + 1] += velocities[ix + 1];

      // Rebote en bordes
      if (Math.abs(pos[ix]) > SPREAD_X) velocities[ix] *= -1;
      if (Math.abs(pos[ix + 1]) > SPREAD_Y) velocities[ix + 1] *= -1;

      // Repulsión suave del cursor
      const dx = pos[ix] - mouseX;
      const dy = pos[ix + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
        pos[ix] += (dx / dist) * force;
        pos[ix + 1] += (dy / dist) * force;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
      />
    </points>
  );
};

export const ParticleField = () => {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 18], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Field mouse={mouse} />
    </Canvas>
  );
};
