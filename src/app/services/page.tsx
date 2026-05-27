import type { Metadata } from "next";
import { RedirectToSection } from "@/components/RedirectToSection";

export const metadata: Metadata = {
  title: "Services | Insight Media — Web Development, UI/UX, SEO, Branding",
  description:
    "Premium web development, UI/UX design, SEO optimization, branding, and video editing services by Insight Media. Transform your brand with modern digital solutions.",
  alternates: {
    canonical: "https://insightmedia.in/services",
  },
  openGraph: {
    title: "Services | Insight Media",
    description:
      "Premium web development, UI/UX design, SEO optimization, branding, and video editing services.",
    url: "https://insightmedia.in/services",
    type: "website",
    siteName: "Insight Media",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Insight Media",
    description:
      "Premium web development, UI/UX design, SEO optimization, branding, and video editing services.",
  },
};

export default function Page() {
  return <RedirectToSection section="services" />;
}
