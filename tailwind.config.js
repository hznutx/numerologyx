import {nextui} from '@nextui-org/theme';
import {color} from 'framer-motion';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '2560px',
    },
    extend: {
      fontFamily: {
        kanit: ['kanit', 'sans-serif'],
      },
      colors: {
        common: {
          black: '#000',
          white: '#fff',
        },
        initial: '#CCCCCC',
        prime: '#465670',
        primary: '#4c84b5',
        default: '#8DC1EF',
        secondary_1: '#007991',
        secondary_2: '#4d9ee6',
        secondary: '#A14686',
        warning_0: '#f9d29f',
        warning: '#F6B969',
        warning_1: '#f29a26',
        error: '#F24C44',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
