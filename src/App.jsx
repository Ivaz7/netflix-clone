import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signUp"
import Home from "./pages/home/home"
import Login from "./pages/login"
import UserManageProfile from "./pages/home/homeScreen/manageProfile/userManageProfile"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/manageProfile" element={<UserManageProfile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
