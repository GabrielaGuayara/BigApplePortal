/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'images': "url('./assets/CarouselImage2.jpg')"
      }
    }},
  plugins: [],
}