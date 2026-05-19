"use client";

import React, { useEffect, useRef } from "react";

interface ThemeColors {
  particleR: number;
  particleG: number;
  particleB: number;
  bgR1: number; bgG1: number; bgB1: number;
  bgR2: number; bgG2: number; bgB2: number;
  bgR3: number; bgG3: number; bgB3: number;
  ambientR: number;
  ambientG: number;
  ambientB: number;
  particleOpacity: number;
  lineOpacity: number;
  ambientIntensity: number;
  glowScale: number;
}

const getDarkColors = (): ThemeColors => ({
  particleR: 255, particleG: 90, particleB: 31,
  bgR1: 10, bgG1: 10, bgB1: 10,
  bgR2: 5, bgG2: 5, bgB2: 5,
  bgR3: 15, bgG3: 15, bgB3: 25,
  ambientR: 255, ambientG: 90, ambientB: 31,
  particleOpacity: 1.0, lineOpacity: 1.0,
  ambientIntensity: 0.04, glowScale: 1.0, // Reduced from 0.08 — less overpowering glow
});

const getLightColors = (): ThemeColors => ({
  particleR: 220, particleG: 60, particleB: 75,  // Deeper pink-red for visibility on white
  bgR1: 252, bgG1: 248, bgB1: 252,
  bgR2: 255, bgG2: 252, bgB2: 255,
  bgR3: 248, bgG3: 244, bgB3: 250,
  ambientR: 230, ambientG: 80, ambientB: 100,
  particleOpacity: 1.0, lineOpacity: 1.2,         // Boosted — lines must be clearly visible
  ambientIntensity: 0.12, glowScale: 1.1,          // Warm pink ambient glow + larger halos
});

const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
const clamp = (v: number, min: number, max: number): number => Math.max(min, Math.min(max, v));
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
const easeInCubic = (t: number): number => Math.pow(clamp(t, 0, 1), 3);
const easeInOutCubic = (t: number): number => { const e = clamp(t, 0, 1); return e * e * (3 - 2 * e); };

const lerpColors = (a: ThemeColors, b: ThemeColors, t: number): ThemeColors => ({
  particleR: lerp(a.particleR, b.particleR, t),
  particleG: lerp(a.particleG, b.particleG, t),
  particleB: lerp(a.particleB, b.particleB, t),
  bgR1: lerp(a.bgR1, b.bgR1, t), bgG1: lerp(a.bgG1, b.bgG1, t), bgB1: lerp(a.bgB1, b.bgB1, t),
  bgR2: lerp(a.bgR2, b.bgR2, t), bgG2: lerp(a.bgG2, b.bgG2, t), bgB2: lerp(a.bgB2, b.bgB2, t),
  bgR3: lerp(a.bgR3, b.bgR3, t), bgG3: lerp(a.bgG3, b.bgG3, t), bgB3: lerp(a.bgB3, b.bgB3, t),
  ambientR: lerp(a.ambientR, b.ambientR, t), ambientG: lerp(a.ambientG, b.ambientG, t), ambientB: lerp(a.ambientB, b.ambientB, t),
  particleOpacity: lerp(a.particleOpacity, b.particleOpacity, t),
  lineOpacity: lerp(a.lineOpacity, b.lineOpacity, t),
  ambientIntensity: lerp(a.ambientIntensity, b.ambientIntensity, t),
  glowScale: lerp(a.glowScale, b.glowScale, t),
});

// ==========================================
// COSMIC TRANSITION STATE
// ==========================================
type TransitionPhase = "idle" | "attract" | "collapse" | "burst" | "rebuild";

interface CosmicTransition {
  active: boolean;
  phase: TransitionPhase;
  t: number; 
  cx: number; 
  cy: number; 
  nextTheme: "light" | "dark";
  midpointFired: boolean;
  oldColors: ThemeColors;
  newColors: ThemeColors;
}

const PHASE_DURATIONS = {
  attract: 0.15,   // ultra-snappy
  collapse: 0.15,
  burst: 0.10,
  rebuild: 0.25,
};

export const NetworkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const themeRef = useRef<"light" | "dark">("dark");
  const currentColorsRef = useRef<ThemeColors>(getDarkColors());
  const transitionRef = useRef<CosmicTransition>({
    active: false, phase: "idle", t: 0,
    cx: 0, cy: 0, nextTheme: "dark",
    midpointFired: false,
    oldColors: getDarkColors(), newColors: getDarkColors(),
  });
  
  const shockRef = useRef(0);
  const shockAngleRef = useRef(0);

  const fallbackRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // alpha:false = opaque canvas, avoids compositing issues on low-GPU mobile/WebView
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      // Canvas failed — show static fallback
      fallbackRef.current = true;
      return;
    }

    class Particle {
      x: number; y: number;
      vx: number; vy: number;
      radius: number; depth: number;
      baseSpeed: number; oscillation: number;
      ax: number; ay: number;
      seed: number;
      homeX: number; homeY: number;
      burstVx: number; burstVy: number;
      clusterX: number; clusterY: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.homeX = this.x;
        this.homeY = this.y;
        this.depth = 0.3 + Math.random() * 0.7;
        this.seed = Math.random();
        this.baseSpeed = 0.015 + this.depth * 0.03; // Slowed down
        this.vx = this.baseSpeed;
        this.vy = 0;
        this.ax = 0; this.ay = 0;
        this.oscillation = Math.random() * Math.PI * 2;
        this.radius = 0.8 + this.depth * 0.7; // Compact, refined nodes
        this.burstVx = 0; this.burstVy = 0;
        this.clusterX = 0; this.clusterY = 0;
      }

      updateNormal(width: number, height: number, time: number, mouse: typeof mouseRef.current) {
        this.ax = 0; this.ay = 0;
        const flowVx = this.baseSpeed;
        const flowVy = Math.sin(time * 0.0005 + this.oscillation) * (0.03 + this.depth * 0.02); // Slowed down
        this.ax = flowVx - this.vx * 0.02;
        this.ay = flowVy - this.vy * 0.02;

        // LocalFox does NOT attract/repel particles to the mouse.
        // We removed that logic to match LocalFox's exact behavior.

        this.vx += this.ax; this.vy += this.ay;
        this.vx *= 0.96; this.vy *= 0.96;
        this.x += this.vx; this.y += this.vy;

        this.homeX += (this.x - this.homeX) * 0.05;
        this.homeY += (this.y - this.homeY) * 0.05;

        if (this.x > width + 100) { this.x = -100; this.y = Math.random() * height; this.homeX = this.x; this.homeY = this.y; }
        if (this.y < -100) this.y = height + 100;
        if (this.y > height + 100) this.y = -100;
      }

      draw(ctx: CanvasRenderingContext2D, time: number, colors: ThemeColors, alphaBoost: number = 0) {
        const pulse = Math.sin(time * 0.004) * 0.2 + 0.8;
        const r = Math.round(colors.particleR), g = Math.round(colors.particleG), b = Math.round(colors.particleB);
        const po = Math.min(1, colors.particleOpacity + alphaBoost);
        const gs = colors.glowScale;

        // Compact outer glow halo
        ctx.fillStyle = `rgba(${r},${g},${b},${0.06 * this.depth * pulse * po})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius * 3.0 * gs, 0, Math.PI * 2); ctx.fill();

        // Tight inner glow ring
        ctx.fillStyle = `rgba(${r},${g},${b},${0.12 * this.depth * pulse * po})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius * 1.8 * gs, 0, Math.PI * 2); ctx.fill();

        // Solid bright core
        ctx.fillStyle = `rgba(${r},${g},${b},${(0.8 + 0.15 * pulse) * po})`;
        ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
      }
    }

    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    handleResize();
    window.addEventListener("resize", handleResize);

    const screenWidth = canvas.width;
    let particleCount = 140; // Balanced — dense enough for geometric web, clean enough for readability
    if (screenWidth < 768) particleCount = 55;
    else if (screenWidth < 1024) particleCount = 90;

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle(canvas.width, canvas.height));

    const detectTheme = () => {
      const isLight = document.documentElement.classList.contains("light");
      themeRef.current = isLight ? "light" : "dark";
      if (!transitionRef.current.active) {
        currentColorsRef.current = isLight ? getLightColors() : getDarkColors();
      }
    };
    detectTheme();

    const triggerCosmicTransition = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const cx = detail?.x ?? window.innerWidth / 2;
      const cy = detail?.y ?? 80;
      const nextTheme = detail?.nextTheme as "light" | "dark";

      const tr = transitionRef.current;
      tr.active = true;
      tr.phase = "attract";
      tr.t = 0;
      tr.cx = cx;
      tr.cy = cy;
      tr.nextTheme = nextTheme;
      tr.midpointFired = false;
      tr.oldColors = { ...currentColorsRef.current };
      tr.newColors = nextTheme === "light" ? getLightColors() : getDarkColors();

      const W = canvas.width, H = canvas.height;
      const ringRadius = 0.06 * Math.min(W, H);

      particles.forEach((p, i) => {
        // Distribute to a clean ring
        const angle = (i / particles.length) * Math.PI * 2;
        const jitter = (p.seed - 0.5) * ringRadius * 0.6;
        p.clusterX = cx + Math.cos(angle) * ringRadius + jitter;
        p.clusterY = cy + Math.sin(angle) * ringRadius + jitter;

        const burstAngle = Math.atan2(p.y - cy, p.x - cx);
        const burstSpeed = 2.6 + 2.2 * p.seed;
        p.burstVx = Math.cos(burstAngle) * burstSpeed;
        p.burstVy = Math.sin(burstAngle) * burstSpeed;
      });
    };

    window.addEventListener("cosmic-trigger", triggerCosmicTransition);

    const handleMouseMove = (e: MouseEvent) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; mouseRef.current.active = true; };
    const handleMouseLeave = () => { mouseRef.current.active = false; mouseRef.current.x = -9999; mouseRef.current.y = -9999; };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    let animationId: number;
    const FPS_DT = 1 / 60;

    const animate = () => {
      timeRef.current += 1;
      const tr = transitionRef.current;

      if (tr.active) {
        const phaseDuration = PHASE_DURATIONS[tr.phase as keyof typeof PHASE_DURATIONS] || 0.5;
        tr.t += FPS_DT / phaseDuration;

        if (tr.t >= 1) {
          tr.t = 1;
          if (tr.phase === "attract") { tr.phase = "collapse"; tr.t = 0; }
          else if (tr.phase === "collapse") { tr.phase = "burst"; tr.t = 0; }
          else if (tr.phase === "burst") { tr.phase = "rebuild"; tr.t = 0; shockRef.current = 0.55; shockAngleRef.current = Math.random() * Math.PI * 2; }
          else if (tr.phase === "rebuild") {
            tr.active = false; tr.phase = "idle"; tr.t = 0;
            currentColorsRef.current = { ...tr.newColors };
          }
        }

        particles.forEach((p) => {
          const dist = Math.hypot(p.x - tr.cx, p.y - tr.cy);
          const maxDist = 0.5 * Math.max(canvas.width, canvas.height);
          const distRatio = clamp(1 - dist / maxDist, 0, 1);

          if (tr.phase === "attract") {
            const t = easeOutCubic(tr.t);
            const pullX = (tr.cx - p.x) * 0.03 * t;
            const pullY = (tr.cy - p.y) * 0.03 * t;
            p.vx += pullX; p.vy += pullY;
            p.vx *= 0.96; p.vy *= 0.96;
            p.x += p.vx; p.y += p.vy;
          }
          else if (tr.phase === "collapse") {
            const t = easeInCubic(tr.t);
            p.vx *= 0.85; p.vy *= 0.85; // Heavy friction
            const pullStrength = (0.12 + 0.08 * distRatio) * t;
            p.vx += (p.clusterX - p.x) * pullStrength;
            p.vy += (p.clusterY - p.y) * pullStrength;
            p.x += p.vx; p.y += p.vy;
          }
          else if (tr.phase === "burst") {
            const t = easeInOutCubic(tr.t);
            if (tr.t < 0.08) {
              p.vx *= 0.85; p.vy *= 0.85;
            }
            
            const burstForce = (2.2 + 1.3 * distRatio) * t;
            p.vx += p.burstVx * burstForce * 0.20;
            p.vy += p.burstVy * burstForce * 0.20;
            p.vx *= 0.95; p.vy *= 0.95;
            p.x += p.vx; p.y += p.vy;

            if (tr.t >= 0.45 && !tr.midpointFired) {
              tr.midpointFired = true;
              // Update themeRef so isLight check works correctly for rendering!
              themeRef.current = tr.nextTheme;
              if (tr.nextTheme === "light") {
                document.documentElement.classList.add("light");
                document.documentElement.classList.remove("dark");
              } else {
                document.documentElement.classList.add("dark");
                document.documentElement.classList.remove("light");
              }
            }
          }
          else if (tr.phase === "rebuild") {
            const t = easeOutCubic(tr.t);
            if (tr.t < 0.05) {
              const k = Math.random() * Math.PI * 2;
              const s = 1.0 + 1.5 * p.seed;
              p.vx += Math.cos(k) * s;
              p.vy += Math.sin(k) * s;
            }
            p.vx += (p.homeX - p.x) * (0.005 * t);
            p.vy += (p.homeY - p.y) * (0.005 * t);
            p.vx *= 0.96; p.vy *= 0.96;
            p.x += p.vx; p.y += p.vy;
          }
        });

        if (tr.phase === "burst") {
          currentColorsRef.current = lerpColors(tr.oldColors, tr.newColors, easeInOutCubic(tr.t));
        } else if (tr.phase === "rebuild") {
          currentColorsRef.current = lerpColors(tr.oldColors, tr.newColors, easeOutCubic(tr.t));
        }

        if (shockRef.current > 0.001) {
          shockRef.current *= 0.90;
          shockAngleRef.current += 0.4;
        } else {
          shockRef.current = 0;
        }
      } else {
        particles.forEach(p => p.updateNormal(canvas.width, canvas.height, timeRef.current, mouseRef.current));
      }

      const colors = currentColorsRef.current;

      ctx.save();

      // 1. Mouse Parallax Effect (Smooth Camera Pan)
      if (mouseRef.current.active && !tr.active) {
        const mouseX = mouseRef.current.x;
        const mouseY = mouseRef.current.y;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        // Calculate parallax offsets
        const parallaxX = (mouseX - centerX) * -0.015; // Negative to shift away from mouse (standard 3D depth)
        const parallaxY = (mouseY - centerY) * -0.015;
        
        ctx.translate(parallaxX, parallaxY);
      }

      // 2. Cosmic Rebuild Screen Shake
      if (shockRef.current > 0.001) {
        const shakeX = Math.cos(shockAngleRef.current) * shockRef.current * 8;
        const shakeY = Math.sin(shockAngleRef.current) * shockRef.current * 8;
        ctx.translate(shakeX, shakeY);
      }

      ctx.clearRect(-20, -20, canvas.width + 40, canvas.height + 40);

      // Background gradient
      const bgR1 = Math.round(colors.bgR1), bgG1 = Math.round(colors.bgG1), bgB1 = Math.round(colors.bgB1);
      const bgR2 = Math.round(colors.bgR2), bgG2 = Math.round(colors.bgG2), bgB2 = Math.round(colors.bgB2);
      const bgR3 = Math.round(colors.bgR3), bgG3 = Math.round(colors.bgG3), bgB3 = Math.round(colors.bgB3);
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `rgb(${bgR1},${bgG1},${bgB1})`);
      gradient.addColorStop(0.5, `rgb(${bgR2},${bgG2},${bgB2})`);
      gradient.addColorStop(1, `rgb(${bgR3},${bgG3},${bgB3})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(-20, -20, canvas.width + 40, canvas.height + 40);

      const ar = Math.round(colors.ambientR), ag = Math.round(colors.ambientG), ab = Math.round(colors.ambientB);
      // Smaller, softer left glow — no longer overpowering
      const rg = ctx.createRadialGradient(canvas.width * 0.15, canvas.height * 0.35, 0, canvas.width * 0.15, canvas.height * 0.35, canvas.width * 0.5);
      rg.addColorStop(0, `rgba(${ar},${ag},${ab},${colors.ambientIntensity * 0.7})`);
      rg.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
      ctx.fillStyle = rg;
      ctx.fillRect(-20, -20, canvas.width + 40, canvas.height + 40);

      const rg2 = ctx.createRadialGradient(canvas.width * 0.8, canvas.height * 0.7, 0, canvas.width * 0.8, canvas.height * 0.7, canvas.width * 0.7);
      rg2.addColorStop(0, `rgba(${ar},${ag},${ab},${colors.ambientIntensity * 0.6})`);
      rg2.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
      ctx.fillStyle = rg2;
      ctx.fillRect(-20, -20, canvas.width + 40, canvas.height + 40);

      // Fast GPU-accelerated canvas dim overlay instead of DOM CSS crossfade
      if (tr.active && tr.phase === "collapse") {
        const dimAlpha = 0.25 * easeInCubic(tr.t);
        ctx.fillStyle = `rgba(0,0,0,${dimAlpha})`;
        ctx.fillRect(-20, -20, canvas.width + 40, canvas.height + 40);
      } else if (tr.active && tr.phase === "burst") {
        const dimAlpha = 0.25 * (1 - easeInOutCubic(tr.t));
        ctx.fillStyle = `rgba(0,0,0,${dimAlpha})`;
        ctx.fillRect(-20, -20, canvas.width + 40, canvas.height + 40);
      }

      if (mouseRef.current.active && !tr.active) {
        const mg = ctx.createRadialGradient(mouseRef.current.x, mouseRef.current.y, 0, mouseRef.current.x, mouseRef.current.y, 300);
        mg.addColorStop(0, `rgba(${ar},${ag},${ab},${colors.ambientIntensity * 0.5})`);
        mg.addColorStop(1, `rgba(${ar},${ag},${ab},0)`);
        ctx.fillStyle = mg;
        ctx.fillRect(-20, -20, canvas.width + 40, canvas.height + 40);
      }

      let alphaBoost = 0;
      if (tr.active) {
        if (tr.phase === "attract") alphaBoost = 0.35 * easeOutCubic(tr.t);
        else if (tr.phase === "collapse") alphaBoost = 0.7 + 0.30 * easeInCubic(tr.t);
        else if (tr.phase === "burst") alphaBoost = 0.5 * (1 - easeInOutCubic(tr.t));
      }

      // Draw network lines
      let totalDrawnLines = 0;

      // FIXED: 'screen' blend mode causes invisible/dim lines on Instagram in-app
      // browser and many mobile WebViews. Use 'source-over' universally for consistency.
      const isLight = themeRef.current === "light";
      ctx.globalCompositeOperation = "source-over";
      for (let i = 0; i < particles.length; i++) {
        let nodeConnections = 0;
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          // Only apply aggressive limit during the heavy collapse/burst transition to prevent lag.
          // In idle mode, allow a beautiful dense web.
          if (tr.active && (tr.phase === "collapse" || tr.phase === "burst")) {
            if (nodeConnections > 5 || totalDrawnLines > 500) continue;
          } else {
            if (nodeConnections > 15) continue;
          }

          const p2 = particles[j];
          const dx = p2.x - p1.x, dy = p2.y - p1.y;
          
          const maxCheck = isLight ? 300 : 220;
          if (Math.abs(dx) > maxCheck || Math.abs(dy) > maxCheck) continue;

          const dist = Math.hypot(dx, dy);
          const depthDiff = Math.abs(p1.depth - p2.depth);
          
          // Light mode needs wider connections for visibility on white
          let connDist = isLight ? (150 - depthDiff * 25) : (120 - depthDiff * 20);

          if (dist < connDist) {
            const proximity = 1 - dist / connDist;
            
            // Soft center mask — allows subtle activity behind text, stronger at edges
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const centerDist = Math.hypot(midX - canvas.width * 0.4, midY - canvas.height * 0.45);
            const maxCenterDist = Math.max(canvas.width, canvas.height) * 0.35;
            // Softer mask — minimum 0.5 so lines stay visible even behind text
            const maskOpacity = clamp(0.5 + (centerDist / maxCenterDist) * 0.5, 0.5, 1.0);

            // Boosted base opacity for consistent brightness without screen blend
            const baseOp = isLight ? 0.55 : 0.25;
            const depthMul = (0.4 + p1.depth * 0.6);
            let op = baseOp * depthMul * proximity * colors.lineOpacity * maskOpacity * (1 + alphaBoost * 0.5);

            if (tr.active && (tr.phase === "collapse" || tr.phase === "burst")) {
               op *= 0.1; 
            }

            if (op > 0.005) {
              nodeConnections++;
              totalDrawnLines++;
              
              // Light mode: use particle color (deeper pink) for stronger contrast
              // Dark mode: use ambient color for warm glow
              const lr = isLight ? Math.round(colors.particleR) : ar;
              const lg = isLight ? Math.round(colors.particleG) : ag;
              const lb = isLight ? Math.round(colors.particleB) : ab;
              ctx.strokeStyle = `rgba(${lr},${lg},${lb},${op})`;
              ctx.lineWidth = isLight ? 1.2 : 1.0; // Slightly thicker in light mode
              ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); ctx.stroke();
            }
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";

      particles.forEach(p => p.draw(ctx, timeRef.current, colors, alphaBoost));

      ctx.restore(); // restore screen shake

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("cosmic-trigger", triggerCosmicTransition);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          isolation: 'isolate' as never,
          WebkitFontSmoothing: 'antialiased',
        }}
      />
      {/* Static CSS fallback if canvas/WebGL fails (Instagram browser, low-GPU devices) */}
      <div
        className="hero-fallback-bg absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        aria-hidden="true"
      />
    </>
  );
};
