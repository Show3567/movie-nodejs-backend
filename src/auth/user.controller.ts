import express, { RequestHandler, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import { AppDataSource } from "../core/typeOrmConfig";
import { User } from "./entities/user.entity";
import { UserRole } from "./enum/user-role.enum";
import { CheckEmailDto } from "./dto/check-email.dto";
import {
	genPassword,
	validPassword,
} from "./passport-strategies/passport-util/passport-util";
import passport from "passport";
import { isAuth } from "./auth.middleware";

dotenv.config();
const userRouters = express.Router();
const userRepo = AppDataSource.getRepository(User);

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ private function;
const createToken = function (user: User) {
	const payload: JwtPayload = {
		id: user._id.toString(),
		username: user.username,
		email: user.email,
		tmdb_key: user.tmdb_key,
	};
	const accessToken: string = jwt.sign(
		payload,
		process.env.JWT_SECRET || "",
		{ expiresIn: "1d", algorithm: "HS256" }
	);
	return `Bearer ${accessToken}`;
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API;
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signin;
const signIn: RequestHandler = async (req, res) => {
	const { email, password } = req.body;
	const user = await userRepo.findOne({ where: { email } });

	if (user && (await validPassword(password, user.password))) {
		const accessToken: string = createToken(user);
		res.status(201).json({ accessToken, role: user.role });
	} else {
		res
			.status(401)
			.json({ errMsg: "Please check your login credentials" });
	}
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signup;
const signUp: RequestHandler = async (req, res) => {
	const { username, password, email, tmdb_key, role }: User =
		req.body;

	// 400: 'Bad Request';
	if (!(email && password))
		res.status(400).send("All input are required!");

	// 409: 'Conflict';
	if (!!(await userRepo.findOne({ where: { email } })))
		res.status(409).send("User Already Exist. Please Login");

	// create user;
	const user = userRepo.create({
		username,
		password: (await genPassword(password)).hash,
		email,
		tmdb_key,
		role: UserRole[role] || UserRole.USER,
	});

	try {
		await userRepo.save(user);
		const userfromdb = await userRepo.findOne({
			where: { email },
		});
		const accessToken = userfromdb ? createToken(userfromdb) : "";

		res.status(201).json({ accessToken, role: user.role });
	} catch (err: any) {
		if (err.code === "11000") {
			res.status(409).send("Username already exists");
		} else {
			res.status(500);
		}
	}
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ updateUser;
const updateUser: RequestHandler = async (req, res) => {
	console.log("user: ", req.body.role, (req.user as User)?.email);
	const { role } = req.body;

	try {
		await userRepo.update(
			{ email: (req.user as User)?.email },
			{
				role: UserRole[role as UserRole],
			}
		);

		const userFromDB = await userRepo.findOne({
			where: { email: (req.user as User)?.email },
		});
		if (userFromDB) {
			console.log(userFromDB);
			const accessToken: string = createToken(userFromDB);
			res.status(205).json({ accessToken, role: userFromDB.role });
		} else {
			res.status(201).json(req.user);
		}
	} catch (error) {
		res.status(500).json({ err: JSON.stringify(error) });
	}
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ refreshToken;
const refreshToken: RequestHandler = async (req, res) => {
	const { email } = req.body;
	const user = await userRepo.findOne({ where: { email } });

	if (user) {
		const accessToken: string = createToken(user);
		res.status(201).json({ accessToken, role: user.role });
	} else {
		res
			.status(201)
			.json({ message: "Please complete your user info" });
	}
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ checkEmail;
const checkEmail: RequestHandler = async function (req, res) {
	console.log(req.session);
	const user = await userRepo.findOne({
		where: { email: (req.body as CheckEmailDto).email },
	});
	if (user) {
		res.status(200).send(true);
	} else {
		res.status(200).send(false);
	}
};

const getUsers: RequestHandler = async (
	req: Request,
	res: Response
) => {
	const users = await userRepo.find();
	res.status(200).json(users);
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Router;
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

userRouters.route("/signin").post(signIn);
userRouters.route("/signup").post(signUp);
userRouters.route("/check-email").post(isAuth as any, checkEmail);
userRouters
	.route("/userupdate")
	.patch(
		passport.authenticate("jwt", { session: false }),
		updateUser
	);
userRouters
	.route("/refresh-token")
	.post(
		passport.authenticate("jwt", { session: false }),
		refreshToken
	);

export default userRouters;
