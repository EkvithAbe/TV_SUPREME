/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        supreme: {
          dark: "#132022",
          deep: "#1D2C2F",
          primary: "#8F7658",
          mid: "#5F665F",
          pink: "#BC4127",
          light: "#F6F1E8",
          vivid: "#C13D2A",
          bright: "#F26A3D",
          ink: "#101820",
          gold: "#C89B3C",
          paper: "#FBF7EF",
          sand: "#DACBB7",
          pine: "#23332F",
          mist: "#FFFDF8"
        }
      },
      fontFamily: {
        heading: ['var(--font-heading)', "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"]
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "fade-up": "fadeUp 0.5s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "live-pulse": "livePulse 1.8s ease-in-out infinite",
        "bar-fill": "barFill 0.8s ease-out forwards",
        "slide-in-up": "slideInUp 0.3s ease-out forwards"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        livePulse: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(1.4)" }
        },
        barFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--bar-width)" }
        },
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      boxShadow: {
        card: "0 18px 50px rgba(16, 24, 32, 0.08)",
        "card-hover": "0 28px 70px rgba(16, 24, 32, 0.14)",
        nav: "0 16px 36px rgba(16, 24, 32, 0.08)"
      }
    }
  },
  plugins: []
};
