"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 5500;
const TORUS_MAJOR = 2.2;
const TORUS_MINOR = 0.85;
const HOVER_RADIUS = 1.5;
const HOVER_FORCE = 0.9;
const RETURN_SPEED = 0.1;

type ParticlesProps = {
  mouse: React.MutableRefObject<[number, number]>;
};

const Particles = ({ mouse }: ParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, origPositions } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const orig = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      const x = (TORUS_MAJOR + TORUS_MINOR * Math.cos(v)) * Math.cos(u);
      const y = (TORUS_MAJOR + TORUS_MINOR * Math.cos(v)) * Math.sin(u);
      const z = TORUS_MINOR * Math.sin(v);

      pos[i * 3] = orig[i * 3] = x;
      pos[i * 3 + 1] = orig[i * 3 + 1] = y;
      pos[i * 3 + 2] = orig[i * 3 + 2] = z;
    }

    return { positions: pos, origPositions: orig };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    // Rotación continua lenta
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.09;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.04;

    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const [mx, my] = mouse.current;

    // Convertir NDC del mouse a espacio world aproximado
    const wx = mx * 4;
    const wy = my * 4;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const dx = pos[ix] - wx;
      const dy = pos[ix + 1] - wy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Empujar partículas cerca del cursor
      if (dist < HOVER_RADIUS && dist > 0) {
        const force = (1 - dist / HOVER_RADIUS) * HOVER_FORCE;
        pos[ix] += (dx / dist) * force;
        pos[ix + 1] += (dy / dist) * force;
      }

      // Retorno elástico a posición original
      pos[ix] += (origPositions[ix] - pos[ix]) * RETURN_SPEED;
      pos[ix + 1] += (origPositions[ix + 1] - pos[ix + 1]) * RETURN_SPEED;
      pos[ix + 2] += (origPositions[ix + 2] - pos[ix + 2]) * RETURN_SPEED;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#121317"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  );
};

export const ParticleSphere = () => {
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
      camera={{ position: [0, 0, 6.5], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Particles mouse={mouse} />
    </Canvas>
  );
};
