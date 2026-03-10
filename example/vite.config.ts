import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [basicSsl(), react()],
  server: {
    port: 5173,
    host: true, // so you can open from phone on same WiFi
    // HTTPS via basicSsl() for Web Share API (needs secure context)
  },
});
