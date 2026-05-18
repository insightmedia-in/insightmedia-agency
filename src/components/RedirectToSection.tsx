"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RedirectToSectionProps {
  section: string;
}

/**
 * SEO-optimized redirect component.
 * 
 * When a user navigates to /services, /about, /team, /faq, or /contact,
 * this component redirects them to the homepage with the appropriate hash.
 * 
 * Google crawlers see the full page with server-rendered metadata (title, description, OG tags)
 * which helps generate sitelinks in search results. But actual users get
 * seamlessly redirected to the one-page experience.
 * 
 * The noscript fallback with meta refresh ensures the redirect works even
 * without JavaScript (which also covers most crawlers that don't execute JS).
 */
export const RedirectToSection: React.FC<RedirectToSectionProps> = ({ section }) => {
  const router = useRouter();

  useEffect(() => {
    // Replace in history so user can't go "back" to the redirect page
    router.replace(`/#${section}`);
  }, [router, section]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-brand-dark"
      aria-hidden="true"
    >
      {/* Fallback for no-JS / crawlers */}
      <noscript>
        <meta httpEquiv="refresh" content={`0;url=/#${section}`} />
      </noscript>
      
      {/* Brief loading state shown during redirect */}
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400 text-sm font-medium">Redirecting...</p>
      </div>
    </div>
  );
};
