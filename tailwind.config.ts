import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000342', // Leo club blue
          light: '#001856',
          dark: '#000120',
        },
        secondary: {
          DEFAULT: '#fed600', // Gold from logo
          light: '#ffed4e',
          dark: '#dbb800',
        },
        gold: {
          DEFAULT: '#fed600',
          light: '#ffed4e',
          dark: '#dbb800',
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
