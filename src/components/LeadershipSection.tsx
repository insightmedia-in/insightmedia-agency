"use client";

import React from "react";

interface LeadershipSectionProps {
  onOpenModal?: () => void;
}

interface FounderCard {
  name: string;
  role: string;
  image: string;
  description: string;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = () => {
  const founders: FounderCard[] = [
    {
      name: "Siddharth Khurana",
      role: "Founder",
      image: "/SIDDHARTH KHURANA.png",
      description:
        "Leads the creative vision and brand direction of Insight Media. Focused on building premium digital experiences, modern brand identities, and high-converting solutions that help businesses grow with impact.",
    },
    {
      name: "Hitesh Arora",
      role: "Co-Founder",
      image: "/hitesh arora.png",
      description:
        "Drives technical execution and digital innovation at Insight Media. Focused on building scalable, modern, and conversion-focused experiences that feel seamless across every device.",
    },
  ];

  return (
    <section id="team" className="relative py-24 md:py-32 lg:py-40 overflow-hidden bg-brand-dark" data-section="team">
      {/* Premium background glow effects */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-20 left-1/3 w-[400px] h-[400px] bg-brand-orange blur-[140px] rounded-full opacity-30" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-orange-600 blur-[120px] rounded-full opacity-20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block uppercase tracking-[3px] text-brand-orange text-xs sm:text-sm font-semibold opacity-90">
            Our Leadership
          </span>

          <h2 className="mt-4 sm:mt-6 text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black leading-tight text-white">
            The Minds Behind{" "}
            <span className="text-brand-orange">Insight Media</span>
          </h2>

          <p className="max-w-4xl mx-auto mt-5 sm:mt-7 md:mt-8 text-gray-400 text-sm xs:text-base sm:text-lg leading-relaxed md:leading-relaxed px-2">
            Built by creators and operators obsessed with premium design, powerful
            branding, and high-converting digital experiences that drive real
            business growth.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {founders.map((founder, index) => (
            <div
              key={index}
              className="group relative bg-white/[0.03] border border-white/10 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] p-7 sm:p-8 md:p-10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-brand-orange/60 hover:-translate-y-2"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem]" />

              {/* Card content */}
              <div className="relative z-10">
                {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7 mb-7 sm:mb-8 md:mb-10">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-3 sm:border-4 border-brand-orange shadow-xl flex-shrink-0 group-hover:shadow-2xl group-hover:shadow-brand-orange/30 transition-all duration-500"
                  />

                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                      {founder.name}
                    </h3>

                    <p className="text-brand-orange uppercase tracking-[2.5px] text-xs sm:text-sm font-semibold mt-2 opacity-90">
                      {founder.role}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed sm:leading-relaxed md:leading-8 text-sm sm:text-base md:text-lg font-light text-justify">
                  {founder.description}
                </p>
              </div>

              {/* Border glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none shadow-glow-orange group-hover:shadow-lg" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LeadershipSection;
