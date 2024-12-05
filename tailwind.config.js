/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#fc8533",
        },
        dark: {
          DEFAULT: "#2d394f",
        },
        cyan: {
          DEFAULT: "#b2ecff",
        },
      },
    },
  },
  plugins: [],
};
