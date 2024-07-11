import cluster from "node:cluster";
import os from "node:os";
import path from "node:path";

// console.log(path.join(__dirname + "../../../app.ts"));

const cpuCount = os.cpus().length;

console.log(`The total number of the CPUs is ${cpuCount}`);
console.log(`Primary pid=${process.pid}`);

cluster.setupPrimary({
	exec: path.join(__dirname + "../../../app.ts"),
});

for (let i = 0; i < cpuCount; i++) {
	cluster.fork();
}

cluster.on("exit", (worker, code, signal) => {
	console.log(`Worker ${worker.process.pid} has been killed`);
	console.log(`Starting another worker`);
	cluster.fork();
});
