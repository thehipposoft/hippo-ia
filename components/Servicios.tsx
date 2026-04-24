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
    index: "01",
    title: "Automatización\nde procesos",
    description:
      "Conectamos tus apps, eliminamos tareas repetitivas y hacemos que tu negocio funcione solo mientras vos te enfocás en lo importante.",
  },
  {
    index: "02",
    title: "Agentes\ninteligentes",
    description:
      "Sistemas de IA que toman decisiones, ejecutan tareas complejas y aprenden de tu negocio. Más que un bot, un colaborador digital.",
  },
  {
    index: "03",
    title: "Chatbots\na medida",
    description:
      "Atención al cliente, ventas o soporte técnico: entrenados con tu información, integrados en tu web o WhatsApp.",
  },
  {
    index: "04",
    title: "Integraciones\ny APIs",
    description:
      "Conectamos cualquier sistema con cualquier plataforma. CRMs, e-commerce, formularios, hojas de cálculo — todo sincronizado.",
  },
];

// ── ServiceCard ──────────────────────────────────────────────────────────────

interface CardProps {
  service: Service;
  cardRef: (el: HTMLDivElement | null) => void;
}

const ServiceCard = ({ service, cardRef }: CardProps) => (
  <div
    ref={cardRef}
    className="
      relative flex flex-col
      min-h-[300px] overflow-hidden rounded-2xl
      bg-white/[0.06] backdrop-blur-xl
      border border-white/[0.10]
      shadow-[0_4px_32px_rgba(0,0,0,0.12)]
      px-8 py-9 gap-6
    "
  >
    {/* Glint superior */}
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

    {/* Separador + index */}
    <div className="flex items-center gap-4">
      <span className="font-display text-xs tracking-widest text-on-surface/35">
        {service.index}
      </span>
    </div>

    {/* Título */}
    <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight whitespace-pre-line text-on-surface leading-tight">
      {service.title}
    </h3>



    {/* Descripción */}
    <p className="font-body text-base leading-relaxed text-on-surface/60">
      {service.description}
    </p>
  </div>
);

// ── Services ─────────────────────────────────────────────────────────────────

export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="w-full py-20 md:py-28 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">

          {/* Columna izquierda — sticky */}
          <div className="md:sticky md:top-32 md:self-start md:w-2/5 shrink-0">
            <span className="font-display text-xs tracking-widest uppercase text-on-surface/35">
              Servicios
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-black md:font-bold tracking-tight text-on-surface md:leading-tight">
              Lo que podemos hacer
              <br />
              por tu negocio
            </h2>
            <p className="mt-6 font-body text-base text-on-surface/50 leading-relaxed max-w-sm">
              Desde chatbots que atienden 24/7 hasta flujos de trabajo completamente
              automatizados. Elegimos la herramienta exacta para cada problema.
            </p>
          </div>

          {/* Columna derecha — cards */}
          <div className="flex-1 flex flex-col gap-5">
            {SERVICES.map((service, idx) => (
              <ServiceCard
                key={service.index}
                service={service}
                cardRef={(el) => {
                  cardRefs.current[idx] = el;
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
