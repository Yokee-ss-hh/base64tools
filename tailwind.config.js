/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light theme inspired by Perplexity
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F8F9FA',
        'bg-tertiary': '#F1F3F5',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B7280',
        'text-tertiary': '#9CA3AF',
        'border-light': '#E5E7EB',
        'border-medium': '#D1D5DB',
        'accent-turquoise': '#20B6D6',
        'accent-blue': '#3B82F6',
        'accent-purple': '#8B5CF6',
        'accent-green': '#10B981',
        'accent-pink': '#EC4899',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}