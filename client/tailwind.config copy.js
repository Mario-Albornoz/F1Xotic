/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      container: {
        center: true, // Centers the container by default
        padding: '2rem', // Adds padding around the container
      },
      extend: {
          animation: {
          "spin-slow" : "spin 4s linear infinite",
          },
      },
    },

    plugins: [],
  }
