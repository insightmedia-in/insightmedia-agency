"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (clickX?: number, clickY?: number) => void;
  isTransitioning: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);

    // Apply theme to document on load
    if (initialTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }

    setMounted(true);
  }, []);

  const toggleTheme = useCallback((clickX?: number, clickY?: number) => {
    if (isTransitioning) return;
    
    const newTheme = theme === "dark" ? "light" : "dark";
    setIsTransitioning(true);
    
    // Update React state & localStorage immediately
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Dispatch cosmic trigger — NetworkCanvas will handle the 4-phase animation
    // and apply the CSS class change at the burst midpoint
    window.dispatchEvent(
      new CustomEvent("cosmic-trigger", {
        detail: {
          x: clickX ?? window.innerWidth / 2,
          y: clickY ?? 80,
          nextTheme: newTheme,
        },
      })
    );
    
    // Total transition time: attract(0.15) + collapse(0.15) + burst(0.10) + rebuild(0.25) = 0.65s
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  }, [theme, isTransitioning]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: mounted ? toggleTheme : () => {}, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeContextProvider");
  }
  return context;
};
