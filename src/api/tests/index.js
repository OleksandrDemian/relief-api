const {updateTestStatus} = require("../../collections/tests");
const {deleteTest} = require("../../collections/tests");
const {updateTest} = require("../../collections/tests");
const {addTest} = require("../../collections/tests");
const {getTestById} = require("../../collections/tests");
const {Router} = require("express");

function TestEnvironment() {
	this.status = null;
	this.history = null;// array of objects: { timestamp }
}

function Test() {
	this.id = null;
	this.projectId = null;
	this.testKey = null;
	this.name = null;
	this.description = null;
	this.shortDescription = null;
	this.environments = {};//key = envId, value: TestEnvironment
}

const createTestKey = (test) => {
	return test.name.replace(/ /g, "-").replace(/\(/g, "").replace(/\)/g, "").toLowerCase() + "-" + test._id;
};

const testsRouter = () => {
	const router = Router();
	
	router.get("/:id", async (req, res) => {
		try {
			const id = req.params.id;
			const test = await getTestById(id);
			if (test) {
				res.status(200).send(test).end();
			} else {
				res.status(404).end();
			}
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.post("/", async (req, res) => {
		try {
			const test = req.body;
			test.testKey = createTestKey(test);
			await addTest(test);
			res.status(200).send({id: test._id}).end();
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.put("/", async (req, res) => {
		try {
			const test = req.body;
			await updateTest(test);
			res.status(200).send({id: test._id}).end();
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.put("/status", async (req, res) => {
		try {
			const status = req.body;
			await updateTestStatus(status);
			res.status(204).send().end();
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.delete("/:id", async (req, res) => {
		try {
			const id = req.params.id;
			await deleteTest(id);
			res.status(204).end();
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	return router;
};

module.exports = {
	testsRouter
}
