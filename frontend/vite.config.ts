import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// .env 파일 읽기
dotenv.config({ path: `.env` });

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
        target: process.env.VITE_WS_URL,
        changeOrigin: true,
        ws: true, // 웹소켓 프록시 활성화
      },
      "/api": {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
      },
      "/uploads": process.env.VITE_API_URL || "http://localhost:8080",
    },
  },
  define: {
    global: "window", // Node.js global 대신 window 사용
  },
});
