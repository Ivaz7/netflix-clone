import { signOut } from "firebase/auth";
import { auth } from "../../../backEndFireBase/firebaseConfig";
import { useSetUserSelectedBackMutation } from "../../../service/redux/API/firebaseDB";
import PropTypes from "prop-types";

const HomeScreen = ({ refecthData, refetchStatus }) => {
  const [triggerUserSelectedBack, { isLoading: isLoadingPushedData }] = useSetUserSelectedBackMutation();

  if (isLoadingPushedData) {
    return <div>Loading ... </div>
  }

  const handleClick = async () => {
    await triggerUserSelectedBack();
    await signOut(auth);
    await refecthData();
    await refetchStatus();
  }

  return (
    <div>
      <h1>Home Screen</h1>
      <button onClick={handleClick}>logOut</button>
    </div>
  );
}

HomeScreen.propTypes = {
  refecthData: PropTypes.func.isRequired,
  refetchStatus: PropTypes.func.isRequired,
};

export default HomeScreen;