import type { Config } from "tailwindcss";

// Tokens mirror the Glowforge brand palette + the gf-design-system workspace
// set. Page chrome uses these as utility classes (Onlook-editable); the
// widget and custom effects live in app/globals.css.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#fdf8f1",
        "paper-deep": "#f9e7cb",
        pine: "#0e454d",
        ink: "#12151a",
        "ink-soft": "#5d564b",
        teal: "#16a0b0",
        burn: "#63241a",
        line: "#e8dec9",
        ws: {
          button: "#1e93a5",
          base: "#26b8ce",
          light: "#a6e1eb",
          dark: "#0a3036",
          100: "#f5f5f5",
          200: "#e8eaed",
          500: "#73777f",
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', "Archivo", "sans-serif"],
        sans: ["Archivo", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
        ws: ['"Space Grotesk"', "sans-serif"],
        wsbody: ['"Exo 2"', "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
