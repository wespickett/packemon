/* eslint-disable no-param-reassign */
import { Path } from '@boost/common';
import { Artifact } from '../../src/Artifact';
import { Package } from '../../src/Package';
import {
	getRollupConfig,
	getRollupExternals,
	getRollupOutputConfig,
} from '../../src/rollup/config';
import { getFixturePath } from '../helpers';

jest.mock('@rollup/plugin-commonjs', () => () => 'commonjs()');
jest.mock('@rollup/plugin-json', () => () => 'json()');
jest.mock('@rollup/plugin-node-resolve', () => () => 'resolve()');
jest.mock('@rollup/plugin-babel', () => ({
	getBabelInputPlugin: (options: any) => `babelInput(${options.filename})`,
	getBabelOutputPlugin: (options: any) =>
		`babelOutput(${options.filename}, ${options.moduleId || '*'})`,
}));
jest.mock('rollup-plugin-node-externals', () => ({
	externals: (options: any) => `externals(${options.packagePath})`,
}));
jest.mock('rollup-plugin-polyfill-node', () => () => `polyfillNode()`);

const fixturePath = new Path(getFixturePath('project-rollup'));
const srcInputFile = fixturePath.append('src/index.ts').path();

function createArtifact(outputName: string, inputFile: string, pkg?: Package) {
	const artifact = new Artifact(
		pkg ??
			new Package(
				fixturePath,
				{
					name: 'project',
					version: '0.0.0',
					packemon: {},
				},
				fixturePath, // TODO
			),
		[],
	);
	artifact.configGroup = 1;
	artifact.inputs = {
		[outputName]: inputFile,
	};

	return artifact;
}

const dynamicImportPlugin = expect.objectContaining({ name: 'packemon-preserve-dynamic-import' });
const binPlugin = expect.objectContaining({ name: 'packemon-add-bin-shebang' });
const generatedCode = {
	arrowFunctions: true,
	constBindings: true,
	objectShorthand: true,
	preset: 'es2015',
	symbols: false,
};

describe('getRollupConfig()', () => {
	const sharedPlugins = [
		`externals(${fixturePath.append('package.json')})`,
		'resolve()',
		'commonjs()',
		'json()',
		expect.any(Object),
		`babelInput(${fixturePath})`,
	];

	const sharedNonNodePlugins = ['polyfillNode()', ...sharedPlugins];

	let artifact: Artifact;

	beforeEach(() => {
		artifact = createArtifact('index', 'src/index.ts');
	});

	it('generates default input config for `browser` platform', async () => {
		artifact.platform = 'browser';

		await expect(getRollupConfig(artifact, {})).resolves.toEqual({
			cache: undefined,
			external: expect.any(Function),
			input: { index: srcInputFile },
			output: [],
			plugins: sharedNonNodePlugins,
			treeshake: true,
		});
	});

	it('generates default input config for `native` platform', async () => {
		artifact.platform = 'native';

		await expect(getRollupConfig(artifact, {})).resolves.toEqual({
			cache: undefined,
			external: expect.any(Function),
			input: { index: srcInputFile },
			output: [],
			plugins: sharedNonNodePlugins,
			treeshake: true,
		});
	});

	it('generates default input config for `node` platform', async () => {
		artifact.platform = 'node';

		await expect(getRollupConfig(artifact, {})).resolves.toEqual({
			cache: undefined,
			external: expect.any(Function),
			input: { index: srcInputFile },
			output: [],
			plugins: sharedPlugins,
			treeshake: true,
		});
	});

	it('generates an output config for each build', async () => {
		artifact.builds.push({ format: 'lib' }, { format: 'esm' }, { format: 'mjs' });

		await expect(getRollupConfig(artifact, {})).resolves.toEqual({
			cache: undefined,
			external: expect.any(Function),
			input: {
				index: srcInputFile,
			},
			output: [
				{
					assetFileNames: 'assets/[name].[ext]',
					banner: expect.any(String),
					chunkFileNames: 'bundle-[hash].js',
					dir: fixturePath.append('lib').path(),
					entryFileNames: '[name].js',
					exports: 'auto',
					format: 'cjs',
					generatedCode: {
						...generatedCode,
						symbols: false,
					},
					interop: 'auto',
					originalFormat: 'lib',
					paths: {},
					plugins: [dynamicImportPlugin, `babelOutput(${fixturePath}, *)`, binPlugin],
					preserveModules: false,
					sourcemap: true,
					sourcemapExcludeSources: true,
				},
				{
					assetFileNames: 'assets/[name].[ext]',
					banner: expect.any(String),
					chunkFileNames: 'bundle-[hash].js',
					dir: fixturePath.append('esm').path(),
					entryFileNames: '[name].js',
					format: 'esm',
					generatedCode: {
						...generatedCode,
						symbols: true,
					},
					interop: 'auto',
					originalFormat: 'esm',
					paths: {},
					plugins: [dynamicImportPlugin, `babelOutput(${fixturePath}, *)`, binPlugin],
					preserveModules: false,
					sourcemap: true,
					sourcemapExcludeSources: true,
				},
				{
					assetFileNames: 'assets/[name].[ext]',
					banner: expect.any(String),
					chunkFileNames: 'bundle-[hash].mjs',
					dir: fixturePath.append('mjs').path(),
					entryFileNames: '[name].mjs',
					format: 'esm',
					generatedCode: {
						...generatedCode,
						symbols: true,
					},
					interop: 'auto',
					originalFormat: 'mjs',
					paths: {},
					plugins: [dynamicImportPlugin, `babelOutput(${fixturePath}, *)`, binPlugin],
					preserveModules: false,
					sourcemap: true,
					sourcemapExcludeSources: true,
				},
			],
			plugins: sharedPlugins,
			treeshake: true,
		});
	});

	it('generates an accurate config if input/output are not "index"', async () => {
		artifact.inputs = {
			server: 'src/server/core.ts',
		};
		artifact.builds.push({ format: 'lib' });

		await expect(getRollupConfig(artifact, {})).resolves.toEqual({
			cache: undefined,
			external: expect.any(Function),
			input: {
				server: fixturePath.append('src/server/core.ts').path(),
			},
			output: [
				{
					assetFileNames: 'assets/[name].[ext]',
					banner: expect.any(String),
					chunkFileNames: 'bundle-[hash].js',
					dir: fixturePath.append('lib').path(),
					entryFileNames: '[name].js',
					exports: 'auto',
					format: 'cjs',
					generatedCode: {
						...generatedCode,
						symbols: false,
					},
					interop: 'auto',
					originalFormat: 'lib',
					paths: {},
					plugins: [dynamicImportPlugin, `babelOutput(${fixturePath}, *)`, binPlugin],
					preserveModules: false,
					sourcemap: true,
					sourcemapExcludeSources: true,
				},
			],
			plugins: sharedPlugins,
			treeshake: true,
		});
	});

	it('when not bundling, globs all source files, preserves modules, and doesnt treeshake', async () => {
		artifact.bundle = false;
		artifact.builds.push({ format: 'lib' });

		await expect(getRollupConfig(artifact, {})).resolves.toEqual({
			external: expect.any(Function),
			input: [
				'src/client/index.ts',
				'src/index.ts',
				'src/other/index.ts',
				'src/server/core.ts',
				'src/test-utils/base.ts',
			].map((f) => fixturePath.append(f).path()),
			output: [
				{
					assetFileNames: 'assets/[name].[ext]',
					chunkFileNames: '[name]-[hash].js',
					dir: fixturePath.append('lib').path(),
					entryFileNames: '[name].js',
					exports: 'auto',
					format: 'cjs',
					generatedCode: {
						...generatedCode,
						symbols: false,
					},
					interop: 'auto',
					originalFormat: 'lib',
					paths: {},
					plugins: [dynamicImportPlugin, `babelOutput(${fixturePath}, *)`, binPlugin],
					preserveModules: true,
					sourcemap: true,
					sourcemapExcludeSources: true,
				},
			],
			plugins: sharedPlugins,
			treeshake: false,
		});
	});

	it('can mutate config', async () => {
		artifact.platform = 'browser';

		await expect(
			getRollupConfig(
				artifact,
				{},
				{
					rollupInput(config) {
						config.treeshake = false;
						config.output = {
							inlineDynamicImports: true,
						};
					},
					rollupOutput(output) {
						output.strict = false; // Shouldnt show up
					},
				},
			),
		).resolves.toEqual({
			cache: undefined,
			external: expect.any(Function),
			input: { index: srcInputFile },
			output: {
				inlineDynamicImports: true,
			},
			plugins: sharedNonNodePlugins,
			treeshake: false,
		});
	});

	describe('externals', () => {
		beforeEach(() => {
			// Add self
			artifact.package.artifacts.push(artifact);
		});

		it('returns false for self', () => {
			expect(getRollupExternals(artifact)(srcInputFile)).toBe(false);
		});

		it('returns false for random files', () => {
			expect(getRollupExternals(artifact)('some/random/file.js')).toBe(false);
		});

		describe('foreign inputs (not in the same artifact config)', () => {
			it('errors for different paths', () => {
				const foreignArtifact = createArtifact('other', 'src/other/index.ts', artifact.package);
				foreignArtifact.configGroup = 10;

				artifact.package.artifacts.push(foreignArtifact);

				const parent = srcInputFile;
				const child = fixturePath.append('src/other/index.ts').path();

				try {
					getRollupExternals(artifact)(child, parent);
				} catch (error: unknown) {
					expect((error as Error).message).toContain('Unexpected foreign input import.');
				}

				expect(() => getRollupExternals(artifact)(child, srcInputFile)).toThrow(
					`Unexpected foreign input import. May only import sibling files within the same \`inputs\` configuration group. File "${parent}" attempted to import "${child}".`,
				);
			});

			it('doesnt error if paths are the same in both configs', () => {
				const foreignArtifact = createArtifact('other', 'src/index.ts', artifact.package);
				foreignArtifact.configGroup = 10;

				artifact.package.artifacts.push(foreignArtifact);

				const parent = srcInputFile;
				const child = fixturePath.append('src/index.ts').path();

				expect(() => getRollupExternals(artifact)(child, parent)).not.toThrow();
			});
		});
	});
});

describe('getRollupOutputConfig()', () => {
	let artifact: Artifact;

	beforeEach(() => {
		artifact = createArtifact('index', 'src/index.ts');
		artifact.platform = 'node';
		artifact.support = 'stable';
	});

	it('generates default output config', () => {
		expect(getRollupOutputConfig(artifact, {}, 'lib')).toEqual({
			assetFileNames: 'assets/[name].[ext]',
			banner: expect.any(String),
			chunkFileNames: 'bundle-[hash].js',
			dir: fixturePath.append('lib').path(),
			entryFileNames: '[name].js',
			exports: 'auto',
			format: 'cjs',
			generatedCode: {
				...generatedCode,
				symbols: false,
			},
			interop: 'auto',
			originalFormat: 'lib',
			paths: {},
			plugins: [dynamicImportPlugin, `babelOutput(${fixturePath}, *)`, binPlugin],
			preserveModules: false,
			sourcemap: true,
			sourcemapExcludeSources: true,
		});
	});

	it('changes output dir based on format', () => {
		artifact.platform = 'browser';
		artifact.support = 'stable';

		expect(getRollupOutputConfig(artifact, {}, 'esm').dir).toBe(fixturePath.append('esm').path());

		artifact.platform = 'node';
		artifact.support = 'stable';

		expect(getRollupOutputConfig(artifact, {}, 'mjs').dir).toBe(fixturePath.append('mjs').path());
	});

	it('can mutate config', () => {
		artifact.platform = 'browser';

		expect(
			getRollupOutputConfig(artifact, {}, 'lib', {
				rollupInput(config) {
					config.treeshake = false; // Shouldnt show up
				},
				rollupOutput(output) {
					output.sourcemap = false;
					output.generatedCode = 'es5';
				},
			}),
		).toEqual({
			assetFileNames: 'assets/[name].[ext]',
			banner: expect.any(String),
			chunkFileNames: 'bundle-[hash].js',
			dir: fixturePath.append('lib').path(),
			entryFileNames: '[name].js',
			exports: 'auto',
			format: 'cjs',
			generatedCode: 'es5',
			interop: 'auto',
			originalFormat: 'lib',
			paths: {},
			plugins: [dynamicImportPlugin, `babelOutput(${fixturePath}, *)`, binPlugin],
			preserveModules: false,
			sourcemap: false,
			sourcemapExcludeSources: true,
		});
	});

	it('passes build params to config', () => {
		const spy = jest.fn();

		getRollupOutputConfig(artifact, {}, 'lib', {
			rollupOutput: spy,
		});

		expect(spy).toHaveBeenCalledWith(expect.any(Object), {
			features: {},
			format: 'lib',
			platform: 'node',
			support: 'stable',
		});
	});

	describe('formats', () => {
		it('converts `lib` format to rollup "cjs" format', () => {
			expect(getRollupOutputConfig(artifact, {}, 'lib')).toEqual(
				expect.objectContaining({
					format: 'cjs',
					originalFormat: 'lib',
				}),
			);
		});

		it('converts `cjs` format to rollup "cjs" format', () => {
			expect(getRollupOutputConfig(artifact, {}, 'cjs')).toEqual(
				expect.objectContaining({
					format: 'cjs',
					originalFormat: 'cjs',
				}),
			);
		});

		it('converts `mjs` format to rollup "esm" format', () => {
			expect(getRollupOutputConfig(artifact, {}, 'mjs')).toEqual(
				expect.objectContaining({
					format: 'esm',
					originalFormat: 'mjs',
				}),
			);
		});

		it('converts `esm` format to rollup "esm" format', () => {
			artifact.platform = 'browser';

			expect(getRollupOutputConfig(artifact, {}, 'esm')).toEqual(
				expect.objectContaining({
					format: 'esm',
					originalFormat: 'esm',
				}),
			);
		});

		it('converts `umd` format to rollup "esm" format', () => {
			artifact.platform = 'browser';

			expect(getRollupOutputConfig(artifact, {}, 'umd')).toEqual(
				expect.objectContaining({
					format: 'esm',
					originalFormat: 'umd',
				}),
			);
		});
	});

	describe('chunks', () => {
		it('uses ".js" chunk extension for `lib` format', () => {
			expect(getRollupOutputConfig(artifact, {}, 'lib')).toEqual(
				expect.objectContaining({
					chunkFileNames: 'bundle-[hash].js',
					entryFileNames: '[name].js',
				}),
			);
		});

		it('uses ".js" chunk extension for `esm` format', () => {
			artifact.platform = 'browser';

			expect(getRollupOutputConfig(artifact, {}, 'esm')).toEqual(
				expect.objectContaining({
					chunkFileNames: 'bundle-[hash].js',
					entryFileNames: '[name].js',
				}),
			);
		});

		it('uses ".js" chunk extension for `umd` format', () => {
			artifact.platform = 'browser';

			expect(getRollupOutputConfig(artifact, {}, 'umd')).toEqual(
				expect.objectContaining({
					chunkFileNames: 'bundle-[hash].js',
					entryFileNames: '[name].js',
				}),
			);
		});

		it('uses ".cjs" chunk extension for `cjs` format', () => {
			expect(getRollupOutputConfig(artifact, {}, 'cjs')).toEqual(
				expect.objectContaining({
					chunkFileNames: 'bundle-[hash].cjs',
					entryFileNames: '[name].cjs',
				}),
			);
		});

		it('uses ".mjs" chunk extension for `mjs` format', () => {
			expect(getRollupOutputConfig(artifact, {}, 'mjs')).toEqual(
				expect.objectContaining({
					chunkFileNames: 'bundle-[hash].mjs',
					entryFileNames: '[name].mjs',
				}),
			);
		});
	});

	describe('exports', () => {
		it('enables auto-exports for `lib` format', () => {
			expect(getRollupOutputConfig(artifact, {}, 'lib').exports).toBe('auto');
		});

		it('enables auto-exports for `cjs` format', () => {
			expect(getRollupOutputConfig(artifact, {}, 'cjs').exports).toBe('auto');
		});

		it('disables auto-exports for `mjs` format', () => {
			expect(getRollupOutputConfig(artifact, {}, 'mjs').exports).toBeUndefined();
		});

		it('disables auto-exports for `esm` format', () => {
			artifact.platform = 'browser';

			expect(getRollupOutputConfig(artifact, {}, 'esm').exports).toBeUndefined();
		});

		it('disables auto-exports for `umd` format', () => {
			artifact.platform = 'browser';

			expect(getRollupOutputConfig(artifact, {}, 'umd').exports).toBeUndefined();
		});
	});

	it('passes `namespace` to Babel as UMD name', () => {
		artifact.platform = 'browser';
		artifact.support = 'experimental';
		artifact.namespace = 'FooBar';

		expect(getRollupOutputConfig(artifact, {}, 'umd')).toEqual({
			assetFileNames: 'assets/[name].[ext]',
			banner: expect.any(String),
			chunkFileNames: 'bundle-[hash].js',
			dir: fixturePath.append('umd').path(),
			entryFileNames: '[name].js',
			format: 'esm',
			generatedCode: {
				...generatedCode,
				symbols: false,
			},
			interop: 'auto',
			originalFormat: 'umd',
			paths: {},
			plugins: [dynamicImportPlugin, `babelOutput(${fixturePath}, FooBar)`, binPlugin],
			preserveModules: false,
			sourcemap: true,
			sourcemapExcludeSources: true,
		});
	});
});
