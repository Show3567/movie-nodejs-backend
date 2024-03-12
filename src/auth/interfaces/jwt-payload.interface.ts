export interface JwtPayload {
	id?: string;
	username: string;
	email: string;
	tmdb_key: string;
}
export type DoneFunction = (
	error: any,
	user?: Express.User | false,
	options?: { message: string }
) => void;
