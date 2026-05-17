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
  title: "InsightMedia - Build Modern Brands",
  description:
    "InsightMedia - Premium digital agency specializing in modern web design, branding, UI/UX, and digital experiences that help brands grow with impact.",
  icons: {
    icon: "/favicon-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="constellation-bg" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
