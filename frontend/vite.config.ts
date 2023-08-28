import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/rustpad-api": {
        target: "http://localhost:8082",
        rewrite: (path) => path.replace(/^\/rustpad-api/, "api"),
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/core-api": {
        target: "http://localhost:8080",
        rewrite: (path) => path.replace(/^\/core-api/, "api"),
        changeOrigin: true,
        secure: false,
        ws: false,
      },
      "/openvidu": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
