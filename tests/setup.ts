const envs = {
	DEV: true,
	PROD: false,
	TEST: false, // Avoid for testing self
};

Object.entries(envs).forEach(([name, bool]) => {
	// @ts-expect-error Allow setting to global
	global[`__${name}__`] = bool;
});

if (!global.setImmediate) {
	// @ts-expect-error Missing from Jest
	global.setImmediate = (cb: Function) => setTimeout(cb, 0);
}

export {};
