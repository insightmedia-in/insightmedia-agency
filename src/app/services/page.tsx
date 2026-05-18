import type { Metadata } from "next";
import { RedirectToSection } from "@/components/RedirectToSection";

export const metadata: Metadata = {
  title: "Services | InsightMedia — Web Development, UI/UX, SEO, Branding",
  description:
    "Premium web development, UI/UX design, SEO optimization, branding, and video editing services by InsightMedia. Transform your brand with modern digital solutions.",
  alternates: {
    canonical: "https://insightmedia.in/services",
  },
  openGraph: {
    title: "Services | InsightMedia",
    description:
      "Premium web development, UI/UX design, SEO optimization, branding, and video editing services.",
    url: "https://insightmedia.in/services",
    type: "website",
    siteName: "InsightMedia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | InsightMedia",
    description:
      "Premium web development, UI/UX design, SEO optimization, branding, and video editing services.",
  },
};

export default function Page() {
  return <RedirectToSection section="services" />;
}
