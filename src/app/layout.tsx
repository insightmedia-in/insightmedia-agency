import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://insightmedia.in"),
  title: {
    default: "InsightMedia — Modern Digital Agency",
    template: "%s | InsightMedia",
  },
  description:
    "InsightMedia is a modern digital agency offering premium web development, UI/UX design, branding, SEO, and digital solutions for modern businesses and creators.",
  keywords: [
    "digital agency",
    "web development",
    "UI/UX design",
    "branding",
    "SEO optimization",
    "InsightMedia",
    "premium websites",
    "digital experiences",
    "modern web design",
    "video editing",
    "brand identity",
  ],
  authors: [{ name: "InsightMedia", url: "https://insightmedia.in" }],
  creator: "InsightMedia",
  publisher: "InsightMedia",
  icons: {
    icon: "/favicon-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://insightmedia.in",
    siteName: "InsightMedia",
    title: "InsightMedia — Modern Digital Agency",
    description:
      "Premium web development, branding, UI/UX, SEO, and digital experiences for modern brands.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InsightMedia — Premium Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "InsightMedia — Modern Digital Agency",
    description:
      "Premium web development, branding, UI/UX, SEO, and digital experiences for modern brands.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://insightmedia.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// JSON-LD Structured Data for SEO sitelinks
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InsightMedia",
  url: "https://insightmedia.in",
  logo: "https://insightmedia.in/favicon-logo.png",
  description:
    "Transform local businesses into modern digital brands through premium websites, branding, UI/UX design, SEO, and high-converting digital experiences.",
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-95578-27160",
    contactType: "customer service",
    email: "hello@insightmedia.in",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://instagram.com/insightmedia.in",
    "https://twitter.com/insightmedia_in",
    "https://linkedin.com/company/insightmedia-in",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "InsightMedia",
  url: "https://insightmedia.in",
  description:
    "Transform local businesses into modern digital brands through premium websites, branding, UI/UX design, SEO, and high-converting digital experiences.",
  publisher: {
    "@type": "Organization",
    name: "InsightMedia",
  },
};

// SiteNavigationElement helps Google understand page structure for sitelinks
const siteNavigationSchema = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: "Main Navigation",
  hasPart: [
    {
      "@type": "WebPage",
      name: "Services",
      url: "https://insightmedia.in/services",
      description:
        "Premium web development, UI/UX design, SEO optimization, branding, and video editing services.",
    },
    {
      "@type": "WebPage",
      name: "About",
      url: "https://insightmedia.in/about",
      description:
        "Learn about InsightMedia — a modern creative digital agency building premium digital experiences.",
    },
    {
      "@type": "WebPage",
      name: "Team",
      url: "https://insightmedia.in/team",
      description:
        "Meet the founders and creative minds behind InsightMedia.",
    },
    {
      "@type": "WebPage",
      name: "FAQ",
      url: "https://insightmedia.in/faq",
      description:
        "Frequently asked questions about InsightMedia's services and process.",
    },
    {
      "@type": "WebPage",
      name: "Contact",
      url: "https://insightmedia.in/contact",
      description:
        "Get in touch with InsightMedia for premium digital solutions.",
    },
  ],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "InsightMedia",
  url: "https://insightmedia.in",
  image: "https://insightmedia.in/favicon-logo.png",
  description:
    "Transform local businesses into modern digital brands through premium websites, branding, UI/UX design, SEO, and high-converting digital experiences.",
  telephone: "+91-95578-27160",
  email: "hello@insightmedia.in",
  priceRange: "$$",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          description:
            "Modern, fast, responsive websites built for growth and conversions.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "UI/UX Design",
          description:
            "Premium user-focused interfaces with clean modern experiences.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SEO Optimization",
          description:
            "Smart SEO strategies to improve rankings and online visibility.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Branding",
          description:
            "Logos, visual identity and creative direction for modern brands.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Video Editing",
          description:
            "High-quality edits, reels, promos and cinematic brand content.",
        },
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data for SEO Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="constellation-bg" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
