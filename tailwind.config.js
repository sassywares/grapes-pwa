/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "2xs": "4px",
        xs: "8px",
        sm: "12px",
        base: "16px",
        md: "20px",
        lg: "24px",
        xl: "28px",
        "2xl": "32px",
        "3xl": "36px",
        "4xl": "40px",
      },
      colors: {
        primary: {
          DEFAULT: "#3880ff",
          contrast: "#ffffff",
          shade: "#3171e0",
          tint: "#4c8dff",
        },
        secondary: {
          DEFAULT: "#3dc2ff",
          contrast: "#ffffff",
          shade: "#36abe0",
          tint: "#50c8ff",
        },
        tertiary: {
          DEFAULT: "#5260ff",
          contrast: "#ffffff",
          shade: "#4854e0",
          tint: "#6370ff",
        },
        success: {
          DEFAULT: "#2dd36f",
          contrast: "#ffffff",
          shade: "#28ba62",
          tint: "#42d77d",
        },
        warning: {
          DEFAULT: "#ffc409",
          contrast: "#000000",
          shade: "#e0ac08",
          tint: "#ffca22",
        },
        danger: {
          DEFAULT: "#eb445a",
          contrast: "#ffffff",
          shade: "#cf3c4f",
          tint: "#ed576b",
        },
        dark: {
          DEFAULT: "#222428",
          contrast: "#ffffff",
          shade: "#1e2023",
          tint: "#383a3e",
        },
        medium: {
          DEFAULT: "#92949c",
          contrast: "#ffffff",
          shade: "#808289",
          tint: "#9d9fa6",
        },
        light: {
          DEFAULT: "#f4f5f8",
          contrast: "#000000",
          shade: "#d7d8da",
          tint: "#f5f6f9",
        },
      },
    },
  },
  plugins: [],
};
