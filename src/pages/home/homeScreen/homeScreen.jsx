import { signOut } from "firebase/auth";
import { auth } from "../../../backEndFireBase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    signOut(auth)
    navigate("/")
  }

  return (
    <div>
      <h1>Home Screen</h1>
      <button onClick={handleClick}>logOut</button>
    </div>
  );
}

export default HomeScreen;