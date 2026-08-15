/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wedding-bg': '#FCF9F1',
        'wedding-gold': '#C5A059',
        'wedding-dark': '#2c2c2c',
        'wedding-footer': '#1e1e1e',
        'wedding-btn': '#C5A059',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
