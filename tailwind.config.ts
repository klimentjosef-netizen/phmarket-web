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
          DEFAULT: "#2E9B5F",
          dark: "#1F7044",
        },
        dark: "#1A1A1A",
      },
    },
  },
  plugins: [],
};
export default config;
