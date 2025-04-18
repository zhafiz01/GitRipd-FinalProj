import {
	Request,
	Response,
	NextFunction
} from "express"
import admin from "../config/firebase"

export const verifyFirebaseToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token =
		req.headers.authorization?.split("Bearer ")[1]

	if (!token) {
		res.status(401).json({ message: "Missing token" })
		return
	}

	try {
		const decodedToken = await admin
			.auth()
			.verifyIdToken(token)
		;(req as any).user = decodedToken
		next()
	} catch (err) {
		res
			.status(403)
			.json({ message: "Invalid token", error: err })
	}
}
