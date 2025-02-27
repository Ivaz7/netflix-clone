import { useSetChangedUserSelectedMutation } from "../../../../service/redux/API/firebaseDB";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import AddUserOption from "./addUserOption";
import { useState } from "react";
import SettingUserOption from "./settingUserOption";
import { useNavigate } from "react-router-dom";

const UserOption = ({ refetchData, refetchStatus, dataGet, isLoadingDataGet }) => {
  const [triggerChangedUserSelected, { isLoading: isLoadingPushedData }] = useSetChangedUserSelectedMutation();
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  
  if (isLoadingDataGet || isLoadingPushedData) {
    return <div>Loading ... </div>
  }

  const userOptionArr = dataGet.userOption;

  const renderUserOptionArr = userOptionArr.map((val, inx) => {
    const { name, statusAge, imgProfile } = val;

    return (
      <>
        <button className="userOption_btn d-flex flex-column gap-3" key={inx} onClick={() => handleUserSelected(inx)}>
          <div className="userOption__containerImgProfile">
            <img className="userOption__imgProfile" src={`avatar/${imgProfile}`} alt="profile" />
            {!statusAge || name === "Kids" ? null : <div className="userOption__containerImgProfile__statusAge">
              Kids
              <div className="userOption__containerImgProfile__statusAge__shadow"></div>
            </div>}
          </div>

          <h5>
            {name}
          </h5>
        </button>
      </>
    )
  })

  const handleUserSelected = async (inx) => {
    await triggerChangedUserSelected(inx);
    await refetchData();
    await refetchStatus();
  }

  const handleManageProfile = () => {
    navigate("/manageProfile")
  }

  return (
    <>
      {isAdded ? <SettingUserOption setIsAdded={setIsAdded} dataGet={dataGet} refetchData={refetchData} /> : <div className="userOption-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.2 }}
          className="userOption-container d-flex flex-column justify-content-center align-items-center gap-3 gap-sm-4"
        >
          <h1 className="text-center">Who&apos;s Watching?</h1>

          <div className="userOption d-flex flex-wrap flex-row gap-2 gap-sm-3 gap-md-4 ">
            {renderUserOptionArr}
            {userOptionArr.length < 5 && <AddUserOption setIsAdded={setIsAdded} />}
          </div>

          <button onClick={handleManageProfile} className="manageProfileBtn">
            <h5>
              Manage Profiles 
            </h5>
          </button>
        </motion.div>
      </div>}
    </>
  )
}

UserOption.propTypes = {
  refetchData: PropTypes.func.isRequired,
  refetchStatus: PropTypes.func.isRequired,
  dataGet: PropTypes.object.isRequired,
  isLoadingDataGet: PropTypes.bool.isRequired,
};

export default UserOption;