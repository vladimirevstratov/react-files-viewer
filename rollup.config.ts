import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import external from 'rollup-plugin-peer-deps-external'

import postcss from 'rollup-plugin-postcss'
import url from 'rollup-plugin-url'
import image from '@rollup/plugin-image'
import babel from 'rollup-plugin-babel'

import pkg from './package.json'

export default {
  input: pkg.source,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'index',
      sourcemap: true,
      globals: {
        react: 'React',
        'pdfjs-dist/build/pdf': 'pdfjslib',
        'pdfjs-dist/web/pdf_viewer': 'pdfjsViewer',
        'react-horizontal-scrolling-menu': 'ScrollMenu'
      }
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    postcss({
      modules: true
    }),
    image(),
    url(),

    external(),

    babel({
      exclude: 'node_modules/**'
    }),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.json' }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Resolve source maps to the original source
    sourceMaps()
  ]
}
