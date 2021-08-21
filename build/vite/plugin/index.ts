import type {PluginOption} from "vite";
import {configMockPlugin} from "./mock";

export function createVitePlugins(isBuild:boolean):PluginOption[]{
  const vitePlugins:PluginOption[] = []

  !isBuild && vitePlugins.push(configMockPlugin(isBuild));

  return vitePlugins
}
