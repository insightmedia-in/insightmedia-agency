"use client";

import React, { useState } from "react";
import { Header, Footer } from "@/components";
import { Badge } from "@/components/Badge";

const faqCategories = [
  {
    category: "Services",
    items: [
      { q: "What services does InsightMedia offer?", a: "We offer premium web development, UI/UX design, SEO optimization, branding & visual identity, and video editing services. Each service is tailored to help modern businesses build a strong digital presence." },
      { q: "Do you build custom websites or use templates?", a: "We build fully custom websites using modern frameworks like Next.js and React. Every project is designed and developed from scratch to match your unique brand identity and business goals." },
      { q: "Do you offer SEO optimization?", a: "Yes, we provide comprehensive SEO optimization including technical audits, on-page optimization, keyword strategy, content optimization, local SEO, and Core Web Vitals improvement." },
      { q: "Can you redesign existing websites?", a: "Absolutely. We specialize in redesigning outdated websites into modern, premium digital experiences that improve user engagement and conversion rates." },
      { q: "Do you provide branding services?", a: "Yes, we create complete branding packages including logos, visual identity systems, brand guidelines, business cards, social media kits, and creative direction for modern businesses." },
    ],
  },
  {
    category: "Process & Timeline",
    items: [
      { q: "How long does a website project take?", a: "Most projects are completed within 1–4 weeks depending on complexity, features, and revisions. We provide a detailed timeline during the discovery phase." },
      { q: "What is your design process?", a: "Our process follows five stages: Discovery → Strategy → Design → Development → Launch & Support. We keep you involved at every step with regular reviews and feedback sessions." },
      { q: "How many revisions are included?", a: "We include multiple rounds of revisions in every project to ensure you're completely satisfied with the final result. The exact number depends on the project scope." },
    ],
  },
  {
    category: "Pricing & Support",
    items: [
      { q: "How much do your services cost?", a: "Pricing varies based on project scope, complexity, and requirements. We offer competitive rates for premium-quality work. Contact us for a custom quote tailored to your needs." },
      { q: "Do you provide ongoing support?", a: "Yes, we offer maintenance packages, updates, and long-term support after project delivery. We ensure your website stays fast, secure, and up-to-date." },
      { q: "What payment methods do you accept?", a: "We accept bank transfers, UPI, and other standard payment methods. Payment terms are discussed and agreed upon before project kickoff." },
      { q: "Do you offer a money-back guarantee?", a: "We work closely with clients throughout the project to ensure satisfaction. Our iterative process with regular check-ins minimizes any risk of dissatisfaction." },
    ],
  },
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<string | null>("0-0");

  const toggleFaq = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <>
      <Header />

      <main className="bg-brand-dark min-h-screen pt-[90px]">
        {/* Hero */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 md:px-12 lg:px-20 max-w-7xl mx-auto text-center">
          <div className="w-fit mx-auto mb-6">
            <Badge>FAQ</Badge>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 dark:text-white light:text-gray-900">
            Frequently Asked{" "}
            <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Questions</span>
          </h1>
          <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Everything you need to know about our services, process, and support.
          </p>
        </section>

        {/* FAQ Accordion by Category */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 pb-16 sm:pb-24 md:pb-32 md:px-12 lg:px-20 max-w-4xl mx-auto">
          {faqCategories.map((cat, catIdx) => (
            <div key={catIdx} className="mb-12 md:mb-16">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-6 md:mb-8 dark:text-white light:text-gray-900">
                {cat.category}
              </h2>
              <div className="space-y-3 md:space-y-4">
                {cat.items.map((faq, faqIdx) => {
                  const key = `${catIdx}-${faqIdx}`;
                  const isOpen = openIndex === key;
                  return (
                    <div key={key}>
                      <button
                        onClick={() => toggleFaq(key)}
                        className="w-full flex items-start justify-between gap-4 py-5 sm:py-6 px-5 sm:px-6 rounded-2xl border transition-all duration-300 dark:border-white/5 dark:bg-gradient-to-br dark:from-white/3 dark:to-transparent light:border-gray-300 light:bg-white dark:hover:border-brand-orange/20 light:hover:border-rose-300"
                      >
                        <span className="text-left">
                          <p className="font-black text-sm sm:text-base md:text-lg leading-snug dark:text-white light:text-gray-900">{faq.q}</p>
                        </span>
                        <div className="flex-shrink-0 mt-1">
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 dark:border-brand-orange/40 light:border-rose-300 ${isOpen ? "dark:bg-brand-orange/20 dark:border-brand-orange/60 light:bg-rose-100 light:border-rose-500" : ""}`}>
                            <svg className={`w-4 h-4 dark:text-brand-orange light:text-rose-500 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-400 ease-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                        <div className="px-6 pb-6 pt-3">
                          <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base leading-relaxed font-medium">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="mt-8 md:mt-12 text-center p-8 md:p-12 rounded-3xl border dark:border-white/5 dark:bg-white/3 light:border-gray-200 light:bg-gray-50">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-4 dark:text-white light:text-gray-900">Still have questions?</h3>
            <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base mb-6 font-medium">We&apos;re always here to help. Reach out and we&apos;ll get back to you within 12 hours.</p>
            <a href="tel:+919557827160" className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 dark:bg-brand-orange dark:text-white dark:hover:opacity-90 light:bg-rose-600 light:text-white light:hover:opacity-90 shadow-lg">
              Book a Free Call →
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
