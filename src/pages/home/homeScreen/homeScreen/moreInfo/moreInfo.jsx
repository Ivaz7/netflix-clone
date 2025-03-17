import { useRef, useState } from "react";
import CustomFloatingComp from "../../../../../components/customFloatingComp";
import { useClickOutside } from "../../../../../customHooks/useClickOutside";
import { useMoreInfo } from "../../../../../customHooks/useMoreInfo";
import { useSelector } from "react-redux";
import HeaderMoreInfo from "./headerMoreInfo";

const MoreInfo = () => {
  const moreInfoRef = useRef(null);
  const [isMoreInfo, setIsMoreInfo] = useState(true);
  const clickOutside = useClickOutside;
  const { moreInfo, deleteMoreInfo } = useMoreInfo();

  clickOutside(moreInfoRef, isMoreInfo, setIsMoreInfo, deleteMoreInfo);

  const dataShows = useSelector((state) => state.showsData.dataShows);
  const dataDetail = dataShows[moreInfo];

  return (
    <CustomFloatingComp>
      <div ref={moreInfoRef} className="moreInfo">
        <HeaderMoreInfo dataDetail={dataDetail} />
      </div>
    </CustomFloatingComp>
  )
}

export default MoreInfo;