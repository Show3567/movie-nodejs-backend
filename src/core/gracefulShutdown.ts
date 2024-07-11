import { Server } from "node:http";

// Shared graceful shutdown logic
const gracefulShutdown = (server: Server) => {
	console.log("Shutting down gracefully...");
	server.close(() => {
		console.log("Server closed.");
		process.exit(0);
	});
	setTimeout(() => {
		console.error(
			"Could not close connections in time, forcefully shutting down"
		);
		process.exit(1);
	}, 5000);
};

// Separate signal handling functions
export const handleSIGTERM = (server: Server) => {
	console.log("Received SIGTERM signal");
	gracefulShutdown(server);
};
export const handleSIGINT = () => {
	console.log("Received SIGINT signal");
	process.exit(1);
};
