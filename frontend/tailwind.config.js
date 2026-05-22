/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#edf8f5',
          100: '#d5efe8',
          500: '#208b73',
          600: '#176f5c',
          700: '#13594b'
        },
        ink: '#18201d'
      }
    }
  },
  plugins: []
};
