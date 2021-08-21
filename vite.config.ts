import type { UserConfig, ConfigEnv, loadEnv } from "vite";
import { resolve } from "path";
import {createVitePlugins} from "./build/vite/plugin";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === "build";
  return {
    base: "/",
    root: process.cwd(),
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve("src") + "/",
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve("types") + "/",
        },
        // /@P/xxxx => src/@packages/xxx
        {
          find: /\/@P\//,
          replacement: pathResolve("src") + "/@packages/",
        },
      ],
    },
    server: {
      host: true,
      port: 8080,
    },
    build: {
      target: "es2015",
      outDir: "./dist",
      terserOptions: {
        compress: {
          keep_infinity: true,
          //  是否删除console信息
          drop_console: false,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      lib:{
        entry:pathResolve("src") + "/main.ts",
        name:"PivotGridPlus",
        fileName: (format) => `pivot-grid-plus.${format}.js`
      }
    },
    plugins:createVitePlugins(isBuild)
  };
};
