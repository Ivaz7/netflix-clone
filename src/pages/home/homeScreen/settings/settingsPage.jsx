import { useNavigate } from "react-router-dom";
import { useGetLoginStatusQuery } from "../../../../service/redux/API/firebaseDB";

const SettingsPage = () => {
  const { data: dataStatus, isLoading: isLoadingStatus } = useGetLoginStatusQuery();
  const navigate= useNavigate();

  if (isLoadingStatus) {
    return <div>Loading ... </div>
  }

  if (!dataStatus) {
    navigate("/");
    return;
  }

  return (
    <>
    
    </>
  )
}

export default SettingsPage;