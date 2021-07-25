const {getEnvironmentsByProjectId} = require("../../collections/projects");
const {getProjects} = require("../../collections/projects");
const {getProjectById} = require("../../collections/projects");
const {getTestsByProject} = require("../../collections/tests");
const {Router} = require("express");

const projectsRouter = () => {
	const router = Router();
	
	router.get("/", async (req, res) => {
		try {
			const projects = await getProjects();
			if (projects) {
				res.status(200).send(projects).end();
			} else {
				res.status(404).end();
			}
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.get("/:id", async (req, res) => {
		try {
			const id = parseInt(req.params.id);
			const project = await getProjectById(id);
			if (project) {
				res.status(200).send(project).end();
			} else {
				res.status(404).end();
			}
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.get("/:id/tests", async (req, res) => {
		try {
			const id = req.params.id;
			const status = req.query.status;
			
			let tests = await getTestsByProject(id);
			if (status) {
				tests = tests.filter((test) => {
					if(test.environments) {
						for(const env of Object.values(test.environments)) {
							console.log(env.status + ": " + (env.status === status))
							if(env.status === status)
								return true;
						}
					}
					
					return false;
				})
			}
			if (tests) {
				res.status(200).send(tests).end();
			} else {
				res.status(404).end();
			}
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	router.get("/:id/environments", async (req, res) => {
		try {
			const id = req.params.id;
			const {environments} = await getEnvironmentsByProjectId(id);
			if (environments) {
				res.status(200).send(environments).end();
			} else {
				res.status(404).end();
			}
		} catch (e) {
			console.error(e);
			res.status(500).end();
		}
	});
	
	return router;
};

module.exports = {
	projectsRouter
}
