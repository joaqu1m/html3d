/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark-blue": "#123259",
        "primary-blue": "#275B9A",
        "primary-light-blue": "#79B5FF",
        "primary-gray": "#313131",
        "primary-black": "#242424",
        "primary-white": "#F2F2F2",
        "secondary-gray": "#393939",
        "3d-gradient-start": "#767676",
        "3d-gradient-end": "#515151",
        "x-axis": "#ED1C24",
        "y-axis": "#22B14C",
        "z-axis": "#3C43C2",
      },
    },
  },
  plugins: [],
}
