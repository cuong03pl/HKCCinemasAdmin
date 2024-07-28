/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        btnPrimary: "#0d6efd",
      },
      height: {
        header: "62px",
      },
      minHeight: {
        screenMinusHeader: "calc(100vh - 62px)",
      },
    },
  },
  plugins: [],
};
