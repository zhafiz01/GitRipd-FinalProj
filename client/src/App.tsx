import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NameForm from "./pages/Intake Form/NameForm"
import MuscleSelectorPage from "./pages/MuscleSelectorPage"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NameForm />} />
        <Route path="/select" element={<MuscleSelectorPage />} />
      </Routes>
    </Router>
  )
}

export default App