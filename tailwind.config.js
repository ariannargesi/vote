/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./pages/**",
    "./app/**",
    "./features/**",
    "./components/**",

  ],
  theme: {
    extend: {
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },

    },
  },
  plugins: [],
}