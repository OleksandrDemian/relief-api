const {addEnvironment} = require("../../collections/projects");
const {Router} = require("express");

function Environment () {
	this.id = null;
	this.name = null;
	this.projectId = null;//only in input
	this.description = null;
}

const environmentRouter = () => {
	const router = Router();
	
	router.post("/", async (req, res) => {
		try {
			const environment = req.body;
			const id = await addEnvironment(environment);
			res.status(200).send({id}).end();
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	return router;
};

module.exports = {
	environmentRouter
}
