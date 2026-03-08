import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwindcss from "@tailwindcss/vite";


export default defineConfig({

  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,        // ✅ FORCE PORT
    strictPort: true,  // ✅ DO NOT AUTO-INCREMENT
    proxy: {
  "/api": {
    target: "http://127.0.0.1:4000",
    changeOrigin: true,
    secure: false
  }
}
  },

});
