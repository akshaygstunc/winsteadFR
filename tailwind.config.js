module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   extend: {
    fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
    },
      colors: {
        gold: "#C9A24A",
        dark: "#0A0A0A",
      },
    },
  },
  plugins: [],
};