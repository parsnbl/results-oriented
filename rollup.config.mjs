// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    output: [
			{
      	file: 'bundle.js',
      	format: 'cjs',
			},
			{
				file: 'bundle.mjs',
				format: 'es',
			}],
    plugins: [typescript()],
  },
  {
    input: 'dist/dts/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'es' }],
		plugins: [dts()],
  },
];
