/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  important: "html",
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  daisyui: {
    themes: ["forest"],
  },
};
