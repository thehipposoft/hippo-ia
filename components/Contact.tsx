"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { AuroraBackground } from "./AuroraBackground";

gsap.registerPlugin(ScrollTrigger);

// ── Datos ────────────────────────────────────────────────────────────────────

interface ContactCard {
  label: string;
  linkText: string;
  href: string;
  src: string;
  iconBg: string;
}

const CONTACTS: ContactCard[] = [
  {
    label: "WhatsApp",
    linkText: "+54 387 518 0018",
    href: "https://wa.me/543875180018",
    src: "/assets/images/logos/whatsapp-icon.svg",
    iconBg: "bg-[#25D366]",
  },
  {
    label: "Gmail",
    linkText: "hello@thehipposoft.com",
    href: "mailto:hello@thehipposoft.com",
    src: "/assets/images/logos/gmail.svg",
    iconBg: "bg-white",
  },
  {
    label: "Instagram",
    linkText: "@thehipposoft",
    href: "https://www.instagram.com/thehipposoft",
    src: "/assets/images/logos/instagram-icon.svg",
    iconBg: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]",
  },
];

// ── Card con efecto de física ────────────────────────────────────────────────

const Card = ({ card }: { card: ContactCard }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    // Posición normalizada -1 → 1 relativa al centro de la card
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);

    gsap.to(el, {
      rotateY:           dx * 10,
      rotateX:          -dy * 10,
      x:                 dx * 6,
      y:                 dy * 6,
      transformPerspective: 700,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      overwrite: true,
    });
  };

  return (
    <a
      ref={cardRef}
      href={card.href}
      target={card.href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="
        group relative flex flex-col gap-5
        rounded-2xl
        bg-white/[0.07] border border-white/[0.12] shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-xl
        px-7 py-8
        will-change-transform
      "
    >
      {/* Glow radial que sigue al cursor */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_50%_0%,rgba(151,71,255,0.1)_0%,transparent_70%)] pointer-events-none" />

      {/* Glint superior */}
      <div className="absolute top-0 inset-x-0 h-px rounded-t-2xl opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Icono */}
      <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center shadow-sm overflow-hidden shrink-0`}>
        <Image
          src={card.src}
          alt={card.label}
          width={45}
          height={45}
          className="object-contain"
        />
      </div>

      {/* Texto */}
      <div className="flex flex-col gap-1">
        <p className="font-display text-lg font-bold text-white">
          {card.label}
        </p>
      </div>

      {/* Link */}
      <div className="mt-auto flex items-center gap-1.5 font-display text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200">
        {card.linkText}
        <span aria-hidden="true">→</span>
      </div>
    </a>
  );
};

// ── Contact ───────────────────────────────────────────────────────────────────

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!.children, {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative overflow-hidden w-full py-20 md:py-28 px-5 md:px-12 bg-[#13111e]"
    >
      <AuroraBackground subtle />
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div ref={headerRef} className="mb-12 text-center">
          <span className="font-display text-xs tracking-widest uppercase text-white/40">
            Contacto
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
            Hablemos
          </h2>
          <p className="mt-4 font-body text-base text-white/55 max-w-sm mx-auto leading-relaxed">
            Elegí el canal que más te guste y contanos en qué podemos ayudarte.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {CONTACTS.map((card) => (
            <Card key={card.label} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};
