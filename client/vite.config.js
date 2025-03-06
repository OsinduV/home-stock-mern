import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true, // Ensures proper proxy behavior
        secure: false, // Disable SSL verification (useful for development)
      },
    },
  },
  plugins: [react()],
});
