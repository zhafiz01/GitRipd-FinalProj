import HTTPHandler from "../helpers/HTTPHandler"
import User from "../models/User"

// POST save user profile data
export const saveUserProfile: HTTPHandler = async (
	req,
	res
) => {
	const userId = (req as any).body.loggedInUser.uid
	const {
		name,
		age,
		sex,
		weight,
		whyHere,
		goal,
		target
	} = req.body

	try {
		let user = await User.findOne({ userId })

		if (!user) {
			user = new User({
				userId,
				name,
				age,
				sex,
				weight,
				whyHere,
				goal,
				target
			})
			await user.save()
			res.status(201).json({ message: "Profile saved", user})
		} else {
			user.name = name
			user.age = age
			user.sex = sex
			user.weight = weight
			user.whyHere = whyHere
			user.goal = goal
			user.target = target

			await user.save()
			res.status(200).json(user)
		}
	} catch (err) {
		console.log(err)
		res
			.status(500)
			.json({ message: "Failed to save user profile" })
	}
}

// GET user profile
export const getUserProfile: HTTPHandler = async (req, res) => {
	try {
		const userId = (req as any).body.loggedInUser.uid
		const user = await User.findOne({ userId })

		if (!user) res.status(404).json({ message: "User profile not found" })
		
		res.status(200).json(user)
	} catch (err) {
		console.error("Error fetching user profile: ", err)
		res.status(500).json({ message: "Server error while fetching user profile" })
	}
}