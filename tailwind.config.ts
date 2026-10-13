import type { Config } from "tailwindcss";

/** Barva z CSS promenne (RGB trojice), aby fungovaly i pruhlednosti typu bg-primary/10. */
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Web ma ostre hrany jako aplikace. Zaoblene zustavaji jen kruhy a ram telefonu.
    borderRadius: {
      none: "0",
      sm: "0",
      DEFAULT: "0",
      md: "0",
      lg: "0",
      xl: "0",
      "2xl": "0",
      "3xl": "0",
      full: "9999px",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: v("paper"),
        surface: v("surface"),
        ink: v("ink"),
        muted: v("muted"),
        line: v("line"),
        /** Zelena pro text a ikony, v tmavem rezimu svetlejsi kvuli kontrastu. */
        accent: v("accent"),
        primary: {
          DEFAULT: "#186E31",
          dark: "#0F4A22",
          light: "#4B916D",
        },
        dark: v("ink"),
        // Neutralni skala se v tmavem rezimu otaci, takze starsi tridy gray-* funguji v obou.
        gray: {
          50: v("gray-50"),
          100: v("gray-100"),
          200: v("gray-200"),
          300: v("gray-300"),
          400: v("gray-400"),
          500: v("gray-500"),
          600: v("gray-600"),
          700: v("gray-700"),
          800: v("gray-800"),
          900: v("gray-900"),
        },
      },
    },
  },
  plugins: [],
};
export default config;
