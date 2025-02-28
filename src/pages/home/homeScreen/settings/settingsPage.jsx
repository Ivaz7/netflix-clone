import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetDataQuery, useGetLoginStatusQuery } from "../../../../service/redux/API/firebaseDB";
import HeaderSetting from "./headerSetting";
import ContentSettingPage from "./contentSettingsPage";
import Footer from "../../../../components/footer";
import ProfileImg from "../../../../components/profileImg";
import LoadingComp from "../../../../components/loadingComp";

const SettingsPage = () => {
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const { data: dataGet, isLoading: isLoadingDataGet } = useGetDataQuery();
  const [searchParam] = useSearchParams();
  const profile = searchParam.get("profile")
  const navigate= useNavigate();

  if (isLoadingStatus || isLoadingDataGet) {
    return <LoadingComp />
  }

  if (!dataStatus) {
    navigate("/");
    return;
  }

  const userOptionArr = dataGet.userOption;
  const userOptionSelected = userOptionArr[profile];
  const avatarImg = userOptionSelected.imgProfile;
  const name = userOptionSelected.name;
  const statusAge = userOptionSelected.statusAge;

  return (
    <>
      <div className="settingsContainer d-flex flex-column align-items-center">
        <HeaderSetting dataGet={dataGet} profile={profile} />

        <main className="settingsContainer__main d-flex flex-column flex-lg-row align-items-start my-3">
          <Link to={"/UserManageProfile"}>            
            <button className="settingsContainer__main__backBtn">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </Link>

          <div className="settingsContainer__main__contentContainer mx-lg-auto">
            <h2 className="mb-3 mb-md-4 mb-lg-5">
              Manage Profile and History
            </h2>

            <div className="settingsContainer__main__contentContainer__contentBox d-flex flex-column gap-2">
              <ContentSettingPage 
                leftSideImg={
                  <ProfileImg 
                    avatarImg={avatarImg}
                    scale={"30px"}
                    statusAge={statusAge}
                    fontSizeKids={"6px"}
                    sizeShadow={"0.5px"}
                  />
                }
                textTop={name}
                textBottom="Edit personal Profile"
              />

              <div className="settingsContainer__main__contentContainer__br"></div>

              <ContentSettingPage 
                leftSideImg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="LockStandard"  aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6V7H19C20.1046 7 21 7.89543 21 9V18.6529C21 19.6274 20.2885 20.4855 19.2814 20.6076C18.0287 20.7593 15.492 21 12 21C8.50801 21 5.97128 20.7593 4.71855 20.6076C3.71153 20.4855 3 19.6274 3 18.6529V9C3 7.89543 3.89543 7 5 7H7V6ZM15 6V7H9V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6ZM5 9V18.627C6.19927 18.7708 8.63769 19 12 19C15.3623 19 17.8007 18.7708 19 18.627V9H5ZM11 12V16H13V12H11Z" fill="currentColor"></path></svg>}
                textTop="Profile Lock"
                textBottom="Add personal pin to this Profile"
              />

              <div className="settingsContainer__main__contentContainer__br"></div>

              <ContentSettingPage 
                leftSideImg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="HexagonExclamationPointStandard" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M2.76237 12.0001L7.38117 20.0001H16.6188L21.2376 12.0001L16.6188 4.00006H7.38117L2.76237 12.0001ZM0.74164 11.5001C0.563008 11.8095 0.563008 12.1907 0.741641 12.5001L5.93779 21.5001C6.11643 21.8095 6.44655 22.0001 6.80382 22.0001H17.1961C17.5534 22.0001 17.8835 21.8095 18.0621 21.5001L23.2583 12.5001C23.4369 12.1907 23.4369 11.8095 23.2583 11.5001L18.0621 2.50006C17.8835 2.19066 17.5534 2.00006 17.1961 2.00006H6.80382C6.44655 2.00006 6.11643 2.19066 5.93779 2.50006L0.74164 11.5001ZM13.5001 15.5C13.5001 16.3285 12.8285 17 12.0001 17C11.1716 17 10.5001 16.3285 10.5001 15.5C10.5001 14.6716 11.1716 14 12.0001 14C12.8285 14 13.5001 14.6716 13.5001 15.5ZM13.5001 7.00002H10.5001L11.0001 13H13.0001L13.5001 7.00002Z" fill="currentColor"></path></svg>}
                textTop="Viewing restrictions"
                textBottom="Edit maturity rate and title restrictions"
              />

              <div className="settingsContainer__main__contentContainer__br"></div>

              <ContentSettingPage 
                leftSideImg={<svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="WatchlistStandard" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.29981 2 5.0672 4.00995 3.33754 7H7V9H1C0.447715 9 0 8.55228 0 8V2H2V5.36482C4.14922 2.13204 7.8248 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12H2C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11 5V12V12.4142L11.2929 12.7071L14.2929 15.7071L15.7071 14.2929L13 11.5858V5H11Z" fill="currentColor"></path></svg> }
                textTop="Viewing activity"
                textBottom="Manage viewing history and ratings"
              />
            </div>
          </div>
        </main>
      </div>

      <Footer type={true} />
    </>
  )
}

export default SettingsPage;