import { useLocation } from "react-router-dom";
import { useGetDataQuery } from "../../service/redux/API/firebaseDB";
import AuthScreen from "./authScreen/AuthScreen";
import UserOption from "./homeScreen/userOption";
import { useEffect } from "react";

const Home = () => { 
  const { data, isLoading, refetch } = useGetDataQuery(undefined, { refetchOnFocus: true });
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location, refetch])

  if (isLoading) {
    return <div>Loading ... </div>
  }

  if (!data.loginStatus) {
    return <AuthScreen />;
  } else {
    return <UserOption />;
  };
}

export default Home;  