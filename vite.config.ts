import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      "@components": path.join(__dirname, "src/App/components"),
      "@api": path.join(__dirname, "src/App/utils/api.ts"),
      "@types": path.join(__dirname, "src/App/types"),
      "@pages": path.join(__dirname, "src/App/pages"),
      "@styles": path.join(__dirname, "src/App/styles"),
      "@constants": path.join(__dirname, "src/App/constants"),
      "@variables": path.join(__dirname, "src/App/styles/variables"),
      "@routes": path.join(__dirname, "src/App/utils/routes"),
      "@stores": path.join(__dirname, "src/App/stores"),
      "@hooks": path.join(__dirname, "src/App/hooks"),
      "@utils": path.join(__dirname, "src/App/utils"),
    },
  },
});
