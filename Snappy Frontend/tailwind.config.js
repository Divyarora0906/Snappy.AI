/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B101E',
        surface: '#151C2C',
        surfaceHover: '#1A2335',
        primary: '#3B82F6',
        textMain: '#E2E8F0',
        textMuted: '#94A3B8'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
