import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@lib": path.resolve(import.meta.dirname, "./lib"),
      "@models": path.resolve(import.meta.dirname, "./models"),
      "@hooks": path.resolve(import.meta.dirname, "./hooks"),
      "@components": path.resolve(import.meta.dirname, "./components"),
      "@styles": path.resolve(import.meta.dirname, "./styles"),
    },
  },
  test: {
    environment: "node",
    include: ["**/*.{test,spec}.{js,jsx}"],
  },
});
