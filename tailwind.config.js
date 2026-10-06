/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        guate: {
          blue: '#1e3d59',
          lightBlue: '#17b978',
          teal: '#086972',
          sand: '#f5f0e1',
          gold: '#ffc045',
          sunset: '#ff6e40',
          forest: '#2d6a4f',
          darkForest: '#1b4332',
          clay: '#c85a32'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
