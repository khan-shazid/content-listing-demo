/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,tsx}", "./src/**/**/*.{js,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        default: ['Titillium Web', 'sans-serif']
      }
    }
  },
  variants: {},
}