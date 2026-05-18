import React from "react";

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Modern, fast, responsive websites built for growth and conversions.",
    icon: "💻",
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Premium user-focused interfaces with clean modern experiences.",
    icon: "🎨",
  },
  {
    id: 3,
    title: "SEO Optimization",
    description: "Smart SEO strategies to improve rankings and online visibility.",
    icon: "📈",
  },
  {
    id: 4,
    title: "Video Editing",
    description: "High-quality edits, reels, promos and cinematic brand content.",
    icon: "🎬",
  },
  {
    id: 5,
    title: "Branding",
    description: "Logos, visual identity and creative direction for modern brands.",
    icon: "✨",
  },
];

export const ServicesSection: React.FC = () => {
  const renderServiceCard = (service: Service) => (
    <div
      key={service.id}
      className="service-card group relative overflow-hidden rounded-2xl xs:rounded-3xl border transition-all duration-500 cursor-pointer backdrop-blur-xl p-6 xs:p-7 sm:p-8 md:p-10 h-full flex flex-col dark:border-white/5 dark:bg-gradient-to-br dark:from-white/5 dark:via-white/2 dark:to-transparent light:border-gray-300 light:bg-gradient-to-br light:from-white light:via-gray-50 light:to-white dark:hover:border-brand-orange/30 light:hover:border-rose-300"
    >
      {/* Card glow effect on hover */}
      <div className="absolute -inset-1 rounded-2xl xs:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10 dark:bg-gradient-to-br dark:from-brand-orange/20 dark:to-purple-600/10 light:bg-gradient-to-br light:from-rose-500/15 light:to-pink-300/10" />
      
      {/* Gradient glow corner */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:from-brand-orange/15 dark:to-transparent light:from-rose-400/12 light:to-transparent" />

      {/* Icon */}
      <div className="mb-4 xs:mb-5 sm:mb-6 text-5xl xs:text-6xl sm:text-7xl transition-all duration-500 group-hover:scale-125 group-hover:drop-shadow-lg flex-shrink-0">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="service-title text-lg xs:text-xl sm:text-2xl font-black mb-3 xs:mb-4 transition-colors duration-300 dark:text-white light:text-gray-900 dark:group-hover:text-brand-orange light:group-hover:text-rose-600 leading-snug">
        {service.title}
      </h3>

      {/* Description */}
      <p className="service-description transition-colors duration-300 leading-relaxed mb-6 xs:mb-8 font-medium text-xs xs:text-sm sm:text-base flex-grow max-w-sm dark:text-gray-400 dark:group-hover:text-gray-300 light:text-gray-600 light:group-hover:text-gray-700">
        {service.description}
      </p>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-2xl xs:rounded-3xl border dark:border-brand-orange/0 dark:group-hover:border-brand-orange/40 light:border-rose-300/0 light:group-hover:border-rose-400/40 transition-all duration-300 pointer-events-none" />
    </div>
  );

  return (
    <section id="services" className="relative z-10 px-4 xs:px-5 sm:px-6 py-16 sm:py-24 md:py-32 md:px-12 lg:px-20 max-w-7xl mx-auto" data-section="services">
      {/* Ambient glow effects */}
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/15 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-gradient-to-tl from-brand-orange/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="mb-12 sm:mb-16 md:mb-20 max-w-2xl" data-purpose="services-header">
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight dark:bg-gradient-to-r dark:from-white dark:via-white dark:to-gray-300 dark:bg-clip-text dark:text-transparent light:text-gray-900">
          Our <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Services</span>
        </h2>
        <p className="dark:text-gray-400 light:text-gray-600 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed font-medium">
          We create modern websites, premium UI/UX, SEO strategies, branding, and digital experiences for modern businesses and creators.
        </p>
      </div>

      {/* First row: 3 service cards - equal height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8 mb-4 xs:mb-5 sm:mb-8">
        {services.slice(0, 3).map((service) => renderServiceCard(service))}
      </div>

      {/* Second row: 2 service cards - equal height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 md:gap-8 max-w-2xl">
        {services.slice(3).map((service) => renderServiceCard(service))}
      </div>

    </section>
  );
};
