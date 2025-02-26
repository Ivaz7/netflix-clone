import PropTypes from "prop-types";
import SettingUserOption from "./settingUserOption";
import { useState } from "react";

const AddUserOption = ({ dataGet, refetchData }) => {
  const [isAdded, setIsAdded] = useState(false)

  const handleClick = () => {
    setIsAdded(prev => !prev)
  }

  return (
    <>
      <button className="addUserOptinBtn d-flex flex-column gap-3" onClick={handleClick}>
        <div className="addUserOptinBtn__upper">
          <div className="addUserOptinBtn__upper__insideVert"></div>
          <div className="addUserOptinBtn__upper__insideHorz"></div>
        </div>

        <h5>
          Add
        </h5>
      </button>
      {isAdded && <SettingUserOption dataGet={dataGet} setIsAdded={setIsAdded} refetchData={refetchData} />}
    </>
  )
}

AddUserOption.propTypes = {
  dataGet: PropTypes.object.isRequired,
  refetchData: PropTypes.func.isRequired,
}

export default AddUserOption;