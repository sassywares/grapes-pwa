import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sassywares.grape",
  appName: "Grape!",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
