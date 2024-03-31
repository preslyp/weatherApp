import { defineConfig } from "cypress";
import vitePreprocessor from "cypress-vite";

export default defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 25000,
  pageLoadTimeout: 25000,
  trashAssetsBeforeRuns: true,
  viewportWidth: 1600,
  viewportHeight: 1024,
  e2e: {
    setupNodeEvents(on) {
      on("file:preprocessor", vitePreprocessor());
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
