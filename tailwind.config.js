/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: ["./index.html","./src/**/*.{html,js,jsx}",  flowbite.content(),],
  theme: {
    extend: {
      fontFamily:{
        inter:["Inter", "sans-serif"]
      },
      colors:{
        navy:"#01204E"
      }
    },
  
  },
  plugins: [flowbite.plugin(),
  ],
}