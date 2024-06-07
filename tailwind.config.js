/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

