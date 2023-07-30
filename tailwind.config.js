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
        'secondary': "#284E5C",
        'danger': "#FF9696",
        "info": "#60a5fa",
        "info-dark": "#3b82f6",
        "info-light":"#93c5fd"
      },
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },

    },
  },
  plugins: [],
}
