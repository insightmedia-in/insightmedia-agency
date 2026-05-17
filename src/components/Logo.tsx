"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const LogoContent: React.FC = () => {
  const { theme } = useTheme();
  const [imageKey, setImageKey] = useState(0);
  
  // Use the horizontal logo variants
  const logoSrc =
    theme === "dark"
      ? "/insightmedia_premium_logo.png"
      : "/whitepreiumlogo.png";

  useEffect(() => {
    // Force image refresh when theme changes
    setImageKey(prev => prev + 1);
  }, [theme]);

  return (
    <Image
      key={imageKey}
      src={logoSrc}
      alt="InsightMedia Logo"
      width={260}
      height={80}
      priority
      className="navbar-logo"
    />
  );
};

export const Logo: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="logo-wrapper">
      {mounted ? (
        <LogoContent />
      ) : (
        <div className="navbar-logo-placeholder" />
      )}
    </div>
  );
};
