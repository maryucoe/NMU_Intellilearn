import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6A0F1C",
          dark: "#5A0E18",
          light: "#7A1A2A",
        },
        secondary: {
          DEFAULT: "#1E1E1E",
          light: "#2A2A2A",
        },
        accent: {
          DEFAULT: "#C9A24D",
          dark: "#B8923D",
          light: "#D9B25D",
        },
        success: "#2ECC71",
        error: "#E74C3C",
        background: {
          light: "#F7F7F7",
          dark: "#121212",
        },
        card: {
          light: "#FFFFFF",
          dark: "#1E1E1E",
        },
        text: {
          light: "#1E1E1E",
          dark: "#F7F7F7",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
