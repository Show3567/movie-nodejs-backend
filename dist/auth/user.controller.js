"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var passport_1 = __importDefault(require("passport"));
var user_service_1 = require("./user.service");
var auth_middleware_1 = require("./middleware/auth.middleware");
var check_email_dto_1 = require("./dto/check-email.dto");
var signin_dto_1 = require("./dto/signin.dto");
var signup_dto_1 = require("./dto/signup.dto");
var update_user_dto_1 = require("./dto/update-user.dto");
var userRouters = express_1.default.Router();
userRouters
    .route("/users")
    .get(passport_1.default.authenticate("jwt", { session: false }), user_service_1.getUsers);
// & ~~~~ passport local strategy;
// userRouters.route("/signin").post(
// 	passport.authenticate("local", {
// 		failureRedirect: "/api/v1/auth/login-failed",
// 		successRedirect: "/api/v1/auth/login-success",
// 	})
// );
// userRouters.route("/login-failed").get((req, res) => {
// 	res.send(`<h1>Login Failed!</h1>`);
// });
// userRouters.route("/login-success").get((req, res) => {
// 	res.send(`<h1>Login Success!</h1>`);
// });
// userRouters.post("/signup", signIn);
userRouters.route("/signin").post((0, auth_middleware_1.dtoCheck)(signin_dto_1.SignInCredentialsDto, function (errors) {
    return errors.map(function (error) {
        if (error.target && error.target.password) {
            delete error.target.password;
        }
        return error;
    });
}), user_service_1.signIn);
userRouters
    .route("/signup")
    .post((0, auth_middleware_1.dtoCheck)(signup_dto_1.SignUpCredentialsDto), user_service_1.signUp);
userRouters
    .route("/check-email")
    .post((0, auth_middleware_1.dtoCheck)(check_email_dto_1.CheckEmailDto), user_service_1.checkEmail);
userRouters
    .route("/userupdate")
    .patch((0, auth_middleware_1.dtoCheck)(update_user_dto_1.UpdateCredentialDto), passport_1.default.authenticate("jwt", { session: false }), user_service_1.updateUser);
userRouters.route("/refresh-token").get(
// dtoCheck(RefreshTokenDto),
passport_1.default.authenticate("jwt_ign_exptime", { session: false }), user_service_1.refreshToken);
userRouters
    .route("/users/:id")
    .delete(passport_1.default.authenticate("jwt", { session: false }), user_service_1.deleteUserById);
exports.default = userRouters;
