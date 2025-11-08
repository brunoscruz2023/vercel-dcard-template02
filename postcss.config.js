module.exports = {
  plugins: {
    tailwindcss: {
      content: [
        "./index.html",
        "./data.json"
      ],
      theme: {
        darkMode: "class",
        extend: {
          colors: {
            "primary": "#001f3f",
            "background-light": "#F5F5F5",
            "background-dark": "#101010",
          },
          fontFamily: {
            "display": ["Manrope", "sans-serif"]
          },
          borderRadius: {
            "DEFAULT": "0.25rem",
            "lg": "0.5rem",
            "xl": "0.75rem",
            "full": "9999px"
          },
        },
      },
    },
    autoprefixer: {},
  }
}