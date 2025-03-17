import { useRef, useState } from "react";
import CustomFloatingComp from "../../../../components/customFloatingComp";
import { useClickOutside } from "../../../../customHooks/useClickOutside";
import { useMoreInfo } from "../../../../customHooks/useMoreInfo";

const MoreInfo = () => {
  const moreInfoRef = useRef(null);
  const [isMoreInfo, setMoreInfo] = useState(true);
  const clickOutside = useClickOutside;
  const { moreInfo, deleteMoreInfo } = useMoreInfo();

  clickOutside(moreInfoRef, isMoreInfo, setMoreInfo, deleteMoreInfo);

  return (
    <CustomFloatingComp>
      <div ref={moreInfoRef} className="moreInfo">
        <h1 style={{ height: "1000px", backgroundColor: "red" }}>
          {moreInfo}
        </h1>
      </div>
    </CustomFloatingComp>
  )
}

export default MoreInfo;