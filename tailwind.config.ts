import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
      },
    },
    extend: {
      colors: {
        coffee: {
          50: "#FFF8F0",
          100: "#F5E6D3",
          200: "#E8C9A0",
          300: "#D4A574",
          400: "#B8864E",
          500: "#8B4513",
          600: "#6B3410",
          700: "#4A2409",
          800: "#2C1810",
          900: "#1A0E08",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      spacing: {
        section: "6rem",
        "section-mobile": "3rem",
      },
      borderRadius: {
        card: "1rem",
      },
      boxShadow: {
        card: "0 4px 20px rgba(44, 24, 16, 0.08)",
        "card-hover": "0 8px 30px rgba(44, 24, 16, 0.15)",
      },
      backgroundImage: {
        "gradient-warm":
          "linear-gradient(135deg, #2C1810 0%, #4A2409 50%, #6B3410 100%)",
        "gradient-cream": "linear-gradient(180deg, #FFF8F0 0%, #F5E6D3 100%)",
      },
    },
  },
  plugins: [],
};

export default config;

