const {updateTestStatus} = require("../../collections/tests");
const {createNextId} = require("../../collections/tests");
const {deleteTest} = require("../../collections/tests");
const {updateTest} = require("../../collections/tests");
const {addTest} = require("../../collections/tests");
const {getTests} = require("../../collections/tests");
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
	return test.name.replace(/ /g, "-").replace(/\(/g, "").replace(/\)/g, "").toLowerCase() + "-" + test.id;
};

const testsRouter = () => {
	const router = Router();
	
	router.get("/:id", (req, res) => {
		try {
			const id = parseInt(req.params.id);
			const test = getTests().find(test => test.id === id);
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
	
	router.post("/", (req, res) => {
		try {
			const test = req.body;
			test.id = createNextId();
			test.testKey = createTestKey(test);
			addTest(test);
			res.status(200).send({id: test.id}).end();
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.put("/", (req, res) => {
		try {
			const test = req.body;
			updateTest(test);
			res.status(200).send({id: test.id}).end();
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.put("/status", (req, res) => {
		try {
			const status = req.body;
			updateTestStatus(status);
			res.status(204).send().end();
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.delete("/:id", (req, res) => {
		try {
			const id = parseInt(req.params.id);
			deleteTest(id);
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
