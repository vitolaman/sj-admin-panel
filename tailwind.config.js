const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  darkMode: [],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/daisyui/dist/**/*.js',
    './node_modules/react-daisyui/dist/**/*.js',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        seeds: {
          DEFAULT: '#3ac4a0',
          50: '#edfcf7',
          100: '#d4f7e9',
          200: '#adedd7',
          300: '#77dec0',
          400: '#3ac4a0',
          500: '#1dac8c',
          600: '#108b72',
          700: '#0d6f5d',
          800: '#0d584b',
          900: '#0c483e',
          950: '#052924',
        },
        'persian-green': {
          DEFAULT: '#27a590',
          50: '#f2fbf8',
          100: '#d1f6ec',
          200: '#a4ebd9',
          300: '#6edac3',
          400: '#40c1aa',
          500: '#27a590',
          600: '#1d8475',
          700: '#1b6a60',
          800: '#1a554e',
          900: '#1a4741',
          950: '#092a27',
        },
        'shark': {
          DEFAULT: '#262626',
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#262626',
        },
        primary: {
          DEFAULT: '#6D41F5',
          100: '#e9e8ff',
          200: '#d7d4ff',
          300: '#b8b2ff',
          400: '#9687fe',
          500: '#7456fc',
          600: '#6d41f5',
          700: '#5321e0',
          800: '#461bbc',
          900: '#3b189a',
        },
        secondary: {
          DEFAULT: '#B852B5',
          100: '#f8eef8',
          200: '#f1dcf0',
          300: '#eacbe9',
          400: '#e3bae1',
          500: '#dca9da',
          600: '#d497d3',
          700: '#cd86cb',
          800: '#c675c4',
          900: '#bf63bc',
        },
        tertiary: {
          DEFAULT: '#B85552',
          100: '#f8eeee',
          200: '#f1dddc',
          300: '#eacccb',
          400: '#e3bbba',
          500: '#dcaaa9',
          600: '#d49997',
          700: '#cd8886',
          800: '#c67775',
          900: '#bf6663',
        },
        success: {
          DEFAULT: '#2dd36f',
          100: '#eafbf1',
          200: '#d5f6e2',
          300: '#c0f2d4',
          400: '#abedc5',
          500: '#96e9b7',
          600: '#81e5a9',
          700: '#6ce09a',
          800: '#57dc8c',
          900: '#42d77d',
        },
        warning: {
          DEFAULT: '#ffc409',
          100: '#fff9e6',
          200: '#fff3ce',
          300: '#ffedb5',
          400: '#ffe79d',
          500: '#ffe284',
          600: '#ffdc6b',
          700: '#ffd653',
          800: '#ffd03a',
          900: '#ffca22',
        },
        danger: {
          DEFAULT: '#eb445a',
          100: '#fdecef',
          200: '#fbdade',
          300: '#f9c7ce',
          400: '#f7b4bd',
          500: '#f5a2ad',
          600: '#f38f9c',
          700: '#f17c8c',
          800: '#ef697b',
          900: '#ed576b',
          dark: '#222428',
        },
        medium: {
          DEFAULT: '#92949c',
          100: '#e6e6e6',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4d4d4d',
          800: '#333333',
          900: '#191919',
        },
        light: {
          DEFAULT: '#f4f5f8',
          100: '#fefefe',
          200: '#fdfdfe',
          300: '#fcfcfd',
          400: '#fbfbfc',
          500: '#fafafc',
          600: '#f8f9fb',
          700: '#f7f8fa',
          800: '#f6f7f9',
          900: '#f5f6f9',
        },
      },
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        cupcake: {
          ...require('daisyui/src/theming/themes')['[data-theme=cupcake]'],
        },
      },
    ],
  },
});
