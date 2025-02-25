import { signOut } from "firebase/auth";
import { auth } from "../../../backEndFireBase/firebaseConfig";
import { useGetDataQuery, useSetUserSelectedBackMutation } from "../../../service/redux/API/firebaseDB";
import PropTypes from "prop-types";

const HomeScreen = ({ refecthData, refetchStatus }) => {
  const [triggerUserSelectedBack, { isLoading: isLoadingPushedData }] = useSetUserSelectedBackMutation();
  const { data: dataGet, isLoading: isLoadingDataGet } = useGetDataQuery();

  const user = dataGet.userOption[dataGet.userSelected];

  const { name, imgProfile } = user;

  if (isLoadingDataGet || isLoadingPushedData) {
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
      <header>
        <h1>{name}</h1>
        <img src={`avatar/${imgProfile}`} alt="profile" />
      </header>

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