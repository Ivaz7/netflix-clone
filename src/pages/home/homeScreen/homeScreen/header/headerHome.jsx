import LoadingComp from "../../../../../components/loadingComp";
import { useGetDataQuery } from "../../../../../service/redux/API/firebaseDB";
import LeftSideHeaderHome from "./leftSideHeaderHome";
import RightSideHeaderHome from "./righSideHeaderHome";
import { useScrollDownTop } from "../../../../../customHooks/useScrollDownTop";

const HeaderHome = () => {
  const { data, isLoading } = useGetDataQuery();
  const { isScroll } = useScrollDownTop();

  if (isLoading) {
    return <LoadingComp />
  }    
  
  return (
    <header className={`headerHome ${isScroll ? "scrolled" : ""} d-flex align-items-center`}>
      <div className="headerHome__inside d-flex justify-content-between align-items-center">
        <LeftSideHeaderHome />

        <RightSideHeaderHome data={data} />
      </div>
    </header>
  )
}

export default HeaderHome;