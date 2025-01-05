/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // jakarta: ['Plus Jakarta Sans', 'sans-serif'], // Add your custom font
        // inter: ['Inter', 'sans-serif'], // Add your custom font
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "luxury", "sunset"],
    exclude: ["#google-signin-button"], // Exclude this element from DaisyUI styling
  },
}

