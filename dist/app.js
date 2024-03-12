"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var db_typeorm_1 = __importDefault(require("./core/db_typeorm"));
var routes_1 = __importDefault(require("./core/routes"));
// const app = require('express')();
// const fs = require('node:fs');
var app = (0, express_1.default)();
dotenv_1.default.config();
(0, db_typeorm_1.default)();
(0, routes_1.default)(app);
var port = process.env.PORT || 4231;
app.listen(port, function () {
    console.log("Server is running on port: ".concat(port));
});
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
*/
