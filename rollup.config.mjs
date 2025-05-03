// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.main.json',
      }),
    ],
  },
  {
    input: 'src/safe/index.ts',
    output: [
      {
        file: 'dist/safe/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/safe/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        tsconfig: './tsconfig.safe.json',
      }),
    ],
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: 'dist/safe/types/safe/index.d.ts',
    output: [{ file: 'dist/safe/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
