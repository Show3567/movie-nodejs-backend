"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cluster_1 = __importDefault(require("node:cluster"));
var node_os_1 = __importDefault(require("node:os"));
var node_path_1 = __importDefault(require("node:path"));
// console.log(path.join(__dirname + "../../../app.ts"));
var cpuCount = node_os_1.default.cpus().length;
console.log("The total number of the CPUs is ".concat(cpuCount));
console.log("Primary pid=".concat(process.pid));
node_cluster_1.default.setupPrimary({
    exec: node_path_1.default.join(__dirname + "../../../app.ts"),
});
for (var i = 0; i < cpuCount; i++) {
    node_cluster_1.default.fork();
}
node_cluster_1.default.on("exit", function (worker, code, signal) {
    console.log("Worker ".concat(worker.process.pid, " has been killed"));
    console.log("Starting another worker");
    node_cluster_1.default.fork();
});
