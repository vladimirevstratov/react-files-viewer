import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import typescript from 'rollup-plugin-typescript2'
import image from '@rollup/plugin-image'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    image(),
    url(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs()
  ]
}
