import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetDataQuery, useGetLoginStatusQuery } from "../../service/redux/API/firebaseDB";
import LoadingComp from "../../components/loadingComp";
import HeaderSetting from "./headerSetting";
import { avatarList } from "../../data/avatarProfileArr";
import ProfileImg from "../../components/profileImg";
import { useDispatch } from "react-redux";
import { setAvatarImgData } from "../../service/redux/API/profileEditSlice";
import Footer from "../../components/footer";

const ChooseProfileIcon = () => {
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const { data: dataGet, isLoading: isLoadingDataGet } = useGetDataQuery();
  const [searchParms] = useSearchParams();
  const indexUserOption = searchParms.get("indexUserOption");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoadingStatus || isLoadingDataGet) {
    return <LoadingComp />
  }

  if (!dataStatus) {
    navigate("/");
    return;
  }

  const userSelectedData = dataGet.userSelected;

  const renderAvatarButton = avatarList.map((val, inx) => (
    <button   
      className="chooseProfileIcon__main__contentContainer__btnProfileContainer__btn" 
      key={inx}
      onClick={() => handleProfileChange(val)}
    >
      <ProfileImg 
        avatarImg={val}
        scale={"5rem"}
      />
    </button>
  ))

  const handleProfileChange = (val) => {
    dispatch(setAvatarImgData(val));
    navigate(`/settings/ProfileEdit?indexUserOption=${indexUserOption}`)
  }

  return (
    <>
      <div className="chooseProfileIcon d-flex flex-column align-items-center">
        <HeaderSetting dataGet={dataGet}  indexUserOption={(userSelectedData !== "empty" ? userSelectedData : indexUserOption) || 0} />

        <main className="chooseProfileIcon__main d-flex flex-column flex-lg-row align-items-start my-3">
          <button onClick={() => navigate(-1)} className="chooseProfileIcon__main__backBtn">
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="chooseProfileIcon__main__contentContainer d-flex flex-column gap-3 mx-lg-auto">
            <h2 className="text-start mb-2 mb-md-3 mb-lg-4">
              Choose Profile Icon
            </h2>

            <div className="chooseProfileIcon__main__contentContainer__btnProfileContainer d-flex flex-wrap gap-3">
              {renderAvatarButton}
            </div>
          </div>
        </main>
      </div>
    
      <Footer type={true} />
    </>
  )
}

export default ChooseProfileIcon;