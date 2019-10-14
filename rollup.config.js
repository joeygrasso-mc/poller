import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import pkg from './package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'index.js',
		output: {
			name: 'fetchAndPoll',
			file: pkg.browser,
			format: 'umd'
		},
		plugins: [
			json(), // because it was erroring
			resolve(), // so Rollup can find deps
      commonjs(), // so Rollup can convert deps and lib to es
      globals(), // so that all node globals and builtins are available (to axios i think)
      builtins()
		]
	},

	// CommonJS (for Node) and ES module (for bundlers) build.
	// (We could have three entries in the configuration array
	// instead of two, but it's quicker to generate multiple
	// builds from a single configuration where possible, using
	// an array for the `output` option, where we can specify 
	// `file` and `format` for each target)
	{
		input: 'index.js',
		external: ['axios'],
		output: [
			{ file: pkg.main, format: 'cjs' },
			{ file: pkg.module, format: 'es' }
		]
	}
];