import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api/v1/users": "http://localhost:4000",
      "/api/v1/blogs": "http://localhost:4000",
    },
  },
  plugins: [react()],
});
