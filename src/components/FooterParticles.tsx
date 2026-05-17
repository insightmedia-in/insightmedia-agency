"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number;
  originalX?: number;
  originalY?: number;
  ax?: number;
  ay?: number;
}

interface ThemeColors {
  particleR: number;
  particleG: number;
  particleB: number;
}

const getDarkColors = (): ThemeColors => ({
  particleR: 255,
  particleG: 90,
  particleB: 31,
});

const getLightColors = (): ThemeColors => ({
  particleR: 244,
  particleG: 63,
  particleB: 94,
});

export const FooterParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const themeRef = useRef<"light" | "dark">("light");
  const colorsRef = useRef<ThemeColors>(getLightColors());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Detect current theme
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      const isLight = document.documentElement.classList.contains("light");
      themeRef.current = isLight ? "light" : "dark";
      colorsRef.current = isLight ? getLightColors() : getDarkColors();
    };

    updateTheme();

    // Listen for theme changes
    const handleThemeChange = () => {
      updateTheme();
    };

    window.addEventListener("themechange", handleThemeChange);

    // Also observe class changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Set canvas size based on container
    const handleResize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Subtle particle class for footer
    class FooterParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      depth: number;
      baseSpeed: number;
      oscillation: number;
      originalVx: number;
      originalVy: number;
      originalX: number;
      originalY: number;
      ax: number;
      ay: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.originalX = this.x;
        this.originalY = this.y;
        this.depth = 0.4 + Math.random() * 0.6;

        // Much slower than hero particles
        this.baseSpeed = 0.015 + this.depth * 0.02;
        this.vx = this.baseSpeed;
        this.originalVx = this.vx;
        this.vy = 0;
        this.originalVy = this.vy;

        this.ax = 0;
        this.ay = 0;

        this.oscillation = Math.random() * Math.PI * 2;

        // Smaller particles for subtlety
        this.radius = 0.4 + this.depth * 0.6;
      }

      update(width: number, height: number, time: number) {
        this.ax = 0;
        this.ay = 0;

        let flowVx = this.baseSpeed;
        // Much slower wave motion
        let flowVy =
          Math.sin(time * 0.0003 + this.oscillation) * (0.03 + this.depth * 0.02);

        this.ax = flowVx - this.vx * 0.02;
        this.ay = flowVy - this.vy * 0.02;

        this.vx += this.ax;
        this.vy += this.ay;

        this.vx *= 0.96;
        this.vy *= 0.96;

        this.x += this.vx;
        this.y += this.vy;

        this.originalX += (this.x - this.originalX) * 0.05;
        this.originalY += (this.y - this.originalY) * 0.05;

        if (this.x > width + 100) {
          this.x = -100;
          this.y = Math.random() * height;
          this.originalX = this.x;
          this.originalY = this.y;
        }

        if (this.y < -100) this.y = height + 100;
        if (this.y > height + 100) this.y = -100;
      }

      draw(ctx: CanvasRenderingContext2D, time: number, colors: ThemeColors) {
        // Very subtle pulse - much more muted
        const pulseAmount = Math.sin(time * 0.002) * 0.1 + 0.9;
        const { particleR, particleG, particleB } = colors;

        // Outer glow - very faint
        ctx.fillStyle = `rgba(${particleR}, ${particleG}, ${particleB}, ${0.008 * this.depth * pulseAmount})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Mid glow
        ctx.fillStyle = `rgba(${particleR}, ${particleG}, ${particleB}, ${0.015 * this.depth * pulseAmount})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Core node - also subtle
        ctx.fillStyle = `rgba(${particleR}, ${particleG}, ${particleB}, ${0.15 + 0.05 * pulseAmount})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize fewer particles for subtlety
    const particles: FooterParticle[] = [];
    const particleCount = 60; // Much fewer than hero's 180
    for (let i = 0; i < particleCount; i++) {
      particles.push(new FooterParticle(canvas.width, canvas.height));
    }
    particlesRef.current = particles as any;

    // Animation loop
    let animationId: number;
    const animate = () => {
      timeRef.current += 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colors = colorsRef.current;

      // No background gradient - transparent
      // This lets the footer background show through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Very subtle ambient glow
      const radialGradient = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.5,
        0,
        canvas.width * 0.5,
        canvas.height * 0.5,
        canvas.width * 0.7
      );
      radialGradient.addColorStop(
        0,
        `rgba(${colors.particleR}, ${colors.particleG}, ${colors.particleB}, 0.02)`
      );
      radialGradient.addColorStop(
        1,
        `rgba(${colors.particleR}, ${colors.particleG}, ${colors.particleB}, 0)`
      );
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update particles
      (particles as any).forEach((p: FooterParticle) => {
        p.update(canvas.width, canvas.height, timeRef.current);
      });

      // Draw network lines - very subtle
      (particles as any).forEach((p1: FooterParticle, i: number) => {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j] as any;
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy);

          const depthDiff = Math.abs(p1.depth - p2.depth);
          const baseConnectionDist = 120 - depthDiff * 40; // Shorter connections

          if (dist < baseConnectionDist && dist > 1) {
            const proximity = 1 - dist / baseConnectionDist;
            const baseOpacity = 0.03 * (p1.depth + p2.depth) * 0.5; // Much lower opacity
            const opacity = baseOpacity * proximity;

            if (opacity > 0.001) {
              // Only main line, no glow layer for subtlety
              ctx.strokeStyle = `rgba(${colors.particleR}, ${colors.particleG}, ${colors.particleB}, ${opacity})`;
              ctx.lineWidth = 0.6;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });

      // Draw particles
      (particles as any).forEach((p: FooterParticle) => {
        p.draw(ctx, timeRef.current, colors);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("themechange", handleThemeChange);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-60"
      style={{
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    />
  );
};
