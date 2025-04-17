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

function App() {
	return (
		<>
			<Header />
			<br />
			<br />
			<div className="content-wrapper">
				<Routes>
					<Route
						path="/welcome"
						element={<WelcomeScreen />}
					/>
					<Route
						path="/login"
						element={<LoginPage />}
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
