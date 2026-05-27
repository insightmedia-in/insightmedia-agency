"use client";

import React from "react";

export const AboutIntroStrip: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark">
      {/* Premium glow accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left glow */}
        <div className="absolute -left-40 sm:-left-20 top-1/2 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-brand-orange/8 rounded-full blur-3xl opacity-40" />
        {/* Right glow */}
        <div className="absolute -right-40 sm:-right-20 top-1/2 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-brand-orange/6 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12">
        {/* Centered content container */}
        <div className="text-center flex flex-col items-center">
          {/* Small Tag */}
          <div className="inline-block">
            <span className="inline-block px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 border border-brand-orange/40 text-brand-orange text-xs sm:text-sm font-semibold uppercase tracking-[2.5px] backdrop-blur-sm transition-all duration-500 hover:bg-white/8 hover:border-brand-orange/60">
              WHO WE ARE
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-6 sm:mt-8 md:mt-10 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white max-w-5xl tracking-tight">
            Building Digital Experiences That Feel{" "}
            <span className="text-brand-orange">Modern & Powerful</span>
          </h2>

          {/* Paragraph */}
          <p className="mt-6 sm:mt-8 md:mt-10 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed font-light">
            Insight Media is a creative digital agency focused on premium websites,
            branding, UI/UX, and modern online experiences designed to help brands
            grow faster in the digital world.
          </p>

          {/* Subtle bottom accent line */}
          <div className="mt-8 sm:mt-10 md:mt-12 w-12 sm:w-16 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent rounded-full opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default AboutIntroStrip;
