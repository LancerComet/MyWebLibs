import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: './lib/index.ts',

  output: [
    {
      file: './dist/index.js',
      format: 'cjs'
    },
    {
      file: './dist/index.module.js',
      format: 'esm'
    }
  ],

  plugins: [
    commonjs(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          target: 'es5'
        },
        include: ['lib/**/*']
      }
    })
  ],

  external: [
    '@lancercomet/suntori'
  ]
}
