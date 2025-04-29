/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Cormorant: ['Cormorant', 'serif'],
      },
    },
  },
  plugins: [
    import('tailwind-scrollbar')
  ],
  
};
