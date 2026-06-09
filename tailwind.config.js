/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#FFF3EC',
          100: '#FFE0CC',
          200: '#FFC199',
          300: '#FFA366',
          400: '#FF8533',
          500: '#FF6B35',
          600: '#E5501A',
          700: '#B33E14',
          800: '#802C0E',
          900: '#4D1A08',
        },
        secondary: {
          50: '#EFFBF9',
          100: '#CCF2EC',
          200: '#99E5D9',
          300: '#66D8C7',
          400: '#33CBB4',
          500: '#4ECDC4',
          600: '#2AA69B',
          700: '#1F7D75',
          800: '#15534E',
          900: '#0A2A27',
        },
      },
      fontFamily: {
        display: ['"Fredoka"', '"Baloo 2"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'pulse-fast': 'pulse 0.6s ease-in-out',
        'pop': 'pop 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'shake': 'shake 0.4s ease-in-out',
        'count': 'count 0.4s ease-out',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        count: {
          '0%': { transform: 'scale(1.3)', color: '#FF6B35' },
          '100%': { transform: 'scale(1)' },
        },
      },
      boxShadow: {
        '3d': '0 6px 0 rgba(0,0,0,0.15), 0 10px 30px rgba(0,0,0,0.1)',
        '3d-hover': '0 8px 0 rgba(0,0,0,0.15), 0 15px 40px rgba(0,0,0,0.15)',
        'inner-glow': 'inset 0 2px 10px rgba(255,255,255,0.1)',
      },
    },
  },
  plugins: [],
};
