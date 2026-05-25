import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    base: "/amazon-drive-hub/", // <-- Adicione este bloco com o nome exato do repositório
  }
});
