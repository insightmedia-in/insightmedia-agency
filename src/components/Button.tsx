import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "font-bold text-xs xs:text-sm sm:text-base py-2.5 xs:py-3 sm:py-3 px-4 xs:px-5 sm:px-8 rounded-lg xs:rounded-xl sm:rounded-2xl transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-xl w-full sm:w-auto";

  const variants = {
    primary: `
      bg-gradient-to-r from-brand-orange to-orange-600 
      hover:from-orange-600 hover:to-orange-700 
      text-white shadow-lg shadow-brand-orange/20 
      hover:shadow-brand-orange/35 
      hover:scale-105 active:scale-95
      dark:bg-gradient-to-r dark:from-brand-orange dark:to-orange-600
      dark:hover:from-orange-600 dark:hover:to-orange-700
      dark:shadow-brand-orange/20 dark:hover:shadow-brand-orange/35
      light:bg-gradient-to-r light:from-rose-500 light:to-pink-600
      light:hover:from-rose-600 light:hover:to-pink-700
      light:text-white light:shadow-rose-500/20 light:hover:shadow-rose-500/35
    `,
    secondary: `
      border-2 active:scale-95 backdrop-blur-sm
      dark:border-brand-orange dark:text-white dark:hover:shadow-brand-orange/30
      dark:hover:text-white dark:hover:shadow-lg dark:hover:bg-brand-orange/10
      light:border-rose-500 light:text-rose-700 light:border-2
      light:hover:bg-rose-50 light:hover:shadow-rose-400/50
      light:hover:text-rose-800 light:hover:shadow-lg light:hover:border-rose-600
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
