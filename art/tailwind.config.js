module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-brown': '#97644e',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
