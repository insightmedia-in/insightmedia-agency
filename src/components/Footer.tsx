"use client";

import React, { useCallback } from "react";
import { Logo } from "./Logo";
import { FooterParticles } from "./FooterParticles";

const scrollToSection = (sectionId: string) => {
  if (sectionId === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.querySelector(`[data-section="${sectionId}"]`);
  if (element) {
    const headerOffset = 90;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - headerOffset,
      behavior: "smooth",
    });
  }
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="contact"
      data-section="footer"
      className={`
        relative z-10 overflow-hidden transition-all duration-300
        dark:bg-gradient-to-b dark:from-[#0a0a0a] dark:via-[#050505] dark:to-[#000000] 
        dark:border-t dark:border-white/5
        light:bg-gradient-to-b light:from-white light:via-white light:to-gray-50
        light:border-t light:border-gray-200/30
      `}
    >
      {/* Subtle animated particle background - visible in light mode only */}
      <div className="absolute inset-0 pointer-events-none light:block dark:hidden">
        <FooterParticles />
      </div>
      {/* Ambient glow effects - theme aware */}
      <div className={`
        absolute top-0 left-1/2 -translate-x-1/2 w-full h-80 rounded-full blur-3xl pointer-events-none
        dark:bg-gradient-to-b dark:from-brand-orange/8 dark:via-brand-orange/3 dark:to-transparent
        light:bg-gradient-to-b light:from-rose-500/6 light:via-rose-500/2 light:to-transparent
      `} />
      <div className={`
        absolute top-20 left-1/3 w-96 h-96 rounded-full blur-3xl pointer-events-none animate-pulse
        dark:bg-brand-orange/5
        light:bg-rose-400/4
      `} />
      <div className={`
        absolute bottom-40 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none
        dark:bg-purple-600/3
        light:bg-pink-300/2
      `} />
      
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlUGVybGluTm9pc2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIHNlZWQ9IjIiIHJlc3VsdD0ibm9pc2UiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-20 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative z-10 px-4 xs:px-5 sm:px-6 py-12 sm:py-16 md:py-20 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-5 gap-8 xs:gap-10 sm:gap-12 md:gap-12 mb-12 sm:mb-16 md:mb-20">
          {/* Left - Brand & Description */}
          <div className="xs:col-span-2 md:col-span-2 flex flex-col justify-start">
            <div className="mb-6 sm:mb-8">
              <Logo />
            </div>
            <p 
              className={`
                text-xs xs:text-sm leading-relaxed max-w-xs font-medium
                dark:text-gray-350
                light:text-gray-600
              `}
            >
              We transform local businesses into modern digital brands through premium websites, design, and powerful digital experiences.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 
              className={`
                font-black text-xs uppercase tracking-widest mb-6 sm:mb-8 letter-spacing-wider
                dark:text-white
                light:text-gray-900
              `}
            >
              Services
            </h4>
            <ul className="space-y-4 sm:space-y-5">
              {[
                { label: "Web Development", sectionId: "services" },
                { label: "UI/UX Design", sectionId: "services" },
                { label: "Branding", sectionId: "services" },
                { label: "SEO Optimization", sectionId: "services" },
              ].map((service, i) => (
                <li key={i}>
                  <a 
                    href={`#${service.sectionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(service.sectionId);
                    }}
                    className={`
                      transition-all duration-300 text-xs xs:text-sm font-medium group inline-block cursor-pointer
                      dark:text-gray-400 dark:hover:text-brand-orange
                      light:text-gray-600 light:hover:text-rose-600
                    `}
                  >
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                      {service.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 
              className={`
                font-black text-xs uppercase tracking-widest mb-6 sm:mb-8
                dark:text-white
                light:text-gray-900
              `}
            >
              Company
            </h4>
            <ul className="space-y-4 sm:space-y-5">
              {[
                { label: "About", sectionId: "about" },
                { label: "Team", sectionId: "team" },
                { label: "FAQ", sectionId: "faq" },
                { label: "Contact", sectionId: "footer" },
              ].map((item, i) => (
                <li key={i}>
                  <a 
                    href={`#${item.sectionId}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.sectionId);
                    }}
                    className={`
                      transition-all duration-300 text-xs xs:text-sm font-medium group inline-block cursor-pointer
                      dark:text-gray-400 dark:hover:text-brand-orange
                      light:text-gray-600 light:hover:text-rose-600
                    `}
                  >
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column + Social Icons */}
          <div>
            {/* Social Icons — above Contact info */}
            <div className="flex items-center gap-4 mb-6 sm:mb-8">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/in.sightmedia?utm_source=qr&igsh=MTFmc3VkejQ3Nnl5Nw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`
                  group relative inline-flex items-center justify-center p-2 rounded-lg
                  transition-all duration-300
                  dark:text-gray-400 dark:hover:text-brand-orange
                  light:text-gray-500 light:hover:text-rose-600
                `}
              >
                <span className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-brand-orange/15 light:bg-rose-500/15" />
                <svg className="relative w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com/Insightmediaai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className={`
                  group relative inline-flex items-center justify-center p-2 rounded-lg
                  transition-all duration-300
                  dark:text-gray-400 dark:hover:text-brand-orange
                  light:text-gray-500 light:hover:text-rose-600
                `}
              >
                <span className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-brand-orange/15 light:bg-rose-500/15" />
                <svg className="relative w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/insight-media-755a3840b?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`
                  group relative inline-flex items-center justify-center p-2 rounded-lg
                  transition-all duration-300
                  dark:text-gray-400 dark:hover:text-brand-orange
                  light:text-gray-500 light:hover:text-rose-600
                `}
              >
                <span className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:bg-brand-orange/15 light:bg-rose-500/15" />
                <svg className="relative w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
            <h4 
              className={`
                font-black text-xs uppercase tracking-widest mb-6 sm:mb-8
                dark:text-white
                light:text-gray-900
              `}
            >
              Contact
            </h4>
            <div className="space-y-3 sm:space-y-4">
              <a href="mailto:hello@insightmedia.in" className="block">
                <p 
                  className={`
                    transition-colors text-xs xs:text-sm font-medium
                    dark:text-gray-400 dark:hover:text-brand-orange
                    light:text-gray-600 light:hover:text-rose-600
                  `}
                >
                  hello@insightmedia.in
                </p>
              </a>
              <a href="tel:+919557827160" className="block">
                <p 
                  className={`
                    transition-colors text-xs xs:text-sm font-medium
                    dark:text-gray-400 dark:hover:text-brand-orange
                    light:text-gray-600 light:hover:text-rose-600
                  `}
                >
                  +91 95578 27160
                </p>
              </a>
              
              {/* Premium Response Time Badge */}
              <div className={`
                mt-4 sm:mt-6 pt-3 sm:pt-4
                dark:border-t dark:border-white/5
                light:border-t light:border-gray-200
              `}>
                <div className="relative inline-block group">
                  <div 
                    className={`
                      absolute -inset-1 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      dark:bg-gradient-to-r dark:from-brand-orange/20 dark:to-brand-orange/5
                      light:bg-gradient-to-r light:from-rose-500/20 light:to-rose-500/5
                    `} 
                  />
                  <div 
                    className={`
                      relative px-3 py-2 rounded-full border backdrop-blur-md transition-all duration-300
                      dark:border-brand-orange/30 dark:bg-white/2 dark:hover:border-brand-orange/60
                      light:border-rose-300 light:bg-white/40 light:hover:border-rose-400
                    `}
                  >
                    <span 
                      className={`
                        text-xs font-bold
                        dark:text-brand-orange
                        light:text-rose-600
                      `}
                    >
                      12HR AVG
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Divider */}
        <div 
          className={`
            h-px bg-gradient-to-r mb-6 sm:mb-8
            dark:from-transparent dark:via-white/10 dark:to-transparent
            light:from-transparent light:via-gray-200 light:to-transparent
          `} 
        />

        {/* Bottom Bar - Enhanced */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Right - Links + Social */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {["Privacy", "Terms"].map((link, i) => (
              <a 
                key={i}
                href="#" 
                className={`
                  transition-all duration-300 text-xs font-medium group inline-block
                  dark:text-gray-500 dark:hover:text-brand-orange
                  light:text-gray-500 light:hover:text-rose-600
                `}
              >
                <span className="inline-block group-hover:translate-y-[-2px] transition-transform duration-300">
                  {link}
                </span>
              </a>
            ))}
          </div>

          {/* Right - Copyright */}
          <p 
            className={`
              text-xs font-medium tracking-wider text-center sm:text-right
              dark:text-gray-500
              light:text-gray-500
            `}
          >
            © 2026 InsightMedia. All rights reserved. | Designed & Developed by Nikhil Yadav
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
