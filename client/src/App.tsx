// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import NameForm from "./pages/Intake Form/NameForm"
// import MuscleSelectorPage from "./pages/MuscleSelectorPage"

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<NameForm />} />
//         <Route path="/select" element={<MuscleSelectorPage />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App

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

function App() {
	return (
		<>
			<Header />
			<br />
			<br />
			<div className="content-wrapper">
				<Routes>
					<Route
						path="/intake/welcome-screen"
						element={<WelcomeScreen />}
					/>
					<Route
						path="/intake/name"
						element={<NameForm />}
					/>
					<Route
						path="/intake/age"
						element={<BirthdayInput />}
					/>
					<Route
						path="/intake/sex"
						element={<SexInput />}
					/>
					<Route
						path="/intake/weight"
						element={<WeightInput />}
					/>
					<Route
						path="/intake/why"
						element={<WhyHereInput />}
					/>
					<Route
						path="/intake/goal"
						element={<GoalInput />}
					/>
					<Route
						path="/intake/muscle"
						element={<TargetMuscleInput />}
					/>
					<Route
						path="/intake/review"
						element={<ReviewIntake />}
					/>
					<Route
						path="/profile"
						element={<Profile />}
					/>
					<Route
						path="/"
						element={<Dashboard />}
					/>
					<Route
						path="/workout-plan"
						element={
							<WorkoutPlanList
								exercises={[]}
								addToCart={function (): void {}}
							/>
						}
					/>
					<Route
						path="/add-workout"
						element={<AddWorkout onSubmit={function (): void {}} />}
					/>
				</Routes>
			</div>
			<NavBar />
		</>
	)
}

export default App
