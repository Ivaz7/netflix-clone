import LoadingComp from "../../components/loadingComp";
import { useGetDataQuery, useGetLoginStatusQuery } from "../../service/redux/API/firebaseDB";
import AuthScreen from "./authScreen/AuthScreen";
import UserOption from "./homeScreen/UserOption/userOption";
import HomeScreen from "./homeScreen/homeScreen/homeScreen";
import { useEffect } from "react";

const Home = () => { 
  const { data: dataStatus, isLoading: isLoadingStatus, refetch: refetchStatus } = useGetLoginStatusQuery(undefined, { refetchOnFocus: true });
  const { data: dataGet, isLoading: isLoadingDataGet, refetch: refetchData } = useGetDataQuery(undefined, { refetchOnFocus: true });

  useEffect(() => {
    refetchData();
    refetchStatus();
  }, [dataStatus, dataGet, refetchData, refetchStatus])

  if (isLoadingDataGet || isLoadingStatus) {
    return <LoadingComp />;
  } 

  if (!dataStatus) {
    return <AuthScreen />;
  } else {
    return dataGet && dataGet.userSelected !== "empty" 
      ? <HomeScreen 
          refetchData={refetchData} 
          refetchStatus={refetchStatus}
          dataGet={dataGet}
          isLoadingDataGet={isLoadingDataGet}
        /> 
      : <UserOption 
          refetchData={refetchData} 
          refetchStatus={refetchStatus}
          dataGet={dataGet}
          isLoadingDataGet={isLoadingDataGet}
        />;
  };
}

export default Home;  