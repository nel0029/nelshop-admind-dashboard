/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pale-red": "#ef476f",
        "pale-yellow": "#ffd166",
        "pale-green": "#06d6a0",
        "pale-blue": "#118ab2",
        "pale-black": "#073b4c"
      }
    },
  },
  plugins: [],
}

