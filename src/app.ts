import express, { Express } from "express";
import passport from "passport";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import dotenv from "dotenv";

import "./auth/passport-strategies/local.strategy";
import "./auth/passport-strategies/jwt.strategy";

// import "./auth/cryptography/main"; // test;
// import "./auth/cryptography/createKeypair"; // create pem;

import TypeOrmDbConnection from "./core/db_typeorm";
import Routers from "./core/routes";

(async () => {
	const port = process.env.PORT || 4231;
	const app: Express = express();
	const envSetup = dotenv.config();
	const typeOrmConnection = await TypeOrmDbConnection();
	const MongoDBStore = connectMongoDBSession(session);

	const store = new MongoDBStore({
		uri: process.env.MODB_URL || "",
		collection: "mongoDB_Session",
	});
	store.on("error", (error: Error) => {
		console.error(error);
	});

	app.use(
		session({
			store: store,
			secret: process.env.JWT_SECRET || "",
			resave: false,
			saveUninitialized: false,
			cookie: {
				secure: true,
				maxAge: 1000 * 3600 * 24,
			},
		})
	);

	app.use(passport.initialize());
	app.use(passport.session());

	const routers = Routers(app);

	app.listen(port, () => {
		console.log(`Server is running on port: ${port}`);
	});
})().catch((error) => console.log(error));

/* 
  & init project, install express;
  $ npm init
  $ npm i express
  & nodemon with ts;
  $ npm install -D nodemon typescript ts-node
  & edit tsconfig.json;
    "outDir": "./dist"  
  & add start and build in package.josn script;
  	"start": "npx nodemon --exec ts-node ./src/app.ts",
		"build": "tsc"
  & dotenv to use process.env;
  $ npm install dotenv
  $ npm install --save-dev @types/dotenv

  & mongoose;
  $ npm install mongoose
  $ npm install --save-dev @types/mongoose
  & mySql;
  $ npm install typescript @types/node mysql2
  $ npm install --save-dev @types/mysql
  & TypeOrm;
  $ npm install typeorm mysql reflect-metadata
  $ npm install --save-dev typescript @types/node ts-node

  & send http request to other server;
  $ npm install axios

  & add passport;
  $ npm install passport passport-jwt jsonwebtoken
  $ npm install @types/passport @types/passport-jwt @types/jsonwebtoken --save-dev

  & add class-validator;
  $ npm install class-validator reflect-metadata

  & add express-session;
  $ npm install express-session
  $ npm install @types/express-session @types/express --save-dev

  & add mongodb session, cz the typeorm store query builder not supported by MongoDB;
  $ npm install connect-mongodb-session express-session

  & add jsonwebtoken;
  $ npm i jsonwebtoken
  $ npm i @types/jsonwebtoken --save-dev
*/
