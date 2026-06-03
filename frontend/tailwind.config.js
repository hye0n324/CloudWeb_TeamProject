/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ededed",
        neon: {
          400: "#E1FF00",
          500: "#D4FF00",
          600: "#BDE600",
        }
      },
    },
  },
  plugins: [],
}
