import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetDataQuery, useGetLoginStatusQuery, useSetChangeUserOptionSelectedMutation } from "../../service/redux/API/firebaseDB";
import HeaderSetting from "./headerSetting";
import LoadingComp from "../../components/loadingComp";
import ProfileImg from "../../components/profileImg";
import { useEffect, useMemo, useRef, useState } from "react";

const ProfileLockSetting = () => {
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const { data: dataGet, isLoading: isLoadingDataGet, refetch } = useGetDataQuery();
  const [triggerChangeUserOptionSelected] = useSetChangeUserOptionSelectedMutation();
  const [searchParam] = useSearchParams();
  const indexUserOption = searchParam.get("indexUserOption");
  const navigate = useNavigate();

  const userOptionArr = dataGet?.userOption;
  const userSelectedData = dataGet?.userSelected;
  const userIndex = (userSelectedData !== "empty" ? userSelectedData : indexUserOption) || 0;
  const userOptionSelected = userOptionArr?.[userIndex];
  const statusAge = userOptionSelected?.statusAge;
  const imgProfile = userOptionSelected?.imgProfile;
  const name = userOptionSelected?.name;
  const pinSecurity = userOptionSelected?.pinSecurity;

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const inputRefs = useMemo(() => ([ref1, ref2, ref3, ref4]), []);
  const [inputPin, setInputPin] = useState(["", "", "", ""]);
  const [isNotValid, setIsNotValid] = useState(false);

  useEffect(() => {
    if (inputPin.every(val => val !== "")) {
      setIsNotValid(false);
    }
  }, [inputPin])

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [inputRefs]);

  const renderInput = inputPin.map((val, inx) => (
    <input
      key={inx}
      type="text"
      value={val}
      ref={inputRefs[inx]}
      onChange={(e) => handleChange(e, inx)}
      onKeyDown={(e) => handleKeyDown(e, inx)}
    />
  ));

  const handleChange = (e, inx) => {
    const value = e.target.value;

    if (/^\d?$/.test(value)) {
      setInputPin(prev => {
        const prevArr = [...prev];
        prevArr[inx] = value;
        return prevArr;
      });

      if (value && inx < inputRefs.length - 1) {
        inputRefs[inx + 1].current.focus();
      }
    }
  };
  
  const handleKeyDown = (e, inx) => {
    if (e.key === "Backspace" && inx > 0) {
      inputRefs[inx - 1].current.focus();
    }
  };

  const handleSave = async () => {
    if (inputPin.every(val => val !== "")) {
      await triggerChangeUserOptionSelected({
        index: userIndex,
        value: { pinSecurity: Number(inputPin.join("")) },
      });
      await refetch();      
      navigate(-1);
    } else {
      setIsNotValid(true);
    }
  }

  const handleDeletePin = async () => {
    await triggerChangeUserOptionSelected({
      index: userIndex,
      value: { pinSecurity: "empty" },
    });
    await refetch();      
    navigate(-1);
  }

  if (isLoadingStatus || isLoadingDataGet) {
    return <LoadingComp />;
  }

  if (!dataStatus) {
    navigate("/");
    return;
  }

  return (
    <div className="outerProfileLock">
      <div className="profileLockSetting d-flex flex-column align-items-center">
        <HeaderSetting dataGet={dataGet} indexUserOption={userIndex} />

        <main className="profileLockSetting__main  d-flex flex-column flex-lg-row align-items-start my-3">
          <button onClick={() => navigate(-1)} className="ageRestriction__main__backBtn">
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="profileLockSetting__main__content d-flex flex-column gap-3 mx-lg-auto">
            <h2 className="text-start mb-3 mb-md-4 mb-lg-5">
              {pinSecurity === "empty" ? "Add Profile Pin for" : "Delete Profile Pin for"}
            </h2>

            <div className="d-flex flex-row align-items-center gap-2 mb-4">
              <ProfileImg 
                avatarImg={imgProfile}
                scale={"3rem"}
                statusAge={statusAge}
                fontSizeKids={"1rem"}
                sizeShadow={"1px"}
              />

              <h4 className="m-0">
                {name}
              </h4>
            </div>

            {
              pinSecurity === "empty" 
              ? (
                <div className="profileLockSetting__main__content__off d-flex flex-column gap-4"> 
                  <div className="profileLockSetting__main__content__off__inputArr d-flex flex-row flex-wrap gap-4 justify-content-center">
                    {renderInput}
                  </div>

                  {isNotValid && 
                    <p className="m-0 text-center">
                      Please Enter every column of the PIN.
                    </p>
                  }

                  <button onClick={handleSave} id="btnSave" className="profileLockSetting__main__content__off__btnSave text-center">
                    Save
                  </button>

                  <button onClick={() => navigate(-1)} id="btnCancel" className="profileLockSetting__main__content__off__btnCancel text-center">
                    Never Mind
                  </button>
                </div>
              )
              : (
                <div className="profileLockSetting__main__content__on d-flex flex-column gap-4">
                  <div className="profileLockSetting__main__content__on__detail d-flex flex-row align-items-center justify-content-between">
                    <h3 className="m-0">
                      The Profile Pin is On
                    </h3>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="50" height="50" data-icon="LockStandard" aria-hidden="true" className="svg-icon svg-icon-profile-lock"><path fillRule="evenodd" clipRule="evenodd" d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6V7H19C20.1046 7 21 7.89543 21 9V18.6529C21 19.6274 20.2885 20.4855 19.2814 20.6076C18.0287 20.7593 15.492 21 12 21C8.50801 21 5.97128 20.7593 4.71855 20.6076C3.71153 20.4855 3 19.6274 3 18.6529V9C3 7.89543 3.89543 7 5 7H7V6ZM15 6V7H9V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6ZM5 9V18.627C6.19927 18.7708 8.63769 19 12 19C15.3623 19 17.8007 18.7708 19 18.627V9H5ZM11 12V16H13V12H11Z" fill="currentColor"></path></svg>
                  </div>  

                  <button onClick={handleDeletePin} id="deleteBtnPin" className="profileLockSetting__main__content__on__deleteBtnPin mt-5">
                    Delete This Profile Pin
                  </button>
                </div>
              )
            }
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProfileLockSetting;