import type { Metadata } from "next";
import { RedirectToSection } from "@/components/RedirectToSection";

export const metadata: Metadata = {
  title: "About | Insight Media — Modern Creative Digital Agency",
  description:
    "Learn about Insight Media — a modern creative digital agency focused on building premium websites, high-converting experiences, branding, and digital solutions for growing brands.",
  alternates: {
    canonical: "https://insightmedia.in/about",
  },
  openGraph: {
    title: "About | Insight Media",
    description:
      "Insight Media is a modern creative digital agency building premium digital experiences for growing brands.",
    url: "https://insightmedia.in/about",
    type: "website",
    siteName: "Insight Media",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Insight Media",
    description:
      "Insight Media is a modern creative digital agency building premium digital experiences for growing brands.",
  },
};

export default function Page() {
  return <RedirectToSection section="about" />;
}
