/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: 'rgb(30, 58, 138)',
        customOrange:'#FF7F3E',
        customDark:'rgb(17,45,78)'
      },
    },
  },
  plugins: [],
}

