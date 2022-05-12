import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import del from 'rollup-plugin-delete'
import externalGlobals from 'rollup-plugin-external-globals'

export default {
  input: './lib/index.ts',

  output: [
    {
      file: './dist/index.js',
      format: 'umd',
      name: 'MangaBridge'
    },
    {
      file: './dist/index.esm.js',
      format: 'es'
    }
  ],

  external: ['web-streams-polyfill/ponyfill'],

  plugins: [
    commonjs(),

    typescript({
      tsconfigOverride: {
        compilerOptions: {
          target: 'es5'
        },
        include: [
          'lib/**/*'
        ]
      }
    }),

    del({
      targets: 'dist/*'
    }),

    externalGlobals({
      streamsaver: 'streamSaver',
      jsbi: 'jsbi',
      'web-streams-polyfill/ponyfill': 'ponyfill'
    })
  ]
}
