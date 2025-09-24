/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-brown': '#8B4513',
        'light-brown': '#D2B48C',
        'dark-brown': '#654321',
        'cream': '#F5F5DC',
        'accent-orange': '#FF8C00',
      },
      fontFamily: {
        sans: ['var(--font-open-sans)'],
        heading: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
};