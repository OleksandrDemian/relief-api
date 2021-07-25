const {ObjectId} = require("mongodb");
const {addListener} = require("../../database");

let collection = null;

addListener(({db}) => {
	collection = db.collection("tests");
});

const addTest = async (test) => {
	await collection.insertOne(test);
};

const updateTest = async (test) => {
	await collection.updateOne({
		_id: new ObjectId(test._id)
	}, test);
};

const deleteTest = async (id) => {
	await collection.deleteOne({
		_id: new ObjectId(id)
	});
};

const getTestById = async (id) => await collection.findOne({
	_id: new ObjectId(id)
});

const getTestsByProject = async (id) => await collection.find({
	projectId: id
}).toArray();

// todo
const invalidateTests = ({projectId, testKeysArr, environmentId, timestamp}) => {
// 	const tests = store.get().filter(test => test.projectId === projectId && testKeysArr.includes(test.testKey));
// 	for (const test of tests) {
// 		if(test.environments == null) test.environments = {};
//
// 		if (test.environments[environmentId]) {
// 			test.environments[environmentId].history.push({
// 				timestamp: timestamp,
// 				status: "pending"
// 			});
// 			test.environments[environmentId].status = "pending";
// 		} else {
// 			test.environments[environmentId] = {
// 				status: status,
// 				history: [
// 					{
// 						timestamp: timestamp,
// 						status: "pending"
// 					}
// 				]
// 			};
// 		}
// 	}
//
// 	store.commit();
}

const updateTestStatus = async ({testId, envId, status}) => {
	const id = new ObjectId(testId)
	await collection.updateOne({
			_id: id
		},
		{
			$set: {
				[`environments.${envId}.status`]: status
			},
			$push: {
				[`environments.${envId}.history`]: {
					timestamp: Date.now(),
					status
				}
			}
		}
	);
};

module.exports = {
	addTest,
	getTestById,
	getTestsByProject,
	updateTest,
	deleteTest,
	invalidateTests,
	updateTestStatus
}
