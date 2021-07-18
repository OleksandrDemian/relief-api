const {createStorage} = require("../../utils/discStorage");

const store = createStorage("tests", []);

const addTest = (test) => {
	store.update((data) => [...data, test]);
	store.commit();
};

const updateTest = (test) => {
	store.update((data) => data.map(t => t.id === test.id ? test : t));
	store.commit();
};

const deleteTest = (id) => {
	store.update((data) => data.filter(test => test.id !== id));
	store.commit();
};

const getTestById = (id) => store.get().find(test => test.id === id);

const getTestsByProject = (id) => store.get().filter(test => test.projectId === id);

const getTests = () => store.get();

const invalidateTests = ({projectId, testKeysArr, environmentId, timestamp}) => {
	const tests = store.get().filter(test => test.projectId === projectId && testKeysArr.includes(test.testKey));
	for (const test of tests) {
		if(test.environments == null) test.environments = {};
		
		if (test.environments[environmentId]) {
			test.environments[environmentId].history.push({
				timestamp: timestamp,
				status: "pending"
			});
			test.environments[environmentId].status = "pending";
		} else {
			test.environments[environmentId] = {
				status: status,
				history: [
					{
						timestamp: timestamp,
						status: "pending"
					}
				]
			};
		}
	}
	
	store.commit();
}

const updateTestStatus = ({ testId, envId, status }) => {
	const test = getTestById(testId);
	
	if(test.environments == null) test.environments = {};
	
	if (test.environments[envId]) {
		test.environments[envId].history.push({
			timestamp: Date.now(),
			status
		});
		test.environments[envId].status = status;
	} else {
		test.environments[envId] = {
			status: status,
			history: [
				{
					timestamp: Date.now(),
					status
				}
			]
		};
	}
	
	store.commit();
};

module.exports = {
	addTest,
	getTestById,
	getTestsByProject,
	getTests,
	updateTest,
	deleteTest,
	createNextId: () => store.createNextId(),
	invalidateTests,
	updateTestStatus
}
