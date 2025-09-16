import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/ws-chat": {
        target: "http://localhost:8080",
        changeOrigin: true,
        ws: true, // 웹소켓 프록시 활성화
      },
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/uploads": "http://localhost:8080",
    },
  },
  define: {
    global: "window", // Node.js global 대신 window 사용
  },
});
