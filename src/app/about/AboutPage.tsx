"use client";

import React, { useState } from "react";
import { Header, Footer } from "@/components";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ConsultationModal } from "@/components/ConsultationModal";

const values = [
  {
    icon: "🎯",
    title: "Premium Quality",
    description: "Every project we deliver is built to world-class standards — no shortcuts, no compromises.",
  },
  {
    icon: "⚡",
    title: "Speed & Performance",
    description: "Lightning-fast websites and smooth interactions that keep users engaged and convert better.",
  },
  {
    icon: "🎨",
    title: "Modern Design",
    description: "Clean, contemporary aesthetics that make brands stand out in crowded digital spaces.",
  },
  {
    icon: "🤝",
    title: "Client-First Approach",
    description: "We treat every project as a partnership, working closely with founders and teams to deliver results.",
  },
];

const workflow = [
  { step: "01", title: "Discovery", description: "We understand your brand, goals, audience, and competitive landscape through deep research." },
  { step: "02", title: "Strategy", description: "We create a tailored roadmap covering design direction, technology stack, and deliverables." },
  { step: "03", title: "Design", description: "High-fidelity mockups and prototypes built to impress — reviewed and refined with your feedback." },
  { step: "04", title: "Development", description: "Clean, performant code using modern frameworks. Every detail is pixel-perfect and responsive." },
  { step: "05", title: "Launch & Support", description: "Smooth deployment, QA testing, and ongoing maintenance to keep everything running flawlessly." },
];

export function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="bg-brand-dark min-h-screen pt-[90px]">
        {/* Hero */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="absolute -top-40 right-1/4 w-96 h-96 bg-gradient-to-br from-brand-orange/10 via-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="w-fit mb-6">
            <Badge>About InsightMedia</Badge>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 dark:text-white light:text-gray-900">
            We Build Modern{" "}
            <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Digital</span>{" "}
            Experiences
          </h1>
          <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-medium">
            InsightMedia is a modern creative digital agency focused on building premium websites, high-converting user experiences, branding systems, and digital solutions for modern businesses and creators.
          </p>
        </section>

        {/* Mission */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 py-16 sm:py-24 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <img
                src="/photo-1.png"
                alt="InsightMedia Team"
                className="w-full max-w-[580px] h-auto object-contain rounded-2xl drop-shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-6 dark:text-white light:text-gray-900">
                Our <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Mission</span>
              </h2>
              <p className="dark:text-gray-300 light:text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-6 font-medium">
                Our goal is to combine clean design, smooth interactions, and modern development to help brands stand out in the digital world.
              </p>
              <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base leading-relaxed font-medium">
                From web development to UI/UX, SEO, branding, and video editing — we create experiences that feel modern, fast, and visually impactful. We believe every business deserves a premium digital presence that converts visitors into customers.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 py-16 sm:py-24 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-12 md:mb-16 dark:text-white light:text-gray-900">
            Our <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Values</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {values.map((v, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border transition-all duration-500 backdrop-blur-xl p-8 md:p-10 dark:border-white/5 dark:bg-gradient-to-br dark:from-white/5 dark:via-white/2 dark:to-transparent light:border-gray-300 light:bg-white dark:hover:border-brand-orange/30 light:hover:border-rose-300">
                <div className="text-4xl sm:text-5xl mb-4">{v.icon}</div>
                <h3 className="text-xl sm:text-2xl font-black mb-3 dark:text-white light:text-gray-900 dark:group-hover:text-brand-orange light:group-hover:text-rose-600 transition-colors duration-300">{v.title}</h3>
                <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base leading-relaxed font-medium">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflow */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 py-16 sm:py-24 md:pb-32 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-12 md:mb-16 dark:text-white light:text-gray-900">
            Our <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Process</span>
          </h2>
          <div className="space-y-6 md:space-y-8">
            {workflow.map((w, i) => (
              <div key={i} className="flex gap-6 md:gap-8 items-start group">
                <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center font-black text-lg sm:text-xl dark:bg-brand-orange/10 dark:text-brand-orange dark:border dark:border-brand-orange/20 light:bg-rose-50 light:text-rose-600 light:border light:border-rose-200 group-hover:scale-110 transition-transform duration-300">
                  {w.step}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 dark:text-white light:text-gray-900">{w.title}</h3>
                  <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">{w.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-20 text-center">
            <Button onClick={() => setIsModalOpen(true)}>
              Start Your Project <span className="text-lg">→</span>
            </Button>
          </div>
        </section>

        <Footer />
      </main>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
