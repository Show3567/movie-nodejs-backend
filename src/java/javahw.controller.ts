import express, { Request, Response } from "express";
import axios from "axios";
const universityRouter = express.Router();

const getUniversities = async (req: Request, res: Response) => {
	const queryObj = { ...req.query } as { [key: string]: string };
	const baseUrl = `http://universities.hipolabs.com/search?`;

	// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ build url list;
	let resarr: string[] = [];
	const buildUrlHelper = (key: string, val: string, i: number) => {
		const arr = val.split(",").map((ele) => ele.trim());
		const markarr: string[] = [];
		arr.forEach((ele) => {
			if (i === 0) {
				resarr.push(`${baseUrl}&${key}=${ele}`);
			} else {
				resarr.forEach((link) => {
					markarr.push(`${link}&${key}=${ele}`);
				});
			}
		});
		resarr = markarr.length ? [...markarr] : resarr;
	};
	Object.entries(queryObj).forEach(([key, val], i) => {
		if (Array.isArray(val)) {
			val.forEach((ele) => {
				buildUrlHelper(key, ele, i);
			});
		} else if (typeof val === "string") {
			buildUrlHelper(key, val, i);
		}
	});

	// * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ parallel sending requests;
	const result = await axios
		.all(resarr.map((link) => axios.get(link)))
		.then((list) => {
			return list.map((ele) => ele.data);
		})
		.then((list) => {
			const map: any = {};
			list.flat().forEach((data: any) => {
				map[data["name"]] = { ...data };
			});
			return Object.values(map);
		});

	res.status(200).json({
		ok: true,
		data: result,
	});
};

// http://localhost:5566/api/v1/universities?country=United+Kingdom
universityRouter.route("/").get(getUniversities);

export default universityRouter;
