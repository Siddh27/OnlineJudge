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
        customDark:'rgb(17,45,78)',
        customProblem:'rgb(53,92,125)',
        customQuestion:'rgb(108,91,123)'
      },
    },
  },
  plugins: [],
}

