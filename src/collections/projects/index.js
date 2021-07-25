const {ObjectId} = require("mongodb");
const {addListener} = require("../../database");

let collection = null;

addListener(({db}) => {
	collection = db.collection("projects");
});

const getProjectById = async (id) => await collection.findOne({
	_id: new ObjectId(id)
});

const getProjects = async () => await collection.find().project({
	environments: false
}).limit(5).toArray();

const getEnvironmentsByProjectId = async (projectId) => await collection.findOne({
	_id: new ObjectId(projectId)
}, {
	environments: true,
	REMOVE: true
});

const addEnvironment = async (environment) => {
	environment._id = new ObjectId();
	const {projectId, ...env} = environment;
	await collection.updateOne({
		_id: new ObjectId(projectId)
	}, {
		$push: {
			environments: env
		}
	});
	return environment._id;
};

module.exports = {
	getProjectById,
	getProjects,
	getEnvironmentsByProjectId,
	addEnvironment
}
