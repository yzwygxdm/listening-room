import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/listening-room/" : "/",
  plugins: [react(), tailwindcss()],
  server: { host: "127.0.0.1", port: 5178, strictPort: true },
  preview: { host: "127.0.0.1", port: 5178, strictPort: true },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
