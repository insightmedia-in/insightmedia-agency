"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  label: string;
  sectionId: string;
}

const navigationItems: NavItem[] = [
  { label: "Featured Projects", sectionId: "projects" },
  { label: "Our Services", sectionId: "services" },
  { label: "About Insight Media", sectionId: "about" },
  { label: "The Team", sectionId: "team" },
  { label: "FAQ", sectionId: "faq" },
];

const mobileMenuItems: NavItem[] = [
  { label: "Home", sectionId: "hero" },
  { label: "Services", sectionId: "services" },
  { label: "About", sectionId: "about" },
  { label: "Team", sectionId: "team" },
  { label: "FAQ", sectionId: "faq" },
  { label: "Contact", sectionId: "footer" },
];

interface HeaderProps {
  onOpenModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  // Scroll to a section by its data-section attribute
  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === "hero") {
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
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sectionIds = ["projects", "services", "about", "team", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) setActiveSection(id);
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.querySelector(`[data-section="${id}"]`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  const handleMobileNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    // Small delay to let menu close animation start
    setTimeout(() => scrollToSection(sectionId), 100);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`
          desktop-navbar
          fixed top-0 left-0 right-0 z-40 px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 
          flex items-center justify-between transition-all duration-500 gap-2 xs:gap-3 sm:gap-4
          h-[90px]
          
          /* Transparent background for both modes */
          bg-transparent backdrop-blur-none
          border-0 shadow-none
          dark:backdrop-blur-none dark:bg-transparent dark:border-0 dark:shadow-none
        `}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Logo />
          </a>
        </div>

        {/* Center Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-16 flex-1 justify-center">
          {/* Navigation Links */}
          <nav className="flex items-center gap-10 text-sm font-medium">
            {navigationItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={(e) => handleNavClick(e, item.sectionId)}
                className={`
                  relative transition-all duration-300 font-medium text-sm whitespace-nowrap cursor-pointer
                  ${activeSection === item.sectionId
                    ? "dark:text-brand-orange light:text-rose-600"
                    : "dark:text-gray-400 dark:hover:text-white light:text-gray-700 light:hover:text-gray-900"
                  }
                `}
              >
                {item.label}

                {/* Active indicator with glow */}
                {activeSection === item.sectionId && (
                  <div
                    className={`
                      absolute -bottom-1 left-0 right-0 h-0.5 rounded-full
                      dark:bg-gradient-to-r dark:from-transparent dark:via-brand-orange dark:to-transparent
                      dark:shadow-lg dark:shadow-brand-orange/50
                      light:bg-gradient-to-r light:from-transparent light:via-rose-500 light:to-transparent
                    `}
                  />
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Right Section - Actions & Hamburger Menu */}
        <div className="flex items-center gap-2 xs:gap-3 lg:gap-4 flex-shrink-0">
          {/* Desktop Nav Actions - Hidden on mobile */}
          <div className="nav-actions hidden md:flex">
            <ThemeToggle />

            <button
              onClick={onOpenModal}
              className="cta-button"
            >
              Build Your Brand <span>→</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navbar - Glassmorphism Design */}
      <header className="mobile-navbar">
        {/* Logo */}
        <div className="flex-shrink-0 logo">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Logo />
          </a>
        </div>

        {/* Right Actions - Theme toggle & Hamburger */}
        <div className="mobile-actions">
          <ThemeToggle />

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`
              menu-btn relative p-2 transition-all duration-300
              dark:hover:bg-white/10 light:hover:bg-black/5
              focus:outline-none focus:ring-2 focus:ring-brand-orange/30
            `}
            aria-label="Toggle menu"
          >
            {/* Hamburger Icon */}
            <div className="w-6 h-5 flex flex-col items-center justify-center gap-1.5">
              <div
                className={`
                  w-6 h-0.5 rounded-full transition-all duration-300 
                  dark:bg-white light:bg-gray-900
                  ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}
                `}
              />
              <div
                className={`
                  w-6 h-0.5 rounded-full transition-all duration-300 
                  dark:bg-white light:bg-gray-900
                  ${isMobileMenuOpen ? "opacity-0" : ""}
                `}
              />
              <div
                className={`
                  w-6 h-0.5 rounded-full transition-all duration-300 
                  dark:bg-white light:bg-gray-900
                  ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}
                `}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className={`
            fixed inset-0 z-30 transition-all duration-300 hidden max-md:block
            ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
          style={{
            backdropFilter: isMobileMenuOpen ? "blur(4px)" : "blur(0px)",
            backgroundColor: isMobileMenuOpen
              ? "rgba(10, 10, 10, 0.3)"
              : "rgba(10, 10, 10, 0)",
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Dropdown */}
      <div
        className={`
          fixed top-[70px] left-0 right-0 z-50 hidden max-md:block
          transition-all duration-300 origin-top
          ${isMobileMenuOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-95 pointer-events-none"
          }
        `}
      >
        {/* Menu Container */}
        <div
          className={`
            mx-3 xs:mx-4 sm:mx-6 rounded-xl xs:rounded-2xl overflow-hidden
            dark:bg-gradient-to-b dark:from-black/80 dark:via-brand-dark/70 dark:to-black/80
            dark:border dark:border-brand-orange/20 dark:backdrop-blur-xl
            light:bg-white/95 light:border light:border-gray-200/50 light:backdrop-blur-md
            shadow-2xl
          `}
        >
          {/* Menu Items */}
          <nav className="px-4 xs:px-5 sm:px-6 py-4 xs:py-5 space-y-2">
            {mobileMenuItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={(e) => handleMobileNavClick(e, item.sectionId)}
                className={`
                  w-full text-left px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-all duration-300
                  font-medium text-sm xs:text-base block cursor-pointer
                  ${activeSection === item.sectionId
                    ? "dark:text-brand-orange dark:bg-brand-orange/10 light:text-rose-600 light:bg-rose-50"
                    : "dark:text-gray-300 dark:hover:text-brand-orange dark:hover:bg-brand-orange/10 light:text-gray-700 light:hover:text-rose-600 light:hover:bg-rose-50"
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px dark:bg-white/5 light:bg-gray-200/30" />

          {/* CTA Button */}
          <div className="px-4 xs:px-5 sm:px-6 py-4 xs:py-5">
            <button
              onClick={onOpenModal}
              className="cta-button w-full"
            >
              Build Your Brand <span className="text-base">→</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
