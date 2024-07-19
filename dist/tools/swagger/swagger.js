"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var options = {
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
var swaggerSpec = (0, swagger_jsdoc_1.default)(options);
var setupSwagger = function (app) {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.get("/api-docs.json", function (req, res) {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
};
exports.setupSwagger = setupSwagger;
