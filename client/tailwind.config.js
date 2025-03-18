/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F5385D',
        'secondary': '#ffffff',
        'accent': '#000000',
        'background': '#ffffff',
        'text': '#000000',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}
