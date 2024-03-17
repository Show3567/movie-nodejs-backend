import express from "express";
import passport from "passport";

import {
	checkEmail,
	deleteUserById,
	getUsers,
	refreshToken,
	signIn,
	signUp,
	updateUser,
} from "./user.service";

import { dtoCheck } from "./middleware/auth.middleware";
import { CheckEmailDto } from "./dto/check-email.dto";
import { SignInCredentialsDto } from "./dto/signin.dto";
import { SignUpCredentialsDto } from "./dto/signup.dto";
import { UpdateCredentialDto } from "./dto/update-user.dto";

const userRouters = express.Router();

userRouters
	.route("/users")
	.get(passport.authenticate("jwt", { session: false }), getUsers);

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
userRouters.route("/signin").post(
	dtoCheck(SignInCredentialsDto, (errors) => {
		return errors.map((error: any) => {
			if (error.target && error.target.password) {
				delete error.target.password;
			}
			return error;
		});
	}),
	signIn
);
userRouters
	.route("/signup")
	.post(dtoCheck(SignUpCredentialsDto), signUp);
userRouters
	.route("/check-email")
	.post(dtoCheck(CheckEmailDto), checkEmail);
userRouters
	.route("/userupdate")
	.patch(
		dtoCheck(UpdateCredentialDto),
		passport.authenticate("jwt", { session: false }),
		updateUser
	);
userRouters.route("/refresh-token").get(
	// dtoCheck(RefreshTokenDto),
	passport.authenticate("jwt_ign_exptime", { session: false }),
	refreshToken
);
userRouters
	.route("/users/:id")
	.delete(
		passport.authenticate("jwt", { session: false }),
		deleteUserById
	);

export default userRouters;
