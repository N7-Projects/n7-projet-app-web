import { defineConfig, searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import deno from "@deno/vite-plugin";

import "react";
import "react-dom";
import process from "process";

export default defineConfig({
  root: "./client",
  server: {
    port: 3000,
    fs: {
      allow: [
        // search up for workspace root
        searchForWorkspaceRoot(process.cwd()),
      ],
    },
  },
  plugins: [
    react(),
    deno(),
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
