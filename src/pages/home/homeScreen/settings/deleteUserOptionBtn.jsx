import PropTypes from "prop-types";
import { useState } from "react";
import DeleteConfirmationUserOption from "./deleteConfirmationUserOption";

const DeleteUserOptionBtn = ({ index }) => {
  const [isDelete, setIsDelete] = useState(false);

  return (
    <>
      <button onClick={() => setIsDelete(prev => !prev)} className="deleteProfileBtn d-flex flex-row gap-2 justify-content-center align-items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="TrashCanStandard" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M8 1C8 0.447715 8.44772 0 9 0H15C15.5523 0 16 0.447715 16 1V4.08219C18.0818 4.16816 20.121 4.32057 22.1072 4.53473L21.8928 6.5232C18.7222 6.18133 15.4092 6 12 6C8.59081 6 5.27788 6.18133 2.10723 6.5232L1.89282 4.53473C3.87899 4.32057 5.91826 4.16816 8 4.08219V1ZM14 4H12H10V2H14V4ZM18 22V8.19405C18.6723 8.23795 19.3391 8.28911 20 8.34733V22C20 23.1046 19.1046 24 18 24H6C4.89543 24 4 23.1046 4 22V8.34733C4.66087 8.28911 5.32767 8.23795 6 8.19405V22H18ZM9 20V9H11V20H9ZM13 9V20H15V9H13Z" fill="currentColor"></path></svg>

        <h5 className="m-0">
          Delete Profile
        </h5>
      </button>
      {isDelete && <DeleteConfirmationUserOption isDelete={isDelete} setIsDelete={setIsDelete} index={index} />}
    </>
  )
}

DeleteUserOptionBtn.propTypes = {
  index: PropTypes.number,
}

export default DeleteUserOptionBtn;