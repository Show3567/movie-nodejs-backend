import { Express } from "express";
import passport from "passport";
import session from "express-session";
import "./evnConfig";
import connectMongoDBSession from "connect-mongodb-session";

// import "../auth/cryptography/main"; // test;
// import "../auth/cryptography/createKeypair"; // create pem;

import "../auth/passport-strategies/local.strategy";
import { useJwtStrategy } from "../auth/passport-strategies/jwt.strategy";

export const authConfig = (app: Express) => {
	// load jwt strategy;
	useJwtStrategy(passport);
	// connect db;
	// const MongoDBStore = connectMongoDBSession(session);

	// // create session for local strategy;
	// const store = new MongoDBStore({
	// 	uri: process.env.MODB_URL || "",
	// 	collection: "mongoDB_Session",
	// });
	// store.on("error", (error: Error) => {
	// 	console.error(error);
	// });
	// app.use(
	// 	session({
	// 		store: store,
	// 		secret: process.env.JWT_SECRET || "",
	// 		resave: false,
	// 		saveUninitialized: false,
	// 		cookie: {
	// 			secure: true,
	// 			maxAge: 1000 * 3600 * 24,
	// 		},
	// 	})
	// );

	// init passport;
	app.use(passport.initialize());
	// app.use(passport.session());
};
