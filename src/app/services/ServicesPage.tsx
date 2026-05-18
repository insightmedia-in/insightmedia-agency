"use client";

import React from "react";
import { Header, Footer } from "@/components";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ConsultationModal } from "@/components/ConsultationModal";
import { useState } from "react";

const services = [
  {
    title: "Web Development",
    icon: "💻",
    description:
      "Modern, fast, responsive websites built for growth and conversions.",
    details: [
      "Custom Next.js & React Applications",
      "Responsive Mobile-First Design",
      "High-Performance Optimization",
      "CMS Integration (WordPress, Headless)",
      "E-Commerce Solutions",
      "Progressive Web Apps (PWA)",
    ],
  },
  {
    title: "UI/UX Design",
    icon: "🎨",
    description:
      "Premium user-focused interfaces with clean modern experiences.",
    details: [
      "User Research & Persona Mapping",
      "Wireframing & Prototyping",
      "High-Fidelity Interface Design",
      "Design Systems & Style Guides",
      "Interaction & Motion Design",
      "Usability Testing",
    ],
  },
  {
    title: "SEO Optimization",
    icon: "📈",
    description:
      "Smart SEO strategies to improve rankings and online visibility.",
    details: [
      "Technical SEO Audit & Fixes",
      "On-Page & Off-Page Optimization",
      "Keyword Research & Strategy",
      "Content Optimization",
      "Local SEO & Google Business",
      "Performance & Core Web Vitals",
    ],
  },
  {
    title: "Video Editing",
    icon: "🎬",
    description:
      "High-quality edits, reels, promos and cinematic brand content.",
    details: [
      "Brand Promos & Ad Films",
      "Social Media Reels & Shorts",
      "Motion Graphics & Animation",
      "Color Grading & Sound Design",
      "YouTube Content Production",
      "Product Demo Videos",
    ],
  },
  {
    title: "Branding",
    icon: "✨",
    description:
      "Logos, visual identity and creative direction for modern brands.",
    details: [
      "Logo Design & Brand Mark",
      "Visual Identity Systems",
      "Brand Guidelines & Strategy",
      "Business Card & Stationery",
      "Social Media Branding Kits",
      "Creative Direction & Consultation",
    ],
  },
];

export function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="bg-brand-dark min-h-screen pt-[90px]">
        {/* Hero */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="absolute -top-40 left-1/4 w-96 h-96 bg-gradient-to-br from-brand-orange/10 via-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="w-fit mb-6">
            <Badge>Our Services</Badge>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 dark:text-white light:text-gray-900">
            Premium{" "}
            <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">
              Digital
            </span>{" "}
            Solutions
          </h1>
          <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl font-medium">
            From concept to launch, we deliver modern web development, UI/UX
            design, SEO, branding, and video production that drives real business
            growth.
          </p>
        </section>

        {/* Service Cards */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 pb-16 sm:pb-24 md:pb-32 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8 md:gap-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl xs:rounded-3xl border transition-all duration-500 backdrop-blur-xl p-8 md:p-12 dark:border-white/5 dark:bg-gradient-to-br dark:from-white/5 dark:via-white/2 dark:to-transparent light:border-gray-300 light:bg-gradient-to-br light:from-white light:via-gray-50 light:to-white dark:hover:border-brand-orange/30 light:hover:border-rose-300"
              >
                <div className="absolute -inset-1 rounded-2xl xs:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 dark:bg-gradient-to-br dark:from-brand-orange/20 dark:to-purple-600/10 light:bg-gradient-to-br light:from-rose-500/15 light:to-pink-300/10" />

                <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                  {/* Left */}
                  <div className="md:w-2/5">
                    <div className="text-5xl sm:text-6xl mb-4 group-hover:scale-110 transition-transform duration-500">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 dark:text-white light:text-gray-900 dark:group-hover:text-brand-orange light:group-hover:text-rose-600 transition-colors duration-300">
                      {service.title}
                    </h2>
                    <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>

                  {/* Right - Details */}
                  <div className="md:w-3/5">
                    <h3 className="text-xs uppercase tracking-widest font-black mb-6 dark:text-brand-orange light:text-rose-500">
                      What&apos;s Included
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {service.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 dark:text-gray-300 light:text-gray-700 text-sm sm:text-base font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange dark:bg-brand-orange light:bg-rose-500 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-20 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 dark:text-white light:text-gray-900">
              Ready to{" "}
              <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">
                Transform
              </span>{" "}
              Your Brand?
            </h3>
            <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base mb-8 max-w-lg mx-auto font-medium">
              Let&apos;s discuss how we can build something extraordinary
              together.
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              Get Started <span className="text-lg">→</span>
            </Button>
          </div>
        </section>

        <Footer />
      </main>

      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
