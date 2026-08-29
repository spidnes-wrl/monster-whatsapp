import { type Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "monster-bg": "#0F1613",
        "monster-card": "#161F1B",
        "monster-border": "#283530",
        "monster-accent": "#E8B33D",
        "monster-sage": "#6B9080",
        "monster-text": "#EDF2EF",
        "monster-text-secondary": "#8B9992",
      },
      fontFamily: {
        "display": ["Space Grotesk", ...defaultTheme.fontFamily.sans],
        "body": ["Inter", ...defaultTheme.fontFamily.sans],
        "mono": ["IBM Plex Mono", ...defaultTheme.fontFamily.mono],
      },
      borderRadius: {
        "monster": "12px",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
