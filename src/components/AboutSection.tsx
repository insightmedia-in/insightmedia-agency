"use client";

import React from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";

interface AboutSectionProps {
  onOpenModal?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenModal }) => {
  return (
    <section id="about" className="relative z-10 px-4 xs:px-5 sm:px-6 py-12 sm:py-16 md:py-20 md:px-12 lg:px-20 max-w-7xl mx-auto overflow-hidden" data-section="about">
      {/* Subtle ambient glow effects */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-orange/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-orange/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_1.1fr] items-center gap-6 xs:gap-8 sm:gap-10 lg:gap-16">
        {/* Left - Image */}
        <div className="relative flex items-center justify-center w-full overflow-visible min-h-[300px] xs:min-h-[350px] sm:min-h-[400px] lg:min-h-[700px]">
          <div className="w-full max-w-[580px] flex items-center justify-center">
            <img
              src="/photo-1.png"
              alt="Insight Media"
              className="w-full max-w-[580px] h-auto object-contain scale-95 xs:scale-100 sm:scale-[1.05] lg:scale-[1.2] xl:scale-[1.3] drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02] xs:hover:scale-[1.05] sm:hover:scale-[1.07] lg:hover:scale-[1.22] xl:hover:scale-[1.32]"
            />
          </div>
        </div>

        {/* Right - Content */}
        <div className="dark:text-white light:text-gray-900 flex flex-col">
          <div className="w-fit">
            <Badge>About Insight Media</Badge>
          </div>

          <h3 className="mt-4 xs:mt-5 sm:mt-6 md:mt-8 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-snug sm:leading-tight tracking-tight max-w-3xl dark:text-white light:text-gray-900">
            We Build Modern{" "}
            <span className="accent-gradient-text">Digital</span> Experiences
            For Growing Brands
          </h3>

          <p className="mt-4 xs:mt-5 sm:mt-6 md:mt-7 dark:text-gray-150 light:text-gray-600 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium">
            Insight Media is a modern creative digital agency focused on building premium
            websites, high-converting user experiences, branding systems, and
            digital solutions for modern businesses and creators.
          </p>

          <p className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 dark:text-gray-300 light:text-gray-700 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
            Our goal is to combine clean design, smooth interactions, and modern
            development to help brands stand out in the digital world. From web
            development to UI/UX, SEO, branding, and video editing — we create
            experiences that feel modern, fast, and visually impactful.
          </p>

          <p className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 dark:text-gray-400 light:text-gray-600 text-xs xs:text-sm sm:text-base font-semibold">
            Serving clients across Gurgaon, Delhi NCR & India.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4 items-center">
            <Button onClick={onOpenModal}>Get In Touch</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
