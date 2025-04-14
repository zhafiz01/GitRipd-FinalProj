import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NameForm from "./pages/Intake Form/NameForm"
import MuscleSelectorPage from "./pages/MuscleSelectorPage"
import AgeForm from "./pages/Intake Form/AgeForm"
import SexForm from "./pages/Intake Form/SexForm"
import WeightForm from "./pages/Intake Form/WeightForm"
import WhyHereForm from "./pages/Intake Form/WhyHereForm"
import GoalForm from "./pages/Intake Form/GoalForm"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameForm />} />
        <Route path="/age" element={<AgeForm />} />
        <Route path="/sex" element={<SexForm />} />
        <Route path="/weight" element={<WeightForm />} />
        <Route path="/whyhere" element={<WhyHereForm />} />
        <Route path="/goal" element={<GoalForm />} />
        <Route path="/select" element={<MuscleSelectorPage />} />
      </Routes>
    </Router>
  )
}

export default App