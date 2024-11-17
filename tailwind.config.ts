import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        judson: ["Judson", "serif"],
      },
      colors: {
        primary: "rgb(229, 107, 71)",
        secondary: "rgb(163, 177, 138)",
        neutral: {
          100: "rgb(250, 248, 246)",
          200: "rgb(241, 237, 233)",
          300: "rgb(227, 221, 215)",
          400: "rgb(200, 190, 180)",
          500: "rgb(170, 156, 143)",
          600: "rgb(130, 116, 103)",
          700: "rgb(90, 80, 71)",
          800: "rgb(51, 51, 51)",
        },
        accent: "rgb(255, 250, 240)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;