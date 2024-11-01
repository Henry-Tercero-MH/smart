/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        '16/9': '16 / 9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};