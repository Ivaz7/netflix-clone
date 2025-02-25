import { useGetDataQuery, useGetLoginStatusQuery } from "../../service/redux/API/firebaseDB";
import AuthScreen from "./authScreen/AuthScreen";
import UserOption from "./homeScreen/userOption";
import HomeScreen from "./homeScreen/homeScreen";
import { useEffect } from "react";

const Home = () => { 
  const { data: dataStatus, isLoading: isLoadingStatus, refetch: refetchStatus } = useGetLoginStatusQuery(undefined, { refetchOnFocus: true });
  const { data: getData, isLoading: isLoadingData, refetch: refecthData } = useGetDataQuery(undefined, { refetchOnFocus: true });

  useEffect(() => {
    refecthData();
    refetchStatus();
  }, [dataStatus, getData, refecthData, refetchStatus])

  if (isLoadingData || isLoadingStatus) {
    return <div>Loading ... </div>
  }

  if (dataStatus && !getData) {
    return <div>Loading data...</div>;
  }  

  if (!dataStatus) {
    return <AuthScreen />;
  } else {
    return getData && getData.userSelected !== "empty" 
      ? <HomeScreen refecthData={refecthData} refetchStatus={refetchStatus}/> 
      : <UserOption refecthData={refecthData} refetchStatus={refetchStatus}/>;
  };
}

export default Home;  