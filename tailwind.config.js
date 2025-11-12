/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}","./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        harlem: {
          pink:"#FBD3E9", white:"#FFF6F1", blue:"#CDE8F6", mint:"#D9F6EC", brown:"#6A4631",
        },
      },
      fontFamily: {
        display:["'Lemon Milk Light'","Quicksand","ui-sans-serif","system-ui"],
        body:["Quicksand","ui-sans-serif","system-ui"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // si instalaste animate; si no, quítalo
};
