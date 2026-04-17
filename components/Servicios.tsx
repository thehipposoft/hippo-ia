"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// ── Tipos ────────────────────────────────────────────────────────────────────

interface Service {
  index: string;
  title: string;
  description: string;
}

// ── Datos ────────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    index: "01 / 04",
    title: "Automatización\nde procesos",
    description:
      "Conectamos tus apps, eliminamos tareas repetitivas y hacemos que tu negocio funcione solo mientras vos te enfocás en lo importante.",
  },
  {
    index: "02 / 04",
    title: "Agentes\ninteligentes",
    description:
      "Sistemas de IA que toman decisiones, ejecutan tareas complejas y aprenden de tu negocio. Más que un bot, un colaborador digital.",
  },
  {
    index: "03 / 04",
    title: "Chatbots\na medida",
    description:
      "Atención al cliente, ventas o soporte técnico: entrenados con tu información, integrados en tu web o WhatsApp.",
  },
  {
    index: "04 / 04",
    title: "Integraciones\ny APIs",
    description:
      "Conectamos cualquier sistema con cualquier plataforma. CRMs, e-commerce, formularios, hojas de cálculo — todo sincronizado.",
  },
];

// flex-basis en porcentaje
const FLEX_BASE = 25;
const FLEX_EXPANDED = 38;
const FLEX_SHRUNK = (100 - FLEX_EXPANDED) / 3;

const DURATION = 0.45;
const EASE = "sine.out";

// ── DotGrid ──────────────────────────────────────────────────────────────────

const DotGrid = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
    <svg width="220" height="220" viewBox="0 0 220 220" aria-hidden="true">
      {Array.from({ length: 11 }, (_, row) =>
        Array.from({ length: 11 }, (_, col) => {
          const cx = col * 20 + 10;
          const cy = row * 20 + 10;
          const dx = cx - 110;
          const dy = cy - 110;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const r = Math.max(0.6, 2.8 - dist / 50);
          return (
            <circle
              key={`${row}-${col}`}
              cx={cx}
              cy={cy}
              r={r}
              fill="rgba(0,0,0,0.1)"
            />
          );
        })
      )}
    </svg>
  </div>
);

// ── ServiceCard ──────────────────────────────────────────────────────────────

interface CardProps {
  service: Service;
  cardRef: (el: HTMLDivElement | null) => void;
  onMouseEnter: () => void;
}

const ServiceCard = ({ service, cardRef, onMouseEnter }: CardProps) => (
  <div
    ref={cardRef}
    onMouseEnter={onMouseEnter}
    style={{ flexBasis: `${FLEX_BASE}%` }}
    className="
      relative flex flex-col justify-between
      min-h-[450px] shrink-0 overflow-hidden rounded-2xl
      bg-white/30 backdrop-blur-2xl
      border border-white/[0.13]
      shadow-[0_4px_32px_rgba(0,0,0,0.25)]
      px-8 py-9
    "
  >
    {/* Glow radial — hover via GSAP */}
    <div
      data-glow
      className="absolute inset-0 opacity-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,rgba(151,71,255,0.1)_0%,rgba(31,198,244,0.05)_50%,transparent_72%)]"
    />

    {/* Glint superior */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

    <DotGrid />

    {/* Título + descripción — TOP */}
    <div className="relative z-10">
      <h3 className="font-display text-2xl font-bold text-center uppercase leading-tight tracking-tight whitespace-pre-line text-on-surface">
        {service.title}
      </h3>
      <p
        data-desc
        className="mt-20 px-5 font-body text-base text-center leading-relaxed font-medium text-on-surface opacity-0 transition-opacity duration-300"
      >
        {service.description}
      </p>
    </div>

    {/* Index — BOTTOM */}
    <span className="relative z-10 font-display text-xs tracking-widest uppercase text-on-surface/35 self-start">
      {service.index}
    </span>
  </div>
);

// ── Services ─────────────────────────────────────────────────────────────────

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndex = useRef<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Textos del encabezado
      gsap.from(headerRef.current!.querySelectorAll("span, h2, p"), {
        opacity: 0,
        y: 22,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        },
      });

      // Cards
      gsap.from(cardRefs.current, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleExpand = (hoveredIdx: number) => {
    if (activeIndex.current === hoveredIdx) return;
    activeIndex.current = hoveredIdx;

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      gsap.to(card, {
        flexBasis: `${i === hoveredIdx ? FLEX_EXPANDED : FLEX_SHRUNK}%`,
        duration: DURATION,
        ease: EASE,
      });

      const desc = card.querySelector<HTMLElement>("[data-desc]");
      if (desc) {
        gsap.to(desc, {
          opacity: i === hoveredIdx ? 0.8 : 0,
          duration: 0.25,
          ease: "power1.out",
        });
      }

      const glow = card.querySelector<HTMLElement>("[data-glow]");
      if (glow) {
        gsap.to(glow, {
          opacity: i === hoveredIdx ? 1 : 0,
          duration: 0.4,
          ease: "power1.out",
        });
      }
    });
  };

  const handleReset = () => {
    activeIndex.current = null;

    cardRefs.current.forEach((card) => {
      if (!card) return;

      gsap.to(card, {
        flexBasis: `${FLEX_BASE}%`,
        duration: DURATION,
        ease: EASE,
      });

      const desc = card.querySelector<HTMLElement>("[data-desc]");
      if (desc) gsap.to(desc, { opacity: 0, duration: 0.2 });

      const glow = card.querySelector<HTMLElement>("[data-glow]");
      if (glow) gsap.to(glow, { opacity: 0, duration: 0.35 });
    });
  };

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="w-full py-20 md:py-28 px-5 md:px-12"
    >
      {/* Encabezado */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-12">
        <span className="font-display text-xs tracking-widest uppercase text-white/35">
          Servicios
        </span>
        <div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-on-surface">
            Lo que podemos hacer
            <br />
            por tu negocio
          </h2>
          <p className="font-body text-base text-on-surface/50 max-w-sm leading-relaxed">
            Desde chatbots que atienden 24/7 hasta flujos de trabajo completamente
            automatizados. Elegimos la herramienta exacta para cada problema.
          </p>
        </div>
      </div>

      {/* Cards — sin wrapper oscuro, flotan sobre la sección */}
      <div className="max-w-7xl mx-auto">
        <div
          className="flex flex-col md:flex-row gap-3"
          onMouseLeave={handleReset}
        >
          {SERVICES.map((service, idx) => (
            <ServiceCard
              key={service.index}
              service={service}
              cardRef={(el) => {
                cardRefs.current[idx] = el;
              }}
              onMouseEnter={() => handleExpand(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
