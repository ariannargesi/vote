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
      colors:{ 
        'primary': '#083344',
        'secondary': "#284E5C"
      },
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },

    },
  },
  plugins: [],
}