import { useEffect, useState } from "react";
import LoadingComp from "../../../../../components/loadingComp";
import ProfileImg from "../../../../../components/profileImg";
import { useGetDataQuery } from "../../../../../service/redux/API/firebaseDB";
import LeftSideHeaderHome from "./leftSideHeaderHome";

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

  const { userSelected, userOption } = data;
  
  const userOptionSelected = userOption[userSelected];

  const { imgProfile } = userOptionSelected;
  
  return (
    <header className={`headerHome ${isScroll ? "scrolled" : ""} d-flex align-items-center`}>
      <div className="headerHome__inside d-flex justify-content-between align-items-center">
        <LeftSideHeaderHome />

        <div className="headerHome__inside__rightSide d-flex flex-row gap-2 align-items-center">
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <button>
            <ProfileImg 
              scale={"2rem"}
              avatarImg={imgProfile}
            />

            <div className="triangle"></div>
          </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderHome;