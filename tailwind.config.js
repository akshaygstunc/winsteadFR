/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["clamp(12px, 0.7vw, 13px)", { lineHeight: "1.4" }],
      sm: ["clamp(13px, 0.8vw, 14px)", { lineHeight: "1.45" }],
      base: ["clamp(14px, 0.9vw, 16px)", { lineHeight: "1.6" }],
      lg: ["clamp(15px, 1vw, 18px)", { lineHeight: "1.6" }],
      xl: ["clamp(17px, 1.2vw, 20px)", { lineHeight: "1.5" }],
      "2xl": ["clamp(20px, 1.6vw, 24px)", { lineHeight: "1.4" }],
      "3xl": ["clamp(24px, 2vw, 32px)", { lineHeight: "1.3" }],
      "4xl": ["clamp(28px, 2.8vw, 40px)", { lineHeight: "1.2" }],
      "5xl": ["clamp(34px, 3.5vw, 52px)", { lineHeight: "1.1" }],
      "6xl": ["clamp(40px, 4.5vw, 64px)", { lineHeight: "1.05" }],
    },
    extend: {
      colors: {
        gold: "#C9A24A",
        dark: "#0A0A0A",
      },
    },
  },
  plugins: [],
};