import * as winston from "winston";

const logger = winston.createLogger({
	level: "info",
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json()
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: "app.log" }),
	],
});
export const loggerInfo = (
	method: string,
	code: number,
	res?: {}
) => {
	return { method, status: code, res };
};
export const loggerErr = (
	method: string,
	code: number,
	errMsg: string = "",
	err = {}
) => {
	return { method, status: code, errMsg, err };
};

export default logger;
