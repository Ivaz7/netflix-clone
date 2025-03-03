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
    const { name, statusAge, imgProfile } = val;

    return (
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
    )
  })

  const handleUserSelected = async (inx) => {
    navigate(`/settings?profile=${inx}`)
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