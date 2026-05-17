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
  bgGradient1: string;
  bgGradient2: string;
  bgGradient3: string;
  ambientR: number;
  ambientG: number;
  ambientB: number;
}

const getDarkColors = (): ThemeColors => ({
  particleR: 255,
  particleG: 90,
  particleB: 31,
  bgGradient1: "#0a0a0a",
  bgGradient2: "#050505",
  bgGradient3: "#0f0f19",
  ambientR: 255,
  ambientG: 90,
  ambientB: 31,
});

const getLightColors = (): ThemeColors => ({
  particleR: 255,
  particleG: 107,
  particleB: 107,
  bgGradient1: "#ffffff",
  bgGradient2: "#ffffff",
  bgGradient3: "#f5f5f5",
  ambientR: 255,
  ambientG: 107,
  ambientB: 107,
});

export const NetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const themeRef = useRef<"light" | "dark">("dark");
  const colorsRef = useRef<ThemeColors>(getDarkColors());

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

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    // Particle class with physics-based cursor interaction
    class Particle {
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
        this.depth = 0.3 + Math.random() * 0.7;

        this.baseSpeed = 0.04 + this.depth * 0.08;
        this.vx = this.baseSpeed;
        this.originalVx = this.vx;
        this.vy = 0;
        this.originalVy = this.vy;

        this.ax = 0;
        this.ay = 0;

        this.oscillation = Math.random() * Math.PI * 2;

        this.radius = 0.8 + this.depth * 1.2;
      }

      update(width: number, height: number, time: number, mouse: typeof mouseRef.current) {
        this.ax = 0;
        this.ay = 0;

        let flowVx = this.baseSpeed;
        let flowVy = Math.sin(time * 0.0008 + this.oscillation) * (0.08 + this.depth * 0.05);

        this.ax = flowVx - this.vx * 0.02;
        this.ay = flowVy - this.vy * 0.02;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          const attractionRadius = 350;
          const repulsionRadius = 100;

          if (dist < attractionRadius && dist > 2) {
            if (dist > repulsionRadius) {
              const attractionStrength = Math.pow(1 - dist / attractionRadius, 2) * 0.12;
              this.ax += (dx / dist) * attractionStrength;
              this.ay += (dy / dist) * attractionStrength;
            } else {
              const repulsionStrength = (1 - dist / repulsionRadius) * 0.10;
              this.ax -= (dx / dist) * repulsionStrength;
              this.ay -= (dy / dist) * repulsionStrength;
            }
          }
        }

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
        const pulseAmount = Math.sin(time * 0.004) * 0.2 + 0.8;
        const { particleR, particleG, particleB } = colors;

        // Outer glow
        ctx.fillStyle = `rgba(${particleR}, ${particleG}, ${particleB}, ${0.02 * this.depth * pulseAmount})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Mid glow
        ctx.fillStyle = `rgba(${particleR}, ${particleG}, ${particleB}, ${0.04 * this.depth * pulseAmount})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        ctx.fillStyle = `rgba(${particleR}, ${particleG}, ${particleB}, ${0.08 * this.depth * pulseAmount})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.fillStyle = `rgba(${particleR}, ${particleG}, ${particleB}, ${0.4 + 0.1 * pulseAmount})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const particles: Particle[] = [];
    // Reduce particle count for mobile devices for better performance
    const screenWidth = canvas.width;
    let particleCount = 180;
    if (screenWidth < 768) {
      particleCount = 80; // Mobile: reduce to 80
    } else if (screenWidth < 1024) {
      particleCount = 120; // Tablet: reduce to 120
    }
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }
    particlesRef.current = particles;

    // Animation loop
    let animationId: number;
    const animate = () => {
      timeRef.current += 1;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colors = colorsRef.current;

      // Background gradient with theme colors
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, colors.bgGradient1);
      gradient.addColorStop(0.5, colors.bgGradient2);
      gradient.addColorStop(1, colors.bgGradient3);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ambient radial glow
      const radialGradient = ctx.createRadialGradient(
        canvas.width * 0.2,
        canvas.height * 0.3,
        0,
        canvas.width * 0.2,
        canvas.height * 0.3,
        canvas.width * 0.9
      );
      radialGradient.addColorStop(0, `rgba(${colors.ambientR}, ${colors.ambientG}, ${colors.ambientB}, 0.05)`);
      radialGradient.addColorStop(1, `rgba(${colors.ambientR}, ${colors.ambientG}, ${colors.ambientB}, 0)`);
      ctx.fillStyle = radialGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Enhanced mouse glow
      if (mouseRef.current.active) {
        const ambientGradient = ctx.createRadialGradient(
          canvas.width * 0.2,
          canvas.height * 0.3,
          0,
          canvas.width * 0.2,
          canvas.height * 0.3,
          canvas.width * 0.9
        );
        ambientGradient.addColorStop(0, `rgba(${colors.ambientR}, ${colors.ambientG}, ${colors.ambientB}, 0.02)`);
        ambientGradient.addColorStop(1, `rgba(${colors.ambientR}, ${colors.ambientG}, ${colors.ambientB}, 0)`);
        ctx.fillStyle = ambientGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Update particles
      particles.forEach((p) => {
        p.update(canvas.width, canvas.height, timeRef.current, mouseRef.current);
      });

      // Draw network lines
      particles.forEach((p1, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy);

          const depthDiff = Math.abs(p1.depth - p2.depth);
          let baseConnectionDist = 150 - depthDiff * 50;
          let connectionTension = 1;

          if (mouseRef.current.active) {
            const m1ToMouse = Math.hypot(
              mouseRef.current.x - p1.x,
              mouseRef.current.y - p1.y
            );
            const m2ToMouse = Math.hypot(
              mouseRef.current.x - p2.x,
              mouseRef.current.y - p2.y
            );
            const cursorRadius = 380;

            if (m1ToMouse < cursorRadius && m2ToMouse < cursorRadius) {
              baseConnectionDist = 300;
              const avgDistToMouse = (m1ToMouse + m2ToMouse) / 2;
              const mouseProximity = 1 - avgDistToMouse / cursorRadius;
              connectionTension = 1 + mouseProximity * 0.5;
            }
          }

          if (dist < baseConnectionDist * connectionTension && dist > 1) {
            const proximity = 1 - dist / (baseConnectionDist * connectionTension);
            const baseOpacity = 0.08 * (p1.depth + p2.depth) * 0.5;
            const opacity = baseOpacity * proximity;

            if (opacity > 0.001) {
              // Glow layer
              ctx.strokeStyle = `rgba(${colors.ambientR}, ${colors.ambientG}, ${colors.ambientB}, ${opacity * 0.3})`;
              ctx.lineWidth = 2;
              ctx.lineCap = "round";
              ctx.lineJoin = "round";
              ctx.globalCompositeOperation = "screen";
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();

              // Main line
              ctx.strokeStyle = `rgba(${colors.ambientR}, ${colors.ambientG}, ${colors.ambientB}, ${opacity})`;
              ctx.lineWidth = 0.8 + (connectionTension - 1) * 0.4;
              ctx.globalCompositeOperation = "source-over";
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });

      ctx.globalCompositeOperation = "source-over";

      // Draw particles
      particles.forEach((p) => {
        p.draw(ctx, timeRef.current, colors);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("themechange", handleThemeChange);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`
        fixed top-0 left-0 w-full h-full pointer-events-none z-0
        dark:bg-gradient-to-br dark:from-brand-dark dark:via-black dark:to-gray-900
        light:bg-gradient-to-br light:from-gray-50 light:via-white light:to-gray-100
      `}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
    />
  );
};
