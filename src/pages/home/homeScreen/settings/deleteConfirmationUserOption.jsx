import PropTypes from "prop-types";
import { useGetDataQuery, useSetDeleteUserOptionMutation } from '../../../../service/redux/API/firebaseDB';
import { useNavigate } from "react-router-dom";
import CustomFloatingComp from "../../../../components/customFloatingComp";
import LoadingComp from "../../../../components/loadingComp";
import { useClickOutside } from "../../../../customHooks/useClickOutside";
import { useRef } from "react";
import ProfileImg from "../../../../components/profileImg";

const DeleteConfirmationUserOption = ({ isDelete, setIsDelete, index }) => {
  const [triggerDeleteUserOption, { isLoading: isLoadingDelete }] = useSetDeleteUserOptionMutation();
  const { data, isLoading: isLoadingDataGet } = useGetDataQuery();
  const navigate = useNavigate();
  const deleteRef = useRef(null);

  useClickOutside(deleteRef, isDelete, setIsDelete);

  const userOptionArr = data.userOption;
  const userOptionSelected = userOptionArr[index];
  const { imgProfile, statusAge, name } = userOptionSelected;

  if (isLoadingDataGet || isLoadingDelete) {
    return (
      <CustomFloatingComp>
        <LoadingComp />
      </CustomFloatingComp>
    )
  }

  const handleDelete = async () => {
    await triggerDeleteUserOption({ index: index });
    navigate(-1);
  } 

  return (
    <CustomFloatingComp>
      <div ref={deleteRef} className="deleteConfirmation">
        <header className="deleteConfirmation__header d-flex align-items-center justify-content-end">
          <button onClick={() => setIsDelete(prev => !prev)} className="deleteConfirmation__header__btn">
            <i className="fa-solid fa-x"></i>
          </button>
        </header>

        <div className="outerMainContainer">
          <main className="deleteConfirmation__main d-flex flex-column gap-4 text-center">
            <h1 className="m-0">Delete Profile?</h1>

            <div className="d-flex justify-content-center align-items-center">
              <ProfileImg 
                avatarImg={imgProfile}
                scale={"clamp(5rem, 2vw + 1rem, 9rem)"}
                statusAge={statusAge}
                fontSizeKids={"1.7rem"}
                sizeShadow={"1.5px"}
              />
            </div>

            <h5 className="m-0">{name}</h5>

            <p className="m-0">
              This profile&apos;s history - including My List, ratings and activity - will be gone forever, and you won&apos;t be able to access it again.
            </p>

            <div className="deleteConfirmation__main__br"></div>

            <div className="d-flex flex-column gap-2">
              <button id="deleteBtn" className="deleteConfirmation__main__deleteBtn" onClick={handleDelete}>Delete Profile</button>

              <button className="deleteConfirmation__main__cancelBtn" onClick={() => setIsDelete(prev => !prev)}>Never Mind</button>
            </div>
          </main>
        </div>
      </div>
    </CustomFloatingComp>
  )
}

DeleteConfirmationUserOption.propTypes = {
  isDelete: PropTypes.bool,
  setIsDelete: PropTypes.func,
  index: PropTypes.number,
}

export default DeleteConfirmationUserOption;