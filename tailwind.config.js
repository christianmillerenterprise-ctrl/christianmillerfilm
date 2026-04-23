/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm cream background, like aged paper
        paper: "#F1EADE",
        // Bright lift — highlights, nav wash, ivory bloom
        ivory: "#FDFCF8",
        // Slightly lifted cream — section bands on the home page
        wash: "#FAF7F0",
        // Deeper warm tan with a gold undertone
        depth: "#E6DCC8",
        // Warm near-black, never pure black
        ink: "#2A231D",
        // Muted warm gray for secondary text
        muted: "#6E6558",
        // Rust accent, pulled from the coral / clay palette in the photos
        rust: "#8C3F2E",
        // Antique gold — rules, borders, hovers (use at low opacity)
        gold: "#B89A6A",
        "gold-light": "#E8DCC4",
        // Subtle border / hairline color
        hairline: "#D4C9B6",
      },
      fontFamily: {
        // Thin editorial serif for display / headlines
        display: ['"Cormorant Garamond"', "Garamond", "Georgia", "serif"],
        // Readable body serif
        serif: ['"EB Garamond"', "Garamond", "Georgia", "serif"],
        // Letter-spaced caps for small labels
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      maxWidth: {
        prose2: "68ch",
      },
    },
  },
  plugins: [],
};
