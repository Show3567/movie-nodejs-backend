import express, { Express } from "express";
import compression from "compression";
import { authConfig } from "./core/authConfig";
import { routersConfig } from "./core/routes";
import { errorHandler } from "./errors/errorHandler";
import { setupSwagger } from "./tools/swagger/swagger";
import logger from "./core/loggerConfig";

// * ~~~~~~~~~~~~~~~~~~~~ database connection;
import "./core/typeOrmConfig";

// * ~~~~~~~~~~~~~~~~~~~~ env config;
import "./core/evnConfig";

import { handleSIGINT, handleSIGTERM } from "./core/gracefulShutdown";

// * ~~~~~~~~~~~~~~~~~~~~ server;
const port = process.env.PORT || 4231;

(async () => {
	const app: Express = express();

	// * ~~~~~~~~~~~~~~~~~~~~ compression;
	app.use(compression());

	// * ~~~~~~~~~~~~~~~~~~~~ auth config;
	authConfig(app);

	// * ~~~~~~~~~~~~~~~~~~~~ Router and MiddleWare handler;
	routersConfig(app);

	// * ~~~~~~~~~~~~~~~~~~~~ global error handler;
	app.use(errorHandler);

	// * ~~~~~~~~~~~~~~~~~~~~ Swagger;
	setupSwagger(app);

	const server = app.listen(port, () => {
		logger.info(`Server is running on port: ${port}`);
		console.log(`Server is running on port: ${port}`);
	});

	// * ~~~~~~~~~~~~~~~~~~~~ gracefulShutdown ^_^;
	process.on("SIGTERM", () => handleSIGTERM(server));
	process.on("SIGINT", handleSIGINT);
})();

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
