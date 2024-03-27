import { RequestHandler } from "express";
import { getKey } from "../auth/cryptography/verifyIdentitiy";
import jwt, { Algorithm, JwtPayload } from "jsonwebtoken";
import { User } from "../auth/entities/user.entity";
import { AppDataSource } from "../core/typeOrmConfig";
import { validPassword } from "../auth/passport-strategies/passport-util/passport-util";
import logger, { loggerErr, loggerInfo } from "../core/loggerConfig";

const userRepo = AppDataSource.getRepository(User);

const { key, algorithm } = getKey("priv");
const createToken = function (user: User) {
	const payload: JwtPayload = {
		id: user._id.toString(),
		username: user.username,
		email: user.email,
	};
	const accessToken: string = jwt.sign(payload, key as string, {
		expiresIn: "1d",
		algorithm: algorithm as Algorithm,
	});
	return `Bearer ${accessToken}`;
};

export const signin: RequestHandler = async (req, res) => {
	const { email, password } = req.body;
	const user = await userRepo.findOne({ where: { email } });

	if (user && (await validPassword(password, user.password))) {
		const accessToken: string = createToken(user);

		logger.info(
			loggerInfo("signin", 201, { accessToken, role: user.role })
		);
		res.status(201).json({ accessToken, role: user.role });
	} else {
		logger.error(
			loggerErr("signin", 401, "Please check your login credentials")
		);
		res
			.status(401)
			.json({ errMsg: "Please check your login credentials" });
	}
};

export const signup: RequestHandler = (req, res) => {};
