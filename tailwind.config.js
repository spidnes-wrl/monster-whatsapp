/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'monster-bg': '#0F1613',
        'monster-card': '#161F1B',
        'monster-border': '#283530',
        'monster-accent': '#E8B33D',
        'monster-sage': '#6B9080',
        'monster-text': '#EDF2EF',
        'monster-text-secondary': '#8B9992',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['IBM Plex Mono', 'monospace'],
      },
      borderRadius: {
        'monster': '12px',
      },
    },
  },
  plugins: [],
}
