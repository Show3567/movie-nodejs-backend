import cluster from "node:cluster";
import os from "node:os";
import express from "express";
const app = express();

const PORT = process.env.PORT || 4231;

if (cluster.isPrimary) {
	const numCPUs = os.cpus().length;
	console.log(
		`Master process is running. Forking ${numCPUs} workers...`
	);

	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker, code, signal) => {
		console.log(
			`Worker ${worker.process.pid} died. Forking a new worker...`
		);
		cluster.fork();
	});
} else {
	app.listen(PORT, () => {
		console.log(`Server is listening on Port ${PORT}`);
	});
}
