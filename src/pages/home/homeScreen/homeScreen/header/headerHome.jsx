import { useEffect, useState } from "react";
import LoadingComp from "../../../../../components/loadingComp";
import { useGetDataQuery } from "../../../../../service/redux/API/firebaseDB";
import LeftSideHeaderHome from "./leftSideHeaderHome";
import RightSideHeaderHome from "./righSideHeaderHome";

const HeaderHome = () => {
  const { data, isLoading } = useGetDataQuery();
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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