const fs = require("fs");
const path = require("path");

const createStorage = (name, def) => {
	const filePath = path.resolve(path.join("./.storage", `${name}.json`));
	let storage = {
		data: [],
		meta: {
			nextId: 0
		}
	}
	
	if(fs.existsSync(filePath)) {
		storage = JSON.parse(fs.readFileSync(filePath, "utf8"));
	} else {
		storage.data = def;
	}
	
	const update = (updater) => {
		storage.data = updater(storage.data);
	};
	
	const commit = () => {
		console.log("Commit");
		fs.writeFileSync(filePath, JSON.stringify(storage));
	};
	
	const get = () => storage.data;
	
	const createNextId = () => {
		storage.meta.nextId++;
		commit();
		return storage.meta.nextId;
	};
	
	return {
		update,
		commit,
		get,
		createNextId
	}
};

module.exports = {
	createStorage
}
