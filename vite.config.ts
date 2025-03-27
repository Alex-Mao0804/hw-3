import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; 

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), 
      "@components": path.resolve(__dirname, "src/App/components"), 
      "@api": path.resolve(__dirname, "src/App/api"),
      "@utils": path.resolve(__dirname, "src/App/utils"),
      "@types": path.resolve(__dirname, "src/App/types"),
      "@hooks": path.resolve(__dirname, "src/App/hooks"),
      "@pages": path.resolve(__dirname, "src/App/pages"),
      "@store": path.resolve(__dirname, "src/App/store"),
      "@styles": path.resolve(__dirname, "src/App/styles"),
      "@assets": path.resolve(__dirname, "src/App/assets"),
      "@constants": path.resolve(__dirname, "src/App/constants"),
      "@variables": path.resolve(__dirname, "./src/App/styles/variables.scss"),
      "@routes": path.resolve(__dirname, "./src/utils/routes.ts"),
    },
  },
});
