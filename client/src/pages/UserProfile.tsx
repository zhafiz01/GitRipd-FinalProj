import { FC } from "react"

/*interface Props {
	name: string 
    age: number
    sex: string
    weight: number
    whyHere: string
    goal: string
}*/

const Profile: FC = ({/* name, age, sex, weight, whyHere, goal */}) => {
	return (
		<>
			Personal Profile
			<br />
			Name:
			<br />
			Birthday: 
			<br />
			Sex: 
			<br />
			Current weight:  lbs
			<br />
			Why you're here: 
			<br />
			Goal: 
			<br />
			Target Muscles:
			<br />
			Workout Plan (Full UserWorkoutPlan shows here)
		</>
	)
}

export default Profile
