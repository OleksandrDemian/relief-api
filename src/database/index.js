const {MongoClient} = require("mongodb");
const registerShutdown = require("../utils/registerShutdown");

const uri = "mongodb+srv://relief-test-user:relief-test-password@cluster0.stusi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/?readPreference=primary&ssl=false";

const state = {
	client: new MongoClient(uri),
	db: null,
	listeners: [],
}

const start = async () => {
	try {
		// Connect the client to the server
		await state.client.connect();
		state.db = state.client.db("relief-api");
		console.log("Database connection done!");

		for (const item of state.listeners) {
			item(state);
		}

		// cleanup listeners. All new listeners will be called automatically
		state.listeners = null;

		console.log("Listeners called");
	} catch (e) {
		console.error(e);
	} finally {
		// Ensures that the client will close when you finish/error
		registerShutdown(() => {
			console.log("Removing connection");
			state.client.close();
			console.log("Connection removed");
		});
	}
};

const addListener = (listener) => {
	if(state.listeners) {
		state.listeners.push(listener);
	} else {
		listener(state);
	}
};

module.exports = {
	start,
	addListener
}
