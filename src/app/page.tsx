"use client";

import { useState } from "react";
import { Header, HeroSection, NetworkCanvas, ProjectsSection, ServicesSection, AboutSection, LeadershipSection, FAQSection, Footer, ConsultationModal } from "@/components";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Header onOpenModal={handleOpenModal} />
      <HeroSection onOpenModal={handleOpenModal} />

      <main className="bg-brand-dark">
        <ProjectsSection />
        <ServicesSection />

        {/* About Section - full width, separate */}
        <div className="pt-12">
          <AboutSection onOpenModal={handleOpenModal} />
        </div>

        {/* Leadership Section */}
        <LeadershipSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* Footer */}
        <Footer />
      </main>

      {/* Global Consultation Modal */}
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
}
