/* eslint-disable sort-keys */

module.exports = {
	docs: [
		'index',
		'install',
		'setup',
		'features',
		'config',
		'esm',
		{
			type: 'category',
			label: 'Commands',
			collapsed: false,
			items: ['build', 'clean', 'files', 'init', 'pack', 'scaffold', 'validate', 'watch'],
		},
		'advanced',
		{
			type: 'link',
			label: 'Changelog',
			href: 'https://github.com/milesj/packemon/releases',
			// href: 'https://github.com/milesj/packemon/blob/master/CHANGELOG.md',
		},
	],
};
