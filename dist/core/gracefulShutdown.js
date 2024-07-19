"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSIGINT = exports.handleSIGTERM = void 0;
// Shared graceful shutdown logic
var gracefulShutdown = function (server) {
    console.log("Shutting down gracefully...");
    server.close(function () {
        console.log("Server closed.");
        process.exit(0);
    });
    setTimeout(function () {
        console.error("Could not close connections in time, forcefully shutting down");
        process.exit(1);
    }, 5000);
};
// Separate signal handling functions
var handleSIGTERM = function (server) {
    console.log("Received SIGTERM signal");
    gracefulShutdown(server);
};
exports.handleSIGTERM = handleSIGTERM;
var handleSIGINT = function () {
    console.log("Received SIGINT signal");
    process.exit(1);
};
exports.handleSIGINT = handleSIGINT;
