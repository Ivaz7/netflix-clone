import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signUp"
import Home from "./pages/home/home"
import Login from "./pages/login"
import UserManageProfile from "./pages/home/homeScreen/manageProfile/userManageProfile"
import SettingsPage from "./pages/home/homeScreen/settings/settingsPage"
import ProfileEditPage from "./pages/home/homeScreen/settings/profileEditPages"
import ChooseProfileIcon from "./pages/home/homeScreen/settings/chooseProfileIcon"
import NotFound from "./pages/404"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/UserManageProfile" element={<UserManageProfile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/ProfileEdit" element={<ProfileEditPage />} />
          <Route path="/settings/ProfileEdit/ChooseProfileIcon" element={<ChooseProfileIcon />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
