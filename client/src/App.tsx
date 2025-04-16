import "./App.css"
import { Routes, Route } from "react-router-dom"
import Header from "./pages/Header"
import AddWorkout from "./pages/AddWorkout"
import Dashboard from "./pages/Dashboard"
import BirthdayInput from "./pages/Intake Form/AgeForm"
import GoalInput from "./pages/Intake Form/GoalForm"
import ReviewIntake from "./pages/Intake Form/ReviewIntake"
import SexInput from "./pages/Intake Form/SexForm"
import TargetMuscleInput from "./pages/Intake Form/TargetMuscleForm"
import WeightInput from "./pages/Intake Form/WeightForm"
import WhyHereInput from "./pages/Intake Form/WhyHereForm"
import NavBar from "./pages/NavBar"
import Profile from "./pages/UserProfile"
import WorkoutPlanList from "./components/WorkoutPlanList"
import WelcomeScreen from "./pages/Intake Form/WelcomeScreen"
import NameForm from "./pages/Intake Form/NameForm"
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
						element={<BirthdayInput />}
					/>
					<Route
						path="/sex"
						element={<SexInput />}
					/>
					<Route
						path="/weight"
						element={<WeightInput />}
					/>
					<Route
						path="/why"
						element={<WhyHereInput />}
					/>
					<Route
						path="/goal"
						element={<GoalInput />}
					/>
					<Route
						path="/target"
						element={<TargetMuscleInput />}
					/>
					<Route
						path="/review"
						element={<ReviewIntake />}
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
