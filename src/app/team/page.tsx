import type { Metadata } from "next";
import { RedirectToSection } from "@/components/RedirectToSection";

export const metadata: Metadata = {
  title: "The Team | Insight Media — Meet Our Founders",
  description:
    "Meet the founders and creative minds behind Insight Media. Built by creators obsessed with premium design and high-converting digital experiences.",
  alternates: {
    canonical: "https://insightmedia.in/team",
  },
  openGraph: {
    title: "The Team | Insight Media",
    description:
      "Meet the founders behind Insight Media — creators obsessed with premium digital experiences.",
    url: "https://insightmedia.in/team",
    type: "website",
    siteName: "Insight Media",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Team | Insight Media",
    description:
      "Meet the founders behind Insight Media — creators obsessed with premium digital experiences.",
  },
};

export default function Page() {
  return <RedirectToSection section="team" />;
}
