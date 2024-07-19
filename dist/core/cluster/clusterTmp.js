"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_cluster_1 = __importDefault(require("node:cluster"));
var node_os_1 = __importDefault(require("node:os"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 4231;
if (node_cluster_1.default.isPrimary) {
    var numCPUs = node_os_1.default.cpus().length;
    console.log("Master process is running. Forking ".concat(numCPUs, " workers..."));
    for (var i = 0; i < numCPUs; i++) {
        node_cluster_1.default.fork();
    }
    node_cluster_1.default.on("exit", function (worker, code, signal) {
        console.log("Worker ".concat(worker.process.pid, " died. Forking a new worker..."));
        node_cluster_1.default.fork();
    });
}
else {
    app.listen(PORT, function () {
        console.log("Server is listening on Port ".concat(PORT));
    });
}
