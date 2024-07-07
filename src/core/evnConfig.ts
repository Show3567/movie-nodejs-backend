import path from "node:path";
import dotenv from "dotenv";

const evnPath =
	process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({
	path: path.resolve(__dirname, "../../", evnPath),
});

/* 
  & after using nodejs  20.6.1
  $ node --env-file .env index.js
*/
