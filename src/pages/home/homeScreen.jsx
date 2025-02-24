import { signOut } from "firebase/auth";
import { auth } from "../../backEndFireBase/firebaseConfig";

const HomeScreen = () => {
  const handleClick = () => {
    signOut(auth)
  }

  return (
    <div>
      <h1>Home Screen</h1>
      <button onClick={handleClick}>logOut</button>
    </div>
  );
}

export default HomeScreen;