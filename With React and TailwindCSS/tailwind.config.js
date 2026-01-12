/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
        colors: {
        bg: "#0b1020",
        card: "rgba(255,255,255,0.05)",
        accent: "#7c7cff",
      },
    },
  },
  plugins: [],
}
