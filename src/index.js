const express = require("express");
const bodyParser = require("express");
const cors = require("cors");
const {start} = require("./database");
const {invalidationRouter} = require("./api/invalidator");
const {environmentRouter} = require("./api/environments");
const {projectsRouter} = require("./api/projects");
const {testsRouter} = require("./api/tests");

const PORT = process.env.PORT || 3099;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const setup = async () => {
	await start();
	
	app.use('/tests', testsRouter());
	app.use('/projects', projectsRouter());
	app.use('/environments', environmentRouter());
	app.use('/invalidators', invalidationRouter());
	
	app.listen(PORT, () => {
		console.log('listening on ' + PORT)
	});
};

setup().then(() => {
	console.log("Up and running!");
});
