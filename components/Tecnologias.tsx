"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

// ── Datos ────────────────────────────────────────────────────────────────────

interface Logo {
  src: string;
  label: string;
}

const LOGOS: Logo[] = [
  { src: "/assets/images/logos/claude-ai-icon.svg", label: "Claude AI" },
  { src: "/assets/images/logos/gemini.svg", label: "Gemini" },
  { src: "/assets/images/logos/n8n.svg", label: "n8n" },
  { src: "/assets/images/logos/whatsapp-icon.svg", label: "WhatsApp" },
  { src: "/assets/images/logos/wordpress.svg", label: "WordPress" },
  { src: "/assets/images/logos/google-sheets.svg", label: "Google Sheets" },
  { src: "/assets/images/logos/telegram.svg", label: "Telegram" },
  { src: "/assets/images/logos/meta.svg", label: "Meta" },
  { src: "/assets/images/logos/postman.svg", label: "Postman" },
  { src: "/assets/images/logos/nextjs_icon_dark.svg", label: "Next.js" },
  { src: "/assets/images/logos/claudecode-color.svg", label: "Claude Code" },
  { src: "/assets/images/logos/notion.svg", label: "Notion" },
];

// Duplicamos para loop infinito
const TRACK = [...LOGOS, ...LOGOS];

const MARQUEE_DURATION = 28;

// ── Tecnologias ───────────────────────────────────────────────────────────────

const Tecnologias = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tween = gsap.to(trackRef.current, {
      x: "-50%",
      duration: MARQUEE_DURATION,
      ease: "none",
      repeat: -1,
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section className="w-full py-20 md:pb-40 md:pt-20 bg-surface overflow-hidden">
      {/* Encabezado */}
      <div className="max-w-7xl mx-auto px-5 md:px-12 mb-14 text-center">
        <span className="font-display text-xs tracking-widest uppercase text-on-surface/40">
          Stack tecnológico
        </span>
        <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight text-on-surface leading-tight">
          Usamos lo último en tecnología
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            para potenciarte
          </span>
        </h2>
      </div>

      {/* Carrusel — mask fade en los bordes */}
      <div className="[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div ref={trackRef} className="flex w-max gap-4">
          {TRACK.map(({ src, label }, i) => (
            <div
              key={`${label}-${i}`}
              className="flex items-center gap-3 rounded-2xl bg-on-surface/[0.05] border border-on-surface/[0.08] px-5 py-3 shrink-0"
            >
              <div className="relative w-8 h-8 shrink-0">
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-body text-sm font-medium text-on-surface/70 whitespace-nowrap">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tecnologias;
