/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  safelist: [
    /^p-carousel/,
    /^p-button/,
    /^p-tag/,
    /^pi-/,
    /^p-/,
    /^w-/,
    /^rounded-/,
  ],
  theme: {
    extend: {
      colors: {
        nino: "var(--color-nino)",
        joven: "var(--color-joven)",
        padre: "var(--color-padre)",
      },
    },
  },
  plugins: [],
};
