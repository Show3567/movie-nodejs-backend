import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import logger, { loggerErr } from "../../core/loggerConfig";

// // Extend the Express Request interface to include Passport.js properties
// interface PassportRequest extends Request {
// 	logout: () => void;
// 	isAuthenticated: () => boolean;
// 	user?: Express.User;
// }

// export const isAuth = (
// 	req: PassportRequest,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	if (req.isAuthenticated()) {
// 		next();
// 	} else {
// 		logger.error(
// 			loggerErr("isAuth_middleware", 401, `You are not authorized!`)
// 		);
// 		res.status(401).json({ messgage: `You are not authorized!` });
// 	}
// };

export const dtoCheck = (
	DtoClass: any,
	callback:
		| ((err: ValidationError[]) => ValidationError[])
		| null = null
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const dto = plainToInstance(DtoClass, req.body);
		const errors = await validate(dto);
		if (errors.length > 0) {
			if (callback) {
				const err = callback(errors);
				logger.error(loggerErr("dtoCheck", 400, "", err));
				res.status(400).json(err);
			} else {
				logger.error(loggerErr("dtoCheck", 400, "", errors));
				res.status(400).json(errors);
			}
		}
		next();
	};
};
