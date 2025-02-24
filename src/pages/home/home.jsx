import AuthScreen from "./authScreen/AuthScreen";
import HomeScreen from "./homeScreen";
import useAuthStatus from "../../customHooks/authStatus";

const Home = () => { 
  const { user, isLoadingAuthStatus: isLoading } = useAuthStatus();

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (user) {
    return <HomeScreen />;
  } else {
    return <AuthScreen />
  };
}

export default Home;  