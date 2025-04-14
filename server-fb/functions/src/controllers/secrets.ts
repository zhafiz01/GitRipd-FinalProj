import HTTPHandler from "../helpers/HTTPHandler"

// GET

export const getSecret: HTTPHandler = async (
	req,
	res
) => {
	try {
		console.log("hello")
		if (!req.body.loggedInUser) throw new Error()
		res.status(200).send(req.body.loggedInUser)
	} catch (e: any) {
		res.status(401).send("Not Logged In")
	}
}
