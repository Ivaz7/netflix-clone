import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetDataQuery, useGetLoginStatusQuery } from "../../../../service/redux/API/firebaseDB";
import LoadingComp from "../../../../components/loadingComp";
import HeaderSetting from "./headerSetting";

const ProfileEditPage = () => {
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const { data: dataGet, isLoading: isLoadingDataGet } = useGetDataQuery();
  const [searchParms] = useSearchParams();
  const indexUserOption = searchParms.get("indexUserOption");
  const navigate = useNavigate();
  
  if (isLoadingStatus || isLoadingDataGet) {
    return <LoadingComp />
  }

  if (!dataStatus) {
    navigate("/");
    return;
  }

  const userOptionArr = dataGet.userOption;
  const userSelectedData = dataGet.userSelected;


  if (!indexUserOption && userSelectedData === "empty") {
    navigate("/");
    return;
  }

  const userOptionSelected = userOptionArr[userSelectedData !== "empty" && userSelectedData || indexUserOption];
  const { imgProfile } = userOptionSelected;

  console.log(imgProfile)

  return (
    <div className="profileEditPage d-flex flex-column align-items-center">
      <HeaderSetting dataGet={dataGet} indexUserOption={indexUserOption} />

      <main className="profileEditPage__main d-flex flex-column flex-lg-row align-items-start my-3">
        <Link to={`/settings?indexUserOption=${indexUserOption}`}>
          <button className="profileEditPage__main__backBtn">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>
      
        <div className="profileEditPage__main__contentContainer mx-lg-auto">
          <h2 className="text-start mb-3 mb-md-4 mb-lg-5">
            Edit Profile
          </h2>
        </div>
      </main>
    </div>
  )
}

export default ProfileEditPage;