import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { auth } from "../backEndFireBase/firebaseConfig";

const useAuthStatus = () => {
  const [user, setUser] = useState(false);
  const [isLoadingAuthStatus, setIsLoadingAuthStatus] = useState(true);

  useEffect(() => {
    const isLogin = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(true)
      } else {
        setUser(false)
      }

      setIsLoadingAuthStatus(false);
    })

    return () => isLogin();
  })

  return { user, isLoadingAuthStatus };
}

export default useAuthStatus;