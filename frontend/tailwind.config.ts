import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jungle: {
          light: '#A4BE7B',
          DEFAULT: '#5F8D4E',
          dark: '#285430',
          brown: '#8C7A5B',
          darkBrown: '#594D37',
          leaf: '#E5D9B6'
        },
        monkey: {
          fur: '#BF8B67',
          dark: '#8B5E34'
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      }
    },
  },
  plugins: [],
};

export default config; 