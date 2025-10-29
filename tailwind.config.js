/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(240, 10%, 4%)',
        text: 'hsl(0, 0%, 98%)',
        error: 'hsl(0, 84%, 60%)',
        accent: 'hsl(142, 76%, 36%)',
        border: 'hsl(240, 6%, 20%)',
        primary: 'hsl(262, 83%, 58%)',
        success: 'hsl(142, 76%, 36%)',
        surface: 'hsl(240, 6%, 10%)',
        warning: 'hsl(38, 92%, 50%)',
        'text-muted': 'hsl(240, 5%, 64%)',
        'surface-hover': 'hsl(240, 6%, 14%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '12px',
        'sm': '6px',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(240, 10%, 0%, 0.4)',
        'glow': '0 0 24px hsla(262, 83%, 58%, 0.3)',
        'elevated': '0 8px 32px hsla(240, 10%, 0%, 0.6)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      animation: {
        'fade-in': 'fadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 250ms cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 24px hsla(262, 83%, 58%, 0.3)' },
          '50%': { boxShadow: '0 0 36px hsla(262, 83%, 58%, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}