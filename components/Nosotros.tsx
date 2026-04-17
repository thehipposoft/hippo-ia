"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// ── Datos ────────────────────────────────────────────────────────────────────

const INTRO =
  "Somos una agencia digital con años de experiencia en branding, diseño web y desarrollo. Ahora sumamos un nuevo capítulo: aplicar inteligencia artificial para que nuestros clientes hagan más con menos.";

const PARAGRAPHS = [
  "No somos una consultora que habla de IA en abstracto. Construimos, integramos y entregamos soluciones que funcionan — en tu negocio, con tus herramientas, desde el día uno.",
  "Nuestro equipo une el mundo del diseño y la tecnología con el poder de los modelos de lenguaje más avanzados del momento. El resultado es una combinación difícil de encontrar: creatividad estratégica con ejecución técnica real.",
  "Si estás pensando en automatizar algo de tu negocio, estás en el lugar correcto.",
];

// ── Nosotros ─────────────────────────────────────────────────────────────────

export const Nosotros = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: "top 70%" };

      gsap.from(leftRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: trigger,
      });

      gsap.from(logoRef.current, {
        opacity: 0,
        scale: 0.88,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: trigger,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="w-full py-20 md:py-32 px-5 md:px-12 bg-surface-container-low rounded-t-4xl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <span className="font-display text-xs tracking-widest uppercase text-white">
          Nosotros
        </span>

        {/* Grid asimétrico: texto 3fr / logo 2fr */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-12 md:gap-20 items-center">

          {/* Columna izquierda: copy */}
          <div ref={leftRef}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              HippoSoft,{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ahora con IA
              </span>
            </h2>

            <p className="mt-7 font-body text-base leading-relaxed text-white/80">
              {INTRO}
            </p>

            {PARAGRAPHS.map((text, i) => (
              <p
                key={i}
                className="mt-5 font-body text-base leading-relaxed text-white/80"
              >
                {text}
              </p>
            ))}

            <Link
              href="#servicios"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-secondary px-7 py-3 font-display text-sm font-bold text-on-primary transition-opacity duration-200 hover:opacity-90"
            >
              Quiero automatizar
            </Link>
          </div>

          {/* Columna derecha: logo */}
          <div ref={logoRef} className="flex items-center justify-center">
            <div className="relative w-56 h-64 md:w-72 md:h-80">
              <Image
                src="/assets/images/HIPPOSOFT_CORTADO.svg"
                alt="HippoSoft"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
