import path from 'path'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import babel from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import alias from '@rollup/plugin-alias'
import postcss from 'rollup-plugin-postcss'
import json from '@rollup/plugin-json'
import svgr from '@svgr/rollup'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/bundle.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({ extensions: ['.js'] }),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    babel({ presets: ['@babel/preset-react'] }),
    commonjs(),
    (process.env.NODE_ENV !== 'production' && serve({
      open: true,
      verbose: true,
      contentBase: ['', 'public'],
      historyApiFallback: true,
      host: 'localhost',
      port: 3000
    })),
    (process.env.NODE_ENV !== 'production' && livereload({ watch: 'build' })),
    alias({
      entries: [
        { find: 'icons', replacement: path.join(__dirname, 'src/icons') },
        { find: 'pages', replacement: path.join(__dirname, 'src/pages') },
        { find: 'components', replacement: path.join(__dirname, 'src/components') }
      ]
    }),
    postcss({
      modules: true,
      plugins: []
    }),
    svgr(),
    json()
  ]
}
