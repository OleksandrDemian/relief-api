const {invalidateTests} = require("../../collections/tests");
const {Router} = require("express");

function Invalidator () {
	this.type = null;
	this.value = null;
}

function InvalidationMeta(){
	this.environmentId = null;
	this.projectId = null;
	this.timestamp = null;
}

function InvalidationResult () {
	this.meta = null;// InvalidationMeta
	this.invalidators = null;// array of Invalidator
}

const invalidationRouter = () => {
	const router = Router();
	
	router.post("/", async (req, res) => {
		try {
			const invalidationResult = req.body;// InvalidationResult
			const testKeys = invalidationResult.invalidators.map(invalidation => invalidation.value);
			await invalidateTests({
				projectId: invalidationResult.meta.projectId,
				testKeysArr: testKeys,
				environmentId: invalidationResult.meta.environmentId,
				timestamp: invalidationResult.meta.timestamp
			});
			res.status(204).end();
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	return router;
};

module.exports = {
	invalidationRouter
}
