/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#e0f0fe',
          200: '#bae0fd',
          300: '#7cc6fb',
          400: '#47a5f5',
          500: '#1c84ea',
          600: '#0d68d8',
          700: '#0c53b0',
          800: '#0e458f',
          900: '#0f3b76',
          950: '#0a2651',
        },
        secondary: {
          50: '#f2fcfc',
          100: '#c5f9f9',
          200: '#8df1f1',
          300: '#5de8e8',
          400: '#36d9d9',
          500: '#1ebebe',
          600: '#159393',
          700: '#137070',
          800: '#115656',
          900: '#104545',
          950: '#052929',
        },
        accent: {
          50: '#fff8eb',
          100: '#ffecc6',
          200: '#ffd685',
          300: '#ffba45',
          400: '#ff9b18',
          500: '#fa7e03',
          600: '#dd5702',
          700: '#b83a07',
          800: '#942d0c',
          900: '#7a260d',
          950: '#461204',
        },
        dark: {
          100: '#292929',
          200: '#1f1f1f',
          300: '#171717',
          400: '#111111',
          500: '#0a0a0a',
        },
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        },
      },
      backgroundSize: {
        'gradient-size': '200% 200%',
      },
    },
  },
  plugins: [],
}