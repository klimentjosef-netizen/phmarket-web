import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#186E31",
          dark: "#0D4F3D",
          light: "#4B916D",
        },
        dark: "#1A1A1A",
      },
    },
  },
  plugins: [],
};
export default config;
