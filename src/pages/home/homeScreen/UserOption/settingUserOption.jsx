import PropTypes from "prop-types";
import CustomFloatingComp from "../../../../components/customFloatingComp";
import { avatarList } from "../../../../data/avatarProfileArr";
import { useRef, useState } from "react";
import { useSetAddUserOptionMutation } from "../../../../service/redux/API/firebaseDB";
import { useClickOutside } from "../../../../customHooks/useClickOutside";
import ProfileImg from "../../../../components/profileImg";
import LoadingComp from "../../../../components/loadingComp";

const SettingUserOption = ({ dataGet, isAdded, setIsAdded, refetchData }) => {
  const userOptionArrLength = dataGet.userOption.length;
  const avatarImg = avatarList[userOptionArrLength];
  const userOptionArrName = dataGet.userOption.map(val => val.name);
  
  const [checkbox, setCheckbox] = useState(false)
  const [userName, setUserName] = useState("");
  const [validationUserName, setValidationUserName] = useState(false)
  const [warning, setWarning] = useState("");

  const mainRef = useRef(null);

  useClickOutside(mainRef, isAdded, setIsAdded);

  const [triggerSetAddUserOption, { isLoading }] = useSetAddUserOptionMutation();

  if (isLoading) {
    return <LoadingComp />
  }
  
  const handleChangeCheckbox = (e) => {
    setCheckbox(e.target.checked)
  }

  const handleCancel = () => {
    setIsAdded(prev => !prev)
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
  
    setValidationUserName(isInvalid);
  
    if (isInvalid) {
      return
    } else {
      await triggerSetAddUserOption({ imgProfile: avatarImg, name: userName, statusAge: checkbox })
      await refetchData();
      setIsAdded(prev => !prev);
    }; 
  };
  

  return (
    <CustomFloatingComp>
      <div ref={mainRef} className="settingUserOption">
        <header className="settingUserOption__header d-flex align-items-center justify-content-end">
          <button onClick={handleCancel} className="settingUserOption__header__button">
            <i className="fa-solid fa-x"></i>
          </button>
        </header>

        <main className="settingUserOption__main d-flex flex-column text-center">
          <h1>Add a profile</h1>

          <h6 className="pb-4">Add a profile for another person watching Netflix.</h6>

          <div className="d-flex align-items-center gap-4">
            <ProfileImg 
              avatarImg={avatarImg}
              scale={"5rem"}
            />

            <div className="flex-grow-1">
              <div className="form-floating">
                <input 
                  autoComplete="off"
                  name="Username"
                  type="text"
                  placeholder="Name" 
                  value={userName} 
                  className={`form-control text-white ${validationUserName ? "not-allowed-userName" : ""}`}
                  onChange={(e) => setUserName(e.target.value)}
                />

                <p className={`text-start input-warning input-allowed-${validationUserName ? "yes-userName" : "not"}`}><i className="fa-solid fa-triangle-exclamation"></i> {warning}</p>

                <label htmlFor="Username}">Name</label>
              </div>
            </div>
          </div>

          <div className="settingUserOption__main__br"></div>

          <div className="settingUserOption__main__kidsOption d-flex flex-row justify-content-between align-items-center">
            <div>
              <h5 className="text-start">Kids Profile</h5>
              
              <p className="text-start">Only see kid-friendly TV shows and movies</p>
            </div>

            <label className="switch">
              <input value={checkbox} onChange={handleChangeCheckbox} type="checkbox" />
              <span className="slider"></span>
              <span className="checklist"></span>
            </label>
          </div>

          <button onClick={handleSave} className="settingUserOption__main__btnSave">Save</button>

          <button onClick={handleCancel} className="settingUserOption__main__btnCancel">Cancel</button>
        </main>
      </div>
    </CustomFloatingComp>
  )
}

SettingUserOption.propTypes = {
  dataGet: PropTypes.object.isRequired,
  setIsAdded: PropTypes.func.isRequired,
  isAdded: PropTypes.bool.isRequired,
  refetchData: PropTypes.func.isRequired,
}

export default SettingUserOption;