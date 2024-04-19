/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      phone: "360px",
      laptop: "1020px",
      desktop: "1920px",
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      backgroundImage: {
        "gradient-to-t": "linear-gradient(to top, #6d6d6d, transparent)",
        "gradient-to-t-main": "linear-gradient(to top, #4b4a4a, transparent)",
        "text-bg-1": "url('../app/_assets/image/about/text-bg-1.png')",
        "text-bg-2": "url('../app/_assets/image/about/text-bg-2.png')",
        "text-bg-3": "url('../app/_assets/image/about/text-bg-3.png')",
        "main-img": "url('../app/_assets/image/mainpage/main.png')",
      },
    },
    darkMode: "class",
  },
  plugins: [nextui()],
};
