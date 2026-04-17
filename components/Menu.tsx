"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
] as const;

const BG_DEFAULT  = "rgba(235, 235, 235, 0.01)";
const BG_SCROLLED = "rgba(235, 235, 235, 0.3)";
const WIDTH_DEFAULT  = "64rem";  // max-w-5xl
const WIDTH_SCROLLED = "42rem";
const SCROLL_THRESHOLD = 60;

export const Menu = () => {
  const pillRef = useRef<HTMLDivElement>(null);
  const wasScrolled = useRef(false);

  useEffect(() => {
    const animate = (scrolled: boolean) => {
      gsap.to(pillRef.current, {
        maxWidth: scrolled ? WIDTH_SCROLLED : WIDTH_DEFAULT,
        backgroundColor: scrolled ? BG_SCROLLED : BG_DEFAULT,
        duration: 1,
        ease: "power2.inOut",
        overwrite: true,
      });
    };

    const onScroll = () => {
      const scrolled = window.scrollY > SCROLL_THRESHOLD;
      if (scrolled === wasScrolled.current) return;
      wasScrolled.current = scrolled;
      animate(scrolled);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 pt-4">
      <div
        ref={pillRef}
        className="mx-auto flex w-full items-center justify-between rounded-full backdrop-blur-sm px-8 py-4"
        style={{ backgroundColor: BG_DEFAULT, maxWidth: WIDTH_DEFAULT }}
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 select-none">
          <Image
            src="/assets/images/logo.png"
            alt="Hippo IA"
            width={100}
            height={100}
            className="object-contain"
          />
        </a>

        {/* Nav links */}
        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="font-display text-sm font-semibold text-on-surface transition-opacity duration-200 hover:opacity-60"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};
