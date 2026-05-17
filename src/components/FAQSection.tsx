"use client";

import React, { useState } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "How long does a website project take?",
    answer: "Most projects are completed within 1–4 weeks depending on complexity, features, and revisions.",
  },
  {
    id: 2,
    question: "Do you offer SEO optimization?",
    answer: "Yes, we provide modern SEO optimization strategies to improve visibility, rankings, and performance.",
  },
  {
    id: 3,
    question: "Can you redesign existing websites?",
    answer: "Absolutely. We redesign outdated websites into modern, premium digital experiences.",
  },
  {
    id: 4,
    question: "Do you provide branding services?",
    answer: "Yes, we create logos, visual identities, brand systems, and creative direction for modern businesses.",
  },
  {
    id: 5,
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer maintenance, updates, and long-term support after project delivery.",
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative z-10 px-4 xs:px-5 sm:px-6 py-16 sm:py-24 md:py-32 md:px-12 lg:px-20 max-w-7xl mx-auto" data-section="faq">
      {/* Ambient glow effects */}
      <div className="absolute -top-40 right-1/3 w-96 h-96 bg-gradient-to-br from-brand-orange/8 via-purple-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
        {/* LEFT SIDE - Content & CTA */}
        <div className="flex flex-col justify-start">
          {/* Badge */}
          <div className="mb-6 sm:mb-8 w-fit">
            <Badge>FAQ</Badge>
          </div>

          {/* Heading */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 sm:mb-8 tracking-tight dark:text-white light:text-gray-900">
            Questions You're Already{" "}
            <span className="italic block mt-2">
              <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Asking</span>
            </span>
          </h2>

          {/* Supporting paragraph */}
          <p className="dark:text-gray-400 light:text-gray-600 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed max-w-md mb-8 sm:mb-12 font-medium">
            Get answers to common questions about our services, process, and support. If you have other questions, we're always here.
          </p>

          {/* CTA Button */}
          <div>
            <a
              href="tel:+919557827160"
              className="inline-flex items-center justify-center px-6 xs:px-7 sm:px-8 py-3 xs:py-3.5 sm:py-4 rounded-lg xs:rounded-xl sm:rounded-2xl font-bold text-sm xs:text-base sm:text-lg transition-all duration-300 dark:bg-brand-orange dark:text-white dark:hover:opacity-90 light:bg-rose-600 light:text-white light:hover:opacity-90 shadow-lg hover:shadow-xl dark:shadow-brand-orange/30 light:shadow-rose-600/30"
            >
              Book a Free Call →
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - FAQ Accordion */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
          {faqItems.map((item, index) => (
            <div key={item.id} className="group">
              {/* Question Button */}
              <button
                onClick={() => toggleAccordion(item.id)}
                className="faq-item w-full flex items-start justify-between gap-3 xs:gap-4 py-4 xs:py-5 sm:py-6 px-4 xs:px-5 sm:px-6 rounded-lg xs:rounded-2xl border transition-all duration-300 group/btn dark:border-white/5 dark:bg-gradient-to-br dark:from-white/2 dark:via-white/1 dark:to-transparent light:border-gray-300 light:bg-white dark:hover:border-brand-orange/20 light:hover:border-rose-300"
              >
                {/* Question Text */}
                <span className="text-left">
                  <p className="faq-question font-black text-xs xs:text-sm sm:text-base md:text-lg leading-snug dark:text-white light:text-gray-900 dark:group-hover/btn:text-brand-orange light:group-hover/btn:text-rose-600 transition-colors duration-300">
                    {item.question}
                  </p>
                </span>

                {/* Plus Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div
                    className={`faq-icon w-5 xs:w-6 sm:w-6 h-5 xs:h-6 sm:h-6 rounded-full border flex items-center justify-center transition-all duration-300 dark:border-brand-orange/40 light:border-rose-300 ${
                      openId === item.id ? "dark:bg-brand-orange/20 dark:border-brand-orange/60 light:bg-rose-100 light:border-rose-500" : "dark:group-hover/btn:border-brand-orange/60 light:group-hover/btn:border-rose-400"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 dark:text-brand-orange light:text-rose-500 transition-transform duration-300 ${
                        openId === item.id ? "rotate-45" : ""
                      }`}
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </button>

              {/* Answer - Expandable */}
              <div
                className={`overflow-hidden transition-all duration-400 ease-out ${
                  openId === item.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2">
                  <p className="faq-answer dark:text-gray-400 light:text-gray-600 text-base leading-relaxed font-medium">
                    {item.answer}
                  </p>
                </div>
              </div>

              {/* Thin divider - only show if not last item */}
              {index < faqItems.length - 1 && (
                <div className="h-px dark:bg-gradient-to-r dark:from-white/5 dark:via-white/10 dark:to-white/5 light:bg-gradient-to-r light:from-gray-200 light:via-gray-300 light:to-gray-200 mt-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
