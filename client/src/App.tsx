import "./App.css"
import { Routes, Route } from "react-router-dom"
import Header from "./pages/Header"
import Dashboard from "./pages/Dashboard"
import NavBar from "./pages/NavBar"
import Profile from "./pages/UserProfile"
import WelcomeScreen from "./pages/IntakeForms/WelcomeScreen"
import NameForm from "./pages/IntakeForms/NameForm"
import AgeForm from "./pages/IntakeForms/AgeForm"
import SexForm from "./pages/IntakeForms/SexForm"
import WeightForm from "./pages/IntakeForms/WeightForm"
import GoalForm from "./pages/IntakeForms/GoalForm"
import WhyHereForm from "./pages/IntakeForms/WhyHereForm"
import LoginPage from "./pages/LoginPage"
import { FC } from "react"
import Signup from "./pages/SignupPage"
import ProtectedRoute from "./components/ProtectedRoute"
import MuscleSelectorPage from "./pages/MuscleSelectorPage"
import ViewWorkout from "./pages/ViewWorkout"

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
					<Route element={<ProtectedRoute />}>
						<Route
							path="/name"
							element={<NameForm />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/age"
							element={<AgeForm />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/sex"
							element={<SexForm />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/weight"
							element={<WeightForm />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/whyHere"
							element={<WhyHereForm />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/goal"
							element={<GoalForm />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/profile"
							element={<Profile />}
							/*element={<Profile name={name} sex={sex} age={age} weight={weight} whyHere={whyHere} goal={goal} />}*/
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/plans"
							element={
								<ViewWorkout
								/>
							}
						/>
					</Route>
					<Route element={<ProtectedRoute />}>
						<Route
							path="/select"
							element={<MuscleSelectorPage />}
						/>
					</Route>
				</Routes>
			</div>
			<NavBar />
		</>
	)
}

export default App
