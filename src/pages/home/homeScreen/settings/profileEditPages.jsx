import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetDataQuery, useGetLoginStatusQuery, useSetChangeUserOptionSelectedMutation } from "../../../../service/redux/API/firebaseDB";
import LoadingComp from "../../../../components/loadingComp";
import HeaderSetting from "./headerSetting";
import ProfileImg from "../../../../components/profileImg";
import InputForm from "../../../../components/inputForm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAvatarImgData, setUserName } from "../../../../service/redux/API/profileEditSlice";

const ProfileEditPage = () => {
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const { data: dataGet, isLoading: isLoadingDataGet, refetch } = useGetDataQuery();
  const [triggerChangeUserOptionSelected, { isLoading: isLoadingChange }] = useSetChangeUserOptionSelectedMutation();
  const [searchParms] = useSearchParams();
  const indexUserOption = searchParms.get("indexUserOption");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const avatarImgData = useSelector((state) => state.profileEdit.avatarImgData);
  const userName = useSelector((state) => state.profileEdit.userName);

  const [validation, setValidation] = useState({
    userName: false
  })
  const [warning, setWarning] = useState("");

  const [hover, setHover] = useState(false);
  
  if (isLoadingStatus || isLoadingDataGet || isLoadingChange) {
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
  
  const userOptionSelected = userOptionArr[userSelectedData !== "empty" ? userSelectedData : indexUserOption];
  const { imgProfile, statusAge, name } = userOptionSelected;
  const userOptionArrName = dataGet.userOption.map(val => val.name !== name);

  if (!userName && userOptionSelected?.name) {
    dispatch(setUserName(userOptionSelected.name));
  }

  const handleProfileImgChange = () => {
    navigate(`/settings/ProfileEdit/ChooseProfileIcon?indexUserOption=${indexUserOption}`);
  }

  const handleCancel = () => {
    navigate(`/settings/?indexUserOption=${indexUserOption}`)
  }

  const handleSave = async () => {
    let isInvalid = false;
  
    if (userName.length < 1) {
      setWarning("Please enter a Name");
      isInvalid = true;
    } else if (userOptionArrName.includes(userName)) {
      setWarning("This name is already in use. Select another name and try again.");
      isInvalid = true;
    }
  
    setValidation((prev) => ({ ...prev, userName: isInvalid}));
  
    if (isInvalid) {
      return;
    } else {         
      handleReset();
      const respone = await triggerChangeUserOptionSelected({ index: indexUserOption, value: { imgProfile: avatarImgData || imgProfile, name: userName || name } })
      console.log(respone)
      await refetch();
      navigate(`/settings/?indexUserOption=${indexUserOption}`)
    }; 
  };

  const handleReset = () => {
    dispatch(setUserName(""));
    dispatch(setAvatarImgData(""));
  }

  return (
    <div className="profileEditPage d-flex flex-column align-items-center">
      <HeaderSetting dataGet={dataGet} indexUserOption={userSelectedData !== "empty" ? userSelectedData : indexUserOption} />

      <main className="profileEditPage__main d-flex flex-column flex-lg-row align-items-start my-3">
        <Link to={`/settings?indexUserOption=${indexUserOption}`}>
          <button onClick={handleReset} className="profileEditPage__main__backBtn">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>
      
        <div className="profileEditPage__main__contentContainer d-flex flex-column gap-3 mx-lg-auto">
          <h2 className="text-start mb-3 mb-md-4 mb-lg-5">
            Edit Profile
          </h2>

          <div className="profileEditPage__main__newInputProfile d-flex flex-row align-items-center gap-3 mx-lg-auto">
            <button onClick={handleProfileImgChange} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="profileEditPage__main__newInputProfile__profileIcon align-self-center">
              <ProfileImg 
                avatarImg={avatarImgData || imgProfile}
                scale={"7rem"}
                statusAge={statusAge}
                isUserManager={true}
                fontSizeKids={"1.2rem"}
                iconFontSize={"2rem"}
                sizeShadow={"1.5px"}
                touch={hover}
              />
            </button>

            <div className="flex-grow-1">
              <InputForm 
                name="userName"
                placeholder="Name"
                type="text"
                userName={userName}
                warning={warning}
                setWarning={setWarning}
                setUserName={setUserName}
                validation={validation}
                setValidation={setValidation}
                arrayCheck={userOptionArrName}
                whiteVer={true}
              />
            </div>
          </div>

          <button onClick={handleSave} id="btnSave" className="profileEditPage__main__btnSave text-center">Save</button>

          <button onClick={() => { handleCancel(); handleReset(); }} id="btnCancel" className="profileEditPage__main__btnCancel text-center">Cancel</button>
        </div>
      </main>
    </div>
  )
}

export default ProfileEditPage;