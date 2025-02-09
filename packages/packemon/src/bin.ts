import debug from 'debug';
import { checkPackageOutdated, Program } from '@boost/cli';
import { getVersion } from './helpers/getVersion';
import {
	BuildCommand,
	BuildWorkspaceCommand,
	CleanCommand,
	FilesCommand,
	InitCommand,
	PackCommand,
	PackWorkspaceCommand,
	ScaffoldCommand,
	ValidateCommand,
	WatchCommand,
} from '.';

let version = '0.0.0-internal';

try {
	version = getVersion();
} catch {
	// Ignore
}

if (process.argv.includes('--debug')) {
	debug.enable('packemon:*');
}

async function run() {
	const program = new Program({
		bin: 'packemon',
		footer: 'Documentation: https://packemon.dev',
		name: 'Packemon',
		version,
	});

	program
		.categories({
			filter: 'Filtering',
		})
		.register(new BuildCommand())
		.register(new BuildWorkspaceCommand())
		.register(new CleanCommand())
		.register(new FilesCommand())
		.register(new InitCommand())
		.register(new PackCommand())
		.register(new PackWorkspaceCommand())
		.register(new ScaffoldCommand())
		.register(new ValidateCommand())
		.register(new WatchCommand());

	if (!process.env.CI && !process.argv.includes('--quiet')) {
		program.middleware(checkPackageOutdated('packemon', version));
	}

	await program.runAndExit(process.argv);
}

// We need to be using modules first!
// eslint-disable-next-line unicorn/prefer-top-level-await
void run();
