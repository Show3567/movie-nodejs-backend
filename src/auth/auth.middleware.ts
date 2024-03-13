import { Request, Response, NextFunction } from "express";
import { PassportStatic } from "passport";

// Extend the Express Request interface to include Passport.js properties
interface PassportRequest extends Request {
	logout: () => void;
	isAuthenticated: () => boolean;
	user?: Express.User;
}

export const isAuth = (
	req: PassportRequest,
	res: Response,
	next: NextFunction
) => {
	if (req.isAuthenticated()) {
		next();
	} else {
		res.status(401).json({ messgage: `You are not authorized!` });
	}
};

// export const isAdmin = (req, res, next) => {

// }
