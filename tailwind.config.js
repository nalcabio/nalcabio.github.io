/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["public/**/*.html"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      backgroundImage: {
        proofofconcept: "url('/static/proofofconcept-bg.jpg')",
      },
    },
  },
};
