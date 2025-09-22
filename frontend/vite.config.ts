import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_API_URL || "http://localhost:8080",
        changeOrigin: true,
      },
      "/ws-chat": {
        target: process.env.VITE_API_URL || "http://localhost:8080",
        changeOrigin: true,
        ws: true,
      },
      "/uploads": process.env.VITE_API_URL || "http://localhost:8080",
    },
  },
  define: { global: "window" },
});
