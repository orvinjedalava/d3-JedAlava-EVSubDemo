import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6124',
        secondary: {
          DEFAULT: '#ffb233', // Main secondary color
          light: '#ffd185',   // Lighter version for hover states
        },
        tertiary: '#8c39f5'
      },
      transitionTimingFunction: {
        'cubic-bezier': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '0.25s',
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config;