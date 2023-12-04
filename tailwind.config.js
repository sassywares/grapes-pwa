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
          DEFAULT: "var(--ion-color-primary)",
          contrast: "var(--ion-color-primary-contrast)",
          shade: "var(--ion-color-primary-shade)",
          tint: "var(--ion-color-primary-tint)",
        },
        secondary: {
          DEFAULT: "var(--ion-color-secondary)",
          contrast: "var(--ion-color-secondary-contrast)",
          shade: "var(--ion-color-secondary-shade)",
          tint: "var(--ion-color-secondary-tint)",
        },
        tertiary: {
          DEFAULT: "var(--ion-color-tertiary)",
          contrast: "var(--ion-color-tertiary-contrast)",
          shade: "var(--ion-color-tertiary-shade)",
          tint: "var(--ion-color-tertiary-tint)",
        },
        success: {
          DEFAULT: "var(--ion-color-success)",
          contrast: "var(--ion-color-success-contrast)",
          shade: "var(--ion-color-success-shade)",
          tint: "var(--ion-color-success-tint)",
        },
        warning: {
          DEFAULT: "var(--ion-color-warning)",
          contrast: "var(--ion-color-warning-contrast)",
          shade: "var(--ion-color-warning-shade)",
          tint: "var(--ion-color-warning-tint)",
        },
        danger: {
          DEFAULT: "var(--ion-color-danger)",
          contrast: "var(--ion-color-danger-contrast)",
          shade: "var(--ion-color-danger-shade)",
          tint: "var(--ion-color-danger-tint)",
        },
        dark: {
          DEFAULT: "var(--ion-color-dark)",
          contrast: "var(--ion-color-dark-contrast)",
          shade: "var(--ion-color-dark-shade)",
          tint: "var(--ion-color-dark-tint)",
        },
        medium: {
          DEFAULT: "var(--ion-color-medium)",
          contrast: "var(--ion-color-medium-contrast)",
          shade: "var(--ion-color-medium-shade)",
          tint: "var(--ion-color-medium-tint)",
        },
        light: {
          DEFAULT: "var(--ion-color-light)",
          contrast: "var(--ion-color-light-contrast)",
          shade: "var(--ion-color-light-shade)",
          tint: "var(--ion-color-light-tint)",
        },
      },
    },
  },
  plugins: [],
};
