/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto': ['Noto Sans', 'sans-serif'],
        'Geologica': ['Geologica', 'sans-serif'],
        'Caveat': ['Caveat', 'cursive']
      },
      colors: {
        "darkgold": "#A98743",
        "eggshell": "#EEEBD3",
        "saffron": "#F9D476",
        "curelean": "#437C90",
        "vandyke": "#523F38"
      }
    },
  },
  plugins: [],
}

