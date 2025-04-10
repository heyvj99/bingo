/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
        secondary: "#22c55e",
        accent: "#f43f5e",
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        tick: "tick 0.3s ease-in-out",
        untick: "untick 0.3s ease-in-out",
      },
      keyframes: {
        tick: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        untick: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
