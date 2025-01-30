// using this for testing purposes lol
import iife from "rollup-plugin-iife";
import twine from "./index.js";

export default {
  input: "src/main.js",
  plugins: [
    iife(),
    twine({
      name: "Format name",
      version: "0.0.0",
      description: "Format description",
    }),
  ],
  output: {
    dir: "dist",
  },
};
