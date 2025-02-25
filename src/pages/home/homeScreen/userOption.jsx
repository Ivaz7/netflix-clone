import { useSetChangedUserSelectedMutation, useGetDataQuery } from "../../../service/redux/API/firebaseDB";
import PropTypes from "prop-types";

const UserOption = ({ refecthData, refetchStatus }) => {
  const { data: dataGet, isLoading: isLoadingDataGet } = useGetDataQuery();
  const [triggerChangedUserSelected, { isLoading: isLoadingPushedData }] = useSetChangedUserSelectedMutation();
  
  if (isLoadingDataGet || isLoadingPushedData) {
    return <div>Loading ... </div>
  }

  const userOptionArr = dataGet.userOption;

  const renderUserOptionArr = userOptionArr.map((val, inx) => {
    const { name, statusAge, imgProfile } = val;

    return (
      <button key={inx} onClick={() => handleClick(inx)}>
        <img className="imgProfile" src={`avatar/${imgProfile}`} alt="profile" />

        <div>
          {name}, {statusAge ? "18+" : "18-"}
        </div>
      </button>
    )
  })

  const handleClick = async (inx) => {
    await triggerChangedUserSelected(inx);
    await refecthData();
    await refetchStatus();
  }

  return (
    <div className="userOption-container">
      <div className="userOption">
        {renderUserOptionArr}
      </div>
    </div>
  )
}

UserOption.propTypes = {
  refecthData: PropTypes.func.isRequired,
  refetchStatus: PropTypes.func.isRequired,
};

export default UserOption;