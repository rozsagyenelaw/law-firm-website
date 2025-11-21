import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Match main site colors exactly
        'primary-blue': '#1e3a5f',
        'accent-gold': '#c9a961',
        'text-dark': '#2c3e50',
        'text-light': '#4a4a4a',
        'section-bg': '#f8f9fa',
        'hover-bg': '#f8f9fa',
        'border-color': '#dee2e6',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'Georgia', 'serif'],
        'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-blue': 'linear-gradient(135deg, #1e3a5f 0%, #2a5298 100%)',
        'gradient-overlay': 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
      },
      backdropBlur: {
        'glass': '10px',
      },
      boxShadow: {
        'glass': '0 5px 20px rgba(0,0,0,0.3)',
        'glass-hover': '0 10px 30px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}

export default config
