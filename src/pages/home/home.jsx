import AuthScreen from "./authScreen/AuthScreen";
import HomeScreen from "./homeScreen";

const Home = () => { 
  const user = false;

  if (user) {
    return <HomeScreen />;
  } else {
    return <AuthScreen />
  };
}

export default Home;  