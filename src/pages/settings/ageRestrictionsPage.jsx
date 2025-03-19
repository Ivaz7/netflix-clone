import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingComp from "../../components/loadingComp";
import {
  useGetDataQuery,
  useGetLoginStatusQuery,
  useSetChangeUserOptionSelectedMutation
} from "../../service/redux/API/firebaseDB";
import HeaderSetting from "./headerSetting";
import { useState, useEffect } from "react";

const AgeRestiction = () => {
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const { data: dataGet, isLoading: isLoadingDataGet, refetch } = useGetDataQuery();
  const [triggerChangeUserOptionSelected] = useSetChangeUserOptionSelectedMutation();
  const [searchParam] = useSearchParams();
  const indexUserOption = searchParam.get("indexUserOption");
  const navigate = useNavigate();
  const [age, setAge] = useState(false);

  const userOptionArr = dataGet?.userOption;
  const userSelectedData = dataGet?.userSelected;
  const userIndex = (userSelectedData !== "empty" ? userSelectedData : indexUserOption) || 0;
  const userOptionSelected = userOptionArr?.[userIndex];
  const statusAge = userOptionSelected?.statusAge;

  useEffect(() => {
    if (statusAge !== undefined) {
      setAge(statusAge);
    }
  }, [statusAge]);

  const handleSave = async () => {
    if (statusAge !== age) {
      await triggerChangeUserOptionSelected({
        index: userIndex,
        value: { statusAge: age },
      });
      await refetch();      
      navigate("/settings");
    }
  }

  const handleCancel = () => {
    navigate("/settings");
  }

  if (isLoadingStatus || isLoadingDataGet) {
    return <LoadingComp />;
  }

  if (!dataStatus) {
    navigate("/");
    return;
  }

  return (
    <div className="outerAgeRestrictionContainer">
      <div className="ageRestriction d-flex flex-column align-items-center">
        <HeaderSetting dataGet={dataGet} indexUserOption={userIndex} />

        <main className="ageRestriction__main d-flex flex-column flex-lg-row align-items-start my-3">
          <button onClick={() => navigate(-1)} className="ageRestriction__main__backBtn">
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <div className="ageRestriction__main__content d-flex flex-column gap-3 mx-lg-auto">
            <h2 className="text-start mb-3 mb-md-4 mb-lg-5">
              Change Age Restriction
            </h2>

            <div className="d-flex flex-row gap-2 mb-4">
              <label className="switch">
                <input checked={age} value={age} onChange={() => setAge(prev => !prev)} type="checkbox" />
                <span className="slider"></span>
                <span className="checklist"></span>
              </label>

              <h3 className="m-0">
                Kids Friendly Shows
              </h3>
            </div>

            <button onClick={handleSave} id="btnSave" className="ageRestriction__btnSave text-center">
              Save
            </button>

            <button onClick={handleCancel} id="btnCancel" className="ageRestriction__btnCancel text-center">
              Never Mind
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AgeRestiction;
