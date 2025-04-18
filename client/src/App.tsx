import "./App.css"
import { Routes, Route } from "react-router-dom"
import Header from "./pages/Header"
import AddWorkout from "./pages/AddWorkout"
import Dashboard from "./pages/Dashboard"
import NavBar from "./pages/NavBar"
import Profile from "./pages/UserProfile"
import WorkoutPlanList from "./components/WorkoutPlanList"
import WelcomeScreen from "./pages/IntakeForms/WelcomeScreen"
import NameForm from "./pages/IntakeForms/NameForm"
import AgeForm from "./pages/IntakeForms/AgeForm"
import SexForm from "./pages/IntakeForms/SexForm"
import WeightForm from "./pages/IntakeForms/WeightForm"
import GoalForm from "./pages/IntakeForms/GoalForm"
import TargetMuscleForm from "./pages/IntakeForms/TargetMuscleForm"
import WhyHereForm from "./pages/IntakeForms/WhyHereForm"
import LoginPage from "./pages/LoginPage"
import { FC } from "react"
import Signup from "./pages/SignupPage"

/*interface Props {
	name: string 
    age: number
    sex: string
    weight: number
    whyHere: string
    goal: string
}*/

const App: FC = ({/* name, age, sex, whyHere, weight, goal */}) => {
	return (
		<>
			<Header />
			<br />
			<br />
			<div>
				<Routes>
					<Route
						path="/"
						element={<WelcomeScreen />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
					/>
					<Route 
						path="/signup"
						element={<Signup />}
					/>
					<Route
						path="/name"
						element={<NameForm />}
					/>
					<Route
						path="/age"
						element={<AgeForm />}
					/>
					<Route
						path="/sex"
						element={<SexForm />}
					/>
					<Route
						path="/weight"
						element={<WeightForm />}
					/>
					<Route
						path="/why"
						element={<WhyHereForm />}
					/>
					<Route
						path="/goal"
						element={<GoalForm />}
					/>
					<Route
						path="/target"
						element={<TargetMuscleForm />}
					/>
					<Route
						path="/profile"
						element={<Profile />}
						/*element={<Profile name={name} sex={sex} age={age} weight={weight} whyHere={whyHere} goal={goal} />}*/
					/>
					<Route
						path="/dashboard"
						element={<Dashboard />}
					/>
					<Route
						path="/plans"
						element={
							<WorkoutPlanList
								exercises={[]}
								addToCart={function (): void {}}
							/>
						}
					/>
					<Route
						path="/select"
						element={<AddWorkout />}
					/>
				</Routes>
			</div>
			<NavBar />
		</>
	)
}

export default App
