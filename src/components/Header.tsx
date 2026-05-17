"use client";

import React, { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  label: string;
  id: string;
}

const navigationItems: NavItem[] = [
  { label: "Featured Projects", id: "projects" },
  { label: "Our Services", id: "services" },
  { label: "About InsightMedia", id: "about" },
  { label: "The Team", id: "team" },
  { label: "FAQ", id: "faq" },
];

const mobileMenuItems = [
  { label: "How it works", id: "how-it-works" },
  { label: "Pricing", id: "pricing" },
  { label: "Stories", id: "stories" },
  { label: "FAQ", id: "faq-mobile" },
  { label: "Job seekers", id: "job-seekers" },
];

interface HeaderProps {
  onOpenModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map((item) => {
        const element = document.querySelector(`[data-section="${item.id}"]`);
        return { id: item.id, element };
      });

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handleNavClick = (id: string) => {
    const element = document.querySelector(`[data-section="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  const handleMenuItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(`[data-section="${id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Desktop Navbar - Untouched */}
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
          <Logo />
        </div>

        {/* Center Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-16 flex-1 justify-center">
          {/* Navigation Links */}
          <nav className="flex items-center gap-10 text-sm font-medium">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  relative transition-all duration-300 font-medium text-sm whitespace-nowrap
                  ${
                    activeSection === item.id
                      ? "dark:text-brand-orange light:text-rose-600"
                      : "dark:text-gray-400 dark:hover:text-white light:text-gray-700 light:hover:text-gray-900"
                  }
                `}
              >
                {item.label}

                {/* Active indicator with glow */}
                {activeSection === item.id && (
                  <div
                    className={`
                      absolute -bottom-1 left-0 right-0 h-0.5 rounded-full
                      dark:bg-gradient-to-r dark:from-transparent dark:via-brand-orange dark:to-transparent
                      dark:shadow-lg dark:shadow-brand-orange/50
                      light:bg-gradient-to-r light:from-transparent light:via-rose-500 light:to-transparent
                    `}
                  />
                )}
              </button>
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
          <Logo />
        </div>

        {/* Right Actions - Theme toggle & Hamburger */}
        <div className="mobile-actions">
          <ThemeToggle className="theme-btn" />

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
          ${
            isMobileMenuOpen
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
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`
                  w-full text-left px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-all duration-300
                  font-medium text-sm xs:text-base
                  dark:text-gray-300 dark:hover:text-brand-orange dark:hover:bg-brand-orange/10
                  light:text-gray-700 light:hover:text-rose-600 light:hover:bg-rose-50
                `}
              >
                {item.label}
              </button>
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
