import { useEffect, useState } from "react";
import { auth } from "../../backEndFireBase/firebaseConfig";
import AuthScreen from "./authScreen/AuthScreen";
import HomeScreen from "./homeScreen";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => { 
  const [user, setUser] = useState(false);

  useEffect(() => {
    const isLogin = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(true)
      } else {
        setUser(false)
      }
    })

    return () => isLogin();
  })


  if (user) {
    return <HomeScreen />;
  } else {
    return <AuthScreen />
  };
}

export default Home;  