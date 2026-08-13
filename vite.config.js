import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const GOOGLE_SCRIPT_ID =
  "AKfycbwgP1EFNB2KmKkT08ryLEfV473nyKLJgj1y5ciHpoMk5r-O6pGT7ek4qgtdjGfG3D5sCw";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api/exec": {
        target:
          "https://script.google.com",

        changeOrigin: true,

        secure: true,

        rewrite: () =>
          `/macros/s/${GOOGLE_SCRIPT_ID}/exec`,
      },
    },
  },
});