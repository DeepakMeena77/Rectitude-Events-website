/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#F5F0E8', light: '#FAF7F2', dark: '#EDE4D3' },
        brown: { light: '#8B6F5E', DEFAULT: '#5C3D2E', dark: '#3D2517' },
        plum: { light: '#9B7EA8', DEFAULT: '#7B4F8C', dark: '#5A2D6E' },
        gold: { DEFAULT: '#C9A84C', light: '#E0C070' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
