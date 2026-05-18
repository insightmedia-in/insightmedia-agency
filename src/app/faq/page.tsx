import type { Metadata } from "next";
import { RedirectToSection } from "@/components/RedirectToSection";

export const metadata: Metadata = {
  title: "FAQ | InsightMedia — Frequently Asked Questions",
  description:
    "Frequently asked questions about InsightMedia's web development, UI/UX design, SEO, branding, and digital services. Get answers to common queries.",
  alternates: {
    canonical: "https://insightmedia.in/faq",
  },
  openGraph: {
    title: "FAQ | InsightMedia",
    description:
      "Get answers to common questions about InsightMedia's services, process, and support.",
    url: "https://insightmedia.in/faq",
    type: "website",
    siteName: "InsightMedia",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | InsightMedia",
    description:
      "Get answers to common questions about InsightMedia's services, process, and support.",
  },
};

export default function Page() {
  return <RedirectToSection section="faq" />;
}
