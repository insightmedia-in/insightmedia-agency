"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { ConsultationModal } from "./ConsultationModal";
import { NetworkCanvas } from "./NetworkCanvas";

interface HeroSectionProps {
  onOpenModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hover effect - activates phone animation on mouseenter/mouseleave
  useEffect(() => {
    const wrap = document.querySelector(".phone-wrap");

    const handleEnter = () => {
      wrap?.classList.add("active");
    };

    const handleLeave = () => {
      wrap?.classList.remove("active");
    };

    wrap?.addEventListener("mouseenter", handleEnter);
    wrap?.addEventListener("mouseleave", handleLeave);

    return () => {
      wrap?.removeEventListener("mouseenter", handleEnter);
      wrap?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Premium Scroll Parallax Effect
  useEffect(() => {
    const parallaxWrap = document.querySelector(".phone-scroll-parallax") as HTMLElement;
    if (!parallaxWrap) return;

    let currentScroll = 0;
    let targetScroll = 0;
    let rafId: number;

    const handleScroll = () => {
      targetScroll = window.scrollY;

      // Reveal front phone automatically on scroll down (All devices)
      const wrap = document.querySelector(".phone-wrap");
      if (wrap) {
        if (window.scrollY > 50) {
          wrap.classList.add("scroll-active");
        } else {
          wrap.classList.remove("scroll-active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      // Smooth lerp for cinematic easing (Apple/Stripe style)
      currentScroll += (targetScroll - currentScroll) * 0.05;

      if (window.innerWidth <= 768) {
        // Mobile: Subtle luxury background motion (minimalist, no aggressive spinning)
        const translateY = currentScroll * 0.15;
        const rotateY = currentScroll * 0.02;
        const rotateX = currentScroll * 0.015;
        const translateZ = currentScroll * 0.05; // tiny depth increase

        parallaxWrap.style.transform = `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      } else {
        // Desktop: Pronounced cinematic swing
        const scrollProgress = Math.min(currentScroll / 800, 1);
        const rotateX = scrollProgress * 15; 
        const rotateY = scrollProgress * -25; 
        const translateY = scrollProgress * -80; 
        const translateZ = scrollProgress * 60; 

        parallaxWrap.style.transform = `translate3d(0, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      if (parallaxWrap) parallaxWrap.style.transform = "";
    };
  }, []);

  return (
    <>
      <section
        data-section="hero"
        className="hero-section relative w-full min-h-screen bg-transparent overflow-hidden"
        style={{
          isolation: 'isolate',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
        {/* The network canvas is now absolutely positioned inside the hero section only */}
        <NetworkCanvas />
        
        {/* Content overlay - canvas shows behind this, forced full opacity */}
        <main
          className="hero-content relative z-10 px-4 pt-24 pb-16 xs:px-4.5 xs:pt-28 xs:pb-20 sm:px-6 sm:pt-32 sm:pb-24 md:pt-36 md:pb-48 lg:pt-40 lg:pb-56 md:px-12 lg:px-20 max-w-7xl mx-auto w-full"
        >
        {/* Badge */}
        <div className="mb-4 sm:mb-6 md:mb-10 lg:mb-12">
          <Badge>Digital Growth — Reimagined</Badge>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-6 sm:mb-8 md:mb-14 lg:mb-16">
          <h1 
            className={`
              hero-title text-xl xs:text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl 
              font-extrabold leading-[1.1] sm:leading-[1.15] md:leading-tight lg:leading-tight tracking-tight
              dark:text-white light:text-gray-900
            `}
          >
            We connect
            <span className="block"><span className="exceptional-italic text-brand-orange">top</span> talent</span>
            <span className="block">with modern</span>
            companies.
          </h1>
        </div>

        {/* Subtext */}
        <div className="max-w-2xl mb-6 sm:mb-8 md:mb-14 lg:mb-16">
          <p 
            className={`
              text-xs xs:text-sm sm:text-base md:text-lg lg:text-lg leading-[1.5] xs:leading-[1.6] sm:leading-relaxed font-medium
              dark:text-gray-300 light:text-gray-700
            `}
          >
            We transform local businesses into modern digital brands through
            premium websites, modern design, branding, and powerful digital
            experiences
          </p>
        </div>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col w-full sm:flex-row gap-3 xs:gap-3.5 sm:gap-4 md:gap-6 max-w-2xl">
          {/* Primary Button - Opens Consultation Modal */}
          <Button onClick={() => setIsModalOpen(true)} className="sm:flex-1">
            Build Your Brand <span className="text-lg">→</span>
          </Button>

          {/* Secondary Button - Scrolls to Services section */}
          <Button
            variant="secondary"
            className="sm:flex-1"
            onClick={() => {
              const el = document.querySelector('[data-section="services"]');
              if (el) {
                const headerOffset = 90;
                const elementPosition = el.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
              }
            }}
          >
            Explore Services
          </Button>
        </div>

        {/* Premium Hero Visual - Phone Mockups with Hover Animation */}
        <div className="phone-wrap">
          <div 
            className="phone-scroll-parallax"
            style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <img
              src="/iphone back.png"
              className="phone-back"
            />

            <div className="phone-front-container">
              <img
                src="/iPhone-Template-PNG-Cutout11.png"
                className="phone-front"
              />
              
              {/* Premium Glassmorphism Card */}
              <div className="glass-card">
                <img src="/favicon-logo.png" alt="InsightMedia Logo" className="glass-card-logo" />
                <p className="glass-card-text">
                  Your <span className="text-highlight-orange">business</span> deserves this level of <span className="text-highlight-gold">design</span> ✨
                </p>
              </div>
            </div>
          </div>
        </div>
        </main>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
