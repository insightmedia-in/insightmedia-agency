import type { Metadata } from "next";
import { RedirectToSection } from "@/components/RedirectToSection";

export const metadata: Metadata = {
  title: "Contact | Insight Media — Get In Touch",
  description:
    "Get in touch with Insight Media for premium web development, UI/UX design, branding, and digital services. We respond within 12 hours.",
  alternates: {
    canonical: "https://insightmedia.in/contact",
  },
  openGraph: {
    title: "Contact | Insight Media",
    description:
      "Contact Insight Media for premium digital solutions. We respond within 12 hours.",
    url: "https://insightmedia.in/contact",
    type: "website",
    siteName: "Insight Media",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Insight Media",
    description:
      "Contact Insight Media for premium digital solutions. We respond within 12 hours.",
  },
};

export default function Page() {
  return <RedirectToSection section="footer" />;
}
