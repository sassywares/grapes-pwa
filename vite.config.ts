import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), legacy()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      "@cypress": path.join(__dirname, "cypress"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
