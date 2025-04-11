/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF3E00", // Bright orange
        secondary: "#00F5FF", // Electric blue
        accent: "#FF00FF", // Hot pink
        dark: "#000000",
        light: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Archivo Black", "sans-serif"],
      },
      animation: {
        tick: "tick 0.2s ease-in-out",
        untick: "untick 0.2s ease-in-out",
      },
      keyframes: {
        tick: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.05) rotate(1deg)" },
          "100%": { transform: "scale(1) rotate(1deg)" },
        },
        untick: {
          "0%": { transform: "scale(1) rotate(1deg)" },
          "50%": { transform: "scale(0.95) rotate(-1deg)" },
          "100%": { transform: "scale(1) rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
