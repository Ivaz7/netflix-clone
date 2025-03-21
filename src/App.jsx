import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react" 
import SignUp from "./pages/signUp"
import Home from "./pages/home/home"
import Login from "./pages/login"
import UserManageProfile from "./pages/home/homeScreen/manageProfile/userManageProfile"
import SettingsPage from "./pages/settings/settingsPage"
import ProfileEditPage from "./pages/settings/profileEditPages"
import ChooseProfileIcon from "./pages/settings/chooseProfileIcon"
import NotFound from "./pages/404"
import Watch from "./pages/home/watch"
import AgeRestiction from "./pages/settings/ageRestrictionsPage"
import ViewingActivity from "./pages/settings/viewingActivity"
import ProfileLockSetting from "./pages/settings/profileLockSetting"

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
          <Route path="/watch" element={<Watch />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/settings/ProfileEdit" element={<ProfileEditPage />} />
          <Route path="/settings/ProfileEdit/ChooseProfileIcon" element={<ChooseProfileIcon />} />
          <Route path="/settings/AgeRestriction" element={<AgeRestiction />} />
          <Route path="/settings/viewingActivity" element={<ViewingActivity />} />
          <Route path="/settings/ProfileLock" element={<ProfileLockSetting />} />
        </Routes>
        <Analytics />
      </Router>
    </>
  )
}

export default App
