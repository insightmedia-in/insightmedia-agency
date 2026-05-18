"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

/**
 * ThemeTransitionOverlay — Smooth crossfade wash during theme switch.
 * GPU-optimized: only animates opacity.
 */
export const ThemeTransitionOverlay: React.FC = () => {
  const { isTransitioning, theme } = useTheme();
  const [overlayPhase, setOverlayPhase] = useState<"idle" | "fadeIn" | "fadeOut">("idle");
  const [overlayTheme, setOverlayTheme] = useState<"light" | "dark">("dark");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTransitioning) {
      setOverlayTheme(theme === "dark" ? "light" : "dark");
      setOverlayPhase("fadeIn");

      timeoutRef.current = setTimeout(() => {
        setOverlayPhase("fadeOut");
      }, 150);

      const cleanup = setTimeout(() => {
        setOverlayPhase("idle");
      }, 900);

      return () => {
        clearTimeout(cleanup);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }
  }, [isTransitioning, theme]);

  if (overlayPhase === "idle") return null;

  const isDarkOverlay = overlayTheme === "dark";

  return (
    <div
      className="theme-transition-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        pointerEvents: "none",
        willChange: "opacity",
        background: isDarkOverlay
          ? "radial-gradient(ellipse at 50% 40%, rgba(10,10,10,0.4) 0%, rgba(5,5,5,0.2) 50%, transparent 100%)"
          : "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.35) 0%, rgba(250,250,250,0.15) 50%, transparent 100%)",
        opacity: overlayPhase === "fadeIn" ? 1 : 0,
        transition: overlayPhase === "fadeIn"
          ? "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)"
          : "opacity 750ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />
  );
};
