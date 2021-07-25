const registerShutdown = (fn) => {
	let run = false;

	const wrapper = () => {
		// prevent the same callback from being called multiple times
		if (!run) {
			run = true;
			fn();
		}
	};

	process.on('SIGINT', wrapper);
	process.on('SIGTERM', wrapper);
	process.on('exit', wrapper);
};

module.exports = registerShutdown;
