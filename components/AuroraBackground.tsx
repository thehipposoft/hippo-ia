"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Gradientes base — adaptados al brand purple/cyan
const AURORA_GRADIENT = [
  "repeating-linear-gradient(100deg, white 0%, white 7%, transparent 10%, transparent 12%, white 16%)",
  "repeating-linear-gradient(100deg, #9747ff 10%, #c084fc 15%, #1fc6f4 20%, #a78bfa 25%, #9747ff 30%)",
].join(", ");

const AURORA_BLEND_GRADIENT = [
  "repeating-linear-gradient(100deg, white 0%, white 7%, transparent 10%, transparent 12%, white 16%)",
  "repeating-linear-gradient(100deg, #9747ff 10%, #c084fc 15%, #1fc6f4 20%, #a78bfa 25%, #9747ff 30%)",
].join(", ");

// Versión subtle (fondo oscuro) — sin invert, más lenta y opaca
const AURORA_SUBTLE = [
  "repeating-linear-gradient(100deg, transparent 0%, transparent 7%, rgba(151,71,255,0.4) 10%, rgba(192,132,252,0.3) 15%, rgba(31,198,244,0.4) 20%, rgba(167,139,250,0.3) 25%, transparent 30%)",
].join(", ");

interface AuroraProps {
  /** Variante para fondos oscuros: sin invert, baja opacidad, velocidad reducida */
  subtle?: boolean;
}

// ── AuroraBackground ──────────────────────────────────────────────────────────

export const AuroraBackground = ({ subtle = false }: AuroraProps) => {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x1 = 50;
    let x2 = 50;

    const speed1 = subtle ? 0.12 : 0.35;
    const speed2 = subtle ? 0.07 : 0.22;

    const tick = gsap.ticker.add(() => {
      x1 = (x1 + speed1) % 400;
      x2 = (x2 + speed2) % 400;

      if (layer1Ref.current) layer1Ref.current.style.backgroundPosition = `${x1}% 50%`;
      if (layer2Ref.current) layer2Ref.current.style.backgroundPosition = `${x2}% 50%`;
    });

    return () => gsap.ticker.remove(tick);
  }, [subtle]);

  if (subtle) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Capa única — colores directos sin invert, muy sutil */}
        <div
          ref={layer1Ref}
          style={{
            backgroundImage: AURORA_SUBTLE,
            backgroundSize: "400% 100%",
            backgroundPosition: "50% 50%",
          }}
          className="
            absolute -inset-[10px] opacity-[0.18] will-change-[background-position]
            blur-[40px]
            [mask-image:radial-gradient(ellipse_at_50%_50%,black_20%,transparent_80%)]
          "
        />
        {/* Capa secundaria — desplazada para crear movimiento orgánico */}
        <div
          ref={layer2Ref}
          style={{
            backgroundImage: AURORA_SUBTLE,
            backgroundSize: "300% 100%",
            backgroundPosition: "50% 50%",
          }}
          className="
            absolute -inset-[10px] opacity-[0.10] will-change-[background-position]
            blur-[60px] mix-blend-screen
          "
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Capa principal */}
      <div
        ref={layer1Ref}
        style={{
          backgroundImage: AURORA_GRADIENT,
          backgroundSize: "300% 200%",
          backgroundPosition: "50% 50%",
        }}
        className="
          absolute -inset-[10px] opacity-50 will-change-[background-position]
          blur-[10px] invert dark:invert-0
          [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]
        "
      />

      {/* Capa blend — más lenta, crea profundidad */}
      <div
        ref={layer2Ref}
        style={{
          backgroundImage: AURORA_BLEND_GRADIENT,
          backgroundSize: "200% 100%",
          backgroundPosition: "50% 50%",
        }}
        className="
          absolute -inset-[10px] opacity-40 will-change-[background-position]
          blur-[10px] invert dark:invert-0 mix-blend-difference
        "
      />
    </div>
  );
};
