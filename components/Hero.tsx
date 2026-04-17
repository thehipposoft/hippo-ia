"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { ParticleSphere } from "./ParticleSphere";

export const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(contentRef.current!.children, {
      opacity: 0,
      y: 28,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.18,
      delay: 0.15,
    });
  }, []);

  return (
    <section className="relative flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-24 text-center min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParticleSphere />
      </div>

      <div ref={contentRef} className="relative z-10 flex flex-col items-center">
        <h1 className="max-w-2xl font-display text-5xl font-bold tracking-tight text-on-surface md:text-6xl lg:text-8xl leading-20">
          Sumate a la revolución IA
        </h1>

        <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-on-surface/60">
          Automatizá procesos, potenciá tu equipo y diseñá el futuro
          con inteligencia artificial de última generación.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="#servicios"
            className="rounded-xl bg-gradient-to-br from-primary to-secondary px-8 py-3 font-display text-sm font-bold text-on-primary transition-opacity duration-200 hover:opacity-90"
          >
            Quiero automatizar
          </Link>
        </div>
      </div>
    </section>
  );
};
