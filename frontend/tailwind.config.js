/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        customLight: '#655C4F',
        customDark: '#142C26',
      },
      fontSize: {
        'custom-size': '2.5rem',  // Add your custom font size
      }
    },
  },
  plugins: [],
}

