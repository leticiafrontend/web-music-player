import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'rose': '#FF67A6',
        'lightblue': '#8D8D8D',
        'purple': '#6767FF',
        'charcoal': '#191919',
        'dark': '#000000',
        'lightgray': '#F7F7F7',
        'mediumGray': '#686868',
        'darkgray': '#0C0D0F',
        'darkgreen': '#034301',
        'green': '#048500',
        
        // for gradient
        'gradient': {
          'green-start': '#71FF67',
          'green-end': '#29BBBB',
          'blue-start': '#6767FF',
          'blue-end': '#2931BB',
          'pink-start': '#FF67A6',
          'pink-end': '#BB2966',
        },
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(90deg, #71FF67 0%, #29BBBB 100%)',
        'gradient-blue': 'linear-gradient(90deg, #6767FF 0%, #2931BB 100%)',
        'gradient-pink': 'linear-gradient(90deg, #FF67A6 0%, #BB2966 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
