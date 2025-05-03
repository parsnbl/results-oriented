// rollup.config.mjs
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    output: [
			{
				file: 'dist/base.js',
      	format: 'cjs',
				sourcemap: true,
			},
			{
				file: 'dist/base.mjs',
				format: 'es',
				sourcemap: true,
			}],
    plugins: [typescript()],
  },
	{
		input: 'src/safe.ts',
		output: [
			{
				file: 'dist/safe.js',
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: 'dist/safe.mjs',
				format: 'es',
				sourcemap: true,
			}],
		plugins: [typescript()],
	},
  {
    input: 'dist/types/index.d.ts',
		output: [
			{ file: 'dist/index.d.ts', format: 'es' },
		],
		plugins: [dts()],
  },
];
