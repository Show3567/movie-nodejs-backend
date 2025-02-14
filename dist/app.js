"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var compression_1 = __importDefault(require("compression"));
var authConfig_1 = require("./core/authConfig");
var routes_1 = require("./core/routes");
var errorHandler_1 = require("./errors/errorHandler");
var swagger_1 = require("./tools/swagger/swagger");
var loggerConfig_1 = __importDefault(require("./core/loggerConfig"));
// * ~~~~~~~~~~~~~~~~~~~~ database connection;
require("./core/typeOrmConfig");
// * ~~~~~~~~~~~~~~~~~~~~ env config;
require("./core/evnConfig");
var gracefulShutdown_1 = require("./core/gracefulShutdown");
// * ~~~~~~~~~~~~~~~~~~~~ server;
var port = process.env.PORT || 4231;
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, server;
    return __generator(this, function (_a) {
        app = (0, express_1.default)();
        // * ~~~~~~~~~~~~~~~~~~~~ compression;
        app.use((0, compression_1.default)());
        // * ~~~~~~~~~~~~~~~~~~~~ auth config;
        (0, authConfig_1.authConfig)(app);
        // * ~~~~~~~~~~~~~~~~~~~~ Router and MiddleWare handler;
        (0, routes_1.routersConfig)(app);
        // * ~~~~~~~~~~~~~~~~~~~~ global error handler;
        app.use(errorHandler_1.errorHandler);
        // * ~~~~~~~~~~~~~~~~~~~~ Swagger;
        (0, swagger_1.setupSwagger)(app);
        server = app.listen(port, function () {
            loggerConfig_1.default.info("Server is running on port: ".concat(port));
            console.log("Server is running on port: ".concat(port));
        });
        // * ~~~~~~~~~~~~~~~~~~~~ gracefulShutdown ^_^;
        process.on("SIGTERM", function () { return (0, gracefulShutdown_1.handleSIGTERM)(server); });
        process.on("SIGINT", gracefulShutdown_1.handleSIGINT);
        return [2 /*return*/];
    });
}); })();
/*
  & init project, install express;
  $ npm init
  $ npm i express
  $ npm i @types/express

  & nodemon with ts;
  $ npm install -D nodemon typescript ts-node esm

  & edit tsconfig.json;
    "outDir": "./dist"

  & add start and build in package.josn script;
    "start": "npx nodemon --exec ts-node ./src/app.ts",
        "build": "tsc"

  & dotenv to use process.env;
  $ npm install dotenv
  $ npm install --save-dev @types/dotenv
  & set env;
  $ npm install --save-dev cross-env

  & mongoose;
  $ npm install mongoose
  $ npm install --save-dev @types/mongoose

  & mySql;
  $ npm install typescript @types/node mysql2
  $ npm install --save-dev @types/mysql

  & postgre
  $ npm install typeorm pg reflect-metadata
  $ npm install typescript ts-node @types/node --save-dev

  & TypeOrm;
  $ npm install typeorm mysql reflect-metadata
  $ npm install --save-dev typescript @types/node ts-node

  & send http request to other server;
  $ npm install axios

  & add passport;
  $ npm install passport passport-jwt jsonwebtoken
  $ npm install @types/passport @types/passport-jwt @types/jsonwebtoken --save-dev

  & add class-validator;
  $ npm install class-validator class-transformer reflect-metadata

  & add express-session;
  $ npm install express-session
  $ npm install @types/express-session @types/express --save-dev

  & add mongodb session, cz the typeorm store query builder not supported by MongoDB;
  $ npm install connect-mongodb-session express-session

  & add jsonwebtoken;
  $ npm i jsonwebtoken
  $ npm i @types/jsonwebtoken --save-dev

  & handle cros issue;
  $ npm install cors @types/cors

  & logger;
  $ npm install winston
  $ npm install @types/winston --save-dev

  & create docker file Dockerfile: my image name is movie-backend;
  $ docker build -t <your-image-name> .
  $ docker run -p 8800:3344 -d <your-image-name>

  & stop the docker service in local;
  $ docker ps
  $ docker stop <container-id-or-name>
  $ docker rm <container-id-or-name> // optional, this will remove the image;
  $ docker run -p 8800:3344 -d <your-image-name> // recreate the image;

  & add swagger
  $ npm i swagger-ui-express @types/swagger-ui-express
  $ npm i swagger-jsdoc @types/swagger-jsdoc
  
  & compression the header to reduce the package size
  $ npm i compression
  $ npm i --save-dev @types/compression

  & using pm2
  $ pm2 start dist/app.js --name movie-nodejs-backend --watch
  $ pm2 logs my-app
  $ pm2 restart my-app
  $ pm2 reload my-app --watch false
  $ pm2 stop movie-nodejs-backend
  $ pm2 delete movie-nodejs-backend

  & copyfiles for build resouse which not ts file: check the package.json "script" --> "build:pro"
  npm install copyfiles --save-dev

*/
