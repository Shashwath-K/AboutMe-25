/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  // 1. Content: A comprehensive list to ensure all files are scanned for classes.
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  
  // 2. Dark Mode: Enable 'class' mode for manual dark/light theme toggling.
  darkMode: 'class', 

  theme: {
    // 3. Screens: Custom breakpoints for very specific responsive designs.
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
      '2k': '1440px',
      '4k': '2560px',
    },
    
    // 4. Extend: The heart of the configuration, where defaults are overwritten and new features are added.
    extend: {
      // THEME COLORS (Black Background & Green Text)
      colors: {
        // Primary colors for the theme
        'primary': 'var(--color-primary)', // Green text/accent
        'secondary': 'var(--color-secondary)', // Black/Dark background
        'accent': 'var(--color-accent)', // A bright tertiary color

        // Custom Green Palette (for text)
        'brand-green': {
          '50': '#f7fee7',
          '100': '#ecfccf',
          '200': '#d9f99d',
          '300': '#bbf761',
          '400': '#a3e635',
          '500': '#84cc16', // Primary shade for green
          '600': '#65a30d',
          '700': '#4d7c0f',
          '800': '#3f6212',
          '900': '#365314',
          '950': '#1c2b0e',
        },

        // Custom Black/Gray Palette (for background, surfaces, borders)
        'surface-dark': {
          '50': '#1e1e1e',
          '100': '#1a1a1a',
          '200': '#141414',
          '300': '#0f0f0f',
          '400': '#0d0d0d',
          '500': '#0a0a0a', // Primary shade for black background
          '600': '#080808',
          '700': '#050505',
          '800': '#030303',
          '900': '#000000',
        },
      },
      
      // TYPOGRAPHY
      fontFamily: {
        'display': ['"Exo 2"', 'sans-serif'], // Custom display font
        'body': ['"Inter"', 'sans-serif'], // Custom body font
      },
      fontSize: {
        'xxl': '5rem', // Custom massive font size
      },

      // SPACING & SIZING
      spacing: {
        '18': '4.5rem', // Custom spacing unit
        '128': '32rem',
        '144': '36rem',
      },
      
      // ANIMATION & TRANSITIONS
      animation: {
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      transitionProperty: {
        'size': 'width, height', // Custom transition for size
      },
      
      // BORDERS, SHADOWS, AND DECORATION
      borderRadius: {
        '4xl': '2rem', // Custom extra-large radius
      },
      boxShadow: {
        'glow-green': '0 0 10px rgba(132, 204, 22, 0.7)', // Green glow effect
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'green-stripe': 'repeating-linear-gradient(45deg, var(--tw-color-surface-dark-500) 0, var(--tw-color-surface-dark-500) 10px, var(--tw-color-surface-dark-700) 10px, var(--tw-color-surface-dark-700) 20px)',
      }
    },
  },
  
  // 5. Plugins: Advanced features and utilities.
  plugins: [
    // Official plugins
    require('@tailwindcss/typography'), // Adds 'prose' styles for rich content
    require('@tailwindcss/forms'), // Resets form element styles
    require('@tailwindcss/aspect-ratio'), // Utilities for aspect ratio
    require('@tailwindcss/container-queries'), // Utilities for container-based queries

    // Custom Utility Plugin (most complex part)
    plugin(function({ addUtilities, addComponents, e, theme }) {
      // CUSTOM COMPONENTS
      addComponents({
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
        }
      });

      // CUSTOM UTILITIES
      addUtilities({
        // Utility for setting the CSS variables used in the theme section
        '.theme-config-green-black': {
          '--color-primary': theme('colors.brand-green.500'),
          '--color-secondary': theme('colors.surface-dark.900'),
          '--color-accent': theme('colors.yellow.400'),
          // Enforce theme on element: black background, green text
          '@apply bg-surface-dark-900 text-brand-green-500': {}, 
        },
        // Utility for forcing an element to be sticky to the top
        '.sticky-top': {
          'position': 'sticky',
          'top': '0',
          'z-index': '10',
        },
        // Utility for adding a custom text shadow
        '.text-shadow-thin': {
          'text-shadow': `1px 1px 0 ${theme('colors.surface-dark.900')}`,
        }
      });
    }),
  ],
}