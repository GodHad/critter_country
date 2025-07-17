import type { Config } from "tailwindcss";
import { corndog } from "./app/fonts";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        alfa: ['var(--font-alfa)', 'serif'],
        corndog: ['var(--font-corndog)', 'sans-serif']
      }
    },
  },
  plugins: [],
} satisfies Config;
