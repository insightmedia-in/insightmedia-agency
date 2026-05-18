"use client";

import React, { useState } from "react";
import { Header, Footer } from "@/components";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

const contactMethods = [
  { icon: "✉️", title: "Email Us", value: "hello@insightmedia.in", href: "mailto:hello@insightmedia.in", description: "We'll respond within 12 hours" },
  { icon: "📞", title: "Call Us", value: "+91 95578 27160", href: "tel:+919557827160", description: "Mon-Sat, 10AM - 7PM IST" },
  { icon: "📍", title: "Location", value: "India", href: "#", description: "Remote-first agency" },
];

const socials = [
  { name: "Instagram", href: "#" },
  { name: "Twitter / X", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:hello@insightmedia.in?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <Header />

      <main className="bg-brand-dark min-h-screen pt-[90px]">
        {/* Hero */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 pt-16 pb-12 sm:pt-24 sm:pb-16 md:pt-32 md:pb-20 md:px-12 lg:px-20 max-w-7xl mx-auto text-center">
          <div className="w-fit mx-auto mb-6">
            <Badge>Contact Us</Badge>
          </div>
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6 dark:text-white light:text-gray-900">
            Let&apos;s Build Something{" "}
            <span className="text-brand-orange dark:text-brand-orange light:text-rose-500">Extraordinary</span>
          </h1>
          <p className="dark:text-gray-400 light:text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
            Have a project in mind? We&apos;d love to hear about it. Reach out and let&apos;s discuss how we can help your brand grow.
          </p>
        </section>

        {/* Contact Grid */}
        <section className="relative z-10 px-4 xs:px-5 sm:px-6 pb-16 sm:pb-24 md:pb-32 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

            {/* Left - Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black mb-3 dark:text-gray-300 light:text-gray-700">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border transition-all duration-300 font-medium text-sm dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:border-brand-orange/60 dark:placeholder-gray-500 light:bg-white light:border-gray-300 light:text-gray-900 light:focus:border-rose-400 light:placeholder-gray-400 outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-black mb-3 dark:text-gray-300 light:text-gray-700">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border transition-all duration-300 font-medium text-sm dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:border-brand-orange/60 dark:placeholder-gray-500 light:bg-white light:border-gray-300 light:text-gray-900 light:focus:border-rose-400 light:placeholder-gray-400 outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-black mb-3 dark:text-gray-300 light:text-gray-700">Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border transition-all duration-300 font-medium text-sm dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:border-brand-orange/60 light:bg-white light:border-gray-300 light:text-gray-900 light:focus:border-rose-400 outline-none appearance-none"
                  >
                    <option value="">Select a service</option>
                    <option value="Web Development">Web Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="Branding">Branding</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-black mb-3 dark:text-gray-300 light:text-gray-700">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border transition-all duration-300 font-medium text-sm resize-none dark:bg-white/5 dark:border-white/10 dark:text-white dark:focus:border-brand-orange/60 dark:placeholder-gray-500 light:bg-white light:border-gray-300 light:text-gray-900 light:focus:border-rose-400 light:placeholder-gray-400 outline-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button type="submit">
                  Send Message <span className="text-lg">→</span>
                </Button>
              </form>
            </div>

            {/* Right - Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {contactMethods.map((method, i) => (
                <a key={i} href={method.href} className="block group p-6 rounded-2xl border transition-all duration-300 dark:border-white/5 dark:bg-white/3 dark:hover:border-brand-orange/30 light:border-gray-200 light:bg-gray-50 light:hover:border-rose-300">
                  <div className="text-2xl mb-3">{method.icon}</div>
                  <h3 className="text-sm font-black uppercase tracking-wider mb-1 dark:text-white light:text-gray-900">{method.title}</h3>
                  <p className="text-base font-bold mb-1 dark:text-brand-orange dark:group-hover:text-brand-orange light:text-rose-600">{method.value}</p>
                  <p className="text-xs dark:text-gray-500 light:text-gray-500 font-medium">{method.description}</p>
                </a>
              ))}

              {/* Socials */}
              <div className="p-6 rounded-2xl border dark:border-white/5 dark:bg-white/3 light:border-gray-200 light:bg-gray-50">
                <h3 className="text-sm font-black uppercase tracking-wider mb-4 dark:text-white light:text-gray-900">Follow Us</h3>
                <div className="flex gap-4">
                  {socials.map((s, i) => (
                    <a key={i} href={s.href} className="px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 dark:bg-white/5 dark:text-gray-400 dark:hover:text-brand-orange dark:hover:bg-brand-orange/10 light:bg-gray-100 light:text-gray-600 light:hover:text-rose-600 light:hover:bg-rose-50">
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
