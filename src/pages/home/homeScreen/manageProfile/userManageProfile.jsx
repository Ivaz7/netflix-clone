import { useGetDataQuery, useGetLoginStatusQuery } from "../../../../service/redux/API/firebaseDB";
import { motion } from "framer-motion";
import AddUserOption from "../UserOption/addUserOption";
import { useState } from "react";
import SettingUserOption from "../UserOption/settingUserOption";
import { useNavigate } from "react-router-dom";
import ProfileImg from "../../../../components/profileImg";
import LoadingComp from "../../../../components/loadingComp";

const UserManageProfile = () => {
  const { data: dataGet, isLoading: isLoadingDataGet, refetch: refetchData } = useGetDataQuery();
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();

  const [touchIndex, setTouchIndex] = useState(null)

  if (isLoadingStatus || isLoadingDataGet) {
    return <LoadingComp />
  }

  if (!dataStatus) {
    navigate("/")
    return;
  }

  const userOptionArr = dataGet.userOption;

  const renderUserOptionArr = userOptionArr.map((val, inx) => {
    const { name, statusAge, imgProfile, pinSecurity } = val;

    return (
      <div className="userOptionContainerbtn d-flex flex-column align-items-center justify-content-between" key={name}>
        <button className="userOption_btn d-flex flex-column gap-3" key={inx} onMouseEnter={() => setTouchIndex(inx)} onMouseLeave={() => setTouchIndex(null)} onClick={() => handleUserSelected(inx)}>
          <ProfileImg 
            avatarImg={imgProfile}
            scale={"clamp(5rem, 10vw + 1rem, 10rem)"}
            name={name}
            statusAge={statusAge}
            fontSizeKids={"clamp(0.9rem, 2vw + 0.2rem, 1.5rem)"}
            iconFontSize={"clamp(1rem, 2vw + 0.9rem, 2.5rem)"}
            touch={touchIndex === inx}
            isUserManager={true}
            sizeShadow={"1.5px"}
          />

          <h5>
            {name}
          </h5>
        </button>

        {pinSecurity !== "empty" && <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="LockStandard" aria-hidden="true" className="svg-icon svg-icon-profile-lock"><path fillRule="evenodd" clipRule="evenodd" d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6V7H19C20.1046 7 21 7.89543 21 9V18.6529C21 19.6274 20.2885 20.4855 19.2814 20.6076C18.0287 20.7593 15.492 21 12 21C8.50801 21 5.97128 20.7593 4.71855 20.6076C3.71153 20.4855 3 19.6274 3 18.6529V9C3 7.89543 3.89543 7 5 7H7V6ZM15 6V7H9V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6ZM5 9V18.627C6.19927 18.7708 8.63769 19 12 19C15.3623 19 17.8007 18.7708 19 18.627V9H5ZM11 12V16H13V12H11Z" fill="currentColor"></path></svg></div>}
      </div>
    )
  })

  const handleUserSelected = async (inx) => {
    navigate(`/settings?indexUserOption=${inx}`)
  }

  const handleDone = () => {
    navigate("/")
  }

  return (
    <>
      {isAdded ? <SettingUserOption isAdded={isAdded} setIsAdded={setIsAdded} dataGet={dataGet} refetchData={refetchData} /> : <div className="userOption-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.2 }}
          className="userOption-container d-flex flex-column justify-content-center align-items-center gap-3 gap-sm-4"
        >
          <h1 className="text-center">Manage Profile:</h1>

          <div className="userOption d-flex justify-content-center flex-wrap flex-row gap-2 gap-sm-3 gap-md-4 ">
            {renderUserOptionArr}
            {userOptionArr.length < 5 && <AddUserOption setIsAdded={setIsAdded} />}
          </div>

          <button onClick={handleDone} className="doneManageProfileBtn">
            <h5>
              Done 
            </h5>
          </button>
        </motion.div>
      </div>}
    </>
  )
}

export default UserManageProfile;