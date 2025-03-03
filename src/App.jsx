import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signUp"
import Home from "./pages/home/home"
import Login from "./pages/login"
import UserManageProfile from "./pages/home/homeScreen/manageProfile/userManageProfile"
import SettingsPage from "./pages/home/homeScreen/settings/settingsPage"
import ProfileEditPage from "./pages/home/homeScreen/settings/profileEditPages"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/UserManageProfile" element={<UserManageProfile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/ProfileEdit" element={<ProfileEditPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
