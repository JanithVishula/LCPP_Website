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
          DEFAULT: '#001856', // Leo navy blue (from logo)
          light: '#003087',
          dark: '#000342',
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
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
