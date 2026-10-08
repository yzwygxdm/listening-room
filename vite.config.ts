import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";

function offlineShell(): Plugin {
  return {
    name: "listening-room-offline-shell",
    apply: "build",
    async closeBundle() {
      const output = fileURLToPath(new URL("./dist/", import.meta.url));
      async function listFiles(folder: string): Promise<string[]> {
        const entries = await readdir(folder, { withFileTypes: true });
        const nested = await Promise.all(entries.map(async (entry) => {
          const path = join(folder, entry.name);
          return entry.isDirectory() ? listFiles(path) : [relative(output, path).replaceAll("\\", "/")];
        }));
        return nested.flat();
      }
      const files = (await listFiles(output)).filter((file) => file !== "sw.js").sort();
      const version = createHash("sha256")
        .update(await readFile(join(output, "index.html")))
        .digest("hex").slice(0, 12);
      const script = `/* Generated from this build's public app shell; no user files or online audio. */
const CACHE_NAME = "listening-room-shell-${version}";
const CACHE_PREFIX = "listening-room-shell-";
const SHELL_PATHS = ${JSON.stringify(["./", ...files])};
const SHELL_URLS = SHELL_PATHS.map((path) => new URL(path, self.registration.scope).href);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME)
    .then((cache) => cache.addAll(SHELL_URLS))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(Promise.all([
    caches.keys().then((keys) => Promise.all(keys
      .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map((key) => caches.delete(key)))),
    self.clients.claim(),
  ]));
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(async () =>
      (await caches.match(new URL("./", self.registration.scope).href)) || Response.error()));
    return;
  }
  if (SHELL_URLS.includes(url.href)) {
    event.respondWith(caches.match(request).then((cached) => cached || fetch(request)));
  }
});
`;
      await writeFile(join(output, "sw.js"), script);
    },
  };
}

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/listening-room/" : "/",
  plugins: [react(), tailwindcss(), offlineShell()],
  server: { host: "127.0.0.1", port: 5178, strictPort: true },
  preview: { host: "127.0.0.1", port: 5178, strictPort: true },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
