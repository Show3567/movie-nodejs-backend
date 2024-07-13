import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Training Backend: TMDB Movie",
			version: "1.0.0",
			description: "RESTful API documentation",
		},
	},
	apis: ["./src/auth/*.ts", "./src/movies/*.ts"], // Path to your API files
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
	app.get("/api-docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json");
		res.send(swaggerSpec);
	});
};
