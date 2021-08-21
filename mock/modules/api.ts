import type { MockMethod } from "vite-plugin-mock";
import fieldsData from "./fields.json";
import data from './data.json'

export default [
  {
    url: "/fields",
    timeout: 0,
    method: "get",
    response: () => {
      return fieldsData;
    },
  },
  {
    url: "/reports",
    timeout: 1000,
    method: "get",
    response: (request) => {
      return data;
    },
  },
] as MockMethod[];
