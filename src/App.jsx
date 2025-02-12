import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./pages/header"
import SignUp from "./pages/singUp"

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
