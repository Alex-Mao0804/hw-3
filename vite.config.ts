import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/App/components"),
      "@api": path.resolve(__dirname, "src/App/utils/api.ts"),
      "@types": path.resolve(__dirname, "src/App/types"),
      "@pages": path.resolve(__dirname, "src/App/pages"),
      "@styles": path.resolve(__dirname, "src/App/styles"),
      "@constants": path.resolve(__dirname, "src/App/constants"),
      "@variables": path.resolve(__dirname, "/src/App/styles/variables"),
      "@routes": path.resolve(__dirname, "src/App/utils/routes"),
      "@stores": path.resolve(__dirname, "src/App/stores"),
      "@hooks": path.resolve(__dirname, "src/App/hooks"),
      "@utils": path.resolve(__dirname, "src/App/utils"),
    },
  },
});
