const {createStorage} = require("../../utils/discStorage");

const store = createStorage("projects", []);

const sanitizeProject = (project) => {
	const {environments, ...data} = project;
	return data;
}

const getProjectById = (id) => store.get().find(project => project.id === id);
const getProjects = () => store.get().map(sanitizeProject);
const getEnvironmentsByProjectId = (projectId) => {
	const project = getProjectById(projectId);
	if(!project) return null;
	const {environments} = project;
	return environments;
};
const addEnvironment = (environment) => {
	const {projectId, ...env} = environment;
	const project = getProjectById(projectId);
	let id = null;
	if(!project.environments) {
		env.id = id = 'env-0';
		project.environments = [env];
	} else {
		id = `env-${project.environments.length}`;
		project.environments.push({...env, id});
	}
	store.commit();
	return id;
};

module.exports = {
	getProjectById,
	createNextId: store.createNextId,
	getProjects,
	getEnvironmentsByProjectId,
	addEnvironment
}
