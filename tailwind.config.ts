import queries from '@tailwindcss/container-queries';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    // Override font sizes
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['0.9375rem', { lineHeight: '1.5rem' }],
      lg: ['1rem', { lineHeight: '1.75rem' }],
      xl: ['1.125rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.25rem', { lineHeight: '2rem' }],
      '3xl': ['1.5rem', { lineHeight: '2.25rem' }],
      '4xl': ['1.875rem', { lineHeight: '2.5rem' }],
      '5xl': ['2.25rem', { lineHeight: '2.75rem' }],
      '6xl': ['2.75rem', { lineHeight: '3rem' }],
    },
    // Override spacing scale
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.438rem', // Reduced from 0.5rem
      2.5: '0.563rem', // Reduced proportionally
      3: '0.688rem', // Reduced from 0.75rem
      3.5: '0.813rem', // Reduced proportionally
      4: '0.938rem', // Reduced from 1rem
      5: '1.125rem', // Reduced from 1.25rem
      6: '1.313rem', // Reduced from 1.5rem
      7: '1.5rem', // Reduced from 1.75rem
      8: '1.688rem', // Reduced from 2rem
      9: '1.875rem', // Reduced from 2.25rem
      10: '2.063rem', // Reduced from 2.5rem
      11: '2.25rem', // Reduced from 2.75rem
      12: '2.438rem', // Reduced from 3rem
      14: '2.813rem', // Reduced from 3.5rem
      16: '3.188rem', // Reduced from 4rem
      20: '3.938rem', // Reduced from 5rem
      24: '4.688rem', // Reduced from 6rem
      28: '5.438rem', // Reduced from 7rem
      32: '6.188rem', // Reduced from 8rem
      36: '6.938rem', // Reduced from 9rem
      40: '7.688rem', // Reduced from 10rem
      44: '8.438rem', // Reduced from 11rem
      48: '9.188rem', // Reduced from 12rem
      52: '9.938rem', // Reduced from 13rem
      56: '10.688rem', // Reduced from 14rem
      60: '11.438rem', // Reduced from 15rem
      64: '12.188rem', // Reduced from 16rem
      72: '13.688rem', // Reduced from 18rem
      80: '15.188rem', // Reduced from 20rem
      96: '18.188rem', // Reduced from 24rem
    },
    // Override container padding
    container: {
      center: true,
      padding: '1.5rem', // Reduced from 2rem
      screens: {
        '2xl': '1200px', // Reduced from 1400px
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'calc(var(--radius) * 0.75)', // Reduced radius
        md: 'calc(var(--radius) * 0.5)', // Reduced radius
        sm: 'calc(var(--radius) * 0.25)', // Reduced radius
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      containers: {
        xs: '16rem', // Reduced from 20rem
        sm: '20rem', // Reduced from 24rem
        md: '24rem', // Reduced from 28rem
        lg: '28rem', // Reduced from 32rem
        xl: '32rem', // Reduced from 36rem
        '2xl': '36rem', // Reduced from 42rem
        '3xl': '42rem', // Reduced from 48rem
        '4xl': '48rem', // Reduced from 56rem
        '5xl': '56rem', // Reduced from 64rem
        '6xl': '64rem', // Reduced from 72rem
        '7xl': '72rem', // Reduced from 80rem
      },
    },
  },
  plugins: [queries, animate],
} satisfies Config;
