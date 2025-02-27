import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetDataQuery, useGetLoginStatusQuery } from "../../../../service/redux/API/firebaseDB";
import HeaderSetting from "./headerSetting";

const SettingsPage = () => {
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const { data: dataGet, isLoading: isLoadingDataGet } = useGetDataQuery();
  const [searchParam] = useSearchParams();
  const profile = searchParam.get("profile")
  const navigate= useNavigate();

  if (isLoadingStatus || isLoadingDataGet) {
    return <div>Loading ... </div>
  }

  if (!dataStatus) {
    navigate("/");
    return;
  }

  const userOptionArr = dataGet.userOption;
  const userSelected = userOptionArr[profile]

  console.log(userSelected)

  return (
    <>
      <div className="settingsContainer">
        <HeaderSetting dataGet={dataGet} profile={profile} />
      </div>
    </>
  )
}

export default SettingsPage;