import PropTypes from "prop-types";
import CustomFloatingComp from "../../../../components/customFloatingComp";
import { avatarList } from "../../../../data/avatarProfileArr";
import { useRef, useState } from "react";
import { useSetAddUserOptionMutation } from "../../../../service/redux/API/firebaseDB";
import { useClickOutside } from "../../../../customHooks/useClickOutside";
import ProfileImg from "../../../../components/profileImg";
import LoadingComp from "../../../../components/loadingComp";
import InputForm from "../../../../components/inputForm";

const SettingUserOption = ({ dataGet, isAdded, setIsAdded, refetchData }) => {
  const userOptionArrLength = dataGet.userOption.length;
  const avatarImg = avatarList[userOptionArrLength];
  const userOptionArrName = dataGet.userOption.map(val => val.name);
  
  const [checkbox, setCheckbox] = useState(false)
  const [userName, setUserName] = useState("");
  const [validation, setValidation] = useState({
    userName: false
  })
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
  
    setValidation((prev) => ({ ...prev, userName: isInvalid}));
  
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

        <div className="outerMainContainer">
          <main className="settingUserOption__main d-flex flex-column text-center">
            <h1>Add a profile</h1>

            <h6 className="pb-4">Add a profile for another person watching Netflix.</h6>

            <div className="d-flex align-items-lg-center align-items-none justify-content-center flex-lg-row flex-column gap-lg-4 gap-3 mb-2 mb-lg-0">
              <div className="align-self-center">
                <ProfileImg 
                  avatarImg={avatarImg}
                  scale={"4rem"}
                />
              </div>

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
                />
              </div>
            </div>

            <div className="settingUserOption__main__br d-none d-lg-block"></div>

            <div className="settingUserOption__main__kidsOption d-flex flex-row justify-content-between align-items-center">
              <div className="settingUserOption__main__kidsOption__text d-flex flex-column">
                <h5 className="text-start">Kids Profile</h5>
                
                <p className="text-start">Only see kid-friendly TV shows and movies</p>
              </div>

              <div className="flex-grow-1 d-flex justify-content-end">
                <label className="switch">
                  <input value={checkbox} onChange={handleChangeCheckbox} type="checkbox" />
                  <span className="slider"></span>
                  <span className="checklist"></span>
                </label>
              </div>
            </div>

            <button onClick={handleSave} className="settingUserOption__main__btnSave">Save</button>

            <button onClick={handleCancel} className="settingUserOption__main__btnCancel">Cancel</button> 
          </main>
        </div>
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