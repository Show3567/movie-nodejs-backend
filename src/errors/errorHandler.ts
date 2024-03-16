import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (err instanceof ApiError) {
		console.error(err);
		res.status(err.statusCode).json({ error: err.message });
	} else {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
}
