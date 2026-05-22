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
            <Badge>Digital Marketing & Web Development Agency</Badge>
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
              <span className="block"><span className="exceptional-italic">top</span> talent</span>
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

        </main>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
