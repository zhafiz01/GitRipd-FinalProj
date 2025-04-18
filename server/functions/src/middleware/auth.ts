import {
	Request,
	Response,
	NextFunction
} from "express"
import { getAuth } from "firebase-admin/auth"

const checkAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization

	if (!authHeader?.startsWith("Bearer "))
		res.status(401).send("Forbidden")
	else {
		const token = authHeader.split("Bearer ")[1]
		try {
			const decodedToken = await getAuth().verifyIdToken(token)
      req.body.loggedInUser = decodedToken
			next()
		} catch (error) {
			console.error("Token verification failed: ", error)
      res.status(401).send("Invalid or expired token")
		}
	}
}

export default checkAuth