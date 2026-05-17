import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  emphasis?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, emphasis }) => {
  return (
    <div 
      className={`
        inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full 
        backdrop-blur-xl shadow-lg transition-all duration-300
        
        /* Dark Mode */
        dark:border-brand-orange/40 dark:bg-gradient-to-r dark:from-brand-orange/8 dark:to-brand-orange/5
        dark:shadow-lg dark:shadow-brand-orange/15 
        dark:hover:shadow-brand-orange/30 dark:hover:border-brand-orange/60
        
        /* Light Mode */
        light:border-rose-200 light:bg-gradient-to-r light:from-rose-50 light:to-pink-50
        light:shadow-rose-500/10 light:hover:shadow-rose-500/20 
        light:hover:border-rose-300
      `}
    >
      <span 
        className={`
          w-0.5 xs:w-1 sm:w-1.5 h-0.5 xs:h-1 sm:h-1.5 rounded-full animate-pulse
          dark:bg-brand-orange
          light:bg-rose-400
        `} 
      />
      <span 
        className={`
          text-[0.55rem] xs:text-[0.65rem] sm:text-xs font-bold tracking-[0.12em] uppercase
          dark:text-brand-orange
          light:text-rose-600
        `}
      >
        {children}
      </span>
    </div>
  );
};
