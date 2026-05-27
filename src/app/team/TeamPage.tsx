"use client";

import React, { useState } from "react";
import { Header, Footer } from "@/components";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ConsultationModal } from "@/components/ConsultationModal";

const founders = [
  {
    name: "Siddharth Khurana",
    role: "Founder",
    image: "/SIDDHARTH KHURANA.png",
    description:
      "Leads the creative vision and brand direction of Insight Media. Focused on building premium digital experiences, modern brand identities, and high-converting solutions that help businesses grow with impact.",
    expertise: ["Creative Direction", "Brand Strategy", "UI/UX Vision", "Client Relations"],
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Hitesh Arora",
    role: "Co-Founder",
    image: "/hitesh arora.png",
    description:
      "Drives technical execution and digital innovation at Insight Media. Focused on building scalable, modern, and conversion-focused experiences that feel seamless across every device.",
    expertise: ["Technical Architecture", "Full-Stack Development", "Performance Optimization", "Digital Innovation"],
    socials: { linkedin: "#", twitter: "#" },
  },
];

export function TeamPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="bg-brand-dark min-h-screen pt-[90px]">
        {/* Hero */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 md:px-12 lg:px-20 max-w-7xl mx-auto text-center">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-br from-brand-orange/10 via-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="w-fit mx-auto mb-6">
            <Badge>Our Leadership</Badge>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 dark:text-white light:text-gray-900">
            The Minds Behind{" "}
            <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Insight Media</span>
          </h1>
          <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-medium">
            Built by creators and operators obsessed with premium design, powerful branding, and high-converting digital experiences that drive real business growth.
          </p>
        </section>

        {/* Founder Cards */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 pb-16 sm:pb-24 md:pb-32 md:px-12 lg:px-20 max-w-5xl mx-auto">
          <div className="space-y-8 md:space-y-12">
            {founders.map((founder, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border transition-all duration-500 backdrop-blur-xl p-8 md:p-12 dark:border-white/10 dark:bg-gradient-to-br dark:from-white/5 dark:via-white/2 dark:to-transparent light:border-gray-300 light:bg-white dark:hover:border-brand-orange/40 light:hover:border-rose-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-3 border-brand-orange shadow-xl group-hover:shadow-2xl group-hover:shadow-brand-orange/30 transition-all duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <p className="text-brand-orange uppercase tracking-[2.5px] text-xs font-semibold mb-2">{founder.role}</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 dark:text-white light:text-gray-900">{founder.name}</h2>
                    <p className="dark:text-gray-300 light:text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">{founder.description}</p>

                    {/* Expertise */}
                    <div className="flex flex-wrap gap-2">
                      {founder.expertise.map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full text-xs font-bold dark:bg-brand-orange/10 dark:text-brand-orange dark:border dark:border-brand-orange/20 light:bg-rose-50 light:text-rose-600 light:border light:border-rose-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 md:mt-20 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 dark:text-white light:text-gray-900">
              Want to{" "}
              <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Work</span>{" "}
              With Us?
            </h3>
            <Button onClick={() => setIsModalOpen(true)}>
              Get In Touch <span className="text-lg">→</span>
            </Button>
          </div>
        </section>

        <Footer />
      </main>

      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
