"use client";

import { useSmoothScroll } from "@/lib/hooks/useSmoothScroll";

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  useSmoothScroll();
  return <>{children}</>;
};
