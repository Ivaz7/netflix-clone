import { useEffect } from "react";
import { useGetLoginStatusQuery } from "../../service/redux/API/firebaseDB";
import AuthScreen from "./authScreen/AuthScreen";
import UserOption from "./homeScreen/userOption";

const Home = () => { 
  const { data, isLoading, refetch } = useGetLoginStatusQuery(undefined, { refetchOnFocus: true });

  useEffect(() => {
    refetch();
  }, [data, refetch])

  if (isLoading) {
    return <div>Loading ... </div>
  }

  if (!data) {
    return <AuthScreen />;
  } else {
    return <UserOption />;
  };
}

export default Home;  