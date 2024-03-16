import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ObjectId } from "typeorm";
import {
	genPassword,
	validPassword,
} from "./passport-strategies/passport-util/passport-util";
import { AppDataSource } from "../core/typeOrmConfig";
import { User } from "./entities/user.entity";
import { UserRole } from "./enum/user-role.enum";
import dotenv from "dotenv";
import { CheckEmailDto } from "./dto/check-email.dto";

dotenv.config();
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
		process.env.JWT_SECRET || "", // privateKey
		{ expiresIn: "1d", algorithm: "HS256" }
	);
	return `Bearer ${accessToken}`;
};

// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ API;
// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ signin;
export const signIn: RequestHandler = async (req, res) => {
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
export const signUp: RequestHandler = async (req, res) => {
	const { username, password, email, tmdb_key, role }: User =
		req.body;

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

	await userRepo.save(user);
	const userfromdb = await userRepo.findOne({
		where: { email },
	});
	const accessToken = userfromdb ? createToken(userfromdb) : "";

	res.status(201).json({ accessToken, role: user.role });
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ updateUser;
export const updateUser: RequestHandler = async (req, res) => {
	console.log("user: ", req.body.role, (req.user as User)?.email);
	const { role } = req.body;

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
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ deleteUserById;
export const deleteUserById: RequestHandler = async (req, res) => {
	const id = req.params.id;
	const userfromdb = await userRepo.findOne({
		where: { _id: new ObjectId(id) as any },
	});
	if (!userfromdb) {
		res.status(404).json({
			message: `User which ID is "${id}" not found!`,
		});
	} else if (userfromdb.role !== UserRole.ADMIN)
		res.status(401).json({
			message: `You don't have the permission to delete a user.`,
		});
	await userRepo.delete({ _id: new ObjectId(id) as any });
	res.status(204);
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ refreshToken;
export const refreshToken: RequestHandler = async (req, res) => {
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
	res.status(201).json({});
};

// & ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ checkEmail;
export const checkEmail: RequestHandler = async function (req, res) {
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

export const getUsers: RequestHandler = async (req, res) => {
	const users = await userRepo.find();
	res.status(200).json(users);
};
