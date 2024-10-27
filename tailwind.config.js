/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "250px",
      // => @media (min-width: 640px) { ... }

      md: "350px",
      // => @media (min-width: 768px) { ... }

      lg: "780px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "background-Color": "rgb(var(--bgc))",
        "text-Color": "rgb(var(--tc))",
        "input-color": "rgb(var(--ic))",
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(var(--gradient-deg), rgb(var(--gradient-start)), rgb(var(--gradient-end)))",
      },
    },
  },
  plugins: [],
};
