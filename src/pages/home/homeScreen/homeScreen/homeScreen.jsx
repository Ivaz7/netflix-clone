import { signOut } from "firebase/auth";
import { auth } from "../../../../backEndFireBase/firebaseConfig";
import { useSetChangedUserDataMutation } from "../../../../service/redux/API/firebaseDB";
import PropTypes from "prop-types";
import LoadingComp from "../../../../components/loadingComp";
import HeaderHome from "./header/headerHome";
import Footer from "../../../../components/footer";

const HomeScreen = ({ refetchData, refetchStatus, dataGet, isLoadingDataGet }) => {
  const [triggerChangedUserData, { isLoading: isLoadingPushedData }] = useSetChangedUserDataMutation();

  const user = dataGet.userOption[dataGet.userSelected];

  const { name, imgProfile } = user;

  if (isLoadingDataGet || isLoadingPushedData) {
    return <LoadingComp />
  }

  const handleClick = async () => {
    await triggerChangedUserData({ value: { userSelected: "empty" } });
    await signOut(auth);
    await refetchData();
    await refetchStatus();
  }

  return (
    <>
      <HeaderHome />

      <main className="homeScreen">
        <h1>{name}</h1>
        <img className="imgProfile" src={`avatar/${imgProfile}`} alt="profile" />
        <h1>Home Screen</h1>
        <button onClick={handleClick}>logOut</button>
      </main>

      <Footer />
    </>
  );
}

HomeScreen.propTypes = {
  refetchData: PropTypes.func.isRequired,
  refetchStatus: PropTypes.func.isRequired,
  dataGet: PropTypes.object.isRequired,
  isLoadingDataGet: PropTypes.bool.isRequired,
};

export default HomeScreen;