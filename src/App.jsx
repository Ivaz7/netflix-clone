import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./pages/header"
import SignUp from "./pages/singUp"
import Home from "./pages/home"
import Login from "./pages/login"

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
