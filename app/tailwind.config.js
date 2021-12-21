module.exports = {
  mode: "jit",
  content: ["./app/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    fontFamily: {
      'serif': ['Proza\\ Libre', 'ui-serif']
    },
    extend: {
      typography: (theme) => {
        return {
          DEFAULT: {
            css: [
              {
                figcaption: {
                  fontStyle: 'italic',
                  marginTop: '-1.5em',
                  textAlign: 'center',
                }
              }
            ],
          },
        };
      },
    },
  }, // customize the theme however you want here
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
  ]
};
