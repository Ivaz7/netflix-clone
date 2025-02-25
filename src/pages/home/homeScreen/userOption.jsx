import { useNavigate } from "react-router-dom";
import { useGetDataQuery } from "../../../service/redux/API/firebaseDB";

const UserOption = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetDataQuery();
  
  if (isLoading) {
    return <div>Loading ... </div>
  }

  const userOptionArr = data.userOption;

  const renderUserOptionArr = userOptionArr.map((val, inx) => {
    const { name, statusAge } = val;

    return (
      <button key={inx} onClick={() => handleClick(inx)}>
        {name}, {statusAge ? "18+" : "18-"}
      </button>
    )
  })

  const handleClick = (inx) => {
    const searchParam = new URLSearchParams();
    searchParam.set("userOption", inx)
    navigate(`/home?${searchParam.toString()}`)
  }

  return (
    <div className="userOption-container">
      <div className="userOption">
        {renderUserOptionArr}
      </div>
    </div>
  )
}

export default UserOption;