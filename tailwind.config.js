// tailwind.config.js
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
      '2k': '1440px',
      '4k': '2560px',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        'brand-green': {
          50: '#f7fee7',
          100: '#ecfccf',
          200: '#d9f99d',
          300: '#bbf761',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
          950: '#1c2b0e',
        },
        'surface-dark': {
          50: '#1e1e1e',
          100: '#1a1a1a',
          200: '#141414',
          300: '#0f0f0f',
          400: '#0d0d0d',
          500: '#0a0a0a',
          600: '#080808',
          700: '#050505',
          800: '#030303',
          900: '#000000',
        },
      },
      fontFamily: {
        display: ['"Exo 2"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      fontSize: {
        xxl: '5rem',
      },
      spacing: {
        18: '4.5rem',
        128: '32rem',
        144: '36rem',
      },
      animation: {
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeRoute: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionProperty: {
        size: 'width, height',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'glow-green': '0 0 10px rgba(132, 204, 22, 0.7)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'green-stripe':
          'repeating-linear-gradient(45deg, var(--tw-color-surface-dark-500) 0, var(--tw-color-surface-dark-500) 10px, var(--tw-color-surface-dark-700) 10px, var(--tw-color-surface-dark-700) 20px)',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),

    // 🌟 Enhanced Custom Scroll Plugin (revised)
    plugin(function ({ addUtilities, addComponents, theme }) {
      // -----------------------------
      // 1️⃣ Scroll + Overflow Resets (tamed)
      // -----------------------------
      addUtilities({
        '.scroll-top': {
          // keep user scroll smooth but avoid forcing aggressive behavior that breaks programmatic scroll
          'scroll-behavior': 'smooth',
          'scroll-padding-top': '0',
          // removed 'overscroll-behavior: none' and 'overflow-anchor: none' to avoid interfering with scroll resets
        },
        '.scroll-container': {
          // use explicit h-screen so this becomes the viewport-sized scroll container
          // (min-h-screen can sometimes prevent overflow from appearing when combined with child heights)
          '@apply w-full h-screen overflow-y-auto scroll-smooth': {},
        },
        '.no-scroll-memory': {
          'scroll-margin': '0 !important',
          'scroll-snap-type': 'none',
        },
      });

      // -----------------------------
      // 2️⃣ Page Transition Helpers
      // -----------------------------
      addUtilities({
        '.page-transition': {
          animation: 'fadeRoute 0.4s ease-out both',
        },
      });

      // -----------------------------
      // 3️⃣ Components for Layouts
      // -----------------------------
      addComponents({
        '.page-wrapper': {
          // use scroll-container (h-screen + overflow-y-auto). Removed min-h-screen to avoid accidental double-scrolling.
          '@apply scroll-container scroll-top bg-surface-dark-900 text-brand-green-400 flex flex-col transition-opacity duration-300': {},
        },
        '.btn-glow': {
          '@apply py-3 px-6 rounded-lg text-white font-bold transition duration-300': {},
          backgroundColor: theme('colors.brand-green.500'),
          '&:hover': {
            backgroundColor: theme('colors.brand-green.600'),
            boxShadow: theme('boxShadow.glow-green'),
          },
        },
        '.card-dark': {
          '@apply bg-surface-dark-700 border border-surface-dark-500 rounded-xl p-6': {},
          color: theme('colors.brand-green.300'),
        },
      });
    }),
  ],
};
