/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      colors: {
        "brand-orange": "#ff5a1f",
        "brand-dark": "#0a0a0a",
        "brand-light": "#ffffff",
        "gray-150": "#e8e8e8",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-playfair)"],
      },
      fontSize: {
        "9xl": "8rem",
      },
      boxShadow: {
        "glow-orange": "0 0 30px rgba(255, 90, 31, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
