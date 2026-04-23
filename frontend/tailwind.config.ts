import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Kangtent brand tokens — sourced from CSS HSL channels in globals.css */
        ink: "hsl(var(--ink-hsl) / <alpha-value>)",
        forest: {
          600: "hsl(var(--forest-600-hsl) / <alpha-value>)",
          700: "hsl(var(--forest-700-hsl) / <alpha-value>)",
          800: "hsl(var(--forest-800-hsl) / <alpha-value>)",
          900: "hsl(var(--forest-900-hsl) / <alpha-value>)",
        },
        sage: {
          300: "hsl(var(--sage-300-hsl) / <alpha-value>)",
          500: "hsl(var(--sage-500-hsl) / <alpha-value>)",
        },
        moss: {
          200: "hsl(var(--moss-200-hsl) / <alpha-value>)",
        },
        cream: {
          50: "hsl(var(--cream-50-hsl) / <alpha-value>)",
          100: "hsl(var(--cream-100-hsl) / <alpha-value>)",
        },
        paper: "hsl(var(--paper-hsl) / <alpha-value>)",
        ember: {
          DEFAULT: "hsl(var(--ember-hsl) / <alpha-value>)",
          dark: "hsl(var(--ember-dark-hsl) / <alpha-value>)",
        },
        clay: "hsl(var(--clay-hsl) / <alpha-value>)",
        mist: "hsl(var(--mist-hsl) / <alpha-value>)",
        /* Border tokens */
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        /* shadcn/ui semantic tokens */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ['"Bai Jamjuree"', "system-ui", "sans-serif"],
        serif: ['"Bai Jamjuree"', "Georgia", "serif"],
        thai: ['"Bai Jamjuree"', "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(27,38,32,.04), 0 8px 24px rgba(27,38,32,.06)",
        card: "0 2px 4px rgba(27,38,32,.05), 0 16px 40px rgba(27,38,32,.10)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "18px",
        "3xl": "22px",
        "4xl": "28px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};

export default config;
