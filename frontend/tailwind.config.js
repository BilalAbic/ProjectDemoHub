/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#06f9f9",
        "background-light": "#f5f8f8",
        "background-dark": "#0f2323",
        "surface-dark": "#1a1a1a",
        "surface-light": "#ffffff",
        "text-light-heading": "#1a1a1a",
        "text-light-body": "#555555",
        "text-dark-heading": "#EAEAEA",
        "text-dark-body": "#B0B0B0",
        // Admin specific
        "admin-bg-dark": "#0A1919",
        "admin-surface-dark": "#122B2B",
        "admin-text-body": "#A0B0B0",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      keyframes: {
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        blink: {
          '50%': { borderColor: 'transparent' },
        },
      },
      animation: {
        typing: 'typing 3.5s steps(40, end) infinite, blink .75s step-end infinite',
      },
    },
  },
  plugins: [],
}

