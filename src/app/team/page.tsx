import type { Metadata } from "next";
import { RedirectToSection } from "@/components/RedirectToSection";

export const metadata: Metadata = {
  title: "The Team | InsightMedia — Meet Our Founders",
  description:
    "Meet the founders and creative minds behind InsightMedia. Built by creators obsessed with premium design and high-converting digital experiences.",
  alternates: {
    canonical: "https://insightmedia.in/team",
  },
  openGraph: {
    title: "The Team | InsightMedia",
    description:
      "Meet the founders behind InsightMedia — creators obsessed with premium digital experiences.",
    url: "https://insightmedia.in/team",
    type: "website",
    siteName: "InsightMedia",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Team | InsightMedia",
    description:
      "Meet the founders behind InsightMedia — creators obsessed with premium digital experiences.",
  },
};

export default function Page() {
  return <RedirectToSection section="team" />;
}
