import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/hw-3/",
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      "@components": path.join(__dirname, "src/components"),
      "@api": path.join(__dirname, "src/api"),
      "@types": path.join(__dirname, "src/types"),
      "@pages": path.join(__dirname, "src/pages"),
      "@styles": path.join(__dirname, "src/styles"),
      "@constants": path.join(__dirname, "src/constants"),
      "@variables": path.join(__dirname, "src/styles/variables"),
      "@routes": path.join(__dirname, "src/utils/routes"),
      "@stores": path.join(__dirname, "src/stores"),
      "@hooks": path.join(__dirname, "src/hooks"),
      "@utils": path.join(__dirname, "src/utils"),
      "@apiHandlers": path.join(__dirname, "src/api/handlers"),
      "@apiTypes": path.join(__dirname, "src/api/types"),
    },
  },
});
