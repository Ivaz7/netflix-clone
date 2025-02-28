import { signOut } from "firebase/auth";
import { auth } from "../../../backEndFireBase/firebaseConfig";
import { useSetUserSelectedBackMutation } from "../../../service/redux/API/firebaseDB";
import PropTypes from "prop-types";
import LoadingComp from "../../../components/loadingComp";

const HomeScreen = ({ refetchData, refetchStatus, dataGet, isLoadingDataGet }) => {
  const [triggerUserSelectedBack, { isLoading: isLoadingPushedData }] = useSetUserSelectedBackMutation();

  const user = dataGet.userOption[dataGet.userSelected];

  const { name, imgProfile } = user;

  if (isLoadingDataGet || isLoadingPushedData) {
    return <LoadingComp />
  }

  const handleClick = async () => {
    await triggerUserSelectedBack();
    await signOut(auth);
    await refetchData();
    await refetchStatus();
  }

  return (
    <div>
      <header>
        <h1>{name}</h1>
        <img className="imgProfile" src={`avatar/${imgProfile}`} alt="profile" />
      </header>

      <h1>Home Screen</h1>
      <button onClick={handleClick}>logOut</button>
    </div>
  );
}

HomeScreen.propTypes = {
  refetchData: PropTypes.func.isRequired,
  refetchStatus: PropTypes.func.isRequired,
  dataGet: PropTypes.object.isRequired,
  isLoadingDataGet: PropTypes.bool.isRequired,
};

export default HomeScreen;