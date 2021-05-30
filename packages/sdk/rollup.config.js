import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import url from "@rollup/plugin-url";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";
import json from "@rollup/plugin-json";
import nodePolyfills from "rollup-plugin-node-polyfills";
import builtins from "rollup-plugin-node-builtins";

const globals = {
  wowIO: "wowIO",
};
const extensions = [".js", ".jsx", ".ts", ".tsx"];
const external = [];

const formats = [`iife`, "es"];

export default formats.map((format) => ({
  input: "./src/index.ts",
  output: {
    format,
    file: `dist/index.${format}.js`,
    exports: "auto",
    sourcemap: false,
    globals,
    name: "wowi",
    preserveModules: format === "cjs",
    extend: true,
  },
  context: "window",
  external,
  plugins: [
    builtins(),
    uglify(),
    replace({
      preventAssignment: true,
    }),
    resolve({ extensions, browser: true }),
    commonjs(),
    typescript({
      tsconfig: "tsconfig.json",
      clean: true,
    }),
    babel({
      babelrc: true,
      babelHelpers: "bundled", // default value
      exclude: "node_modules/**",
    }),
    terser(),
    peerDepsExternal(),
    url({
      include: ["**/*.woff", "**/*.woff2"],
    }),
    json(),
    nodePolyfills(),
  ],
}));
