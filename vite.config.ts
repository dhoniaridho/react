import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Components from "unplugin-react-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Pages from "vite-plugin-pages";
import Inspect from "vite-plugin-inspect";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Components({
      dts: true,
      local: true,
    }),
    Inspect(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.ts$/,
        /\.md$/, // .md
      ],
      imports: ["react", "react-router", "react-i18next"],
      dirs: [
        "src/hooks",
        "src/store",
        "src/core",
        "src/components",
        "src/layouts",
        "src/config/**/**",
        "src/plugins",
      ],
      dts: "src/auto-imports.d.ts",
    }),
    Pages({
      dirs: [
        {
          dir: "src/app",
          baseRoute: "",
        },
      ],
      exclude: ["*/components/**"],
      importMode: "async",
      extensions: ["tsx"],
      onRoutesGenerated(routes) {
        return routes.map((item) => {
          return {
            ...item,
            path: item.path.replace(/\/page$/, ""),
          };
        });
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
