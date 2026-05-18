"use client";

import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggleContent: React.FC = () => {
  const { theme, toggleTheme, isTransitioning } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTransitioning) return;

    // Pass click coordinates to cosmic trigger
    const rect = buttonRef.current?.getBoundingClientRect();
    const cx = rect ? rect.left + rect.width / 2 : e.clientX;
    const cy = rect ? rect.top + rect.height / 2 : e.clientY;

    toggleTheme(cx, cy);
  };

  return (
    <div className="theme-toggle-wrapper">
      <button
        ref={buttonRef}
        onClick={handleClick}
        aria-label="Toggle theme"
        className={`theme-toggle ${isTransitioning ? 'theme-toggle--transitioning' : ''}`}
        disabled={isTransitioning}
      >
        {/* Sun Icon (shown in Dark Mode) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            theme === "dark"
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 rotate-90"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          <svg className="w-5 h-5 text-gray-300" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="23" y1="12" x2="21" y2="12" />
            <line x1="3" y1="12" x2="1" y2="12" />
            <line x1="20.485" y1="3.515" x2="19.071" y2="4.929" />
            <line x1="4.929" y1="19.071" x2="3.515" y2="20.485" />
            <line x1="3.515" y1="3.515" x2="4.929" y2="4.929" />
            <line x1="19.071" y1="19.071" x2="20.485" y2="20.485" />
          </svg>
        </div>

        {/* Moon Icon (shown in Light Mode) */}
        <div
          className={`flex items-center justify-center transition-all duration-500 ${
            theme === "light"
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-90"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        >
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </button>

      {/* DARK / LIGHT label */}
      <span className="theme-toggle-label">
        {theme === "dark" ? "DARK" : "LIGHT"}
      </span>
    </div>
  );
};

export const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="theme-toggle-wrapper">
        <button className="theme-toggle" disabled><div /></button>
        <span className="theme-toggle-label">DARK</span>
      </div>
    );
  }

  return <ThemeToggleContent />;
};
