/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
safelist: [
    /^p-carousel/,
    /^p-button/,
    /^p-tag/,
    /^pi-/,
    /^p-/,
    /^w-/,
    /^rounded-/,
  ],
  theme: { extend: {} },
  plugins: [],
}