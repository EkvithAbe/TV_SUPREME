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
          dark: "#24133f",
          deep: "#34205d",
          primary: "#5D2AB9",
          mid: "#6f677d",
          pink: "#EF2B91",
          light: "#F7F3FC",
          vivid: "#5D2AB9",
          bright: "#EF2B91",
          ink: "#211833",
          gold: "#F5B91A",
          paper: "#FCFBFE",
          sand: "#E9E1F2",
          pine: "#3F216F",
          mist: "#FBF9FE"
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
        card: "0 14px 34px rgba(33, 24, 51, 0.08)",
        "card-hover": "0 20px 44px rgba(33, 24, 51, 0.13)",
        nav: "0 8px 24px rgba(33, 24, 51, 0.08)"
      }
    }
  },
  plugins: []
};
